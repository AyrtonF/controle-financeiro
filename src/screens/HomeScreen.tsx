import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { useFinance } from "../context/FinanceContext";

export default function HomeScreen() {
  const navigation = useNavigation();
  const { transactions, getBalance, getTotalIncome, getTotalExpenses } =
    useFinance();

  const handleNavigateToForm = (preselectedType: "income" | "expense") => {
    (navigation as any).navigate("Adicionar", { preselectedType });
  };
  const formatCurrency = (value: number): string => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(value);
  };

  const totalBalance = getBalance();
  const totalIncome = getTotalIncome();
  const totalExpense = getTotalExpenses();

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.balanceCard}>
          <Text style={styles.balanceLabel}>Saldo Atual</Text>
          <Text
            style={[
              styles.balanceValue,
              { color: totalBalance >= 0 ? "#28A745" : "#DC3545" },
            ]}
          >
            {formatCurrency(totalBalance)}
          </Text>

          <View style={styles.balanceDetails}>
            <View style={styles.balanceItem}>
              <Ionicons name="arrow-up-circle" size={20} color="#28A745" />
              <Text style={styles.balanceItemLabel}>Receitas</Text>
              <Text style={[styles.balanceItemValue, { color: "#28A745" }]}>
                {formatCurrency(totalIncome)}
              </Text>
            </View>

            <View style={styles.balanceItem}>
              <Ionicons name="arrow-down-circle" size={20} color="#DC3545" />
              <Text style={styles.balanceItemLabel}>Despesas</Text>
              <Text style={[styles.balanceItemValue, { color: "#DC3545" }]}>
                {formatCurrency(totalExpense)}
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.statsCard}>
          <Text style={styles.statsTitle}>Resumo</Text>
          <Text style={styles.statsText}>
            Total de transações: {transactions.length}
          </Text>
          {transactions.length > 0 && (
            <Text style={styles.statsText}>
              Última transação: {transactions[0]?.description || "N/A"}
            </Text>
          )}
        </View>

        <View style={styles.actionsCard}>
          <Text style={styles.actionsTitle}>Ações Rápidas</Text>

          <View style={styles.actionsGrid}>
            <TouchableOpacity
              style={[styles.actionButton, { backgroundColor: "#28A745" }]}
              onPress={() => handleNavigateToForm("income")}
              activeOpacity={0.8}
            >
              <Ionicons name="add-circle" size={32} color="#ffffff" />
              <Text style={styles.actionButtonText}>Nova{"\n"}Receita</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.actionButton, { backgroundColor: "#DC3545" }]}
              onPress={() => handleNavigateToForm("expense")}
              activeOpacity={0.8}
            >
              <Ionicons name="remove-circle" size={32} color="#ffffff" />
              <Text style={styles.actionButtonText}>Nova{"\n"}Despesa</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F2F2F7",
  },
  scrollContent: {
    padding: 16,
  },

  // Card do Saldo
  balanceCard: {
    backgroundColor: "#ffffff",
    borderRadius: 16,
    padding: 24,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  balanceLabel: {
    fontSize: 16,
    color: "#8E8E93",
    textAlign: "center",
    marginBottom: 8,
  },
  balanceValue: {
    fontSize: 32,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 24,
  },
  balanceDetails: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  balanceItem: {
    flex: 1,
    alignItems: "center",
  },
  balanceItemLabel: {
    fontSize: 12,
    color: "#8E8E93",
    marginTop: 4,
    marginBottom: 4,
  },
  balanceItemValue: {
    fontSize: 16,
    fontWeight: "600",
  },

  // Estatísticas
  statsCard: {
    backgroundColor: "#ffffff",
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  statsTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 12,
    color: "#1C1C1E",
  },
  statsText: {
    fontSize: 14,
    color: "#1C1C1E",
    marginBottom: 8,
  },

  // Ações
  actionsCard: {
    backgroundColor: "#ffffff",
    borderRadius: 16,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  actionsTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 16,
    color: "#1C1C1E",
  },
  actionsGrid: {
    flexDirection: "row",
    gap: 12,
  },
  actionButton: {
    flex: 1,
    borderRadius: 12,
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
    minHeight: 100,
  },
  actionButtonText: {
    color: "#ffffff",
    fontWeight: "600",
    fontSize: 14,
    textAlign: "center",
    marginTop: 8,
  },
});
