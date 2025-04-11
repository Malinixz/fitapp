import StepSyncronizer from '@/components/StepSyncronizer';
import DayProvider from '@/contexts/DayContext';
import UserProvider from '@/contexts/UserContext';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Stack } from 'expo-router';

export default function Layout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <UserProvider>
          <DayProvider>
              <StepSyncronizer/>
              <Stack screenOptions={{headerShown: false}}/>
          </DayProvider>
      </UserProvider>
    </GestureHandlerRootView>
  );
}