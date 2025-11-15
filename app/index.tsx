import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  FlatList,
  Alert,
} from "react-native";

type Produto = {
  id: string;
  nome: string;
  preco: string;
};

export default function Page() {
  const [peso, setPeso] = useState<string>("");
  const [altura, setAltura] = useState<string>("");
  const [imc, setImc] = useState<string | null>(null);
  const [categoria, setCategoria] = useState<string>("");
  const [produtos, setProdutos] = useState<Produto[]>([]);

  function calcularIMC() {
    const p = parseFloat(peso);
    const a = parseFloat(altura);

    if (!p || !a || a <= 0) {
      Alert.alert("Erro", "Digite valores válidos de peso e altura!");
      return;
    }

    const resultado = p / (a * a);
    const imcFormatado = resultado.toFixed(2);
    setImc(imcFormatado);

    let categoriaTemp = "";
    let produtosTemp: Produto[] = [];

    if (resultado < 18.5) {
      categoriaTemp = "Abaixo do peso";
      produtosTemp = [
        { id: "1", nome: "Fit Moderno", preco: "R$ 219,00" },
        { id: "2", nome: "Beauty Moderno", preco: "R$ 147,00" },
      ];
    } else if (resultado < 24.9) {
      categoriaTemp = "Peso normal";
      produtosTemp = [
        { id: "3", nome: "Fit Moderno", preco: "R$ 219,00" },
        { id: "4", nome: "Immune life", preco: "R$ 147,00" },
      ];
    } else if (resultado < 29.9) {
      categoriaTemp = "Sobrepeso";
      produtosTemp = [
        { id: "5", nome: "Fit Moderno", preco: "R$ 219,00" },
        { id: "6", nome: "Beauty Moderno", preco: "R$ 147,00" },
      ];
    } else {
      categoriaTemp = "Obesidade";
      produtosTemp = [
        { id: "7", nome: "Fit Moderno", preco: "R$ 219,00" },
        { id: "8", nome: "Beauty Moderno", preco: "R$ 147,00" },
        { id: "9", nome: "Immune Life", preco: "R$ 147,00" },
      ];
    }

    setCategoria(categoriaTemp);
    setProdutos(produtosTemp);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Calculadora de IMC</Text>

      <TextInput
        style={styles.input}
        placeholder="Peso (kg)"
        keyboardType="numeric"
        value={peso}
        onChangeText={setPeso}
      />
      <TextInput
        style={styles.input}
        placeholder="Altura (m)"
        keyboardType="numeric"
        value={altura}
        onChangeText={setAltura}
      />

      <Button title="Calcular IMC" onPress={calcularIMC} />

      {imc && (
        <View style={styles.resultado}>
          <Text style={styles.imcTexto}>Seu IMC é {imc}</Text>
          <Text style={styles.categoria}>{categoria}</Text>

          <Text style={styles.subtitulo}>Sugestões de suplementos:</Text>
          <FlatList
            data={produtos}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <Text style={styles.produto}>
                • {item.nome} — {item.preco}
              </Text>
            )}
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#9ada9aff",
  },
  titulo: {
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    width: "80%",
    backgroundColor: "#fff",
    padding: 10,
    marginVertical: 8,
    borderRadius: 8,
    borderColor: "#ccc",
    borderWidth: 1,
  },
  resultado: {
    marginTop: 20,
    alignItems: "center",
  },
  imcTexto: {
    fontSize: 20,
    fontWeight: "bold",
  },
  categoria: {
    fontSize: 22,
    marginVertical: 5,
    color: "#11683cff",
  },
  subtitulo: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: "bold",
  },
  produto: {
    fontSize: 20,
    color: "#10643aff",
    marginTop: 5,
  },
  button: {
    color: "#11683cff",
  }
});
