export interface GetOnRampTransactionsResponse {

    isSuccess: boolean,
    message: string,
    data: OnRampTransaction[]
}

export interface OnRampTransaction {
    id: string,
    status: string,
    token: string,
    provider: string,
    amount: number,
    startTime: string,
    userId: number

}