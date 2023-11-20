import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import GlaubenssaetzeScreen from "./screens/GlaubenssaetzeScreen";

const Stack = createNativeStackNavigator();
export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Glaubenssaetze" component={GlaubenssaetzeScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
