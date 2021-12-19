import React from "react"
import { ImageBackground, TouchableOpacity } from "react-native"
import { Text } from "../text/text"
import { LinearGradient } from "expo-linear-gradient"
import AlbumGridItemProps from "./album-grid-item.props"
import {
  IMAGE_BACKGROUND,
  IMAGE_BACKGROUND_IMAGE,
  GRADIENT_CONTAINER,
  GRADIENT,
  ALBUM_NAME,
  ARTIST_NAME,
  DATE,
  TRACK_COUNT,
} from "./album-grid-item.styles"
import DateFormatter from "../../utils/date-formatter"
import { getImageURL, AssetType } from "../../services/api/get-image-url"

/**
 * Describe your component here
 */
export const AlbumGridItem = function AlbumGridItem(props: AlbumGridItemProps) {
  const { numberOfTracks, releaseDate, albumId, artists, name, onAlbumPress } = props

  const date = new DateFormatter().formatToMMMYYYY(releaseDate)
  const image = { uri: getImageURL(AssetType.Albums, albumId, 170, 170) }

  return (
    <TouchableOpacity activeOpacity={0.5} onPress={onAlbumPress}>
      <ImageBackground source={image} style={IMAGE_BACKGROUND} imageStyle={IMAGE_BACKGROUND_IMAGE}>
        <LinearGradient style={GRADIENT_CONTAINER} colors={GRADIENT}>
          <Text preset="default" text={name} style={ALBUM_NAME} />
          <Text preset="fieldLabel" text={artists} style={ARTIST_NAME} />
          <Text preset="secondary" text={date} style={DATE} />
          <Text preset="secondary" text={`${numberOfTracks} tracks`} style={TRACK_COUNT} />
        </LinearGradient>
      </ImageBackground>
    </TouchableOpacity>
  )
}
