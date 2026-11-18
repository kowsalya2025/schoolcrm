import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Image,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import { Button, Icon } from '../components/UI';
import { useAuth } from '../auth';
import { colors, spacing, radius, shadows } from '../theme';

export default function LogoutConfirmation({ navigation }) {
  const { logout } = useAuth();
  const [loggedOutState, setLoggedOutState] = useState(false);
  const [loading, setLoading] = useState(false);

  const confirmLogout = async () => {
    setLoading(true);
    await logout();
    setLoading(false);
    setLoggedOutState(true);
  };

  const handleLogBackIn = () => {
    navigation.reset({ index: 0, routes: [{ name: 'Login' }] });
  };

  // If successfully logged out, show the exact screen from Logged Out - EduStruc.png
  if (loggedOutState) {
    return (
      <SafeAreaView style={styles.safe}>
        <StatusBar barStyle="dark-content" backgroundColor="#F8FAFC" />
        <View style={styles.containerLoggedOut}>
          {/* Brand header */}
          <View style={styles.brandRow}>
            <View style={styles.brandIconBox}>
              <Text style={{ fontSize: 18, color: '#fff' }}>🎓</Text>
            </View>
            <Text style={styles.brandName}>EduStruc</Text>
          </View>

          {/* White Card */}
          <View style={styles.loggedOutCard}>
            <View style={styles.checkCircle}>
              <Text style={{ fontSize: 24, color: '#2563EB', fontWeight: '800' }}>✓</Text>
            </View>

            <Text style={styles.loggedOutTitle}>You've safely logged out.</Text>
            <Text style={styles.loggedOutSubtitle}>
              Thank you for your session. All academic data and administrative changes
              have been securely saved and synced.
            </Text>

            <View style={styles.loggedOutActions}>
              <Button
                title="→ LOG BACK IN"
                variant="primary"
                onPress={handleLogBackIn}
                style={{ flex: 1, height: 46 }}
              />
              <Button
                title="❓ NEED HELP?"
                variant="secondary"
                onPress={() => navigation.navigate('HelpSupport')}
                style={{ flex: 1, height: 46 }}
              />
            </View>
          </View>

          {/* Bottom Trust Indicators */}
          <View style={styles.trustRow}>
            <View style={styles.trustItem}>
              <Text style={{ fontSize: 16 }}>🛡️</Text>
              <Text style={styles.trustText}>ENCRYPTED</Text>
            </View>
            <View style={styles.trustDivider} />
            <View style={styles.trustItem}>
              <Text style={{ fontSize: 16 }}>🔄</Text>
              <Text style={styles.trustText}>DATA SYNCED</Text>
            </View>
            <View style={styles.trustDivider} />
            <View style={styles.trustItem}>
              <Text style={{ fontSize: 16 }}>📑</Text>
              <Text style={styles.trustText}>ACTIVITY LOGGED</Text>
            </View>
          </View>
        </View>
      </SafeAreaView>
    );
  }

  // Pre-logout confirmation dialog (Logout Confirmation.pdf)
  return (
    <SafeAreaView style={styles.safeConfirmation}>
      <StatusBar barStyle="dark-content" backgroundColor="#F1F5FD" />
      <View style={styles.confirmationWrap}>
        <View style={styles.confirmationCard}>
          {/* Circular Photo Illustration with wave badge */}
          <View style={styles.photoContainer}>
            <Image
              source={{
                uri: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=400&q=80',
              }}
              style={styles.photoImg}
            />
            <View style={styles.waveBadge}>
              <Text style={{ fontSize: 18 }}>👋</Text>
            </View>
          </View>

          {/* Heading & Text */}
          <Text style={styles.confirmHeading}>See you soon?</Text>
          <Text style={styles.confirmSub}>
            Are you sure you want to log out? We'll be right here whenever you need
            to check on your child's progress.
          </Text>

          {/* Buttons */}
          <Button
            title="Stay Logged In"
            variant="primary"
            size="lg"
            onPress={() => navigation.goBack()}
            style={{ width: '100%', height: 48, marginBottom: 10 }}
          />

          <Button
            title="→ Log Out"
            variant="secondary"
            size="lg"
            loading={loading}
            onPress={confirmLogout}
            style={{ width: '100%', height: 48 }}
          />
        </View>

        <Text style={styles.confirmFooter}>EduParent Secure Logout © 2024</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  safeConfirmation: {
    flex: 1,
    backgroundColor: '#EEF4FF',
  },
  confirmationWrap: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing.lg,
  },
  confirmationCard: {
    width: '100%',
    maxWidth: 380,
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: spacing.xl,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    ...shadows.lg,
  },
  photoContainer: {
    position: 'relative',
    marginBottom: spacing.lg,
  },
  photoImg: {
    width: 140,
    height: 140,
    borderRadius: 70,
  },
  waveBadge: {
    position: 'absolute',
    bottom: 2,
    right: 2,
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: '#2563EB',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  confirmHeading: {
    fontSize: 22,
    fontWeight: '800',
    color: '#0F172A',
    marginBottom: 8,
  },
  confirmSub: {
    fontSize: 13,
    color: '#64748B',
    textAlign: 'center',
    lineHeight: 19,
    marginBottom: spacing.xl,
  },
  confirmFooter: {
    fontSize: 11,
    color: '#94A3B8',
    fontWeight: '600',
    marginTop: spacing.xl,
  },
  containerLoggedOut: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing.lg,
  },
  brandRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.lg,
  },
  brandIconBox: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: '#2563EB',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
  },
  brandName: {
    fontSize: 20,
    fontWeight: '800',
    color: '#0F172A',
  },
  loggedOutCard: {
    width: '100%',
    maxWidth: 440,
    backgroundColor: '#FFFFFF',
    borderRadius: 22,
    padding: spacing.xl,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    ...shadows.md,
  },
  checkCircle: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#EFF6FF',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.md,
  },
  loggedOutTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: '#0F172A',
    marginBottom: 8,
  },
  loggedOutSubtitle: {
    fontSize: 13,
    color: '#64748B',
    textAlign: 'center',
    lineHeight: 19,
    marginBottom: spacing.xl,
  },
  loggedOutActions: {
    flexDirection: 'row',
    width: '100%',
    gap: 10,
  },
  trustRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: spacing.xxl,
    gap: 16,
  },
  trustItem: {
    alignItems: 'center',
    gap: 4,
  },
  trustText: {
    fontSize: 10,
    fontWeight: '800',
    color: '#94A3B8',
    letterSpacing: 0.8,
  },
  trustDivider: {
    width: 1,
    height: 24,
    backgroundColor: '#CBD5E1',
  },
});
