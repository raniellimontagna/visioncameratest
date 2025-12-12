import { StatusBar } from "react-native";
import { CameraScreen } from "@/screens";

function App(): JSX.Element {
  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#000" />
      <CameraScreen />
    </>
  );
}

export default App;
