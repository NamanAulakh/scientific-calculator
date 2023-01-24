import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Entry from "../components/screens/entry";
import Settings from "../components/screens/settings";
import Basic from "../components/screens/basic";
import Equation from "../components/screens/eq";
import StandardDeviation from "../components/screens/stdDev";
import Regression from "../components/screens/regression";
import UnitConverter from "../components/screens/unitConverter";
import Quad from "../components/screens/eq/Quad";
import Cubic from "../components/screens/eq/Cubic";

const Stack = createNativeStackNavigator();

export default function () {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Entry">
        <Stack.Screen name="Entry" component={Entry} />
        <Stack.Screen name="Settings" component={Settings} />
        <Stack.Screen name="Basic" component={Basic} />
        <Stack.Screen name="Equation" component={Equation} />
        <Stack.Screen name="Quad" component={Quad} />
        <Stack.Screen name="Cubic" component={Cubic} />
        <Stack.Screen name="StandardDeviation" component={StandardDeviation} />
        <Stack.Screen name="Regression" component={Regression} />
        <Stack.Screen name="UnitConverter" component={UnitConverter} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
