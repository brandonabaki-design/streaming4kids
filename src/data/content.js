// ============================================================================
//  KidFlix content catalog
//  ---------------------------------------------------------------------------
//  This is the ONLY file you normally need to edit to add or remove shows.
//
//  HOW TO ADD A VIDEO FROM YOUR GOOGLE DRIVE
//  1. In Google Drive, upload your video (mp4 works best; .mkv usually will
//     NOT play in a browser — see the note at the bottom of this file).
//  2. Make sure the file is reachable: either the whole "Kids Media" folder
//     is shared "Anyone with the link -> Viewer", or the kids' device is
//     signed into the Google account that owns the files.
//  3. Copy the file's share link. It looks like:
//        https://drive.google.com/file/d/1AbCdEfGhIjKlMnOpQrStUvWxYz/view
//     The long code between /d/ and /view is the DRIVE FILE ID.
//  4. Add a new entry to the `shows` array below, pasting that ID as `driveId`.
//
//  Each show can belong to one or both kids via the `profiles` array.
//  `category` controls which row it appears in. `emoji` + `color` make the
//  card art (no image file needed). You can also set `thumbnail` to an image
//  URL if you have one.
// ============================================================================

export const profiles = [
  {
    id: 'noah',
    name: 'Noah',
    emoji: '🦁',
    color: '#3D8BFF',
    ageLabel: '3 years',
  },
  {
    id: 'naia',
    name: 'Naia',
    emoji: '🦋',
    color: '#FF6BB5',
    ageLabel: '19 months',
  },
]

// The order of this array is the order rows appear on the browse screen.
export const categoryOrder = [
  'Continue Watching',
  'Favorites',
  'Little Einsteins',
  'Movies',
]

