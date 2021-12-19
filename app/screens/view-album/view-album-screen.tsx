import React, { FC, useEffect } from "react"
import { observer } from "mobx-react-lite"
import { View, ImageBackground, Image, ActivityIndicator } from "react-native"
import { Icon, Screen, Text } from "../../components"
import { useStores } from "../../models"
import { StackScreenProps } from "@react-navigation/stack"
import { NavigatorParamList } from "../../navigators"
import { AssetType, getImageURL } from "../../services/api/get-image-url"
import LinearGradient from "react-native-linear-gradient"

import {
  ROOT,
  COVER,
  COVER_IMAGE,
  GRADIENT,
  GRADIENT_CONTAINER,
  TRACKS_CONTAINER,
  TRACK_ITEM_CONTAINER,
  TRACK_ITEM_IMAGE,
  TRACK_ITEM_CONTENT_CONTAINER,
  TRACK_ITEM_CONTENT_TEXT_CONTAINER,
  TRACK_ITEM_CONTENT_BUTTON_CONTAINER,
  TRACK_ITEM_ICON,
  TRACKS_COUNT,
  ARTIST_NAME,
  HEADER,
} from "./view-album-screen.styles"
import { FlatList, TouchableOpacity } from "react-native-gesture-handler"
import { NavigationBar } from "../../components/navigation-bar/navigation-bar"

export const ViewAlbumScreen: FC<StackScreenProps<NavigatorParamList, "ViewAlbum">> = observer(
  function AlbumListScreen({ navigation }) {
    const { albumStore, trackStore } = useStores()
    const { selectedAlbum } = albumStore
    const {
      read,
      tracks,
      clearTracks,
      setSelectedTrackIndex,
      getContributingArtistNames,
      isLoading,
    } = trackStore
    const hdImage = { uri: getImageURL(AssetType.Albums, selectedAlbum.id, 500, 500) }
    const lowResImage = { uri: getImageURL(AssetType.Albums, selectedAlbum.id, 70, 70) }

    const fetchTracks = () => {
      read(selectedAlbum.id)
    }

    useEffect(() => {
      let didCancel = false

      !didCancel && fetchTracks()
      return () => {
        didCancel = true
        clearTracks()
      }
    }, [])

    function capitalizeFirstLetter(string) {
      return string.charAt(0).toUpperCase() + string.slice(1)
    }

    const TrackItem = (props) => {
      return (
        <TouchableOpacity
          onPress={() => {
            setSelectedTrackIndex(props.index)
            navigation.navigate("PlayTrack")
          }}
          style={TRACK_ITEM_CONTAINER}
          activeOpacity={0.6}
        >
          <Image source={lowResImage} style={TRACK_ITEM_IMAGE} />
          <View style={TRACK_ITEM_CONTENT_CONTAINER}>
            <View style={TRACK_ITEM_CONTENT_TEXT_CONTAINER}>
              <Text preset="bold" text={capitalizeFirstLetter(props.name)} />
              <Text preset="fieldLabel" text={props.artist} />
            </View>
            <View style={TRACK_ITEM_CONTENT_BUTTON_CONTAINER}>
              <Icon icon="play" style={TRACK_ITEM_ICON} />
              <Text
                preset="fieldLabel"
                text={`${Math.ceil(Number(props.length) / 60).toString()} min`}
              />
            </View>
          </View>
        </TouchableOpacity>
      )
    }

    const renderItem = ({ item, index }) => {
      return (
        <TrackItem
          key={index}
          name={item.name}
          length={item.playbackSeconds}
          artist={getContributingArtistNames(item.contributors)}
          index={index}
        />
      )
    }

    return (
      <Screen style={ROOT} preset="fixed">
        <NavigationBar
          onPress={() => {
            navigation.goBack()
          }}
        />
        <ImageBackground source={hdImage} style={COVER} imageStyle={COVER_IMAGE}>
          <LinearGradient style={GRADIENT_CONTAINER} colors={GRADIENT}>
            <Text preset="header" text={selectedAlbum.name} style={HEADER} />
            <Text preset="default" text={selectedAlbum.artistName} style={ARTIST_NAME} />
            <Text
              preset="secondary"
              text={`${selectedAlbum.trackCount} tracks`}
              style={TRACKS_COUNT}
            />
          </LinearGradient>
        </ImageBackground>
        <View style={TRACKS_CONTAINER}>
          {isLoading ? (
            <ActivityIndicator size="large" color="red" />
          ) : (
            <FlatList data={[...tracks]} renderItem={renderItem} />
          )}
        </View>
      </Screen>
    )
  },
)
