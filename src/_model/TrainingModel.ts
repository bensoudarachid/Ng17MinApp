import { Training } from './Training'

export interface TrainingModel{
  list:Training[],
  errorMessage:string,
  editData:Training
}