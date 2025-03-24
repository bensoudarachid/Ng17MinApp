import { createReducer, on } from "@ngrx/store";
import { authState } from "./Auth.State";
import { loginRequest, loginSuccess, loginFailure,logoutRequest, logoutSuccess, logoutFailure } from "./Auth.Actions";


const _AuthReducer = createReducer(authState,
    on(loginRequest, (state, action) => {
        console.log('auth reducer. login request')
        state = { ...state, isFetching: true }
        state = { ...state, isAuthenticated: false }
        return state
    }),
    on(loginSuccess, (state, action) => {
        console.log('auth reducer. login successful')
        state = { ...state, isFetching: false }
        state = { ...state, isAuthenticated: true }
        return state
    }),
    on(loginFailure, (state, action) => {
        console.log('auth reducer. login failure')
        state = { ...state, isFetching: false }
        state = { ...state, isAuthenticated: false }
        return state
    }),
    on(logoutRequest, (state, action) => {
        console.log('auth reducer. logout request')
        state = { ...state, isFetching: true }
        state = { ...state, isAuthenticated: false }
        return state
    }),
    on(logoutSuccess, (state, action) => {
        console.log('auth reducer. logout success')
        state = { ...state, isFetching: false }
        state = { ...state, isAuthenticated: false }
        return state
    }),
    on(logoutFailure, (state, action) => {
        console.log('auth reducer. logout failure')
        state = { ...state, isFetching: false }
        return state
    }),

)

export function AuthReducer(state: any, action: any) {
    return _AuthReducer(state, action)
}