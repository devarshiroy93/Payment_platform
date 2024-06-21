export interface StartOnRampTxnRequest {

    amount: number,
    provider: string
}

export interface StartOnRampTxnResponse {
    isSuccess: boolean,
    message: string,
    data: {
        txnToken: string
    } |  null

}