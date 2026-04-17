-- Função para obter o partner_id do usuário atual sem recursão RLS
CREATE OR REPLACE FUNCTION public.get_partner_id()
RETURNS uuid
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT partner_id FROM public.profiles WHERE id = auth.uid();
$$;

-- Recria políticas usando a função
DROP POLICY IF EXISTS "view partner profile" ON public.profiles;
CREATE POLICY "view partner profile"
ON public.profiles
FOR SELECT
USING (id = public.get_partner_id());

DROP POLICY IF EXISTS "view partner logs" ON public.daily_logs;
CREATE POLICY "view partner logs"
ON public.daily_logs
FOR SELECT
USING (user_id = public.get_partner_id());