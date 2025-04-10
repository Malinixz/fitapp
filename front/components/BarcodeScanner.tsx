import React from 'react';
import { View, Modal, StyleSheet } from 'react-native';
import { Button, Text } from 'react-native-paper';
import { CameraView, useCameraPermissions } from 'expo-camera';

const BarcodeScanner = ({ visible, onClose, onBarcodeScanned }) => {
  const [cameraPermission, requestCameraPermission] = useCameraPermissions();

  const handleRequestPermission = async () => {
    await requestCameraPermission();
  };

  return (
    <Modal
      visible={visible}
      onRequestClose={onClose}
      animationType="slide"
    >
      <View style={styles.cameraContainer}>
        {cameraPermission?.granted ? (
          <View style={styles.cameraWithLine}>
            <CameraView
              facing="back"
              style={styles.camera}
              onBarcodeScanned={(barcode) => {
                console.log('Código de barras escaneado:', barcode);
                onBarcodeScanned?.(barcode);
              }}
            />
            <View style={styles.scanLine} />
          </View>
        ) : (
          <View style={styles.permissionContainer}>
            <Text style={styles.permissionText}>
              Precisamos de permissão para acessar a câmera
            </Text>
            <Button
              mode="contained"
              onPress={handleRequestPermission}
            >
              Solicitar Permissão
            </Button>
          </View>
        )}
        <View style={styles.closeButtonContainer}>
          <Button
            mode="contained"
            onPress={onClose}
          >
            Fechar
          </Button>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  cameraContainer: {
    flex: 1,
    backgroundColor: 'black',
  },
  cameraWithLine: {
    flex: 1,
    position: 'relative', // Necessário para posicionar a linha
  },
  camera: {
    flex: 1,
  },
  scanLine: {
    position: 'absolute',
    top: '50%', // Centraliza verticalmente
    left: 0,
    right: 0,
    height: 2,
    backgroundColor: 'red',
    zIndex: 1, // Garante que a linha fique sobre a câmera
  },
  closeButtonContainer: {
    position: "absolute",
    bottom: 32,
    left: 32,
    right: 32,
  },
  permissionContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  permissionText: {
    fontSize: 16,
    color: '#fff',
    textAlign: 'center',
    marginBottom: 20,
  },
});

export default BarcodeScanner;