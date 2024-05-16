create table if not exists public.speakers (
  id uuid not null primary key default uuid_generate_v4(),
  user_id uuid references auth.users on delete cascade not null,
  speaker_title varchar(100) not null,
  speaker_description varchar(100) not null,
  speaker_comment varchar(100) not null,
  speaker_doc_title varchar(100) not null,
  speaker_doc_url varchar(100) not null,
  speaker_time_from timestamp with time zone default timezone('utc' :: text, now()) not null,
  speaker_time_duration int(10) not null,
  speaker_place varchar(100) not null,
  created_at timestamp with time zone default timezone('utc' :: text, now()) not null,
  updated_at timestamp with time zone default timezone('utc' :: text, now()) not null
);