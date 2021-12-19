import { Dimensions, ImageStyle, TextStyle, ViewStyle } from "react-native"

const windowWidth = Dimensions.get("window").width

const IMAGE_BACKGROUND: ViewStyle = { width: windowWidth / 2, height: windowWidth / 2 }

const IMAGE_BACKGROUND_IMAGE: ImageStyle = {
  width: windowWidth / 2,
  height: windowWidth / 2,
  resizeMode: "cover",
}
const GRADIENT_CONTAINER: ViewStyle = {
  justifyContent: "flex-end",
  width: windowWidth / 2,
  height: windowWidth / 2,
}
const GRADIENT: string[] = [
  "transparent",
  "rgba(0,0,0,0.4)",
  "rgba(0,0,0,0.7)",
  "rgba(0,0,0,0.8)",
  "rgba(0,0,0,0.95)",
  "rgba(0,0,0,1.0)",
]

const ALBUM_NAME: TextStyle = {
  textAlign: "left",
  padding: 4,
  position: "absolute",
  bottom: 50,
  left: 4,
}

const ARTIST_NAME: TextStyle = {
  textAlign: "left",
  padding: 4,
  position: "absolute",
  bottom: 30,
  left: 4,
}

const DATE: TextStyle = { textAlign: "right", padding: 4, position: "absolute", bottom: 4, left: 4 }

const TRACK_COUNT: TextStyle = { textAlign: "right", padding: 4, position: "absolute", bottom: 4, right: 4 }

export {
  IMAGE_BACKGROUND,
  IMAGE_BACKGROUND_IMAGE,
  GRADIENT_CONTAINER,
  GRADIENT,
  ALBUM_NAME,
  ARTIST_NAME,
  DATE,
  TRACK_COUNT,
}
