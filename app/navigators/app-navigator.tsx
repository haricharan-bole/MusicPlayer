import React from "react"
import { useColorScheme } from "react-native"
import { NavigationContainer, DefaultTheme, DarkTheme } from "@react-navigation/native"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { AlbumListScreen, ViewAlbumScreen, PlayTrackScreen } from "../screens"
import { navigationRef } from "./navigation-utilities"

export type NavigatorParamList = {
  AlbumList: undefined
  ViewAlbum: undefined
  PlayTrack: undefined
}

const Stack = createNativeStackNavigator<NavigatorParamList>()

const AppStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        animation: "slide_from_right",
      }}
      initialRouteName="AlbumList"
    >
      <Stack.Screen name="AlbumList" component={AlbumListScreen} />
      <Stack.Screen name="ViewAlbum" component={ViewAlbumScreen} />
      <Stack.Screen name="PlayTrack" component={PlayTrackScreen} />
    </Stack.Navigator>
  )
}

interface NavigationProps extends Partial<React.ComponentProps<typeof NavigationContainer>> {}

export const AppNavigator = (props: NavigationProps) => {
  const colorScheme = useColorScheme()
  return (
    <NavigationContainer
      ref={navigationRef}
      theme={colorScheme === "dark" ? DarkTheme : DefaultTheme}
      {...props}
    >
      <AppStack />
    </NavigationContainer>
  )
}

AppNavigator.displayName = "AppNavigator"

const exitRoutes = ["AlbumList"]
export const canExit = (routeName: string) => exitRoutes.includes(routeName)
