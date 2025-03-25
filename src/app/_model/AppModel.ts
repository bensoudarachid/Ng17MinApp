import { AuthModel } from "./AuthModel";
import { TrainingModel } from "./TrainingModel";

export interface AppModel {
    auth: AuthModel;
    training: TrainingModel;
    isLoading: boolean;
    ui: {
        isSaving: boolean;
    };
}
