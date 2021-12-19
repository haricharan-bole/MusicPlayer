import { Dimensions, ViewStyle } from "react-native"
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

const HEADER: ViewStyle = { padding: 10 }

const GRADIENT: string[] = [
  "rgba(0,0,0,1.0)",
  "rgba(0,0,0,0.7)",
  "rgba(0,0,0,0.4)",
  "rgba(0,0,0,0.3)",
  "transparent",
]

const GRADIENT_CONTAINER: ViewStyle = { width: windowWidth, height: windowHeight * 0.15 }

export { ROOT, HEADER, HEADER_CONTAINER, GRADIENT, GRADIENT_CONTAINER }
