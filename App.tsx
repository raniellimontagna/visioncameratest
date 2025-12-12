import { StatusBar } from "react-native";
import { BarcodeScannerScreen } from "@/screens";

function App(): JSX.Element {
  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <BarcodeScannerScreen />
    </>
  );
}

export default App;
