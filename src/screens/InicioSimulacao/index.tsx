import { useNavigation, useRoute } from "@react-navigation/native";
import { useState } from "react";
import { Text, View, TextInput, TouchableOpacity, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { styles } from "./styles";
import { LinearGradient } from "expo-linear-gradient";
import { TextInputMask } from "react-native-masked-text";

type RouteParams = {
  user: string;
};

export function InicioSimulacao() {
  const [idade, setIdade] = useState("");
  const [cpf, setCPF] = useState("");

  const navigation = useNavigation();
  const route = useRoute();

  const parameters = route.params as RouteParams;

  function handleNext() {
    if (idade == "") {
      Alert.alert("Validação", "Preencha todos os campos");
      return;
    }
    navigation.navigate("veiculo", {
      nome: parameters.user,
      idade: Number(idade),
    });
  }

  function handleBack() {
    navigation.goBack();
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
 
        <View style={styles.cointainerTitle}>
          <Text style={styles.label}>
            Olá {parameters.user}, vamos realizar uma simulação para um seguro.
          </Text>
        </View>

        <View style={styles.formContainer}>
          <Text style={styles.label}>Qual a sua idade?</Text>
          <TextInput
            value={idade}
            onChangeText={setIdade}
            style={styles.inputField}
            keyboardType="numeric"
          />

        <Text style={styles.label}>Qual o seu CPF?</Text>
          <TextInputMask
            type={'cpf'}
            value={cpf}
            onChangeText={setCPF}
            style={styles.inputField}
            keyboardType="numeric"
          />
        </View>

        <View style={styles.formContainer}>
          <TouchableOpacity style={styles.btnNext} onPress={handleNext}>
            <Text style={styles.btnText}>Próximo</Text>
          </TouchableOpacity>
        </View>

        <View>
          <TouchableOpacity onPress={handleBack}>
            <Text style={styles.return}>Voltar</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
}
