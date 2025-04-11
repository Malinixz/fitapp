import React, { useState } from "react";
import { Dimensions, View, Text, StyleSheet } from "react-native";
import { LineChart } from "react-native-chart-kit";
import { Divider } from "react-native-paper";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { WeightUpdate } from "@/types/weight.types";
import moment from "moment";

interface WeightChartProps {
  filteredUpdates : WeightUpdate[]
}

export default function WeightChart({ filteredUpdates } : WeightChartProps) {
  const [selectedWeight, setSelectedWeight] = useState<WeightUpdate>()
  const weights = filteredUpdates.map((d) => d.Weight)
  const initialWeight = weights[0] || 0
  const currentWeight = weights.at(-1) || 0

  const calculateWeightChange = () => {
    if (weights.length < 2) {
      return ["0%",null]
    }
    const change = currentWeight - initialWeight
    const percentageChange = (change / initialWeight) * 100

    let iconName = null;
    
    if (percentageChange > 0) {
      iconName = 'trending-up';
    } 
    if (percentageChange < 0) {
      iconName = 'trending-down';
    }

    return [`(${percentageChange.toFixed(1)}%)`, iconName]
  }

  return (
    <View>
      <LineChart
        data={{
          labels: [],
          datasets: [
            {
              data: weights,
              color: (opacity = 1) => `rgba(74, 20, 140, ${opacity})`,
            },
          ],
        }}
        width={Dimensions.get("window").width - 40}
        height={220}
        yAxisSuffix="kg"
        yAxisInterval={1}
        chartConfig={{
          backgroundColor: "#f5f5f5",
          backgroundGradientFrom: "#f5f5f5",
          backgroundGradientTo: "#f5f5f5",
          decimalPlaces: 1,
          color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          propsForDots: {
            r: "4",
            strokeWidth: "2",
            stroke: "#ccc",
          },
          propsForLabels: {
            fontWeight: "bold",
          },
        }}
        bezier
        style={{
          borderRadius: 8,
          marginLeft: -16,
          marginTop: 8,
        }}
        onDataPointClick={(dataPoint) => {
          setSelectedWeight({ Weight : dataPoint.value, Date : filteredUpdates[dataPoint.index].Date});
        }}
      />

      <Divider style={{marginTop:-10}}/>

      <View style={styles.dataContainer}>
        <View style={styles.dataItem}>
          <Text style={styles.dataLabel}>INÍCIO</Text>
          <Text style={styles.dataValue}>{initialWeight}kg</Text>
        </View>
        <View style={styles.dataItem}>
          <Text style={styles.dataLabel}>ATUAL</Text>
          <Text style={styles.dataValue}>{currentWeight}kg</Text>
        </View>
        <View style={styles.dataItem}>
          <Text style={styles.dataLabel}>MUDANÇA(%)</Text>
          <View style={{flexDirection:'row'}}>
            {calculateWeightChange()[1] && (
              <MaterialCommunityIcons
                name={calculateWeightChange()[1]}
                size={16}
                color={calculateWeightChange()[1] === 'trending-up' ? 'green' : 'red'}
                style={{marginTop:2, marginRight:2}}
              />
            )}
            <Text style={styles.dataValue}>{calculateWeightChange()[0]}</Text>
          </View>
        </View>
        {selectedWeight && (
          <View style={styles.dataItem}>
            <Text style={styles.dataLabel}>SELECIONADO</Text>
            <Text style={styles.dataValue}>{selectedWeight.Weight}kg</Text>
            <Text style={styles.dataValue}>{(moment(selectedWeight.Date).format('DD/MM/YYYY'))}</Text>
          </View>
        )}
      </View>
    </View>
  )
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