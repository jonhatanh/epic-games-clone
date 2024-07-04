export type AchievementType = {
  id: number,
  name: string,
  description: string,
  image: string,
  percent: string
}
export type AchievementsApiType = ApiResponseTemplate<AchievementType>

export type GenreType = {
  id: number,
  name: string,
  slug: string,
  games_count: number,
  image_background: string,
  description: string
}
export type GenreApiResponse = {
  id: number
  name: string
  slug: string
  games_count: number
  image_background: string
  games: GenreGame[]
}
type GenreGame = {
  id: number
  slug: string
  name: string
  added: number
}
export type GenreApiType = ApiResponseTemplate<GenreApiResponse>

export type GameVideosType = {
  id: number,
  name: string,
  preview: string,
  data: GameVideoData[]
}
type GameVideoData = {
  "480": string,
  max: string
}
export type GameVideosApiType = ApiResponseTemplate<GameVideosType>

export type GameScreenshotsType = {
  id: number
  image: string
  width: number
  height: number
  is_deleted: boolean
}
export type GameScreenshotsApiType = ApiResponseTemplate<GameScreenshotsType>
