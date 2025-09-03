import useAuth from "@/app/hooks/useAuth";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function ProfileUser() {
  const router = useRouter();
  const { logout } = useAuth();

  const handleLogout = async () => {
    await logout();
    router.replace("/(auth)/sign-in");
    alert("User logged out successfully");
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name='arrow-back' size={24} color='#000' />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Profile</Text>
      </View>

      <View style={styles.profileSection}>
        <Image source={{ uri: "https://via.placeholder.com/150" }} style={styles.profileImage} />
        <Text style={styles.userName}>John Doe</Text>
        <Text style={styles.userEmail}>john.doe@example.com</Text>
      </View>

      <View style={styles.infoSection}>
        <TouchableOpacity style={styles.infoItem}>
          <Ionicons name='person-outline' size={24} color='#666' />
          <Text style={styles.infoText}>Edit Profile</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.infoItem}>
          <Ionicons name='settings-outline' size={24} color='#666' />
          <Text style={styles.infoText}>Settings</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.infoItem}>
          <Ionicons name='help-circle-outline' size={24} color='#666' />
          <Text style={styles.infoText}>Help & Support</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.infoItem, styles.logoutButton]} onPress={handleLogout}>
          <Ionicons name='log-out-outline' size={24} color='#FF4444' />
          <Text style={[styles.infoText, styles.logoutText]}>Logout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginLeft: 16,
  },
  profileSection: {
    alignItems: "center",
    padding: 20,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 16,
  },
  userName: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 8,
  },
  userEmail: {
    fontSize: 16,
    color: "#666",
  },
  infoSection: {
    padding: 20,
  },
  infoItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  infoText: {
    fontSize: 16,
    marginLeft: 16,
    color: "#333",
  },
  logoutButton: {
    marginTop: 20,
    borderBottomWidth: 0,
  },
  logoutText: {
    color: "#FF4444",
  },
});
