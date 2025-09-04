import useAuth from "@/hooks/useAuth";
import { AppRoutes } from "@/routes/appRoutes";

import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";

import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";

import { authTexts } from "@/constants/texts/auth";
import { showLoginError, showLoginSuccess } from "@/utils/userFeedback";
import { useState } from "react";
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { signInSchema } from "./signInSchema";
import type { ISignInData } from "./types";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const {
    title,
    description,
    emailPlaceholder,
    passwordPlaceholder,
    forgotPassword,
    loginButton,
    noAccountText,
    createAccountButton,
  } = authTexts.signIn;

  const { handleSignIn } = useAuth();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ISignInData>({
    resolver: zodResolver(signInSchema),

    defaultValues: {
      email,
      password,
    },
  });

  const onSubmit = async (data: ISignInData) => {
    const { email, password } = data;
    const response = await handleSignIn(email, password);

    if (response.ok) {
      showLoginSuccess();
    } else {
      showLoginError();
      return;
    }

    router.replace(AppRoutes.Home);
  };

  const handleGoToSignUp = () => {
    router.navigate(AppRoutes.SignUp);
  };

  const handleGoToForgotPassword = () => {
    router.navigate(AppRoutes.ForgotPassword);
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
          contentContainerStyle={{ justifyContent: "center", paddingHorizontal: 32 }}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps='handled'
        >
          <View className='items-center mb-8'>
            <Image
              source={require("../../../../assets/logos/nativeNewsLogo.png")}
              className='w-[200px] h-[200px]'
              resizeMode='contain'
            />
          </View>
          <View className='w-full'>
            <Text className='text-[28px] font-bold text-[#333] mb-2.5 text-center'>{title}</Text>
            <Text className='text-base text-[#666] mb-8 text-center'>{description}</Text>
            <Controller
              control={control}
              name='email'
              render={({ field: { onChange, onBlur, value } }) => (
                <>
                  <TextInput
                    className='bg-[#f5f5f5] rounded-lg p-4 mb-4 text-base'
                    placeholder={emailPlaceholder}
                    value={value}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    keyboardType='email-address'
                    autoCapitalize='none'
                  />
                  {errors.email && (
                    <Text className='text-red-500 text-sm mb-2'>{errors.email.message}</Text>
                  )}
                </>
              )}
            />
            <View className='flex-row items-center bg-[#f5f5f5] rounded-lg mb-4'>
              <Controller
                control={control}
                name='password'
                render={({ field: { onChange, value } }) => (
                  <>
                    <TextInput
                      className='flex-1 p-4 text-base'
                      placeholder={passwordPlaceholder}
                      value={value}
                      onChangeText={onChange}
                      secureTextEntry={!showPassword}
                    />
                    {errors.password && (
                      <Text className='text-red-500 text-sm absolute -bottom-6 left-0'>
                        {errors.password.message}
                      </Text>
                    )}
                  </>
                )}
              />

              <TouchableOpacity className='p-4' onPress={() => setShowPassword(!showPassword)}>
                <Ionicons name={showPassword ? "eye-off" : "eye"} size={24} color='#666' />
              </TouchableOpacity>
            </View>

            <TouchableOpacity className='self-end mb-5 mt-4' onPress={handleGoToForgotPassword}>
              <Text className='text-[#666] text-sm'>{forgotPassword}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              className='bg-[#007AFF] rounded-lg p-4 items-center mb-5'
              onPress={handleSubmit(onSubmit)}
            >
              <Text className='text-white text-base font-bold'>{loginButton}</Text>
            </TouchableOpacity>
            <View className='flex-row justify-center items-center'>
              <Text className='text-[#666] text-sm'>{noAccountText} </Text>
              <TouchableOpacity onPress={handleGoToSignUp}>
                <Text className='text-[#007AFF] text-sm font-bold'>{createAccountButton}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </>
  );
}
