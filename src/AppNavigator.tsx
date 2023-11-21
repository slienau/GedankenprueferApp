import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import GlaubenssaetzeScreen from "./screens/GlaubenssaetzeScreen";
import GlaubenssatzDetailsScreen from "./screens/GlaubenssaetzeScreen/GlaubenssatzDetailsScreen";
import GlaubenssatzPruefenScreen from "./screens/GlaubenssatzPruefenScreen";

const Stack = createNativeStackNavigator();
export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Glaubenssätze" component={GlaubenssaetzeScreen} />
        <Stack.Screen
          name="Glaubenssatz Details"
          component={GlaubenssatzDetailsScreen}
        />
        <Stack.Screen
          name="Glaubenssatz prüfen"
          component={GlaubenssatzPruefenScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
