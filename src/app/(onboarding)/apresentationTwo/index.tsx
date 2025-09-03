// src/app/(onboarding)/apresentationTwo/index.tsx
import { AppRoutes } from "@/routes/appRoutes";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import React, { useRef } from "react";
import { Image, Text, View, Dimensions } from "react-native";
import AppIntroSlider from "react-native-app-intro-slider";
import { SafeAreaView } from "react-native-safe-area-context";

// Obtém as dimensões da tela para cálculos responsivos
const { width, height } = Dimensions.get("window");

const introApresentation = [
  {
    key: "one",
    title: "Bem-vindo ao NativeNews",
    text: "Seu aplicativo de notícias personalizadas",
    image: require("../../../../assets/images/apresentation1.png"),
    logo: require("../../../../assets/logos/nativeNewsLogo.png"),
    backgroundColor: "#ffffff",
  },
  {
    key: "two",
    title: "Mantenha-se Informado",
    text: "Receba atualizações sobre os assuntos que você se interessa",
    image: require("../../../../assets/images/apresentation2.png"),
    logo: require("../../../../assets/logos/nativeNewsLogo.png"),

    backgroundColor: "#ffffff",
  },
  {
    key: "three",
    title: "Informações sempre atualizadas",
    text: "Atualizamos constantemente para trazer as últimas notícias.",
    image: require("../../../../assets/images/apresentation3.png"),
    logo: require("../../../../assets/logos/nativeNewsLogo.png"),

    backgroundColor: "#ffffff",
  },
];

export default function ApresentationTwo() {
  const sliderRef = useRef(null);

  const renderItem = ({ item }: { item: (typeof introApresentation)[0] }) => {
    return (
      <SafeAreaView className='flex-1 '>
        <View className='flex-1 items-center px-5 bg-white'>
          <Image
            source={item.logo}
            style={{
              width: 200,
              height: 200,
            }}
            resizeMode='contain'
          />
          <Text className='text-2xl font-bold text-gray-800 text-center mb-10'>{item.title}</Text>
          <Text className='text-base text-gray-600 text-center px-4 mb-6'>{item.text}</Text>
          <Image
            source={item.image}
            style={{
              width: 220,
              height: 220,
            }}
            resizeMode='contain'
          />
        </View>
      </SafeAreaView>
    );
  };

  const renderNextButton = () => {
    return (
      <View className='w-full flex items-center justify-center'>
        <View className='w-[120px] h-[50px] bg-[#4FA6BB] rounded-full justify-center items-center shadow-md'>
          <Text className='text-white font-bold text-lg'>Próximo</Text>
        </View>
      </View>
    );
  };

  const renderDoneButton = () => {
    return (
      <View className='w-full flex items-center justify-center'>
        <View className='w-[120px] h-[50px] bg-[#4FA6BB] rounded-full justify-center items-center shadow-md'>
          <Text className='text-white font-bold text-lg'>Começar</Text>
        </View>
      </View>
    );
  };

  const onDone = async () => {
    // Salvar que o usuário já viu o onboarding
    await AsyncStorage.setItem("hasSeenOnboarding", "true");
    // Navegar para a tela de login
    router.replace(AppRoutes.SignIn);
  };

  return (
    <View className='flex-1 bg-white'>
      <AppIntroSlider
        ref={sliderRef}
        renderItem={renderItem}
        data={introApresentation}
        onDone={onDone}
        renderDoneButton={renderDoneButton}
        renderNextButton={renderNextButton}
        dotStyle={{ backgroundColor: "rgba(0, 0, 0, 0.3)", marginBottom: 20, marginTop: 10 }}
        activeDotStyle={{ backgroundColor: "#4FA6BB", marginBottom: 20, marginTop: 10 }}
        bottomButton
      />
    </View>
  );
}

// Não precisamos mais do StyleSheet pois estamos usando classes do Tailwind
