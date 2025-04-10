import StepSyncronizer from '@/components/StepSyncronizer';
import DayProvider from '@/contexts/DayContext';
import UserProvider from '@/contexts/UserContext';
import { Stack } from 'expo-router';

export default function Layout() {
  return (
    <UserProvider>
        <DayProvider>
            <StepSyncronizer/>
            <Stack screenOptions={{headerShown: false}}/>
        </DayProvider>
    </UserProvider>
  );
}