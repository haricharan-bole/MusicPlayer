import { Instance, SnapshotOut, types, flow } from "mobx-state-tree"
import { TrackModel, TrackSnapshot, Track } from "../track/track"
import { withEnvironment } from "../extensions/with-environment"
import { TrackApi } from "../../services/api/track-api"

/**
 * Example store containing Rick and Morty characters
 */
export const TrackStoreModel = types
  .model("TrackStore")
  .props({
    tracks: types.optional(types.array(TrackModel), []),
    selectedTrackIndex: types.optional(types.number, 0),
  })
  .extend(withEnvironment)
  .views((self) => ({
    get selectedTrack(): Track {
      return self.tracks[self.selectedTrackIndex]
    },
  }))
  .actions((self) => ({
    read: flow(function* (albumId: string) {
      const trackApi = new TrackApi(self.environment.api)
      const result = yield trackApi.getTracks(albumId)
      if (result.kind === "ok") {
        self.tracks.clear()
        self.tracks.push(...result.tracks)
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
    },
  }))

type TrackStoreType = Instance<typeof TrackStoreModel>
export interface TrackStore extends TrackStoreType {}
type TrackStoreSnapshotType = SnapshotOut<typeof TrackStoreModel>
export interface TrackStoreSnapshot extends TrackStoreSnapshotType {}
export const createTrackStoreDefaultModel = () => types.optional(TrackStoreModel, {})
