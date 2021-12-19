import { Instance, SnapshotOut, types } from "mobx-state-tree"

/**
 * ContributingArtists model.
 */
export const ContributingArtistsModel = types.model("ContributingArtists").props({
  primaryArtist: types.optional(types.string, ""),
  composer: types.optional(types.string, ""),
  featuredPerformer: types.optional(types.string, ""),
  guestMusician: types.optional(types.string, ""),
  producer: types.optional(types.string, ""),
})

type ContributingArtistsType = Instance<typeof ContributingArtistsModel>
export interface ContributingArtists extends ContributingArtistsType {}
type ContributingArtistsSnapshotType = SnapshotOut<typeof ContributingArtistsModel>
export interface ContributingArtistsSnapshot extends ContributingArtistsSnapshotType {}
export const createContributingArtistsDefaultModel = () =>
  types.optional(ContributingArtistsModel, {})

/**
 * Discographies model.
 */
export const DiscographiesModel = types.model("Discographies").props({
  main: types.optional(types.array(types.string), []),
  compilations: types.optional(types.array(types.string), []),
  others: types.optional(types.array(types.string), []),
  singlesAndEPs: types.optional(types.array(types.string), []),
})

type DiscographiesType = Instance<typeof DiscographiesModel>
export interface Discographies extends DiscographiesType {}
type DiscographiesSnapshotType = SnapshotOut<typeof DiscographiesModel>
export interface DiscographiesSnapshot extends DiscographiesSnapshotType {}
export const createDiscographiesDefaultModel = () => types.optional(DiscographiesModel, {})

/**
 * Link model.
 */
export const LinkModel = types.model("Link").props({
  href: types.optional(types.string, ""),
})

type LinkType = Instance<typeof LinkModel>
export interface Link extends LinkType {}
type LinkSnapshotType = SnapshotOut<typeof LinkModel>
export interface LinkSnapshot extends LinkSnapshotType {}
export const createLinkDefaultModel = () => types.optional(LinkModel, {})

/**
 * LinkWithIds model.
 */
export const LinkWithIdsModel = types.model("LinkWithIds").props({
  ids: types.optional(types.array(types.string), []),
  href: types.optional(types.string, ""),
})

type LinkWithIdsType = Instance<typeof LinkWithIdsModel>
export interface LinkWithIds extends LinkWithIdsType {}
type LinkWithIdsSnapshotType = SnapshotOut<typeof LinkWithIdsModel>
export interface LinkWithIdsSnapshot extends LinkWithIdsSnapshotType {}
export const createLinkWithIdsDefaultModel = () => types.optional(LinkWithIdsModel, {})

/**
 * AlbumLinks model.
 */
export const AlbumLinksModel = types.model("AlbumLinks").props({
  images: types.optional(LinkModel, {}),
  tracks: types.optional(LinkModel, {}),
  posts: types.optional(LinkModel, {}),
  artists: types.optional(LinkWithIdsModel, {}),
  genres: types.optional(LinkWithIdsModel, {}),
})

type AlbumLinksType = Instance<typeof AlbumLinksModel>
export interface AlbumLinks extends AlbumLinksType {}
type AlbumLinksSnapshotType = SnapshotOut<typeof AlbumLinksModel>
export interface AlbumLinksSnapshot extends AlbumLinksSnapshotType {}
export const createAlbumLinksDefaultModel = () => types.optional(AlbumLinksModel, {})

/**
 * Album model.
 */
export const AlbumModel = types.model("Album").props({
  type: types.optional(types.string, ""),
  id: types.optional(types.string, ""),
  upc: types.optional(types.string, ""),
  shortcut: types.optional(types.string, ""),
  href: types.optional(types.string, ""),
  name: types.optional(types.string, ""),
  released: types.optional(types.string, ""),
  originallyReleased: types.optional(types.string, ""),
  label: types.optional(types.string, ""),
  copyright: types.optional(types.string, ""),
  tags: types.maybe(types.array(types.string)),
  discCount: types.optional(types.number, 0),
  trackCount: types.optional(types.number, 0),
  isAvailableInHiRes: types.optional(types.boolean, true),
  isStreamable: types.optional(types.boolean, true),
  isExplicit: types.optional(types.boolean, true),
  isSingle: types.optional(types.boolean, true),
  accountPartner: types.optional(types.string, ""),
  artistName: types.optional(types.string, ""),
  contributingArtists: types.optional(ContributingArtistsModel, {}),
  discographies: types.optional(DiscographiesModel, {}),
  links: types.optional(AlbumLinksModel, {}),
})

type AlbumType = Instance<typeof AlbumModel>
export interface Album extends AlbumType {}
type AlbumSnapshotType = SnapshotOut<typeof AlbumModel>
export interface AlbumSnapshot extends AlbumSnapshotType {}
export const createAlbumDefaultModel = () => types.optional(AlbumModel, {})
