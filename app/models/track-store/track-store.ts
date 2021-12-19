import { Instance, SnapshotOut, types, flow, setLivelinessChecking } from "mobx-state-tree"
import { TrackModel, TrackSnapshot, Track } from "../track/track"
import { withEnvironment } from "../extensions/with-environment"
import { TrackApi } from "../../services/api/track-api"
import { ContributingArtists } from ".."
import { AlbumApi } from "../../services/api/album-api"

const ArtistIdName = types.model({
  name: types.string,
})

/**
 * Example store containing Rick and Morty characters
 */
export const TrackStoreModel = types
  .model("TrackStore")
  .props({
    tracks: types.optional(types.array(TrackModel), []),
    selectedTrackIndex: types.optional(types.number, 0),
    artistNames: types.map(ArtistIdName),
  })
  .extend(withEnvironment)
  .views((self) => ({
    get selectedTrack(): Track {
      return self.tracks[self.selectedTrackIndex]
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

      console.log(finalArtistNames)

      return finalArtistNames.toString().replace(/,/g, ", ")
    },
  }))
  .actions((self) => ({
    read: flow(function* (albumId: string) {
      const trackApi = new TrackApi(self.environment.api)
      const albumApi = new AlbumApi(self.environment.api)

      const result = yield trackApi.getTracks(albumId)
      if (result.kind === "ok") {
        self.tracks.clear()
        self.tracks.push(...result.tracks)

        const artistIds = []

        self.tracks.forEach((track) => {
          Object.keys(track.contributors).forEach((artistType) => {
            track.contributors[artistType] && artistIds.push(track.contributors[artistType])
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

        console.log(self.artistNames)
      } else {
        __DEV__ && console.tron.log(result.kind)
      }
    }),
    setSelectedTrackIndex: (index: number): void => {
      if (index >= 0 && index < self.tracks.length) {
        self.selectedTrackIndex = index
      } else {
        __DEV__ && console.tron.log("Invalid Index")
      }
    },
    clearTracks: (): void => {
      self.tracks.clear()
      self.artistNames.clear()
    },
  }))

type TrackStoreType = Instance<typeof TrackStoreModel>
export interface TrackStore extends TrackStoreType {}
type TrackStoreSnapshotType = SnapshotOut<typeof TrackStoreModel>
export interface TrackStoreSnapshot extends TrackStoreSnapshotType {}
export const createTrackStoreDefaultModel = () => types.optional(TrackStoreModel, {})
