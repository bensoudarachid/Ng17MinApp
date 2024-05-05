import { Auth } from "@model/Auth";

export const authState: Auth = {
    isFetching: false,
    isRegistrationFetching: false,
    isAuthenticated: false, //cookie.load('jwt') ? true : false,
    authority: '', //cookie.load('authority'),
    registrationStep: 1,
    registrationError: {},
  }
