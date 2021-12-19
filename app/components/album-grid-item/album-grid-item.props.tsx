import { StyleProp, ViewStyle } from "react-native"
import { ContributingArtists } from "../../models"

export default interface AlbumGridItemProps {
  /**
   * An optional style override useful for padding & margin.
   */
  style?: StyleProp<ViewStyle>

  /**
   * An optional style override useful for padding & margin.
   */
  artists?: string

  /**
   * An optional style override useful for padding & margin.
   */
  releaseDate?: string

  /**
   * An optional style override useful for padding & margin.
   */
  numberOfTracks?: number

  /**
   * An optional style override useful for padding & margin.
   */
  name?: string

  /**
   * An optional style override useful for padding & margin.
   */
  albumId?: string

  /**
   * An optional style override useful for padding & margin.
   */
  artistName?: string

  /**
   * An optional style override useful for padding & margin.
   */
  onAlbumPress?: () => void
}
