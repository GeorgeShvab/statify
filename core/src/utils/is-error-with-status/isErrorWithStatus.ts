const isErrorWithStatus = (
  error: unknown
): error is { response: { status: number } } => {
  return (
    typeof error === "object" &&
    error !== null &&
    "response" in error &&
    typeof error.response === "object" &&
    error.response !== null &&
    "status" in error.response &&
    typeof error.response.status === "number"
  )
}

export default isErrorWithStatus
