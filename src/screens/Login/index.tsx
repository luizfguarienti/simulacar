import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import { Text, View, TextInput, TouchableOpacity, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { styles } from "./styles";
import { LinearGradient } from "expo-linear-gradient";

export function Login() {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const navigation = useNavigation();

  function handleNext() {
    if (name == "" || password == "") {
      Alert.alert("Validação", "Preencha todos os campos");
      return;
    }
    navigation.navigate("inicio", { nome: name });
  }

  return (
    <LinearGradient
      colors={["#5374B6", "#f7b5b5"]}
      style={styles.linearGradient}
    >
      <SafeAreaView style={styles.mainContainer}>
        <View style={styles.cointainerTitle}>
          <Text style={styles.title}>SIMULACAR</Text>
        </View>

        <View style={styles.contentContainer}>
          <Text style={styles.label}>Usuário</Text>
          <TextInput
            value={name}
            onChangeText={setName}
            style={styles.inputField}
          />

          <Text style={styles.label}>Senha</Text>
          <TextInput
            value={password}
            onChangeText={setPassword}
            style={styles.inputField}
            secureTextEntry={true}
          />
        </View>

        <View style={styles.contentContainer}>
          <TouchableOpacity style={styles.btnLogin} onPress={handleNext}>
            <Text style={styles.btnText}>Logar</Text>
          </TouchableOpacity>
        </View>

        <View>
          <Text style={styles.resetPasswordLabel}>Esqueci minha senha</Text>
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
}
