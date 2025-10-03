# 👥 Documentação Técnica para Equipe - Controle Financeiro

> **Objetivo:** Este docum**Para apresentar:** "O Babel transpila nosso código moderno JavaScript para ser compatível com React Native."

### 📄 `webpack.config.js`

**O que faz:** Configurações do Webpack para suporte web.

```javascript
const createExpoWebpackConfigAsync = require("@expo/webpack-config");

module.exports = async function (env, argv) {
  const config = await createExpoWebpackConfigAsync(
    {
      ...env,
      babel: {
        dangerouslyAddModulePathsToTranspile: ["@expo/vector-icons"],
      },
    },
    argv
  );
  return config;
};
```

**Para apresentar:** "O Webpack permite executar o app React Native no navegador, facilitando desenvolvimento e apresentações."

---o explica o funcionamento detalhado de cada arquivo do projeto para que toda a equipe possa entender, manter e apresentar o código com confiança.#### 4. **Estatísticas Simplificadas**

```javascript
// Versão atual mostra resumo básico
<Text>Total de transações: {transactions.length}</Text>;
{
  transactions.length > 0 && (
    <Text>Última transação: {transactions[0]?.description}</Text>
  );
}
```

**Para apresentar:**

- "A Home é como um 'dashboard bancário' - mostra tudo importante de uma vez"
- "O saldo muda de cor: verde se positivo, vermel#### 5. Explicar Código (5 min)

- "Context API gerencia estado global"
- "FlatList otimizada suporta milhares de itens"
- "Validação robusta em todos os campos"
- "Design system consistente em todo o app"
- "Suporte web com React Native Web e Webpack"n#### 6. Aspectos Técnicos (3 min)

- "Responsivo para diferentes tamanhos de tela"
- "Componentes reutilizáveis economizam código"
- "Performance otimizada com hooks e memo"
- "Pronto para build iOS/Android/Web"
- "Mesma base de código, três plataformas"o"
- "Mostra resumo das transações de forma simples e clara"
- "Botões de ação rápida levam direto para adicionar receita/despesa"ce

