import { TrainingModel } from "@model/TrainingModel";

export const trainingState: TrainingModel = {
    list: [],
    errorMessage: '',
    editData:{
        id: -1,
        title: "",
        secondaryTitle: "",
        shortDescription: "",
        longDescription: "",
        duration: 0
      }
}