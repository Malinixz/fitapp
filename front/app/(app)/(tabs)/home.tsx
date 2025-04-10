import React, { useContext, useEffect, useState } from 'react';
 import { SafeAreaView, ScrollView, StyleSheet, View, Text, Modal, TouchableOpacity } from 'react-native';
 import CalorieProgress from '@/components/home/CalorieProgressChart';
 import ProgressBar from '@/components/home/ProgressBar';
 import { HomeAppbar } from '@/components/Appbar';
 import { DayContext } from '@/contexts/DayContext';
 import MealListElement from '@/components/home/MealListElement';
 import DateSelector from '@/components/home/DateSelector';
 import NutritionInfo from '@/components/NutritionInfo';
 import { calculateCarbProtPercentage, calculateFatPercentage } from '@/utils/NutritionCalculator';
 import { Meal } from '@/types/meal.types';
import { Colors } from '@/styles/Colors';
import { useRouter } from 'expo-router';

 const HomeScreen = () => {
    const { dayData, loadDayDataAPI } = useContext(DayContext);
    const router = useRouter()
    const progress = (dayData.CaloriesTotal / dayData.CaloriesGoal) * 100;
    const handleDateChange = (date: Date) => {
     loadDayDataAPI(date);
    };
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedMeal, setSelectedMeal] = useState<Meal | null>(null);
    const showModal = (meal: Meal) => {
     setSelectedMeal(meal);
     setModalVisible(true);
    };
    const hideModal = () => setModalVisible(false);
    const isDayDataEmpty = dayData.ID === 0;

    useEffect(() => {  // Se não tiver informações, busca do dia atual
     if (isDayDataEmpty) {
      loadDayDataAPI(new Date());
     }
    }, [isDayDataEmpty, loadDayDataAPI]);

    return (
    <SafeAreaView style={styles.container}>
        <HomeAppbar title="FITAPP" />
            <ScrollView style={styles.content}>
                <View style={styles.dailyProgress}>
                    <DateSelector date={dayData.Date} onDateChange={handleDateChange} />
                    <CalorieProgress
                     progress={progress}
                     text={`${dayData.CaloriesTotal}/${dayData.CaloriesGoal}kcal`}
                    />
                    <View style={styles.macronutrientsContainer}>
                        <ProgressBar label="Carboidrato" consumed={dayData.CarbTotal} goal={dayData.CarbGoal} color={Colors.secondary} icon="barley" sufix='g' decimalPlaces={1} />
                        <ProgressBar label="Proteína" consumed={dayData.ProtTotal} goal={dayData.ProtGoal} color={Colors.primary} icon="food-steak" sufix='g' decimalPlaces={1}/>
                        <ProgressBar label="Gordura" consumed={dayData.FatTotal} goal={dayData.FatGoal} color={Colors.third} icon="egg-fried" sufix='g' decimalPlaces={1}/>
                    </View>
                </View>
                <TouchableOpacity style={styles.dailyProgress} onPress={() => router.push({pathname: '/progress', params:{chart : 'Passos'}})}>
                    <Text style={styles.sectionTitle}>Caminhada</Text>
                    <ProgressBar label="Passos" consumed={dayData.Steps} goal={dayData.StepsGoal} color="green" icon="shoe-sneaker"/>
                </TouchableOpacity>
                <View style={styles.dailyProgress}>
                    <Text style={styles.sectionTitle}>Refeições</Text>
                    {dayData.Meals && dayData.Meals.map((meal: Meal) => (
                        <MealListElement key={meal.ID} meal={meal} showModal={() => showModal(meal)} />
                    ))}
                </View>
        </ScrollView>
        <Modal
            visible={modalVisible}
            animationType="fade"
            transparent={true}
            onRequestClose={hideModal}
        >
            <View style={styles.modalContainer}>
                <View style={styles.modalContent}>
                    {selectedMeal && <NutritionInfo nutritionData={{
                     kcal: selectedMeal.Calories,
                     prot: selectedMeal.Prot,
                     prot_percentage: calculateCarbProtPercentage(selectedMeal.Prot, selectedMeal.Calories),
                     carb: selectedMeal.Carb,
                     carb_percentage: calculateCarbProtPercentage(selectedMeal.Carb, selectedMeal.Calories),
                     fat: selectedMeal.Fat,
                     fat_percentage: calculateFatPercentage(selectedMeal.Fat, selectedMeal.Calories),
                    }} />}
                 <Text onPress={hideModal} style={{}}>Fechar</Text>
                </View>
            </View>
        </Modal>
    </SafeAreaView>
    );
 };

 const styles = StyleSheet.create({
  container: {
   flex: 1,
   backgroundColor: '#fff',
  },
  content: {
   flex: 1,
   marginLeft: 10,
   marginRight: 10,
  },
  dailyProgress: {
   backgroundColor: '#f5f5f5',
   borderRadius: 8,
   padding: 16,
   marginLeft: 10,
   marginRight: 10,
   marginBottom: 4,
   marginTop: 8,
   shadowOffset: {
    width: 0,
    height: 2,
   },
   shadowOpacity: 0.25, // Opacidade da sombra
   shadowRadius: 4,
   elevation: 5, // Para sombra no Android
  },
  modalContent: {
   backgroundColor: "white",
   borderRadius: 10,
   width: "90%",
   padding: 20,
  },
  modalContainer: {
   flex: 1,
   justifyContent: "center",
   alignItems: "center",
   backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  title: {
   fontSize: 24,
   fontWeight: 'bold',
   marginBottom: 20,
  },
  macronutrientsContainer: {
   marginTop: 30,
  },
  sectionTitle: {
   fontSize: 20,
   fontWeight: 'bold',
   marginBottom: 10,
  },
 });

 export default HomeScreen;