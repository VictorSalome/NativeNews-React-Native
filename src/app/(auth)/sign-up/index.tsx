import useAuth from "@/hooks/useAuth";
import { AppRoutes } from "@/routes/appRoutes";

import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useState } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";

import { showSignUpError, showSignUpSuccess } from "@/utils/userFeedback";
import {
  ActivityIndicator,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { signUpSchema } from "./signUpSchema";
import type { ISignUpData } from "./types";
import { authTexts } from "@/constants/texts/auth";

export default function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const {
    title,
    alreadyHaveAccountText,
    confirmPasswordPlaceholder,
    description,
    emailPlaceholder,
    passwordPlaceholder,
    signInButton,
    signUpButton,
  } = authTexts.signUp;

  const { handleSignUp } = useAuth();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ISignUpData>({
    resolver: zodResolver(signUpSchema),

    defaultValues: {
      email,
      password,
      confirmPassword: "",
    },
  });

  const onSubmit = async (data: ISignUpData) => {
    try {
      setIsLoading(true);
      const { email, password } = data;
      const response = await handleSignUp(email, password);

      if (response.ok) {
        showSignUpSuccess();
        setEmail("");
        setPassword("");
        router.navigate(AppRoutes.SignIn);
      } else {
        showSignUpError();
      }
    } catch (error) {
      showSignUpError();
    } finally {
      setIsLoading(false);
    }
  };

  const goToLogin = () => {
    router.navigate(AppRoutes.SignIn);
  };

  return (
    <>
      <StatusBar style="dark" />
      <KeyboardAvoidingView
        className="flex-1 bg-surface dark:bg-surface-dark"
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 0}
      >
        <ScrollView
          className="flex-grow"
          contentContainerStyle={{
            justifyContent: "center",
            paddingHorizontal: 32,
          }}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          <View className="items-center mb-8">
            <Image
              source={require("../../../../assets/logos/nativeNewsLogo.png")}
              className="w-[200px] h-[200px]"
              resizeMode="contain"
            />
          </View>
          <View className="w-full">
            <Text className="text-[28px] font-bold text-text-base dark:text-text-base-dark mb-2.5 text-center">
              {title}
            </Text>
            <Text className="text-base text-text-muted dark:text-text-muted-dark mb-8 text-center">
              {description}
            </Text>

            <Controller
              control={control}
              name="email"
              render={({ field: { onChange, onBlur, value } }) => (
                <>
                  <TextInput
                    className="bg-input dark:bg-input-dark rounded-lg p-4 mb-4 text-base text-text-base dark:text-text-base-dark"
                    placeholder={emailPlaceholder}
                    placeholderTextColor="#9CA3AF"
                    value={value}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    keyboardType="email-address"
                    autoCapitalize="none"
                  />
                  {errors.email && (
                    <Text className="text-red-500 text-sm mb-2">
                      {errors.email.message}
                    </Text>
                  )}
                </>
              )}
            />
            <View className="flex-row items-center bg-input dark:bg-input-dark rounded-lg mb-4">
              <Controller
                control={control}
                name="password"
                render={({ field: { onChange, value } }) => (
                  <>
                    <TextInput
                      className="flex-1 p-4 text-base text-text-base dark:text-text-base-dark"
                      placeholder={passwordPlaceholder}
                      placeholderTextColor="#9CA3AF"
                      value={value}
                      onChangeText={onChange}
                      secureTextEntry={!showPassword}
                    />
                    {errors.password && (
                      <Text className="text-red-500 text-sm absolute -bottom-6 left-0">
                        {errors.password.message}
                      </Text>
                    )}
                  </>
                )}
              />

              <TouchableOpacity
                className="p-[15px]"
                onPress={() => setShowPassword(!showPassword)}
              >
                <Ionicons
                  name={showPassword ? "eye-off" : "eye"}
                  size={24}
                  color="#9CA3AF"
                />
              </TouchableOpacity>
            </View>

            <View className="flex-row items-center bg-input dark:bg-input-dark rounded-lg mb-4 mt-5">
              <Controller
                control={control}
                name="confirmPassword"
                render={({ field: { onChange, value } }) => (
                  <>
                    <TextInput
                      className="flex-1 p-4 text-base text-text-base dark:text-text-base-dark"
                      placeholder={confirmPasswordPlaceholder}
                      placeholderTextColor="#9CA3AF"
                      value={value}
                      onChangeText={onChange}
                      secureTextEntry={!showPassword}
                    />
                    {errors.confirmPassword && (
                      <Text className="text-red-500 text-sm absolute -bottom-6 left-0">
                        {errors.confirmPassword.message}
                      </Text>
                    )}
                  </>
                )}
              />

              <TouchableOpacity
                className="p-[15px]"
                onPress={() => setShowPassword(!showPassword)}
              >
                <Ionicons
                  name={showPassword ? "eye-off" : "eye"}
                  size={24}
                  color="#666"
                />
              </TouchableOpacity>
            </View>

            <TouchableOpacity
              className={`rounded-lg p-4 items-center mb-5 mt-5 ${
                isLoading ? "bg-primary/70 dark:bg-primary-dark/70" : "bg-primary dark:bg-primary-dark"
              }`}
              onPress={handleSubmit(onSubmit)}
              disabled={isLoading}
            >
              {isLoading ? (
                <ActivityIndicator color="#FFFFFF" size="small" />
              ) : (
                <Text className="text-white text-base font-bold">
                  {signUpButton}
                </Text>
              )}
            </TouchableOpacity>

            <View className="flex-row justify-center items-center">
              <Text className="text-text-muted dark:text-text-muted-dark text-sm">
                {alreadyHaveAccountText}{" "}
              </Text>
              <TouchableOpacity onPress={goToLogin}>
                <Text className="text-primary dark:text-primary-dark text-sm font-bold">
                  {signInButton}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </>
  );
}
