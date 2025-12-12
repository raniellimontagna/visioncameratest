import type {
  CameraDevice,
  CameraPosition,
  PhotoFile,
  RecordVideoOptions,
  TakePhotoOptions,
  VideoFile,
} from "react-native-vision-camera";

export type { CameraDevice, CameraPosition, PhotoFile, VideoFile };

export type CameraFlashMode = "on" | "off" | "auto";

export interface CameraPermissions {
  camera: boolean;
  microphone: boolean;
}

export type PermissionStatus = "granted" | "denied" | "not-determined" | "restricted";

export interface CameraConfig {
  position: CameraPosition;
  flashMode: CameraFlashMode;
  enableZoom: boolean;
  enableHDR: boolean;
}

export interface TakePhotoConfig extends Omit<TakePhotoOptions, "flash"> {
  flash?: CameraFlashMode;
  enableAutoStabilization?: boolean;
  enableAutoRedEyeReduction?: boolean;
}

export interface RecordVideoConfig extends Omit<RecordVideoOptions, "flash"> {
  flash?: CameraFlashMode;
  videoBitRate?: "low" | "normal" | "high";
}
