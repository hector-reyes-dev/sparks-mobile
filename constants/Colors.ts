/**
 * Colors based on the English Spark Figma design
 * Primary colors and design system from the Figma file
 */

// Primary brand colors from Figma design
const primaryBlue = '#3B82F6';
const primaryOrange = '#F97316';
const backgroundLight = '#F8FAFC';
const cardBackground = '#FFFFFF';
const textPrimary = '#1E293B';
const textSecondary = '#64748B';
const textMuted = '#94A3B8';

export const Colors = {
  light: {
    // Main colors
    primary: primaryBlue,
    secondary: primaryOrange,
    background: backgroundLight,
    surface: cardBackground,
    
    // Text colors
    text: textPrimary,
    textSecondary: textSecondary,
    textMuted: textMuted,
    
    // UI elements
    border: '#E2E8F0',
    borderLight: '#F1F5F9',
    success: '#10B981',
    warning: '#F59E0B',
    error: '#EF4444',
    
    // Legacy support
    tint: primaryBlue,
    icon: textSecondary,
    tabIconDefault: textMuted,
    tabIconSelected: primaryBlue,
  },
  dark: {
    // Main colors (adapted for dark mode)
    primary: '#60A5FA',
    secondary: '#FB923C',
    background: '#0F172A',
    surface: '#1E293B',
    
    // Text colors
    text: '#F8FAFC',
    textSecondary: '#CBD5E1',
    textMuted: '#94A3B8',
    
    // UI elements
    border: '#334155',
    borderLight: '#475569',
    success: '#34D399',
    warning: '#FBBF24',
    error: '#F87171',
    
    // Legacy support
    tint: '#60A5FA',
    icon: '#CBD5E1',
    tabIconDefault: '#94A3B8',
    tabIconSelected: '#60A5FA',
  },
};
