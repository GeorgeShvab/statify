export interface MutationConfiguration {
  successMessage?: string
  errorMessage?: string
  onSuccess?: () => void
  onError?: () => void
}
