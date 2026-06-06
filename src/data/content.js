// ============================================================================
//  KidFlix content catalog
//  ---------------------------------------------------------------------------
//  This is the main file you edit to add or remove content. There are three
//  kinds of things:
//
//    profiles - the kids (Noah, Naia)
//    series   - TV shows, grouped into seasons -> episodes
//    movies   - standalone films (each plays directly)
//
//  HOW TO ADD A VIDEO FROM YOUR GOOGLE DRIVE
//  1. Upload the video to Drive (mp4 only; .mkv won't play in a browser).
//  2. Make sure the "Kids Media" folder is shared "Anyone with the link ->
//     Viewer" so the app can play it.
//  3. Copy the file's link; the code between /d/ and /view is the DRIVE FILE ID.
//  4. Add it as an episode (inside a season) or a movie below, pasting that ID
//     as `driveId`. `emoji` + `color` make the artwork if Drive hasn't made a
//     thumbnail yet.
// ============================================================================

export const profiles = [
  { id: 'noah', name: 'Noah', emoji: '🦁', color: '#3D8BFF', ageLabel: '3 years' },
  { id: 'naia', name: 'Naia', emoji: '🦋', color: '#FF6BB5', ageLabel: '19 months' },
]

// --- TV series ---------------------------------------------------------------
// Each series has one or more seasons; each season has episodes. To add a new
// season later, just add another { number, episodes: [...] } object.
export const series = [
  {
    id: 'little-einsteins',
    title: 'Little Einsteins',
    profiles: ['noah', 'naia'],
    emoji: '🚀',
    color: '#2E6F95',
    tagline: 'Climb aboard Rocket for music, art, and adventures around the world.',
    seasons: [
      {
        number: 2,
        episodes: [
          { id: 'le-s02e01', title: 'The Christmas Wish', driveId: '1FxI4eVBUNkRV6k8hT5qs_oijN1hE7M5Z', emoji: '🎄', color: '#E63946', duration: '24 min' },
          { id: 'le-s02e02', title: 'How We Became Little Einsteins', driveId: '1Kot2PhR4dqHFak1JESXFBxdoLMm-JNDU', emoji: '🚀', color: '#457B9D', duration: '24 min' },
          { id: 'le-s02e03', title: 'Jump for Joey', driveId: '1RM2DdY-flDDrszyX2gc7KcSQ4Ii5F9Pl', emoji: '🦘', color: '#F4A261', duration: '24 min' },
          { id: 'le-s02e04', title: 'The Northern Night Light', driveId: '1r1ejcXnR-11PIi-S_hxr30rmdNKU63dL', emoji: '🌌', color: '#3A0CA3', duration: '24 min' },
          { id: 'le-s02e05', title: "O Yes, O Yes, It's Springtime!", driveId: '1nUcsxl-CLYyJ24EEPNgNbhh1YVNGmHZ6', emoji: '🌸', color: '#FF6BB5', duration: '24 min' },
          { id: 'le-s02e06', title: 'A Tall Totem Tale', driveId: '1f_AEQaMYJzMiq1S4jraemnUdS-IaxsZG', emoji: '🗿', color: '#2A9D8F', duration: '24 min' },
          { id: 'le-s02e07', title: 'The Incredible Shrinking Machine', driveId: '1E-d4tk-4VN8mPyi0ca7YjDwgBU3StoRb', emoji: '🔬', color: '#118AB2', duration: '24 min' },
          { id: 'le-s02e08', title: 'Duck, Duck, June', driveId: '1vlNOKYfN5t_WWlUPcrQCj7D3_yb5nU9Z', emoji: '🦆', color: '#06D6A0', duration: '24 min' },
          { id: 'le-s02e09', title: 'Rocket Safari', driveId: '1xEEXqLYp8gMeADUr-UIa49pCJ6_HlJ6Z', emoji: '🦁', color: '#FFB703', duration: '24 min' },
          { id: 'le-s02e10', title: 'Knock On Wood', driveId: '1qg0sxQ9dsoIEV-EkHxXjL3IId4bwlT-N', emoji: '🌳', color: '#52B788', duration: '24 min' },
          { id: 'le-s02e11', title: 'A Galactic Goodnight', driveId: '1y8bPzpPNECYoZLEiLyEA2LUX3YUl1ZOw', emoji: '🌙', color: '#5C6BC0', duration: '24 min' },
          { id: 'le-s02e12', title: 'The Birthday Machine', driveId: '15dsaeaEF42SccNHP7ENBpTx9ubIPEnT3', emoji: '🎂', color: '#EF476F', duration: '24 min' },
          { id: 'le-s02e13', title: 'A Brand New Outfit', driveId: '1KAOAWa3WGup9bMKGdWB95XTzQP_5UmFz', emoji: '👗', color: '#9B5DE5', duration: '24 min' },
          { id: 'le-s02e14', title: 'The Missing Invitation', driveId: '13ZGEDh5zod9Q2EaZiXZ8trPYg2nmenr-', emoji: '✉️', color: '#F77F00', duration: '24 min' },
        ],
      },
    ],
  },
]

// --- Movies ------------------------------------------------------------------
export const movies = [
  {
    id: 'curious-george-2006',
    title: 'Curious George',
    driveId: '167f3Ou4ZbKwMVZtx8puJ66zNqDrPUXDi',
    profiles: ['noah', 'naia'],
    emoji: '🐵',
    color: '#FFA62B',
    duration: '1 h 28 m',
  },
]

// ============================================================================
//  NOT YET PLAYABLE — needs converting from .mkv to .mp4
//  ---------------------------------------------------------------------------
//  Browsers can't play .mkv. Convert these to .mp4 (see scripts/README.md),
//  then add them above as a series (Mr. Rogers) or movies (Pooh, the films).
//
//  Mr. Rogers' Neighborhood  (Drive folder 1rAtG9Z5Hjuuu3QvweScGdvKw2LOPnrfW, ~30 eps)
//  The Many Adventures of Winnie the Pooh (1977)  1q_EqRnW1rj9FPmjyUlgWRKzAnICnKn4O
//  The Tiger Who Came To Tea (2019)               1f1CfgRZpHdh15bvkEkIAFQ3CUAZdDbUT
//  The Snowy Day (2016)                           1Nvk-S4tjWCunVwPZVrWfE1Z4Xsri16xx
// ============================================================================
