import { StatusBar, useColorScheme } from "react-native";
import { BarcodeScannerScreen } from "@/screens";

function App(): JSX.Element {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";

  return (
    <>
      <StatusBar
        barStyle={isDark ? "light-content" : "dark-content"}
        backgroundColor={isDark ? "#000" : "#fff"}
      />
      <BarcodeScannerScreen />
    </>
  );
}

export default App;
