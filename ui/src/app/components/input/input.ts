export interface Settings {
    placeholder: string,
    label: string,
    name : string
    type: 'text' | 'password'
}

export const defaultSettings: Settings = {

    label: 'Please provide label text',
    placeholder: 'Please provide plaveholder text',
    type: 'text',
    name : 'name'
}