// --- The shows ---------------------------------------------------------------
// These point at real videos on brandon.abaki@gmail.com's Google Drive.
// For them to PLAY, the "Kids Media" folder must be shared
// "Anyone with the link -> Viewer" (see the note at the bottom of this file).
export const shows = [
  // === Little Einsteins — Season 2 (mp4) ===================================
  {
    id: 'le-s02e01',
    title: '1. The Christmas Wish',
    driveId: '1FxI4eVBUNkRV6k8hT5qs_oijN1hE7M5Z',
    category: 'Little Einsteins',
    profiles: ['noah', 'naia'],
    emoji: '🎄',
    color: '#E63946',
    duration: '24 min',
  },
  {
    id: 'le-s02e02',
    title: '2. How We Became Little Einsteins',
    driveId: '1Kot2PhR4dqHFak1JESXFBxdoLMm-JNDU',
    category: 'Little Einsteins',
    profiles: ['noah', 'naia'],
    emoji: '🚀',
    color: '#457B9D',
    duration: '24 min',
  },
  {
    id: 'le-s02e03',
    title: '3. Jump for Joey',
    driveId: '1RM2DdY-flDDrszyX2gc7KcSQ4Ii5F9Pl',
    category: 'Little Einsteins',
    profiles: ['noah', 'naia'],
    emoji: '🦘',
    color: '#F4A261',
    duration: '24 min',
  },
  {
    id: 'le-s02e04',
    title: '4. The Northern Night Light',
    driveId: '1r1ejcXnR-11PIi-S_hxr30rmdNKU63dL',
    category: 'Little Einsteins',
    profiles: ['noah', 'naia'],
    emoji: '🌌',
    color: '#3A0CA3',
    duration: '24 min',
  },
  {
    id: 'le-s02e05',
    title: "5. O Yes, O Yes, It's Springtime!",
    driveId: '1nUcsxl-CLYyJ24EEPNgNbhh1YVNGmHZ6',
    category: 'Little Einsteins',
    profiles: ['noah', 'naia'],
    emoji: '🌸',
    color: '#FF6BB5',
    duration: '24 min',
  },
  {
    id: 'le-s02e06',
    title: '6. A Tall Totem Tale',
    driveId: '1f_AEQaMYJzMiq1S4jraemnUdS-IaxsZG',
    category: 'Little Einsteins',
    profiles: ['noah', 'naia'],
    emoji: '🗿',
    color: '#2A9D8F',
    duration: '24 min',
  },
  {
    id: 'le-s02e07',
    title: '7. The Incredible Shrinking Machine',
    driveId: '1E-d4tk-4VN8mPyi0ca7YjDwgBU3StoRb',
    category: 'Little Einsteins',
    profiles: ['noah', 'naia'],
    emoji: '🔬',
    color: '#118AB2',
    duration: '24 min',
  },
  {
    id: 'le-s02e08',
    title: '8. Duck, Duck, June',
    driveId: '1vlNOKYfN5t_WWlUPcrQCj7D3_yb5nU9Z',
    category: 'Little Einsteins',
    profiles: ['noah', 'naia'],
    emoji: '🦆',
    color: '#06D6A0',
    duration: '24 min',
  },
  {
    id: 'le-s02e09',
    title: '9. Rocket Safari',
    driveId: '1xEEXqLYp8gMeADUr-UIa49pCJ6_HlJ6Z',
    category: 'Little Einsteins',
    profiles: ['noah', 'naia'],
    emoji: '🦁',
    color: '#FFB703',
    duration: '24 min',
  },
  {
    id: 'le-s02e10',
    title: '10. Knock On Wood',
    driveId: '1qg0sxQ9dsoIEV-EkHxXjL3IId4bwlT-N',
    category: 'Little Einsteins',
    profiles: ['noah', 'naia'],
    emoji: '🌳',
    color: '#52B788',
    duration: '24 min',
  },
  {
    id: 'le-s02e11',
    title: '11. A Galactic Goodnight',
    driveId: '1y8bPzpPNECYoZLEiLyEA2LUX3YUl1ZOw',
    category: 'Little Einsteins',
    profiles: ['noah', 'naia'],
    emoji: '🌙',
    color: '#5C6BC0',
    duration: '24 min',
  },
  {
    id: 'le-s02e12',
    title: '12. The Birthday Machine',
    driveId: '15dsaeaEF42SccNHP7ENBpTx9ubIPEnT3',
    category: 'Little Einsteins',
    profiles: ['noah', 'naia'],
    emoji: '🎂',
    color: '#EF476F',
    duration: '24 min',
  },
  {
    id: 'le-s02e13',
    title: '13. A Brand New Outfit',
    driveId: '1KAOAWa3WGup9bMKGdWB95XTzQP_5UmFz',
    category: 'Little Einsteins',
    profiles: ['noah', 'naia'],
    emoji: '👗',
    color: '#9B5DE5',
    duration: '24 min',
  },
  {
    id: 'le-s02e14',
    title: '14. The Missing Invitation',
    driveId: '13ZGEDh5zod9Q2EaZiXZ8trPYg2nmenr-',
    category: 'Little Einsteins',
    profiles: ['noah', 'naia'],
    emoji: '✉️',
    color: '#F77F00',
    duration: '24 min',
  },

  // === Movies (mp4) =======================================================
  {
    id: 'curious-george-2006',
    title: 'Curious George',
    driveId: '167f3Ou4ZbKwMVZtx8puJ66zNqDrPUXDi',
    category: 'Movies',
    profiles: ['noah', 'naia'],
    emoji: '🐵',
    color: '#FFD166',
    duration: '1 h 28 m',
  },
]

// ============================================================================
//  NOT YET PLAYABLE — needs converting from .mkv to .mp4
//  ---------------------------------------------------------------------------
//  Google Drive's in-browser player can't play .mkv files, so these won't work
//  in the app as-is. Once you convert any of them to .mp4 and upload, copy the
//  new file ID into a `shows` entry above and it'll appear.
//
//  Mr. Rogers' Neighborhood  (folder: 1rAtG9Z5Hjuuu3QvweScGdvKw2LOPnrfW)
//    ~30 episodes, all .mkv
//  The Many Adventures of Winnie the Pooh (1977)
//    1q_EqRnW1rj9FPmjyUlgWRKzAnICnKn4O   (.mkv, 4.7 GB)
//  The Tiger Who Came To Tea (2019)
//    1f1CfgRZpHdh15bvkEkIAFQ3CUAZdDbUT   (.mkv)
//  The Snowy Day (2016)
//    1Nvk-S4tjWCunVwPZVrWfE1Z4Xsri16xx   (.mkv)
// ============================================================================
