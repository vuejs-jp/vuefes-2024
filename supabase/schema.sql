-- *** Table definitions ***
create table public.admin_users (
  id uuid primary key references auth.users on delete cascade,
  email text not null
);

create table if not exists public.sponsors (
  id uuid not null primary key default uuid_generate_v4(),
  name varchar(100) not null,
  description_ja text not null,
  description_en text not null,
  link_url varchar(100) not null,
  image_url varchar(100) not null,
  speaker_id varchar(100) not null,
  is_personal int(10) not null,
  category_ja varchar(100) not null,
  category_en varchar(100) not null,
  option_categories_ja varchar(100) [] not null,
  option_categories_en varchar(100) [] not null,
  created_at timestamp with time zone default timezone('utc' :: text, now()) not null,
  updated_at timestamp with time zone default timezone('utc' :: text, now()) not null
);

alter table
  public.admin_users enable row level security;

create policy "Allow select for all admin users." on public.admin_users for
select
  using (auth.role() = 'authenticated');

create policy "Allow update for users themselves." on public.admin_users for
update
  using (auth.uid() = id);

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