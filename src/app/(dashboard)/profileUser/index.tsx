import { useThemeContext } from "@/context/themeContext";
import useAuth from "@/hooks/useAuth";

import { storage } from "@/services/firebaseConfig";
import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { useRouter } from "expo-router";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

import React, { useCallback, useState } from "react";
import {
  Alert,
  Image,
  ScrollView,
  Switch,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { uuidv4 } from "zod";

export default function ProfileUser() {
  const router = useRouter();
  const { logout } = useAuth();
  const { toggleTheme, isDarkMode } = useThemeContext();

  const [status, requestPermission] = ImagePicker.useCameraPermissions();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [cameraStatus, requestCameraPermission] =
    ImagePicker.useCameraPermissions();
  const [mediaLibraryStatus, requestMediaLibraryPermission] =
    ImagePicker.useMediaLibraryPermissions();

  const handleLogout = async () => {
    await logout();
    router.replace("/(auth)/sign-in");
    alert("Usuário desconectado com sucesso");
  };

  const handleSelectFromGallery = useCallback(async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images, // ajuste aqui
        allowsEditing: true,
        aspect: [1, 1] as [number, number],
        quality: 0.8,
      });

      if (!result.canceled && result.assets?.[0]?.uri) {
        const uri = result.assets[0].uri;

        // 🔹 Converte imagem em blob
        const response = await fetch(uri);
        const blob = await response.blob();

        // 🔹 Cria referência no Firebase Storage
        const imageRef = ref(storage, `profilePictures/${uuidv4()}.jpg`);

        // 🔹 Faz upload
        await uploadBytes(imageRef, blob);

        // 🔹 Pega URL pública
        const downloadURL = await getDownloadURL(imageRef);

        console.log("✅ Foto enviada! URL:", downloadURL);

        // aqui você pode salvar a URL no Firestore ou no usuário
        Alert.alert("Sucesso", "Foto de perfil enviada!");
      }
    } catch (error) {
      console.error("Erro ao selecionar/enviar imagem:", error);
      Alert.alert("Erro", "Não foi possível enviar a foto");
    }
  }, []);

  // const handleTakePhoto = useCallback(async () => {
  //   try {
  //     const result = await ImagePicker.launchCameraAsync({
  //       mediaTypes: "images",
  //       allowsEditing: true,
  //       aspect: [1, 1] as [number, number],
  //       quality: 0.8,
  //     });

  //     if (!result.canceled && result.assets?.[0]?.uri) {
  //       setSelectedImage(result.assets[0].uri);
  //     } else if (result.canceled) {
  //       Alert.alert("Aviso", "A captura foi cancelada");
  //     }
  //   } catch (error) {
  //     console.error("Erro ao acessar câmera:", error);
  //     Alert.alert("Erro", "Não foi possível acessar a câmera");
  //   }
  // }, []);

  // const handleSave = useCallback(async () => {
  //   if (!selectedImage) {
  //     Alert.alert("Aviso", "Selecione uma imagem primeiro");
  //     return;
  //   }

  //   if (selectedImage === profileImage) {
  //     Alert.alert("Info", "Nenhuma alteração foi feita");
  //     return;
  //   }

  //   setIsUploading(true);
  //   try {
  //     await updateImageProfile(selectedImage);
  //     await fetchProfileImage();
  //     Alert.alert("Sucesso", "Imagem atualizada com sucesso");
  //   } catch (error) {
  //     console.error("Erro ao salvar perfil:", error);
  //     Alert.alert("Erro", "Não foi possível salvar a imagem");
  //   } finally {
  //     setIsUploading(false);
  //   }
  // }, [
  //   selectedImage,
  //   profileImage,
  //   updateImageProfile,
  //   fetchProfileImage,
  //   messages,
  // ]);

  const ConfigItem = ({
    icon,
    title,
    subtitle,
    onPress,
    showArrow = true,
    rightComponent,
  }: {
    icon: string;
    title: string;
    subtitle?: string;
    onPress?: () => void;
    showArrow?: boolean;
    rightComponent?: React.ReactNode;
  }) => (
    <TouchableOpacity
      className="flex-row items-center py-4 px-4 bg-white dark:bg-gray-800 mb-2 rounded-xl shadow-sm"
      onPress={onPress}
      disabled={!onPress}
    >
      <View className="w-10 h-10 bg-blue-100 dark:bg-blue-900 rounded-full items-center justify-center mr-4">
        <Ionicons
          name={icon as any}
          size={20}
          color={isDarkMode ? "#60A5FA" : "#3B82F6"}
        />
      </View>
      <View className="flex-1">
        <Text className="text-base font-medium text-text-base dark:text-text-base-dark">
          {title}
        </Text>
        {subtitle && (
          <Text className="text-sm text-text-muted dark:text-text-muted-dark mt-1">
            {subtitle}
          </Text>
        )}
      </View>
      {rightComponent ||
        (showArrow && (
          <Ionicons
            name="chevron-forward"
            size={20}
            color={isDarkMode ? "#9CA3AF" : "#6B7280"}
          />
        ))}
    </TouchableOpacity>
  );

  return (
    <View className="flex-1 bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <View className="flex-row items-center justify-between p-4 pt-12 bg-white dark:bg-gray-800 shadow-sm">
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons
            name="arrow-back"
            size={24}
            color={isDarkMode ? "#FFFFFF" : "#000000"}
          />
        </TouchableOpacity>
        <Text className="text-xl font-bold text-text-base dark:text-text-base-dark">
          Meu Perfil
        </Text>
        <View className="w-6" />
      </View>

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        {/* Seção do Perfil */}
        <View className="items-center py-8 bg-white dark:bg-gray-800 mb-6">
          <View className="relative">
            <Image
              source={{
                uri: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&h=150&fit=crop&crop=face",
              }}
              className="w-32 h-32 rounded-full mb-4"
            />
            <TouchableOpacity
              className="absolute bottom-2 right-2 w-10 h-10 bg-blue-500 rounded-full items-center justify-center shadow-lg"
              onPress={handleSelectFromGallery}
            >
              <Ionicons name="camera" size={20} color="white" />
            </TouchableOpacity>
          </View>
          <Text className="text-2xl font-bold mb-2 text-text-base dark:text-text-base-dark">
            Ana Clara Silva
          </Text>
          <Text className="text-base text-text-muted dark:text-text-muted-dark mb-4">
            ana.clara@email.com
          </Text>
          <TouchableOpacity className="bg-gray-200 dark:bg-gray-700 px-6 py-2 rounded-full">
            <Text className="text-base font-medium text-text-base dark:text-text-base-dark">
              Editar Perfil
            </Text>
          </TouchableOpacity>
        </View>

        {/* Configurações Gerais */}
        <View className="px-4 mb-6">
          <Text className="text-lg font-bold mb-4 text-text-base dark:text-text-base-dark">
            Configurações Gerais
          </Text>

          <ConfigItem
            icon="sunny"
            title="Tema do Aplicativo"
            subtitle={isDarkMode ? "Escuro" : "Claro"}
            rightComponent={
              <Switch
                value={isDarkMode}
                onValueChange={toggleTheme}
                trackColor={{ false: "#E5E7EB", true: "#3B82F6" }}
                thumbColor={isDarkMode ? "#FFFFFF" : "#F3F4F6"}
              />
            }
          />

          <ConfigItem
            icon="notifications-outline"
            title="Preferências de Notificação"
            subtitle="Gerencie alertas e notícias"
            onPress={() => console.log("Notificações")}
          />

          <ConfigItem
            icon="language-outline"
            title="Idioma do Aplicativo"
            subtitle="Português (Brasil)"
            onPress={() => console.log("Idioma")}
          />
        </View>

        {/* Conta e Segurança */}
        <View className="px-4 mb-6">
          <Text className="text-lg font-bold mb-4 text-text-base dark:text-text-base-dark">
            Conta e Segurança
          </Text>

          <ConfigItem
            icon="lock-closed-outline"
            title="Alterar Senha"
            subtitle="Padrão do Sistema"
            onPress={() => console.log("Alterar senha")}
          />
        </View>

        {/* Sobre o Aplicativo */}
        <View className="px-4 mb-8">
          <Text className="text-lg font-bold mb-4 text-text-base dark:text-text-base-dark">
            Sobre
          </Text>

          <ConfigItem
            icon="information-circle-outline"
            title="Sobre o NativeNews"
            subtitle="Versão, termos e privacidade"
            onPress={() => console.log("Sobre")}
          />
        </View>

        {/* Botão de Sair */}
        <View className="px-4 pb-8">
          <TouchableOpacity
            className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl py-4 px-4 flex-row items-center justify-center"
            onPress={handleLogout}
          >
            <Ionicons
              name="log-out-outline"
              size={24}
              color={isDarkMode ? "#EF4444" : "#DC2626"}
            />
            <Text className="text-base font-medium ml-3 text-red-600 dark:text-red-400">
              Sair da Conta
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}
