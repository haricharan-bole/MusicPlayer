import { Instance, SnapshotOut, types } from "mobx-state-tree"
import { ContributingArtistsModel, LinkModel, LinkWithIdsModel } from "../album/album"

/**
 * Format model.
 */
export const FormatModel = types.model("Format").props({
  type: types.string,
  bitrate: types.number,
  name: types.string,
  sampleBits: types.number,
  sampleRate: types.number,
})

type FormatType = Instance<typeof FormatModel>
export interface Format extends FormatType {}
type FormatSnapshotType = SnapshotOut<typeof FormatModel>
export interface FormatSnapshot extends FormatSnapshotType {}
export const createFormatDefaultModel = () => types.optional(FormatModel, {})

/**
 * TrackLinks model.
 */
export const TrackLinksModel = types.model("TrackLinks").props({
  images: types.optional(LinkModel, {}),
  tracks: types.optional(LinkModel, {}),
  posts: types.optional(LinkModel, {}),
  artists: LinkWithIdsModel,
  genres: LinkWithIdsModel,
})

type TrackLinksType = Instance<typeof TrackLinksModel>
export interface TrackLinks extends TrackLinksType {}
type TrackLinksSnapshotType = SnapshotOut<typeof TrackLinksModel>
export interface TrackLinksSnapshot extends TrackLinksSnapshotType {}
export const createTrackLinksDefaultModel = () => types.optional(TrackLinksModel, {})

/**
 * Track model.
 */
export const TrackModel = types.model("Track").props({
  type: types.string,
  id: types.string,
  index: types.number,
  disc: types.number,
  href: types.string,
  playbackSeconds: types.number,
  isAvailableInHiRes: types.boolean,
  isExplicit: types.boolean,
  name: types.string,
  isrc: types.string,
  shortcut: types.string,
  blurbs: types.array(types.string),
  artistName: types.string,
  artistId: types.string,
  albumName: types.string,
  formats: types.array(FormatModel),
  losslessFormats: types.array(FormatModel),
  albumId: types.string,
  contributors: ContributingArtistsModel,
  links: TrackLinksModel,
  previewURL: types.string,
  isStreamable: types.boolean,
})

type TrackType = Instance<typeof TrackModel>
export interface Track extends TrackType {}
type TrackSnapshotType = SnapshotOut<typeof TrackModel>
export interface TrackSnapshot extends TrackSnapshotType {}
export const createTrackDefaultModel = () => types.optional(TrackModel, {})
