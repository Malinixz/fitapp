import React from "react";
import { Dimensions, View, Text, StyleSheet } from "react-native";
import { LineChart } from "react-native-chart-kit";
import { Day } from "@/types/day.types";

interface CalIntakeChartProps {
  filteredUpdates : Day[]
}

export default function CalIntakeChart({ filteredUpdates } : CalIntakeChartProps) {
  const CaloriesGoal = filteredUpdates.map((d) => d.CaloriesGoal);
  const CaloriesTotal = filteredUpdates.map((d) => d.CaloriesTotal);

  return (
    <View>
      <LineChart
        data={{
          labels: [],
          datasets: [
            {
              data: CaloriesGoal,
              color: (opacity = 1) => `rgba(255, 0, 0, 0.5)`,
            },
            {
              data: CaloriesTotal,
              color: (opacity = 1) => `rgba(42, 116, 79, 0.5)`,
            },
          ],
        }}
        width={Dimensions.get("window").width - 40}
        height={220}
        yAxisInterval={1}
        yAxisSuffix="cal"
        chartConfig={{
          backgroundColor: "#f5f5f5",
          backgroundGradientFrom: "#f5f5f5",
          backgroundGradientTo: "#f5f5f5",
          decimalPlaces: 0,
          color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          propsForDots: {
            r: "4",
            strokeWidth: "0",
          },
          propsForLabels: {
            fontWeight: "bold",
          },
        }}
        bezier
        style={{
          borderRadius: 8,
          marginLeft: -18,
          marginTop: 8,
        }}
      />
      <View style={styles.legendContainer}>
        <View style={styles.legendItem}>
          <View style={[styles.legendColor, { backgroundColor: "rgba(255, 0, 0, 0.8)" }]} />
          <Text style={styles.legendText}>Meta de Calorias</Text>
        </View>
        <View style={styles.legendItem}>
          <View style={[styles.legendColor, { backgroundColor: "rgba(42, 116, 79, 0.8)" }]} />
          <Text style={styles.legendText}>Calorias Ingeridas</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  legendContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 10,
  },
  legendItem: {
    flexDirection: "row",
    alignItems: "center",
  },
  legendColor: {
    width: 20,
    height: 10,
    borderRadius: 5,
    marginRight: 5,
  },
  legendText: {
    fontSize: 12,
    fontWeight: 'bold'
  },
});