1. [Arquivos de Configuração](#arquivos-de-configuração)
2. [Arquivo Principal](#arquivo-principal)
3. [Gerenciamento de Estado](#gerenciamento-de-estado)
4. [Telas do Aplicativo](#telas-do-aplicativo)
5. [Componentes Reutilizáveis](#componentes-reutilizáveis)
6. [Sistema de Estilos](#sistema-de-estilos)
7. [Fluxo de Dados](#fluxo-de-dados)
8. [Guia de Apresentação](#guia-de-apresentação)

---

## 📋 Arquivos de Configuração

### 📄 `package.json`

**O que faz:** Define as dependências e scripts do projeto.

**Pontos importantes:**

```json
{
  \"scripts\": {
    \"start\": \"expo start\",     // Inicia o servidor de desenvolvimento
    \"android\": \"expo start --android\", // Abre direto no Android
    \"ios\": \"expo start --ios\"         // Abre direto no iOS
  },
  \"dependencies\": {
    \"expo\": \"~49.0.15\",              // Plataforma Expo
    \"react-navigation\": \"^6.x\",       // Navegação entre telas
    \"expo-linear-gradient\": \"~12.3.0\" // Gradientes visuais
  }
}
```

**Para apresentar:** \"O package.json configura todas as dependências necessárias, incluindo Expo para build, React Navigation para navegação e bibliotecas de UI como gradientes.\"

### 📄 `app.json`

**O que faz:** Configurações do aplicativo Expo.

**Pontos importantes:**

```json
{
  \"expo\": {
    \"name\": \"Controle Financeiro\",    // Nome do app
    \"orientation\": \"portrait\",        // Sempre retrato
    \"platforms\": [\"ios\", \"android\"]  // Suporte multiplataforma
  }
}
```

**Para apresentar:** \"O app.json define metadados como nome, ícone e orientação. Configuramos para funcionar em iOS e Android no modo retrato.\"

### 📄 `babel.config.js`

**O que faz:** Configurações de transpilação JavaScript.

```javascript
module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"], // Preset do Expo
    plugins: ["react-native-reanimated/plugin"], // Animações
  };
};
```

**Para apresentar:** \"O Babel transpila nosso código moderno JavaScript para ser compatível com React Native.\"

---

## 🚀 Arquivo Principal

### 📄 `App.tsx`

**O que faz:** Componente raiz que configura navegação e contexto global.

**Estrutura do código:**

```javascript
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

// 1. Importações das telas
import HomeScreen from './screens/HomeScreen';
import FormScreen from './screens/FormScreen';
import ListScreen from './screens/ListScreen';

// 2. Contexto global
import { FinanceProvider } from './src/context/FinanceContext';

// 3. Navegador
const Tab = createBottomTabNavigator();

export default function App() {
  return (
    // 4. Provider envolvendo toda a aplicação
    <SafeAreaProvider>
      <FinanceProvider>
        <NavigationContainer>
          <Tab.Navigator>
            {/* 5. Configuração das 3 abas */}
            <Tab.Screen name=\"Home\" component={HomeScreen} />
            <Tab.Screen name=\"Adicionar\" component={FormScreen} />
            <Tab.Screen name=\"Transações\" component={ListScreen} />
          </Tab.Navigator>
        </NavigationContainer>
      </FinanceProvider>
    </SafeAreaProvider>
  );
}
```

**Para apresentar:**

- \"O App.js é o coração da aplicação\"
- \"Configura 3 abas principais: Home (dashboard), Adicionar (formulário) e Transações (lista)\"
- \"O FinanceProvider fornece dados para todas as telas\"
- \"A navegação é feita com abas na parte inferior, padrão mobile\"

---

## 🔄 Gerenciamento de Estado

### 📄 `src/context/FinanceContext.tsx`

**O que faz:** Gerencia todos os dados financeiros da aplicação.

**Conceitos importantes:**

#### 1. **Interface de Dados**

```typescript
interface Transaction {
  id: string; // ID único (timestamp)
  type: "income" | "expense"; // Receita ou despesa
  amount: number; // Valor em reais
  description: string; // \"Salário\", \"Aluguel\", etc.
  category: string; // \"Trabalho\", \"Moradia\", etc.
  date: string; // Data no formato ISO
}
```

#### 2. **Estado Global**

```javascript
const [transactions, setTransactions] = useState([
  // Dados de exemplo já incluídos para demonstração
  { id: '1', type: 'income', amount: 5000, ... },
  { id: '2', type: 'expense', amount: 1200, ... }
]);
```

#### 3. **Funções Principais**

```javascript
// Adicionar transação
const addTransaction = (transaction) => {
  const newTransaction = {
    ...transaction,
    id: Date.now().toString(), // ID único
    date: new Date().toISOString(), // Data atual
  };
  setTransactions((prev) => [newTransaction, ...prev]); // Adiciona no início
};

// Remover transação
const removeTransaction = (id) => {
  setTransactions((prev) => prev.filter((t) => t.id !== id));
};

// Calcular receitas totais
const getTotalIncome = () => {
  return transactions
    .filter((t) => t.type === "income") // Só receitas
    .reduce((total, t) => total + t.amount, 0); // Soma valores
};
```

**Para apresentar:**

- \"Usamos Context API em vez de Redux para simplicidade\"
- \"Todas as telas acessam os mesmos dados em tempo real\"
- \"As funções são calculadas automaticamente (receitas, despesas, saldo)\"
- \"Dados ficam em memória - em produção usaríamos AsyncStorage\"

---

## 📱 Telas do Aplicativo

### 📄 `screens/HomeScreen.tsx`

**O que faz:** Dashboard principal com resumo financeiro (versão simplificada e otimizada).

**Seções principais:**

#### 1. **Header Simplificado**

```javascript
// Versão atual usa SafeAreaView simples
<SafeAreaView style={styles.container}>
  <ScrollView contentContainerStyle={styles.scrollContent}>
```

#### 2. **Card de Saldo**

```javascript
const balance = getBalance(); // Receitas - Despesas
<Text style={{ color: getBalanceColor(balance) }}>
  {formatCurrency(balance)}
</Text>;
```

#### 3. **Cards de Resumo**

```javascript
// Card de Receitas (verde)
<View style={{ borderLeftColor: colors.success }}>
  <Ionicons name=\"trending-up\" color={colors.success} />
  <Text>{formatCurrency(totalIncome)}</Text>
</View>

// Card de Despesas (vermelho)
<View style={{ borderLeftColor: colors.danger }}>
  <Ionicons name=\"trending-down\" color={colors.danger} />
  <Text>{formatCurrency(totalExpenses)}</Text>
</View>
```

#### 4. **Top 5 Categorias**

```javascript
Object.entries(categorySums)
  .sort(([,a], [,b]) => b - a)  // Ordena por valor decrescente
  .slice(0, 5)                  // Pega apenas 5
  .map(([category, amount]) => /* Renderiza item */)
```

**Para apresentar:**

- \"A Home é como um 'dashboard bancário' - mostra tudo importante de uma vez\"
- \"O saldo muda de cor: verde se positivo, vermelho se negativo\"
- \"As categorias mostram onde o usuário mais gasta dinheiro\"
- \"Botões de ação rápida levam direto para adicionar receita/despesa\"

### 📄 `screens/FormScreen.js`

**O que faz:** Formulário para adicionar receitas e despesas.

**Funcionalidades principais:**

#### 1. **Seletor de Tipo Visual**

```javascript
<TouchableOpacity
  style={[
    styles.typeButton,
    type === 'income' && { backgroundColor: colors.success }
  ]}
  onPress={() => setType('income')}
>
  <Ionicons name=\"trending-up\" />
  <Text>Receita</Text>
</TouchableOpacity>
```

#### 2. **Validação em Tempo Real**

```javascript
const validateField = (field, value) => {
  switch (field) {
    case "amount":
      if (!value || value <= 0) return "Valor é obrigatório";
      if (value > 1000000) return "Valor muito alto";
      return null;
    case "description":
      if (value.length < 3) return "Mínimo 3 caracteres";
      if (value.length > 50) return "Máximo 50 caracteres";
      return null;
  }
};
```

#### 3. **Formatação Monetária**

```javascript
const formatAmount = (text) => {
  let cleaned = text.replace(/[^0-9,\\.]/g, ""); // Remove não-números
  cleaned = cleaned.replace(",", "."); // Vírgula vira ponto
  updateField("amount", cleaned);
};

// Mostra preview: R$ 1.500,00
{
  amount && `(${formatDisplayAmount(amount)})`;
}
```

#### 4. **Chips de Categoria**

```javascript
const CATEGORIES = {
  income: ['Salário', 'Freelance', 'Investimentos', ...],
  expense: ['Alimentação', 'Moradia', 'Transporte', ...]
};

// Renderiza como botões selecionáveis
CATEGORIES[type].map(cat => (
  <TouchableOpacity
    style={[
      styles.categoryChip,
      category === cat && { backgroundColor: colors.primary }
    ]}
    onPress={() => setCategory(cat)}
  >
    <Text>{cat}</Text>
  </TouchableOpacity>
))
```

**Para apresentar:**

- \"O formulário tem 4 campos obrigatórios: tipo, valor, descrição e categoria\"
- \"Validação em tempo real - vê os erros enquanto digita\"
- \"Categorias mudam baseadas no tipo (receita tem 'Salário', despesa tem 'Aluguel')\"
- \"O valor é formatado automaticamente para moeda brasileira\"

### 📄 `screens/ListScreen.js`

**O que faz:** Lista todas as transações com filtros e busca.

**Funcionalidades avançadas:**

#### 1. **Busca Inteligente**

```javascript
const filteredTransactions = useMemo(() => {
  let filtered = transactions;

  // Busca por descrição OU categoria
  if (searchText.trim()) {
    filtered = filtered.filter(
      (transaction) =>
        transaction.description
          .toLowerCase()
          .includes(searchText.toLowerCase()) ||
        transaction.category.toLowerCase().includes(searchText.toLowerCase())
    );
  }

  return filtered;
}, [transactions, searchText]);
```

#### 2. **Filtros Múltiplos**

```javascript
// Filtro por tipo
if (selectedFilter !== "all") {
  filtered = filtered.filter((t) => t.type === selectedFilter);
}

// Filtro por categoria
if (selectedCategory !== "all") {
  filtered = filtered.filter((t) => t.category === selectedCategory);
}

// Ordenação
filtered.sort((a, b) => {
  switch (sortOrder) {
    case "newest":
      return new Date(b.date) - new Date(a.date);
    case "highest":
      return b.amount - a.amount;
    // ...outros casos
  }
});
```

#### 3. **FlatList Otimizada**

```javascript
<FlatList
  data={filteredTransactions}
  renderItem={renderTransactionItem}
  // Otimizações de performance
  removeClippedSubviews={true} // Remove itens fora da tela
  maxToRenderPerBatch={10} // Renderiza 10 por vez
  windowSize={10} // Mantém 10 na memória
  initialNumToRender={10} // Renderiza 10 iniciais
/>
```

#### 4. **Modal de Filtros**

```javascript
<Modal visible={showFilters} animationType=\"slide\">
  <View style={styles.filtersModal}>
    {/* Filtros por tipo */}
    {/* Filtros por categoria */}
    {/* Opções de ordenação */}
  </View>
</Modal>
```

**Para apresentar:**

- \"A lista suporta milhares de transações sem travamento\"
- \"Busca funciona em descrição E categoria simultaneamente\"
- \"Modal de filtros permite combinar múltiplos critérios\"
- \"Ordenação por data (mais recente) ou valor (maior/menor)\"

---

## 🧩 Componentes Reutilizáveis

### 📄 `components/Header.js`

**O que faz:** Cabeçalho reutilizável com botão voltar opcional.

```javascript
<Header
  title=\"Nova Transação\"
  subtitle=\"Registre suas receitas e despesas\"
  showBackButton={true}
  onBackPress={() => navigation.goBack()}
/>
```

### 📄 `components/Button.js`

**O que faz:** Botão customizado com múltiplas variantes.

```javascript
// Botão primário
<Button title=\"Salvar\" variant=\"primary\" onPress={handleSave} />

// Botão de perigo
<Button title=\"Excluir\" variant=\"danger\" onPress={handleDelete} />

// Com ícone
<Button title=\"Adicionar\" icon=\"add-circle\" onPress={handleAdd} />
```

### 📄 `components/ListItem.js`

**O que faz:** Item de lista com ícone, título, subtítulo e ações.

```javascript
<ListItem
  icon=\"trending-up\"
  iconColor={colors.success}
  title=\"Salário\"
  subtitle=\"Trabalho • Hoje, 14:30\"
  value=\"R$ 5.000,00\"
  onDelete={() => handleDelete(id)}
  showDeleteButton={true}
/>
```

**Para apresentar:**

- \"Componentes reutilizáveis economizam tempo e garantem consistência\"
- \"Um Button é usado em 8+ lugares com estilos diferentes\"
- \"ListItem padroniza a aparência de todos os itens de lista\"

---

## 🎨 Sistema de Estilos

### 📄 `styles/globalStyles.js`

**O que faz:** Centraliza cores, tipografia e estilos reutilizáveis.

**Estrutura:**

#### 1. **Paleta de Cores**

```javascript
export const colors = {
  // Cores principais
  primary: "#007AFF", // Azul iOS
  success: "#34C759", // Verde (receitas)
  danger: "#FF3B30", // Vermelho (despesas)

  // Tons de cinza
  white: "#FFFFFF",
  lightGray: "#F2F2F7",
  gray: "#8E8E93",
  darkGray: "#3A3A3C",
};
```

#### 2. **Tipografia**

```javascript
export const typography = {
  fontSize: {
    small: 12, // Legendas
    regular: 16, // Texto normal
    medium: 18, // Subtítulos
    large: 24, // Títulos
    xlarge: 32, // Títulos grandes
  },
  fontWeight: {
    regular: "400",
    medium: "500",
    semibold: "600",
    bold: "700",
  },
};
```

#### 3. **Espaçamentos**

```javascript
export const spacing = {
  xs: 4, // Espaço mínimo
  sm: 8, // Pequeno
  md: 16, // Médio (padrão)
  lg: 24, // Grande
  xl: 32, // Extra grande
};
```

#### 4. **Estilos Globais**

```javascript
export const globalStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },

  button: {
    backgroundColor: colors.primary,
    borderRadius: 12,
    padding: spacing.md,
    alignItems: "center",
  },

  card: {
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: spacing.md,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
});
```

**Para apresentar:**

- \"Design system garante consistência visual em todo o app\"
- \"Cores seguem o padrão do iOS (azul primário, verde/vermelho para valores)\"
- \"Espaçamentos múltiplos de 8px para harmonia visual\"
- \"Sombras e bordas arredondadas dão aspecto moderno\"

---

## 🔄 Fluxo de Dados

### Como os dados fluem na aplicação:

```
1. FinanceContext (Estado Global)
   ├── transactions: []
   ├── addTransaction()
   └── removeTransaction()

2. HomeScreen
   ├── Lê: transactions, getTotalIncome(), getBalance()
   └── Exibe: saldo, resumos, categorias

3. FormScreen
   ├── Lê: addTransaction()
   └── Escreve: nova transação

4. ListScreen
   ├── Lê: transactions, removeTransaction()
   └── Escreve: remove transações
```

**Fluxo de uma nova transação:**

```
1. Usuário preenche formulário (FormScreen)
2. Clica em \"Salvar\"
3. addTransaction() é chamada
4. Context atualiza o estado global
5. HomeScreen recalcula automaticamente (saldo, totais)
6. ListScreen mostra a nova transação no topo
```

**Para apresentar:**

- \"Context API permite que dados sejam compartilhados entre telas\"
- \"Quando uma tela modifica dados, todas as outras são atualizadas automaticamente\"
- \"É como ter um 'banco de dados' na memória que todos acessam\"

---

## 🎤 Guia de Apresentação

### Para demonstrar o projeto:

#### 1. **Iniciar (2 min)**

- \"Desenvolvemos um app de controle financeiro em React Native\"
- \"Demonstra navegação, formulários, listas e gerenciamento de estado\"
- \"Funciona em iOS e Android com interface nativa\"

#### 2. **Demo da Home (3 min)**

**💡 Dica:** Use a versão web (`npm run web`) para apresentações - é mais rápida e confiável que Expo Go.

- Mostrar saldo atual, receitas/despesas
- \"Veja como o saldo muda de cor baseado no valor\"
- \"Top 5 categorias mostra onde mais se gasta\"
- Clicar nos botões de ação rápida

#### 3. **Demo do Formulário (4 min)**

- Alternar entre receita/despesa
- \"Validação em tempo real - vou digitar valor inválido\"
- Mostrar categorias diferentes por tipo
- \"Valor é formatado automaticamente em reais\"
- Adicionar uma transação real

#### 4. **Demo da Lista (3 min)**

- \"Lista atualizada automaticamente com a nova transação\"
- Mostrar busca por texto
- Abrir modal de filtros
- Remover uma transação (com confirmação)

#### 5. **Explicar Código (5 min)**

- \"Context API gerencia estado global\"
- \"FlatList otimizada suporta milhares de itens\"
- \"Validação robusta em todos os campos\"
- \"Design system consistente em todo o app\"

#### 6. **Aspectos Técnicos (3 min)**

- \"Responsivo para diferentes tamanhos de tela\"
- \"Componentes reutilizáveis economizam código\"
- \"Performance otimizada com hooks e memo\"
- \"Pronto para build iOS/Android\"

### Pontos fortes para destacar:

- ✅ **Interface profissional** (parece app real)
- ✅ **Funcionalidade completa** (CRUD + filtros + busca)
- ✅ **Código organizado** (componentes, contexts, styles)
- ✅ **Performance otimizada** (listas virtualizadas)
- ✅ **UX mobile** (navegação por abas, confirmações)
- ✅ **Multi-plataforma** (iOS, Android, Web simultaneamente)

### Se perguntarem sobre limitações:

- \"Dados ficam em memória - em produção usaríamos banco\"
- \"Não tem autenticação - seria próximo passo\"
- \"Focamos na funcionalidade core primeiro\"

---

**📱 Este projeto demonstra domínio completo do React Native e está pronto para apresentação profissional!**
