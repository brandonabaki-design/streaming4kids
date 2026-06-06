// ============================================================================
//  KidFlix content catalog
//  ---------------------------------------------------------------------------
//  Three kinds of things: profiles (the kids), series (TV shows grouped into
//  seasons -> episodes), and movies (standalone films).
//
//  TO ADD A VIDEO: upload mp4 to Drive, ensure the "Kids Media" folder is
//  shared "Anyone with the link -> Viewer", copy the link, and paste the ID
//  (the code between /d/ and /view) as driveId in a new episode or movie.
// ============================================================================

export const profiles = [
  { id: 'noah', name: 'Noah', emoji: '🦁', color: '#3D8BFF', ageLabel: '3 years' },
  { id: 'naia', name: 'Naia', emoji: '🦋', color: '#FF6BB5', ageLabel: '19 months' },
]

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
          { id: "le-s02e01", title: "The Christmas Wish", driveId: "1FxI4eVBUNkRV6k8hT5qs_oijN1hE7M5Z", emoji: "🎄", color: "#E63946", duration: "24 min" },
          { id: "le-s02e02", title: "How We Became Little Einsteins", driveId: "1Kot2PhR4dqHFak1JESXFBxdoLMm-JNDU", emoji: "🚀", color: "#457B9D", duration: "24 min" },
          { id: "le-s02e03", title: "Jump for Joey", driveId: "1RM2DdY-flDDrszyX2gc7KcSQ4Ii5F9Pl", emoji: "🦘", color: "#F4A261", duration: "24 min" },
          { id: "le-s02e04", title: "The Northern Night Light", driveId: "1r1ejcXnR-11PIi-S_hxr30rmdNKU63dL", emoji: "🌌", color: "#3A0CA3", duration: "24 min" },
          { id: "le-s02e05", title: "O Yes, O Yes, It's Springtime!", driveId: "1nUcsxl-CLYyJ24EEPNgNbhh1YVNGmHZ6", emoji: "🌸", color: "#FF6BB5", duration: "24 min" },
          { id: "le-s02e06", title: "A Tall Totem Tale", driveId: "1f_AEQaMYJzMiq1S4jraemnUdS-IaxsZG", emoji: "🗿", color: "#2A9D8F", duration: "24 min" },
          { id: "le-s02e07", title: "The Incredible Shrinking Machine", driveId: "1E-d4tk-4VN8mPyi0ca7YjDwgBU3StoRb", emoji: "🔬", color: "#118AB2", duration: "24 min" },
          { id: "le-s02e08", title: "Duck, Duck, June", driveId: "1vlNOKYfN5t_WWlUPcrQCj7D3_yb5nU9Z", emoji: "🦆", color: "#06D6A0", duration: "24 min" },
          { id: "le-s02e09", title: "Rocket Safari", driveId: "1xEEXqLYp8gMeADUr-UIa49pCJ6_HlJ6Z", emoji: "🦁", color: "#FFB703", duration: "24 min" },
          { id: "le-s02e10", title: "Knock On Wood", driveId: "1qg0sxQ9dsoIEV-EkHxXjL3IId4bwlT-N", emoji: "🌳", color: "#52B788", duration: "24 min" },
          { id: "le-s02e11", title: "A Galactic Goodnight", driveId: "1y8bPzpPNECYoZLEiLyEA2LUX3YUl1ZOw", emoji: "🌙", color: "#5C6BC0", duration: "24 min" },
          { id: "le-s02e12", title: "The Birthday Machine", driveId: "15dsaeaEF42SccNHP7ENBpTx9ubIPEnT3", emoji: "🎂", color: "#EF476F", duration: "24 min" },
          { id: "le-s02e13", title: "A Brand New Outfit", driveId: "1KAOAWa3WGup9bMKGdWB95XTzQP_5UmFz", emoji: "👗", color: "#9B5DE5", duration: "24 min" },
          { id: "le-s02e14", title: "The Missing Invitation", driveId: "13ZGEDh5zod9Q2EaZiXZ8trPYg2nmenr-", emoji: "✉️", color: "#F77F00", duration: "24 min" },
        ],
      },
    ],
  },
  {
    id: 'mister-rogers',
    title: "Mister Rogers' Neighborhood",
    profiles: ['noah', 'naia'],
    emoji: '🧶',
    color: '#C84B31',
    tagline: 'A gentle visit to the Neighborhood with Mister Rogers.',
    seasons: [
      {
        number: 10,
        episodes: [
          { id: "mr-s10e02", title: "Starting School", driveId: "1MoI7t7P_nnYqU1xNDHcVFir69km4vVhV", emoji: "🧶", color: "#C84B31", duration: "S10 · E2" },
          { id: "mr-s10e03", title: "Starting School", driveId: "17YivA7yxk10x4CpmGIwiSCCb0ZXrPClF", emoji: "🚎", color: "#2D6A4F", duration: "S10 · E3" },
          { id: "mr-s10e04", title: "Starting School", driveId: "1ti6UvAbr5CbdfuxY2o0E0p8JXm9zts4K", emoji: "🏡", color: "#3D5A80", duration: "S10 · E4" },
          { id: "mr-s10e05", title: "Starting School", driveId: "1JbeG-2HmOn0XpNBb9_aIGbqZYzjpy-g4", emoji: "🎵", color: "#9C6644", duration: "S10 · E5" },
        ],
      },
      {
        number: 11,
        episodes: [
          { id: "mr-s11e04", title: "Divorce", driveId: "1waQO0STPAyNHGQyQSRi9ISYH3XCKZwS4", emoji: "🌳", color: "#5F0F40", duration: "S11 · E4" },
          { id: "mr-s11e12", title: "Competition", driveId: "1t-g4PEzC7q6vl2YNhKn01HAz4ilCCG3C", emoji: "😊", color: "#1B7A8C", duration: "S11 · E12" },
        ],
      },
      {
        number: 13,
        episodes: [
          { id: "mr-s13e12", title: "The King & Queen Plan a Trip", driveId: "1KQmODQcyIKvcimwpUWdwzqZcpRScB5QH", emoji: "🖍️", color: "#BC6C25", duration: "S13 · E12" },
          { id: "mr-s13e13", title: "Day Care & Night Care", driveId: "1EDN8Nd0Z6u21bS7NN8Sly2BotZmvFJTy", emoji: "🐢", color: "#4A4E69", duration: "S13 · E13" },
          { id: "mr-s13e14", title: "Day Care & Night Care", driveId: "1oGeSoBQAZI9lWiJKLs5NlWMaQOuiDkXt", emoji: "🌟", color: "#6A994E", duration: "S13 · E14" },
          { id: "mr-s13e15", title: "Day Care & Night Care", driveId: "13joJ7K3yva6HpzLo7XFWmf9ki78XadCL", emoji: "🫖", color: "#9A348E", duration: "S13 · E15" },
          { id: "mr-s13e16", title: "Day Care & Night Care", driveId: "17hNLmcANWoDY0Sr5f8Jy9R8LeoxCyN2C", emoji: "🌼", color: "#C84B31", duration: "S13 · E16" },
        ],
      },
      {
        number: 16,
        episodes: [
          { id: "mr-s16e13", title: "Celebrations", driveId: "124xB-31KefQAt-QrB5gjnyl4EcHR8CqG", emoji: "🧸", color: "#2D6A4F", duration: "S16 · E13" },
        ],
      },
      {
        number: 17,
        episodes: [
          { id: "mr-s17e15", title: "Making Mistakes", driveId: "1hIlt8pUz0Pg0jg9TuQRPMdoWmXxBKehr", emoji: "🧶", color: "#3D5A80", duration: "S17 · E15" },
        ],
      },
      {
        number: 19,
        episodes: [
          { id: "mr-s19e11", title: "Josephine the Short-Neck Giraffe", driveId: "1TOIzDZkVwoG-FBmp3iWvcuXoz0U4njgA", emoji: "🚎", color: "#9C6644", duration: "S19 · E11" },
          { id: "mr-s19e12", title: "Josephine the Short-Neck Giraffe", driveId: "1TFf8BQ3wp8Ai3-2iiSuTwF5ct-TxosCC", emoji: "🏡", color: "#5F0F40", duration: "S19 · E12" },
          { id: "mr-s19e13", title: "Josephine the Short-Neck Giraffe", driveId: "1GhmOmGTdGyHs2i-fR8CvnoSFMQtHIkwA", emoji: "🎵", color: "#1B7A8C", duration: "S19 · E13" },
          { id: "mr-s19e14", title: "Josephine the Short-Neck Giraffe", driveId: "1nmaMwblgC1NCFHg8rWbjA2-A_EkjvUHS", emoji: "🌳", color: "#BC6C25", duration: "S19 · E14" },
          { id: "mr-s19e15", title: "Josephine the Short-Neck Giraffe", driveId: "18qGeX9_0ANwJCkmHpwkP9RntHgaVdhf1", emoji: "😊", color: "#4A4E69", duration: "S19 · E15" },
        ],
      },
      {
        number: 21,
        episodes: [
          { id: "mr-s21e08", title: "Growing", driveId: "1hfAiZV-33Mh927KE7mmJj7fPqr37wdvB", emoji: "🖍️", color: "#6A994E", duration: "S21 · E8" },
        ],
      },
      {
        number: 22,
        episodes: [
          { id: "mr-s22e11", title: "Learning", driveId: "1dVQb4gH0TW9sgiohtgsupljOEkj2xhkl", emoji: "🐢", color: "#9A348E", duration: "S22 · E11" },
          { id: "mr-s22e12", title: "Learning", driveId: "1-m3XPDM8b9V9zR7ejKYDre2v6tskbiSd", emoji: "🌟", color: "#C84B31", duration: "S22 · E12" },
          { id: "mr-s22e13", title: "Learning", driveId: "19x87BPKSyng_LvG6ulxgjvTdFBOPIWYS", emoji: "🫖", color: "#2D6A4F", duration: "S22 · E13" },
          { id: "mr-s22e14", title: "Learning", driveId: "1MD4yt6ipMvCasBEib6W_RaYctOuUp-uN", emoji: "🌼", color: "#3D5A80", duration: "S22 · E14" },
          { id: "mr-s22e15", title: "Learning", driveId: "1eJGccALnoLv1R5DI01kaCx43Zl634646", emoji: "🧸", color: "#9C6644", duration: "S22 · E15" },
        ],
      },
      {
        number: 26,
        episodes: [
          { id: "mr-s26e03", title: "Mad Feelings", driveId: "1qC8rwoGPjkxHXHEHDgVVprq56HdzSmen", emoji: "🧶", color: "#5F0F40", duration: "S26 · E3" },
          { id: "mr-s26e04", title: "Mad Feelings", driveId: "13fa2MNFP4JV-TXZhzwNwerBZkL2MYIW7", emoji: "🚎", color: "#1B7A8C", duration: "S26 · E4" },
          { id: "mr-s26e05", title: "Mad Feelings", driveId: "1iWi1R-2ihXU3WL9kI6NzKVYOY1W_YHNp", emoji: "🏡", color: "#BC6C25", duration: "S26 · E5" },
          { id: "mr-s26e08", title: "Transformations", driveId: "10kf5e71RtLOX44NeheI38UgcG508pSYt", emoji: "🎵", color: "#4A4E69", duration: "S26 · E8" },
        ],
      },
      {
        number: 29,
        episodes: [
          { id: "mr-s29e03", title: "Noisy and Quiet", driveId: "17sKx2x96eMF4rU_YH6Uk2UBft9_AkIdJ", emoji: "🌳", color: "#6A994E", duration: "S29 · E3" },
          { id: "mr-s29e09", title: "Go-Stop-Go", driveId: "1K3F_D3BVZM2n48S2F8WfB5VALeijFkIt", emoji: "😊", color: "#9A348E", duration: "S29 · E9" },
        ],
      },
    ],
  },
]

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
  {
    id: 'winnie-the-pooh-1977',
    title: 'The Many Adventures of Winnie the Pooh',
    driveId: '1j3Qk1AQh7p7SiAsb3WxzbpEnRl7Ru5zA',
    profiles: ['noah', 'naia'],
    emoji: '🐻',
    color: '#E8A33D',
    duration: '1 h 14 m',
  },
  {
    id: 'tiger-who-came-to-tea',
    title: 'The Tiger Who Came To Tea',
    driveId: '1XVIxK4KysJbNneFk7c5hmdTPS69MUShl',
    profiles: ['noah', 'naia'],
    emoji: '🐯',
    color: '#F4843E',
    duration: '24 min',
  },
  {
    // Note: originally HEVC/x265. If it doesn't play in some browsers, it may
    // need a full re-encode to H.264 (see scripts/README.md).
    id: 'the-snowy-day-2016',
    title: 'The Snowy Day',
    driveId: '1pELVWbnlujBS6MxCkLoOjzKNNdm5iNBM',
    profiles: ['noah', 'naia'],
    emoji: '⛄',
    color: '#6FB7E6',
    duration: '38 min',
  },
]
