import { AntDesign } from "@expo/vector-icons";
import { Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useThemeContext } from "@/context/themeContext";

export default function Home() {
  const { isDarkMode } = useThemeContext();

  const studyTopics = [
    { id: 1, title: "Mathematics", icon: "plus" },
    { id: 2, title: "Science", icon: "plus" },
    { id: 3, title: "History", icon: "plus" },
    { id: 4, title: "Languages", icon: "plus" },
    { id: 5, title: "Tema", icon: "plus" },
  ];

  return (
    <SafeAreaView className="flex-1 bg-background dark:bg-background-dark">
      <View className="p-5 bg-background dark:bg-background-dark border-b border-border dark:border-border-dark flex-row justify-between items-center">
        <View>
          <Text className="text-base text-text-muted dark:text-text-muted-dark mb-1">
            Hello, Student!
          </Text>
          <Text className="text-2xl font-bold text-text-base dark:text-text-base-dark mb-1">
            Welcome Back
          </Text>
          <Text className="text-base text-text-muted dark:text-text-muted-dark">
            What would you like to study today?
          </Text>
        </View>
        <TouchableOpacity className="w-10 h-10 rounded-full bg-input dark:bg-input-dark items-center justify-center">
          <AntDesign
            name="user"
            size={24}
            color={isDarkMode ? "#FFFFFF" : "#000000"}
          />
        </TouchableOpacity>
      </View>
      <View className="flex-1 p-5">
        <View className="flex-row flex-wrap justify-between gap-4">
          {studyTopics.map((topic) => (
            <TouchableOpacity
              key={topic.id}
              className="w-[47%] bg-surface dark:bg-surface-dark p-4 rounded-xl shadow-sm border border-border dark:border-border-dark"
            >
              <View className="w-12 h-12 rounded-full bg-primary dark:bg-primary-dark items-center justify-center mb-3">
                <AntDesign name={topic.icon} size={24} color="#fff" />
              </View>
              <Text className="text-base font-semibold text-text-base dark:text-text-base-dark">
                {topic.title}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </SafeAreaView>
  );
}
