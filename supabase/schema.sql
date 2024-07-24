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
  description_ja varchar(500) not null,
  description_en varchar(500) not null,
  link_url varchar(500),
  image_url varchar(500),
  speaker_id varchar(100),
  tag text array,
  is_open bool not null,
  created_at timestamp with time zone default timezone('utc' :: text, now()) not null,
  updated_at timestamp with time zone default timezone('utc' :: text, now()) not null
);

ALTER TABLE public.sponsors ADD COLUMN display_order int;

ALTER TABLE public.sponsors ADD COLUMN detail_page_id varchar(40);

ALTER TABLE public.sponsors ADD COLUMN share_image_url varchar(500);

alter table
  public.sponsors enable row level security;

create policy "Allow select for all sponsors." on public.sponsors for
select
  using (true);

create policy "Allow insert for all sponsors." on public.sponsors for
insert
  with check (true);

create policy "Allow update for all sponsors." on public.sponsors for
update
  using (true);

create table if not exists public.jobs (
  id uuid not null primary key default uuid_generate_v4(),
  sponsor_id uuid not null references public.sponsors on delete cascade,
  link_url varchar(500),
  image_url varchar(500),
  image_alt varchar(100),
  display_order int,
  is_open bool not null,
  created_at timestamp with time zone default timezone('utc' :: text, now()) not null,
  updated_at timestamp with time zone default timezone('utc' :: text, now()) not null
);

ALTER TABLE public.jobs ALTER COLUMN image_alt TYPE varchar(500);

alter table
  public.jobs enable row level security;

create policy "Allow select for all jobs." on public.jobs for
select
  using (true);

create policy "Allow insert for all jobs." on public.jobs for
insert
  with check (true);

create policy "Allow update for all jobs." on public.jobs for
update
  using (true);

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

ALTER TABLE public.speakers ADD COLUMN detail_page_id varchar(40);

ALTER TABLE public.speakers ADD COLUMN events text array;

ALTER TABLE public.speakers RENAME COLUMN caption_ja TO company_ja;

ALTER TABLE public.speakers RENAME COLUMN caption_en TO company_en;

ALTER TABLE public.speakers ADD COLUMN position_ja varchar(100);

ALTER TABLE public.speakers ADD COLUMN position_en varchar(100);

alter table
  public.speakers enable row level security;

create policy "Allow select for all speakers." on public.speakers for
select
  using (true);

create policy "Allow insert for all speakers." on public.speakers for
insert
  with check (true);

create policy "Allow update for all speakers." on public.speakers for
update
  using (true);

create table if not exists public.staffs (
  id uuid not null primary key default uuid_generate_v4(),
  name varchar(100) not null,
  image_url varchar(500),
  x_id varchar(100),
  github_id varchar(100),
  is_open bool not null,
  display_order int,
  created_at timestamp with time zone default timezone('utc' :: text, now()) not null,
  updated_at timestamp with time zone default timezone('utc' :: text, now()) not null
);

ALTER TABLE public.staffs ADD COLUMN detail_page_id varchar(40);

alter table
  public.staffs enable row level security;

create policy "Allow select for all staffs." on public.staffs for
select
  using (true);

create policy "Allow insert for all staffs." on public.staffs for
insert
  with check (true);

create policy "Allow update for all staffs." on public.staffs for
update
  using (true);

create table if not exists public.attendees (
    id uuid not null primary key default uuid_generate_v4(),
    user_id uuid not null references auth.users on delete cascade,
    email varchar(100) not null unique,
    avatar_url varchar(500) not null,
    provider varchar(20) not null,
    display_name varchar(24),
    role varchar(16),
    receipt_id varchar(20) not null unique,
    activated_at timestamp with time zone,
    created_at timestamp with time zone default timezone('utc' :: text, now()) not null,
    updated_at timestamp with time zone default timezone('utc' :: text, now()) not null
);

ALTER TABLE public.attendees ADD COLUMN image_file_name uuid not null unique default uuid_generate_v4();

alter table
  public.attendees enable row level security;

create policy "Allow select for all attendees." on public.attendees for
select
  using (true);

create policy "Allow insert for all attendees." on public.attendees for
insert
  with check (true);

create policy "Allow update for all attendees." on public.attendees for
update
  using (true);

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
