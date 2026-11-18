import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
  TextInput,
  Image,
  Alert,
} from 'react-native';
import Layout from '../components/Layout';
import { Button } from '../components/UI';
import { colors, spacing, radius, shadows } from '../theme';

const FAQS = [
  {
    q: 'How do I reset a student password?',
    a: 'Navigate to Students → Select the student record → Click "Edit Profile" and trigger a Password Reset Link. An automated link will be sent to the registered email.',
  },
  {
    q: 'Can I export attendance reports to CSV?',
    a: 'Yes, in the Academic Schedules and Calendar screens, click the export icon in the upper right to download daily, weekly, or term-wide CSV logs.',
  },
  {
    q: 'What are the system requirements for the portal?',
    a: 'EduStruc is cloud-native and supports all modern web browsers (Chrome, Edge, Safari, Firefox) as well as native mobile devices via Expo / iOS and Android.',
  },
  {
    q: 'How do I schedule a holiday for the entire institution?',
    a: 'Admins can visit Schedules → Create New Schedule, select "Holiday / Campus Closed" as the type, and apply it to all departments and groups.',
  },
];

export default function HelpSupport({ navigation }) {
  const [search, setSearch] = useState('');
  const [expandedFaq, setExpandedFaq] = useState(null);

  const toggleFaq = (idx) => {
    setExpandedFaq(expandedFaq === idx ? null : idx);
  };

  return (
    <Layout navigation={navigation} active="HelpSupport">
      <ScrollView contentContainerStyle={styles.scroll}>
        {/* Hero Header */}
        <View style={styles.heroWrap}>
          <Text style={styles.heroTitle}>How can we help you today?</Text>
          <Text style={styles.heroSubtitle}>
            Search our documentation for instant answers or reach out to our support team.
          </Text>

          <View style={styles.heroSearch}>
            <Text style={{ fontSize: 16, color: '#94A3B8', marginRight: 8 }}>🔍</Text>
            <TextInput
              value={search}
              onChangeText={setSearch}
              placeholder="Search for guides, tutorials, and FAQs..."
              placeholderTextColor="#94A3B8"
              style={styles.heroSearchInput}
            />
          </View>
        </View>

        {/* 3 Action Cards */}
        <View style={styles.actionCardsRow}>
          {/* Live Chat */}
          <View style={[styles.actionCard, { borderColor: '#93C5FD' }]}>
            <View style={[styles.actionIconBox, { backgroundColor: '#EFF6FF' }]}>
              <Text style={{ fontSize: 18 }}>💬</Text>
            </View>
            <Text style={styles.actionCardTitle}>Live Chat</Text>
            <Text style={styles.actionCardSub}>Average response time: &lt; 5 minutes</Text>
            <Pressable
              onPress={() => Alert.alert('Live Chat', 'Connecting with support agent...')}
              style={{ marginTop: 12 }}
            >
              <Text style={styles.actionCardLink}>Start Conversation →</Text>
            </Pressable>
          </View>

          {/* Open a Ticket */}
          <View style={[styles.actionCard, { borderColor: '#A7F3D0' }]}>
            <View style={[styles.actionIconBox, { backgroundColor: '#ECFDF5' }]}>
              <Text style={{ fontSize: 18 }}>🎫</Text>
            </View>
            <Text style={styles.actionCardTitle}>Open a Ticket</Text>
            <Text style={styles.actionCardSub}>Best for complex technical issues</Text>
            <Pressable
              onPress={() => Alert.alert('Ticket', 'Ticket form opened.')}
              style={{ marginTop: 12 }}
            >
              <Text style={styles.actionCardLink}>Submit Request →</Text>
            </Pressable>
          </View>

          {/* Documentation */}
          <View style={[styles.actionCard, { borderColor: '#E2E8F0' }]}>
            <View style={[styles.actionIconBox, { backgroundColor: '#F8FAFC' }]}>
              <Text style={{ fontSize: 18 }}>📖</Text>
            </View>
            <Text style={styles.actionCardTitle}>Documentation</Text>
            <Text style={styles.actionCardSub}>Browse our comprehensive guides</Text>
            <Pressable
              onPress={() => Alert.alert('Wiki', 'Opening knowledge base...')}
              style={{ marginTop: 12 }}
            >
              <Text style={styles.actionCardLink}>Explore Wiki →</Text>
            </Pressable>
          </View>
        </View>

        {/* 2-Column FAQs & Community */}
        <View style={styles.bottomTwoCols}>
          {/* FAQs Accordion */}
          <View style={styles.faqCol}>
            <Text style={styles.sectionTitle}>Frequently Asked Questions</Text>

            {FAQS.map((faq, idx) => {
              const isExpanded = expandedFaq === idx;
              return (
                <View key={idx} style={styles.faqCard}>
                  <Pressable
                    onPress={() => toggleFaq(idx)}
                    style={styles.faqQuestionRow}
                  >
                    <Text style={styles.faqQuestionText}>{faq.q}</Text>
                    <Text style={styles.faqChevron}>{isExpanded ? '▴' : '▾'}</Text>
                  </Pressable>
                  {isExpanded ? (
                    <Text style={styles.faqAnswerText}>{faq.a}</Text>
                  ) : null}
                </View>
              );
            })}
          </View>

          {/* Right Support Cards */}
          <View style={styles.communityCol}>
            {/* Community Support */}
            <View style={styles.communityCard}>
              <Text style={styles.sectionTitle}>Community Support</Text>
              <Image
                source={{
                  uri: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=400&q=80',
                }}
                style={styles.communityImg}
              />
              <Text style={styles.communityDesc}>
                Join our administrator community to share tips and best practices with other EduStruc users.
              </Text>
              <Button
                title="Visit Forum"
                variant="outline"
                size="md"
                onPress={() => Alert.alert('Community', 'Opening EduStruc Forum.')}
                style={{ marginTop: 10 }}
              />
            </View>

            {/* Priority Support */}
            <View style={styles.priorityCard}>
              <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 6 }}>
                <Text style={{ fontSize: 18, marginRight: 6 }}>🛡️</Text>
                <Text style={styles.priorityTitle}>Priority Support</Text>
              </View>
              <Text style={styles.priorityDesc}>
                Institutional accounts have access to 24/7 emergency phone support. Please use your priority PIN.
              </Text>
              <Text style={styles.priorityPhone}>📞 1-800-EDUSTRUC-911</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </Layout>
  );
}

