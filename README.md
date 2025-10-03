# 💰 Controle Financeiro - React Native

<p align="center">
  <img src="https://img.shields.io/badge/React_Native-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React Native" />
  <img src="https://img.shields.io/ba## 📚 Documentação Adicional

Para informações mais detalhadas sobre o projeto, consulte os documentos na pasta `/docs`:

- **[📋 Relatório Técnico](docs/RELATORIO_TECNICO.md)** - Análise técnica detalhada, arquitetura e implementação
- **[🎯 Guia de Apresentação](docs/GUIA_APRESENTACAO.md)** - Roteiro completo para demonstração do aplicativo
- **[👥 Documentação da Equipe](docs/DOCUMENTACAO_EQUIPE.md)** - Explicação detalhada de cada arquivo para a equipe

## 👥 Equipe de Desenvolvimento

Desenvolvido para a disciplina de **Desenvolvimento para Dispositivos Móveis**.

## 📄 Licença

Este projeto foi desenvolvido para fins acadêmicos.

---

<p align="center">
  Feito com ❤️ usando React Native + Expo
</p>20?style=for-the-badge&logo=expo&logoColor=white" alt="Expo" />
  <img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black" alt="JavaScript" />
</p>

## 📱 Sobre o Projeto

Aplicativo móvel de controle financeiro desenvolvido em **React Native com Expo**, criado para a disciplina de Desenvolvimento para Dispositivos Móveis. O app permite gerenciar receitas e despesas de forma intuitiva e organizada.

### ✨ Funcionalidades Principais

- 🏠 **Tela Principal (Home)**: Dashboard com resumo financeiro e ações rápidas
- 📝 **Formulário Interativo**: Cadastro de receitas/despesas com validação
- 📊 **Lista Dinâmica**: Visualização e gerenciamento de todas as transações
- 🎨 **Design Responsivo**: Interface adaptável para diferentes tamanhos de tela
- 🔄 **Gerenciamento de Estado**: Context API para dados dinâmicos
- 🚀 **Navegação Fluida**: React Navigation com abas intuitivas

## 🛠️ Tecnologias Utilizadas

- **React Native** 0.72.10
- **Expo** ~49.0.15
- **TypeScript** para tipagem estática
- **React Navigation** 6.x
- **Context API** para gerenciamento de estado
- **Expo Vector Icons** para ícones
- **React Native Web** para suporte web
- **Webpack Config** para build web

## 📁 Estrutura do Projeto

```
src/
├── components/         # Componentes reutilizáveis
│   ├── Button.tsx     # Componente de botão customizado
│   ├── Header.tsx     # Componente de cabeçalho
│   └── ListItem.tsx   # Componente de item de lista
├── context/           # Context API
│   └── FinanceContext.tsx  # Contexto de finanças
├── screens/           # Telas do aplicativo
│   ├── HomeScreen.tsx     # Tela principal
│   ├── FormScreen.tsx     # Tela de formulário
│   └── ListScreen.tsx     # Tela de listagem
└── styles/            # Estilos globais
    └── globalStyles.ts    # Cores, espaçamentos e estilos
```

## 📋 Requisitos

- **Node.js** (versão 16 ou superior)
- **npm** ou **yarn**
- **Expo CLI** instalado globalmente
- **Expo Go** app (para testar no dispositivo)

## 🚀 Como Executar o Projeto

### 1. Clone o repositório

```bash
git clone <url-do-repositorio>
cd atividade
```

### 2. Instale as dependências

```bash
npm install
# ou
yarn install
```

### 3. Instale o Expo CLI (se não tiver)

```bash
npm install -g @expo/cli
```

### 4. Inicie o projeto

```bash
npm start
# ou
expo start
```

### 5. Execute no dispositivo

**Opção A - Dispositivo móvel:**

- **Android**: Instale o app **Expo Go** da Play Store
- **iOS**: Instale o app **Expo Go** da App Store
- Escaneie o QR Code que aparece no terminal/navegador

**Opção B - Navegador web (recomendado para desenvolvimento):**

```bash
npm run web
# ou
expo start --web
```

- O app abrirá automaticamente no navegador em `http://localhost:19006`

**Opção C - Emulador:**

- Configure emulador Android (Android Studio) ou iOS (Xcode)
- Use os comandos `npm run android` ou `npm run ios`

## 📁 Estrutura Detalhada do Projeto

