import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
  useWindowDimensions,
  StatusBar,
  Platform,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Button, Badge } from '../components/UI';
import { colors, spacing, radius, shadows } from '../theme';

export default function Landing({ navigation }) {
  const { width } = useWindowDimensions();
  const insets = useSafeAreaInsets();
  const isMobile = width < 768;

  const topInset = Math.max(insets.top, Platform.OS === 'android' ? (StatusBar.currentHeight || 28) : 0);
  const bottomInset = Math.max(insets.bottom, 16);

  return (
    <View style={[styles.safe, { paddingTop: topInset, paddingBottom: bottomInset }]}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        {/* Top Navbar */}
        <View style={styles.navBar}>
          <View style={styles.logoRow}>
            <View style={styles.logoBox}>
              <Text style={{ fontSize: 18, color: '#fff' }}>🎓</Text>
            </View>
            <Text style={styles.logoText}>EduStruc</Text>
          </View>

          <View style={styles.navActions}>
            <Pressable
              onPress={() => navigation.navigate('Login')}
              style={{ marginRight: 14 }}
              hitSlop={8}
            >
              <Text style={styles.loginLink}>Login</Text>
            </Pressable>
            <Button
              title="Request Demo"
              variant="primary"
              size="sm"
              onPress={() => navigation.navigate('Login')}
            />
          </View>
        </View>

        {/* Hero Section */}
        <View style={styles.heroSection}>
          <View style={styles.badgePill}>
            <Text style={styles.badgePillText}>THE FUTURE OF SMS</Text>
          </View>

          <Text style={styles.heroHeading}>
            Institutional Excellence Through <Text style={{ color: colors.primary }}>Smarter Management</Text>
          </Text>

          <Text style={styles.heroSub}>
            A centralized platform designed to unify administration, empower educators,
            and accelerate student achievement with data-driven insights.
          </Text>

          <View style={styles.heroBtns}>
            <Button
              title="Request Demo"
              variant="primary"
              size="lg"
              onPress={() => navigation.navigate('Login')}
              style={{ minWidth: 160 }}
            />
            <Button
              title="View Features"
              variant="ghost"
              size="lg"
              onPress={() => navigation.navigate('Login')}
              style={{ minWidth: 150 }}
            />
          </View>

          {/* Hero Analytics Preview Card */}
          <View style={styles.heroPreviewCard}>
            <View style={styles.heroCardHeader}>
              <Text style={{ fontSize: 16, marginRight: 8 }}>📊</Text>
              <Text style={styles.heroCardTitle}>Live Enrollment Analytics</Text>
            </View>
            <View style={styles.analyticsBarTrack}>
              <View style={styles.analyticsBarFill} />
            </View>
            <View style={styles.heroCardFooter}>
              <Text style={styles.efficiencyText}>88% Efficiency Gain</Text>
              <Text style={styles.updatedText}>Updated Real-time</Text>
            </View>
          </View>
        </View>

        {/* Trusted By Banner */}
        <View style={styles.trustedBanner}>
          <Text style={styles.trustedLabel}>TRUSTED BY LEADING INSTITUTIONS GLOBALLY</Text>
          <View style={styles.trustedLogos}>
            <Text style={styles.trustedLogoItem}>🏛️ UNIVERSITY</Text>
            <Text style={styles.trustedLogoItem}>📐 POLYTECH</Text>
            <Text style={styles.trustedLogoItem}>🎓 ACADEMY</Text>
            <Text style={styles.trustedLogoItem}>🔬 SCIENCE INST</Text>
          </View>
        </View>

        {/* Feature Highlights Section */}
        <View style={styles.featuresSection}>
          <Text style={styles.featuresHeading}>Precision Tools for Modern Education</Text>
          <Text style={styles.featuresSub}>
            Streamline your institutional operations with our comprehensive suite of management modules.
          </Text>

          <View style={styles.featureCardsGrid}>
            {/* Card 1: Real-time Analytics */}
            <View style={styles.featCard}>
              <View style={[styles.featIcon, { backgroundColor: '#EFF6FF' }]}>
                <Text style={{ fontSize: 20 }}>📈</Text>
              </View>
              <Text style={styles.featTitle}>Real-time Analytics</Text>
              <Text style={styles.featText}>
                Gain deep visibility into institutional performance. Track retention rates,
                financial health, and academic progress through interactive dashboards.
              </Text>
              <View style={styles.miniBarChart}>
                <View style={[styles.bar, { height: 25 }]} />
                <View style={[styles.bar, { height: 45 }]} />
                <View style={[styles.bar, { height: 20 }]} />
                <View style={[styles.bar, { height: 60 }]} />
                <View style={[styles.bar, { height: 80, backgroundColor: colors.primary }]} />
              </View>
            </View>

            {/* Card 2: Automated Scheduling */}
            <View style={styles.featCard}>
              <View style={[styles.featIcon, { backgroundColor: '#EFF6FF' }]}>
                <Text style={{ fontSize: 20 }}>🗓️</Text>
              </View>
              <Text style={styles.featTitle}>Automated Scheduling</Text>
              <Text style={styles.featText}>
                Resolve complex room and faculty conflicts instantly with our AI-powered scheduling engine.
              </Text>
              <View style={{ gap: 8, marginTop: 14 }}>
                <View style={styles.conflictItem}>
                  <Text style={{ color: colors.primary, fontSize: 12, fontWeight: '700' }}>
                    ● Class 101: Conflict Resolved
                  </Text>
                </View>
                <View style={styles.conflictItem}>
                  <Text style={{ color: colors.primary, fontSize: 12, fontWeight: '700' }}>
                    ● Room A4: Optimized
                  </Text>
                </View>
              </View>
            </View>

            {/* Card 3: Student Success */}
            <View style={styles.featCard}>
              <View style={[styles.featIcon, { backgroundColor: '#EFF6FF' }]}>
                <Text style={{ fontSize: 20 }}>📈</Text>
              </View>
              <Text style={styles.featTitle}>Student Success Tracking</Text>
              <Text style={styles.featText}>
                Identify at-risk students before they fall behind. Personalized intervention plans
                managed directly in the portal.
              </Text>
            </View>

            {/* Card 4: Dark Navy CTA Box */}
            <View style={styles.navyCtaCard}>
              <Text style={styles.navyCtaTitle}>Ready to elevate your institution?</Text>
              <Text style={styles.navyCtaSub}>
                Join 500+ academies scaling with EduStruc.
              </Text>
              <Button
                title="Request Demo"
                variant="primary"
                onPress={() => navigation.navigate('Login')}
                style={{ width: '100%', marginTop: 12 }}
              />
            </View>
          </View>
        </View>

        {/* Stakeholder 3-Column Benefits */}
        <View style={styles.stakeholderGrid}>
          <View style={styles.stakeholderCard}>
            <Text style={styles.stakeholderRole}>For Administrators</Text>
            <Text style={styles.stakeholderTitle}>Maximized Efficiency</Text>
            <Text style={styles.stakeholderBullet}>✓ Reduce administrative overhead by 40% through automation.</Text>
            <Text style={styles.stakeholderBullet}>✓ Centralized compliance and reporting workflows.</Text>
          </View>

          <View style={styles.stakeholderCard}>
            <Text style={styles.stakeholderRole}>For Teachers</Text>
            <Text style={styles.stakeholderTitle}>Unprecedented Clarity</Text>
            <Text style={styles.stakeholderBullet}>✓ Automated grading and attendance tracking.</Text>
            <Text style={styles.stakeholderBullet}>✓ Personalized feedback tools for better student outcomes.</Text>
          </View>

          <View style={styles.stakeholderCard}>
            <Text style={styles.stakeholderRole}>For Students & Parents</Text>
            <Text style={styles.stakeholderTitle}>Active Engagement</Text>
            <Text style={styles.stakeholderBullet}>✓ Mobile-first portal for grades, schedules, and fee receipts.</Text>
            <Text style={styles.stakeholderBullet}>✓ Transparent academic roadmap and direct teacher chats.</Text>
          </View>
        </View>

        {/* Transform Today Dark Callout Banner */}
        <View style={styles.transformBanner}>
          <Text style={styles.transformTitle}>Transform Your Institution Today</Text>
          <Text style={styles.transformSub}>
            Experience the power of a unified management system designed for the next generation of academic excellence.
          </Text>
          <View style={styles.transformBtns}>
            <Button
              title="Get Started Now"
              variant="primary"
              size="lg"
              onPress={() => navigation.navigate('Login')}
              style={{ minWidth: 180 }}
            />
            <Button
              title="Speak with an Expert"
              variant="ghost"
              size="lg"
              onPress={() => navigation.navigate('HelpSupport')}
              style={{ minWidth: 180, borderColor: '#334155' }}
              textStyle={{ color: '#FFFFFF' }}
            />
          </View>
        </View>

        {/* Footer */}
        <View style={styles.footerWrap}>
          <View style={styles.footerBrand}>
            <Text style={styles.footerLogo}>EduStruc</Text>
            <Text style={styles.footerDesc}>
              Empowering educational institutions with smarter tools for a brighter academic future.
            </Text>
          </View>

          <View style={styles.footerLinksRow}>
            <Text style={styles.copyright}>© 2024 EduStruc Academic Systems. All rights reserved.</Text>
            <View style={styles.policyLinks}>
              <Text style={styles.policyText}>Privacy Policy</Text>
              <Text style={styles.policyText}>Terms of Service</Text>
              <Text style={styles.policyText}>Contact Support</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  scroll: {
    paddingBottom: spacing.xxl,
  },
  navBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  logoRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logoBox: {
    width: 32,
    height: 32,
    borderRadius: 8,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
  },
  logoText: {
    fontSize: 20,
    fontWeight: '900',
    color: '#0F172A',
  },
  navActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  loginLink: {
    fontSize: 14,
    fontWeight: '700',
    color: '#334155',
  },
  heroSection: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.xxl,
    paddingBottom: spacing.xl,
    alignItems: 'center',
  },
  badgePill: {
    backgroundColor: '#EFF6FF',
    paddingVertical: 4,
    paddingHorizontal: 12,
    borderRadius: radius.pill,
    marginBottom: 14,
  },
  badgePillText: {
    color: colors.primary,
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 0.8,
  },
  heroHeading: {
    fontSize: 34,
    fontWeight: '900',
    color: '#0F172A',
    textAlign: 'center',
    lineHeight: 44,
    maxWidth: 640,
    marginBottom: 12,
  },
  heroSub: {
    fontSize: 14,
    color: '#64748B',
    textAlign: 'center',
    lineHeight: 22,
    maxWidth: 540,
    marginBottom: spacing.xl,
  },
  heroBtns: {
    flexDirection: 'row',
    gap: 12,
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginBottom: spacing.xxl,
  },
  heroPreviewCard: {
    width: '100%',
    maxWidth: 580,
    backgroundColor: '#0F1E4B',
    borderRadius: 22,
    padding: spacing.xl,
    ...shadows.lg,
  },
  heroCardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  heroCardTitle: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '800',
  },
  analyticsBarTrack: {
    height: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 4,
    marginVertical: 10,
    overflow: 'hidden',
  },
  analyticsBarFill: {
    width: '88%',
    height: '100%',
    backgroundColor: '#38BDF8',
    borderRadius: 4,
  },
  heroCardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 6,
  },
  efficiencyText: {
    color: '#93C5FD',
    fontSize: 12,
    fontWeight: '700',
  },
  updatedText: {
    color: '#94A3B8',
    fontSize: 11,
  },
  trustedBanner: {
    backgroundColor: '#F8FAFC',
    paddingVertical: spacing.xl,
    paddingHorizontal: spacing.lg,
    alignItems: 'center',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#E2E8F0',
  },
  trustedLabel: {
    fontSize: 11,
    fontWeight: '800',
    color: '#94A3B8',
    letterSpacing: 1,
    marginBottom: 14,
  },
  trustedLogos: {
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap',
    gap: 24,
  },
  trustedLogoItem: {
    fontSize: 13,
    fontWeight: '700',
    color: '#475569',
  },
  featuresSection: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.xxl,
    alignItems: 'center',
  },
  featuresHeading: {
    fontSize: 26,
    fontWeight: '800',
    color: '#0F172A',
    textAlign: 'center',
    marginBottom: 6,
  },
  featuresSub: {
    fontSize: 14,
    color: '#64748B',
    textAlign: 'center',
    maxWidth: 520,
    marginBottom: spacing.xl,
  },
  featureCardsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
    justifyContent: 'center',
    width: '100%',
  },
  featCard: {
    flex: 1,
    minWidth: 260,
    maxWidth: 380,
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: spacing.xl,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    ...shadows.sm,
  },
  featIcon: {
    width: 44,
    height: 44,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  featTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#0F172A',
    marginBottom: 6,
  },
  featText: {
    fontSize: 13,
    color: '#64748B',
    lineHeight: 19,
  },
  miniBarChart: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    height: 80,
    gap: 8,
    marginTop: 18,
  },
  bar: {
    flex: 1,
    backgroundColor: '#BFDBFE',
    borderRadius: 4,
  },
  conflictItem: {
    backgroundColor: '#EFF6FF',
    padding: 8,
    borderRadius: radius.md,
  },
  navyCtaCard: {
    flex: 1,
    minWidth: 260,
    maxWidth: 380,
    backgroundColor: '#0F172A',
    borderRadius: 20,
    padding: spacing.xl,
    justifyContent: 'center',
  },
  navyCtaTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: '#FFFFFF',
    lineHeight: 26,
    marginBottom: 6,
  },
  navyCtaSub: {
    fontSize: 12,
    color: '#94A3B8',
    marginBottom: 10,
  },
  stakeholderGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.xxl,
    justifyContent: 'center',
  },
  stakeholderCard: {
    flex: 1,
    minWidth: 260,
    maxWidth: 380,
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: spacing.lg,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    ...shadows.sm,
  },
  stakeholderRole: {
    fontSize: 13,
    fontWeight: '800',
    color: colors.primary,
    marginBottom: 4,
  },
  stakeholderTitle: {
    fontSize: 17,
    fontWeight: '800',
    color: '#0F172A',
    marginBottom: 8,
  },
  stakeholderBullet: {
    fontSize: 12,
    color: '#475569',
    lineHeight: 18,
    marginTop: 6,
  },
  transformBanner: {
    backgroundColor: '#0F172A',
    borderRadius: 24,
    marginHorizontal: spacing.lg,
    padding: spacing.xxl,
    alignItems: 'center',
    marginBottom: spacing.xxl,
  },
  transformTitle: {
    fontSize: 26,
    fontWeight: '800',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 8,
  },
  transformSub: {
    fontSize: 13,
    color: '#94A3B8',
    textAlign: 'center',
    maxWidth: 500,
    lineHeight: 19,
    marginBottom: spacing.xl,
  },
  transformBtns: {
    flexDirection: 'row',
    gap: 12,
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  footerWrap: {
    backgroundColor: '#EFF6FF',
    padding: spacing.xl,
  },
  footerBrand: {
    marginBottom: spacing.lg,
  },
  footerLogo: {
    fontSize: 20,
    fontWeight: '900',
    color: '#0F172A',
    marginBottom: 4,
  },
  footerDesc: {
    fontSize: 12,
    color: '#64748B',
    maxWidth: 320,
    lineHeight: 17,
  },
  footerLinksRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: 12,
    borderTopWidth: 1,
    borderTopColor: '#DBEAFE',
    paddingTop: 14,
  },
  copyright: {
    fontSize: 11,
    color: '#64748B',
  },
  policyLinks: {
    flexDirection: 'row',
    gap: 14,
  },
  policyText: {
    fontSize: 11,
    color: '#475569',
    fontWeight: '600',
  },
});