const styles = StyleSheet.create({
  scroll: {
    padding: spacing.lg,
    paddingBottom: spacing.xxl,
  },
  heroWrap: {
    backgroundColor: '#EFF6FF',
    borderRadius: 22,
    padding: spacing.xl,
    alignItems: 'center',
    marginBottom: spacing.lg,
  },
  heroTitle: {
    fontSize: 24,
    fontWeight: '800',
    color: '#0F172A',
    marginBottom: 6,
    textAlign: 'center',
  },
  heroSubtitle: {
    fontSize: 13,
    color: '#64748B',
    textAlign: 'center',
    maxWidth: 480,
    marginBottom: spacing.lg,
  },
  heroSearch: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    paddingHorizontal: 16,
    height: 48,
    width: '100%',
    maxWidth: 480,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    ...shadows.sm,
  },
  heroSearchInput: {
    flex: 1,
    fontSize: 14,
    color: '#0F172A',
  },
  actionCardsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 14,
    marginBottom: spacing.lg,
  },
  actionCard: {
    flex: 1,
    minWidth: 200,
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: spacing.lg,
    borderWidth: 1.5,
    ...shadows.sm,
  },
  actionIconBox: {
    width: 38,
    height: 38,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  actionCardTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: '#0F172A',
  },
  actionCardSub: {
    fontSize: 12,
    color: '#64748B',
    marginTop: 2,
    lineHeight: 16,
  },
  actionCardLink: {
    fontSize: 13,
    fontWeight: '700',
    color: colors.primary,
  },
  bottomTwoCols: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
  },
  faqCol: {
    flex: 2,
    minWidth: 320,
  },
  communityCol: {
    flex: 1,
    minWidth: 260,
    gap: 16,
  },
  sectionTitle: {
    fontSize: 17,
    fontWeight: '800',
    color: '#0F172A',
    marginBottom: 12,
  },
  faqCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 14,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  faqQuestionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  faqQuestionText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#0F172A',
    flex: 1,
    marginRight: 8,
  },
  faqChevron: {
    fontSize: 16,
    color: '#64748B',
  },
  faqAnswerText: {
    fontSize: 13,
    color: '#475569',
    lineHeight: 19,
    marginTop: 10,
    borderTopWidth: 1,
    borderTopColor: '#F8FAFC',
    paddingTop: 8,
  },
  communityCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: spacing.lg,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    ...shadows.sm,
  },
  communityImg: {
    width: '100%',
    height: 120,
    borderRadius: 12,
    marginBottom: 10,
  },
  communityDesc: {
    fontSize: 12,
    color: '#64748B',
    lineHeight: 17,
  },
  priorityCard: {
    backgroundColor: '#0F172A',
    borderRadius: 20,
    padding: spacing.lg,
  },
  priorityTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: '#FFFFFF',
  },
  priorityDesc: {
    fontSize: 12,
    color: '#94A3B8',
    lineHeight: 17,
    marginVertical: 8,
  },
  priorityPhone: {
    fontSize: 14,
    fontWeight: '800',
    color: '#60A5FA',
  },
});
