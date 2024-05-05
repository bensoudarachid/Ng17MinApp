import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { TrainingsService } from '@app/tenantapp/services/trainings/trainings.service';
import { addTraining, addTrainingSuccess, deleteTraining, deleteTrainingSuccess, emptyAction, getTraining, getTrainingSuccess, loadTraining, loadTrainingFail, loadTrainingSuccess, showAlert, updateTraining, updateTrainingSuccess } from "./Training.Actions";
import { catchError, exhaustMap, map, of, switchMap } from "rxjs";
import { MatSnackBar } from '@angular/material/snack-bar'

@Injectable()
export class TrainingEffects {
    constructor(private action$: Actions, private service: TrainingsService, private _snackbar: MatSnackBar) {

    }

    _loadTraining = createEffect(() =>
        this.action$.pipe(
            ofType(loadTraining),
            exhaustMap((action) => {
                console.log('training effect. load trainings by calling service')
                return this.service.getTrainings().pipe(
                    map((data) => {
                        return loadTrainingSuccess({ list: data })
                    }),
                    catchError((_err) => of(loadTrainingFail({ errormessage: _err.message })))
                )
            })
        )
    )

//     _getTraining = createEffect(() =>
//     this.action$.pipe(
//         ofType(getTraining),
//         exhaustMap((action) => {
//             return this.service.GetTrainingbycode(action.code).pipe(
//                 map((data) => {
//                     return getTrainingSuccess({ obj: data })
//                 }),
//                 catchError((_err) => of(emptyAction()))
//             )
//         })
//     )
// )

//     _addTraining = createEffect(() =>
//         this.action$.pipe(
//             ofType(addTraining),
//             switchMap((action) => {
//                 return this.service.CreateTraining(action.inputdata).pipe(
//                     switchMap(() => {
//                         return of(addTrainingSuccess(), showAlert({ message: 'Added successfully', resptype: 'pass' }))
//                     }),
//                     catchError((_err) => of(showAlert({ message: 'Failed to add', resptype: 'fail' })))
//                 )
//             })
//         )
//     )

//     _updateTraining = createEffect(() =>
//         this.action$.pipe(
//             ofType(updateTraining),
//             switchMap((action) => {
//                 return this.service.UpdateTraining(action.inputdata).pipe(
//                     switchMap(() => {
//                         return of(updateTrainingSuccess(), showAlert({ message: 'Updated successfully', resptype: 'pass' }))
//                     }),
//                     catchError((_err) => of(showAlert({ message: 'Failed to update', resptype: 'fail' })))
//                 )
//             })
//         )
//     )

//     _deleteTraining = createEffect(() =>
//         this.action$.pipe(
//             ofType(deleteTraining),
//             switchMap((action) => {
//                 return this.service.DeleteTraining(action.code).pipe(
//                     switchMap(() => {
//                         return of(deleteTrainingSuccess({code:action.code}), showAlert({ message: 'Removed successfully', resptype: 'pass' }))
//                     }),
//                     catchError((_err) => of(showAlert({ message: 'Failed to delete', resptype: 'fail' })))
//                 )
//             })
//         )
//     )

    _showalert = createEffect(() =>
        this.action$.pipe(
            ofType(showAlert),
            exhaustMap((action) => {
                return this.Showsnackbaraler(action.message, action.resptype).afterDismissed().pipe(
                    map(() => {
                        return emptyAction();
                    })
                )
            })
        )
    )

    Showsnackbaraler(message: string, resptype: string = 'fail') {
        let _class = resptype === 'pass' ? 'text-green' : 'text-red';
        return this._snackbar.open(message, 'OK', {
            verticalPosition: 'top',
            horizontalPosition: 'end',
            duration: 5000,
            panelClass: [_class]
        })
    }

}