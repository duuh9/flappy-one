-- 1. Adicionar campos de pareamento ao profile
ALTER TABLE public.profiles
  ADD COLUMN partner_id uuid REFERENCES public.profiles(id) ON DELETE SET NULL,
  ADD COLUMN invite_code text UNIQUE;

CREATE INDEX idx_profiles_invite_code ON public.profiles(invite_code);
CREATE INDEX idx_profiles_partner_id ON public.profiles(partner_id);

-- 2. Função para gerar código único de 6 dígitos
CREATE OR REPLACE FUNCTION public.generate_invite_code()
RETURNS text
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  new_code text;
  exists_check boolean;
BEGIN
  LOOP
    new_code := lpad(floor(random() * 1000000)::text, 6, '0');
    SELECT EXISTS(SELECT 1 FROM public.profiles WHERE invite_code = new_code) INTO exists_check;
    EXIT WHEN NOT exists_check;
  END LOOP;
  RETURN new_code;
END;
$$;

-- 3. Backfill códigos para perfis existentes
UPDATE public.profiles SET invite_code = public.generate_invite_code() WHERE invite_code IS NULL;

-- 4. Trigger: gera invite_code ao criar profile
CREATE OR REPLACE FUNCTION public.set_invite_code()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  IF NEW.invite_code IS NULL THEN
    NEW.invite_code := public.generate_invite_code();
  END IF;
  RETURN NEW;
END;
$$;

CREATE TRIGGER profiles_set_invite_code
  BEFORE INSERT ON public.profiles
  FOR EACH ROW
  EXECUTE FUNCTION public.set_invite_code();

-- 5. Função para parear via código (bidirecional)
CREATE OR REPLACE FUNCTION public.pair_with_code(_code text)
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  me uuid := auth.uid();
  partner_uuid uuid;
  my_partner uuid;
BEGIN
  IF me IS NULL THEN
    RETURN jsonb_build_object('ok', false, 'error', 'not_authenticated');
  END IF;

  SELECT id INTO partner_uuid FROM public.profiles WHERE invite_code = _code;
  IF partner_uuid IS NULL THEN
    RETURN jsonb_build_object('ok', false, 'error', 'invalid_code');
  END IF;
  IF partner_uuid = me THEN
    RETURN jsonb_build_object('ok', false, 'error', 'self_code');
  END IF;

  SELECT partner_id INTO my_partner FROM public.profiles WHERE id = me;
  IF my_partner IS NOT NULL AND my_partner <> partner_uuid THEN
    RETURN jsonb_build_object('ok', false, 'error', 'already_paired');
  END IF;

  UPDATE public.profiles SET partner_id = partner_uuid WHERE id = me;
  UPDATE public.profiles SET partner_id = me WHERE id = partner_uuid;

  RETURN jsonb_build_object('ok', true, 'partner_id', partner_uuid);
END;
$$;

-- 6. Função para desparear
CREATE OR REPLACE FUNCTION public.unpair()
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  me uuid := auth.uid();
  my_partner uuid;
BEGIN
  IF me IS NULL THEN
    RETURN jsonb_build_object('ok', false, 'error', 'not_authenticated');
  END IF;
  SELECT partner_id INTO my_partner FROM public.profiles WHERE id = me;
  UPDATE public.profiles SET partner_id = NULL WHERE id = me;
  IF my_partner IS NOT NULL THEN
    UPDATE public.profiles SET partner_id = NULL WHERE id = my_partner;
  END IF;
  RETURN jsonb_build_object('ok', true);
END;
$$;

-- 7. Política adicional: ver perfil do parceiro
CREATE POLICY "view partner profile"
ON public.profiles
FOR SELECT
USING (
  id IN (SELECT partner_id FROM public.profiles WHERE id = auth.uid() AND partner_id IS NOT NULL)
);

-- 8. Política adicional: ver logs do parceiro
CREATE POLICY "view partner logs"
ON public.daily_logs
FOR SELECT
USING (
  user_id IN (SELECT partner_id FROM public.profiles WHERE id = auth.uid() AND partner_id IS NOT NULL)
);

-- 9. Tabela de mensagens entre o casal
CREATE TABLE public.partner_messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  sender_id uuid NOT NULL,
  recipient_id uuid NOT NULL,
  body text NOT NULL CHECK (length(body) BETWEEN 1 AND 500),
  emoji text,
  read_at timestamptz,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX idx_partner_messages_recipient ON public.partner_messages(recipient_id, created_at DESC);
CREATE INDEX idx_partner_messages_sender ON public.partner_messages(sender_id, created_at DESC);

ALTER TABLE public.partner_messages ENABLE ROW LEVEL SECURITY;

-- Ver mensagens enviadas ou recebidas
CREATE POLICY "view own conversation"
ON public.partner_messages
FOR SELECT
USING (auth.uid() = sender_id OR auth.uid() = recipient_id);

-- Enviar: tem que ser remetente E destinatário tem que ser o parceiro
CREATE POLICY "send to partner"
ON public.partner_messages
FOR INSERT
WITH CHECK (
  auth.uid() = sender_id
  AND recipient_id = (SELECT partner_id FROM public.profiles WHERE id = auth.uid())
);

-- Marcar como lida: só destinatário
CREATE POLICY "mark as read"
ON public.partner_messages
FOR UPDATE
USING (auth.uid() = recipient_id);

-- Deletar: só remetente
CREATE POLICY "delete own message"
ON public.partner_messages
FOR DELETE
USING (auth.uid() = sender_id);

-- 10. Realtime para mensagens
ALTER PUBLICATION supabase_realtime ADD TABLE public.partner_messages;