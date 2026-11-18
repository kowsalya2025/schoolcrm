import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  ScrollView,
  useWindowDimensions,
  StatusBar,
  Platform,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Card, Input, Button, Icon } from '../components/UI';
import { useAuth } from '../auth';
import { colors, spacing, radius, shadows } from '../theme';

export default function Login({ navigation }) {
  const { login } = useAuth();
  const insets = useSafeAreaInsets();
  const [email, setEmail] = useState('parent@edustruc.com');
  const [password, setPassword] = useState('parent123');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { width } = useWindowDimensions();

  const topInset = Math.max(insets.top, Platform.OS === 'android' ? (StatusBar.currentHeight || 28) : 0);
  const bottomInset = Math.max(insets.bottom, 16);

  async function submit() {
    setLoading(true);
    setError('');
    try {
      const me = await login(email, password);
      const isTeacher = me.role === 'teacher';
      const isStaff = me.role === 'admin' || isTeacher;
      const destination = isTeacher ? 'ClassManagement' : isStaff ? 'AdminDashboard' : 'ParentDashboard';
      navigation.reset({
        index: 0,
        routes: [{ name: destination }],
      });
    } catch (e) {
      setError(e.message || 'Invalid email or password');
    } finally {
      setLoading(false);
    }
  }

  const setParentDemo = () => {
    setEmail('parent@edustruc.com');
    setPassword('parent123');
  };

  const setTeacherDemo = () => {
    setEmail('teacher@edustruc.com');
    setPassword('teacher123');
  };

  const setAdminDemo = () => {
    setEmail('admin@edustruc.com');
    setPassword('admin123');
  };

  return (
    <View style={[styles.safe, { paddingTop: topInset, paddingBottom: bottomInset }]}>
      <StatusBar barStyle="dark-content" backgroundColor="#F4F8FF" />
      <ScrollView
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        {/* Brand Header */}
        <View style={styles.header}>
          <Text style={styles.brandTitle}>EduParent</Text>
          <Text style={styles.brandSubtitle}>
            Your quiet assistant in your child's educational journey.
          </Text>
        </View>

        {/* Elevated Login Card */}
        <View style={[styles.card, { width: Math.min(390, width - 36) }]}>
          <Text style={styles.cardHeading}>Welcome Back</Text>
          <Text style={styles.cardSubheading}>
            Log in to manage your child's progress.
          </Text>

          {/* Email input */}
          <View style={{ marginTop: spacing.md }}>
            <Text style={styles.inputLabel}>Parent Email</Text>
            <Input
              value={email}
              onChangeText={setEmail}
              placeholder="email@example.com"
              keyboardType="email-address"
              iconLeft={<Text style={{ color: colors.muted, fontSize: 16 }}>@</Text>}
            />
          </View>

          {/* Password input */}
          <View style={{ marginTop: spacing.xs }}>
            <View style={styles.passwordLabelRow}>
              <Text style={styles.inputLabel}>Password</Text>
              <Pressable hitSlop={6} onPress={() => alert('Password reset link sent to your registered email.')}>
                <Text style={styles.forgotLink}>Forgot Password?</Text>
              </Pressable>
            </View>
            <Input
              value={password}
              onChangeText={setPassword}
              placeholder="••••••••"
              secureTextEntry={!showPassword}
              iconLeft={<Icon name="lock" size={16} color={colors.muted} />}
              iconRight={
                <Icon
                  name={showPassword ? 'eyeOff' : 'eye'}
                  size={16}
                  color={colors.muted}
                />
              }
              onPressRight={() => setShowPassword(!showPassword)}
            />
          </View>

          {error ? <Text style={styles.errorText}>{error}</Text> : null}

          {/* Log In Button */}
          <Button
            title="Log In"
            onPress={submit}
            loading={loading}
            size="lg"
            style={styles.submitBtn}
          />

          {/* Divider */}
          <View style={styles.dividerRow}>
            <View style={styles.dividerLine} />
            <Text style={styles.dividerText}>QUICK SWITCH</Text>
            <View style={styles.dividerLine} />
          </View>

          {/* Quick switch presets for easy testing */}
          <View style={styles.presetsRow}>
            <Pressable
              onPress={setParentDemo}
              style={[
                styles.presetPill,
                email === 'parent@edustruc.com' && styles.presetPillActive,
              ]}
            >
              <Text
                style={[
                  styles.presetText,
                  email === 'parent@edustruc.com' && styles.presetTextActive,
                ]}
              >
                👨‍👧 Parent
              </Text>
            </Pressable>
            <Pressable
              onPress={setTeacherDemo}
              style={[
                styles.presetPill,
                email === 'teacher@edustruc.com' && styles.presetPillActive,
              ]}
            >
              <Text
                style={[
                  styles.presetText,
                  email === 'teacher@edustruc.com' && styles.presetTextActive,
                ]}
              >
                👩‍🏫 Teacher
              </Text>
            </Pressable>
            <Pressable
              onPress={setAdminDemo}
              style={[
                styles.presetPill,
                email === 'admin@edustruc.com' && styles.presetPillActive,
              ]}
            >
              <Text
                style={[
                  styles.presetText,
                  email === 'admin@edustruc.com' && styles.presetTextActive,
                ]}
              >
                🎓 Admin
              </Text>
            </Pressable>
          </View>
        </View>

        {/* Footer Security Badge */}
        <View style={styles.footerWrap}>
          <Icon name="shield" size={14} color={colors.mutedLight} style={{ marginRight: 6 }} />
          <Text style={styles.footerText}>END-TO-END ENCRYPTED</Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#F3F6FD',
  },
  scroll: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: spacing.xl,
    paddingHorizontal: spacing.md,
  },
  header: {
    alignItems: 'center',
    marginBottom: spacing.xl,
    paddingHorizontal: spacing.lg,
  },
  brandTitle: {
    fontSize: 28,
    fontWeight: '800',
    color: colors.primary,
    letterSpacing: -0.5,
    marginBottom: 6,
  },
  brandSubtitle: {
    fontSize: 14,
    color: '#475569',
    textAlign: 'center',
    lineHeight: 20,
    maxWidth: 290,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: spacing.xl,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    ...shadows.lg,
  },
  cardHeading: {
    fontSize: 22,
    fontWeight: '800',
    color: '#0F172A',
    marginBottom: 4,
  },
  cardSubheading: {
    fontSize: 13,
    color: '#64748B',
  },
  inputLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: '#1E293B',
    marginBottom: 6,
  },
  passwordLabelRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  forgotLink: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.primary,
  },
  submitBtn: {
    marginTop: spacing.md,
    borderRadius: 12,
    height: 48,
  },
  errorText: {
    color: colors.danger,
    fontSize: 12,
    marginTop: 4,
    textAlign: 'center',
  },
  dividerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: spacing.lg,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#E2E8F0',
  },
  dividerText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#94A3B8',
    marginHorizontal: 10,
    letterSpacing: 0.5,
  },
  presetsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 8,
  },
  presetPill: {
    flex: 1,
    paddingVertical: 8,
    paddingHorizontal: 8,
    borderRadius: radius.pill,
    backgroundColor: '#F8FAFC',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    alignItems: 'center',
  },
  presetPillActive: {
    backgroundColor: colors.primarySubtle,
    borderColor: colors.primary,
  },
  presetText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#64748B',
  },
  presetTextActive: {
    color: colors.primary,
    fontWeight: '700',
  },
  footerWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: spacing.xl,
  },
  footerText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#94A3B8',
    letterSpacing: 1.2,
  },
});
