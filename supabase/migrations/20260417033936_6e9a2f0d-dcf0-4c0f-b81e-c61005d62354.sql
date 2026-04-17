
-- Tabela de quizzes respondidos (para evitar pontuar o mesmo quiz duas vezes e mostrar histórico)
CREATE TABLE public.quiz_attempts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  quiz_id text NOT NULL,
  question_count integer NOT NULL,
  correct_count integer NOT NULL,
  points_awarded integer NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (user_id, quiz_id)
);

ALTER TABLE public.quiz_attempts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "own attempts select" ON public.quiz_attempts
  FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "own attempts insert" ON public.quiz_attempts
  FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "own attempts delete" ON public.quiz_attempts
  FOR DELETE USING (auth.uid() = user_id);

CREATE INDEX idx_quiz_attempts_user ON public.quiz_attempts(user_id, created_at DESC);

-- Tabela de badges desbloqueados
CREATE TABLE public.user_badges (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  badge_id text NOT NULL,
  unlocked_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (user_id, badge_id)
);

ALTER TABLE public.user_badges ENABLE ROW LEVEL SECURITY;

CREATE POLICY "own badges select" ON public.user_badges
  FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "own badges insert" ON public.user_badges
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE INDEX idx_user_badges_user ON public.user_badges(user_id);

-- Coluna para marcar leitura do insight do dia (1 ponto/dia)
ALTER TABLE public.profiles
  ADD COLUMN last_insight_read_date date;
