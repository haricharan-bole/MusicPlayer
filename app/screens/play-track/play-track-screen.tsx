import React, { FC, useEffect, useState } from "react"
import { observer } from "mobx-react-lite"
import { View, ImageBackground, TouchableOpacity, ActivityIndicator } from "react-native"
import { Screen, Text, Icon } from "../../components"
import { useStores } from "../../models"
import { StackScreenProps } from "@react-navigation/stack"
import { NavigatorParamList } from "../../navigators"
import { AssetType, getImageURL } from "../../services/api/get-image-url"
import LinearGradient from "react-native-linear-gradient"
import TrackPlayer, { useProgress } from "react-native-track-player"

import {
  ROOT,
  COVER,
  COVER_IMAGE,
  GRADIENT,
  GRADIENT_CONTAINER,
  HEADER,
  PLAYER_CONTROLS_CONTAINER,
  PLAYER_ICON,
  PLAYER_POSITION,
  ALBUM_NAME,
  ARTIST_NAME,
  SEEK_ICON,
  PLAY_PAUSE_ICON,
  DISCLAIMER
} from "./play-track-screen.styles"
import AppPlayer from "../../services/AppPlayer"
import { NavigationBar } from "../../components/navigation-bar/navigation-bar"

export const PlayTrackScreen: FC<StackScreenProps<NavigatorParamList, "ViewAlbum">> = observer(
  function PlayTrackScreen({ navigation }) {
    const { trackStore, albumStore } = useStores()
    const { selectedAlbum } = albumStore
    const { tracks, selectedTrack, selectedTrackIndex, setSelectedTrackIndex } = trackStore
    const image = { uri: getImageURL(AssetType.Tracks, selectedAlbum.id, 500, 500) }
    const progress = useProgress()
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
      TrackPlayer.reset()
      TrackPlayer.add(TrackPlayerTracks)
      TrackPlayer.skip(selectedTrackIndex)
      TrackPlayer.play()
      setPlaying(true)
    }, [selectedTrack])

    const handlePlayPause = () => {
      if (isPlaying) {
        TrackPlayer.pause()
        setPlaying(false)
      } else {
        TrackPlayer.play()
        setPlaying(true)
      }
    }

    const handleForward = () => {
      TrackPlayer.seekTo(Math.min(progress.position + 10, 30))
    }

    const handleBackWard = () => {
      TrackPlayer.seekTo(progress.position - 10)
    }

    const handleNext = () => {
      setSelectedTrackIndex(selectedTrackIndex + 1)
      TrackPlayer.skipToNext()
    }

    const handlePrev = () => {
      setSelectedTrackIndex(selectedTrackIndex - 1)
      TrackPlayer.skipToPrevious()
    }

    return (
      <Screen style={ROOT} preset="fixed">
        <NavigationBar
          onPress={() => {
            navigation.goBack()
          }}
        />
        <ImageBackground source={image} style={COVER} imageStyle={COVER_IMAGE}>
          <LinearGradient style={GRADIENT_CONTAINER} colors={GRADIENT}>
            <Text preset="header" text={selectedTrack.name} style={HEADER} />
            <Text preset="default" text={selectedTrack.albumName} style={ALBUM_NAME} />
            <Text preset="secondary" text={selectedTrack.artistName} style={ARTIST_NAME} />
          </LinearGradient>
        </ImageBackground>
        <View style={{ flex: 0.5 }}>
          <View style={PLAYER_POSITION}>
            {progress.position === 0 ? (
              <ActivityIndicator size="large" color="red" />
            ) : (
              <Text preset="header">
                {`${AppPlayer.secondsToHHMMSS(
                  Math.floor(progress.position || 0),
                )}/${AppPlayer.secondsToHHMMSS(Math.floor(30 || 0))}`}
              </Text>
            )}
          </View>
          <View style={PLAYER_CONTROLS_CONTAINER}>
            <TouchableOpacity onPress={handleBackWard}>
              <Icon icon="backward" style={SEEK_ICON} />
            </TouchableOpacity>
            <TouchableOpacity onPress={handlePrev}>
              <Icon icon="prev" style={PLAYER_ICON} />
            </TouchableOpacity>
            <TouchableOpacity onPress={handlePlayPause} activeOpacity={1}>
              {isPlaying ? (
                <Icon icon="pause" style={PLAY_PAUSE_ICON} />
              ) : (
                <Icon icon="play" style={PLAY_PAUSE_ICON} />
              )}
            </TouchableOpacity>
            <TouchableOpacity onPress={handleNext}>
              <Icon icon="next" style={PLAYER_ICON} />
            </TouchableOpacity>
            <TouchableOpacity onPress={handleForward}>
              <Icon icon="forward" style={SEEK_ICON} />
            </TouchableOpacity>
          </View>
          <Text
            preset="secondary"
            text="This is a free preview powered by Napster."
            style={DISCLAIMER}
          />
        </View>
      </Screen>
    )
  },
)
