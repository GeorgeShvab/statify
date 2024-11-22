export interface MutationConfiguration<TArguments> {
  successMessage?: string
  errorMessage?: string
  onSuccess?: (args: TArguments) => void
  onError?: (args: TArguments) => void
}
