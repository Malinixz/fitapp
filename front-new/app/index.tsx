  import { ClerkProvider } from "@clerk/clerk-expo";
  import Main from "../src/Routes"
  import UserProvider from "@/contexts/UserContext";

  export default function Index() {
    return (
      <ClerkProvider publishableKey={process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY}>
        <UserProvider>
          <Main/>
        </UserProvider>
      </ClerkProvider>
    );
  }
