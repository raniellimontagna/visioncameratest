export const CAMERA_SETTINGS = {
  DEFAULT_POSITION: "back",
  DEFAULT_FLASH_MODE: "off",
  DEFAULT_QUALITY: "balanced",
  ENABLE_HDR: true,
  ENABLE_AUTO_STABILIZATION: true,
  ENABLE_AUTO_RED_EYE_REDUCTION: true,
  MAX_ZOOM: 10,
  MIN_ZOOM: 1,
  ZOOM_STEP: 0.1,
} as const;

export const VIDEO_SETTINGS = {
  DEFAULT_FPS: 30,
  DEFAULT_VIDEO_CODEC: "h264",
  MAX_DURATION: 60, // seconds
} as const;

export const PHOTO_QUALITY = {
  HIGH: 100,
  MEDIUM: 75,
  LOW: 50,
} as const;
