import { MaterialIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import { authTexts } from "@/constants/texts/auth";

import useAuth from "@/hooks/useAuth";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");

  const { handleResetPassword } = useAuth();

  const handleSubmit = async () => {
    if (!email) {
      return console.error("Email não informado ou invalido");
    }

    const result = await handleResetPassword(email);

    if (result.ok) {
      setEmail("");
      router.back();
    }
  };

  return (
    <>
      <StatusBar style='dark' />
      <KeyboardAvoidingView
        className='flex-1 bg-white'
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 0}
      >
        <ScrollView
          className='flex-grow'
          contentContainerStyle={{ alignItems: "center", justifyContent: "center", padding: 20 }}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps='handled'
        >
          <MaterialIcons name='lock-reset' size={100} color='#4A90E2' />

          <Text className='text-2xl font-bold mt-5 mb-2.5'>{authTexts.forgotPassword.title}</Text>
          <Text className='text-base text-gray-600 text-center mb-8'>
            {authTexts.forgotPassword.description}
          </Text>

          <View className='w-full mb-5'>
            <TextInput
              className='w-full h-[50px] border border-gray-200 rounded-lg px-4 text-base'
              placeholder={authTexts.forgotPassword.emailPlaceholder}
              value={email}
              onChangeText={setEmail}
              keyboardType='email-address'
              autoCapitalize='none'
            />
          </View>

          <TouchableOpacity
            className='w-full h-[50px] bg-[#4A90E2] rounded-lg items-center justify-center'
            onPress={handleSubmit}
          >
            <Text className='text-white text-base font-bold'>
              {authTexts.forgotPassword.recoverButton}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity className='mt-5' onPress={() => router.back()}>
            <Text className='text-[#4A90E2] text-base'>
              {authTexts.forgotPassword.backToLoginButton}
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </>
  );
}
