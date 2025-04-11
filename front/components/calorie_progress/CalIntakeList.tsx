import React, { useContext, useState } from "react";
import { View, StyleSheet, Text, Modal, TouchableOpacity } from "react-native";
import { Divider } from "react-native-paper";
import moment from "moment";
import { Day } from "@/types/day.types";
import GlobalStyles from "@/styles/GlobalStyles";
import NutritionInfo from "../NutritionInfo";
import { calculateCarbProtPercentage, calculateFatPercentage } from "@/utils/NutritionCalculator";
import { useRouter } from "expo-router";
import { DayContext } from "@/contexts/DayContext";
import { Colors } from "@/styles/Colors";

interface CalIntakeProps {
    daysData : Day[]
}

export default function CalIntakeList({ daysData } : CalIntakeProps) {
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedDay, setSelectedDay] = useState<Day | null>(null);
    const { loadDayDataAPI } = useContext(DayContext);
    const router = useRouter()
    const showModal = (day: Day) => {
        setSelectedDay(day)
        setModalVisible(true);
    }
    const hideModal = () => setModalVisible(false);
    const handleDetails = async () => {
      await loadDayDataAPI(selectedDay?.Date)
      router.push('/home')
      hideModal()
    }
    return (
      <View style={styles.container}>
          {daysData.length > 0 && (
            <View>
              {daysData.map((day : Day, index) => (
                <TouchableOpacity key={index} onPress={() => { showModal(day) }}>
                  <View style={styles.listItem}>
                    <Text style={styles.weightText}>{day.CaloriesTotal}/{day.CaloriesGoal}kcal</Text>
                    <Text style={styles.dateText}>
                      {moment(day.Date).format("DD/MM/YYYY")}
                    </Text>
                  </View>
                  {index < daysData.length - 1 && <Divider style={styles.divider} />}
                </TouchableOpacity>
              ))}
            </View>
          )}
          <Modal
              visible={modalVisible}
              animationType="fade"
              transparent={true}
              onRequestClose={hideModal}
          >
              <View style={GlobalStyles.modalContainer}>
                  <View style={GlobalStyles.modalContent}>
                      {selectedDay && (
                          <Text style={styles.modalTitle}>{moment(selectedDay.Date).format("DD/MM/YYYY")}</Text>
                      )}
                      <Divider/>
                      {selectedDay && <NutritionInfo nutritionData={{
                          kcal: selectedDay.CaloriesTotal,
                          prot: selectedDay.ProtTotal,
                          prot_percentage: calculateCarbProtPercentage(selectedDay.ProtTotal, selectedDay.CaloriesTotal),
                          carb: selectedDay.CarbTotal,
                          carb_percentage: calculateCarbProtPercentage(selectedDay.CarbTotal, selectedDay.CaloriesTotal),
                          fat: selectedDay.FatTotal,
                          fat_percentage: calculateFatPercentage(selectedDay.FatTotal, selectedDay.CaloriesTotal),
                      }} />}
                      <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                        <Text onPress={hideModal} style={{}}>Fechar</Text>
                        <Text onPress={handleDetails} style={{}}>Ver Detalhes</Text>
                      </View>
                  </View>
              </View>
          </Modal>
      </View>
    );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#ffffff",
    borderRadius: 10,
    padding: 16,
    marginBottom: 16,
    marginTop: 8,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5, // Sombra para Android
  },
  listItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 8,
  },
  weightText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
  },
  dateText: {
    fontSize: 14,
    color: "#666",
  },
  divider: {
    marginVertical: 8,
  },
  modalTitle: {
      fontSize: 22,
      fontWeight: 'bold',
      marginBottom: 15,
      textAlign: 'center',
      color: Colors.primary,
  },
});