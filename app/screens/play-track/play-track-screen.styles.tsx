import { ViewStyle, Dimensions, ImageStyle, TextStyle } from "react-native"

const windowWidth = Dimensions.get("window").width
const windowHeight = Dimensions.get("window").height

const ROOT: ViewStyle = {
  backgroundColor: "rgba(0,0,0,1.0)",
  flex: 1,
}

const COVER: ViewStyle = {
  flex: 0.5,
  justifyContent: "flex-end",
}
const COVER_IMAGE: ImageStyle = {
  height: windowWidth,
  width: windowWidth,
  resizeMode: "contain",
}
const COVER_INNER_CIRCLE: ViewStyle = {
  position: "absolute",
  height: windowWidth * 0.1875,
  width: windowWidth * 0.1875,
  backgroundColor: "rgba(0,0,0,1.0)",
  top: windowWidth / 2 - (windowWidth * 0.1875) / 2,
  left: windowWidth / 2 - (windowWidth * 0.1875) / 2,
}

const GRADIENT_CONTAINER: ViewStyle = { width: windowWidth, height: windowHeight }
const GRADIENT: string[] = [
  "rgba(0,0,0,1.0)",
  "rgba(0,0,0,0.6)",
  "rgba(0,0,0,0.4)",
  "rgba(0,0,0,0.2)",
  "transparent",
].reverse()

const HEADER: TextStyle = { position: "absolute", bottom: 40, left: 10, marginVertical: 10 }
const ALBUM_NAME: TextStyle = { position: "absolute", bottom: 25, left: 10, marginVertical: 5 }
const ARTIST_NAME: TextStyle = { position: "absolute", bottom: 10, left: 10, marginVertical: 5 }

const PLAYER_POSITION: ViewStyle = {
  flex: 0.5,
  alignItems: "center",
  flexDirection: "row",
  width: windowWidth,
  justifyContent: "space-around",
}


const PLAYER_CONTROLS_CONTAINER: ViewStyle = {
  flex: 0.5,
  alignItems: "center",
  flexDirection: "row",
  width: windowWidth,
  justifyContent: "space-around",
}

const TRACK_ITEM_CONTAINER: ViewStyle = {
  width: windowWidth - 32,
  marginVertical: 16,
  flexDirection: "row",
  alignItems: "center",
}

const PLAYER_ICON: ImageStyle = { height: 40, width: 40 }

export {
  ROOT,
  COVER,
  COVER_IMAGE,
  COVER_INNER_CIRCLE,
  GRADIENT,
  GRADIENT_CONTAINER,
  HEADER,
  PLAYER_CONTROLS_CONTAINER,
  TRACK_ITEM_CONTAINER,
  PLAYER_ICON,
  PLAYER_POSITION,
  ALBUM_NAME,
  ARTIST_NAME
}
