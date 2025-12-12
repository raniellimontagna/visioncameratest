import { useState } from "react";
import { Alert, SafeAreaView, StyleSheet, Switch, Text, useColorScheme, View } from "react-native";
import { BarcodeScanner } from "@/components";

type ScanHistoryItem = {
  code: string;
  timestamp: string;
};

export function BarcodeScannerScreen() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";

  const [isActive, setIsActive] = useState(true);
  const [torch, setTorch] = useState(false);
  const [lastScannedCode, setLastScannedCode] = useState<string>("");
  const [scanHistory, setScanHistory] = useState<ScanHistoryItem[]>([]);

  const handleBarCodeScanned = (data: string) => {
    console.log("Barcode scanned:", data);
    setLastScannedCode(data);

    // Add to history
    const timestamp = new Date().toLocaleTimeString("pt-BR");
    setScanHistory((prev) => [{ code: data, timestamp }, ...prev].slice(0, 5));

    // Show alert
    Alert.alert("Código Escaneado", data, [{ text: "OK" }]);
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: isDark ? "#000" : "#fff",
    },
    header: {
      padding: 20,
      backgroundColor: isDark ? "#1a1a1a" : "#f5f5f5",
      borderBottomWidth: 1,
      borderBottomColor: isDark ? "#333" : "#ddd",
    },
    title: {
      fontSize: 24,
      fontWeight: "bold",
      marginBottom: 10,
      color: isDark ? "#fff" : "#000",
    },
    controls: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginTop: 10,
    },
    controlLabel: {
      fontSize: 16,
      color: isDark ? "#fff" : "#000",
    },
    scannerContainer: {
      marginTop: 20,
      paddingHorizontal: 20,
    },
    scannerLabel: {
      fontSize: 16,
      fontWeight: "600",
      marginBottom: 10,
      color: isDark ? "#fff" : "#000",
    },
    resultContainer: {
      marginTop: 30,
      paddingHorizontal: 20,
    },
    resultLabel: {
      fontSize: 16,
      fontWeight: "600",
      marginBottom: 10,
      color: isDark ? "#fff" : "#000",
    },
    resultText: {
      fontSize: 14,
      padding: 15,
      backgroundColor: isDark ? "#1a1a1a" : "#f0f0f0",
      borderRadius: 8,
      fontFamily: "monospace",
      color: isDark ? "#fff" : "#000",
    },
    scanHistory: {
      marginTop: 20,
      paddingHorizontal: 20,
    },
    historyLabel: {
      fontSize: 16,
      fontWeight: "600",
      marginBottom: 10,
      color: isDark ? "#fff" : "#000",
    },
    historyItem: {
      padding: 10,
      backgroundColor: isDark ? "#1a1a1a" : "#f9f9f9",
      borderRadius: 6,
      marginBottom: 8,
      borderLeftWidth: 3,
      borderLeftColor: "#fe4300",
    },
    historyText: {
      fontSize: 12,
      fontFamily: "monospace",
      color: isDark ? "#fff" : "#000",
    },
    historyTime: {
      fontSize: 10,
      color: isDark ? "#999" : "#666",
      marginTop: 4,
    },
  });

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Barcode Scanner Test</Text>

        <View style={styles.controls}>
          <Text style={styles.controlLabel}>Scanner Ativo</Text>
          <Switch value={isActive} onValueChange={setIsActive} />
        </View>

        <View style={styles.controls}>
          <Text style={styles.controlLabel}>Lanterna (Torch)</Text>
          <Switch value={torch} onValueChange={setTorch} />
        </View>
      </View>

      <View style={styles.scannerContainer}>
        <Text style={styles.scannerLabel}>Scanner:</Text>
        <BarcodeScanner
          onBarCodeScanned={handleBarCodeScanned}
          isActive={isActive}
          torch={torch}
          scanDelay={1500}
        />
      </View>

      {lastScannedCode ? (
        <View style={styles.resultContainer}>
          <Text style={styles.resultLabel}>Último código escaneado:</Text>
          <Text style={styles.resultText}>{lastScannedCode}</Text>
        </View>
      ) : null}

      {scanHistory.length > 0 && (
        <View style={styles.scanHistory}>
          <Text style={styles.historyLabel}>Histórico (últimos 5):</Text>
          {scanHistory.map((item, index) => (
            <View key={`${item.code}-${index}`} style={styles.historyItem}>
              <Text style={styles.historyText}>{item.code}</Text>
              <Text style={styles.historyTime}>{item.timestamp}</Text>
            </View>
          ))}
        </View>
      )}
    </SafeAreaView>
  );
}
