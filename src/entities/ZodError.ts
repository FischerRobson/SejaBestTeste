export interface ZodError {
  issues: {
    path: string[]
    message: string
  }[]
  name: string
}
