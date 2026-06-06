// ============================================================================
//  KidFlix content catalog
//  ---------------------------------------------------------------------------
//  This is the ONLY file you normally need to edit to add or remove shows.
//
//  HOW TO ADD A VIDEO FROM YOUR GOOGLE DRIVE
//  1. In Google Drive, upload your video (mp4 works best).
//  2. Right-click the file -> Share -> set "General access" to
//     "Anyone with the link" -> "Viewer". (Needed so the app can play it.)
//  3. Click "Copy link". It looks like:
//        https://drive.google.com/file/d/1AbCdEfGhIjKlMnOpQrStUvWxYz/view?usp=sharing
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
  'Nursery Rhymes & Songs',
  'Learning Time',
  'Story Time',
  'Animals & Nature',
  'Calm & Sleepy',
]

// --- The shows ---------------------------------------------------------------
// NOTE: the `driveId` values below are PLACEHOLDERS. The cards will render and
// the whole app works, but tapping play will show a friendly "add your video"
// message until you replace each driveId with a real Google Drive file ID.
export const shows = [
  {
    id: 'abc-song',
    title: 'The ABC Song',
    driveId: 'REPLACE_WITH_DRIVE_FILE_ID',
    category: 'Nursery Rhymes & Songs',
    profiles: ['noah', 'naia'],
    emoji: '🔤',
    color: '#FF9F1C',
    duration: '2 min',
  },
  {
    id: 'twinkle-star',
    title: 'Twinkle Twinkle Little Star',
    driveId: 'REPLACE_WITH_DRIVE_FILE_ID',
    category: 'Nursery Rhymes & Songs',
    profiles: ['noah', 'naia'],
    emoji: '⭐',
    color: '#5C6BC0',
    duration: '3 min',
  },
  {
    id: 'wheels-bus',
    title: 'The Wheels on the Bus',
    driveId: 'REPLACE_WITH_DRIVE_FILE_ID',
    category: 'Nursery Rhymes & Songs',
    profiles: ['noah', 'naia'],
    emoji: '🚌',
    color: '#EF476F',
    duration: '3 min',
  },
  {
    id: 'count-to-ten',
    title: 'Count to Ten',
    driveId: 'REPLACE_WITH_DRIVE_FILE_ID',
    category: 'Learning Time',
    profiles: ['noah', 'naia'],
    emoji: '🔢',
    color: '#06D6A0',
    duration: '4 min',
  },
  {
    id: 'colors-shapes',
    title: 'Colors & Shapes',
    driveId: 'REPLACE_WITH_DRIVE_FILE_ID',
    category: 'Learning Time',
    profiles: ['noah', 'naia'],
    emoji: '🟦',
    color: '#118AB2',
    duration: '5 min',
  },
  {
    id: 'first-words',
    title: 'My First Words',
    driveId: 'REPLACE_WITH_DRIVE_FILE_ID',
    category: 'Learning Time',
    profiles: ['naia'],
    emoji: '💬',
    color: '#FFB703',
    duration: '4 min',
  },
  {
    id: 'three-pigs',
    title: 'The Three Little Pigs',
    driveId: 'REPLACE_WITH_DRIVE_FILE_ID',
    category: 'Story Time',
    profiles: ['noah'],
    emoji: '🐷',
    color: '#F4A261',
    duration: '7 min',
  },
  {
    id: 'goodnight-moon',
    title: 'Goodnight Moon',
    driveId: 'REPLACE_WITH_DRIVE_FILE_ID',
    category: 'Story Time',
    profiles: ['noah', 'naia'],
    emoji: '🌙',
    color: '#3A0CA3',
    duration: '6 min',
  },
  {
    id: 'farm-animals',
    title: 'Farm Animal Sounds',
    driveId: 'REPLACE_WITH_DRIVE_FILE_ID',
    category: 'Animals & Nature',
    profiles: ['noah', 'naia'],
    emoji: '🐮',
    color: '#2A9D8F',
    duration: '4 min',
  },
  {
    id: 'ocean-friends',
    title: 'Under the Sea Friends',
    driveId: 'REPLACE_WITH_DRIVE_FILE_ID',
    category: 'Animals & Nature',
    profiles: ['noah'],
    emoji: '🐠',
    color: '#00B4D8',
    duration: '5 min',
  },
  {
    id: 'lullaby',
    title: 'Sleepy Time Lullabies',
    driveId: 'REPLACE_WITH_DRIVE_FILE_ID',
    category: 'Calm & Sleepy',
    profiles: ['noah', 'naia'],
    emoji: '😴',
    color: '#6A4C93',
    duration: '10 min',
  },
  {
    id: 'rain-sounds',
    title: 'Gentle Rain & Soft Music',
    driveId: 'REPLACE_WITH_DRIVE_FILE_ID',
    category: 'Calm & Sleepy',
    profiles: ['noah', 'naia'],
    emoji: '🌧️',
    color: '#577590',
    duration: '15 min',
  },
]
