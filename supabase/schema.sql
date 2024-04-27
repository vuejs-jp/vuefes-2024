-- *** Table definitions ***

create table public.admin_users (
  id uuid primary key references auth.users on delete cascade,
  email text not null
);

alter table public.admin_users
  enable row level security;

create policy "Allow select for all admin users."
  on public.admin_users for select using (
    auth.role() = 'authenticated'
  );

create policy "Allow update for users themselves."
  on public.admin_users for update using (
    auth.uid() = id
  );

-- *** Function definitions ***
create or replace function public.create_admin_user()
  returns trigger as $$
begin
  -- If user_role is 'admin', insert data into admin_users table
  if new.raw_user_meta_data ->> 'user_role' = 'admin' then
    insert into public.admin_users (id, email)
    values (new.id, new.email);
  end if;

  return new;
end;
$$ language plpgsql security definer;

-- *** Trigger definitions ***
drop trigger if exists on_admin_user_created on auth.users;
create trigger on_admin_user_created
  after insert on auth.users
  for each row
  execute function public.create_admin_user();
