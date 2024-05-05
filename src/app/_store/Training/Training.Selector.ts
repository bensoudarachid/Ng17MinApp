import { createFeatureSelector, createSelector } from "@ngrx/store";
import { TrainingModel } from "@model/TrainingModel";

const gettrainingstate = createFeatureSelector<TrainingModel>('training');


export const getTrainingList = createSelector(gettrainingstate, (state) => {
    return state.list;
})

export const getEditdata = createSelector(gettrainingstate, (state) => {
    return state.editdata;
})