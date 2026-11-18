import React from 'react';
import {
  Text,
  TextInput,
  View,
  Pressable,
  ActivityIndicator,
  StyleSheet,
  ScrollView,
  Image,
} from 'react-native';
import { colors, radius, spacing, shadows } from '../theme';

// Universal Icon Component
export function Icon({ name, size = 20, color = colors.muted, style }) {
  // Map commonly used icons to clean unicode symbols with exact typography
  const map = {
    home: '⊞',
    dashboard: '▦',
    payments: '💳',
    card: '💳',
    cash: '💵',
    calendar: '📅',
    inbox: '✉',
    mail: '✉',
    profile: '👤',
    user: '👤',
    bell: '🔔',
    search: '🔍',
    settings: '⚙',
    lock: '🔒',
    at: '@',
    eye: '👁',
    eyeOff: '👁‍🗨',
    phone: '📞',
    check: '✓',
    chevronRight: '›',
    chevronLeft: '‹',
    arrowRight: '→',
    filter: '⑂',
    plus: '+',
    edit: '✎',
    logout: '⎋',
    shield: '🛡',
    alert: '⚠',
    cross: '✕',
    clock: '🕒',
    folder: '📁',
    document: '📄',
    download: '⬇',
    tag: '🏷',
    star: '★',
    dots: '⋮',
  };

  const glyph = map[name] || '•';

  return (
    <View style={[{ width: size, height: size, alignItems: 'center', justifyContent: 'center' }, style]}>
      <Text style={{ fontSize: size * 0.85, color, lineHeight: size, textAlign: 'center', fontWeight: '600' }}>
        {glyph}
      </Text>
    </View>
  );
}

