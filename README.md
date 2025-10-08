# 💰 Controle Financeiro - React Native

<p align="center">
  <img src="https://img.shields.io/badge/React_Native-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React Native" />
  <img src="https://img.shields.io/badge/Expo-000020?style=for-the-badge&logo=expo&logoColor=white" alt="Expo" />
  <img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
</p>

## 📱 Sobre o Projeto

Aplicativo móvel de controle financeiro completo desenvolvido em **React Native com Expo** e **TypeScript**. O app oferece uma experiência completa de gerenciamento financeiro pessoal com funcionalidades avançadas de filtragem, notificações e interface moderna.

### ✨ Funcionalidades Implementadas

- 🏠 **Dashboard Inteligente**: Saldo atual, receitas e despesas com botões funcionais
- 📝 **Cadastro Avançado**: Formulário com validação e notificações de sucesso
- 📊 **Lista Completa**: Busca, filtros avançados, ordenação e remoção segura
- � **Sistema de Notificações**: Toast notifications para feedback do usuário
- 🎯 **Filtros Inteligentes**: Por tipo, categoria e valor (maior/menor)
- 🗑️ **Remoção Segura**: Confirmação antes de excluir transações
- 🎨 **Interface Moderna**: Design responsivo e animações suaves
- 🚀 **Navegação Fluida**: Tabs com React Navigation e passagem de parâmetros

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
├── components/          # Componentes reutilizáveis
│   └── Toast.tsx       # Sistema de notificações
├── context/            # Gerenciamento de estado global
│   └── FinanceContext.tsx  # Context API para transações
├── hooks/              # Custom hooks
│   └── useToast.ts     # Hook para notificações
├── screens/            # Telas do aplicativo
│   ├── HomeScreen.tsx      # Dashboard principal
│   ├── FormScreen.tsx      # Formulário de transações
│   └── ListScreen.tsx      # Lista com filtros avançados
└── types/              # Definições TypeScript
    └── index.ts        # Interfaces e tipos
docs/                   # Documentação completa
├── GUIA_APRESENTACAO.md    # Guia para apresentação
├── DOCUMENTACAO_EQUIPE.md  # Documentação da equipe
└── RELATORIO_TECNICO.md    # Relatório técnico detalhado
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

### 🏠 Dashboard Principal (HomeScreen)

- 💰 Saldo total dinâmico (verde/vermelho)
- 📈 Cards de receitas e despesas
- 📊 Resumo completo de transações
- 🎯 **Botões funcionais** que navegam para formulário pré-configurado
- 🚀 Integração com navegação e parâmetros

### 📝 Formulário Inteligente (FormScreen)

- ✅ Validação em tempo real
- 🎯 Tipo pré-selecionado via navegação
- 📂 Categorias predefinidas por contexto
- 💱 Formatação monetária automática
- 🔔 **Notificações de sucesso/erro**
- 🎨 Interface responsiva e intuitiva

### 📊 Lista Avançada (ListScreen)

- 🔍 **Busca em tempo real** por descrição
- 🎛️ **Filtros múltiplos**: tipo, categoria, valor
- 📊 **Ordenação inteligente**: data, valor (crescente/decrescente), descrição
- 🗑️ **Remoção segura** com confirmação
- 🔔 **Feedback visual** com toast notifications
- 📱 Interface otimizada para mobile e web

### 🔔 Sistema de Notificações

- ✅ **Toast personalizados** (sucesso, erro, aviso, info)
- 🎨 **Animações suaves** de entrada e saída
- ⏱️ **Auto-dismiss** configurável
- 👆 **Toque para dispensar**
- 🎯 **Ícones contextuais** para cada tipo

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
