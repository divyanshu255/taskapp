// import React from 'react';
// import { StyleSheet, View,Text, TextInput ,Alert,TouchableOpacity} from 'react-native';
// import {useForm,Controller} from "react-hook-form";
// import { createUserWithEmailAndPassword } from "firebase/auth";
// import { auth } from "../../firebase/config.js";
// import { useRouter } from "expo-router";

// const Login = () => {
//     const { control, handleSubmit } = useForm();
//   const router = useRouter();
//  const onSubmit = async (data: any) => {
//     try {
//       await createUserWithEmailAndPassword(auth, data.email, data.password);
//       router.replace("../(tabs)");
//     } catch (error: any) {
//         console.log(error.message);
        
//       Alert.alert("Registration Failed", error.message);
//     }
//   };



//     return (
//         <View style={styles.container}>
//             <Text style={styles.title}> Login Screen </Text>
//           <Controller
//           name='email'
//           control={control}
//           rules={{required:true}}
//           render={({field:{onChange,value}})=>(
//             <TextInput placeholder='Email Address'
//             style={styles.input}
//             value={value}
//             onChangeText={onChange}/>
//           )



//           }
          
          
          
//           >

//           </Controller>
//           <Controller
//         name="password"
//         control={control}
//         rules={{ required: true }}
//         render={({ field: { onChange, value } }) => (
//           <TextInput placeholder="Password" style={styles.input} secureTextEntry value={value} onChangeText={onChange} />
//         )}
//       />
//       <TouchableOpacity style={styles.button} onPress={handleSubmit(onSubmit)}>
//         <Text style={styles.buttonText}>Sign Up</Text>
//       </TouchableOpacity>

//       <Text style={{ marginTop: 20 }}>
//         Already have an account? <Text style={{ color: "#5C6EF8" }} onPress={() => router.push("./login1")}>Log in</Text>
//       </Text>

//         </View>
//     );
// }

// const styles = StyleSheet.create({
//     container: { flex: 1, justifyContent: "center", padding: 20 },
//   title: { fontSize: 22, fontWeight: "bold", marginBottom: 30 },
//   input: { backgroundColor: "#F1F1F1", padding: 12, marginBottom: 15, borderRadius: 8 },
//   button: { backgroundColor: "#5C6EF8", padding: 15, borderRadius: 8 },
//   buttonText: { color: "#fff", textAlign: "center", fontSize: 16 },
// })

// export default Login;



import React from 'react';
import { StyleSheet, View, Text, TextInput, Alert, TouchableOpacity } from 'react-native';
import { useForm, Controller } from "react-hook-form";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase/config.js";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

/**
 * Improved UI inspired by image2:
 * - Large logo with pastel circle
 * - Card layout for form with soft shadow and rounded corners
 * - Bigger, more rounded input fields and button
 * - Social login icons row (UI only)
 * - Clean hierarchy, centered text and prompts
 */

const RegisterScreen = () => {
  const { control, handleSubmit } = useForm();
  const router = useRouter();

  const onSubmit = async (data) => {
    try {
      await createUserWithEmailAndPassword(auth, data.email, data.password);
      router.replace("../(tabs)");
    } catch (error) {
      Alert.alert("Registration Failed", error.message);
    }
  };

  return (
    <View style={styles.background}>
      {/* Logo and Welcome */}
      <View style={styles.logoCard}>
        <View style={styles.logoCircle}>
          <Ionicons name="checkmark" size={36} color="#fff" />
        </View>
        <Text style={styles.welcome}>Let's get started!</Text>
        
      </View>

      {/* Registration Form Card */}
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
          <Text style={styles.buttonText}>Sign Up</Text>
        </TouchableOpacity>

        
      </View>

      {/* Login prompt */}
      <Text style={styles.footer}>
        Already have an account?{" "}
        <Text style={styles.link} onPress={() => router.push("./login1")}>
          Log in
        </Text>
      </Text>
    </View>
  );
};

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
  subtitle: {
    fontSize: 15,
    color: "#666",
    marginBottom: 6,
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
  socialRow: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 2,
    marginBottom: 2,
  },
  socialBtn: {
    backgroundColor: "#F1F1F1",
    borderRadius: 17,
    padding: 10,
    margin: 7,
    alignItems: "center",
    justifyContent: "center",
    width: 40,
    height: 40,
  },
  footer: {
    width:"100%",
    marginTop: 2,
    fontSize: 15,
    color: "#666",
    textAlign: "center",
  },
  link: {
    color: "#5C6EF8",
    fontWeight: "bold",
  },
});

export default RegisterScreen;