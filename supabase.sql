create table public.survey_responses (
  taken_at timestamp without time zone not null,
  depression smallint null,
  anxiety smallint null,
  stress smallint null,
  life_satisfaction smallint null,
  ican_id text not null,
  id uuid not null default extensions.uuid_generate_v4 (),
  ican_email text null,
  constraint survey_responses_pkey primary key (id),
  constraint survey_responses_id_key unique (id)
) TABLESPACE pg_default;
