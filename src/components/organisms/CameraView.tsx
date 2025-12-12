import { StyleSheet, Text, View } from "react-native";
import type { CameraProps } from "react-native-vision-camera";
import { Camera } from "react-native-vision-camera";
import { useCamera } from "@/hooks";
import type { PhotoFile } from "@/types";

interface CameraViewProps extends Partial<CameraProps> {
  onPhotoTaken?: (photo: PhotoFile) => void;
  onError?: (error: Error) => void;
}

export function CameraView({ onPhotoTaken, onError, ...props }: CameraViewProps) {
  const { hasPermission, device, cameraRef, isActive } = useCamera();

  if (!hasPermission) {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Sem permissão para acessar a câmera</Text>
      </View>
    );
  }

  if (!device) {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Carregando câmera...</Text>
      </View>
    );
  }

  return (
    <Camera
      ref={cameraRef}
      style={StyleSheet.absoluteFill}
      device={device}
      isActive={isActive}
      photo={true}
      {...props}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#000",
  },
  text: {
    color: "#fff",
    fontSize: 16,
  },
});
