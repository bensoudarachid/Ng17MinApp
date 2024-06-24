import { Training } from './Training'

export interface AppModel{
  auth:{
    isFetching: boolean
    isRegistrationFetching: boolean
    isAuthenticated: boolean
    authority: string
    registrationStep: number
    registrationError: any
  },
  training:{
    list:Training[],
    errorMessage:string,
    editdata:Training
  }   
}