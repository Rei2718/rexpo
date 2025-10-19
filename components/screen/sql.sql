--------------------------------------------------------------------------------
-- タイムスタンプ自動更新用トリガー関数
--------------------------------------------------------------------------------
CREATE OR REPLACE FUNCTION trigger_set_timestamp()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

--------------------------------------------------------------------------------
-- Organizations Table (組織)
--------------------------------------------------------------------------------
CREATE TABLE public.organizations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  logo_url TEXT,
  website_url TEXT,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT now() NOT NULL
);
CREATE TRIGGER set_timestamp BEFORE UPDATE ON public.organizations FOR EACH ROW EXECUTE PROCEDURE public.trigger_set_timestamp();
ALTER TABLE public.organizations ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow public read access" ON public.organizations FOR SELECT TO public USING (true);

--------------------------------------------------------------------------------
-- Venues Table (会場)
--------------------------------------------------------------------------------
CREATE TABLE public.venues (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    capacity INTEGER,
    latitude DOUBLE PRECISION,
    longitude DOUBLE PRECISION,
    created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT now() NOT NULL
);
CREATE TRIGGER set_timestamp BEFORE UPDATE ON public.venues FOR EACH ROW EXECUTE PROCEDURE public.trigger_set_timestamp();
ALTER TABLE public.venues ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow public read access" ON public.venues FOR SELECT TO public USING (true);

--------------------------------------------------------------------------------
-- Event Types Table (イベント種別)
-- EX: '研修旅行発表会', '課題研究ポスターセッション', 'クラブ発表', 'ブース出展', 'RED Talks'...
--------------------------------------------------------------------------------
DROP TABLE IF EXISTS public.event_types CASCADE;
CREATE TABLE public.event_types (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT now() NOT NULL
);
CREATE TRIGGER set_timestamp BEFORE UPDATE ON public.event_types FOR EACH ROW EXECUTE PROCEDURE public.trigger_set_timestamp();
ALTER TABLE public.event_types ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow public read access" ON public.event_types FOR SELECT TO public USING (true);

--------------------------------------------------------------------------------
-- Events Table (イベント)
--------------------------------------------------------------------------------
DROP TABLE IF EXISTS public.events CASCADE;

CREATE TYPE public.event_category AS ENUM ('Academic Stage', 'Entertainment Fes');

CREATE TABLE public.events (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,                                                      -- 例: '演劇部公演「XXX」', '自然科学部 研究発表'
    description TEXT NOT NULL,                                                -- NULL許容に変更。ポスターセッションやブースなど、属さない場合があるため
    category event_category,                                                  -- 'クラブ発表', '課題研究ポスターセッション' などのID
    event_type_id UUID REFERENCES public.event_types(id) ON DELETE SET NULL,  -- 'メインホール大', 'エントランスホール' などのID
    venue_id UUID REFERENCES public.venues(id) ON DELETE SET NULL, 
    cover_image_url TEXT,
    created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT now() NOT NULL
);
CREATE TRIGGER set_timestamp BEFORE UPDATE ON public.events FOR EACH ROW EXECUTE PROCEDURE public.trigger_set_timestamp();
ALTER TABLE public.events ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow public read access" ON public.events FOR SELECT TO public USING (true);

--------------------------------------------------------------------------------
-- Time Slots Table (イベント開催時間)
--------------------------------------------------------------------------------
DROP TABLE IF EXISTS public.time_slots CASCADE;
CREATE TABLE public.time_slots (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    event_id UUID NOT NULL REFERENCES events(id) ON DELETE CASCADE, 
    start_datetime TIME NOT NULL,
    end_datetime TIME NOT NULL,
    created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT now() NOT NULL,
    CONSTRAINT check_start_datetime_before_end_datetime CHECK (start_datetime < end_datetime)
);
CREATE TRIGGER set_timestamp BEFORE UPDATE ON public.time_slots FOR EACH ROW EXECUTE PROCEDURE public.trigger_set_timestamp();
ALTER TABLE public.time_slots ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow public read access" ON public.time_slots FOR SELECT TO public USING (true);

--------------------------------------------------------------------------------
-- Performers Table (発表主体)
--------------------------------------------------------------------------------
DROP TABLE IF EXISTS public.presenters CASCADE;
DROP TABLE IF EXISTS public.performers CASCADE;

-- 発表主体が「個人」か「グループ」か
CREATE TYPE public.performer_type AS ENUM ('Individual', 'Group');

CREATE TABLE public.performers (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    performer_type performer_type NOT NULL, -- 'Individual' または 'Group' 
    name TEXT NOT NULL,                     -- 個人名、またはグループ名(例: '演劇部' )
    position TEXT,                          -- 個人の肩書きなど
    bio TEXT,
    avatar_url TEXT,
    organization_id UUID REFERENCES organizations(id) ON DELETE SET NULL, -- 所属組織(例: 立命館慶祥)
    created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT now() NOT NULL
);
CREATE TRIGGER set_timestamp BEFORE UPDATE ON public.performers FOR EACH ROW EXECUTE PROCEDURE public.trigger_set_timestamp();
ALTER TABLE public.performers ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow public read access" ON public.performers FOR SELECT TO public USING (true);

