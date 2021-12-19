import * as React from "react"
import { StyleProp, View, ViewStyle, TouchableOpacity } from "react-native"
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
   * An optional style override useful for padding & margin.
   */
  style?: StyleProp<ViewStyle>

  /**
   * An optional style override useful for padding & margin.
   */
  heading?: string

  /**
   * An optional style override useful for padding & margin.
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
            <Icon icon="back" style={BACK_ICON} />
          </TouchableOpacity>
        )}
      </LinearGradient>
    </View>
  )
})
