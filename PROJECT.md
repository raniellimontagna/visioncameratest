# Project Guidelines - React Native Vision Camera Test

## 📋 Índice

- [Visão Geral](#visão-geral)
- [Arquitetura](#arquitetura)
- [Padrões de Código](#padrões-de-código)
- [Estrutura de Pastas](#estrutura-de-pastas)
- [Nomenclatura](#nomenclatura)
- [TypeScript](#typescript)
- [Componentes](#componentes)
- [Hooks](#hooks)
- [Performance](#performance)
- [Tratamento de Erros](#tratamento-de-erros)
- [Testes](#testes)
- [Git & Commits](#git--commits)
- [Code Review](#code-review)

## 🎯 Visão Geral

Este documento define os padrões e boas práticas para o desenvolvimento do projeto React Native Vision Camera. Seguir estas diretrizes garante consistência, manutenibilidade e qualidade do código.

### Princípios Fundamentais

1. **KISS (Keep It Simple, Stupid)**: Mantenha o código simples e direto
2. **DRY (Don't Repeat Yourself)**: Evite duplicação de código
3. **SOLID**: Aplique princípios de design orientado a objetos
4. **Clean Code**: Código limpo e legível é mais importante que código "inteligente"
5. **Performance First**: Otimize para performance desde o início

## 🏗️ Arquitetura

### Padrões Arquiteturais

- **Component-Based Architecture**: Componentes reutilizáveis e isolados
- **Custom Hooks**: Lógica compartilhada em hooks personalizados
- **Separation of Concerns**: Separação clara entre UI, lógica e dados
- **Composition over Inheritance**: Prefira composição a herança

### Camadas da Aplicação

```
UI Layer (Components/Screens)
    ↓
Business Logic Layer (Hooks/Utils)
    ↓
Data Layer (Services/API)
    ↓
Native Layer (Camera/Permissions)
```

## 💻 Padrões de Código

### Formatação

- **Indentação**: 2 espaços (não tabs)
- **Comprimento de linha**: Máximo 100 caracteres
- **Ponto e vírgula**: Sempre usar
- **Aspas**: Usar aspas duplas para strings
- **Trailing commas**: Sempre usar em objetos e arrays multi-linha

### Biome

Utilizamos [Biome](https://biomejs.dev/) como ferramenta all-in-one para linting e formatação, substituindo ESLint e Prettier.

#### Configuração (biome.json)

```json
{
  "$schema": "https://biomejs.dev/schemas/1.9.4/schema.json",
  "vcs": {
    "enabled": true,
    "clientKind": "git",
    "useIgnoreFile": true
  },
  "files": {
    "ignoreUnknown": false,
    "ignore": [
      "node_modules",
      "dist",
      "build",
      "ios",
      "android",
      ".expo",
      "coverage"
    ]
  },
  "formatter": {
    "enabled": true,
    "indentStyle": "space",
    "indentWidth": 2,
    "lineWidth": 100
  },
  "organizeImports": {
    "enabled": true
  },
  "linter": {
    "enabled": true,
    "rules": {
      "recommended": true,
      "complexity": {
        "noForEach": "off"
      },
      "style": {
        "useImportType": "error",
        "useNodejsImportProtocol": "error"
      },
      "suspicious": {
        "noExplicitAny": "warn"
      }
    }
  },
  "javascript": {
    "formatter": {
      "quoteStyle": "double",
      "semicolons": "always",
      "trailingCommas": "all",
      "arrowParentheses": "always"
    }
  }
}
```

#### Scripts package.json

```json
{
  "scripts": {
    "lint": "biome lint .",
    "lint:fix": "biome lint --write .",
    "format": "biome format .",
    "format:fix": "biome format --write .",
    "check": "biome check .",
    "check:fix": "biome check --write ."
  }
}
```

#### Vantagens do Biome

- **Performance**: 25x mais rápido que ESLint
- **All-in-one**: Linter + Formatter em uma única ferramenta
- **Zero config**: Funciona out-of-the-box com configurações sensatas
- **Import sorting**: Organiza imports automaticamente
- **Mensagens claras**: Erros e warnings mais compreensíveis

### Imports

Ordem de imports:

```typescript
// 1. React & React Native
import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";

// 2. Bibliotecas externas
import { Camera, useCameraDevice } from "react-native-vision-camera";

// 3. Componentes internos
import { Button } from "@/components/Button";
import { CameraControls } from "@/components/CameraControls";

// 4. Hooks
import { usePermissions } from "@/hooks/usePermissions";
import { useCamera } from "@/hooks/useCamera";

// 5. Utils e helpers
import { checkPermissions } from "@/utils/permissions";
import { formatDate } from "@/utils/date";

// 6. Types
import type { CameraDevice, PhotoFile } from "react-native-vision-camera";
import type { CameraProps } from "@/types/camera.types";

// 7. Constants
import { CAMERA_SETTINGS } from "@/constants/camera";
```

## 📁 Estrutura de Pastas

```
src/
├── components/              # Componentes reutilizáveis
│   ├── atoms/              # Componentes básicos (Button, Input, etc)
│   ├── molecules/          # Composições simples (SearchBar, Card, etc)
│   ├── organisms/          # Composições complexas (CameraView, QRScanner, etc)
│   └── index.ts           # Barrel exports
├── screens/                # Telas da aplicação
│   ├── HomeScreen/
│   │   ├── index.tsx
│   │   ├── styles.ts
│   │   └── types.ts
│   └── CameraScreen/
│       ├── index.tsx
│       ├── styles.ts
│       └── types.ts
├── hooks/                  # Custom hooks
│   ├── useCamera.ts
│   ├── usePermissions.ts
│   ├── useFrameProcessor.ts
│   └── index.ts
├── services/               # Serviços e APIs
│   ├── camera/
│   │   ├── CameraService.ts
│   │   └── types.ts
│   └── storage/
│       └── StorageService.ts
├── utils/                  # Utilitários e helpers
│   ├── permissions.ts
│   ├── media.ts
│   ├── validation.ts
│   └── index.ts
├── types/                  # Definições de tipos TypeScript
│   ├── camera.types.ts
│   ├── navigation.types.ts
│   └── index.ts
├── constants/              # Constantes da aplicação
│   ├── camera.ts
│   ├── colors.ts
│   └── index.ts
├── config/                 # Configurações
│   └── camera.config.ts
└── App.tsx                # Componente raiz
```

## 🏷️ Nomenclatura

### Arquivos

- **Componentes**: PascalCase (`CameraView.tsx`, `QRScanner.tsx`)
- **Hooks**: camelCase com prefixo `use` (`useCamera.ts`, `usePermissions.ts`)
- **Utils**: camelCase (`permissions.ts`, `mediaUtils.ts`)
- **Types**: camelCase com sufixo `.types` (`camera.types.ts`)
- **Constants**: camelCase (`colors.ts`, `cameraSettings.ts`)

### Variáveis e Funções

```typescript
// ✅ Correto
const cameraDevice = useCameraDevice("back");
const handleTakePhoto = async () => {};
const isPermissionGranted = await checkPermission();

// ❌ Errado
const CameraDevice = useCameraDevice("back");
const HandleTakePhoto = async () => {};
const is_permission_granted = await checkPermission();
```

### Componentes

```typescript
// ✅ Correto - PascalCase
export function CameraView({ device }: CameraViewProps) {}
export const QRScanner: React.FC<QRScannerProps> = ({ onScan }) => {};

// ❌ Errado
export function cameraView({ device }: CameraViewProps) {}
export const qrScanner = ({ onScan }) => {};
```

### Constantes

```typescript
// ✅ Correto - UPPER_SNAKE_CASE para constantes globais
export const MAX_ZOOM_LEVEL = 10;
export const DEFAULT_CAMERA_POSITION = "back";
export const PHOTO_QUALITY_SETTINGS = {
  HIGH: 100,
  MEDIUM: 75,
  LOW: 50,
} as const;

// Correto - camelCase para configurações
export const cameraConfig = {
  enableAutoStabilization: true,
  flashMode: "auto",
} as const;
```

### Types e Interfaces

```typescript
// ✅ Correto - PascalCase, prefixar interfaces com 'I' é opcional
export interface CameraPermissions {
  camera: boolean;
  microphone: boolean;
  storage: boolean;
}

export type CameraPosition = "front" | "back";
export type FlashMode = "on" | "off" | "auto";

// Props sempre com sufixo Props
export interface CameraViewProps {
  device: CameraDevice;
  onPhotoTaken: (photo: PhotoFile) => void;
  isActive: boolean;
}
```

## 📘 TypeScript

### Configuração Strict

```json
{
  "compilerOptions": {
    "strict": true,
    "noImplicitAny": true,
    "strictNullChecks": true,
    "strictFunctionTypes": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true
  }
}
```

### Tipos vs Interfaces

```typescript
// ✅ Use 'type' para unions, primitivos e funções
export type CameraPosition = "front" | "back";
export type OnPhotoTaken = (photo: PhotoFile) => void;

// ✅ Use 'interface' para objetos e quando precisar de extensão
export interface CameraConfig {
  position: CameraPosition;
  flashMode: FlashMode;
  enableZoom: boolean;
}

export interface AdvancedCameraConfig extends CameraConfig {
  enableHDR: boolean;
  videoCodec: VideoCodec;
}
```

### Type Guards

```typescript
// ✅ Sempre use type guards para narrowing
function isCameraDevice(device: unknown): device is CameraDevice {
  return (
    typeof device === "object" &&
    device !== null &&
    "id" in device &&
    "position" in device
  );
}

// Uso
if (isCameraDevice(device)) {
  // TypeScript sabe que device é CameraDevice aqui
  console.log(device.position);
}
```

### Evite 'any'

```typescript
// ❌ Errado
function processFrame(frame: any) {
  return frame.width * frame.height;
}

// ✅ Correto
function processFrame(frame: Frame): number {
  return frame.width * frame.height;
}

// ✅ Se realmente não souber o tipo, use 'unknown'
function processUnknownData(data: unknown): void {
  if (typeof data === "object" && data !== null) {
    // Narrow the type before using
  }
}
```

## 🧩 Componentes

### Functional Components

```typescript
// ✅ Correto - Use function declaration
export function CameraView({ device, isActive, onError }: CameraViewProps) {
  const cameraRef = useRef<Camera>(null);
  const [flash, setFlash] = useState<FlashMode>("off");

  const handleTakePhoto = useCallback(async () => {
    try {
      const photo = await cameraRef.current?.takePhoto({
        flash,
        enableAutoStabilization: true,
      });

      if (photo) {
        console.log("Photo taken:", photo.path);
      }
    } catch (error) {
      onError?.(error as Error);
    }
  }, [flash, onError]);

  if (!device) {
    return <LoadingView />;
  }

  return (
    <Camera
      ref={cameraRef}
      style={styles.camera}
      device={device}
      isActive={isActive}
      photo
    />
  );
}

// ✅ Props com interface separada
interface CameraViewProps {
  device: CameraDevice | null;
  isActive: boolean;
  onError?: (error: Error) => void;
}

// ✅ Styles separados
const styles = StyleSheet.create({
  camera: {
    flex: 1,
  },
});
```

### Component Organization

```typescript
// Ordem dentro do componente:
export function MyComponent({ prop1, prop2 }: MyComponentProps) {
  // 1. Hooks de estado
  const [state, setState] = useState();

  // 2. Hooks de contexto
  const { user } = useAuth();

  // 3. Hooks de navegação
  const navigation = useNavigation();

  // 4. Refs
  const ref = useRef(null);

  // 5. Custom hooks
  const { data, loading } = useCustomHook();

  // 6. Computed values (useMemo)
  const computedValue = useMemo(() => {
    return expensiveCalculation(state);
  }, [state]);

  // 7. Effects
  useEffect(() => {
    // side effects
  }, []);

  // 8. Handlers (useCallback)
  const handlePress = useCallback(() => {
    // handle
  }, []);

  // 9. Early returns
  if (loading) return <Loading />;
  if (!data) return null;

  // 10. Render
  return <View>{/* JSX */}</View>;
}
```

### Prop Destructuring

```typescript
// ✅ Correto - Destructure props
export function Button({ title, onPress, disabled = false }: ButtonProps) {
  return (
    <Pressable onPress={onPress} disabled={disabled}>
      <Text>{title}</Text>
    </Pressable>
  );
}

// ❌ Errado - Não use props.
export function Button(props: ButtonProps) {
  return (
    <Pressable onPress={props.onPress} disabled={props.disabled}>
      <Text>{props.title}</Text>
    </Pressable>
  );
}
```

### Conditional Rendering

```typescript
// ✅ Correto - Use early returns para condições complexas
if (loading) {
  return <LoadingView />;
}

if (error) {
  return <ErrorView error={error} />;
}

// ✅ Correto - Use && para condições simples
{
  hasPermission && <CameraView device={device} />;
}

// ✅ Correto - Use ternário para alternativas
{
  isRecording ? <StopButton /> : <RecordButton />;
}

// ❌ Errado - Evite ternários aninhados
{
  condition1 ? (
    condition2 ? (
      <ComponentA />
    ) : (
      <ComponentB />
    )
  ) : condition3 ? (
    <ComponentC />
  ) : (
    <ComponentD />
  );
}
```

## 🎣 Hooks

### Custom Hooks

```typescript
// ✅ Estrutura de um custom hook
export function useCamera(position: CameraPosition = "back") {
  const [hasPermission, setHasPermission] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const cameraRef = useRef<Camera>(null);
  const device = useCameraDevice(position);

  // Request permissions
  useEffect(() => {
    (async () => {
      const permission = await Camera.requestCameraPermission();
      setHasPermission(permission === "granted");
    })();
  }, []);

  // Take photo handler
  const takePhoto = useCallback(async (options?: TakePhotoOptions) => {
    try {
      if (!cameraRef.current) {
        throw new Error("Camera ref not available");
      }

      const photo = await cameraRef.current.takePhoto({
        enableAutoStabilization: true,
        ...options,
      });

      return photo;
    } catch (error) {
      console.error("Error taking photo:", error);
      throw error;
    }
  }, []);

  // Focus handler
  const focus = useCallback(async (point: Point) => {
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
    // Refs
    cameraRef,
    // Funções
    takePhoto,
    focus,
    setIsActive,
  };
}

// ✅ Uso do hook
function CameraScreen() {
  const { hasPermission, device, cameraRef, takePhoto, focus } =
    useCamera("back");

  if (!hasPermission) {
    return <PermissionDeniedView />;
  }

  return <Camera ref={cameraRef} device={device} isActive={true} />;
}
```

### Hook Dependencies

```typescript
// ✅ Sempre liste todas as dependências
useEffect(() => {
  if (device && isActive) {
    initializeCamera(device);
  }
}, [device, isActive]); // Todas as dependências listadas

// ✅ Use useCallback para funções que são dependências
const handleError = useCallback((error: Error) => {
  console.error("Camera error:", error);
  showErrorAlert(error.message);
}, []);

useEffect(() => {
  camera.on("error", handleError);
  return () => camera.off("error", handleError);
}, [handleError]);

// ❌ Errado - Dependências faltando
useEffect(() => {
  if (device && isActive) {
    initializeCamera(device);
  }
}, []); // Missing dependencies!
```

### useMemo vs useCallback

```typescript
// ✅ useMemo para valores computados
const filteredDevices = useMemo(() => {
  return devices.filter((device) => device.position === position);
}, [devices, position]);

// ✅ useCallback para funções
const handleDeviceSelect = useCallback(
  (device: CameraDevice) => {
    setSelectedDevice(device);
    onDeviceChange?.(device);
  },
  [onDeviceChange]
);

// ❌ Evite otimizações prematuras
// Nem tudo precisa de useMemo/useCallback
const simpleValue = devices.length; // Não precisa de useMemo
```

## ⚡ Performance

### Otimizações de Renderização

```typescript
// ✅ Use React.memo para componentes puros
export const CameraButton = React.memo<CameraButtonProps>(
  ({ icon, onPress, disabled }) => {
    return (
      <Pressable onPress={onPress} disabled={disabled}>
        <Icon name={icon} />
      </Pressable>
    );
  }
);

// ✅ Use useCallback para callbacks passados como props
function CameraScreen() {
  const handlePhotoTaken = useCallback((photo: PhotoFile) => {
    savePhoto(photo);
    showSuccessMessage();
  }, []);

  return <CameraView onPhotoTaken={handlePhotoTaken} />;
}
```

### Frame Processors

```typescript
// ✅ Frame processors devem ser otimizados
const frameProcessor = useFrameProcessor((frame) => {
  "worklet";

  // Minimize processamento no frame processor
  const faces = detectFaces(frame);

  // Use runOnJS para chamar código JavaScript
  if (faces.length > 0) {
    runOnJS(handleFacesDetected)(faces);
  }
}, []);

// ✅ Throttle frame processing se necessário
const throttledFrameProcessor = useFrameProcessor((frame) => {
  "worklet";

  const now = Date.now();
  if (now - lastProcessTime > 100) {
    // Process at most every 100ms
    processFrame(frame);
    lastProcessTime = now;
  }
}, []);
```

### Lazy Loading

```typescript
// ✅ Use lazy loading para telas
const CameraScreen = lazy(() => import("./screens/CameraScreen"));
const QRScannerScreen = lazy(() => import("./screens/QRScannerScreen"));

// ✅ Use Suspense
function App() {
  return (
    <Suspense fallback={<LoadingScreen />}>
      <NavigationContainer>
        <Stack.Screen name="Camera" component={CameraScreen} />
      </NavigationContainer>
    </Suspense>
  );
}
```

### Image Optimization

```typescript
// ✅ Otimize qualidade de fotos baseado no uso
const takePhotoForPreview = async () => {
  return await camera.current?.takePhoto({
    qualityPrioritization: "speed", // Para preview
    enableAutoStabilization: false,
  });
};

const takePhotoForSave = async () => {
  return await camera.current?.takePhoto({
    qualityPrioritization: "quality", // Para salvar
    enableAutoStabilization: true,
    enableAutoRedEyeReduction: true,
  });
};
```

## 🚨 Tratamento de Erros

### Try-Catch

```typescript
// ✅ Sempre trate erros em operações de câmera
async function takePhoto() {
  try {
    const photo = await cameraRef.current?.takePhoto();

    if (!photo) {
      throw new Error("Failed to capture photo");
    }

    return photo;
  } catch (error) {
    if (error instanceof Error) {
      console.error("Photo capture failed:", error.message);
      showErrorAlert(error.message);
    }
    throw error;
  }
}
```

### Error Boundaries

```typescript
// ✅ Use Error Boundaries para componentes críticos
class CameraErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { hasError: boolean; error: Error | null }
> {
  state = { hasError: false, error: null };

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("Camera Error:", error, errorInfo);
    // Log to error reporting service
  }

  render() {
    if (this.state.hasError) {
      return <ErrorView error={this.state.error} />;
    }

    return this.props.children;
  }
}

// Uso
<CameraErrorBoundary>
  <CameraScreen />
</CameraErrorBoundary>;
```

### Permission Errors

```typescript
// ✅ Trate diferentes estados de permissão
async function checkCameraPermission(): Promise<PermissionStatus> {
  const permission = await Camera.getCameraPermissionStatus();

  switch (permission) {
    case "granted":
      return { status: "granted" };

    case "denied":
      return {
        status: "denied",
        message: "Camera permission is denied. Please enable it in settings.",
      };

    case "not-determined":
      // Request permission
      const newPermission = await Camera.requestCameraPermission();
      return checkCameraPermission(); // Recursive check

    case "restricted":
      return {
        status: "restricted",
        message: "Camera access is restricted by device policy.",
      };

    default:
      return {
        status: "unknown",
        message: "Unknown permission status.",
      };
  }
}
```

## 🧪 Testes

### Estrutura de Testes

```typescript
// ✅ Organize testes por funcionalidade
describe("useCamera Hook", () => {
  describe("Initialization", () => {
    it("should request camera permission on mount", async () => {
      // Test implementation
    });

    it("should select back camera by default", () => {
      // Test implementation
    });
  });

  describe("Photo Capture", () => {
    it("should capture photo successfully", async () => {
      // Test implementation
    });

    it("should handle capture errors gracefully", async () => {
      // Test implementation
    });
  });
});
```

### Mock de Módulos Nativos

```typescript
// ✅ Mock react-native-vision-camera
jest.mock("react-native-vision-camera", () => ({
  Camera: {
    getCameraPermissionStatus: jest.fn(),
    requestCameraPermission: jest.fn(),
  },
  useCameraDevice: jest.fn(),
}));

// Uso nos testes
beforeEach(() => {
  (Camera.getCameraPermissionStatus as jest.Mock).mockResolvedValue("granted");
  (useCameraDevice as jest.Mock).mockReturnValue(mockCameraDevice);
});
```

### Testes de Componentes

```typescript
// ✅ Teste comportamento, não implementação
import { render, fireEvent, waitFor } from "@testing-library/react-native";

describe("CameraView Component", () => {
  it("should display loading when device is null", () => {
    const { getByTestId } = render(
      <CameraView device={null} isActive={false} />
    );

    expect(getByTestId("loading-view")).toBeTruthy();
  });

  it("should call onPhotoTaken when photo is captured", async () => {
    const onPhotoTaken = jest.fn();
    const { getByTestId } = render(
      <CameraView
        device={mockDevice}
        isActive={true}
        onPhotoTaken={onPhotoTaken}
      />
    );

    fireEvent.press(getByTestId("capture-button"));

    await waitFor(() => {
      expect(onPhotoTaken).toHaveBeenCalledWith(expect.any(Object));
    });
  });
});
```

## 🔄 Git & Commits

### Commit Messages

Siga o padrão [Conventional Commits](https://www.conventionalcommits.org/):

```
<type>(<scope>): <subject>

<body>

<footer>
```

#### Types:

- `feat`: Nova funcionalidade
- `fix`: Correção de bug
- `docs`: Mudanças em documentação
- `style`: Formatação, ponto e vírgula, etc
- `refactor`: Refatoração de código
- `perf`: Melhorias de performance
- `test`: Adição ou correção de testes
- `chore`: Tarefas de build, configuração, etc

#### Exemplos:

```bash
feat(camera): add zoom control functionality

- Implement pinch to zoom gesture
- Add zoom slider UI component
- Handle zoom level state management

Closes #123
```

```bash
fix(permissions): handle permission denied state correctly

Previously, the app would crash when permissions were denied.
Now it shows a proper error message with instructions.

Fixes #456
```

```bash
refactor(hooks): extract camera logic into useCamera hook

- Move camera initialization logic to custom hook
- Improve reusability across components
- Add proper TypeScript types
```

### Branch Naming

```bash
# Feature branches
feature/add-qr-scanner
feature/implement-frame-processor

# Bug fixes
fix/permission-crash
fix/camera-rotation-issue

# Refactoring
refactor/extract-camera-hooks
refactor/improve-error-handling

# Documentation
docs/update-readme
docs/add-api-documentation
```

### Pull Requests

#### Checklist:

- [ ] Código segue os padrões do projeto
- [ ] Testes foram adicionados/atualizados
- [ ] Documentação foi atualizada
- [ ] Sem warnings de TypeScript
- [ ] Sem warnings do Biome (lint e format)
- [ ] Build está passando (Android e iOS)
- [ ] Testado em device físico
- [ ] Performance verificada
- [ ] Acessibilidade verificada

#### Template de PR:

```markdown
## Descrição

Breve descrição das mudanças

## Tipo de Mudança

- [ ] Bug fix
- [ ] Nova feature
- [ ] Breaking change
- [ ] Refatoração
- [ ] Atualização de documentação

## Como Testar

1. Passo 1
2. Passo 2
3. Resultado esperado

## Screenshots/Videos

(se aplicável)

## Checklist

- [ ] Código testado
- [ ] Documentação atualizada
- [ ] Build passa em Android e iOS
```

## 👀 Code Review

### Checklist do Reviewer

#### Funcionalidade

- [ ] O código faz o que deveria fazer?
- [ ] Edge cases foram considerados?
- [ ] Erros são tratados adequadamente?

#### Qualidade

- [ ] Código é legível e compreensível?
- [ ] Nomenclatura é clara e consistente?
- [ ] Comentários são necessários e úteis?
- [ ] Não há código duplicado?

#### Performance

- [ ] Há otimizações desnecessárias?
- [ ] Há problemas de performance evidentes?
- [ ] Re-renders desnecessários foram evitados?

#### Segurança

- [ ] Dados sensíveis são tratados corretamente?
- [ ] Permissões são verificadas?
- [ ] Input validation está presente?

#### Testes

- [ ] Testes cobrem casos importantes?
- [ ] Testes são compreensíveis?
- [ ] Mocks estão corretos?

### Boas Práticas de Review

```typescript
// ✅ Feedback construtivo
// "Considere usar useCallback aqui para evitar re-renders desnecessários"

// ✅ Faça perguntas
// "Por que optou por esta abordagem? Há alguma limitação que eu deveria saber?"

// ✅ Sugira melhorias
// "Que tal extrair esta lógica para um hook customizado?"

// ✅ Aprecie bom código
// "Excelente tratamento de erro! Muito claro e abrangente."

// ❌ Evite ser vago
// "Isso está errado"

// ❌ Evite ser agressivo
// "Por que você fez dessa forma horrível?"
```

## 📚 Recursos Adicionais

### Documentação

- [React Native Best Practices](https://reactnative.dev/docs/performance)
- [TypeScript Deep Dive](https://basarat.gitbook.io/typescript/)
- [Vision Camera Docs](https://react-native-vision-camera.com/)
- [Clean Code JavaScript](https://github.com/ryanmcdermott/clean-code-javascript)

### Tools Recomendados

- **Biome**: Linting e Formatação
- **TypeScript**: Type checking
- **Husky**: Git hooks
- **Jest**: Testes
- **React Native Debugger**: Debugging

### VS Code Extensions

- Biome
- TypeScript Vue Plugin
- React Native Tools
- GitLens
- Error Lens

---

**Mantido por:** Ranielli Montagna  
**Última atualização:** Dezembro 2025  
**Versão:** 1.0.0
