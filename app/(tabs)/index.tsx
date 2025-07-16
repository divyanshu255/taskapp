// import { useEffect, useState } from "react";
// import {
//   View,
//   Text,
//   FlatList,
//   TouchableOpacity,
//   StyleSheet,
//   ActivityIndicator,
//   Alert,
// } from "react-native";
// import {
//   collection,
//   query,
//   where,
//   getDocs,
//   orderBy,
//   doc,
//   updateDoc,
//   deleteDoc,
// } from "firebase/firestore";
// import { onAuthStateChanged } from "firebase/auth";
// import { db, auth } from "../../firebase/config";
// import { useRouter } from "expo-router";
// import { Ionicons, MaterialIcons } from "@expo/vector-icons";

// export default function HomeScreen() {
//   const [tasks, setTasks] = useState([]);
//   const [userId, setUserId] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [filter, setFilter] = useState({ status: "all", priority: "all" });
//   const router = useRouter();

//   useEffect(() => {
//     const unsubscribe = onAuthStateChanged(auth, async (user) => {
//       if (user) {
//         setUserId(user.uid);
//         await fetchTasks(user.uid);
//       } else {
//         router.replace("../(auth)/login1");
//       }
//     });
//     return unsubscribe;
//   }, [filter]);

//   const fetchTasks = async (uid) => {
//     setLoading(true);
//     try {
//       const q = query(
//         collection(db, "tasks"),
//         where("userId", "==", uid),
//         orderBy("dueDate", "asc")
//       );
//       const querySnapshot = await getDocs(q);
//       let taskList = querySnapshot.docs.map((doc) => ({
//         id: doc.id,
//         ...doc.data(),
//       }));

//       // Apply filters
//       if (filter.status !== "all") {
//         const completed = filter.status === "completed";
//         taskList = taskList.filter((task) => task.completed === completed);
//       }
//       if (filter.priority !== "all") {
//         taskList = taskList.filter((task) => task.priority === filter.priority);
//       }

//       setTasks(taskList);
//     } catch (error) {
//       console.error("Error fetching tasks:", error);
//     }
//     setLoading(false);
//   };

//   const toggleComplete = async (taskId, currentStatus) => {
//     try {
//       await updateDoc(doc(db, "tasks", taskId), {
//         completed: !currentStatus,
//       });
//       fetchTasks(userId);
//     } catch (error) {
//       Alert.alert("Error", "Failed to update task status.");
//     }
//   };

//   const deleteTask = async (taskId) => {
//     Alert.alert("Delete Task", "Are you sure?", [
//       { text: "Cancel" },
//       {
//         text: "Delete",
//         style: "destructive",
//         onPress: async () => {
//           try {
//             await deleteDoc(doc(db, "tasks", taskId));
//             fetchTasks(userId);
//           } catch (error) {
//             Alert.alert("Error", "Failed to delete task.");
//           }
//         },
//       },
//     ]);
//   };

//   const renderTask = ({ item }) => (
//     <View style={[styles.task, item.completed && styles.completedTask]}>
//       <TouchableOpacity onPress={() => toggleComplete(item.id, item.completed)}>
//         <Ionicons
//           name={item.completed ? "checkbox" : "square-outline"}
//           size={24}
//           color={item.completed ? "#4CAF50" : "#999"}
//         />
//       </TouchableOpacity>
//       <View style={{ flex: 1, marginLeft: 10 }}>
//         <Text style={styles.title}>{item.title}</Text>
//         <Text style={styles.sub}>
//           {item.priority?.toUpperCase()} •{" "}
//           {new Date(item.dueDate).toLocaleDateString()}
//         </Text>
//       </View>
//       <TouchableOpacity onPress={() => deleteTask(item.id)}>
//         <MaterialIcons name="delete" size={24} color="#f44336" />
//       </TouchableOpacity>
//     </View>
//   );

//   if (loading) {
//     return (
//       <View style={styles.center}>
//         <ActivityIndicator size="large" color="#5C6EF8" />
//       </View>
//     );
//   }

