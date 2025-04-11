// Componente NutritionInfo.tsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import MacrosPieChart from '@/components/MacrosPieChart_new';
import { Colors } from '@/styles/Colors';

interface NutritionInfoProps {
  nutritionData: {
    kcal: number;
    prot: number;
    prot_percentage: number;
    carb: number;
    carb_percentage: number;
    fat: number;
    fat_percentage: number;
  };
}

const NutritionInfo = ({ nutritionData }: NutritionInfoProps) => {
    
  return (
    <>
      <Text style={styles.subtitle}>Informações Nutricionais</Text>
      <View style={styles.macrosContainer}>
        <MacrosPieChart
          calories={nutritionData.kcal}
          protein={nutritionData.prot_percentage}
          carb={nutritionData.carb_percentage}
          fat={nutritionData.fat_percentage}
        />
        <View style={styles.nutritionContainer}>
          <View style={styles.nutritionRow}>
            <Text style={[styles.nutritionLabel, { color: Colors.secondary }]}>Carboidratos</Text>
            <Text style={[styles.nutritionValue, { color: Colors.secondary }]}>
              {nutritionData.carb.toFixed(1)}g ({nutritionData.carb_percentage.toFixed(0)}%)
            </Text>
          </View>
          <View style={styles.nutritionRow}>
            <Text style={[styles.nutritionLabel, { color: Colors.third }]}>Gorduras</Text>
            <Text style={[styles.nutritionValue, { color: Colors.third }]}>
              {nutritionData.fat.toFixed(1)}g ({nutritionData.fat_percentage.toFixed(0)}%)
            </Text>
          </View>
          <View style={styles.nutritionRow}>
            <Text style={[styles.nutritionLabel, { color: Colors.primary }]}>Proteínas</Text>
            <Text style={[styles.nutritionValue, { color: Colors.primary }]}>
              {nutritionData.prot.toFixed(1)}g ({nutritionData.prot_percentage.toFixed(0)}%)
            </Text>
          </View>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  subtitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 16,
    marginBottom: 12,
    textAlign:'center'
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
});

export default NutritionInfo;