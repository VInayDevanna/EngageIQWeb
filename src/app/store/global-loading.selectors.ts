import { createFeatureSelector, createSelector } from "@ngrx/store";
import { GlobalLoadingState } from "./global-loading.state";

export const selectGlobalLoadingState = createFeatureSelector<GlobalLoadingState>('globalLoading');

export const selectIsLoading = createSelector(
  selectGlobalLoadingState,
  (state: GlobalLoadingState) => state.isLoading
);