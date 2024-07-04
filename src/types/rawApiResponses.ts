
//* Game Details
export interface GameDetailsApiResponse {
  id: number
  slug: string
  name: string
  name_original: string
  description: string
  metacritic: number
  metacritic_platforms: MetacriticPlatform[]
  released: string
  tba: boolean
  updated: string
  background_image: string
  background_image_additional: string
  website: string
  rating: number
  rating_top: number
  ratings: Rating[]
  reactions: Reactions
  added: number
  added_by_status: AddedByStatus
  playtime: number
  screenshots_count: number
  movies_count: number
  creators_count: number
  achievements_count: number
  parent_achievements_count: number
  reddit_url: string
  reddit_name: string
  reddit_description: string
  reddit_logo: string
  reddit_count: number
  twitch_count: number
  youtube_count: number
  reviews_text_count: number
  ratings_count: number
  suggestions_count: number
  alternative_names: string[]
  metacritic_url: string
  parents_count: number
  additions_count: number
  game_series_count: number
  user_game: StringOrNull
  reviews_count: number
  saturated_color: string
  dominant_color: string
  parent_platforms: ParentPlatform[]
  platforms: PlatformInfo[]
  stores: Store[]
  developers: Developer[]
  genres: Genre[]
  tags: Tag[]
  publishers: Publisher[]
  esrb_rating: EsrbRating
  clip: StringOrNull
  description_raw: string
}

interface MetacriticPlatform {
  metascore: number
  url: string
  platform: MetacriticBasePlatform
}

interface MetacriticBasePlatform {
  platform: number
  name: string
  slug: string
}

interface Rating {
  id: number
  title: string
  count: number
  percent: number
}

interface Reactions {
  [key: string]: number
}

interface AddedByStatus {
  yet: number
  owned: number
  beaten: number
  toplay: number
  dropped: number
  playing: number
}

interface ParentPlatform {
  platform: BasePlatform
}

interface BasePlatform {
  id: number
  name: string
  slug: string
}

interface PlatformInfo {
  platform: PlatformDetails
  released_at: string
  requirements: Requirements
}

interface PlatformDetails {
  id: number
  name: string
  slug: string
  image: StringOrNull
  year_end: StringOrNull
  year_start?: number
  games_count: number
  image_background: string
}

interface Requirements {
  minimum?: string
  recommended?: string
}

interface Store {
  id: number
  url: string
  store: Store2
}

interface Store2 {
  id: number
  name: string
  slug: string
  domain: string
  games_count: number
  image_background: string
}

interface Developer {
  id: number
  name: string
  slug: string
  games_count: number
  image_background: string
}

interface Genre {
  id: number
  name: string
  slug: string
  games_count: number
  image_background: string
}

interface Tag {
  id: number
  name: string
  slug: string
  language: string
  games_count: number
  image_background: string
}

interface Publisher {
  id: number
  name: string
  slug: string
  games_count: number
  image_background: string
}

interface EsrbRating {
  id: number
  name: string
  slug: string
}



//* Games Catalog
export interface GamesApiResponse {
  slug: string
  name: string
  playtime: number
  platforms: ParentPlatform[]
  stores: Store[]
  released: string
  tba: boolean
  background_image: string
  rating: number
  rating_top: number
  ratings: Rating[]
  ratings_count: number
  reviews_text_count: number
  added: number
  added_by_status: AddedByStatus
  metacritic: number
  suggestions_count: number
  updated: string
  id: number
  score: StringOrNull
  clip: StringOrNull
  tags: Tag[]
  esrb_rating: EsrbRating
  user_game: StringOrNull
  reviews_count: number
  saturated_color: string
  dominant_color: string
  short_screenshots: ShortScreenshot[]
  parent_platforms: ParentPlatform[]
  genres: Genre[]
}


interface Store {
  store: Store2
}

interface Store2 {
  id: number
  name: string
  slug: string
}

interface Rating {
  id: number
  title: string
  count: number
  percent: number
}

interface AddedByStatus {
  yet: number
  owned: number
  beaten: number
  toplay: number
  dropped: number
  playing: number
}

interface Tag {
  id: number
  name: string
  slug: string
  language: string
  games_count: number
  image_background: string
}

interface EsrbRating {
  id: number
  name: string
  slug: string
  name_en: string
  name_ru: string
}

interface ShortScreenshot {
  id: number
  image: string
}

interface Genre {
  id: number
  name: string
  slug: string
}