//   return (
//     <View style={styles.container}>
//       {/* Filter Controls */}
//       <View style={styles.filters}>
//         {["all", "completed", "incomplete"].map((status) => (
//           <TouchableOpacity
//             key={status}
//             style={[
//               styles.filterBtn,
//               filter.status === status && styles.selectedBtn,
//             ]}
//             onPress={() => setFilter({ ...filter, status })}
//           >
//             <Text
//               style={{
//                 color: filter.status === status ? "#fff" : "#5C6EF8",
//                 fontWeight: "bold",
//               }}
//             >
//               {status.toUpperCase()}
//             </Text>
//           </TouchableOpacity>
//         ))}
//       </View>
//       <View style={styles.filters}>
//         {["all", "low", "medium", "high"].map((priority) => (
//           <TouchableOpacity
//             key={priority}
//             style={[
//               styles.filterBtn,
//               filter.priority === priority && styles.selectedBtn,
//             ]}
//             onPress={() => setFilter({ ...filter, priority })}
//           >
//             <Text
//               style={{
//                 color: filter.priority === priority ? "#fff" : "#5C6EF8",
//                 fontWeight: "bold",
//               }}
//             >
//               {priority.toUpperCase()}
//             </Text>
//           </TouchableOpacity>
//         ))}
//       </View>

//       {/* Task List */}
//       <FlatList
//         data={tasks}
//         keyExtractor={(item) => item.id}
//         ListEmptyComponent={
//           <Text style={styles.empty}>No tasks found for selected filter.</Text>
//         }
//         renderItem={renderTask}
//         contentContainerStyle={{ paddingBottom: 100 }}
//       />

