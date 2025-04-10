import { ClerkProvider } from '@clerk/clerk-expo';
import { Slot } from 'expo-router';

const PUBLIC_CLERK_PUBLISHABLE_KEY = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY as string

export default function Layout() {
  return (
    <ClerkProvider publishableKey={PUBLIC_CLERK_PUBLISHABLE_KEY}>
      <Slot/>
    </ClerkProvider>
  );
}