
export interface Auth {
     isFetching: boolean
     isRegistrationFetching: boolean
     isAuthenticated: boolean
     authority: string
     registrationStep: number
     registrationError: any
 }