//       {/* Add Task FAB */}
//       <TouchableOpacity
//         style={styles.fab}
//         onPress={() => router.push("/add-task")}
//       >
//         <Ionicons name="add" size={28} color="#fff" />
//       </TouchableOpacity>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: { flex: 1, padding: 20 },
//   task: {
//     flexDirection: "row",
//     alignItems: "center",
//     padding: 16,
//     backgroundColor: "#fff",
//     borderRadius: 10,
//     marginBottom: 12,
//     borderLeftWidth: 4,
//     borderLeftColor: "#5C6EF8",
//   },
//   completedTask: {
//     backgroundColor: "#e0e0e0",
//     borderLeftColor: "#4CAF50",
//   },
//   title: { fontSize: 16, fontWeight: "bold" },
//   sub: { fontSize: 14, color: "#555" },
//   fab: {
//     position: "absolute",
//     right: 20,
//     bottom: 30,
//     backgroundColor: "#5C6EF8",
//     borderRadius: 50,
//     padding: 16,
//     elevation: 4,
//   },
//   center: { flex: 1, justifyContent: "center", alignItems: "center" },
//   empty: {
//     textAlign: "center",
//     marginTop: 100,
//     fontSize: 16,
//     color: "#888",
//   },
//   filters: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     marginBottom: 12,
//   },
//   filterBtn: {
//     flex: 1,
//     paddingVertical: 10,
//     marginHorizontal: 4,
//     borderRadius: 6,
//     borderWidth: 1,
//     borderColor: "#5C6EF8",
//     alignItems: "center",
//   },
//   selectedBtn: {
//     backgroundColor: "#5C6EF8",
//   },
// });
import { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Alert,
  TextInput,
} from "react-native";
import {
  collection,
  query,
  where,
  getDocs,
  orderBy,
  doc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { db, auth } from "../../firebase/config";
import { useRouter } from "expo-router";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";

/**
 * Improved UI inspired by image1
 * - Modern card layout
 * - Day sections: Today, Tomorrow, This week
 * - Colorful category chips
 * - Soft shadows, rounded corners, pastel palette
 * - Floating bottom navigation
 * - Search bar and header
 */

const getDaySection = (dueDate) => {
  // Helper to categorize by Today, Tomorrow, This week
  const now = new Date();
  const date = new Date(dueDate);
  const diff = (date - now) / (1000 * 60 * 60 * 24);
  if (date.toDateString() === now.toDateString()) return "Today";
  else if (diff < 2 && diff > 0) return "Tomorrow";
  else return "This week";
};

export default function HomeScreen() {
  const [tasks, setTasks] = useState([]);
  const [userId, setUserId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState({ status: "all", priority: "all" });
  const [search, setSearch] = useState(""); // Search bar
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUserId(user.uid);
        await fetchTasks(user.uid);
      } else {
        router.replace("../(auth)/login1");
      }
    });
    return unsubscribe;
  }, [filter]);

  const fetchTasks = async (uid) => {
    setLoading(true);
    try {
      const q = query(
        collection(db, "tasks"),
        where("userId", "==", uid),
        orderBy("dueDate", "asc")
      );
      const querySnapshot = await getDocs(q);
      let taskList = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      // Apply filters
      if (filter.status !== "all") {
        const completed = filter.status === "completed";
        taskList = taskList.filter((task) => task.completed === completed);
      }
      if (filter.priority !== "all") {
        taskList = taskList.filter((task) => task.priority === filter.priority);
      }
      if (search.trim()) {
        taskList = taskList.filter((task) =>
          task.title.toLowerCase().includes(search.trim().toLowerCase())
        );
      }

      setTasks(taskList);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
    setLoading(false);
  };

  const toggleComplete = async (taskId, currentStatus) => {
    try {
      await updateDoc(doc(db, "tasks", taskId), {
        completed: !currentStatus,
      });
      fetchTasks(userId);
    } catch (error) {
      Alert.alert("Error", "Failed to update task status.");
    }
  };

  const deleteTask = async (taskId) => {
    Alert.alert("Delete Task", "Are you sure?", [
      { text: "Cancel" },
      {
        text: "Delete",
        style: "destructive",
        onPress: async () => {
          try {
            await deleteDoc(doc(db, "tasks", taskId));
            fetchTasks(userId);
          } catch (error) {
            Alert.alert("Error", "Failed to delete task.");
          }
        },
      },
    ]);
  };

  // Group tasks by section
  const grouped = tasks.reduce((acc, task) => {
    const section = getDaySection(task.dueDate);
    if (!acc[section]) acc[section] = [];
    acc[section].push(task);
    return acc;
  }, {});

  const renderTask = ({ item }) => (
    <View style={[styles.task, item.completed && styles.completedTask]}>
      <TouchableOpacity onPress={() => toggleComplete(item.id, item.completed)}>
        <Ionicons
          name={item.completed ? "checkbox" : "square-outline"}
          size={22}
          color={item.completed ? "#4CAF50" : "#BDBDBD"}
        />
      </TouchableOpacity>
      <View style={{ flex: 1, marginLeft: 10 }}>
        <Text style={[styles.title, item.completed && { textDecorationLine: "line-through", color: "#BDBDBD" }]}>{item.title}</Text>
        <Text style={styles.sub}>
          {new Date(item.dueDate).toLocaleDateString()}
        </Text>
      </View>
      <View style={styles.chipRow}>
        {item.category && (
          <View style={[styles.chip, chipColors[item.category] || styles.chipDefault]}>
            <Text style={styles.chipText}>{item.category}</Text>
          </View>
        )}
        {item.priority && (
          <View style={[styles.chip, chipColors[item.priority] || styles.chipDefault]}>
            <Text style={styles.chipText}>{item.priority}</Text>
          </View>
        )}
        <TouchableOpacity style={{ marginLeft: 6 }} onPress={() => deleteTask(item.id)}>
          <MaterialIcons name="delete" size={20} color="#f44336" />
        </TouchableOpacity>
      </View>
    </View>
  );

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#5C6EF8" />
      </View>
    );
  }

  // Render grouped sections
  const sections = ["Today", "Tomorrow", "This week"];
  return (
    <View style={styles.screen}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>My tasks</Text>
        <Ionicons name="grid-outline" size={28} color="#fff" />
      </View>
      {/* Search bar */}
      <View style={styles.searchBar}>
        <Ionicons name="search" size={20} color="#BDBDBD" style={{ marginRight: 8 }} />
        <TextInput
          placeholder="Search tasks"
          style={styles.searchInput}
          value={search}
          onChangeText={setSearch}
          onSubmitEditing={() => fetchTasks(userId)}
        />
      </View>
      {/* Filters */}
      <View style={styles.filters}>
        {["all", "completed", "incomplete"].map((status) => (
          <TouchableOpacity
            key={status}
            style={[
              styles.filterBtn,
              filter.status === status && styles.selectedBtn,
            ]}
            onPress={() => setFilter({ ...filter, status })}
          >
            <Text
              style={{
                color: filter.status === status ? "#fff" : "#5C6EF8",
                fontWeight: "bold",
                fontSize: 13,
              }}
            >
              {status.toUpperCase()}
            </Text>
          </TouchableOpacity>
        ))}
        {["all", "low", "medium", "high"].map((priority) => (
          <TouchableOpacity
            key={priority}
            style={[
              styles.filterBtn,
              filter.priority === priority && styles.selectedBtn,
            ]}
            onPress={() => setFilter({ ...filter, priority })}
          >
            <Text
              style={{
                color: filter.priority === priority ? "#fff" : "#5C6EF8",
                fontWeight: "bold",
                fontSize: 13,
              }}
            >
              {priority.toUpperCase()}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      {/* Task sections */}
      <FlatList
        data={sections}
        keyExtractor={(section) => section}
        renderItem={({ item: section }) => (
          <View>
            <Text style={styles.sectionTitle}>{section}</Text>
            {(grouped[section] || []).length === 0 ? (
              <Text style={styles.empty}>No tasks for {section.toLowerCase()}.</Text>
            ) : (
              grouped[section].map((task) => (
                <View key={task.id}>{renderTask({ item: task })}</View>
              ))
            )}
          </View>
        )}
        contentContainerStyle={{ paddingBottom: 120 }}
      />
      {/* Floating Action Button */}
      <TouchableOpacity
        style={styles.fab}
        onPress={() => router.push("/add-task")}
      >
        <Ionicons name="add" size={28} color="#fff" />
      </TouchableOpacity>
      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <TouchableOpacity>
          <Ionicons name="list-outline" size={28} color="#5C6EF8" />
        </TouchableOpacity>
        <TouchableOpacity>
          <Ionicons name="calendar-outline" size={28} color="#BDBDBD" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

// Chip color styles
const chipColors = {
  Personal: { backgroundColor: "#FFC107" },
  Work: { backgroundColor: "#FF7043" },
  App: { backgroundColor: "#5C6EF8" },
  Study: { backgroundColor: "#AAB6FE" },
  CF: { backgroundColor: "#B39DDB" },
  low: { backgroundColor: "#C8E6C9" },
  medium: { backgroundColor: "#FFE082" },
  high: { backgroundColor: "#FF8A65" },
};

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: "#F5F7FF" },
  header: {
    backgroundColor: "#5C6EF8",
    height: 90,
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "space-between",
    paddingHorizontal: 24,
    paddingBottom: 16,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    shadowColor: "#5C6EF8",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
  },
  headerTitle: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "bold",
    letterSpacing: 0.5,
  },
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    margin: 20,
    marginBottom: 10,
    borderRadius: 16,
    paddingHorizontal: 14,
    height: 44,
    shadowColor: "#BDBDBD",
    shadowOpacity: 0.1,
    shadowRadius: 6,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: "#333",
  },
  filters: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    marginBottom: 6,
    marginHorizontal: 8,
  },
  filterBtn: {
    paddingVertical: 7,
    paddingHorizontal: 16,
    margin: 3,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#5C6EF8",
    alignItems: "center",
    backgroundColor: "#fff",
    shadowColor: "#BDBDBD",
    shadowOpacity: 0.07,
    shadowRadius: 3,
  },
  selectedBtn: {
    backgroundColor: "#5C6EF8",
    borderColor: "#5C6EF8",
    shadowColor: "#5C6EF8",
    shadowOpacity: 0.15,
  },
  sectionTitle: {
    fontSize: 17,
    fontWeight: "600",
    color: "#5C6EF8",
    marginTop: 18,
    marginBottom: 6,
    marginLeft: 18,
    letterSpacing: 0.2,
  },
  task: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    marginHorizontal: 18,
    marginBottom: 10,
    backgroundColor: "#fff",
    borderRadius: 16,
    elevation: 3,
    shadowColor: "#BDBDBD",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.10,
    shadowRadius: 4,
    borderLeftWidth: 5,
    borderLeftColor: "#5C6EF8",
  },
  completedTask: {
    backgroundColor: "#F0F0F0",
    borderLeftColor: "#4CAF50",
  },
  title: { fontSize: 16, fontWeight: "bold", color: "#333" },
  sub: { fontSize: 13, color: "#888", marginTop: 2 },
  chipRow: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 10,
    gap: 4,
  },
  chip: {
    borderRadius: 14,
    paddingHorizontal: 8,
    paddingVertical: 3,
    marginRight: 2,
    alignItems: "center",
    minWidth: 46,
  },
  chipDefault: {
    backgroundColor: "#E0E0E0",
  },
  chipText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 12,
    letterSpacing: 0.1,
  },
  fab: {
    position: "absolute",
    right: 32,
    bottom: 60,
    backgroundColor: "#5C6EF8",
    borderRadius: 30,
    padding: 16,
    elevation: 5,
    shadowColor: "#5C6EF8",
    shadowOpacity: 0.23,
    shadowRadius: 11,
  },
  bottomNav: {
    position: "absolute",
    left: 32,
    right: 32,
    bottom: 12,
    backgroundColor: "#fff",
    borderRadius: 22,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    height: 52,
    shadowColor: "#BDBDBD",
    shadowOpacity: 0.13,
    shadowRadius: 9,
    elevation: 8,
  },
  center: { flex: 1, justifyContent: "center", alignItems: "center" },
  empty: {
    textAlign: "center",
    marginTop: 10,
    fontSize: 15,
    color: "#BDBDBD",
  },
});