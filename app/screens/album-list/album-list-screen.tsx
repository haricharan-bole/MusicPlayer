import React, { FC, useEffect } from "react"
import { observer } from "mobx-react-lite"
import { View, FlatList, StatusBar } from "react-native"
import { Screen, Text } from "../../components"
import { useStores } from "../../models"
import { AlbumGridItem } from "../../components/album-grid-item/album-grid-item"
import LinearGradient from "react-native-linear-gradient"
import {
  ROOT,
  HEADER,
  HEADER_CONTAINER,
  GRADIENT,
  GRADIENT_CONTAINER,
} from "./album-list-screen.styles"
import { StackScreenProps } from "@react-navigation/stack"
import { NavigatorParamList } from "../../navigators"

export const AlbumListScreen: FC<StackScreenProps<NavigatorParamList, "AlbumList">> = observer(
  function AlbumListScreen({ navigation }) {
    const { albumStore } = useStores()
    const { read, albums, setSelectedAlbumIndex } = albumStore
    const fetchAlbums = () => {
      read()
    }

    useEffect(() => {
      fetchAlbums()
    }, [])

    const renderItem = ({ item, index }): JSX.Element => (
      <AlbumGridItem
        key={index}
        name={item.name}
        albumId={item.id}
        artistName={item.artistName}
        artists={item?.contributingArtists}
        releaseDate={item?.released}
        numberOfTracks={item?.trackCount}
        onAlbumPress={() => {
          setSelectedAlbumIndex(index)
          navigation.navigate("ViewAlbum")
        }}
      />
    )

    return (
      <Screen style={ROOT} preset="fixed">
        <StatusBar backgroundColor={"black"} />
        <View style={HEADER_CONTAINER}>
          <LinearGradient style={GRADIENT_CONTAINER} colors={GRADIENT}>
            <Text preset="header" text="Top Albums" style={HEADER} />
          </LinearGradient>
        </View>
        {albums && (
          <FlatList
            data={[...albums]}
            numColumns={2}
            keyExtractor={(item) => String(item.id)}
            renderItem={renderItem}
            onEndReachedThreshold={0.8}
            onEndReached={fetchAlbums}
          />
        )}
      </Screen>
    )
  },
)
