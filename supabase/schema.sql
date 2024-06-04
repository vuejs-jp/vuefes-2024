create table if not exists public.speakers (
  id uuid not null primary key default uuid_generate_v4(),
  name varchar(100) not null,
  image_url varchar(500) not null,
  caption_ja varchar(100) not null,
  caption_en varchar(100) not null,
  description_ja text not null,
  description_en text not null,
  github_url varchar(100) not null,
  x_url varchar(100) not null,
  session_title_ja varchar(100) not null,
  session_title_en varchar(100) not null,
  session_description_ja text not null,
  session_description_en text not null,
  session_comment_ja varchar(100) not null,
  session_comment_en varchar(100) not null,
  session_place varchar(100) not null,
  session_time_from timestamp with time zone default timezone('utc' :: text, now()) not null,
  session_time_duration int(10) not null,
  session_doc_title_ja varchar(100) not null,
  session_doc_title_en varchar(100) not null,
  session_doc_url varchar(100) not null,
  created_at timestamp with time zone default timezone('utc' :: text, now()) not null,
  updated_at timestamp with time zone default timezone('utc' :: text, now()) not null
);

-- *** Storage buckets ***
create policy "Avatar images are publicly accessible." on storage.objects for
select
  using (bucket_id = 'avatar');

create policy "Anyone can upload an avatar." on storage.objects for
insert
  with check (bucket_id = 'avatar');