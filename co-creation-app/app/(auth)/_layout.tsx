import { Stack } from "expo-router";

export default function AuthLayout() {
  return (
    <Stack>
      {/* このフォルダ内の各画面はファイル名がそのままルート名となります */}
      <Stack.Screen 
        name="login" 
        options={{ headerShown: false }} 
      />
      <Stack.Screen 
        name="register" 
        options={{ headerShown: false }} 
      />
      <Stack.Screen 
        name="password-reset" 
        options={{ headerShown: false }} 
      />
    </Stack>
  );
}