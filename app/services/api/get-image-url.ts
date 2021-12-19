export enum AssetType {
  Artists,
  Tracks,
  Albums,
  Playlists,
  Genres,
  Stations,
}

export const getImageURL = (
  type: AssetType,
  id: string,
  width: number,
  height: number,
  extension = "jpg",
): string => {
  switch (type) {
    case AssetType.Artists:
      return `https://api.napster.com/imageserver/v2/artists/${id}/images/${width}x${height}.${extension}`
    case AssetType.Tracks:
      return `https://api.napster.com/imageserver/v2/albums/${id}/images/${width}x${height}.${extension}`
    case AssetType.Albums:
      return `https://api.napster.com/imageserver/v2/albums/${id}/images/${width}x${height}.${extension}`
    case AssetType.Playlists:
      return `https://api.napster.com/imageserver/v2/playlists/${id}/artists/images/${width}x${height}.${extension}`
    case AssetType.Genres:
      return `https://api.napster.com/imageserver/images/${id}${width}x${height}.${extension}`
    case AssetType.Stations:
      return `https://api.napster.com/imageserver/v2/stations/${id}/images/${width}x${height}.${extension}`
    default:
      return ""
  }
}
