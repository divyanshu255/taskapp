

import React from 'react';
import { Link } from 'expo-router';
import { StyleSheet, View, Image, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from "@expo/vector-icons";



const WelcomeScreen = () => {
  return (
    <View style={styles.background}>
      {/* Logo */}
      <View style={styles.logoCircle}>
        <Ionicons name="checkmark" size={56} color="#fff" />
      </View>
      <Text style={styles.title}>Get things done.</Text>
      <Text style={styles.subtitle}>Just a click away from planning your tasks.</Text>
      <TouchableOpacity style={styles.button}>
        <Link href="/(auth)/login1" style={styles.buttonText} asChild>
          <Text style={styles.buttonText}>
            Getting started <Ionicons name="arrow-forward" size={24} color="#fff" />
          </Text>
        </Link>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: "#F5F7FF",
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
  },
  logoCircle: {
    backgroundColor: "#5C6EF8",
    width: 120,
    height: 120,
    borderRadius: 60,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 38,
    shadowColor: "#5C6EF8",
    shadowOpacity: 0.13,
    shadowRadius: 14,
  },
  title: {
    fontSize: 36,
    fontWeight: "bold",
    color: "#222",
    marginBottom: 6,
    letterSpacing: 0.3,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 20,
    color: "#666",
    textAlign: "center",
    marginBottom: 40,
    marginHorizontal: 12,
  },
  button: {
    backgroundColor: "#5C6EF8",
    borderRadius: 50,
    paddingVertical: 18,
    paddingHorizontal: 44,
    alignItems: "center",
    flexDirection: "row",
    shadowColor: "#5C6EF8",
    shadowOpacity: 0.13,
    shadowRadius: 8,
  },
  buttonText: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    flexDirection: "row",
    alignItems: "center",
  },
});

export default WelcomeScreen;
