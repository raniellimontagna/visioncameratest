# React Native Vision Camera - Projeto de Testes

Projeto React Native dedicado a testes e experimentação com a biblioteca [react-native-vision-camera](https://github.com/mrousavy/react-native-vision-camera), uma poderosa biblioteca para captura de fotos e vídeos com recursos avançados de câmera.

## 📋 Índice

- [Sobre o Projeto](#sobre-o-projeto)
- [Funcionalidades](#funcionalidades)
- [Tecnologias](#tecnologias)
- [Pré-requisitos](#pré-requisitos)
- [Instalação](#instalação)
- [Configuração](#configuração)
- [Uso](#uso)
- [Estrutura do Projeto](#estrutura-do-projeto)
- [Recursos da Vision Camera](#recursos-da-vision-camera)
- [Troubleshooting](#troubleshooting)
- [Contribuindo](#contribuindo)
- [Licença](#licença)

## 🎯 Sobre o Projeto

Este projeto foi criado para explorar e testar as capacidades da biblioteca `react-native-vision-camera`, incluindo:

- Captura de fotos
- Frame processing em tempo real
- Code scanning (QR Code, barcode)
- Filtros e efeitos de câmera
- Controles avançados (ISO, exposure, focus, zoom)
- Photo optimization
- Flash e torch mode

## ✨ Funcionalidades

- [ ] Preview da câmera em tempo real
- [ ] Captura de fotos
- [ ] Controle de flash
- [ ] Zoom digital
- [ ] QR Code scanner
- [ ] Frame processing customizado
- [ ] Filtros de câmera

## 🚀 Tecnologias

- [React Native](https://reactnative.dev/) - Framework mobile
- [TypeScript](https://www.typescriptlang.org/) - Linguagem de programação
- [react-native-vision-camera](https://react-native-vision-camera.com/) - Biblioteca de câmera
- [react-native-worklets-core](https://github.com/margelo/react-native-worklets-core) - Para frame processors

## 📋 Pré-requisitos

Antes de começar, você precisa ter instalado:

- Node.js (v20 ou superior)
- npm ou yarn
- React Native CLI
- Xcode (para iOS)
- Android Studio (para Android)
- CocoaPods (para iOS)

### Requisitos do Sistema

- **iOS**: iOS 11.0 ou superior
- **Android**: Android 5.0 (API 21) ou superior

## 💻 Instalação

1. Clone o repositório:

```bash
git clone https://github.com/raniellimontagna/test-react-native-vision-camera.git
cd test-react-native-vision-camera
```

2. Instale as dependências:

```bash
npm install
# ou
yarn install
```

3. Para iOS, instale os pods:

```bash
cd ios && pod install && cd ..
```

4. Execute o projeto:

**iOS:**

```bash
npm run ios
# ou
yarn ios
```

**Android:**

```bash
npm run android
# ou
yarn android
```

## ⚙️ Configuração

### Permissões

#### iOS (ios/TestVisionCamera/Info.plist)

Adicione as seguintes permissões no arquivo `Info.plist`:

```xml
<key>NSCameraUsageDescription</key>
<string>Este app precisa de acesso à câmera para capturar fotos e vídeos</string>
<key>NSMicrophoneUsageDescription</key>
<string>Este app precisa de acesso ao microfone para gravar vídeos com áudio</string>
<key>NSPhotoLibraryAddUsageDescription</key>
<string>Este app precisa de acesso à galeria para salvar fotos e vídeos</string>
```

#### Android (android/app/src/main/AndroidManifest.xml)

```xml
<uses-permission android:name="android.permission.CAMERA" />
<uses-permission android:name="android.permission.RECORD_AUDIO" />
<uses-permission android:name="android.permission.WRITE_EXTERNAL_STORAGE" />
```

### Frame Processors (Opcional)

Se você planeja usar Frame Processors, adicione ao `babel.config.js`:

```javascript
module.exports = {
  presets: ["module:metro-react-native-babel-preset"],
  plugins: [["react-native-worklets-core/plugin"]],
};
```

## 📱 Uso

### Exemplo Básico

```typescript
import { Camera, useCameraDevice } from "react-native-vision-camera";

function App() {
  const device = useCameraDevice("back");
  const camera = useRef<Camera>(null);

  const takePhoto = async () => {
    const photo = await camera.current?.takePhoto();
    console.log("Foto capturada:", photo);
  };

  if (device == null) return <LoadingView />;

  return (
    <Camera
      ref={camera}
      style={StyleSheet.absoluteFill}
      device={device}
      isActive={true}
      photo={true}
    />
  );
}
```

### QR Code Scanner

```typescript
import { Camera } from "react-native-vision-camera";
import { useScanBarcodes, BarcodeFormat } from "vision-camera-code-scanner";

function QRScanner() {
  const [frameProcessor, barcodes] = useScanBarcodes([BarcodeFormat.QR_CODE]);
  const device = useCameraDevice("back");

  useEffect(() => {
    if (barcodes.length > 0) {
      console.log("QR Code detectado:", barcodes[0].displayValue);
    }
  }, [barcodes]);

  return (
    <Camera
      style={StyleSheet.absoluteFill}
      device={device}
      isActive={true}
      frameProcessor={frameProcessor}
    />
  );
}
```

## 📁 Estrutura do Projeto

```
test-react-native-vision-camera/
├── src/
│   ├── components/          # Componentes reutilizáveis
│   │   ├── CameraView.tsx
│   │   ├── CameraControls.tsx
│   │   └── MediaPreview.tsx
│   ├── screens/             # Telas do app
│   │   ├── HomeScreen.tsx
│   │   ├── CameraScreen.tsx
│   │   └── QRScannerScreen.tsx
│   ├── hooks/               # Custom hooks
│   │   ├── useCamera.ts
│   │   └── usePermissions.ts
│   ├── utils/               # Utilitários
│   │   ├── permissions.ts
│   │   └── media.ts
│   └── types/               # Definições de tipos TypeScript
│       └── camera.types.ts
├── android/                 # Código nativo Android
├── ios/                     # Código nativo iOS
├── package.json
├── tsconfig.json
└── README.md
```

## 🎥 Recursos da Vision Camera

### Captura de Fotos

```typescript
const photo = await camera.current?.takePhoto({
  flash: "on",
  enableAutoStabilization: true,
  enableAutoRedEyeReduction: true,
});
```

### Gravação de Vídeo

```typescript
await camera.current?.startRecording({
  flash: "on",
  onRecordingFinished: (video) => {
    console.log("Vídeo gravado:", video);
  },
  onRecordingError: (error) => {
    console.error("Erro ao gravar:", error);
  },
});

// Parar gravação
await camera.current?.stopRecording();
```

### Controles de Câmera

```typescript
// Zoom
await camera.current?.focus({ x: 100, y: 100 });

// Focus
await camera.current?.focus({ x: centerX, y: centerY });

// Exposure
const supportsExposure = device.supportsExposure;
```

### Frame Processor

```typescript
const frameProcessor = useFrameProcessor((frame) => {
  "worklet";

  const detectedFaces = detectFaces(frame);
  console.log(`Detectadas ${detectedFaces.length} faces`);
}, []);
```

## 🔧 Troubleshooting

### Problema: "Camera permission is denied"

**Solução:** Verifique se as permissões estão corretamente configuradas no `Info.plist` (iOS) ou `AndroidManifest.xml` (Android).

### Problema: "No camera device found"

**Solução:** Certifique-se de que o dispositivo possui câmera e que o app tem permissão para acessá-la.

### Problema: Erro ao instalar pods no iOS

**Solução:**

```bash
cd ios
pod deintegrate
pod install
cd ..
```

### Problema: Build falha no Android

**Solução:** Verifique se o `minSdkVersion` está configurado para pelo menos 21 no `android/build.gradle`.

## 🤝 Contribuindo

Contribuições são bem-vindas! Para contribuir:

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/MinhaFeature`)
3. Commit suas mudanças (`git commit -m 'Adiciona MinhaFeature'`)
4. Push para a branch (`git push origin feature/MinhaFeature`)
5. Abra um Pull Request

## 📝 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

---

## 📚 Recursos Adicionais

- [Documentação oficial react-native-vision-camera](https://react-native-vision-camera.com/)
- [Exemplos e guias](https://react-native-vision-camera.com/docs/guides)
- [API Reference](https://react-native-vision-camera.com/docs/api)
- [Frame Processor Plugins](https://react-native-vision-camera.com/docs/guides/frame-processors-plugins-overview)

## 👨‍💻 Autor

Desenvolvido por Ranielli Montagna

## 🙏 Agradecimentos

- [Marc Rousavy](https://github.com/mrousavy) - Criador da react-native-vision-camera
- Comunidade React Native

---

**Status do Projeto:** 🚧 Em desenvolvimento ativo
