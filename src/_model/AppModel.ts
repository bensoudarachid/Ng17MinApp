import { Training } from './Training'
import { TrainingModel } from './TrainingModel'

export interface AppModel{
  auth:{
    isFetching: boolean
    isRegistrationFetching: boolean
    isAuthenticated: boolean
    authority: string
    registrationStep: number
    registrationError: any
  },
  training:TrainingModel
  // {
  //   list:Training[],
  //   errorMessage:string,
  //   editdata:Training
  // }   
}