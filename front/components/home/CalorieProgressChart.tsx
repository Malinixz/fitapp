import { Colors } from '@/styles/Colors';
import React from 'react';
import { View, StyleSheet } from 'react-native';
import Svg, { Circle, G, Text as SvgText } from 'react-native-svg';

interface CircularProgressProps {
    progress: number; // Progresso (0 a 100)
    text: string; // Texto para exibir no centro
}

const CircularProgress: React.FC<CircularProgressProps> = ({ progress, text }) => {
    // Valores fixos
    const size = 200; // Tamanho do círculo
    const strokeWidth = 10; // Espessura da linha
    const color = Number(progress) > 100 ? 'red' : Colors.primary; // Cor da linha de progresso
    const backgroundColor = Number(progress) > 100 ? 'red' : '#e0e0e0'; // Cor de fundo do círculo

    const radius = (size - strokeWidth) / 2;
    const circumference = 2 * Math.PI * radius;
    const strokeDashoffset = circumference - (progress / 100) * circumference;

    return (
        <View style={styles.container}>
            <Svg width={size} height={size}>
                {/* Fundo do círculo */}
                <Circle
                    stroke={backgroundColor}
                    strokeWidth={strokeWidth}
                    fill="transparent"
                    r={radius}
                    cx={size / 2}
                    cy={size / 2}
                />
                {/* Linha de progresso */}
                <G rotation="-90" origin={`${size / 2}, ${size / 2}`}>
                    <Circle
                        stroke={color}
                        strokeWidth={strokeWidth}
                        fill="transparent"
                        r={radius}
                        cx={size / 2}
                        cy={size / 2}
                        strokeDasharray={circumference}
                        strokeDashoffset={strokeDashoffset}
                        strokeLinecap="round" // Arredonda as extremidades da linha
                    />
                </G>
                {/* Texto no centro */}
                {text && (
                    <SvgText
                        x={size / 2}
                        y={size / 2 + 5} // Ajuste vertical para centralizar o texto
                        textAnchor="middle"
                        fontSize={21}
                        fill={color}
                        fontWeight="bold"
                    >
                        {text}
                    </SvgText>
                )}
            </Svg>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default CircularProgress;