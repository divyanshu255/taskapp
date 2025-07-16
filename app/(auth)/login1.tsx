
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert } from "react-native";
import { useForm, Controller } from "react-hook-form";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase/config";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";



export default function LoginScreen() {
  const { control, handleSubmit } = useForm();
  const router = useRouter();

  const onSubmit = async (data) => {
    try {
      await signInWithEmailAndPassword(auth, data.email, data.password);
      router.replace("../(tabs)");
    } catch (error) {
      Alert.alert("Login Failed", error.message);
    }
  };

  return (
    <View style={styles.background}>
      {/* Logo and Welcome */}
      <View style={styles.logoCard}>
        <View style={styles.logoCircle}>
          <Ionicons name="checkmark" size={36} color="#fff" />
        </View>
        <Text style={styles.welcome}>Welcome back!</Text>
      
      </View>

      <View style={styles.card}>
        <Controller
          name="email"
          control={control}
          rules={{ required: true }}
          render={({ field: { onChange, value } }) => (
            <TextInput
              placeholder="Email Address"
              style={styles.input}
              value={value}
              onChangeText={onChange}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          )}
        />

        <Controller
          name="password"
          control={control}
          rules={{ required: true }}
          render={({ field: { onChange, value } }) => (
            <TextInput
              placeholder="Password"
              style={styles.input}
              secureTextEntry
              value={value}
              onChangeText={onChange}
            />
          )}
        />

        <TouchableOpacity style={styles.button} onPress={handleSubmit(onSubmit)}>
          <Text style={styles.buttonText}>Log in</Text>
        </TouchableOpacity>

      
        
      </View>

      <Text style={styles.footer}>
        Don’t have an account?{" "}
        <Text style={styles.link} onPress={() => router.push("/(auth)/register")}>
          Get started!
        </Text>
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: "#F5F7FF",
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
  },
  logoCard: {
    alignItems: "center",
    marginBottom: 18,
  },
  logoCircle: {
    backgroundColor: "#5C6EF8",
    borderRadius: 24,
    width: 58,
    height: 58,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16,
    shadowColor: "#5C6EF8",
    shadowOpacity: 0.15,
    shadowRadius: 8,
  },
  welcome: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#222",
    marginBottom: 4,
    letterSpacing: 0.2,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 22,
    padding: 22,
    width: "100%",
    maxWidth: 370,
    shadowColor: "#BDBDBD",
    shadowOpacity: 0.17,
    shadowRadius: 10,
    marginBottom: 16,
    elevation: 7,
  },
  input: {
    backgroundColor: "#F1F1F1",
    padding: 13,
    marginBottom: 13,
    borderRadius: 12,
    fontSize: 15,
    color: "#222",
  },
  button: {
    backgroundColor: "#5C6EF8",
    padding: 15,
    borderRadius: 13,
    marginTop: 4,
    marginBottom: 18,
    shadowColor: "#5C6EF8",
    shadowOpacity: 0.13,
    shadowRadius: 5,
  },
  buttonText: { color: "#fff", textAlign: "center", fontSize: 16, fontWeight: "bold" },
  footer: {
    width:"100%",
    marginTop: 2,
    fontSize: 15,
    color: "#666",
    textAlign: "center",
    paddingHorizontal: 10, 
    alignSelf: "center",   
  },
  link: {
    color: "#5C6EF8",
    fontWeight: "bold",
  },
});
