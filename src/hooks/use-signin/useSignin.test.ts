import { renderHook, act } from "@testing-library/react"
import { signIn as importedSignin } from "next-auth/react"
import useSignin from "@/hooks/use-signin/useSignin"

const signin = importedSignin as jest.Mock

const callbackUrl = "/admin/dashboard/indicators"

const successData = {
  error: null,
  ok: true,
  status: 200,
  url: callbackUrl,
}

const errorData = {
  error: "Some error",
  ok: false,
  status: 401,
  url: callbackUrl,
}

const credentials = {
  password: "password",
  email: "email",
}

jest.mock("next-auth/react", () => ({
  signIn: jest.fn(),
}))

const renderHookAndMock = (
  returnedData: typeof errorData | typeof successData | null = successData
) => {
  signin.mockReturnValue(returnedData)

  return renderHook(() => useSignin())
}

describe("Test useSignin util", () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  test("Should call nextAuth signin when returned fn is called", async () => {
    const { result } = renderHookAndMock()

    await act(() => result.current[0](credentials))

    expect(signin).toHaveBeenCalledWith("credentials", {
      ...credentials,
      callbackUrl,
    })
  })

  test("Should return right isSuccess and isError when success", async () => {
    const { result } = renderHookAndMock()

    await act(() => result.current[0](credentials))

    expect(result.current[1].isError).toBeFalsy()
    expect(result.current[1].isSuccess).toBeTruthy()
    expect(result.current[1].status).toBe(200)
  })

  test("Should return right isSuccess and isError when error", async () => {
    const { result } = renderHookAndMock(errorData)

    await act(() => result.current[0](credentials))

    expect(result.current[1].isError).toBeTruthy()
    expect(result.current[1].isSuccess).toBeFalsy()
    expect(result.current[1].status).toBe(401)
  })

  test("Should return null data and null status if no value returned", async () => {
    const { result } = renderHookAndMock(null)

    await act(() => result.current[0](credentials))

    expect(result.current[1].data).toBeNull()
    expect(result.current[1].status).toBeNull()
  })
})
