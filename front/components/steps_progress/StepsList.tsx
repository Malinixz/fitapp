import React from "react";
import { View, StyleSheet, Text } from "react-native";
import { Divider } from "react-native-paper";
import moment from "moment";
import { Day } from "@/types/day.types";

interface StepsProps {
    stepsData: Day[];
}

export default function StepsList({ stepsData }: StepsProps) {
    return (
        <View style={styles.container}>
            {stepsData.length > 0 && (
                <View>
                    {stepsData.map((day: Day, index) => (
                        <View key={index}>
                            <View style={styles.listItem}>
                                <Text style={styles.stepsText}>{day.Steps} Passos</Text>
                                <Text style={styles.dateText}>{moment(day.Date).format("DD/MM/YYYY")}</Text>
                            </View>
                            {index < stepsData.length - 1 && <Divider style={styles.divider} />}
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
        marginTop: 8,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    listItem: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingVertical: 10,
        paddingHorizontal: 8,
    },
    stepsText: {
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
    modalText: {
        fontSize: 18,
        fontWeight: "bold",
        textAlign: "center",
        marginBottom: 20,
    },
    closeText: {
        fontSize: 16,
        color: "red",
    },
    detailsText: {
        fontSize: 16,
        color: "blue",
    },
});