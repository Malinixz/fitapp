import React, { useState, useContext } from "react";
import { Modal, TextInput, Text, View, TouchableOpacity, StyleSheet, Alert } from "react-native";
import GlobalStyles from "@/styles/GlobalStyles";
import { UserContext } from "@/contexts/UserContext";
import { Colors } from "@/styles/Colors";

export default function WeightModal({ modalVisible, setModalVisible }) {
  const [newWeight, setNewWeight] = useState("");
  const { addWeightUpdate } = useContext(UserContext);

  const handleSaveWeight = async () => {
    const response = await addWeightUpdate(parseFloat(newWeight.replace(",", ".")));
    Alert.alert(response.data.msg);
    setModalVisible(false);
    setNewWeight("");
  };

  return (
    <Modal visible={modalVisible} animationType="fade" transparent={true} onDismiss={() => setModalVisible(false)}>
      <View style={GlobalStyles.modalContainer}>
        <View style={GlobalStyles.modalContent}>
          <Text style={GlobalStyles.modalTitle}>Adicionar Novo Peso (Kg)</Text>
          <TextInput
            style={styles.input}
            label="Novo Peso (kg)"
            value={newWeight}
            onChangeText={setNewWeight}
            keyboardType="decimal-pad"
            placeholder="Novo Peso (kg)"
          />
          <View style={styles.modalButtons}>
            <TouchableOpacity style={styles.cancelButton} onPress={() => setModalVisible(false)}>
              <Text style={styles.buttonText}>Cancelar</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.saveButton} onPress={handleSaveWeight}>
              <Text style={styles.buttonText}>Salvar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  input: {
    height: 40,
    borderColor: Colors.primary,
    borderWidth: 1.5,
    borderRadius: 8,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  buttonText: {
    color: "white",
    textAlign: "center",
  },
  cancelButton: {
    backgroundColor: "#e0e0e0",
    padding: 10,
    borderRadius: 8,
  },
  saveButton: {
    backgroundColor: Colors.primary,
    padding: 10,
    borderRadius: 8,
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
});