import { useRouter } from 'expo-router';
import React, { useContext, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, TextInput, Alert } from 'react-native';
import { Divider, IconButton } from 'react-native-paper';
import FoodItem from '@/components/FoodItem';
import { Food } from '@/types/food.types';
import { Meal } from '@/types/meal.types';
import GlobalStyles from '@/styles/GlobalStyles'
import { DayContext } from '@/contexts/DayContext';
import { Colors } from '@/styles/Colors';

interface MealListElementProps {
  meal: Meal;
  showModal: (meal: Meal) => void;
}

const MealListElement = ({ meal, showModal }: MealListElementProps) => {
  const router = useRouter();
  const [foodModalVisible, setFoodModalVisible] = useState(false);
  const [selectedFood, setSelectedFood] = useState<Food | null>(null);
  const [quantity, setQuantity] = useState('');
  const { removeFood, updateFood } = useContext(DayContext);

  const showFoodModal = (food: Food) => {
    setSelectedFood(food);
    setQuantity(String(food.Serving_Quantity));
    setFoodModalVisible(true);
  };

  const hideFoodModal = () => setFoodModalVisible(false);

  const handleInputChange = (text: string) => {
    setQuantity(text);
  };

  const handleUpdate = async () => {
    if (selectedFood) {
      const newQuantity = Number(quantity)
      const success = await updateFood(selectedFood.ID, newQuantity)
      if(success) {
        Alert.alert("Quantidade alterada com sucesso.")
      }
      hideFoodModal();
    }
  };

  const handleRemove = () => {
    if (selectedFood) {
      Alert.alert("Remover Alimento", "Tem certeza que deseja remover este alimento da refeição?",[
          {
            text: "Cancelar",
            style: "cancel"
          },
          {
            text: "Remover",
            onPress: async () => {
              const success = await removeFood(selectedFood.ID);
              if(success) {
                Alert.alert("Alimento removido com sucesso.")
              }
              hideFoodModal();
            }
          }
        ]
      );
    }
  };

  return (
    <View style={styles.container}>
      {/* CABEÇALHO DA REFEIÇÃO */}
      <TouchableOpacity onPress={showModal}>
        <View style={styles.mealTitle}>
          <View style={styles.mealNameContainer}>
            <Text style={styles.mealName}>{meal.Name}</Text>
            <Text style={styles.mealCalories}>{meal.Calories} kcal</Text>
          </View>
          <IconButton
            icon={'plus-circle-outline'}
            iconColor={Colors.primary}
            style={styles.addButton}
            onPress={() => router.push({
              pathname: '/foodsearch',
              params: {
                meal_ID: meal.ID,
                meal_Name: meal.Name
              }
            })}
          />
        </View>
      </TouchableOpacity>

      <Divider />

      {/* LISTA DE ALIMENTOS */}
      {meal.Meal_Foods && meal.Meal_Foods.length > 0 && (
        <View style={{ marginTop: 8 }}>
          {meal.Meal_Foods.map((food: Food) => (
            <TouchableOpacity key={food.ID} onPress={() => { showFoodModal(food) }}>
              <FoodItem food={food} />
            </TouchableOpacity>
          ))}
        </View>
      )}

      {/*Modal de remoção ou alteração de Alimentos*/}
      <Modal
        visible={foodModalVisible}
        animationType="fade"
        transparent={true}
        onRequestClose={hideFoodModal}
      >
        <View style={GlobalStyles.modalContainer}>
          <View style={GlobalStyles.modalContent}>
            {selectedFood && <View>
              <Text style={GlobalStyles.modalTitle}>{selectedFood.Name}</Text>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Text style={{ marginRight: 5 }}>{selectedFood.Serving}</Text>
                <TextInput
                  style={styles.input}
                  value={quantity}
                  onChangeText={handleInputChange}
                  keyboardType="decimal-pad"
                />
              </View>

              <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 }}>
                <TouchableOpacity onPress={handleRemove} style={{ backgroundColor: 'red', padding: 10, borderRadius: 5 }}>
                  <Text style={{ color: 'white' }}>Remover</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={handleUpdate} style={{ backgroundColor: Colors.primary, padding: 10, borderRadius: 5 }}>
                  <Text style={{ color: 'white' }}>Atualizar</Text>
                </TouchableOpacity>
              </View>
            </View>
            }
            <Text onPress={hideFoodModal} style={{ marginTop: 10 }}>Fechar</Text>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
  },
  mealTitle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  mealNameContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flexShrink: 1,
  },
  mealName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginRight: 8,
  },
  mealCalories: {
    fontSize: 16,
    fontWeight: 'bold',
    marginRight: 8,
    color: Colors.primary,
  },
  addButton: {
    margin: 0,
  },
  input: {
    height: 40,
    borderColor: Colors.primary,
    borderWidth: 1.5,
    borderRadius: 8,
    paddingHorizontal: 10,
    flex: 1,
  },
});

export default MealListElement;