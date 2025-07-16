
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { useForm, Controller } from "react-hook-form";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db, auth } from "../../firebase/config";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import DateTimePicker from "@react-native-community/datetimepicker";
import { onAuthStateChanged } from "firebase/auth";
import { Ionicons } from "@expo/vector-icons";


export default function AddTaskScreen() {
  const { control, handleSubmit, setValue, watch } = useForm();
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [userId, setUserId] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) setUserId(user.uid);
      else router.replace("/(auth)/login1");
    });
    return unsubscribe;
  }, []);

  const onSubmit = async (data) => {
    if (!userId) return;

    try {
      await addDoc(collection(db, "tasks"), {
        userId,
        title: data.title,
        description: data.description || "",
        dueDate: data.dueDate,
        priority: data.priority || "medium",
        completed: false,
        createdAt: serverTimestamp(),
      });
      router.replace("/(tabs)");
    } catch (error) {
      Alert.alert("Error", "Failed to create task: " + error.message);
    }
  };

  return (
    <View style={styles.background}>
      <View style={styles.card}>
        <View style={styles.headerIcon}>
          <Ionicons name="add-circle" size={40} color="#5C6EF8" />
        </View>
        <Text style={styles.heading}>New Task</Text>

        <Controller
          name="title"
          control={control}
          rules={{ required: true }}
          render={({ field: { onChange, value } }) => (
            <TextInput
              placeholder="Title"
              style={styles.input}
              value={value}
              onChangeText={onChange}
            />
          )}
        />

        <Controller
          name="description"
          control={control}
          render={({ field: { onChange, value } }) => (
            <TextInput
              placeholder="Description (optional)"
              style={[styles.input, { height: 80 }]}
              multiline
              value={value}
              onChangeText={onChange}
            />
          )}
        />

        <TouchableOpacity
          onPress={() => setShowDatePicker(true)}
          style={styles.input}
        >
          <Text style={{ color: "#888" }}>
            {watch("dueDate")
              ? new Date(watch("dueDate")).toDateString()
              : "Select Due Date"}
          </Text>
        </TouchableOpacity>

        {showDatePicker && (
          <DateTimePicker
            mode="date"
            value={new Date()}
            onChange={(e, selectedDate) => {
              setShowDatePicker(false);
              if (selectedDate) setValue("dueDate", selectedDate.toISOString());
            }}
          />
        )}

        <Controller
          name="priority"
          control={control}
          defaultValue="medium"
          render={({ field: { onChange, value } }) => (
            <View style={styles.priorityRow}>
              {["low", "medium", "high"].map((level) => (
                <TouchableOpacity
                  key={level}
                  style={[
                    styles.priorityChip,
                    value === level && styles.selectedPriorityChip,
                    { backgroundColor: value === level ? priorityColors[level] : "#F5F7FF" }
                  ]}
                  onPress={() => onChange(level)}
                >
                  <Text
                    style={{
                      color: value === level ? "#fff" : priorityColors[level],
                      fontWeight: "bold",
                      fontSize: 15,
                    }}
                  >
                    {level.charAt(0).toUpperCase() + level.slice(1)}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          )}
        />

        <TouchableOpacity style={styles.button} onPress={handleSubmit(onSubmit)}>
          <Text style={styles.buttonText}>Add Task</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const priorityColors = {
  low: "#4CAF50",
  medium: "#FFC107",
  high: "#F44336",
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: "#F5F7FF",
    justifyContent: "center",
    alignItems: "center",
    padding: 18,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 24,
    padding: 26,
    width: "100%",
    maxWidth: 400,
    shadowColor: "#BDBDBD",
    shadowOpacity: 0.18,
    shadowRadius: 12,
    elevation: 8,
    alignItems: "center",
  },
  headerIcon: {
    backgroundColor: "#EEF0FF",
    borderRadius: 20,
    padding: 7,
    marginBottom: 7,
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#5C6EF8",
    marginBottom: 22,
    letterSpacing: 0.3,
  },
  input: {
    backgroundColor: "#F5F7FF",
    borderRadius: 14,
    padding: 15,
    marginBottom: 18,
    fontSize: 16,
    width: "100%",
    color: "#333",
  },
  button: {
    backgroundColor: "#5C6EF8",
    paddingVertical: 16,
    borderRadius: 16,
    marginTop: 10,
    width: "100%",
    shadowColor: "#5C6EF8",
    shadowOpacity: 0.13,
    shadowRadius: 8,
  },
  buttonText: { color: "#fff", fontWeight: "bold", textAlign: "center", fontSize: 17 },
  priorityRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 18,
    width: "100%",
    gap: 8,
  },
  priorityChip: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 13,
    borderWidth: 1,
    borderColor: "#EEF0FF",
    alignItems: "center",
    marginHorizontal: 2,
    marginVertical: 2,
  },
  selectedPriorityChip: {
    borderColor: "#5C6EF8",
    shadowColor: "#5C6EF8",
    shadowOpacity: 0.14,
    shadowRadius: 6,
  },
});
