import { createFeature, createReducer, on } from "@ngrx/store";
import { AuthStateInterface } from "../types/authState.interface";
import { authActions } from "./actions";
import { routerNavigatedAction } from "@ngrx/router-store";

const initialState: AuthStateInterface = {
    isSubmitting: false,
    currentUser: undefined,
    isLoading: false,
    validationErrors: null
}

const authFeature = createFeature({
    name: 'auth',
    reducer: createReducer(
        initialState,
        on(authActions.logout, (state) => ({ ...state, ...initialState, currentUser: null })),
        on(authActions.register, (state) => ({ ...state, isSubmitting: true, validationErrors: null })),
        on(authActions.registerSuccess, (state, action) => ({ ...state, isSubmitting: false, currentUser: action.currentUser })),
        on(authActions.registerFailure, (state, action) => ({
            ...state, isSubmitting: false,
            validationErrors: action.errors
        })),

        on(authActions.login, (state) => ({ ...state, isSubmitting: true, validationErrors: null })),
        on(authActions.loginSuccess, (state, action) => ({ ...state, isSubmitting: false, currentUser: action.currentUser })),
        on(authActions.loginFailure, (state, action) => ({
            ...state, isSubmitting: false,
            validationErrors: action.errors
        })),

        on(routerNavigatedAction, (state) => ({ ...state, validationErrors: null })),

        on(authActions.getCurrentUser, (state) => ({ ...state, isLoading: true })),
        on(authActions.getCurrentUserSuccess, (state, action) => ({ ...state, isLoading: false, currentUser: action.currentUser })),
        on(authActions.getCurrentUserFailure, (state) => ({
            ...state, isLoading: false,
            currentUser: null
        })),

        on(authActions.updateCurrentUserSuccess, (state, action) => ({ ...state, currentUser: action.currentUser })),
    ),
})

export const { name: authFeatureKey, reducer: authReducer, selectIsSubmitting, selectIsLoading, selectCurrentUser, selectValidationErrors } = authFeature