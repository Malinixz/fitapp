import React, { useState, useEffect, useContext } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Keyboard,
  TouchableWithoutFeedback,
  SafeAreaView,
  Alert,
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { BackAppbar } from '@/components/Appbar';
import { Dropdown } from 'react-native-element-dropdown';
import { Button, Divider, TextInput } from 'react-native-paper';
import { calculateCarbProtPercentage, calculateFatPercentage } from '@/utils/NutritionCalculator';
import NutritionInfo from '@/components/NutritionInfo';
import { DayContext } from '@/contexts/DayContext';

const FoodDetailsScreen = () => {
  const params = useLocalSearchParams();
  const meal_ID = params.meal_ID
  const router = useRouter();
  const { addFood } = useContext(DayContext)

  const food = {
    id: params.id,
    name: params.product_name,
    brand: params.brands,
    serving_size: params.serving_size,
    quantity: params.quantity,
    product_quantity: params.product_quantity,
    product_quantity_unit: params.product_quantity_unit,
    image_url: params.image_url,
    nutriments: JSON.parse(params.nutriments),
  };
  const [servingQuantity, setServingQuantity] = useState('1');
  const [selectedServing, setSelectedServing] = useState({  // PORÇÃO SELECIONADA
    label: '',
    value: {
      kcal: 0,
      prot: 0,
      prot_percentage: 0,
      carb: 0,
      carb_percentage: 0,
      fat: 0,
      fat_percentage: 0,
    },
  });
  const [multipliedValues, setMultipliedValues] = useState({  // DADOS DA PORÇÃO SELECIONADA E MULTIPLICADA
    kcal: 0,
    prot: 0,
    prot_percentage: 0,
    carb: 0,
    carb_percentage: 0,
    fat: 0,
    fat_percentage: 0,
  });

  // VERIFICA SE HÁ PORÇÃO PADRÃO
  const hasServingSize = food.serving_size !== undefined && food.serving_size !== null;
  // VERIFICA SE HÁ VALORES PARA PORÇÃO
  const hasServingNutriments =
    food.nutriments['energy-kcal_serving'] !== undefined &&
    food.nutriments.proteins_serving !== undefined &&
    food.nutriments.carbohydrates_serving !== undefined &&
    food.nutriments.fat_serving !== undefined;
  // VERIFICA SE HÁ VALORES PARA GRAMATURAA
  const has100gNutriments = 
    food.nutriments['energy-kcal_100g'] !== undefined &&
    food.nutriments.proteins_100g !== undefined &&
    food.nutriments.carbohydrates_100g !== undefined &&
    food.nutriments.fat_100g !== undefined;

  // SALVA OS DADOS DAS PORÇÕES RECEBIDOS DA API
  const servingData = [];
  if (hasServingSize && hasServingNutriments) {
    servingData.push({
      label: `Porção(${food.serving_size})`,
      value: {
        kcal: food.nutriments['energy-kcal_serving'],
        prot: food.nutriments.proteins_serving,
        prot_percentage: calculateCarbProtPercentage(food.nutriments.proteins_serving, food.nutriments['energy-kcal_serving']),
        carb: food.nutriments.carbohydrates_serving,
        carb_percentage: calculateCarbProtPercentage(food.nutriments.carbohydrates_serving, food.nutriments['energy-kcal_serving']),
        fat: food.nutriments.fat_serving,
        fat_percentage: calculateFatPercentage(food.nutriments.fat_serving, food.nutriments['energy-kcal_serving']),
      },
    });
  }
  if (has100gNutriments) {
    servingData.push({
      label: 'Quantidade(g)',
      value: {
        kcal: food.nutriments['energy-kcal_100g'],
        prot: food.nutriments.proteins_100g,
        prot_percentage: calculateCarbProtPercentage(food.nutriments.proteins_100g, food.nutriments['energy-kcal_100g']),
        carb: food.nutriments.carbohydrates_100g,
        carb_percentage: calculateCarbProtPercentage(food.nutriments.carbohydrates_100g, food.nutriments['energy-kcal_100g']),
        fat: food.nutriments.fat_100g,
        fat_percentage: calculateFatPercentage(food.nutriments.fat_100g, food.nutriments['energy-kcal_100g']),
      },
    });
  }

  // Função para multiplicar os valores com base na quantidade de porções
  const multiplyValues = () => {
    if (!selectedServing) return;
    
    const parsedQuantity = parseFloat(servingQuantity.replace(',','.')) || 1; // Garante que seja um número válido
    if (selectedServing.label === 'Quantidade(g)') {
      setMultipliedValues({
        kcal: Math.round((selectedServing.value.kcal / 100) * parsedQuantity),
        prot: (selectedServing.value.prot / 100) * parsedQuantity,
        prot_percentage: selectedServing.value.prot_percentage,
        carb: (selectedServing.value.carb / 100) * parsedQuantity,
        carb_percentage: selectedServing.value.carb_percentage,
        fat: (selectedServing.value.fat / 100) * parsedQuantity,
        fat_percentage: selectedServing.value.fat_percentage,
      });
    } else {
      // Multiplicação para porções
      setMultipliedValues({
        kcal: Math.round(selectedServing.value.kcal * parsedQuantity),
        prot: selectedServing.value.prot * parsedQuantity,
        prot_percentage: selectedServing.value.prot_percentage,
        carb: selectedServing.value.carb * parsedQuantity,
        carb_percentage: selectedServing.value.carb_percentage,
        fat: selectedServing.value.fat * parsedQuantity,
        fat_percentage: selectedServing.value.fat_percentage,
      });
    }
  };

  // Atualiza os valores multiplicados quando a quantidade de porções ou a porção selecionada muda
  useEffect(() => {
    multiplyValues();
  }, [servingQuantity, selectedServing]);
  
  const handleAddFood = async () => {
    const foodToAdd = {
        Name: food.name,
        ID_Food_API: food.id,
        Serving: selectedServing.label,
        Serving_Quantity: parseFloat(servingQuantity),
        Serving_Total: `${selectedServing.label} x ${servingQuantity}`,
        Calories: multipliedValues.kcal,
        Prot: multipliedValues.prot,
        Carb: multipliedValues.carb,
        Fat: multipliedValues.fat,
    };

    const success = await addFood(foodToAdd, meal_ID); // Chama a função addFood do contexto

    if (success) {
        Alert.alert('Alimento adicionado com sucesso.');
    } else {
        Alert.alert('Erro ao adicionar alimento.');
    }
    router.back();
};

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <SafeAreaView style={styles.container}>
        <BackAppbar title="Adicionar Alimento" onPress={() => router.back()} />

        <View style={styles.content}>
          <Text style={styles.title}>{food.name}</Text>
          <Text style={styles.brand}>{food.brand}</Text>
          <Divider />
          <Dropdown
            style={styles.dropdown}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            data={servingData}
            maxHeight={300}
            labelField="label"
            valueField="value"
            placeholder="    Escolha a Medida"
            value={selectedServing}
            onChange={(item) => {
              setSelectedServing(item); // Seta os dados da porção selecionada
            }}
          />

          <View style={styles.servingQuantityContainer}>
            {selectedServing.label === 'Quantidade(g)' ? 
              <Text style={styles.servingQuantityLabel}>Quantidade em Gramas:</Text>
            :
              <Text style={styles.servingQuantityLabel}>Quantidade de Porções:</Text>
            }
            <TextInput
              style={styles.servingQuantityInput}
              keyboardType="numeric"
              value={servingQuantity}
              onChangeText={(text) => setServingQuantity(text)}
              mode="outlined"
              dense
              theme={{ colors: { primary: '#4a148c' } }}
            />
          </View>

          <NutritionInfo nutritionData={multipliedValues} />

          <Divider style={styles.divider} />

          {food.image_url && (
            <Image
              source={{ uri: food.image_url }}
              style={styles.image}
              resizeMode="contain"
            />
          )}
          <Button
              mode="contained"
              style={{width:'70%', marginLeft: 50}}
              onPress={() => handleAddFood()}
          >
              Adicionar à Refeição
          </Button>
        </View>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  content: {
    padding: 16,
  },
  image: {
    width: '100%',
    height: 200,
    marginBottom: 16,
    borderRadius: 8,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  brand: {
    fontSize: 16,
    color: '#666',
    marginBottom: 16,
  },
  subtitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 16,
    marginBottom: 16,
  },
  macrosContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  nutritionContainer: {
    marginLeft: 16,
    flex: 1,
  },
  nutritionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  nutritionLabel: {
    fontSize: 16,
    color: '#333',
    fontWeight: 'bold',
  },
  nutritionValue: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  dropdown: {
    marginVertical: 16,
    height: 50,
    borderColor: '#4a148c',
    borderWidth: 2,
    borderRadius: 8
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  servingQuantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  servingQuantityLabel: {
    fontSize: 16,
    marginRight: 8,
  },
  servingQuantityInput: {
    width: 60,
    backgroundColor: '#fff',
    marginLeft: 8,
  },
  divider: {
    marginVertical: 16,
  },
});

export default FoodDetailsScreen;