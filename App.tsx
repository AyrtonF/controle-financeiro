import React from "react";
import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaProvider } from "react-native-safe-area-context";

import HomeScreen from "./src/screens/HomeScreen";
import FormScreen from "./src/screens/FormScreen";
import ListScreen from "./src/screens/ListScreen";
import { FinanceProvider } from "./src/context/FinanceContext";
const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <SafeAreaProvider>
      <FinanceProvider>
        <NavigationContainer>
          <StatusBar style="dark" backgroundColor="#ffffff" />

          <Tab.Navigator
            screenOptions={({ route }) => ({
              tabBarIcon: ({ focused, color, size }) => {
                let iconName: any;

                if (route.name === "Home") {
                  iconName = focused ? "home" : "home-outline";
                } else if (route.name === "Adicionar") {
                  iconName = focused ? "add-circle" : "add-circle-outline";
                } else if (route.name === "Transações") {
                  iconName = focused ? "list" : "list-outline";
                }

                return <Ionicons name={iconName} size={size} color={color} />;
              },

              tabBarActiveTintColor: "#007AFF",
              tabBarInactiveTintColor: "#8E8E93",
              tabBarStyle: {
                backgroundColor: "#ffffff",
                borderTopWidth: 1,
                borderTopColor: "#E5E5EA",
                height: 60,
                paddingBottom: 5,
                paddingTop: 5,
              },

              headerStyle: {
                backgroundColor: "#007AFF",
              },
              headerTintColor: "#ffffff",
              headerTitleStyle: {
                fontWeight: "bold",
                fontSize: 18,
              },
            })}
          >
            <Tab.Screen
              name="Home"
              component={HomeScreen}
              options={{ title: "Início" }}
            />
            <Tab.Screen
              name="Adicionar"
              component={FormScreen}
              options={{ title: "Nova Transação" }}
            />
            <Tab.Screen
              name="Transações"
              component={ListScreen}
              options={{ title: "Minhas Transações" }}
            />
          </Tab.Navigator>
        </NavigationContainer>
      </FinanceProvider>
    </SafeAreaProvider>
  );
}
