import { PieChart } from "react-native-gifted-charts";
import { Text } from 'react-native';
import { Colors } from "@/styles/Colors";

interface MacrosPieChartProps {
    protein: number;
    carb: number;
    fat: number;
    calories: number
}

const MacrosPieChart: React.FC<MacrosPieChartProps> = ({ protein, carb, fat, calories }) => {
    const pieData = [
        {value: protein, color: Colors.primary},
        {value: carb, color: Colors.secondary},
        {value: fat, color: Colors.third}
    ];
    return(
        <PieChart
            donut
            innerRadius={30}
            radius={40}
            data={pieData}
            centerLabelComponent={() => {
            return <Text style={{fontSize: 18, fontWeight: 'bold'}}>{calories.toFixed(0)}cal</Text>;
            }}
        />
    );
}

export default MacrosPieChart;