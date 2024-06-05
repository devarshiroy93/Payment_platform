export interface AlertSettings {
    show : boolean,
    type:  'error' | 'success' | 'info'
    message : string
}

export const DefaultAlertSettings : AlertSettings =  { 
    show : false,
    type : 'info',
    message : 'Dummy message'
}