import useStepSync from '@/hooks/useStepSync';

function StepSyncronizer() {
  useStepSync(); // Chama o hook para contagem e sincronização de passos

  return null; // Este componente não renderiza nada visualmente
}

export default StepSyncronizer;