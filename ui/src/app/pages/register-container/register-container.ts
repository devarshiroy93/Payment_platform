
export interface RegisterApiRequest {
    username: string,
    password: string,
    firstName: string,
    lastName: string
}

export type RegisterApiFormattedUiResponse = { isSuccess: boolean, message: string  , id : number}

export type RegisterApiResponse = { isSuccess: boolean, body?: { message: string  , id : number} }