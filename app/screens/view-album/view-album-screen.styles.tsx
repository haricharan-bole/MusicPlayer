import { ViewStyle, Dimensions, ImageStyle, TextStyle } from "react-native"

const windowWidth = Dimensions.get("window").width
const windowHeight = Dimensions.get("window").height

const ROOT: ViewStyle = {
  backgroundColor: "rgba(0,0,0,1.0)",
  flex: 1,
}

const COVER: ViewStyle = {
  flex: 0.3,
  justifyContent: "flex-end",
}
const COVER_IMAGE: ImageStyle = {
  height: "100%",
  width: windowWidth,
  resizeMode: "cover",
}

const GRADIENT_CONTAINER: ViewStyle = { width: windowWidth, height: windowHeight }

const GRADIENT: string[] = [
  "rgba(0,0,0,1.0)",
  "rgba(0,0,0,0.6)",
  "rgba(0,0,0,0.4)",
  "rgba(0,0,0,0.2)",
  "transparent",
].reverse()

const HEADER: TextStyle = { position: "absolute", bottom: 60, left: 16, marginVertical: 10 }
const ARTIST_NAME: TextStyle = { position: "absolute", bottom: 30, left: 16, marginVertical: 5 }
const TRACKS_COUNT: TextStyle = { position: "absolute", bottom: 10, left: 16, marginVertical: 5 }

const TRACKS_CONTAINER: ViewStyle = { flex: 0.7, alignItems: "center", justifyContent: "center" }

const TRACK_ITEM_CONTAINER: ViewStyle = {
  width: windowWidth - 32,
  marginVertical: 16,
  flexDirection: "row",
  alignItems: "center",
}

const TRACK_ITEM_IMAGE: ImageStyle = { height: 50, width: 50, resizeMode: "contain" }

const TRACK_ITEM_CONTENT_CONTAINER: ViewStyle = {
  flexDirection: "row",
  flex: 1,
  justifyContent: "center",
}

const TRACK_ITEM_CONTENT_TEXT_CONTAINER: ViewStyle = {
  flexDirection: "column",
  marginLeft: 8,
  justifyContent: "center",
  flex: 0.8,
}

const TRACK_ITEM_CONTENT_BUTTON_CONTAINER: ViewStyle = {
  flexDirection: "column",
  marginRight: 8,
  justifyContent: "center",
  flex: 0.2,
  alignItems: "flex-end",
}

const TRACK_ITEM_ICON: ImageStyle = { height: 30, width: 30 }

export {
  ROOT,
  COVER,
  COVER_IMAGE,
  GRADIENT,
  GRADIENT_CONTAINER,
  HEADER,
  TRACKS_CONTAINER,
  TRACK_ITEM_CONTAINER,
  TRACK_ITEM_IMAGE,
  TRACK_ITEM_CONTENT_CONTAINER,
  TRACK_ITEM_CONTENT_TEXT_CONTAINER,
  TRACK_ITEM_CONTENT_BUTTON_CONTAINER,
  TRACK_ITEM_ICON,
  TRACKS_COUNT,
  ARTIST_NAME,
}
