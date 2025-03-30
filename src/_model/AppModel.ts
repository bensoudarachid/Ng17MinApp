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
  ui: {
    isSaving: boolean;
    footerMessage: string | null; // Added for footer notifications
  };

  // {
  //   list:Training[],
  //   errorMessage:string,
  //   editdata:Training
  // }   
}
