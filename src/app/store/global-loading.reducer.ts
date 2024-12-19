import { createReducer, on } from '@ngrx/store';
import { showLoading, hideLoading } from './global-loading.actions';
import { initialGlobalLoadingState } from './global-loading.state';

export const globalLoadingReducer = createReducer(
  initialGlobalLoadingState,
  
  on(showLoading, (state) => ({ ...state, isLoading: true })),
  
  on(hideLoading, (state) => ({ ...state, isLoading: false }))
);