import { Camera } from "react-native-vision-camera";
import type { CameraPermissions, PermissionStatus } from "@/types";

/**
 * Verifica o status atual das permissões de câmera
 */
export async function getCameraPermissionStatus(): Promise<PermissionStatus> {
  const status = await Camera.getCameraPermissionStatus();
  return status;
}

/**
 * Verifica o status atual das permissões de microfone
 */
export async function getMicrophonePermissionStatus(): Promise<PermissionStatus> {
  const status = await Camera.getMicrophonePermissionStatus();
  return status;
}

/**
 * Solicita permissão de câmera
 */
export async function requestCameraPermission(): Promise<PermissionStatus> {
  const permission = await Camera.requestCameraPermission();
  return permission;
}

/**
 * Solicita permissão de microfone
 */
export async function requestMicrophonePermission(): Promise<PermissionStatus> {
  const permission = await Camera.requestMicrophonePermission();
  return permission;
}

/**
 * Verifica se todas as permissões necessárias estão concedidas
 */
export async function checkAllPermissions(): Promise<CameraPermissions> {
  const cameraStatus = await getCameraPermissionStatus();
  const microphoneStatus = await getMicrophonePermissionStatus();

  return {
    camera: cameraStatus === "granted",
    microphone: microphoneStatus === "granted",
  };
}

/**
 * Solicita todas as permissões necessárias
 */
export async function requestAllPermissions(): Promise<CameraPermissions> {
  const cameraPermission = await requestCameraPermission();
  const microphonePermission = await requestMicrophonePermission();

  return {
    camera: cameraPermission === "granted",
    microphone: microphonePermission === "granted",
  };
}

/**
 * Verifica se pelo menos a permissão de câmera está concedida
 */
export async function hasCameraPermission(): Promise<boolean> {
  const status = await getCameraPermissionStatus();
  return status === "granted";
}
