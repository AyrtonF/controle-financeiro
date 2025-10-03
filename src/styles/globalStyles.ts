/**
 * globalStyles.ts - Estilos globais para o aplicativo
 * Contém cores, espaçamentos, tipografia e componentes reutilizáveis
 * Versão corrigida com tipos TypeScript
 */

// Cores do aplicativo
export const colors = {
  primary: "#007AFF",
  secondary: "#5856D6",
  success: "#28A745",
  danger: "#DC3545",
  warning: "#FFC107",
  info: "#17A2B8",

  // Cores neutras
  white: "#FFFFFF",
  black: "#000000",
  gray: "#6C757D",
  lightGray: "#F8F9FA",
  darkGray: "#343A40",
  border: "#E9ECEF",
  separator: "#DEE2E6",

  // Background
  background: "#F8F9FA",
  surface: "#FFFFFF",

  // Text colors
  text: "#212529",
  textSecondary: "#6C757D",
  textLight: "#ADB5BD",
};

// Espaçamentos
export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
};

// Border radius
export const borderRadius = {
  sm: 4,
  md: 8,
  lg: 12,
  xl: 16,
  round: 9999,
};

// Tipografia
export const typography = {
  fontSize: {
    xs: 12,
    small: 14,
    regular: 16,
    medium: 18,
    large: 20,
    xl: 24,
    xxl: 28,
    huge: 32,
  },
  fontWeight: {
    light: "300" as const,
    normal: "400" as const,
    medium: "500" as const,
    semibold: "600" as const,
    bold: "700" as const,
  },
  lineHeight: {
    tight: 1.2,
    normal: 1.4,
    relaxed: 1.6,
    loose: 1.8,
  },
};

// Sombras
export const shadows = {
  small: {
    shadowColor: colors.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 2,
  },
  medium: {
    shadowColor: colors.black,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.15,
    shadowRadius: 6.27,
    elevation: 4,
  },
  large: {
    shadowColor: colors.black,
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.2,
    shadowRadius: 12.84,
    elevation: 8,
  },
};

// Estilos globais
export const globalStyles = {
  // Containers
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  safeContainer: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollContainer: {
    flexGrow: 1,
    paddingBottom: spacing.xl,
  },

  // Cards
  card: {
    backgroundColor: colors.white,
    borderRadius: borderRadius.lg,
    padding: spacing.md,
    marginVertical: spacing.sm,
    ...shadows.small,
  },
  cardLarge: {
    backgroundColor: colors.white,
    borderRadius: borderRadius.lg,
    padding: spacing.lg,
    marginVertical: spacing.md,
    ...shadows.medium,
  },

  // Botões
  button: {
    backgroundColor: colors.primary,
    borderRadius: borderRadius.md,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    alignItems: "center" as const,
    justifyContent: "center" as const,
    ...shadows.small,
  },
  buttonSecondary: {
    backgroundColor: colors.lightGray,
    borderRadius: borderRadius.md,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    alignItems: "center" as const,
    justifyContent: "center" as const,
  },
  buttonDanger: {
    backgroundColor: colors.danger,
    borderRadius: borderRadius.md,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    alignItems: "center" as const,
    justifyContent: "center" as const,
  },

  // Textos
  title: {
    fontSize: typography.fontSize.xl,
    fontWeight: typography.fontWeight.bold,
    color: colors.text,
    marginBottom: spacing.sm,
    textAlign: "center" as const,
  },
  subtitle: {
    fontSize: typography.fontSize.regular,
    fontWeight: typography.fontWeight.medium,
    color: colors.textSecondary,
    marginBottom: spacing.md,
    textAlign: "center" as const,
  },
  text: {
    fontSize: typography.fontSize.regular,
    color: colors.text,
    lineHeight: typography.lineHeight.normal * typography.fontSize.regular,
  },
  textSmall: {
    fontSize: typography.fontSize.small,
    color: colors.textSecondary,
  },
  textBold: {
    fontSize: typography.fontSize.regular,
    fontWeight: typography.fontWeight.bold,
    color: colors.text,
  },

  // Inputs
  input: {
    backgroundColor: colors.white,
    borderRadius: borderRadius.md,
    borderWidth: 1,
    borderColor: colors.border,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.md,
    fontSize: typography.fontSize.regular,
    color: colors.text,
    ...shadows.small,
  },
  inputError: {
    borderColor: colors.danger,
  },

  // Layout helpers
  row: {
    flexDirection: "row" as const,
    alignItems: "center" as const,
  },
  rowBetween: {
    flexDirection: "row" as const,
    alignItems: "center" as const,
    justifyContent: "space-between" as const,
  },
  column: {
    flexDirection: "column" as const,
  },
  center: {
    alignItems: "center" as const,
    justifyContent: "center" as const,
  },

  // Espaçamentos
  mt: { marginTop: spacing.md },
  mb: { marginBottom: spacing.md },
  ml: { marginLeft: spacing.md },
  mr: { marginRight: spacing.md },
  mx: { marginHorizontal: spacing.md },
  my: { marginVertical: spacing.md },
  pt: { paddingTop: spacing.md },
  pb: { paddingBottom: spacing.md },
  pl: { paddingLeft: spacing.md },
  pr: { paddingRight: spacing.md },
  px: { paddingHorizontal: spacing.md },
  py: { paddingVertical: spacing.md },

  // Separadores
  separator: {
    height: 1,
    backgroundColor: colors.separator,
    marginVertical: spacing.md,
  },
};
