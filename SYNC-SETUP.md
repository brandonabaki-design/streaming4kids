# Turn on cross-device sync (optional, ~5 minutes)

By default, each device remembers its own Watched/Favorites. If you want Noah
and Naia's progress to **sync across the iPad, your phone, the TV**, etc., do
this one-time setup. It uses **Supabase** (free).

You only need to do this once. Until you do, the app works fine — just
per-device.

---

## 1. Create a free Supabase project
1. Go to **https://supabase.com** → sign up (free).
2. Click **New project**. Give it any name, set a database password (save it
   somewhere), pick the closest region, and create it. Wait ~1 minute.

## 2. Create the table
1. In your project, open the **SQL Editor** (left sidebar) → **New query**.
2. Paste this in and click **Run**:

   ```sql
   create table if not exists kid_state (
     family_id  text not null,
     profile_id text not null,
     state      jsonb not null default '{}',
     updated_at timestamptz not null default now(),
     primary key (family_id, profile_id)
   );

   alter table kid_state enable row level security;

   create policy "kidflix family access"
     on kid_state for all
     using (true) with check (true);
   ```

## 3. Grab your keys
1. Left sidebar → **Project Settings** → **API**.
2. Copy the **Project URL** (looks like `https://abcdefgh.supabase.co`).
3. Copy the **anon public** key (a long string).

## 4. Paste them into the app
Open **`src/data/sync-config.js`** and fill in:

```js
export const syncConfig = {
  supabaseUrl: 'https://abcdefgh.supabase.co',  // your Project URL
  supabaseAnonKey: 'eyJhbGciOi...your-anon-key...',
  familyId: 'abaki-family',
}
```

(Or just paste the two values here and ask Claude to put them in.)

## 5. Deploy
Commit and push (or ask Claude to). The site redeploys in ~1 minute and sync
is live. Open it on two devices, mark an episode watched on one, reload the
other — the check appears on both.

---

## Good to know
- **Is it safe to put the anon key in the code?** Yes — Supabase's "anon" key
  is designed to be public in browser apps. The data it can touch is only this
  app's `kid_state` table (just Watched/Favorites flags — nothing sensitive).
- **Tradeoff of the simple setup:** the policy above lets anyone with the app's
  URL read/write the family's watched list. For two kids' viewing history
  that's fine. If you ever want it locked down, we can add a shared passphrase
  or proper auth later.
- **Cost:** Supabase's free tier is far more than this app will ever use.
