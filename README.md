# 💰 Controle Financeiro - React Native

<p align="center">
  <img src="https://img.shields.io/badge/React_Native-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React Native" />
  <img src="https://img.shields.io/badge/Expo-000020?style=for-the-badge&logo=expo&logoColor=white" alt="Expo" />
  <img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
</p>

## 📱 Sobre o Projeto

Aplicativo móvel de controle financeiro desenvolvido em **React Native com Expo** e **TypeScript**. O app permite gerenciar receitas e despesas de forma intuitiva, com interface moderna e navegação fluida.

### ✨ Funcionalidades

- 🏠 **Dashboard Financeiro**: Saldo atual, receitas e despesas
- 📝 **Cadastro de Transações**: Formulário com validação em tempo real
- 📊 **Lista de Transações**: Busca, filtros e remoção
- 🎨 **Interface Responsiva**: Design moderno e adaptável
- 🚀 **Navegação Intuitiva**: Abas com React Navigation

## 🛠️ Stack Tecnológico

- **React Native** 0.72.10 - Framework multiplataforma
- **Expo** ~49.0.15 - Plataforma de desenvolvimento
- **TypeScript** - Tipagem estática
- **React Navigation** 6.x - Navegação entre telas
- **Context API** - Gerenciamento de estado
- **React Native Web** - Suporte para execução no navegador

## 📁 Estrutura do Projeto

```
src/
├── components/           # Componentes reutilizáveis
├── context/             # Gerenciamento de estado global
├── screens/             # Telas do aplicativo
└── styles/              # Estilos e design system
```

## 🚀 Como Executar

### Pré-requisitos

- Node.js 16+
- npm ou yarn
- Expo CLI

### Instalação

```bash
# Clone o repositório
git clone <url-do-repositorio>
cd atividade

# Instale as dependências
npm install

# Instale o Expo CLI (se necessário)
npm install -g @expo/cli
```

### Execução

**Desenvolvimento Web (Recomendado)**
```bash
npm run web
# ou
expo start --web
```
Abre automaticamente em `http://localhost:19006`

**Dispositivo Móvel**
```bash
npm start
```
Escaneie o QR Code com o app **Expo Go**

**Emulador**
```bash
npm run android  # Android Studio
npm run ios      # Xcode (macOS)
```

## 🎯 Funcionalidades Detalhadas

### 🏠 Tela Principal
- Saldo total colorido (verde/vermelho)
- Cards de receitas e despesas
- Resumo de transações
- Botões de ação rápida

### 📝 Formulário
- Validação em tempo real
- Seleção de tipo (receita/despesa)
- Categorias predefinidas
- Formatação monetária

### 📊 Lista de Transações
- Busca por descrição e categoria
- Remoção com confirmação
- Interface otimizada
- Estado vazio tratado

## 🎨 Design System

### Cores
- **Primary**: #007AFF
- **Success**: #28A745 (receitas)
- **Danger**: #DC3545 (despesas)
- **Gray**: #8E8E93, #F2F2F7

### Tipografia
- Fonte do sistema (iOS/Android)
- Hierarquia consistente
- Tamanhos responsivos

## 🧪 Validações

- **Valor**: Obrigatório, maior que zero
- **Descrição**: Mínimo 3 caracteres
- **Categoria**: Seleção obrigatória

## 📱 Compatibilidade

- ✅ iOS (Expo Go)
- ✅ Android (Expo Go)
- ✅ Web (Chrome, Firefox, Safari)
- ✅ Responsivo para diferentes telas

## 🔧 Melhorias Implementadas

- ✅ Migração completa para TypeScript
- ✅ Estrutura organizada em `src/`
- ✅ Navegação funcional
- ✅ Suporte web integrado
- ✅ Código limpo e documentado

## 📈 Próximos Passos

- 💾 Persistência de dados (AsyncStorage)
- 📊 Gráficos e relatórios
- 🔔 Notificações
- 🎯 Metas financeiras
- 🔐 Autenticação

## 📋 Documentação Técnica

Para análise técnica detalhada, consulte:
- **[📋 Relatório Técnico](docs/RELATORIO_TECNICO.md)** - Arquitetura, implementação e análises

## 👥 Desenvolvimento

Projeto desenvolvido para a disciplina de **Desenvolvimento para Dispositivos Móveis**.

## 📄 Licença

Este projeto foi desenvolvido para fins acadêmicos.

---

<p align="center">
  Feito com ❤️ usando React Native + Expo + TypeScript
</p>