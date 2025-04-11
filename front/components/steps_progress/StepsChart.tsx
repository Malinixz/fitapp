import { Day } from "@/types/day.types";
import moment from "moment";
import React from "react";
import { Dimensions, View, Text, StyleSheet } from "react-native";
import { BarChart } from "react-native-chart-kit";
import { Divider } from "react-native-paper";

interface StepsChartProps {
    filteredUpdates : Day[]
}

export default function StepsChart({ filteredUpdates } : StepsChartProps) {
  const steps = filteredUpdates.map((d) => d.Steps);
  
  // Cálculo das estatísticas
  const calculateStats = () => {
    if (steps.length === 0) return { average: 0, best: 0, total: 0, bestDate: "N/A" };
    
    const total = steps.reduce((sum, current) => sum + current, 0);
    const average = Math.round(total / steps.length);
    const bestSteps = Math.max(...steps);
    const bestIndex = steps.indexOf(bestSteps);
    
    // Formatação da data para o melhor dia
    let bestDate = "N/A";
    if (bestIndex >= 0 && filteredUpdates[bestIndex]) {
      bestDate = moment(filteredUpdates[bestIndex].Date).format('DD/MM')
    }
    
    return { average, bestSteps, total, bestDate };
  };

  const stats = calculateStats();

  return (
    <View>
      <BarChart
         data={{
           labels: [],
           datasets: [
             {
               data: steps,
             }
           ],    
         }}
         width={Dimensions.get("window").width - 50}
         height={220}
         yAxisLabel=""
         yAxisSuffix=""
         fromZero
         yAxisInterval={1}
         chartConfig={{
           backgroundColor: "#f5f5f5",
           backgroundGradientFrom: "#f5f5f5",
           backgroundGradientTo: "#f5f5f5",
           decimalPlaces: 0,
           color: (opacity = 1) => `green`,
           labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
           barPercentage: 0.5
         }}
         style={{
           borderRadius: 8,
           marginTop: 8,
           marginLeft:-16
         }}
      />

      <Divider style={{marginTop:-10}}/>

      <View style={styles.dataContainer}>
        <View style={styles.dataItem}>
          <Text style={styles.dataLabel}>MÉDIA</Text>
          <Text style={styles.dataValue}>{stats.average}</Text>
        </View>
        <View style={styles.dataItem}>
          <Text style={styles.dataLabel}>MELHOR ({stats.bestDate})</Text>
          <Text style={styles.dataValue}>{stats.bestSteps}</Text>
        </View>
        <View style={styles.dataItem}>
          <Text style={styles.dataLabel}>TOTAL</Text>
          <Text style={styles.dataValue}>{stats.total}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
    dataContainer: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      marginTop: 16,
    },
    dataItem: {
      alignItems: 'center',
    },
    dataLabel: {
      fontSize: 16,
      fontWeight: 'bold',
      color: '#333',
    },
    dataValue: {
      fontSize: 14,
      color: '#666',
      marginTop: 4,
    },
})