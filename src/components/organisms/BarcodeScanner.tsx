import { memo, type ReactElement, useCallback, useEffect, useRef, useState } from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";
import {
  Camera,
  useCameraDevice,
  useCameraFormat,
  useCameraPermission,
  useCodeScanner,
} from "react-native-vision-camera";
import { barcodeTypes } from "@/constants";
import { isValidBarcode } from "@/utils";

const styles = StyleSheet.create({
  camera: {
    width: "100%",
    height: 100,
  },
  loadingContainer: {
    width: "100%",
    height: 100,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#000",
  },
  cameraContainer: {
    position: "relative",
    backgroundColor: "blue",
  },
  cameraWrapper: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: 100,
    overflow: "hidden",
  },
  line: {
    width: "90%",
    left: "5%",
    backgroundColor: "#fe4300",
    height: 2,
    top: 49,
    position: "absolute",
    zIndex: 1,
  },
});

type BarcodeScannerProps = {
  onBarCodeScanned: (data: string) => void;
  torch?: boolean;
  isActive?: boolean;
  scanDelay?: number;
};

function BarcodeScannerComponent(props: BarcodeScannerProps): ReactElement | null {
  const { onBarCodeScanned, isActive = false, torch, scanDelay = 1500 } = props;

  const { hasPermission, requestPermission } = useCameraPermission();
  const device = useCameraDevice("back");

  const lastScanTime = useRef<number>(0);
  const lastScannedCode = useRef<string>("");
  const consecutiveValidScans = useRef(0);
  const [isDelay, setIsDelay] = useState(false);

  const format = useCameraFormat(device, [{ videoResolution: { width: 1280, height: 720 } }]);

  const isCameraReady = device != null && hasPermission;

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    if (isDelay) {
      timer = setTimeout(() => setIsDelay(false), scanDelay);
    }
    return () => clearTimeout(timer);
  }, [isDelay, scanDelay]);

  useEffect(() => {
    if (!hasPermission) {
      requestPermission();
    }
  }, [hasPermission, requestPermission]);

  const codeScanner = useCodeScanner({
    codeTypes: barcodeTypes,
    onCodeScanned: useCallback(
      (codes) => {
        if (!isActive || codes.length === 0 || isDelay) {
          return;
        }

        const code = codes[0];
        const currentTime = Date.now();

        // Valida se não é um CEP
        if (!code.value || !isValidBarcode(code.value)) {
          console.log("Código inválido ou CEP ignorado:", code.value);
          return;
        }

        if (code.value === lastScannedCode.current) {
          consecutiveValidScans.current++;
        } else {
          lastScannedCode.current = code.value ?? "";
          consecutiveValidScans.current = 1;
        }

        const hasPassedScanDelay = currentTime - lastScanTime.current > scanDelay;
        const isReadyToProcess = consecutiveValidScans.current >= 2;
        const shouldProcess = hasPassedScanDelay && isReadyToProcess;

        if (shouldProcess && code.value) {
          lastScanTime.current = currentTime;
          setIsDelay(true);
          consecutiveValidScans.current = 0;
          onBarCodeScanned(code.value);
        }
      },
      [isActive, scanDelay, onBarCodeScanned, isDelay],
    ),
  });

  if (!device) {
    return (
      <View style={styles.cameraContainer}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator color="#fff" size="small" />
        </View>
      </View>
    );
  }

  return (
    <>
      {isCameraReady && (
        <View style={styles.cameraContainer}>
          <View style={styles.line} />
          <View style={styles.cameraWrapper}>
            <Camera
              codeScanner={codeScanner}
              device={device}
              format={format}
              fps={30}
              isActive={isActive && isCameraReady}
              style={styles.camera}
              torch={torch ? "on" : "off"}
            />
          </View>
        </View>
      )}
    </>
  );
}

export const BarcodeScanner = memo(BarcodeScannerComponent);