```
atividade/
├── 📄 App.tsx                   # Componente raiz da aplicação
├── 📄 package.json              # Dependências e scripts
├── 📄 app.json                  # Configurações do Expo
├── 📄 babel.config.js           # Configurações do Babel
├── 📄 webpack.config.js         # Configurações do Webpack para web
├── 📄 tsconfig.json             # Configurações do TypeScript
├── 📄 README.md                 # Documentação do projeto
├── 📂 src/                      # Código fonte principal
│   ├── 📂 components/           # Componentes reutilizáveis
│   │   ├── 📄 Header.tsx        # Componente de cabeçalho
│   │   ├── 📄 Button.tsx        # Componente de botão customizado
│   │   └── 📄 ListItem.tsx      # Componente de item de lista
│   ├── 📂 screens/              # Telas do aplicativo
│   │   ├── 📄 HomeScreen.tsx    # Tela inicial com dashboard
│   │   ├── 📄 FormScreen.tsx    # Tela de formulário
│   │   └── 📄 ListScreen.tsx    # Tela de lista de transações
│   ├── 📂 context/              # Context API
│   │   └── 📄 FinanceContext.tsx # Contexto para gerenciamento de estado
│   └── 📂 styles/               # Estilos globais
│       └── 📄 globalStyles.ts   # Cores, espaçamentos e componentes
└── 📂 assets/                   # Recursos estáticos
    ├── 📂 images/               # Imagens
    └── 📂 icons/                # Ícones
```

## 🎯 Funcionalidades Detalhadas

### 🏠 Tela Principal (Home)

- **Saldo Atual**: Visualização do saldo total (receitas - despesas)
- **Resumo Financeiro**: Cards com totais de receitas e despesas
- **Categorias**: Top 5 categorias com maiores gastos
- **Ações Rápidas**: Botões para adicionar receita/despesa
- **Estatísticas**: Métricas como total de transações e taxa de gastos

### 📝 Tela de Formulário

- **Validação em Tempo Real**: Feedback imediato de erros
- **Campos Obrigatórios**: Valor, descrição e categoria
- **Seleção de Tipo**: Toggle entre receita e despesa
- **Categorias Predefinidas**: Chips selecionáveis por tipo
- **Formatação Monetária**: Visualização em tempo real do valor

### 📊 Tela de Lista

- **FlatList Otimizada**: Performance para muitas transações
- **Busca Inteligente**: Filtro por descrição e categoria
- **Filtros Avançados**: Por tipo, categoria e ordenação
- **Remoção Segura**: Confirmação antes de deletar
- **Estado Vazio**: Interface quando não há transações

## 🎨 Design System

### Paleta de Cores

- **Primary**: #007AFF (Azul iOS)
- **Success**: #34C759 (Verde para receitas)
- **Danger**: #FF3B30 (Vermelho para despesas)
- **Gray Scale**: #F2F2F7, #8E8E93, #3A3A3C

### Tipografia

- **Fonte Sistema**: Roboto (Android) / San Francisco (iOS)
- **Tamanhos**: 12px → 40px (escala consistente)
- **Pesos**: 300, 400, 500, 600, 700

## 📱 Responsividade

O app é otimizado para diferentes tamanhos de tela:

- **Phones**: 320px → 414px
- **Tablets**: Suporte básico
- **Web**: Responsivo para desktop e mobile
- **Orientação**: Modo retrato otimizado (mobile), flexível (web)

## 🧪 Testes e Validação

### Validações Implementadas

- **Valor**: Maior que zero, formato numérico
- **Descrição**: Mínimo 3 caracteres, máximo 50
- **Categoria**: Seleção obrigatória

### Cenários Testados

- ✅ Adicionar receitas/despesas
- ✅ Remover transações
- ✅ Filtros e busca
- ✅ Navegação entre telas
- ✅ Validação de formulários
- ✅ Estados vazios
- ✅ Responsividade

## 📈 Melhorias Futuras

- 📊 **Gráficos**: Charts para visualização de dados
- 💾 **Persistência**: AsyncStorage para salvar dados
- 🔔 **Notificações**: Lembretes e alertas
- 📤 **Export**: Relatórios em PDF/Excel
- 🎯 **Metas**: Sistema de objetivos financeiros
- 🔐 **Autenticação**: Login e sincronização

## 🐛 Problemas Conhecidos

- Dados são perdidos ao recarregar (não há persistência - por design para demonstração)
- Suporte otimizado principalmente para modo retrato
- Navegação pelos botões de ação rápida na HomeScreen necessita implementação de parâmetros de navegação

## 🔧 Melhorias Recentes

- ✅ **Migração para TypeScript**: Maior segurança de tipos e IntelliSense
- ✅ **Estrutura Organizada**: Todos os componentes movidos para pasta src/
- ✅ **Dependências Atualizadas**: React Native 0.72.10 para melhor compatibilidade
- ✅ **Correções de Build**: Eliminados todos os erros de TypeScript
- ✅ **Suporte Web Completo**: React Native Web + Webpack para execução no navegador
- ✅ **Navegação Funcional**: Botões de ação e remoção funcionando corretamente
- ✅ **Limpeza de Código**: Remoção de arquivos duplicados e comentários desnecessários

## 👥 Equipe de Desenvolvimento

Desenvolvido para a disciplina de **Desenvolvimento para Dispositivos Móveis**.

## 📄 Licença

Este projeto foi desenvolvido para fins acadêmicos.

---

<p align=\"center\">
  Feito com ❤️ usando React Native + Expo
</p>
