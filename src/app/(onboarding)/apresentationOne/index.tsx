// src/app/(onboarding)/apresentationOne/index.tsx
import React, { useRef, useState } from "react";
import { View, Text, StyleSheet, Image, Dimensions, TouchableOpacity } from "react-native";
import AppIntroSlider from "react-native-app-intro-slider";
import LottieView from "lottie-react-native";
import { router } from "expo-router";
import { AppRoutes } from "@/app/routes/appRoutes";
import AsyncStorage from "@react-native-async-storage/async-storage";

const { width, height } = Dimensions.get("window");

// Você precisará baixar ou criar animações Lottie para usar aqui
// Exemplo de slides para o onboarding
const slides = [
  {
    key: "one",
    title: "Bem-vindo ao NativeNews",
    text: "Seu aplicativo de notícias personalizadas",
    lottie: require("../../../../assets/animations/Welcome.json"),

    backgroundColor: "#59b2ab",
  },
  {
    key: "two",
    title: "Notícias em Tempo Real",
    text: "Receba atualizações instantâneas sobre os assuntos que você se interessa",
    lottie: require("../../../../assets/animations/news.json"),
    backgroundColor: "#febe29",
  },
  {
    key: "three",
    title: "Personalize sua Experiência",
    text: "Escolha suas categorias favoritas e tenha uma experiência única",
    lottie: require("../../../../assets/animations/customize.json"),
    backgroundColor: "#22bcb5",
  },
];

export default function ApresentationOne() {
  const sliderRef = useRef(null);
  const [showRealApp, setShowRealApp] = useState(false);

  const renderItem = ({ item }: { item: typeof slides[0] }) => {
    return (
      <View style={[styles.slide, { backgroundColor: item.backgroundColor }]}>
        <Text style={styles.title}>{item.title}</Text>
        <LottieView source={item.lottie} autoPlay loop style={styles.lottieAnimation} />
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
        data={slides}
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
  slide: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    color: "white",
    textAlign: "center",
    marginBottom: 16,
  },
  text: {
    fontSize: 16,
    color: "white",
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
    color: "white",
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
    color: "white",
    fontWeight: "500",
    fontSize: 16,
  },
  dot: {
    backgroundColor: "rgba(255, 255, 255, 0.3)",
  },
  activeDot: {
    backgroundColor: "white",
  },
});
