import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
  StyleSheet,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useFinance } from "../context/FinanceContext";
import Toast from "../components/Toast";
import { useToast } from "../hooks/useToast";

const CATEGORIES = {
  income: ["Salário", "Freelance", "Investimentos", "Vendas", "Outros"],
  expense: ["Alimentação", "Moradia", "Transporte", "Saúde", "Lazer", "Outros"],
};

export default function FormScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const { addTransaction } = useFinance();
  const { toastState, showSuccess, showError, hideToast } = useToast();

  const preselectedType = (route.params as any)?.preselectedType || "expense";

  const [type, setType] = useState<"income" | "expense">(preselectedType);
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");

  const handleSave = () => {
    if (!amount || parseFloat(amount.replace(",", ".")) <= 0) {
      Alert.alert("Erro", "Por favor, insira um valor válido.");
      return;
    }

    if (!description.trim()) {
      Alert.alert("Erro", "Por favor, insira uma descrição.");
      return;
    }

    if (!category) {
      Alert.alert("Erro", "Por favor, selecione uma categoria.");
      return;
    }

    // Adicionar transação
    try {
      addTransaction({
        type,
        amount: parseFloat(amount.replace(",", ".")),
        description: description.trim(),
        category,
      });

      // Limpar formulário
      const clearForm = () => {
        setAmount("");
        setDescription("");
        setCategory("");
      };

      // Mostrar notificação de sucesso
      const transactionTypeName = type === "income" ? "receita" : "despesa";
      showSuccess(
        `${
          transactionTypeName.charAt(0).toUpperCase() +
          transactionTypeName.slice(1)
        } adicionada com sucesso!`
      );

      Alert.alert("Sucesso", "Transação adicionada com sucesso!", [
        {
          text: "Ver Lista",
          onPress: () => {
            clearForm();
            (navigation as any).navigate("Transações");
          },
        },
        {
          text: "Nova Transação",
          onPress: () => {
            clearForm();
          },
        },
      ]);
    } catch (error) {
      showError("Erro ao salvar a transação. Tente novamente.");
    }
  };

  const formatAmount = (text: string) => {
    const cleaned = text.replace(/[^0-9,.]/g, "");
    setAmount(cleaned);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Text style={styles.title}>Nova Transação</Text>
          <Text style={styles.subtitle}>
            Adicione uma {type === "income" ? "receita" : "despesa"}
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Tipo de Transação</Text>
          <View style={styles.typeContainer}>
            <TouchableOpacity
              style={[
                styles.typeButton,
                type === "income" && styles.typeButtonActive,
                { backgroundColor: type === "income" ? "#28A745" : "#f0f0f0" },
              ]}
              onPress={() => {
                setType("income");
                setCategory("");
              }}
            >
              <Ionicons
                name="trending-up"
                size={24}
                color={type === "income" ? "#fff" : "#666"}
              />
              <Text
                style={[
                  styles.typeButtonText,
                  { color: type === "income" ? "#fff" : "#666" },
                ]}
              >
                Receita
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.typeButton,
                type === "expense" && styles.typeButtonActive,
                { backgroundColor: type === "expense" ? "#DC3545" : "#f0f0f0" },
              ]}
              onPress={() => {
                setType("expense");
                setCategory("");
              }}
            >
              <Ionicons
                name="trending-down"
                size={24}
                color={type === "expense" ? "#fff" : "#666"}
              />
              <Text
                style={[
                  styles.typeButtonText,
                  { color: type === "expense" ? "#fff" : "#666" },
                ]}
              >
                Despesa
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Valor *</Text>
          <View style={styles.inputContainer}>
            <Text style={styles.currencySymbol}>R$</Text>
            <TextInput
              style={styles.amountInput}
              value={amount}
              onChangeText={formatAmount}
              placeholder="0,00"
              keyboardType="numeric"
              placeholderTextColor="#999"
            />
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Descrição *</Text>
          <TextInput
            style={styles.input}
            value={description}
            onChangeText={setDescription}
            placeholder="Ex: Compras do mercado"
            maxLength={50}
            placeholderTextColor="#999"
          />
        </View>

        {/* Seletor de Categoria */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Categoria *</Text>
          <View style={styles.categoriesContainer}>
            {CATEGORIES[type].map((cat) => (
              <TouchableOpacity
                key={cat}
                style={[
                  styles.categoryChip,
                  category === cat && styles.categoryChipActive,
                ]}
                onPress={() => setCategory(cat)}
              >
                <Text
                  style={[
                    styles.categoryChipText,
                    category === cat && styles.categoryChipTextActive,
                  ]}
                >
                  {cat}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Botão Salvar */}
        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
          <Text style={styles.saveButtonText}>Salvar Transação</Text>
        </TouchableOpacity>
      </ScrollView>

      {/* Toast de notificação */}
      <Toast
        visible={toastState.visible}
        message={toastState.message}
        type={toastState.type}
        onHide={hideToast}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  scrollContent: {
    padding: 20,
  },
  header: {
    marginBottom: 30,
    alignItems: "center" as const,
  },
  title: {
    fontSize: 28,
    fontWeight: "700" as const,
    color: "#333",
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 16,
    color: "#666",
    textAlign: "center" as const,
  },
  section: {
    marginBottom: 25,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "600" as const,
    color: "#333",
    marginBottom: 12,
  },
  typeContainer: {
    flexDirection: "row" as const,
    gap: 15,
  },
  typeButton: {
    flex: 1,
    flexDirection: "row" as const,
    alignItems: "center" as const,
    justifyContent: "center" as const,
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#e0e0e0",
  },
  typeButtonActive: {
    borderColor: "transparent",
  },
  typeButtonText: {
    fontSize: 16,
    fontWeight: "600" as const,
    marginLeft: 8,
  },
  inputContainer: {
    flexDirection: "row" as const,
    alignItems: "center" as const,
    backgroundColor: "#fff",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#e0e0e0",
    paddingHorizontal: 15,
  },
  currencySymbol: {
    fontSize: 18,
    fontWeight: "600" as const,
    color: "#333",
    marginRight: 10,
  },
  amountInput: {
    flex: 1,
    paddingVertical: 15,
    fontSize: 18,
    color: "#333",
  },
  input: {
    backgroundColor: "#fff",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#e0e0e0",
    paddingHorizontal: 15,
    paddingVertical: 15,
    fontSize: 16,
    color: "#333",
  },
  categoriesContainer: {
    flexDirection: "row" as const,
    flexWrap: "wrap" as const,
    gap: 10,
  },
  categoryChip: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#e0e0e0",
  },
  categoryChipActive: {
    backgroundColor: "#007AFF",
    borderColor: "#007AFF",
  },
  categoryChipText: {
    fontSize: 14,
    color: "#333",
    fontWeight: "500" as const,
  },
  categoryChipTextActive: {
    color: "#fff",
  },
  saveButton: {
    backgroundColor: "#007AFF",
    borderRadius: 12,
    paddingVertical: 18,
    alignItems: "center" as const,
    marginTop: 20,
    marginBottom: 40,
  },
  saveButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "700" as const,
  },
});
