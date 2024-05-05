import { createAction, props } from "@ngrx/store"
import { Training } from "../../../_model/Training"

export const LOAD_TRAINING = '[training] load training'
export const LOAD_TRAINING_SUCCESS = '[training] load training success'
export const LOAD_TRAINING_FAIL = '[training] load training fail'

export const GET_TRAINING = '[training] get training'
export const GET_TRAINING_SUCCESS = '[training] get training success'

export const ADD_TRAINING = '[training] add training'
export const ADD_TRAINING_SUCCESS = '[training] add training success'

export const UPDATE_TRAINING = '[training] update training'
export const UPDATE_TRAINING_SUCCESS = '[training] update training success'

export const DELETE_TRAINING = '[training] delete training'
export const DELETE_TRAINING_SUCCESS = '[training] delete training success'

export const SHOW_ALERT = '[training] show alert'


export const loadTraining = createAction(LOAD_TRAINING)
export const loadTrainingSuccess = createAction(LOAD_TRAINING_SUCCESS, props<{ list: Training[] }>())
export const loadTrainingFail = createAction(LOAD_TRAINING_FAIL, props<{ errormessage: string }>())

export const getTraining = createAction(GET_TRAINING, props<{ code: string }>())
export const getTrainingSuccess = createAction(GET_TRAINING_SUCCESS, props<{ obj: Training }>())


export const addTraining = createAction(ADD_TRAINING, props<{ inputdata: Training }>())
export const addTrainingSuccess = createAction(ADD_TRAINING_SUCCESS)

export const updateTraining = createAction(UPDATE_TRAINING, props<{ inputdata: Training }>())
export const updateTrainingSuccess = createAction(UPDATE_TRAINING_SUCCESS)

export const deleteTraining = createAction(DELETE_TRAINING, props<{ code: string }>())
export const deleteTrainingSuccess = createAction(DELETE_TRAINING_SUCCESS, props<{ code: string }>())

export const showAlert = createAction(SHOW_ALERT, props<{ message: string, resptype: string }>())
export const emptyAction = createAction('emptyaction')