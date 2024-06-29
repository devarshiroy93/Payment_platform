export type GetContactListResponse = {
    isSuccess: boolean,
    body: Contact[]
}

export type Contact = {
    id: number,
    firstName: string,
    lastName: string
}

export type SendMoneyRequest = {
    userId: number,
    amount: number
}

export type SendMoneyResponse = {
    isSuccess: boolean,
    message: string,
    data: any
}