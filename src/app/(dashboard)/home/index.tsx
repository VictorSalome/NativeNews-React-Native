import { Feather } from "@expo/vector-icons";
import { router } from "expo-router";
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { AppRoutes } from "../../../routes/appRoutes";

export default function Home() {
  const studyTopics = [
    { id: 1, title: "Mathematics", icon: "plus" },
    { id: 2, title: "Science", icon: "flask" },
    { id: 3, title: "History", icon: "book" },
    { id: 4, title: "Languages", icon: "message-circle" },
    { id: 5, title: "Tema", icon: "eye" },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>Hello, Student!</Text>
          <Text style={styles.title}>Welcome Back</Text>
          <Text style={styles.subtitle}>What would you like to study today?</Text>
        </View>
        <TouchableOpacity style={styles.profileButton}>
          <Feather name='user' size={24} color='#333' />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.topicsGrid}>
          {studyTopics.map(topic => (
            <TouchableOpacity
              key={topic.id}
              style={styles.topicCard}
              onPress={() => {
                if (topic.title === "Tema") {
                  router.push(AppRoutes.ThemeExample);
                }
              }}
            >
              <View style={styles.iconContainer}>
                <Feather name={topic.icon} size={24} color='#fff' />
              </View>
              <Text style={styles.topicTitle}>{topic.title}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  header: {
    padding: 20,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  greeting: {
    fontSize: 16,
    color: "#666",
    marginBottom: 4,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    color: "#666",
  },
  profileButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#f0f0f0",
    alignItems: "center",
    justifyContent: "center",
  },
  content: {
    flex: 1,
    padding: 20,
  },
  topicsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    gap: 16,
  },
  topicCard: {
    width: "47%",
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#6366f1",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 12,
  },
  topicTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
  },
});
