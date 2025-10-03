/**
 * ListItem.js - Componente de item de lista reutilizável
 *
 * Props:
 * - title: Título principal
 * - subtitle: Subtítulo opcional
 * - value: Valor à direita
 * - icon: Ícone à esquerda
 * - iconColor: Cor do ícone
 * - onPress: Função callback ao pressionar
 * - onDelete: Função callback para deletar
 * - showDeleteButton: Se deve mostrar botão de deletar
 * - borderColor: Cor da borda lateral
 */

import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { colors, spacing, typography, shadows } from "../styles/globalStyles";

export default function ListItem({
  title,
  subtitle,
  value,
  icon,
  iconColor = colors.primary,
  onPress,
  onDelete,
  showDeleteButton = false,
  borderColor,
  style,
}) {
  return (
    <View
      style={[
        styles.container,
        borderColor && { borderLeftColor: borderColor },
        style,
      ]}
    >
      <TouchableOpacity
        style={styles.content}
        onPress={onPress}
        activeOpacity={onPress ? 0.7 : 1}
      >
        {/* Ícone */}
        {icon && (
          <View
            style={[
              styles.iconContainer,
              { backgroundColor: `${iconColor}20` },
            ]}
          >
            <Ionicons name={icon} size={24} color={iconColor} />
          </View>
        )}

        {/* Conteúdo principal */}
        <View style={styles.mainContent}>
          <Text style={styles.title} numberOfLines={1}>
            {title}
          </Text>
          {subtitle && (
            <Text style={styles.subtitle} numberOfLines={1}>
              {subtitle}
            </Text>
          )}
        </View>

        {/* Valor à direita */}
        {value && (
          <View style={styles.valueContainer}>
            <Text style={styles.value} numberOfLines={1}>
              {value}
            </Text>
          </View>
        )}

        {/* Seta de navegação */}
        {onPress && !showDeleteButton && (
          <View style={styles.arrow}>
            <Ionicons name="chevron-forward" size={20} color={colors.gray} />
          </View>
        )}
      </TouchableOpacity>

      {/* Botão de deletar */}
      {showDeleteButton && onDelete && (
        <TouchableOpacity style={styles.deleteButton} onPress={onDelete}>
          <Ionicons name="trash-outline" size={20} color={colors.danger} />
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = {
  container: {
    backgroundColor: colors.white,
    borderRadius: 12,
    borderLeftWidth: 4,
    borderLeftColor: "transparent",
    marginVertical: spacing.xs,
    flexDirection: "row",
    alignItems: "center",
    ...shadows.small,
  },

  content: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    padding: spacing.md,
  },

  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    marginRight: spacing.md,
  },

  mainContent: {
    flex: 1,
    marginRight: spacing.sm,
  },

  title: {
    fontSize: typography.fontSize.regular,
    fontWeight: typography.fontWeight.semibold,
    color: colors.darkGray,
    marginBottom: spacing.xs / 2,
  },

  subtitle: {
    fontSize: typography.fontSize.small,
    color: colors.gray,
  },

  valueContainer: {
    alignItems: "flex-end",
  },

  value: {
    fontSize: typography.fontSize.regular,
    fontWeight: typography.fontWeight.semibold,
    color: colors.darkGray,
  },

  arrow: {
    marginLeft: spacing.sm,
  },

  deleteButton: {
    padding: spacing.md,
    alignItems: "center",
    justifyContent: "center",
  },
};
