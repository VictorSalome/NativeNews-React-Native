import { MaterialIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useState } from "react";

import { authTexts } from "@/constants/texts/auth";

import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import useAuth from "@/hooks/useAuth";
import {
  showForgotPasswordError,
  showForgotPasswordSuccess,
} from "@/utils/userFeedback";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { forgotPasswordSchema } from "./forgotPasswordSchema";
import type { IForgotPasswordData } from "./types";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const {
    title,
    description,
    emailPlaceholder,
    backToLoginButton,
    recoverButton,
  } = authTexts.forgotPassword;

  const { handleResetPassword } = useAuth();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IForgotPasswordData>({
    resolver: zodResolver(forgotPasswordSchema),

    defaultValues: {
      email,
    },
  });

  const onSubmit = async (data: IForgotPasswordData) => {
    try {
      setIsLoading(true);
      const result = await handleResetPassword(data.email);

      if (result.ok) {
        showForgotPasswordSuccess();
        setEmail("");
        router.back();
      } else {
        showForgotPasswordError();
      }
    } catch (error) {
      showForgotPasswordError();
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <StatusBar style="auto" />
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
            <MaterialIcons
              name="lock-reset"
              size={100}
              className="text-primary dark:text-primary-dark"
            />
          </View>

          <View className="w-full">
            <Text className="text-[28px] font-bold text-text-base dark:text-text-base-dark mb-2.5 text-center">
              {title}
            </Text>
            <Text className="text-base text-text-muted dark:text-text-muted-dark text-center mb-8">
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
                  {recoverButton}
                </Text>
              )}
            </TouchableOpacity>

            <View className="flex-row justify-center items-center">
              <TouchableOpacity onPress={() => router.back()}>
                <Text className="text-primary dark:text-primary-dark text-sm font-bold">
                  {backToLoginButton}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </>
  );
}
