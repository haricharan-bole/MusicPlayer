import { Instance, SnapshotOut, types } from "mobx-state-tree"
import { CharacterStoreModel } from "../character-store/character-store"
import { AlbumStoreModel } from "../album-store/album-store"
import { TrackStoreModel } from "../track-store/track-store"

/**
 * A RootStore model.
 */
// prettier-ignore
export const RootStoreModel = types.model("RootStore").props({
  characterStore: types.optional(CharacterStoreModel, {} as any),
  albumStore: types.optional(AlbumStoreModel, {} as any),
  trackStore: types.optional(TrackStoreModel, {} as any),

})

/**
 * The RootStore instance.
 */
export interface RootStore extends Instance<typeof RootStoreModel> {}

/**
 * The data of a RootStore.
 */
export interface RootStoreSnapshot extends SnapshotOut<typeof RootStoreModel> {}
