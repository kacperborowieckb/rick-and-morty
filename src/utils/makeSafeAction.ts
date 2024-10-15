import type { AxiosError, AxiosResponse } from 'axios'

type MakeSafeActionProps<T> = {
  action: () => Promise<AxiosResponse<T>>
}

type MakeSafeActionReturnType<T> = Promise<{
  data?: AxiosResponse<T>
  errorMessage?: string
  errorStatus?: number
}>

export async function makeSafeAction<T>({
  action
}: MakeSafeActionProps<T>): MakeSafeActionReturnType<T> {
  try {
    const data = await action()

    return { data }
  } catch (err) {
    const { message, status } = err as AxiosError
    return { errorMessage: message, errorStatus: status }
  }
}