--------------------------------------------------------------------------------
-- Event Performers Table (中間テーブル: イベントと発表主体の関係性)
--------------------------------------------------------------------------------
DROP TABLE IF EXISTS public.event_presenters CASCADE;
DROP TABLE IF EXISTS public.event_performers CASCADE;
CREATE TABLE public.event_performers (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    event_id UUID REFERENCES events(id) ON DELETE CASCADE,         -- どのイベントか
    performer_id UUID REFERENCES performers(id) ON DELETE CASCADE, -- 誰が(個人orグループ)
    role TEXT,                                                     -- 例: '登壇者', '司会', '出展者'
    created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT now() NOT NULL,
    UNIQUE(event_id, performer_id)
);
CREATE TRIGGER set_timestamp BEFORE UPDATE ON public.event_performers FOR EACH ROW EXECUTE PROCEDURE public.trigger_set_timestamp();
ALTER TABLE public.event_performers ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow public read access" ON public.event_performers FOR SELECT TO public USING (true);

--------------------------------------------------------------------------------
-- Sponsorships Table (スポンサーシップ)
--------------------------------------------------------------------------------
DROP TABLE IF EXISTS public.sponsorships CASCADE;

CREATE TYPE public.sponsorship_level AS ENUM ('メインステージプラチナスポンサー', 'メインステージブロンズスポンサー', 'ブースプラチナスポンサー', 'ブースゴールドスポンサー', 'ブースシルバースポンサー', 'ブースブロンズスポンサー', 'プログラム協賛', '個人協賛');

CREATE TABLE public.sponsorships (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    organization_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
    event_id UUID REFERENCES events(id) ON DELETE CASCADE,  -- 特定イベントへの協賛
    venue_id UUID REFERENCES venues(id) ON DELETE CASCADE,  -- 特定会場への協賛
    sponsorship_level sponsorship_level,
    created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT now() NOT NULL,
    CONSTRAINT check_sponsorship_target CHECK (event_id IS NOT NULL OR venue_id IS NOT NULL)
);
CREATE TRIGGER set_timestamp BEFORE UPDATE ON public.sponsorships FOR EACH ROW EXECUTE PROCEDURE public.trigger_set_timestamp();
ALTER TABLE public.sponsorships ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow public read access" ON public.sponsorships FOR SELECT TO public USING (true);

































--------------------------------------------------------------------------------
-- view_academic_stage_list 
--------------------------------------------------------------------------------
CREATE OR REPLACE VIEW public.view_academic_stage_list AS
SELECT
  e.id AS event_id,
  e.title,
  et.name AS event_type,
  v.name AS venue_name,
  e.description,
  (
    SELECT
      json_agg(
        json_build_object(
          'id', ts.id,
          'start_datetime', ts.start_datetime,
          'end_datetime', ts.end_datetime
        )
      )
    FROM
      public.time_slots AS ts
    WHERE
      ts.event_id = e.id
  ) AS time_slots,
  (
    SELECT
      json_agg(
        json_build_object(
          'id', p.id,
          'name', p.name,
          'avatar_url', p.avatar_url,
          'role', ep.role,
          'performer_type', p.performer_type 
        )
      )
    FROM
      public.event_performers AS ep
      LEFT JOIN public.performers AS p ON ep.performer_id = p.id
    WHERE
      ep.event_id = e.id
  ) AS performers
  
FROM
  public.events AS e
  LEFT JOIN public.event_types AS et ON e.event_type_id = et.id
  LEFT JOIN public.venues AS v ON e.venue_id = v.id
WHERE
  e.category = 'Academic Stage';

ALTER VIEW public.view_academic_stage_list SET (security_invoker = true);

--------------------------------------------------------------------------------
-- view_entertainment_fes_list
--------------------------------------------------------------------------------
CREATE OR REPLACE VIEW public.view_entertainment_fes_list AS
SELECT
  e.id AS event_id,
  e.title,
  et.name AS event_type,
  v.name AS venue_name,
  e.description,
  (
    SELECT
      json_agg(
        json_build_object(
          'id', ts.id,
          'start_datetime', ts.start_datetime,
          'end_datetime', ts.end_datetime
        )
      )
    FROM
      public.time_slots AS ts
    WHERE
      ts.event_id = e.id
  ) AS time_slots,
  (
    SELECT
      json_agg(
        json_build_object(
          'id', p.id,
          'name', p.name,
          'avatar_url', p.avatar_url,
          'role', ep.role,
          'performer_type', p.performer_type
        )
      )
    FROM
      public.event_performers AS ep
      LEFT JOIN public.performers AS p ON ep.performer_id = p.id
    WHERE
      ep.event_id = e.id
  ) AS performers
  
FROM
  public.events AS e
  LEFT JOIN public.event_types AS et ON e.event_type_id = et.id
  LEFT JOIN public.venues AS v ON e.venue_id = v.id
WHERE
  e.category = 'Entertainment Fes';

ALTER VIEW public.view_entertainment_fes_list SET (security_invoker = true);