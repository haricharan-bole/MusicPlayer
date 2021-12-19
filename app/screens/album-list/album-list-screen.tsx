import React, { FC, useEffect } from "react"
import { observer } from "mobx-react-lite"
import { FlatList, StatusBar, Dimensions, ActivityIndicator } from "react-native"
import { Screen } from "../../components"
import { useStores } from "../../models"
import { AlbumGridItem } from "../../components/album-grid-item/album-grid-item"
import { ROOT } from "./album-list-screen.styles"
import { StackScreenProps } from "@react-navigation/stack"
import { NavigatorParamList } from "../../navigators"
import { NavigationBar } from "../../components/navigation-bar/navigation-bar"

const windowWidth = Dimensions.get("window").width

export const AlbumListScreen: FC<StackScreenProps<NavigatorParamList, "AlbumList">> = observer(
  function AlbumListScreen({ navigation }) {
    const { albumStore } = useStores()
    const {
      read,
      albums,
      setSelectedAlbumIndex,
      getContributingArtistNames,
      artistNames,
      isLoading,
    } = albumStore
    const fetchAlbums = () => {
      read()
    }

    useEffect(() => {
      let didCancel = false

      !didCancel && fetchAlbums()

      return () => {
        didCancel = true
      }
    }, [])

    const renderItem = ({ item, index }): JSX.Element => (
      <AlbumGridItem
        key={index}
        name={item.name}
        albumId={item.id}
        artistName={item.artistName}
        artists={getContributingArtistNames(item?.contributingArtists)}
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
        <StatusBar backgroundColor={"rgba(0,0,0,0.9)"} translucent />
        <NavigationBar heading="Top Albums" />
        {isLoading && albums.length === 0 ? (
          <ActivityIndicator size="large" color="red" />
        ) : (
          <FlatList
            data={[...albums]}
            numColumns={2}
            keyExtractor={(item) => String(item.id)}
            renderItem={renderItem}
            onEndReachedThreshold={0.9}
            onEndReached={fetchAlbums}
            getItemLayout={(data, index) => ({
              length: windowWidth / 2,
              offset: (windowWidth / 2) * index,
              index,
            })}
          />
        )}
        {isLoading && albums.length > 0 && (
          <ActivityIndicator
            size="large"
            color="red"
            style={{ position: "absolute", bottom: 20, alignSelf: "center" }}
          />
        )}
      </Screen>
    )
  },
)
