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
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { signUpSchema } from "./signInSchema";
import type { ISignUpData } from "./types";

export default function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

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
  };

  const goToLogin = () => {
    router.navigate(AppRoutes.SignIn);
  };

  return (
    <>
      <StatusBar style='dark' />
      <KeyboardAvoidingView
        className="flex-1 bg-white"
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 0}
      >
        <ScrollView
          className="flex-grow"
          contentContainerStyle={{ justifyContent: "center", padding: 24 }}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps='handled'
        >
          <View className="items-center mb-6">
            <Image
              source={require("../../../../assets/images/Logo_Portal_do_Vendedor.jpg")}
              className="w-[200px] h-[80px]"
              resizeMode='contain'
            />
          </View>

          <Text className="text-2xl font-bold mb-6 text-center">Create Account</Text>

          <Controller
            control={control}
            name='email'
            render={({ field: { onChange, onBlur, value } }) => (
              <>
                <TextInput
                  className='bg-[#f5f5f5] rounded-lg p-4 mb-4 text-base'
                  placeholder='Email'
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
                    placeholder='Password'
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
            
            <TouchableOpacity className="p-[15px]" onPress={() => setShowPassword(!showPassword)}>
              <Ionicons name={showPassword ? "eye-off" : "eye"} size={24} color='#666' />
            </TouchableOpacity>
          </View>

          <View className='flex-row items-center bg-[#f5f5f5] rounded-lg mb-4'>
            <Controller
              control={control}
              name='confirmPassword'
              render={({ field: { onChange, value } }) => (
                <>
                  <TextInput
                    className='flex-1 p-4 text-base'
                    placeholder='Confirm Password'
                    value={value}
                    onChangeText={onChange}
                    secureTextEntry={!showPassword}
                  />
                  {errors.confirmPassword && (
                    <Text className='text-red-500 text-sm absolute -bottom-6 left-0'>
                      {errors.confirmPassword.message}
                    </Text>
                  )}
                </>
              )}
            />
            
            <TouchableOpacity className="p-[15px]" onPress={() => setShowPassword(!showPassword)}>
              <Ionicons name={showPassword ? "eye-off" : "eye"} size={24} color='#666' />
            </TouchableOpacity>
          </View>

          <TouchableOpacity className="mt-5 h-[50px] bg-[#007AFF] rounded-lg justify-center items-center" onPress={handleSubmit(onSubmit)}>
            <Text className="text-white text-base font-bold">Sign Up</Text>
          </TouchableOpacity>

          <View className="flex-row justify-center mt-4">
            <Text className="text-[#666] text-sm">Already have an account? </Text>
            <TouchableOpacity onPress={goToLogin}>
              <Text className="text-[#007AFF] text-sm font-bold">Login</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </>
  );
}

// Estilos convertidos para Tailwind CSS
