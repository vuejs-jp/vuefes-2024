create table if not exists public.speakers (
  id uuid not null primary key default uuid_generate_v4(),
  name varchar(100) not null,
  caption varchar(100) not null,
  description text not null,
  github_url varchar(100) not null,
  x_url varchar(100) not null,
  session_title varchar(100) not null,
  session_description text not null,
  session_comment varchar(100) not null,
  session_place varchar(100) not null,
  session_time_from timestamp with time zone default timezone('utc' :: text, now()) not null,
  session_time_duration int(10) not null,
  session_doc_title varchar(100) not null,
  session_doc_url varchar(100) not null,
  created_at timestamp with time zone default timezone('utc' :: text, now()) not null,
  updated_at timestamp with time zone default timezone('utc' :: text, now()) not null
);