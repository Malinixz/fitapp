import { Pedometer } from 'expo-sensors';
import { useContext, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { dayService } from '@/services/dayServices';
import { DayContext } from '@/contexts/DayContext'; // Importe o contexto para ter acesso a ele

export default function useStepSync() {
  const { updateDay } = useContext(DayContext);

  useEffect(() => {
    const interval = setInterval(async () => {
        const end = new Date();
        const start = new Date();
        start.setHours(0, 0, 0, 0);

        // Pega os passos do dia corrente
        const result = await Pedometer.getStepCountAsync(start, end);
        const todaySteps = result?.steps || 0;

        // Pega o último valor de passos enviados e a data do envio
        const lastSentSteps = parseInt(await AsyncStorage.getItem('lastSteps') || '0');
        const lastSentDateString = await AsyncStorage.getItem('lastSentDate');
        const lastSentDate = lastSentDateString ? lastSentDateString : null;
        const todayDate = (new Date()).toLocaleDateString('en-CA');;

        // Verifica se é um novo dia ou se os passos de hoje são maiores que os últimos enviados
        const isNewDay = lastSentDate && todayDate !== lastSentDate;
        const shouldSendSteps = todaySteps > lastSentSteps;
        if (isNewDay || shouldSendSteps) {
            // Envia ao back-end
            try {
              const response = await dayService.sendSteps(todayDate, todaySteps)
              if(response.data.sucesso === 1) {
                await AsyncStorage.setItem('lastSteps', todaySteps.toString());
                await AsyncStorage.setItem('lastSentDate', todayDate);
                updateDay('Steps', todaySteps)
              }
            } catch (error) {
              console.error('Erro ao enviar passos:', error);
            }
        }
    }, 1000 * 60 * 0.25); // a cada 15 segundos

    return () => clearInterval(interval);
  }, []);
}