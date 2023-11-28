import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Login } from "../screens/Login";
import { InicioSimulacao } from "../screens/InicioSimulacao";
import { DadosVeiculo } from "../screens/DadosVeiculo";
import { ResultadoSimulacao } from "../screens/ResultadoSimulacao";

export function AppRoutes() {
  const { Navigator, Screen } = createNativeStackNavigator();

  return (
    <Navigator screenOptions={{ headerShown: false }}>
      <Screen name="login" component={Login}/>
      <Screen name="inicio" component={InicioSimulacao} />
      <Screen name="veiculo" component={DadosVeiculo} />
      <Screen name="resultado" component={ResultadoSimulacao} />
    </Navigator>
  );
}
