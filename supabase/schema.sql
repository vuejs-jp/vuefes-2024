-- *** Table definitions ***
create table public.admin_users (
  id uuid primary key references auth.users on delete cascade,
  email text not null
);

alter table
  public.admin_users enable row level security;

create policy "Allow select for all admin users." on public.admin_users for
select
  using (auth.role() = 'authenticated');

create policy "Allow update for users themselves." on public.admin_users for
update
  using (auth.uid() = id);

create table if not exists public.sponsors (
  id uuid not null primary key default uuid_generate_v4(),
  name varchar(100) not null,
  description_ja text not null,
  description_en text not null,
  link_url varchar(500),
  image_url varchar(500),
  speaker_id varchar(100),
  tag text array,
  is_open bool not null,
  created_at timestamp with time zone default timezone('utc' :: text, now()) not null,
  updated_at timestamp with time zone default timezone('utc' :: text, now()) not null
);

create table if not exists public.speakers (
  id uuid not null primary key default uuid_generate_v4(),
  name_ja varchar(100) not null,
  name_en varchar(100) not null,
  image_url varchar(500),
  caption_ja varchar(100),
  caption_en varchar(100),
  description_ja varchar(200) not null,
  description_en varchar(200) not null,
  github_id varchar(100),
  x_id varchar(100),
  session_type varchar(100),
  session_title_ja varchar(100),
  session_title_en varchar(100),
  session_description_ja varchar(500),
  session_description_en varchar(500),
  session_comment_ja varchar(200),
  session_comment_en varchar(200),
  session_place varchar(100),
  session_time_from timestamp with time zone,
  session_time_duration int,
  session_doc_title_ja varchar(200),
  session_doc_title_en varchar(200),
  session_doc_url varchar(200),
  is_open bool not null,
  created_at timestamp with time zone default timezone('utc' :: text, now()) not null,
  updated_at timestamp with time zone default timezone('utc' :: text, now()) not null
);

ALTER TABLE public.speakers ADD COLUMN display_order int;

-- *** Function definitions ***
create
or replace function public.create_admin_user() returns trigger as $ $ begin -- If user_role is 'admin', insert data into admin_users table
if new.raw_user_meta_data ->> 'user_role' = 'admin' then
insert into
  public.admin_users (id, email)
values
  (new.id, new.email);

end if;

return new;

end;

$ $ language plpgsql security definer;

-- *** Trigger definitions ***
drop trigger if exists on_admin_user_created on auth.users;

create trigger on_admin_user_created
after
insert
  on auth.users for each row execute function public.create_admin_user();

-- *** Storage buckets ***
create policy "Common Asset (Avatar, Logo) images are publicly accessible."
  on storage.objects for select
  using ( bucket_id = 'common_asset' );

create policy "Anyone can upload an avatar, a logo."
  on storage.objects for insert
  with check ( bucket_id = 'common_asset' );
