import { ApplicationConfig, isDevMode } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideState, provideStore } from '@ngrx/store';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { authFeatureKey, authReducer } from './auth/store/reducers';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideEffects } from '@ngrx/effects';
import * as authEffects from './auth/store/effects';
import * as feedEffects from './shared/components/feed/store/effects';
import * as popularTagsEffects from './shared/components/popularTags/store/effects';
import * as addToFavoritesEffects from './shared/components/addToFavorites/store/effects';
import { provideRouterStore, routerReducer } from '@ngrx/router-store';
import { authInterceptor } from './shared/services/authInterceptor';
import { feedFeatureKey, feedReducer } from './shared/components/feed/store/reducers';
import { popularTagsFeatureKey, popularTagsReducer } from './shared/components/popularTags/store/reducers';
import { AddToFavoriteService } from './shared/components/addToFavorites/services/addToFavorites.service';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes),
  provideHttpClient(withInterceptors([authInterceptor])),
  provideClientHydration(),

  provideRouterStore(),
  provideStore({ router: routerReducer }),
  provideState(authFeatureKey, authReducer),
  provideState(feedFeatureKey, feedReducer),
  provideState(popularTagsFeatureKey, popularTagsReducer),
  provideEffects(authEffects, feedEffects, popularTagsEffects, addToFavoritesEffects),

  provideStoreDevtools({
    maxAge: 25,
    logOnly: !isDevMode(),
    autoPause: true,
    trace: false,
    traceLimit: 75
  }),
  AddToFavoriteService
  ]
};
