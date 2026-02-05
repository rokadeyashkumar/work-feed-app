import { Text } from "react-native";
import { useEffect } from "react";
import { useRouter } from "expo-router";
import { useAuth } from "@clerk/clerk-expo";

export default function SsoCallback() {
  const { isSignedIn } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isSignedIn) {
      router.replace("/"); // or your home/dashboard route
    }
  }, [isSignedIn]);

  return <Text>Signing you in...</Text>;
}
