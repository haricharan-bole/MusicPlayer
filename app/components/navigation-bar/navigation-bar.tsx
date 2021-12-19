import * as React from "react"
import { View, TouchableOpacity } from "react-native"
import { observer } from "mobx-react-lite"
import LinearGradient from "react-native-linear-gradient"
import { Icon, Text } from ".."

import {
  HEADER,
  HEADER_CONTAINER,
  GRADIENT,
  GRADIENT_CONTAINER,
  BACK_ICON,
  BACK_BUTTON,
} from "./navigation-bar.styles"

export interface NavigationBarProps {
  /**
   * An optional screen heading.
   */
  heading?: string

  /**
   * Handler for Icon Press.
   */
  onPress?: () => void
}

/**
 * Describe your component here
 */
export const NavigationBar = observer(function NavigationBar(props: NavigationBarProps) {
  return (
    <View style={HEADER_CONTAINER}>
      <LinearGradient style={GRADIENT_CONTAINER} colors={GRADIENT}>
        {props.heading ? (
          <Text preset="header" text={props.heading} style={HEADER} />
        ) : (
          <TouchableOpacity onPress={props.onPress} style={BACK_BUTTON}>
            <Icon icon="greenBack" style={BACK_ICON} />
          </TouchableOpacity>
        )}
      </LinearGradient>
    </View>
  )
})
