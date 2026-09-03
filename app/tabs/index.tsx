import {useState, useEffect } from "react";
import {View, Text, Switch, StyleSheet, Pressable} from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage'; 

export default function ToDo() {

  const [modoEscuro, setModoEscuro] = useState(false);

   useEffect(() => {

    async function carregarTema() {

      try {

        const valorSalvo = await AsyncStorage.getItem("modoEscuro");

        if (valorSalvo !== null) {
          setModoEscuro(JSON.parse(valorSalvo));
        }
      } catch (erro) {
        console.error("Erro ao carregar tema:", erro);
      }

    }
    carregarTema();
  }, []);

  async function alterarTema(valor: boolean) {

    setModoEscuro(valor);

    try {

      await AsyncStorage.setItem(
        "modoEscuro",
        JSON.stringify(valor)
      );

    } catch (erro) {
      console.error("Erro ao salvar tema:", erro);
    }

  }

  return (
    <View
      style={[
        styles.container,
        modoEscuro && styles.containerEscuro
      ]}
    >

      <View style={styles.linha}>

        <Text
          style={[
            styles.texto,
            modoEscuro && styles.textoEscuro
          ]}
        >
          Modo escuro
        </Text>

        <Switch
          value={modoEscuro}
          onValueChange={setModoEscuro}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 30,
  },

  containerEscuro: {
    backgroundColor: "#000",
  },

  linha: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  texto: {
    fontSize: 18,
    color: "#000",
  },

  textoEscuro: {
    color: "#fff",
  },

});