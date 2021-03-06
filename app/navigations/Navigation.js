import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Icon } from "react-native-elements";

import RestaurantsStack from "./RestaurantsStack";
import FavoritesStack from "./FavoritesStack";
import TopRestaurantsStack from "./TopRestaurantsStack";
import SearchStack from "./SearchStack";
import AccountStack from "./AccountStack";

const Tab = createBottomTabNavigator();

const Navigation = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName="restaurants"
        tabBarOptions={{
          inactiveTintColor: "#646464",
          activeTintColor: "#00a680",
        }}
        screenOptions={({ route }) => ({
          tabBarIcon: ({ color }) => screenOptions(route, color),
        })}
      >
        <Tab.Screen
          name="restaurants"
          options={{ title: "Restaurantes" }}
          component={RestaurantsStack}
        />
        <Tab.Screen
          name="favorites"
          options={{ title: "Favoritos" }}
          component={FavoritesStack}
        />
        <Tab.Screen
          name="top-restaurants"
          options={{ title: "Top 5" }}
          component={TopRestaurantsStack}
        />
        <Tab.Screen
          name="search"
          options={{ title: "Buscar" }}
          component={SearchStack}
        />
        <Tab.Screen
          name="account"
          options={{ title: "Mi Cuenta" }}
          component={AccountStack}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

const screenOptions = (route, color) => {
  let iconName;
  switch (route.name) {
    case "restaurants":
      iconName = "compass-outline";
      break;
    case "favorites":
      iconName = "heart-outline";
      break;
    case "top-restaurants":
      iconName = "star-outline";
      break;
    case "search":
      iconName = "magnify";
      break;
    case "account":
      iconName = "account-circle-outline";
      break;

    default:
      break;
  }

  return (
    <Icon type="material-community" name={iconName} size={22} color={color} />
  );
};

export default Navigation;
