import { useCallback, useEffect, useRef, useState } from "react";
import { type Camera, useCameraDevice, useCameraPermission } from "react-native-vision-camera";
import type { CameraFlashMode, CameraPosition, PhotoFile, TakePhotoConfig } from "@/types";

interface UseCameraOptions {
  initialPosition?: CameraPosition;
  initialFlash?: CameraFlashMode;
}

export function useCamera(options?: UseCameraOptions) {
  const { initialPosition = "back", initialFlash = "off" } = options || {};

  // Estado
  const [position, setPosition] = useState<CameraPosition>(initialPosition);
  const [flash, setFlash] = useState<CameraFlashMode>(initialFlash);
  const [isActive, setIsActive] = useState(false);
  const [zoom, setZoom] = useState(1);

  // Refs
  const cameraRef = useRef<Camera>(null);

  // Hooks da vision-camera
  const { hasPermission, requestPermission } = useCameraPermission();
  const device = useCameraDevice(position);

  // Request permission on mount
  useEffect(() => {
    if (!hasPermission) {
      requestPermission();
    }
  }, [hasPermission, requestPermission]);

  /**
   * Tira uma foto com as configurações especificadas
   */
  const takePhoto = useCallback(
    async (config?: TakePhotoConfig): Promise<PhotoFile | undefined> => {
      try {
        if (!cameraRef.current) {
          throw new Error("Camera ref not available");
        }

        const photo = await cameraRef.current.takePhoto({
          flash: flash === "auto" ? "auto" : flash === "on" ? "on" : "off",
          enableAutoStabilization: true,
          enableAutoRedEyeReduction: true,
          ...config,
        });

        return photo;
      } catch (error) {
        console.error("Error taking photo:", error);
        throw error;
      }
    },
    [flash],
  );

  /**
   * Alterna entre câmera frontal e traseira
   */
  const toggleCameraPosition = useCallback(() => {
    setPosition((prev) => (prev === "back" ? "front" : "back"));
  }, []);

  /**
   * Alterna o modo flash
   */
  const toggleFlash = useCallback(() => {
    setFlash((prev) => {
      if (prev === "off") return "on";
      if (prev === "on") return "auto";
      return "off";
    });
  }, []);

  /**
   * Define o nível de zoom
   */
  const setZoomLevel = useCallback(
    (level: number) => {
      if (device?.minZoom && device?.maxZoom) {
        const clampedZoom = Math.max(device.minZoom, Math.min(level, device.maxZoom));
        setZoom(clampedZoom);
      }
    },
    [device],
  );

  /**
   * Foca em um ponto específico
   */
  const focus = useCallback(async (point: { x: number; y: number }) => {
    try {
      await cameraRef.current?.focus(point);
    } catch (error) {
      console.error("Error focusing:", error);
    }
  }, []);

  return {
    // Estado
    hasPermission,
    isActive,
    device,
    position,
    flash,
    zoom,

    // Refs
    cameraRef,

    // Funções
    takePhoto,
    toggleCameraPosition,
    toggleFlash,
    setZoomLevel,
    focus,
    setIsActive,
    setPosition,
    setFlash,
    requestPermission,
  };
}
