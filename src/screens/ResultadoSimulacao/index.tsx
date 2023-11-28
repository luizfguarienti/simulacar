import { useNavigation, useRoute } from "@react-navigation/native";
import { Text, View, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { styles } from "./styles";
import { LinearGradient } from "expo-linear-gradient";
import { useEffect, useState } from "react";
import BouncyCheckbox from "react-native-bouncy-checkbox";

type RouteParams = {
  user: string;
  idade: number;
  veiculo: string;
  ano: number;
  valor: number;
};

export function ResultadoSimulacao() {
  const [valorBase, setValorBase] = useState(0);
  const [valorPorIdade, setValorPorIdade] = useState(0);
  const [valorPorAno, setValorPorAno] = useState(0);
  const [valorTotal, setValorTotal] = useState(0);
  const [simboloMoeda, setSimboloMoeda] = useState("");

  const navigation = useNavigation();

  const route = useRoute();

  const parameters = route.params as RouteParams;

  const valorDolar = 5.0;

  function handleNext() {
    navigation.navigate("inicio", { nome: parameters.user });
  }

  function handleBack() {
    navigation.goBack();
  }

  useEffect(() => {
    calcular();
  }, []);

  function calcular() {
    var valorBaseInicio = calcularValorBase();
    setSimboloMoeda("R$");
    setValorBase(valorBaseInicio);
    var valorTotal = valorBaseInicio;

    var valorPorIdade = calcularValorPorIdade(valorTotal);
    valorTotal = valorTotal + valorPorIdade;

    var valorPorAno = calcularValorPorAno(valorTotal);
    valorTotal = valorTotal + valorPorAno;

    setValorPorIdade(valorPorIdade);
    setValorPorAno(valorPorAno);
    setValorTotal(valorTotal);
  }

  function calcularValorBase() {
    var valorBase = 1000;
    var valorVeiculo = parameters.valor;
    if (valorVeiculo > 100000) {
      valorBase = 2000;
    } else if (valorVeiculo >= 50000 && valorVeiculo <= 100000) {
      valorBase = 1500;
    }
    return valorBase;
  }

  function calcularValorPorIdade(valorTotal: number) {
    var valorIdade = 0;
    if (parameters.idade < 22) {
      valorIdade = valorTotal * 0.2;
    } else if (parameters.idade >= 22 && parameters.idade < 28) {
      valorIdade = valorTotal * 0.18;
    } else {
      valorIdade = valorTotal * -0.15;
    }
    return valorIdade;
  }

  function calcularValorPorAno(valorTotal: number) {
    var valorAno = 0;
    if (parameters.ano < 2000) {
      valorAno = valorTotal * 0.3;
    } else if (parameters.ano >= 2000 && parameters.ano <= 2009) {
      valorAno = valorTotal * 0.15;
    } else if (parameters.ano >= 2016) {
      valorAno = valorTotal * 0.1;
    }
    return valorAno;
  }

  function converterParaDolar() {
    var valorBaseDolar = valorBase / valorDolar;
    var valorTotalDolar = valorTotal / valorDolar;
    var valorPorIdadeDolar = valorPorIdade / valorDolar;
    var valorPorAnoDolar = valorPorAno / valorDolar;

    setValorBase(valorBaseDolar);
    setValorTotal(valorTotalDolar);
    setValorPorIdade(valorPorIdadeDolar);
    setValorPorAno(valorPorAnoDolar);
    setSimboloMoeda("$");
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
            Olá {parameters.user}, fizemos um orçamento para seu veiculo{" "}
            {parameters.veiculo}.
          </Text>
        </View>

        <View style={styles.resultContainer}>
          <Text style={styles.resultText}>Base</Text>
          <Text style={styles.resultText}>{simboloMoeda} {valorBase.toFixed(2)}</Text>

        </View>

        <View style={styles.resultContainer}>
          <Text style={styles.resultText}>por idade</Text>
          <Text style={styles.resultText}>{simboloMoeda} {valorPorIdade.toFixed(2)}</Text>
        </View>

        <View style={styles.resultContainer}>
          <Text style={styles.resultText}>por ano</Text>
          <Text style={styles.resultText}>{simboloMoeda} {valorPorAno.toFixed(2)}</Text>
        </View>

        <View style={styles.totalResultContainer}>
          <Text style={styles.resultText}>Total</Text>
          <Text style={styles.resultText}>{simboloMoeda} {valorTotal.toFixed(2)}</Text>
        </View>

        <BouncyCheckbox
          fillColor="black"
          unfillColor="#FFFFFF"
          textStyle={{ textDecorationLine: "none", color: "black" }}
          text="Valores em dólar"
          iconStyle={{ borderColor: "black" }}
          innerIconStyle={{ borderWidth: 2 }}
          onPress={(isChecked: boolean) => {
            if (isChecked) {
              converterParaDolar();
            } else {
              calcular();
            }
          }}
        />

        <View style={styles.containerInfo}>
          <TouchableOpacity style={styles.btnNext} onPress={handleNext}>
            <Text style={styles.btnText}>Finalizar</Text>
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
