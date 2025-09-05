import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  TextInput,
} from "react-native";
import { MaterialIcons, Ionicons, AntDesign } from "@expo/vector-icons";
import { useThemeContext } from "@/context/themeContext";

export default function ThemeTestComponents() {
  const { toggleTheme, isDarkMode } = useThemeContext();

  return (
    <ScrollView className="bg-background dark:bg-background-dark flex-1">
      <View className="p-4">
        {/* Header Section */}
        <View className="bg-surface dark:bg-surface-dark p-4 rounded-xl mb-4 border border-gray-200 dark:border-gray-800">
          <View className="flex-row items-center justify-between mb-2">
            <Text className="text-text-base dark:text-text-base-dark text-2xl font-bold">
              Sistema de Temas
            </Text>
            <TouchableOpacity onPress={toggleTheme} className="p-2">
              <MaterialIcons
                name={isDarkMode ? "dark-mode" : "light-mode"}
                size={24}
                color={isDarkMode ? "#fff" : "#000"}
              />
            </TouchableOpacity>
          </View>
          <Text className="text-text-muted dark:text-text-muted-dark">
            Modo atual: {isDarkMode ? "Escuro" : "Claro"}
          </Text>
        </View>

        {/* Primary Colors */}
        <Text className="text-text-base dark:text-text-base-dark text-xl font-bold mb-3">
          Cores Principais
        </Text>
        <View className="flex-row gap-3 mb-4">
          <View className="flex-1 bg-primary dark:bg-primary-dark p-4 rounded-lg">
            <Text className="text-white font-semibold text-center">
              Primary
            </Text>
            <Text className="text-white/80 text-xs text-center mt-1">
              #4FA6BB
            </Text>
          </View>
          <View className="flex-1 bg-secondary dark:bg-secondary-dark p-4 rounded-lg">
            <Text className="text-white font-semibold text-center">
              Secondary
            </Text>
            <Text className="text-white/80 text-xs text-center mt-1">
              #444444
            </Text>
          </View>
          <View className="flex-1 bg-accent dark:bg-accent-dark p-4 rounded-lg">
            <Text className="text-white font-semibold text-center">Accent</Text>
            <Text className="text-white/80 text-xs text-center mt-1">
              #6FBCCF
            </Text>
          </View>
        </View>

        {/* Feedback Colors */}
        <Text className="text-text-base dark:text-text-base-dark text-xl font-bold mb-3">
          Cores de Feedback
        </Text>
        <View className="flex-row gap-3 mb-4">
          <View className="flex-1 bg-success dark:bg-success-dark p-4 rounded-lg">
            <Text className="text-white font-semibold text-center">
              Success
            </Text>
            <Text className="text-white/80 text-xs text-center mt-1">
              #22C55E
            </Text>
          </View>
          <View className="flex-1 bg-warning dark:bg-warning-dark p-4 rounded-lg">
            <Text className="text-white font-semibold text-center">
              Warning
            </Text>
            <Text className="text-white/80 text-xs text-center mt-1">
              #FBBF24
            </Text>
          </View>
          <View className="flex-1 bg-error dark:bg-error-dark p-4 rounded-lg">
            <Text className="text-white font-semibold text-center">Error</Text>
            <Text className="text-white/80 text-xs text-center mt-1">
              #EF4444
            </Text>
          </View>
        </View>

        {/* Surface and Background */}
        <Text className="text-text-base dark:text-text-base-dark text-xl font-bold mb-3">
          Superfícies
        </Text>
        <View className="bg-surface dark:bg-surface-dark p-4 rounded-lg mb-4 border border-gray-200 dark:border-gray-800">
          <Text className="text-text-base dark:text-text-base-dark font-semibold mb-2">Surface</Text>
          <Text className="text-text-muted dark:text-text-muted-dark mb-3">
            Superfície principal para cards e elementos elevados
          </Text>
          <View className="bg-background dark:bg-background-dark p-3 rounded border border-gray-300 dark:border-gray-700">
            <Text className="text-text-base dark:text-text-base-dark text-sm">Background aninhado</Text>
          </View>
        </View>

        {/* Text Variations */}
        <Text className="text-text-base dark:text-text-base-dark text-xl font-bold mb-3">
          Variações de Texto
        </Text>
        <View className="bg-surface dark:bg-surface-dark p-4 rounded-lg mb-4">
          <Text className="text-text-base dark:text-text-base-dark text-lg font-bold mb-2">
            Text Base (Bold)
          </Text>
          <Text className="text-text-base dark:text-text-base-dark mb-2">Text Base (Normal)</Text>
          <Text className="text-text-muted dark:text-text-muted-dark mb-2">Text Muted</Text>
          <Text className="text-text-base dark:text-text-base-dark text-sm mb-2">Text Base Small</Text>
          <Text className="text-text-muted dark:text-text-muted-dark text-xs">
            Text Muted Extra Small
          </Text>
        </View>

        {/* Gray Scale */}
        <Text className="text-text-base dark:text-text-base-dark text-xl font-bold mb-3">
          Escala de Cinza
        </Text>
        <View className="flex-row flex-wrap gap-2 mb-4">
          <View className="bg-gray-50 dark:bg-gray-50-dark p-3 rounded flex-1 min-w-[80px]">
            <Text className="text-center text-xs font-semibold text-gray-900 dark:text-white">50</Text>
          </View>
          <View className="bg-gray-100 dark:bg-gray-100-dark p-3 rounded flex-1 min-w-[80px]">
            <Text className="text-center text-xs font-semibold text-gray-900 dark:text-white">100</Text>
          </View>
          <View className="bg-gray-200 dark:bg-gray-200-dark p-3 rounded flex-1 min-w-[80px]">
            <Text className="text-center text-xs font-semibold text-gray-900 dark:text-white">200</Text>
          </View>
          <View className="bg-gray-300 dark:bg-gray-300-dark p-3 rounded flex-1 min-w-[80px]">
            <Text className="text-center text-xs font-semibold text-gray-900 dark:text-white">300</Text>
          </View>
          <View className="bg-gray-400 dark:bg-gray-400-dark p-3 rounded flex-1 min-w-[80px]">
            <Text className="text-center text-xs font-semibold text-gray-900 dark:text-white">400</Text>
          </View>
          <View className="bg-gray-500 dark:bg-gray-500-dark p-3 rounded flex-1 min-w-[80px]">
            <Text className="text-center text-xs font-semibold text-white dark:text-gray-900">500</Text>
          </View>
          <View className="bg-gray-600 dark:bg-gray-600-dark p-3 rounded flex-1 min-w-[80px]">
            <Text className="text-center text-xs font-semibold text-white dark:text-gray-900">600</Text>
          </View>
          <View className="bg-gray-700 dark:bg-gray-700-dark p-3 rounded flex-1 min-w-[80px]">
            <Text className="text-center text-xs font-semibold text-white dark:text-gray-900">700</Text>
          </View>
          <View className="bg-gray-800 dark:bg-gray-800-dark p-3 rounded flex-1 min-w-[80px]">
            <Text className="text-center text-xs font-semibold text-white dark:text-gray-900">800</Text>
          </View>
          <View className="bg-gray-900 dark:bg-gray-900-dark p-3 rounded flex-1 min-w-[80px]">
            <Text className="text-center text-xs font-semibold text-white dark:text-gray-900">900</Text>
          </View>
        </View>

        {/* Buttons */}
        <Text className="text-text-base dark:text-text-base-dark text-xl font-bold mb-3">Botões</Text>
        <View className="gap-3 mb-4">
          <TouchableOpacity className="bg-primary dark:bg-primary-dark p-4 rounded-lg flex-row items-center justify-center gap-2">
            <AntDesign name="check" size={16} color="white" />
            <Text className="text-white font-semibold">Botão Primário</Text>
          </TouchableOpacity>

          <TouchableOpacity className="bg-secondary dark:bg-secondary-dark p-4 rounded-lg flex-row items-center justify-center gap-2">
            <Ionicons name="settings" size={16} color="white" />
            <Text className="text-white font-semibold">Botão Secundário</Text>
          </TouchableOpacity>

          <TouchableOpacity className="bg-accent dark:bg-accent-dark p-4 rounded-lg flex-row items-center justify-center gap-2">
            <MaterialIcons name="star" size={16} color="white" />
            <Text className="text-white font-semibold">Botão Accent</Text>
          </TouchableOpacity>

          <TouchableOpacity className="border-2 border-primary dark:border-primary-dark p-4 rounded-lg flex-row items-center justify-center gap-2">
            <AntDesign name="plus" size={16} color={isDarkMode ? "#6FBCCF" : "#4FA6BB"} />
            <Text className="text-primary dark:text-primary-dark font-semibold">Botão Outline</Text>
          </TouchableOpacity>

          <TouchableOpacity className="bg-gray-200 dark:bg-gray-700 p-4 rounded-lg flex-row items-center justify-center gap-2 opacity-50">
            <Text className="text-gray-500 dark:text-gray-400 font-semibold">
              Botão Desabilitado
            </Text>
          </TouchableOpacity>
        </View>

        {/* Input Fields */}
        <Text className="text-text-base dark:text-text-base-dark text-xl font-bold mb-3">
          Campos de Entrada
        </Text>
        <View className="gap-3 mb-4">
          <View>
            <Text className="text-text-base dark:text-text-base-dark mb-2 font-medium">
              Input Normal
            </Text>
            <TextInput
              className="bg-surface dark:bg-surface-dark border border-gray-300 dark:border-gray-700 p-3 rounded-lg text-text-base dark:text-text-base-dark"
              placeholder="Digite algo aqui..."
              placeholderTextColor={isDarkMode ? "#9CA3AF" : "#6B7280"}
            />
          </View>

          <View>
            <Text className="text-text-base dark:text-text-base-dark mb-2 font-medium">
              Input Focado
            </Text>
            <TextInput
              className="bg-surface dark:bg-surface-dark border-2 border-primary dark:border-primary-dark p-3 rounded-lg text-text-base dark:text-text-base-dark"
              placeholder="Campo focado"
              placeholderTextColor={isDarkMode ? "#9CA3AF" : "#6B7280"}
            />
          </View>

          <View>
            <Text className="text-error dark:text-error-dark mb-2 font-medium">Input com Erro</Text>
            <TextInput
              className="bg-surface dark:bg-surface-dark border-2 border-error dark:border-error-dark p-3 rounded-lg text-text-base dark:text-text-base-dark"
              placeholder="Campo com erro"
              placeholderTextColor={isDarkMode ? "#9CA3AF" : "#6B7280"}
            />
            <Text className="text-error dark:text-error-dark text-sm mt-1">
              Este campo é obrigatório
            </Text>
          </View>
        </View>

        {/* Cards */}
        <Text className="text-text-base dark:text-text-base-dark text-xl font-bold mb-3">Cards</Text>
        <View className="gap-3 mb-4">
          <View className="bg-surface dark:bg-surface-dark p-4 rounded-xl border border-gray-200 dark:border-gray-800">
            <View className="flex-row items-center gap-3 mb-3">
              <View className="bg-primary dark:bg-primary-dark p-2 rounded-full">
                <MaterialIcons name="article" size={20} color="white" />
              </View>
              <View className="flex-1">
                <Text className="text-text-base dark:text-text-base-dark font-semibold">
                  Card de Notícia
                </Text>
                <Text className="text-text-muted dark:text-text-muted-dark text-sm">Há 2 horas</Text>
              </View>
            </View>
            <Text className="text-text-base dark:text-text-base-dark mb-2">
              Este é um exemplo de card usando as cores do tema.
            </Text>
            <Text className="text-text-muted dark:text-text-muted-dark text-sm">
              Descrição adicional em texto muted para demonstrar a hierarquia
              visual.
            </Text>
          </View>

          <View className="bg-primary dark:bg-primary-dark p-4 rounded-xl">
            <Text className="text-white font-semibold text-lg mb-2">
              Card Destacado
            </Text>
            <Text className="text-white/90 mb-3">
              Card com fundo primário para destacar conteúdo importante.
            </Text>
            <TouchableOpacity className="bg-white/20 p-2 rounded-lg">
              <Text className="text-white text-center font-medium">Ação</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Status Indicators */}
        <Text className="text-text-base dark:text-text-base-dark text-xl font-bold mb-3">
          Indicadores de Status
        </Text>
        <View className="flex-row gap-3 mb-6">
          <View className="flex-1 bg-surface dark:bg-surface-dark p-3 rounded-lg border border-success dark:border-success-dark">
            <View className="flex-row items-center gap-2 mb-1">
              <View className="w-2 h-2 bg-success dark:bg-success-dark rounded-full" />
              <Text className="text-success dark:text-success-dark font-semibold text-sm">Online</Text>
            </View>
            <Text className="text-text-muted dark:text-text-muted-dark text-xs">Sistema funcionando</Text>
          </View>

          <View className="flex-1 bg-surface dark:bg-surface-dark p-3 rounded-lg border border-warning dark:border-warning-dark">
            <View className="flex-row items-center gap-2 mb-1">
              <View className="w-2 h-2 bg-warning dark:bg-warning-dark rounded-full" />
              <Text className="text-warning dark:text-warning-dark font-semibold text-sm">
                Atenção
              </Text>
            </View>
            <Text className="text-text-muted dark:text-text-muted-dark text-xs">Verificar logs</Text>
          </View>

          <View className="flex-1 bg-surface dark:bg-surface-dark p-3 rounded-lg border border-error dark:border-error-dark">
            <View className="flex-row items-center gap-2 mb-1">
              <View className="w-2 h-2 bg-error dark:bg-error-dark rounded-full" />
              <Text className="text-error dark:text-error-dark font-semibold text-sm">Erro</Text>
            </View>
            <Text className="text-text-muted dark:text-text-muted-dark text-xs">Falha na conexão</Text>
          </View>
        </View>

        {/* Toggle Theme Button */}
        <TouchableOpacity
          onPress={toggleTheme}
          className="bg-accent dark:bg-accent-dark p-4 rounded-xl flex-row items-center justify-center gap-3 mb-4"
        >
          <MaterialIcons name="palette" size={24} color="white" />
          <Text className="text-white text-lg font-semibold">
            Alternar para Tema {isDarkMode ? "Claro" : "Escuro"}
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
