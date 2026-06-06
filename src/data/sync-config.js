// ============================================================================
//  Cross-device sync (optional)
//  ---------------------------------------------------------------------------
//  Fill these in to sync each kid's Watched + Favorites across every device
//  (iPad, phone, laptop...). Leave them blank and the app keeps everything
//  local to each device (the default).
//
//  Setup takes ~5 minutes with a free Supabase account.
//  Step-by-step instructions: see SYNC-SETUP.md in the project root.
// ============================================================================

export const syncConfig = {
  // From Supabase: Project Settings -> API
  supabaseUrl: '', // e.g. 'https://abcdefgh.supabase.co'
  supabaseAnonKey: '', // the long "anon public" key

  // Any shared word/phrase. Use the SAME value on every device/build so they
  // share one family's data. You don't need to change this.
  familyId: 'abaki-family',
}
