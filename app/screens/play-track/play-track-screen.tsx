import React, { FC, useEffect, useState } from "react"
import { observer } from "mobx-react-lite"
import { View, ImageBackground } from "react-native"
import { Screen, Text, Button } from "../../components"
import { useStores } from "../../models"
import { StackScreenProps } from "@react-navigation/stack"
import { NavigatorParamList } from "../../navigators"
import { AssetType, getImageURL } from "../../services/api/get-image-url"
import LinearGradient from "react-native-linear-gradient"
import TrackPlayer from "react-native-track-player"

import {
  ROOT,
  COVER,
  COVER_IMAGE,
  GRADIENT,
  GRADIENT_CONTAINER,
  HEADER,
  TRACKS_CONTAINER,
} from "./play-track-screen.styles"
import AppPlayer from "../../services/AppPlayer"

export const PlayTrackScreen: FC<StackScreenProps<NavigatorParamList, "ViewAlbum">> = observer(
  function PlayTrackScreen({ navigation }) {
    const { trackStore, albumStore } = useStores()
    const { selectedAlbum } = albumStore
    const { tracks, selectedTrack } = trackStore
    const image = { uri: getImageURL(AssetType.Tracks, selectedAlbum.id, 500, 500) }
    const [isPlaying, setPlaying] = useState(true)

    const TrackPlayerTracks = tracks.map((track) => ({
      id: track.id,
      url: track.previewURL,
      title: track.name,
      artist: track.artistName,
      artwork: image.uri,
      album: track.albumName,
      duration: track.playbackSeconds,
    }))

    useEffect(() => {
      AppPlayer.initializePlayer()
    }, [])

    useEffect(() => {
      setPlaying(true)
      TrackPlayer.add(TrackPlayerTracks.filter((track) => track.id === selectedTrack.id))
      TrackPlayer.play()
      console.log(TrackPlayerTracks.filter((track) => track.id === selectedTrack.id))
    }, [selectedTrack])

    return (
      <Screen style={ROOT} preset="fixed">
        <ImageBackground source={image} style={COVER} imageStyle={COVER_IMAGE}>
          <LinearGradient style={GRADIENT_CONTAINER} colors={GRADIENT}>
            <Text preset="header" text={selectedTrack.name} style={HEADER} />
          </LinearGradient>
        </ImageBackground>
        <View style={TRACKS_CONTAINER}></View>
      </Screen>
    )
  },
)
