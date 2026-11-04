export interface HealthResponse {
  status: 'ok'
  app: 'stonewake'
  /** The API contract version. */
  version: string
  environment: string
}
