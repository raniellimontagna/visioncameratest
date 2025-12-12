import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { CameraView } from "@/components/organisms";
import { useCamera } from "@/hooks";
import type { PhotoFile } from "@/types";

export function CameraScreen() {
  const {
    hasPermission,
    isActive,
    flash,
    position,
    takePhoto,
    toggleFlash,
    toggleCameraPosition,
    setIsActive,
  } = useCamera();

  const handleTakePhoto = async () => {
    try {
      const photo = await takePhoto();
      if (photo) {
        console.log("Photo taken:", photo.path);
        // Aqui você pode fazer algo com a foto
      }
    } catch (error) {
      console.error("Failed to take photo:", error);
    }
  };

  const handlePhotoTaken = (photo: PhotoFile) => {
    console.log("Photo captured:", photo.path);
  };

  if (!hasPermission) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.text}>
          Permissão de câmera não concedida. Por favor, habilite nas configurações.
        </Text>
      </SafeAreaView>
    );
  }

  return (
    <View style={styles.container}>
      <CameraView onPhotoTaken={handlePhotoTaken} />

      {/* Controls */}
      <View style={styles.controls}>
        <TouchableOpacity style={styles.button} onPress={() => setIsActive(!isActive)}>
          <Text style={styles.buttonText}>{isActive ? "Pausar" : "Iniciar"}</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.captureButton} onPress={handleTakePhoto}>
          <View style={styles.captureButtonInner} />
        </TouchableOpacity>

        <View style={styles.rightControls}>
          <TouchableOpacity style={styles.iconButton} onPress={toggleFlash}>
            <Text style={styles.buttonText}>⚡ {flash}</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.iconButton} onPress={toggleCameraPosition}>
            <Text style={styles.buttonText}>🔄 {position}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },
  text: {
    color: "#fff",
    fontSize: 16,
    textAlign: "center",
    padding: 20,
  },
  controls: {
    position: "absolute",
    bottom: 50,
    left: 0,
    right: 0,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  button: {
    backgroundColor: "rgba(255, 255, 255, 0.3)",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
  },
  buttonText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "600",
  },
  captureButton: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: "rgba(255, 255, 255, 0.3)",
    justifyContent: "center",
    alignItems: "center",
  },
  captureButtonInner: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#fff",
  },
  rightControls: {
    gap: 10,
  },
  iconButton: {
    backgroundColor: "rgba(255, 255, 255, 0.3)",
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
  },
});
