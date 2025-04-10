import { MaterialCommunityIcons } from '@expo/vector-icons';
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface ProgressBarProps {
    label: string;
    consumed: number;
    goal: number;
    color: string;
    icon: string;
    sufix?: string;
    decimalPlaces?: number;
}

const ProgressBar = ({ label, consumed, goal, color, icon, sufix = '', decimalPlaces = 0 } : ProgressBarProps) => {
    const progress = (consumed / goal) * 100;
    const progressColor = Number(consumed) > Number(goal) ? 'red' : color;
    
    return (
        <View style={styles.container}>
            <Text style={styles.label}>
                <Text style={{fontWeight: 'bold'}}>{label}: {consumed.toFixed(decimalPlaces)}</Text>
                <Text style={{color:'#666', fontSize:12}}>/{goal.toFixed(decimalPlaces)}{sufix}</Text>
            </Text>
            <View style={styles.progressContainer}>
                <View style={styles.progressBar}>
                    <View
                        style={[
                            styles.progressFill,
                            { width: `${progress}%`, backgroundColor: progressColor },
                        ]}
                    />
                </View>
                <MaterialCommunityIcons name={icon} size={20} color={progressColor} />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginBottom: 10,
    },
    label: {
        fontSize: 16,
        marginBottom: -3,
    },
    progressContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    progressBar: {
        height: 10,
        backgroundColor: '#e0e0e0',
        borderRadius: 5,
        overflow: 'hidden',
        flex: 1,
        marginRight: 4,
    },
    progressFill: {
        height: '100%',
        borderRadius: 5,
    },
});

export default ProgressBar;