// User Avatar component
export function Avatar({ source, name = 'User', size = 40, status, style }) {
  const initials = name
    .split(' ')
    .map((n) => n[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();

  const colorsList = ['#3B82F6', '#10B981', '#8B5CF6', '#F59E0B', '#EC4899', '#06B6D4'];
  const bg = colorsList[name.charCodeAt(0) % colorsList.length];

  return (
    <View style={[{ width: size, height: size, position: 'relative' }, style]}>
      {source ? (
        <Image
          source={{ uri: source }}
          style={{ width: size, height: size, borderRadius: size / 2, backgroundColor: colors.border }}
        />
      ) : (
        <View
          style={{
            width: size,
            height: size,
            borderRadius: size / 2,
            backgroundColor: bg,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Text style={{ color: '#fff', fontWeight: '700', fontSize: size * 0.4 }}>{initials}</Text>
        </View>
      )}
      {status ? (
        <View
          style={{
            position: 'absolute',
            bottom: 0,
            right: 0,
            width: size * 0.3,
            height: size * 0.3,
            borderRadius: (size * 0.3) / 2,
            backgroundColor: status === 'online' ? colors.success : colors.muted,
            borderWidth: 2,
            borderColor: '#fff',
          }}
        />
      ) : null}
    </View>
  );
}

// Custom Switch Toggle
export function SwitchToggle({ value, onValueChange, disabled }) {
  return (
    <Pressable
      onPress={() => !disabled && onValueChange && onValueChange(!value)}
      style={[
        styles.switchTrack,
        { backgroundColor: value ? colors.primary : '#E2E8F0', opacity: disabled ? 0.6 : 1 },
      ]}
    >
      <View
        style={[
          styles.switchThumb,
          { transform: [{ translateX: value ? 20 : 2 }] },
        ]}
      />
    </Pressable>
  );
}

// Horizontal Progress Bar
export function ProgressBar({ progress = 0, color = colors.primary, height = 6, style }) {
  const pct = Math.max(0, Math.min(100, progress));
  return (
    <View style={[{ height, backgroundColor: '#E2E8F0', borderRadius: height / 2, overflow: 'hidden' }, style]}>
      <View style={{ height: '100%', width: `${pct}%`, backgroundColor: color, borderRadius: height / 2 }} />
    </View>
  );
}

export function Button({
  title,
  onPress,
  variant = 'primary',
  loading,
  style,
  textStyle,
  icon,
  iconRight,
  disabled,
  size = 'md',
}) {
  const getColors = () => {
    switch (variant) {
      case 'primary':
        return { bg: colors.primary, fg: '#FFFFFF', border: 'transparent' };
      case 'secondary':
        return { bg: colors.primarySubtle, fg: colors.primary, border: 'transparent' };
      case 'outline':
        return { bg: '#FFFFFF', fg: colors.primary, border: colors.primary };
      case 'ghost':
        return { bg: 'transparent', fg: colors.textSecondary, border: colors.border };
      case 'danger':
        return { bg: colors.danger, fg: '#FFFFFF', border: 'transparent' };
      case 'dangerOutline':
        return { bg: colors.dangerBg, fg: colors.danger, border: 'transparent' };
      case 'success':
        return { bg: colors.success, fg: '#FFFFFF', border: 'transparent' };
      case 'white':
        return { bg: '#FFFFFF', fg: colors.primary, border: 'transparent' };
      case 'dark':
        return { bg: '#0F172A', fg: '#FFFFFF', border: 'transparent' };
      default:
        return { bg: colors.primary, fg: '#FFFFFF', border: 'transparent' };
    }
  };

  const { bg, fg, border } = getColors();
  const padV = size === 'sm' ? 8 : size === 'lg' ? 14 : 11;
  const padH = size === 'sm' ? 12 : size === 'lg' ? 24 : 16;
  const fSize = size === 'sm' ? 13 : size === 'lg' ? 16 : 14;

  return (
    <Pressable
      onPress={onPress}
      disabled={disabled || loading}
      style={({ pressed }) => [
        styles.btn,
        {
          backgroundColor: bg,
          borderColor: border,
          borderWidth: border !== 'transparent' ? 1.5 : 0,
          paddingVertical: padV,
          paddingHorizontal: padH,
          opacity: pressed || disabled ? 0.8 : 1,
        },
        style,
      ]}
    >
      {loading ? (
        <ActivityIndicator color={fg} size="small" />
      ) : (
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
          {icon ? <View style={{ marginRight: 6 }}>{icon}</View> : null}
          <Text style={[styles.btnText, { color: fg, fontSize: fSize }, textStyle]}>{title}</Text>
          {iconRight ? <View style={{ marginLeft: 6 }}>{iconRight}</View> : null}
        </View>
      )}
    </Pressable>
  );
}

export function Input({
  label,
  value,
  onChangeText,
  placeholder,
  secureTextEntry,
  keyboardType,
  style,
  inputStyle,
  iconLeft,
  iconRight,
  onPressRight,
  error,
  helper,
  multiline,
  numberOfLines = 1,
}) {
  return (
    <View style={[{ marginBottom: spacing.md }, style]}>
      {label ? <Text style={styles.label}>{label}</Text> : null}
      <View
        style={[
          styles.inputWrap,
          multiline && { height: numberOfLines * 24 + 24, alignItems: 'flex-start' },
          error && { borderColor: colors.danger },
        ]}
      >
        {iconLeft ? <View style={{ marginRight: 8 }}>{iconLeft}</View> : null}
        <TextInput
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor={colors.mutedLight}
          secureTextEntry={secureTextEntry}
          keyboardType={keyboardType}
          autoCapitalize="none"
          multiline={multiline}
          numberOfLines={numberOfLines}
          style={[
            styles.input,
            multiline && { textAlignVertical: 'top', paddingTop: 8 },
            inputStyle,
          ]}
        />
        {iconRight ? (
          <Pressable onPress={onPressRight} hitSlop={8} style={{ padding: 4 }}>
            {iconRight}
          </Pressable>
        ) : null}
      </View>
      {error ? <Text style={styles.errorText}>{error}</Text> : null}
      {helper && !error ? <Text style={styles.helperText}>{helper}</Text> : null}
    </View>
  );
}

export function Card({ children, style, padded = true }) {
  return (
    <View style={[styles.card, shadows.sm, padded && { padding: spacing.md }, style]}>
      {children}
    </View>
  );
}

export function Stat({ label, value, subtext, badge, accent = colors.primary, icon, style }) {
  return (
    <Card style={[styles.stat, style]}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <Text style={styles.statLabel}>{label}</Text>
        {badge ? badge : icon ? <View>{icon}</View> : null}
      </View>
      <Text style={styles.statValue}>{value}</Text>
      {subtext ? <Text style={styles.statSub}>{subtext}</Text> : null}
      <View style={[styles.statBar, { backgroundColor: accent }]} />
    </Card>
  );
}

export function Badge({ text, tone = 'primary', size = 'md', style, icon }) {
  const getBadgeStyle = () => {
    switch (tone) {
      case 'overdue':
      case 'danger':
        return { bg: colors.dangerBg, fg: colors.dangerText };
      case 'paid':
      case 'success':
      case 'active':
        return { bg: colors.successBg, fg: colors.successText };
      case 'pending':
      case 'warning':
        return { bg: colors.warningBg, fg: colors.warningText };
      case 'info':
        return { bg: colors.infoBg, fg: colors.infoText };
      case 'inactive':
      case 'muted':
        return { bg: '#F1F5F9', fg: '#64748B' };
      case 'blue':
      case 'primary':
      default:
        return { bg: colors.primarySubtle, fg: colors.primary };
    }
  };

  const { bg, fg } = getBadgeStyle();
  const padV = size === 'sm' ? 2 : 4;
  const padH = size === 'sm' ? 8 : 12;
  const fSize = size === 'sm' ? 11 : 12;

  return (
    <View
      style={[
        styles.badge,
        { backgroundColor: bg, paddingVertical: padV, paddingHorizontal: padH },
        style,
      ]}
    >
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        {icon ? <View style={{ marginRight: 4 }}>{icon}</View> : null}
        <Text style={[styles.badgeText, { color: fg, fontSize: fSize }]}>{text}</Text>
      </View>
    </View>
  );
}

export function Empty({ text = 'No items found' }) {
  return (
    <View style={{ paddingVertical: spacing.xl, alignItems: 'center' }}>
      <Text style={{ fontSize: 28, color: colors.mutedLight, marginBottom: 8 }}>📭</Text>
      <Text style={styles.empty}>{text}</Text>
    </View>
  );
}

export function Loading() {
  return (
    <View style={{ padding: spacing.xl, alignItems: 'center', justifyContent: 'center' }}>
      <ActivityIndicator size="large" color={colors.primary} />
    </View>
  );
}

const styles = StyleSheet.create({
  btn: {
    borderRadius: radius.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnText: { fontWeight: '700' },
  label: { color: colors.textSecondary, fontWeight: '700', marginBottom: 6, fontSize: 12, textTransform: 'uppercase', letterSpacing: 0.5 },
  inputWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.md,
    paddingHorizontal: 12,
    backgroundColor: '#FFFFFF',
    height: 48,
  },
  input: {
    flex: 1,
    color: colors.text,
    fontSize: 14,
    height: '100%',
  },
  errorText: { color: colors.danger, fontSize: 12, marginTop: 4 },
  helperText: { color: colors.muted, fontSize: 12, marginTop: 4 },
  card: {
    backgroundColor: colors.card,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.border,
  },
  stat: { flex: 1, minWidth: 140, padding: spacing.md },
  statValue: { fontSize: 26, fontWeight: '800', color: colors.text, marginTop: 4 },
  statLabel: { color: colors.muted, fontSize: 13, fontWeight: '600' },
  statSub: { color: colors.muted, fontSize: 12, marginTop: 2 },
  statBar: { height: 3, width: 32, borderRadius: radius.pill, marginTop: spacing.sm },
  badge: { borderRadius: radius.pill, alignSelf: 'flex-start' },
  badgeText: { fontWeight: '700', letterSpacing: 0.3 },
  empty: { color: colors.muted, fontSize: 14 },
  switchTrack: {
    width: 44,
    height: 26,
    borderRadius: 13,
    justifyContent: 'center',
  },
  switchThumb: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
});

export const ui = { Button, Input, Card, Stat, Badge, Empty, Loading, SwitchToggle, ProgressBar, Avatar, Icon };
export default ui;
