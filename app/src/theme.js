import { Platform, useWindowDimensions } from 'react-native';

export const colors = {
  primary: '#1D4ED8',        // vibrant royal blue (buttons, active pills)
  primaryDark: '#0F1E4B',    // dark navy brand
  primaryLight: '#3B82F6',   // lighter blue
  primarySubtle: '#EFF6FF',  // ice blue container
  accent: '#F59E0B',         // amber
  bg: '#F8FAFC',             // soft light gray background
  card: '#FFFFFF',           // white card background
  cardDark: '#0F1E4B',       // navy announcement card
  text: '#0F172A',           // dark slate / near black
  textSecondary: '#475569',  // secondary text
  muted: '#64748B',          // slate 500
  mutedLight: '#94A3B8',     // light slate
  border: '#E2E8F0',         // subtle border
  borderLight: '#F1F5F9',
  
  // Status badges & accents
  success: '#10B981',        // emerald green
  successBg: '#ECFDF5',
  successText: '#065F46',
  
  danger: '#EF4444',         // red
  dangerBg: '#FEE2E2',
  dangerText: '#991B1B',
  
  warning: '#F59E0B',        // amber
  warningBg: '#FEF3C7',
  warningText: '#92400E',
  
  info: '#3B82F6',
  infoBg: '#DBEAFE',
  infoText: '#1E40AF',
  
  sidebar: '#0B132B',
  sidebarHover: '#1C2541',
};

export const spacing = { xs: 4, sm: 8, md: 16, lg: 24, xl: 32, xxl: 40 };

export const radius = { sm: 8, md: 12, lg: 16, xl: 20, pill: 999 };

export const shadows = Platform.select({
  web: {
    sm: { boxShadow: '0 1px 2px rgba(15, 23, 42, 0.05)' },
    md: { boxShadow: '0 4px 10px rgba(15, 23, 42, 0.08)' },
    lg: { boxShadow: '0 10px 20px rgba(15, 23, 42, 0.12)' },
  },
  default: {
    sm: {
      shadowColor: '#0F172A',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.05,
      shadowRadius: 2,
      elevation: 1,
    },
    md: {
      shadowColor: '#0F172A',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.08,
      shadowRadius: 10,
      elevation: 3,
    },
    lg: {
      shadowColor: '#0F172A',
      shadowOffset: { width: 0, height: 10 },
      shadowOpacity: 0.12,
      shadowRadius: 20,
      elevation: 6,
    },
  },
});

export function useBreakpoint() {
  const { width } = useWindowDimensions();
  const isDesktop = width >= 1024;
  const isTablet = width >= 768 && width < 1024;
  const isMobile = width < 768;
  return { width, isDesktop, isTablet, isMobile };
}

export const font = {
  family: Platform.select({ ios: 'System', android: 'sans-serif', default: 'System' }),
};
