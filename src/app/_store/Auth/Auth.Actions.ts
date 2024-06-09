import { createAction, props } from "@ngrx/store"

export const AUTH_GET_STATUS = '[Main] AUTH_GET_STATUS'
export const AUTH_SET_STATUS = '[Main] AUTH_SET_STATUS'

export const LOGIN_REQUEST = '[Main] LOGIN_REQUEST'
export const LOGIN_SUCCESS = '[Main] LOGIN_SUCCESS'
export const LOGIN_FAILURE = '[Main] LOGIN_FAILURE'

export const REFRESH_REQUEST = '[Main] REFRESH_REQUEST'

export const LOGOUT_REQUEST = '[Main] LOGOUT_REQUEST'
export const LOGOUT_SUCCESS = '[Main] LOGOUT_SUCCESS'
export const LOGOUT_FAILURE = '[Main] LOGOUT_FAILURE'

export const authGetStatus = createAction(AUTH_GET_STATUS)
export const authSetStatus = createAction(AUTH_SET_STATUS, props<{ authenticated: boolean }>())


export const loginRequest = createAction(LOGIN_REQUEST, props<{ email: string, password: string }>())
export const loginSuccess = createAction(LOGIN_SUCCESS, props<{ authority: string }>())
export const loginFailure = createAction(LOGIN_FAILURE, props<{ loginError: any }>())

export const logoutRequest = createAction(LOGOUT_REQUEST)
export const logoutSuccess = createAction(LOGOUT_SUCCESS)
export const logoutFailure = createAction(LOGOUT_FAILURE)

export const refreshRequest = createAction(REFRESH_REQUEST)




