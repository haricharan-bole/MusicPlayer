import { StyleProp, ViewStyle } from "react-native"

export default interface AlbumGridItemProps {
  /**
   * An optional style override useful for padding & margin.
   */
  style?: StyleProp<ViewStyle>

  /**
   * List of all contributing artists names.
   */
  artists?: string

  /**
   * Release date of album.
   */
  releaseDate?: string

  /**
   * Count of tracks.
   */
  numberOfTracks?: number

  /**
   * Title of Track.
   */
  name?: string

  /**
   * id of album.
   */
  albumId?: string

  /**
   * Main artist name.
   */
  artistName?: string

  /**
   * onPress Handler.
   */
  onAlbumPress?: () => void
}
