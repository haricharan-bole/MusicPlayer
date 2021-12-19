import { Instance, SnapshotOut, types, flow } from "mobx-state-tree"
import { AlbumModel, AlbumSnapshot, Album } from "../album/album"
import { AlbumApi } from "../../services/api/album-api"
import { withEnvironment } from "../extensions/with-environment"

/**
 * Example store containing Rick and Morty characters
 */
export const AlbumStoreModel = types
  .model("AlbumStore")
  .props({
    albums: types.optional(types.array(AlbumModel), []),
    selectedAlbumIndex: types.optional(types.number, 0),
  })
  .extend(withEnvironment)
  .views((self) => ({
    get selectedAlbum(): Album {
      return self.albums[self.selectedAlbumIndex]
    },
  }))
  .actions((self) => ({
    read: flow(function* () {
      const albumApi = new AlbumApi(self.environment.api)
      const result = yield albumApi.getAlbums()
      if (result.kind === "ok") {
        self.albums.clear()
        self.albums.push(...result.albums)
      } else {
        __DEV__ && console.tron.log(result.kind)
      }
    }),
    setSelectedAlbumIndex: (index: number): void => {
      if (index >= 0 && index < self.albums.length) {
        self.selectedAlbumIndex = index
      } else {
        __DEV__ && console.tron.log("Invalid Index")
      }
    },
  }))

type AlbumStoreType = Instance<typeof AlbumStoreModel>
export interface AlbumStore extends AlbumStoreType {}
type AlbumStoreSnapshotType = SnapshotOut<typeof AlbumStoreModel>
export interface AlbumStoreSnapshot extends AlbumStoreSnapshotType {}
export const createAlbumStoreDefaultModel = () => types.optional(AlbumStoreModel, {})
