import { createFeatureSelector, createSelector } from "@ngrx/store";
import { Auth } from "@model/Auth";

const getAuthState = createFeatureSelector<Auth>('auth');


export const getIsAuthenticated = createSelector(getAuthState, (state) => {
    return state.isAuthenticated;
})

export const getEditdata = createSelector(getAuthState, (state) => {
    return state.isFetching;
})



// isFetching: boolean
// isRegistrationFetching: boolean
// isAuthenticated: boolean
// authority: string
// registrationStep: number
// registrationError: any
