import { Instance, SnapshotOut, types, flow } from "mobx-state-tree"
import { AlbumModel, AlbumSnapshot, Album } from "../album/album"
import { AlbumApi } from "../../services/api/album-api"
import { withEnvironment } from "../extensions/with-environment"
import { ContributingArtists } from ".."

const ArtistIdName = types.model({
  name: types.string,
})

/**
 * Example store containing Rick and Morty characters
 */
export const AlbumStoreModel = types
  .model("AlbumStore")
  .props({
    albums: types.optional(types.array(AlbumModel), []),
    selectedAlbumIndex: types.optional(types.number, 0),
    artistNames: types.map(ArtistIdName),
  })
  .extend(withEnvironment)
  .views((self) => ({
    get selectedAlbum(): Album {
      return self.albums[self.selectedAlbumIndex]
    },
    getContributingArtistNames(artists: ContributingArtists): string {
      const artistIds = []

      Object.keys(artists).forEach((artistType) => {
        artists[artistType] && artistIds.push(artists[artistType])
      })

      const finalArtistIDs = []
      artistIds.forEach((artistId: string) => {
        finalArtistIDs.push(...artistId.split(","))
      })

      const finalArtistNames = finalArtistIDs.map((artistId) => {
        return self?.artistNames?.get(artistId)?.name
      })

      return finalArtistNames.toString().replace(/,/g, ", ")
    },
  }))
  .actions((self) => ({
    read: flow(function* () {
      const albumApi = new AlbumApi(self.environment.api)
      const result = yield albumApi.getAlbums(self.albums.length)
      if (result.kind === "ok") {
        self.albums.push(...result.albums)

        const artistIds = []

        self.albums.forEach((album) => {
          Object.keys(album.contributingArtists).forEach((artistType) => {
            album.contributingArtists[artistType] &&
              artistIds.push(album.contributingArtists[artistType])
          })
        })

        const finalArtistIDs = []
        artistIds.forEach((artistId: string) => {
          finalArtistIDs.push(...artistId.split(","))
        })

        if (finalArtistIDs.length > 200) {
          const nameApiResult = yield albumApi.getArtistNames(
            finalArtistIDs.splice(0, 199).toString(),
          )
          const nameApiResult2 = yield albumApi.getArtistNames(
            finalArtistIDs.splice(0, 199).toString(),
          )
          nameApiResult.artistNames.push(...nameApiResult2.artistNames)
          finalArtistIDs.forEach((artistId, index) => {
            self.artistNames.set(artistId, { name: nameApiResult.artistNames[index] })
          })
        } else {
          const nameApiResult = yield albumApi.getArtistNames(finalArtistIDs.toString())
          finalArtistIDs.forEach((artistId, index) => {
            self.artistNames.set(artistId, { name: nameApiResult.artistNames[index] })
          })
        }
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
    getAllArtistNames: async function (artistIds: string) {
      const albumApi = new AlbumApi(self.environment.api)
      const result = await albumApi.getArtistNames(artistIds)
      if (result.kind === "ok") {
        return result.artistNames
      } else {
        __DEV__ && console.tron.log(result.kind)
        return []
      }
    },
  }))

type AlbumStoreType = Instance<typeof AlbumStoreModel>
export interface AlbumStore extends AlbumStoreType {}
type AlbumStoreSnapshotType = SnapshotOut<typeof AlbumStoreModel>
export interface AlbumStoreSnapshot extends AlbumStoreSnapshotType {}
export const createAlbumStoreDefaultModel = () => types.optional(AlbumStoreModel, {})
