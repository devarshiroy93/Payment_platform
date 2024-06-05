export type SigninRequest = {
    username: string,
    password: string
}
export type SigininFormattedUiResponse = {
    isSuccess: boolean,
    token: string | null
}

export type SignInApiResponse = {
    isSuccess: boolean,
    body: {
        token: string,
        message: string
    }
}