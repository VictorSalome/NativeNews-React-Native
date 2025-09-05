import useAuth from "@/hooks/useAuth";
import { AppRoutes } from "@/routes/appRoutes";

import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";

import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";

import { LogoSvg } from "@/components/LogoSvg";
import { authTexts } from "@/constants/texts/auth";
import { useThemeContext } from "@/context/themeContext";
import { getLastEmail, saveLastEmail } from "@/utils/lastCredentials";
import { showLoginError, showLoginSuccess } from "@/utils/userFeedback";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Switch,
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
  const [rememberEmail, setRememberEmail] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

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
  const { isDarkMode } = useThemeContext();

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<ISignInData>({
    resolver: zodResolver(signInSchema),

    defaultValues: {
      email,
      password,
    },
  });

  const onSubmit = async (data: ISignInData) => {
    try {
      setIsLoading(true);
      const { email, password } = data;
      const response = await handleSignIn(email, password);

      if (response.ok) {
        showLoginSuccess();

        if (rememberEmail) {
          await saveLastEmail(email);
        }
        router.replace(AppRoutes.Home);
      } else {
        showLoginError();
      }
    } catch (error) {
      showLoginError();
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoToSignUp = () => {
    router.navigate(AppRoutes.SignUp);
  };

  const handleGoToForgotPassword = () => {
    router.navigate(AppRoutes.ForgotPassword);
  };

  useEffect(() => {
    const loadLastEmail = async () => {
      const lastEmail = await getLastEmail();
      if (lastEmail) {
        setEmail(lastEmail);
        setValue("email", lastEmail);
      }
    };

    loadLastEmail();
  }, []);

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
            <LogoSvg width={200} height={200} isDark={isDarkMode} />
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
                className="p-4"
                onPress={() => setShowPassword(!showPassword)}
              >
                <Ionicons
                  name={showPassword ? "eye-off" : "eye"}
                  size={24}
                  color="#9CA3AF"
                />
              </TouchableOpacity>
            </View>

            <View className="flex-row justify-end items-center mb-4">
              <Switch
                value={rememberEmail}
                onValueChange={setRememberEmail}
                trackColor={{ false: "#D1D5DB", true: "#9CA3AF" }}
                thumbColor={rememberEmail ? "#6B7280" : "#E5E7EB"}
                ios_backgroundColor="#3e3e3e"
              />
              <Text className="ml-2 text-text-muted dark:text-text-muted-dark">
                Lembrar Credenciais?
              </Text>
            </View>

            <TouchableOpacity
              className="self-end mb-5 mt-4"
              onPress={handleGoToForgotPassword}
            >
              <Text className="text-text-muted dark:text-text-muted-dark text-sm">
                {forgotPassword}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              className={`rounded-lg p-4 items-center mb-5 ${
                isLoading
                  ? "bg-primary/70 dark:bg-primary-dark/70"
                  : "bg-primary dark:bg-primary-dark"
              }`}
              onPress={handleSubmit(onSubmit)}
              disabled={isLoading}
            >
              {isLoading ? (
                <ActivityIndicator color="#FFFFFF" size="small" />
              ) : (
                <Text className="text-white text-base font-bold">
                  {loginButton}
                </Text>
              )}
            </TouchableOpacity>
            <View className="flex-row justify-center items-center">
              <Text className="text-text-muted dark:text-text-muted-dark text-sm">
                {noAccountText}
              </Text>

              <TouchableOpacity onPress={handleGoToSignUp}>
                <Text className="text-primary dark:text-primary-dark text-sm font-bold">
                  {createAccountButton}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </>
  );
}
