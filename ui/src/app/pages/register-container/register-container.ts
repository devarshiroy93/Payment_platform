
export interface RegisterApiRequest {
    username: string,
    password: string,
    firstName: string,
    lastName: string
}

export type RegisterApiFormattedUiResponse = { isSuccess: boolean, message: string }

export type RegisterApiResponse = { isSuccess: boolean, body?: { message: string } }