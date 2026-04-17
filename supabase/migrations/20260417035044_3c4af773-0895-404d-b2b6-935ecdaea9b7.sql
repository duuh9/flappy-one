-- Diário compartilhado (escrito pela namorada, lido pelo par)
CREATE TABLE public.shared_diary (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  entry_date date NOT NULL,
  body text NOT NULL,
  mood text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (user_id, entry_date)
);

ALTER TABLE public.shared_diary ENABLE ROW LEVEL SECURITY;

CREATE POLICY "own diary select" ON public.shared_diary
  FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "own diary insert" ON public.shared_diary
  FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "own diary update" ON public.shared_diary
  FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "own diary delete" ON public.shared_diary
  FOR DELETE USING (auth.uid() = user_id);
CREATE POLICY "partner diary select" ON public.shared_diary
  FOR SELECT USING (user_id = public.get_partner_id());

CREATE TRIGGER shared_diary_updated_at
  BEFORE UPDATE ON public.shared_diary
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

CREATE INDEX idx_shared_diary_user_date ON public.shared_diary(user_id, entry_date DESC);

-- Palpites do parceiro (ele palpita o humor dela do dia)
CREATE TABLE public.partner_guesses (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  guesser_id uuid NOT NULL,
  about_id uuid NOT NULL,
  guess_date date NOT NULL,
  mood text NOT NULL,
  mood_intensity integer,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (guesser_id, guess_date)
);

ALTER TABLE public.partner_guesses ENABLE ROW LEVEL SECURITY;

CREATE POLICY "own guesses select" ON public.partner_guesses
  FOR SELECT USING (auth.uid() = guesser_id);
CREATE POLICY "own guesses insert" ON public.partner_guesses
  FOR INSERT WITH CHECK (auth.uid() = guesser_id AND about_id = public.get_partner_id());
CREATE POLICY "own guesses delete" ON public.partner_guesses
  FOR DELETE USING (auth.uid() = guesser_id);
CREATE POLICY "partner guesses select" ON public.partner_guesses
  FOR SELECT USING (about_id = auth.uid());

CREATE INDEX idx_partner_guesses_about ON public.partner_guesses(about_id, guess_date DESC);

-- "Lembrei de você" (nudges carinhosas)
CREATE TABLE public.partner_nudges (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  sender_id uuid NOT NULL,
  recipient_id uuid NOT NULL,
  emoji text NOT NULL DEFAULT '💗',
  seen_at timestamptz,
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.partner_nudges ENABLE ROW LEVEL SECURITY;

CREATE POLICY "view own nudges" ON public.partner_nudges
  FOR SELECT USING (auth.uid() = sender_id OR auth.uid() = recipient_id);
CREATE POLICY "send nudge to partner" ON public.partner_nudges
  FOR INSERT WITH CHECK (auth.uid() = sender_id AND recipient_id = public.get_partner_id());
CREATE POLICY "mark nudge seen" ON public.partner_nudges
  FOR UPDATE USING (auth.uid() = recipient_id);

CREATE INDEX idx_partner_nudges_recipient ON public.partner_nudges(recipient_id, created_at DESC);

-- Habilita realtime
ALTER PUBLICATION supabase_realtime ADD TABLE public.shared_diary;
ALTER PUBLICATION supabase_realtime ADD TABLE public.partner_guesses;
ALTER PUBLICATION supabase_realtime ADD TABLE public.partner_nudges;