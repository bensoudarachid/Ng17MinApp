import { createReducer, on } from "@ngrx/store";
import { trainingState } from "./Training.State";
import { deleteTrainingSuccess, getTrainingSuccess, loadTrainingFail, loadTrainingSuccess } from "./Training.Actions";

const _TrainingReducer = createReducer(trainingState,
    on(loadTrainingSuccess, (state, action) => {
        console.log('training reducer. load trainings is successful')
        return {
            ...state,
            list: action.list,
            errormessage: '',
            editdata:{
                id: "",
                title: "",
                shortDescription: ""              
            }
        }
    }),
    on(getTrainingSuccess, (state, action) => {
        return {
            ...state,
            errormessage: '',
            editdata:action.obj
        }
    }),
    on(loadTrainingFail, (state, action) => {
        return {
            ...state,
            list: [],
            errormessage: action.errormessage
        }
    }),
    on(deleteTrainingSuccess, (state, action) => {
        let _newdata=state.list.filter(o=>""+o.id!==action.code);
        return {
            ...state,
            list: _newdata,
            errormessage: ''
        }
    })

)


export function TrainingReducer(state: any, action: any) {
    return _TrainingReducer(state, action)
}