import type { CodeScanner } from "react-native-vision-camera";

/**
 * Tipos de código de barras suportados pelo scanner
 * Baseado nos tipos disponíveis na react-native-vision-camera
 */
export const barcodeTypes: CodeScanner["codeTypes"] = ["qr", "code-128", "code-39", "code-93"];
