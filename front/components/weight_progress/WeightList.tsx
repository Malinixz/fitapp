import React from "react";
import { View, StyleSheet, Text } from "react-native";
import { Divider } from "react-native-paper";
import moment from "moment";
import { WeightUpdate } from "@/types/weight.types";

interface WeightListProps {
  updates : WeightUpdate[]
}

export default function WeightList({ updates } : WeightListProps) {
  return (
    <View style={styles.container}>
      {updates.length > 0 && (
        <View>
          {updates.map((update, index) => (
            <View key={index}>
              <View style={styles.listItem}>
                <Text style={styles.weightText}>
                  {update.Weight !== undefined && update.Weight !== null
                    ? update.Weight.toFixed(1) + " kg"
                    : "N/A"}
                </Text>
                <Text style={styles.dateText}>
                  {moment(update.Date).format("DD/MM/YYYY")}
                </Text>
              </View>
              {index < updates.length - 1 && <Divider style={styles.divider} />}
            </View>
          ))}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#ffffff",
    borderRadius: 10,
    padding: 16,
    marginBottom: 16,
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
});