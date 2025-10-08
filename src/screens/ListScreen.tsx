import React, { useState, useMemo } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  TextInput,
  Alert,
  StyleSheet,
  ScrollView,
} from "react-native";
import { Swipeable } from "react-native-gesture-handler";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { useFinance } from "../context/FinanceContext";
import { Transaction } from "../context/FinanceContext";
import Toast from "../components/Toast";
import { useToast } from "../hooks/useToast";

type FilterType = "all" | "income" | "expense";
type SortType = "date" | "amount-desc" | "amount-asc" | "description";

export default function ListScreen() {
  const { transactions, removeTransaction } = useFinance();
  const { toastState, showSuccess, showError, hideToast } = useToast();
  const [searchText, setSearchText] = useState("");
  const [filterType, setFilterType] = useState<FilterType>("all");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [sortBy, setSortBy] = useState<SortType>("date");
  const [showFilters, setShowFilters] = useState(false);

  // Obter categorias únicas
  const uniqueCategories = [...new Set(transactions.map((t) => t.category))].sort();

  // Filtro e ordenação SEM useMemo para garantir atualização imediata
  const getFilteredTransactions = () => {
    let filtered = [...transactions];

    if (searchText.trim() !== "") {
      filtered = filtered.filter((transaction) =>
        transaction.description
          .toLowerCase()
          .includes(searchText.trim().toLowerCase())
      );
    }

    if (filterType !== "all") {
      filtered = filtered.filter(
        (transaction) => transaction.type === filterType
      );
    }

    if (selectedCategory !== "all") {
      filtered = filtered.filter(
        (transaction) => transaction.category === selectedCategory
      );
    }

    filtered.sort((a, b) => {
      switch (sortBy) {
        case "date":
          return new Date(b.date).getTime() - new Date(a.date).getTime();
        case "amount-desc":
          return b.amount - a.amount;
        case "amount-asc":
          return a.amount - b.amount;
        case "description":
          return a.description.localeCompare(b.description);
        default:
          return 0;
      }
    });
    return filtered;
  };

  const filteredTransactions = getFilteredTransactions();
  // Removido fechamento e dependências do useMemo antigo
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
    console.log("=== BOTÃO PRESSIONADO ===");
    console.log("ID:", id);
    console.log("Descrição:", description);
    console.log(
      "Função removeTransaction disponível:",
      typeof removeTransaction
    );

    Alert.alert(
      "❌ Confirmar Exclusão",
      `Deseja realmente excluir a transação:\n\n"${description}"?`,
      [
        {
          text: "❌ Cancelar",
          style: "cancel",
        },
        {
          text: "🗑️ Excluir",
          style: "destructive",
          onPress: () => {
            console.log("=== EXECUTANDO REMOÇÃO ===");
            console.log("Transações antes:", transactions.length);

            removeTransaction(id);

            // Usar setTimeout para aguardar o estado atualizar
            setTimeout(() => {
              console.log("Transações depois:", transactions.length);
              showSuccess(`✅ Transação "${description}" removida!`);
            }, 100);
          },
        },
      ]
    );
  };
  const renderRightActions = (progress: any, dragX: any, item: Transaction) => (
    <TouchableOpacity
      style={styles.swipeRemoveButton}
      onPress={() => handleRemoveTransaction(item.id, item.description)}
    >
      <Ionicons name="trash" size={24} color="#fff" />
      <Text style={styles.swipeRemoveText}>Remover</Text>
    </TouchableOpacity>
  );

  const renderTransaction = ({ item }: { item: Transaction }) => (
    <Swipeable
      renderRightActions={(progress, dragX) => renderRightActions(progress, dragX, item)}
    >
      <View style={styles.transactionItem}>
        <View
          style={[styles.iconContainer, {
            backgroundColor: item.type === "income" ? "#28A745" : "#DC3545",
          }]}
        >
          <Ionicons
            name={item.type === "income" ? "trending-up" : "trending-down"}
            size={20}
            color="#fff"
          />
        </View>
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
              style={[styles.amountText, {
                color: item.type === "income" ? "#28A745" : "#DC3545",
              }]}
            >
              {item.type === "expense" && "-"}
              {formatCurrency(item.amount)}
            </Text>
          </View>
        </View>
      </View>
    </Swipeable>
  );
  // ...existing code...

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

        {/* Botão de filtros e estatísticas */}
        <View style={styles.headerBottom}>
          <Text style={styles.statsText}>
            {filteredTransactions.length} transação(ões)
          </Text>
          <TouchableOpacity
            style={styles.filterButton}
            onPress={() => setShowFilters(!showFilters)}
          >
            <Ionicons
              name={showFilters ? "funnel" : "funnel-outline"}
              size={20}
              color="#007AFF"
            />
            <Text style={styles.filterButtonText}>Filtros</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Seção de Filtros */}
      {showFilters && (
        <View style={styles.filtersContainer}>
          {/* Filtros por Tipo */}
          <View style={styles.filterSection}>
            <Text style={styles.filterTitle}>Tipo</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <View style={styles.filterChips}>
                {(["all", "income", "expense"] as FilterType[]).map((type) => (
                  <TouchableOpacity
                    key={type}
                    style={[
                      styles.chip,
                      filterType === type && styles.chipSelected,
                    ]}
                    onPress={() => setFilterType(type)}
                  >
                    <Text
                      style={[
                        styles.chipText,
                        filterType === type && styles.chipTextSelected,
                      ]}
                    >
                      {type === "all"
                        ? "Todos"
                        : type === "income"
                        ? "Receitas"
                        : "Despesas"}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </ScrollView>
          </View>

          {/* Filtros por Categoria */}
          <View style={styles.filterSection}>
            <Text style={styles.filterTitle}>Categoria</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <View style={styles.filterChips}>
                <TouchableOpacity
                  style={[
                    styles.chip,
                    selectedCategory === "all" && styles.chipSelected,
                  ]}
                  onPress={() => setSelectedCategory("all")}
                >
                  <Text
                    style={[
                      styles.chipText,
                      selectedCategory === "all" && styles.chipTextSelected,
                    ]}
                  >
                    Todas
                  </Text>
                </TouchableOpacity>
                {uniqueCategories.map((category) => (
                  <TouchableOpacity
                    key={category}
                    style={[
                      styles.chip,
                      selectedCategory === category && styles.chipSelected,
                    ]}
                    onPress={() => setSelectedCategory(category)}
                  >
                    <Text
                      style={[
                        styles.chipText,
                        selectedCategory === category &&
                          styles.chipTextSelected,
                      ]}
                    >
                      {category}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </ScrollView>
          </View>

          {/* Ordenação */}
          <View style={styles.filterSection}>
            <Text style={styles.filterTitle}>Ordenar por</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <View style={styles.filterChips}>
                {(
                  [
                    { key: "date", label: "Data" },
                    { key: "amount-desc", label: "Maior Valor" },
                    { key: "amount-asc", label: "Menor Valor" },
                    { key: "description", label: "Descrição" },
                  ] as { key: SortType; label: string }[]
                ).map((sort) => (
                  <TouchableOpacity
                    key={sort.key}
                    style={[
                      styles.chip,
                      sortBy === sort.key && styles.chipSelected,
                    ]}
                    onPress={() => setSortBy(sort.key)}
                  >
                    <Text
                      style={[
                        styles.chipText,
                        sortBy === sort.key && styles.chipTextSelected,
                      ]}
                    >
                      {sort.label}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </ScrollView>
          </View>
        </View>
      )}

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
        extraData={transactions}
      />

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
  headerBottom: {
    flexDirection: "row" as const,
    justifyContent: "space-between" as const,
    alignItems: "center" as const,
  },
  filterButton: {
    flexDirection: "row" as const,
    alignItems: "center" as const,
    paddingVertical: 6,
    paddingHorizontal: 12,
    backgroundColor: "#f0f8ff",
    borderRadius: 8,
  },
  filterButtonText: {
    marginLeft: 6,
    fontSize: 14,
    color: "#007AFF",
    fontWeight: "500" as const,
  },
  filtersContainer: {
    backgroundColor: "#fff",
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },
  filterSection: {
    marginBottom: 15,
  },
  filterTitle: {
    fontSize: 16,
    fontWeight: "600" as const,
    color: "#333",
    marginBottom: 10,
  },
  filterChips: {
    flexDirection: "row" as const,
    gap: 8,
  },
  chip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: "#f0f0f0",
    borderRadius: 20,
    marginRight: 8,
  },
  chipSelected: {
    backgroundColor: "#007AFF",
  },
  chipText: {
    fontSize: 14,
    color: "#666",
    fontWeight: "500" as const,
  },
  chipTextSelected: {
    color: "#fff",
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
    padding: 12,
    marginLeft: 10,
    alignItems: "center" as const,
    justifyContent: "center" as const,
    backgroundColor: "#FFF5F5",
    borderRadius: 8,
    minWidth: 40,
    minHeight: 40,
    zIndex: 1,
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
  swipeRemoveButton: {
    backgroundColor: '#DC3545',
    justifyContent: 'center',
    alignItems: 'center',
    width: 100,
    height: '90%',
    borderRadius: 12,
    marginVertical: 6,
    flexDirection: 'column',
  },
  swipeRemoveText: {
    color: '#fff',
    fontWeight: 'bold',
    marginTop: 4,
    fontSize: 14,
  },
});
