import React, { useState, useMemo } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  TextInput,
  Alert,
  StyleSheet,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { useFinance } from "../context/FinanceContext";
import { Transaction } from "../context/FinanceContext";

export default function ListScreen() {
  const { transactions, removeTransaction } = useFinance();
  const [searchText, setSearchText] = useState("");

  const filteredTransactions = useMemo(() => {
    if (!searchText) return transactions;

    return transactions.filter(
      (transaction) =>
        transaction.description
          .toLowerCase()
          .includes(searchText.toLowerCase()) ||
        transaction.category.toLowerCase().includes(searchText.toLowerCase())
    );
  }, [transactions, searchText]);
  const formatCurrency = (value: number): string => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(value);
  };

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  const handleRemoveTransaction = (id: string, description: string) => {
    Alert.alert(
      "Confirmar Exclusão",
      `Deseja realmente excluir a transação "${description}"?`,
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Excluir",
          style: "destructive",
          onPress: () => {
            removeTransaction(id);
            Alert.alert("Sucesso", "Transação removida com sucesso!");
          },
        },
      ]
    );
  };
  const renderTransaction = ({ item }: { item: Transaction }) => (
    <View style={styles.transactionItem}>
      <View
        style={[
          styles.iconContainer,
          {
            backgroundColor: item.type === "income" ? "#28A745" : "#DC3545",
          },
        ]}
      >
        <Ionicons
          name={item.type === "income" ? "trending-up" : "trending-down"}
          size={20}
          color="#fff"
        />
      </View>

      {/* Conteúdo da transação */}
      <View style={styles.transactionContent}>
        <View style={styles.transactionInfo}>
          <Text style={styles.transactionDescription} numberOfLines={1}>
            {item.description}
          </Text>
          <Text style={styles.transactionCategory}>{item.category}</Text>
          <Text style={styles.transactionDate}>{formatDate(item.date)}</Text>
        </View>

        <View style={styles.transactionAmount}>
          <Text
            style={[
              styles.amountText,
              {
                color: item.type === "income" ? "#28A745" : "#DC3545",
              },
            ]}
          >
            {item.type === "expense" && "-"}
            {formatCurrency(item.amount)}
          </Text>
        </View>
      </View>

      {/* Botão de remoção */}
      <TouchableOpacity
        style={styles.removeButton}
        onPress={() => handleRemoveTransaction(item.id, item.description)}
      >
        <Ionicons name="trash-outline" size={20} color="#DC3545" />
      </TouchableOpacity>
    </View>
  );

  // Estado vazio
  const renderEmptyState = () => (
    <View style={styles.emptyState}>
      <Ionicons name="receipt-outline" size={80} color="#ccc" />
      <Text style={styles.emptyStateTitle}>Nenhuma transação encontrada</Text>
      <Text style={styles.emptyStateSubtitle}>
        {searchText
          ? "Tente usar outros termos de busca"
          : "Adicione sua primeira transação usando a aba 'Adicionar'"}
      </Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Header com busca */}
      <View style={styles.header}>
        <View style={styles.searchContainer}>
          <Ionicons name="search-outline" size={20} color="#666" />
          <TextInput
            style={styles.searchInput}
            placeholder="Buscar transações..."
            value={searchText}
            onChangeText={setSearchText}
            placeholderTextColor="#999"
          />
          {searchText ? (
            <TouchableOpacity onPress={() => setSearchText("")}>
              <Ionicons name="close-circle" size={20} color="#666" />
            </TouchableOpacity>
          ) : null}
        </View>

        {/* Estatísticas */}
        <View style={styles.statsContainer}>
          <Text style={styles.statsText}>
            {filteredTransactions.length} transação(ões)
          </Text>
        </View>
      </View>

      {/* Lista de transações */}
      <FlatList
        data={filteredTransactions}
        keyExtractor={(item) => item.id}
        renderItem={renderTransaction}
        ListEmptyComponent={renderEmptyState}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={
          filteredTransactions.length === 0 ? styles.emptyContainer : undefined
        }
        style={styles.list}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  header: {
    backgroundColor: "#fff",
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },
  searchContainer: {
    flexDirection: "row" as const,
    alignItems: "center" as const,
    backgroundColor: "#f8f8f8",
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 12,
    marginBottom: 10,
  },
  searchInput: {
    flex: 1,
    marginLeft: 10,
    fontSize: 16,
    color: "#333",
  },
  statsContainer: {
    alignItems: "center" as const,
  },
  statsText: {
    fontSize: 14,
    color: "#666",
  },
  list: {
    flex: 1,
    paddingHorizontal: 20,
  },
  transactionItem: {
    backgroundColor: "#fff",
    borderRadius: 12,
    marginVertical: 6,
    flexDirection: "row" as const,
    alignItems: "center" as const,
    padding: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center" as const,
    justifyContent: "center" as const,
    marginRight: 15,
  },
  transactionContent: {
    flex: 1,
    flexDirection: "row" as const,
    justifyContent: "space-between" as const,
    alignItems: "center" as const,
  },
  transactionInfo: {
    flex: 1,
  },
  transactionDescription: {
    fontSize: 16,
    fontWeight: "600" as const,
    color: "#333",
    marginBottom: 4,
  },
  transactionCategory: {
    fontSize: 14,
    color: "#666",
    marginBottom: 2,
  },
  transactionDate: {
    fontSize: 12,
    color: "#999",
  },
  transactionAmount: {
    alignItems: "flex-end" as const,
  },
  amountText: {
    fontSize: 16,
    fontWeight: "700" as const,
  },
  removeButton: {
    padding: 10,
    marginLeft: 10,
    alignItems: "center" as const,
    justifyContent: "center" as const,
  },
  emptyContainer: {
    flex: 1,
  },
  emptyState: {
    flex: 1,
    alignItems: "center" as const,
    justifyContent: "center" as const,
    paddingHorizontal: 40,
  },
  emptyStateTitle: {
    fontSize: 20,
    fontWeight: "600" as const,
    color: "#333",
    textAlign: "center" as const,
    marginTop: 20,
    marginBottom: 10,
  },
  emptyStateSubtitle: {
    fontSize: 16,
    color: "#666",
    textAlign: "center" as const,
    lineHeight: 24,
  },
});
