import { Agency } from '../entities/agency'

export interface AgencyResponse {
  status: string | undefined,
  data?: Agency[]
  error?: string | unknown
}
