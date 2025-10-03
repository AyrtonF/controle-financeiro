/**
 * Header.js - Componente de header reutilizável
 *
 * Props:
 * - title: Título do header
 * - subtitle: Subtítulo opcional
 * - showBackButton: Se deve mostrar botão de voltar
 * - onBackPress: Função callback do botão voltar
 * - backgroundColor: Cor de fundo customizada
 */

import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { colors, spacing, typography } from "../styles/globalStyles";

export default function Header({
  title,
  subtitle,
  showBackButton = false,
  onBackPress,
  backgroundColor = colors.white,
  textColor = colors.darkGray,
}) {
  return (
    <View style={[styles.container, { backgroundColor }]}>
      {showBackButton && (
        <TouchableOpacity style={styles.backButton} onPress={onBackPress}>
          <Ionicons name="arrow-back" size={24} color={textColor} />
        </TouchableOpacity>
      )}

      <View style={styles.content}>
        <Text style={[styles.title, { color: textColor }]}>{title}</Text>
        {subtitle && (
          <Text style={[styles.subtitle, { color: textColor, opacity: 0.7 }]}>
            {subtitle}
          </Text>
        )}
      </View>
    </View>
  );
}

const styles = {
  container: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },

  backButton: {
    marginRight: spacing.md,
    padding: spacing.xs,
  },

  content: {
    flex: 1,
  },

  title: {
    fontSize: typography.fontSize.large,
    fontWeight: typography.fontWeight.bold,
  },

  subtitle: {
    fontSize: typography.fontSize.regular,
    marginTop: spacing.xs,
  },
};
