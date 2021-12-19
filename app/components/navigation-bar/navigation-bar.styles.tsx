import { Dimensions, ImageStyle, ViewStyle } from "react-native"
import { color } from "../../theme"

const windowWidth = Dimensions.get("window").width
const windowHeight = Dimensions.get("window").height

const ROOT: ViewStyle = {
  backgroundColor: color.palette.black,
  flex: 1,
  alignItems: "center",
}

const HEADER_CONTAINER: ViewStyle = {
  position: "absolute",
  top: 0,
  left: 0,
  backgroundColor: "transparent",
  zIndex: 3,
  elevation: 3,
  width: windowWidth,
  height: windowHeight * 0.15,
}

const HEADER: ViewStyle = { position: "absolute", top: 40, left: 15 }

const GRADIENT: string[] = [
  "rgba(0,0,0,1.0)",
  "rgba(0,0,0,0.9)",
  "rgba(0,0,0,0.7)",
  "rgba(0,0,0,0.5)",
  "transparent",
]

const GRADIENT_CONTAINER: ViewStyle = { width: windowWidth, height: windowHeight * 0.15 }

const BACK_ICON: ImageStyle = {
  padding: 10,
  height: 30,
  width: 30,
}

const BACK_BUTTON: ViewStyle = {
  height: 50,
  width: 50,
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: "rgba(0,0,0,0.3)",
  position: "absolute",
  top: 40,
  left: 16,
  borderRadius: 50,
}

export { ROOT, HEADER, HEADER_CONTAINER, GRADIENT, GRADIENT_CONTAINER, BACK_ICON, BACK_BUTTON }
