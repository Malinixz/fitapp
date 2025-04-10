// components/MacronutrientPieChart.tsx
import { Colors } from '@/styles/Colors';
import React from 'react';
import { Dimensions } from 'react-native';
import { PieChart } from 'react-native-chart-kit';

interface MacrosPieChartProps {
    protGoal: number;
    carbGoal: number;
    fatGoal: number;
}

const MacrosPieChart: React.FC<MacrosPieChartProps> = ({ protGoal, carbGoal, fatGoal }) => {
    const screenWidth = Dimensions.get('window').width;

    const macronutrientsData = [
        {
            name: 'g Proteína',
            population: protGoal,
            color: Colors.primary,
            legendFontColor: '#7F7F7F',
            legendFontSize: 15,
        },
        {
            name: 'g Carboidrato',
            population: carbGoal,
            color: Colors.secondary,
            legendFontColor: '#7F7F7F',
            legendFontSize: 15,
        },
        {
            name: 'g Gordura',
            population: fatGoal,
            color: Colors.third,
            legendFontColor: '#7F7F7F',
            legendFontSize: 15,
        },
    ];

    return (
        <PieChart
            data={macronutrientsData}
            width={screenWidth - 30}
            height={220}
            chartConfig={{
                backgroundColor: '#1cc910',
                backgroundGradientFrom: '#eff3ff',
                backgroundGradientTo: '#efefef',
                color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
            }}
            accessor="population"
            backgroundColor="transparent"
            paddingLeft="0"
            absolute
        />
    );
};

export default MacrosPieChart;