import { types } from "mobx-state-tree"

export interface LoadingState {
  error: Error | null
  loading: boolean
}

const checkWhetherValueIsLoadingState = (value: any): value is LoadingState =>
  Object.prototype.hasOwnProperty.call(value, "error") &&
  Object.prototype.hasOwnProperty.call(value, "loading")

export const LoadingStateModel = types.custom<string, LoadingState>({
  name: "LoadingState",
  fromSnapshot(snapshot: string) {
    const loadingState = JSON.parse(snapshot) as LoadingState
    return loadingState
  },
  toSnapshot(value: LoadingState) {
    const snapshot = JSON.stringify(value)
    return snapshot
  },
  isTargetType(value: string | LoadingState): boolean {
    return checkWhetherValueIsLoadingState(value)
  },
  getValidationMessage(snapshot: string): string {
    return ""
  },
})
