// import React from 'react';
// import { Link } from 'expo-router';
// import { StyleSheet, View ,Image,Text,TouchableOpacity} from 'react-native';

// const Welcome = () => {
//     return (
//         <View style={styles.container}>
//             <Image source={require('../../assets/images/01.jpeg')} style={styles.logo}/>
//              <Text style={styles.title}>Get things done.</Text>
//       <Text style={styles.subtitle}>Just a click away from planning your tasks.</Text>
//       <TouchableOpacity style={styles.button}>
//         <Link href="/(auth)/login1" style={styles.buttonText}>
//         <Text >Getting started</Text>
//           →
//         </Link>
//       </TouchableOpacity>
//         </View>
//     );

// }

// const styles = StyleSheet.create({
//     container:{
//         flex:1,
//         justifyContent:'center',
//         alignItems:'center',
//         padding:20,
//     },
//     logo: { width: 320, height: 320, marginBottom: 30 },
//     title: { fontSize: 44, fontWeight: "bold" },
//   subtitle: { fontSize: 26, textAlign: "center", marginBottom: 40 },
//   button: {
//     backgroundColor: "#5C6EF8",
//     borderRadius: 50,
//     padding: 30,
//   },
//   buttonText: {
//     color: "#fff",
//     fontSize: 24,
//   },
// })

// export default Welcome;

import React from 'react';
import { Link } from 'expo-router';
import { StyleSheet, View, Image, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from "@expo/vector-icons";

/**
 * Improved onboarding UI inspired by image2:
 * - Big checkmark logo with pastel circle
 * - Large, bold title and subtitle
 * - Rounded "Getting started" button with icon
 * - Colors, spacing, hierarchy match sample design
 */

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