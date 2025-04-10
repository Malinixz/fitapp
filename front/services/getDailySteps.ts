import { Pedometer } from "expo-sensors";

// RETORNA A QUANTIDADE DE PASSOS TOTAL DO DIA CORRENTE
async function getDailySteps() {
  try {
    const isAvailable = await Pedometer.isAvailableAsync();

    if (isAvailable) {
      const end = new Date();
      const start = new Date();
      start.setHours(0, 0, 0, 0);

      const pastStepCountResult = await Pedometer.getStepCountAsync(start, end);
      if (pastStepCountResult) return pastStepCountResult.steps;
    }
    return 0; // Retorna 0 se o pedômetro não estiver disponível ou não houver passos
  } catch (error) {
    console.error('Erro ao acessar o pedômetro:', error);
    return 0; // Retorna 0 em caso de erro
  }
}