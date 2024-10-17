import type { AxiosResponse } from 'axios'

type MakeSafeActionProps<T> = {
  action: () => Promise<AxiosResponse<T>>
}

type MakeSafeActionReturnType<T> = Promise<{
  data?: AxiosResponse<T>
  errorMessage?: string
}>

export async function makeSafeAction<T>({
  action
}: MakeSafeActionProps<T>): MakeSafeActionReturnType<T> {
  try {
    const data = await action()

    return { data }
  } catch (err) {
    return { errorMessage: (err as Error).message }
  }
}
