/**
 * Button.js - Componente de botão reutilizável
 *
 * Props:
 * - title: Texto do botão
 * - onPress: Função callback
 * - variant: Tipo do botão (primary, secondary, danger, outline)
 * - size: Tamanho (small, medium, large)
 * - disabled: Se o botão está desabilitado
 * - loading: Se está carregando
 * - icon: Nome do ícone opcional
 * - fullWidth: Se deve ocupar toda largura
 */

import React from "react";
import { TouchableOpacity, Text, ActivityIndicator, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { colors, spacing, typography, shadows } from "../styles/globalStyles";

export default function Button({
  title,
  onPress,
  variant = "primary",
  size = "medium",
  disabled = false,
  loading = false,
  icon,
  fullWidth = true,
  style,
  ...props
}) {
  // Determina as cores baseadas no variant
  const getVariantStyles = () => {
    switch (variant) {
      case "secondary":
        return {
          backgroundColor: colors.lightGray,
          borderColor: colors.border,
          textColor: colors.darkGray,
        };
      case "danger":
        return {
          backgroundColor: colors.danger,
          borderColor: colors.danger,
          textColor: colors.white,
        };
      case "outline":
        return {
          backgroundColor: "transparent",
          borderColor: colors.primary,
          textColor: colors.primary,
        };
      case "success":
        return {
          backgroundColor: colors.success,
          borderColor: colors.success,
          textColor: colors.white,
        };
      default: // primary
        return {
          backgroundColor: colors.primary,
          borderColor: colors.primary,
          textColor: colors.white,
        };
    }
  };

  // Determina o tamanho
  const getSizeStyles = () => {
    switch (size) {
      case "small":
        return {
          paddingVertical: spacing.sm,
          paddingHorizontal: spacing.md,
          fontSize: typography.fontSize.small,
          iconSize: 16,
        };
      case "large":
        return {
          paddingVertical: spacing.lg,
          paddingHorizontal: spacing.xl,
          fontSize: typography.fontSize.medium,
          iconSize: 24,
        };
      default: // medium
        return {
          paddingVertical: spacing.md,
          paddingHorizontal: spacing.lg,
          fontSize: typography.fontSize.regular,
          iconSize: 20,
        };
    }
  };

  const variantStyles = getVariantStyles();
  const sizeStyles = getSizeStyles();

  const buttonStyle = [
    styles.button,
    {
      backgroundColor: variantStyles.backgroundColor,
      borderColor: variantStyles.borderColor,
      paddingVertical: sizeStyles.paddingVertical,
      paddingHorizontal: sizeStyles.paddingHorizontal,
    },
    fullWidth && styles.fullWidth,
    disabled && styles.disabled,
    variant === "outline" && styles.outline,
    style,
  ];

  const textStyle = [
    styles.text,
    {
      color: variantStyles.textColor,
      fontSize: sizeStyles.fontSize,
    },
    disabled && styles.disabledText,
  ];

  return (
    <TouchableOpacity
      style={buttonStyle}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.8}
      {...props}
    >
      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="small" color={variantStyles.textColor} />
          {title && (
            <Text style={[textStyle, { marginLeft: spacing.sm }]}>{title}</Text>
          )}
        </View>
      ) : (
        <View style={styles.content}>
          {icon && (
            <Ionicons
              name={icon}
              size={sizeStyles.iconSize}
              color={variantStyles.textColor}
              style={title ? { marginRight: spacing.sm } : {}}
            />
          )}
          {title && <Text style={textStyle}>{title}</Text>}
        </View>
      )}
    </TouchableOpacity>
  );
}

const styles = {
  button: {
    borderRadius: 12,
    borderWidth: 2,
    alignItems: "center",
    justifyContent: "center",
    ...shadows.small,
  },

  fullWidth: {
    width: "100%",
  },

  outline: {
    backgroundColor: "transparent",
    ...shadows.small,
  },

  disabled: {
    opacity: 0.5,
  },

  text: {
    fontWeight: typography.fontWeight.semibold,
    textAlign: "center",
  },

  disabledText: {
    opacity: 0.7,
  },

  loadingContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },

  content: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
};
