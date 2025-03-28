// import { TrEvent } from './trevent'
export interface Training {
  id: number
  title: string
  secondaryTitle: string
  shortDescription: string
  longDescription: string
  duration: number
  /** Rating value between 1 and 10 */
  rating: number
  // events: TrEvent[]
}
