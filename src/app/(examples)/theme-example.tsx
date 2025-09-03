import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, useColorScheme } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function ThemeExample() {
  const colorScheme = useColorScheme();
  const [isDarkMode, setIsDarkMode] = useState(colorScheme === 'dark');

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <SafeAreaView className={`flex-1 ${isDarkMode ? 'dark' : ''} bg-background`}>
      <ScrollView className="flex-1 p-4">
        <View className="flex-row justify-between items-center mb-6">
          <Text className={`text-2xl font-bold ${isDarkMode ? 'text-text-base' : 'text-text-base'}`}>
            Paleta de Cores NativeNews
          </Text>
          <TouchableOpacity 
            onPress={toggleTheme}
            className={`px-4 py-2 rounded-full ${isDarkMode ? 'bg-primary' : 'bg-primary'}`}
          >
            <Text className="text-white font-medium">
              {isDarkMode ? 'Tema Claro' : 'Tema Escuro'}
            </Text>
          </TouchableOpacity>
        </View>
        
        {/* Cores principais */}
        <Text className={`text-lg font-semibold mb-2 ${isDarkMode ? 'text-text-base' : 'text-text-base'}`}>
          Cores Principais
        </Text>
        <View className="flex-row flex-wrap gap-2 mb-6">
          <ColorBox name="Primary" colorClass={`bg-primary`} textClass="text-white" />
          <ColorBox name="Secondary" colorClass={`bg-secondary`} textClass="text-white" />
          <ColorBox name="Accent" colorClass={`bg-accent`} textClass={isDarkMode ? 'text-text-base' : 'text-white'} />
        </View>
        
        {/* Cores neutras */}
        <Text className={`text-lg font-semibold mb-2 ${isDarkMode ? 'text-text-base' : 'text-text-base'}`}>
          Cores Neutras
        </Text>
        <View className="flex-row flex-wrap gap-2 mb-6">
          <ColorBox name="Background" colorClass={`bg-background`} textClass={isDarkMode ? 'text-text-base' : 'text-text-base'} />
          <ColorBox name="Surface" colorClass={`bg-surface`} textClass={isDarkMode ? 'text-text-base' : 'text-text-base'} />
          <ColorBox name="Text Base" colorClass={`bg-text-base`} textClass={isDarkMode ? 'text-white' : 'text-white'} />
          <ColorBox name="Text Muted" colorClass={`bg-text-muted`} textClass="text-white" />
        </View>
        
        {/* Cores de feedback */}
        <Text className={`text-lg font-semibold mb-2 ${isDarkMode ? 'text-text-base' : 'text-text-base'}`}>
          Cores de Feedback
        </Text>
        <View className="flex-row flex-wrap gap-2 mb-6">
          <ColorBox name="Success" colorClass={`bg-success`} textClass="text-white" />
          <ColorBox name="Warning" colorClass={`bg-warning`} textClass={isDarkMode ? 'text-text-base' : 'text-text-base'} />
          <ColorBox name="Error" colorClass={`bg-error`} textClass="text-white" />
        </View>
        
        {/* Tons de cinza */}
        <Text className={`text-lg font-semibold mb-2 ${isDarkMode ? 'text-text-base' : 'text-text-base'}`}>
          Tons de Cinza
        </Text>
        <View className="flex-row flex-wrap gap-2 mb-6">
          <ColorBox name="Gray 50" colorClass={`bg-gray-50`} textClass={isDarkMode ? 'text-text-base' : 'text-text-base'} />
          <ColorBox name="Gray 100" colorClass={`bg-gray-100`} textClass={isDarkMode ? 'text-text-base' : 'text-text-base'} />
          <ColorBox name="Gray 200" colorClass={`bg-gray-200`} textClass={isDarkMode ? 'text-text-base' : 'text-text-base'} />
          <ColorBox name="Gray 300" colorClass={`bg-gray-300`} textClass={isDarkMode ? 'text-text-base' : 'text-text-base'} />
          <ColorBox name="Gray 400" colorClass={`bg-gray-400`} textClass={isDarkMode ? 'text-text-base' : 'text-text-base'} />
          <ColorBox name="Gray 500" colorClass={`bg-gray-500`} textClass="text-white" />
          <ColorBox name="Gray 600" colorClass={`bg-gray-600`} textClass="text-white" />
          <ColorBox name="Gray 700" colorClass={`bg-gray-700`} textClass="text-white" />
          <ColorBox name="Gray 800" colorClass={`bg-gray-800`} textClass="text-white" />
          <ColorBox name="Gray 900" colorClass={`bg-gray-900`} textClass="text-white" />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

type ColorBoxProps = {
  name: string;
  colorClass: string;
  textClass: string;
};

function ColorBox({ name, colorClass, textClass }: ColorBoxProps) {
  return (
    <View className={`w-24 h-24 rounded-lg ${colorClass} justify-center items-center shadow-md`}>
      <Text className={`font-medium ${textClass}`}>{name}</Text>
    </View>
  );
}