// src/app/(onboarding)/apresentationTwo/index.tsx
import { AppRoutes } from "@/routes/appRoutes";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import React, { useRef } from "react";
import { Dimensions, Image, StyleSheet, Text, View } from "react-native";
import AppIntroSlider from "react-native-app-intro-slider";

const { width, height } = Dimensions.get("window");

// Você precisará baixar ou criar animações Lottie para usar aqui
// Exemplo de slides para o onboarding

const introApresentation = [
  {
    key: "one",
    title: "Bem-vindo ao NativeNews",
    text: "Seu aplicativo de notícias personalizadas",
    lottie: require("../../../../assets/images/apresentation1.png"),
    logo: require("../../../../assets/logos/nativeNewsLogo.png"),
    backgroundColor: "#ffffff",
  },
  {
    key: "two",
    title: "Mantenha-se Informado",
    text: "Receba atualizações sobre os assuntos que você se interessa",
    lottie: require("../../../../assets/images/apresentation2.png"),
    logo: require("../../../../assets/logos/nativeNewsLogo.png"),

    backgroundColor: "#ffffff",
  },
  {
    key: "three",
    title: "Informações sempre atualizadas",
    text: "Atualizamos constantemente para trazer as últimas notícias.",
    lottie: require("../../../../assets/images/apresentation3.png"),
    logo: require("../../../../assets/logos/nativeNewsLogo.png"),

    backgroundColor: "#ffffff",
  },
];

export default function ApresentationTwo() {
  const sliderRef = useRef(null);

  const renderItem = ({ item }: { item: (typeof introApresentation)[0] }) => {
    return (
      <View style={[styles.slide, { backgroundColor: item.backgroundColor }]}>
        <Text className='text-3xl font-bold text-blue-500'>oladsadasda</Text>

        <Image source={item.logo} style={styles.logo} />
        <Text style={styles.title}>{item.title}</Text>
        <Image source={item.lottie} style={styles.lottieAnimation} />
        <Text style={styles.text}>{item.text}</Text>
      </View>
    );
  };

  const renderNextButton = () => {
    return (
      <View style={styles.buttonCircle}>
        <Text style={styles.buttonText}>Próximo</Text>
      </View>
    );
  };

  const renderDoneButton = () => {
    return (
      <View style={styles.buttonCircle}>
        <Text style={styles.buttonText}>Começar</Text>
      </View>
    );
  };

  const renderSkipButton = () => {
    return (
      <View style={styles.skipButton}>
        <Text style={styles.skipButtonText}>Pular</Text>
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
    <View style={styles.container}>
      <AppIntroSlider
        ref={sliderRef}
        renderItem={renderItem}
        data={introApresentation}
        onDone={onDone}
        renderDoneButton={renderDoneButton}
        renderNextButton={renderNextButton}
        renderSkipButton={renderSkipButton}
        showSkipButton
        dotStyle={styles.dot}
        activeDotStyle={styles.activeDot}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  logo: {
    width: 250,
    height: 250,
  },

  slide: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "black",
    textAlign: "center",
    marginBottom: 16,
  },
  text: {
    fontSize: 16,
    color: "black",
    textAlign: "center",
    marginTop: 16,
  },
  lottieAnimation: {
    width: width * 0.8,
    height: height * 0.4,
  },
  buttonCircle: {
    width: 100,
    height: 40,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    color: "black",
    fontWeight: "bold",
    fontSize: 16,
  },
  skipButton: {
    width: 80,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  skipButtonText: {
    color: "black",
    fontWeight: "500",
    fontSize: 16,
  },
  dot: {
    backgroundColor: "rgba(255, 255, 255, 0.3)",
  },
  activeDot: {
    backgroundColor: "black",
  },
});
