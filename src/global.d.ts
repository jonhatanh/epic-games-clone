type StringOrNull = string | null

type ApiResponseTemplate<T> = {
  count: number,
  next: StringOrNull,
  previous: StringOrNull,
  results: T[]
}