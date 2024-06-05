export interface ErrorMessage {
    [key: string]: string
}
export interface FormState {
    valid: boolean,
    touched: boolean,
    dirty: boolean
}
export const DefaultErrorMessageConfig: ErrorMessage = {
    'email': 'Value should be of email',
    'required': 'Field value is required'
}

export const DefaultFormState: FormState = {

    valid: false,
    touched: false,
    dirty: false
}