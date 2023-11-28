import { useNavigation, useRoute } from "@react-navigation/native";
import { useState } from "react";
import { Text, View, TextInput, TouchableOpacity, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { styles } from "./styles";
import { LinearGradient } from "expo-linear-gradient";
import { TextInputMask } from "react-native-masked-text";

type RouteParams = {
  user: string;
  idade: number;
};

export function DadosVeiculo() {
  const [veiculo, setVeiculo] = useState("");
  const [anoVeiculo, setAnoVeiculo] = useState("");
  const [valorVeiculo, setValorVeiculo] = useState("");
  const [placaVeiculo, setPlacaVeiculo] = useState("");

  const navigation = useNavigation();
  const route = useRoute();

  const parameters = route.params as RouteParams;

  function handleNext() {
    if (veiculo == "" || anoVeiculo == "" || valorVeiculo == "") {
      Alert.alert("Validação", "Preencha todos os campos");
      return;
    }
    navigation.navigate("resultado", {
      nome: parameters.user,
      idade: parameters.idade,
      carro: veiculo,
      ano: Number(anoVeiculo),
      valor: Number(valorVeiculo),
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
        <View style={styles.containerTitle}>
          <Text style={styles.title}>SIMULACAR</Text>
        </View>

        <View style={styles.containerTitle}>
          <Text style={styles.label}>
            Olá {parameters.user}, agora vamos solicitar os dados do seu
            veiculo.
          </Text>
        </View>

        <View style={styles.formContainer}>
          <Text style={styles.label}>Qual seu carro?</Text>
          <TextInput
            value={veiculo}
            onChangeText={setVeiculo}
            style={styles.inputField}
          />

          <Text style={styles.label}>Qual o ano do seu carro?</Text>
          <TextInput
            keyboardType="numeric"
            value={anoVeiculo}
            onChangeText={setAnoVeiculo}
            style={styles.inputField}
          />

          <Text style={styles.label}>Qual o valor do seu carro?</Text>
          <TextInput
            keyboardType="numeric"
            value={valorVeiculo}
            onChangeText={setValorVeiculo}
            style={styles.inputField}
          />

          <Text style={styles.label}>Qual a placa do seu carro?</Text>
            <TextInputMask
            type={'custom'}
            options={{ mask: 'AAA-9999' }}
            value={placaVeiculo}
            onChangeText={setPlacaVeiculo}
            style={styles.inputField}
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
