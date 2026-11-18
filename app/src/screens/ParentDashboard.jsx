import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
  Modal,
} from 'react-native';
import Layout from '../components/Layout';
import { Card, Button, Badge, Icon, ProgressBar } from '../components/UI';
import { colors, spacing, radius, shadows } from '../theme';
import { useAuth } from '../auth';
import { api } from '../api';

export default function ParentDashboard({ navigation }) {
  const { user } = useAuth();
  const [confirmedAttendance, setConfirmedAttendance] = useState(false);
  const [showFullReport, setShowFullReport] = useState(false);
  const [studentData, setStudentData] = useState(null);

  useEffect(() => {
    // Attempt dynamic backend load
    api.get('/students')
      .then((res) => {
        if (Array.isArray(res) && res.length > 0) {
          setStudentData(res[0]);
        }
      })
      .catch(() => {});
  }, []);

  const studentName = studentData?.first_name || 'Alex';
  const parentName = user?.name?.split(' ')[0] || 'Sarah';

  const scheduleItems = [
    {
      id: 1,
      time: '08:30 AM - 09:45 AM',
      title: 'Math: Calculus Foundations',
      icon: '📐',
      bg: '#DBEAFE',
      color: '#1D4ED8',
    },
    {
      id: 2,
      time: '10:00 AM - 11:15 AM',
      title: 'Science: Biology Lab',
      icon: '🔬',
      bg: '#FEF3C7',
      color: '#B45309',
    },
    {
      id: 3,
      time: '01:00 PM - 02:15 PM',
      title: 'Art: Modern Expressionism',
      icon: '🎨',
      bg: '#D1FAE5',
      color: '#047857',
    },
  ];

  const fullReportCards = [
    { subject: 'History Quiz', score: '92%', grade: 'A' },
    { subject: 'English Essay', score: '90%', grade: 'A-' },
    { subject: 'Physics HW #4', score: '88/100', grade: 'B+' },
    { subject: 'Chemistry Lab Practical', score: '95/100', grade: 'A+' },
    { subject: 'Algebra Midterm', score: '94%', grade: 'A' },
  ];

  return (
    <Layout navigation={navigation} active="ParentDashboard">
      <ScrollView
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
      >
        {/* Welcome Greeting */}
        <View style={styles.greetingSection}>
          <Text style={styles.greetingTitle}>Good morning, {parentName}</Text>
          <Text style={styles.greetingSubtitle}>
            Here is what's happening with {studentName} today.
          </Text>
        </View>

        {/* Today's Schedule Card */}
        <View style={styles.sectionCard}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionHeading}>Today's Schedule</Text>
            <View style={styles.dateBadge}>
              <Text style={styles.dateBadgeText}>Monday, Oct 23</Text>
            </View>
          </View>

          {scheduleItems.map((item) => (
            <View key={item.id} style={styles.scheduleRow}>
              <View style={[styles.scheduleIconWrap, { backgroundColor: item.bg }]}>
                <Text style={{ fontSize: 18 }}>{item.icon}</Text>
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.scheduleTime}>{item.time}</Text>
                <Text style={styles.scheduleTitle}>{item.title}</Text>
              </View>
            </View>
          ))}
        </View>

        {/* Recent Grades Card */}
        <View style={styles.sectionCard}>
          <Text style={styles.sectionHeading}>Recent Grades</Text>

          {/* Circular Score Highlight */}
          <View style={styles.circularScoreWrap}>
            <View style={styles.circularRing}>
              <Text style={styles.circularPct}>92%</Text>
              <Text style={styles.circularLabel}>History Quiz</Text>
            </View>
          </View>

          {/* Individual Subject Scores */}
          <View style={styles.gradeLine}>
            <Text style={styles.gradeSubject}>English Essay</Text>
            <Text style={styles.gradeValueSuccess}>A-</Text>
          </View>

          <View style={styles.gradeLine}>
            <Text style={styles.gradeSubject}>Physics HW</Text>
            <Text style={styles.gradeValueBlue}>88/100</Text>
          </View>

          {/* View Full Report Button */}
          <Button
            title="View Full Report"
            variant="outline"
            onPress={() => setShowFullReport(true)}
            style={{ marginTop: spacing.md }}
          />
        </View>

        {/* School Announcement (Dark Navy Card) */}
        <View style={styles.announcementCard}>
          <View style={styles.announcementTag}>
            <Text style={{ fontSize: 13, marginRight: 4 }}>📢</Text>
            <Text style={styles.announcementTagText}>SCHOOL ANNOUNCEMENT</Text>
          </View>

          <Text style={styles.announcementTitle}>Parent-Teacher Meeting</Text>
          <Text style={styles.announcementDesc}>
            Join us this Friday for our quarterly review. We'll discuss individual
            student progress and the upcoming winter semester projects.
          </Text>

          <View style={styles.dateTimeBox}>
            <Text style={{ fontSize: 16, marginRight: 10 }}>📅</Text>
            <View>
              <Text style={styles.dateTimeLabel}>Date & Time</Text>
              <Text style={styles.dateTimeVal}>Friday, 3:00 PM</Text>
            </View>
          </View>

          <Button
            title={confirmedAttendance ? '✓ Attendance Confirmed' : 'Confirm Attendance'}
            variant={confirmedAttendance ? 'success' : 'primary'}
            onPress={() => setConfirmedAttendance(!confirmedAttendance)}
            style={{ marginTop: spacing.md }}
          />
        </View>
      </ScrollView>

      {/* Full Report Modal */}
      <Modal
        visible={showFullReport}
        transparent
        animationType="slide"
        onRequestClose={() => setShowFullReport(false)}
      >
        <View style={styles.modalBg}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <View>
                <Text style={styles.modalTitle}>Academic Report Card</Text>
                <Text style={styles.modalSubtitle}>Student: {studentName} • Grade 10</Text>
              </View>
              <Pressable onPress={() => setShowFullReport(false)}>
                <Text style={{ fontSize: 20, color: colors.muted }}>✕</Text>
              </Pressable>
            </View>

            <ScrollView style={{ maxHeight: 300 }}>
              {fullReportCards.map((r, i) => (
                <View key={i} style={styles.reportRow}>
                  <Text style={styles.reportSubject}>{r.subject}</Text>
                  <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                    <Text style={styles.reportScore}>{r.score}</Text>
                    <Badge text={r.grade} tone="active" size="sm" />
                  </View>
                </View>
              ))}
            </ScrollView>

            <Button
              title="Close"
              variant="secondary"
              onPress={() => setShowFullReport(false)}
              style={{ marginTop: spacing.md }}
            />
          </View>
        </View>
      </Modal>
    </Layout>
  );
}

const styles = StyleSheet.create({
  scroll: {
    padding: spacing.md,
    paddingBottom: spacing.xxl,
  },
  greetingSection: {
    marginBottom: spacing.md,
  },
  greetingTitle: {
    fontSize: 24,
    fontWeight: '800',
    color: '#0F172A',
  },
  greetingSubtitle: {
    fontSize: 14,
    color: '#64748B',
    marginTop: 2,
  },
  sectionCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: spacing.lg,
    marginBottom: spacing.md,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    ...shadows.sm,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  sectionHeading: {
    fontSize: 18,
    fontWeight: '800',
    color: '#0F172A',
  },
  dateBadge: {
    backgroundColor: '#EFF6FF',
    paddingVertical: 4,
    paddingHorizontal: 12,
    borderRadius: radius.pill,
  },
  dateBadgeText: {
    color: colors.primary,
    fontSize: 12,
    fontWeight: '700',
  },
  scheduleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8FAFC',
    borderRadius: 14,
    padding: 12,
    marginBottom: 8,
  },
  scheduleIconWrap: {
    width: 44,
    height: 44,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  scheduleTime: {
    fontSize: 11,
    fontWeight: '700',
    color: colors.primary,
  },
  scheduleTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#0F172A',
    marginTop: 2,
  },
  circularScoreWrap: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: spacing.md,
  },
  circularRing: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 6,
    borderColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F8FAFF',
  },
  circularPct: {
    fontSize: 26,
    fontWeight: '800',
    color: '#0F172A',
  },
  circularLabel: {
    fontSize: 11,
    color: '#64748B',
    marginTop: 2,
  },
  gradeLine: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  gradeSubject: {
    fontSize: 14,
    color: '#334155',
    fontWeight: '500',
  },
  gradeValueSuccess: {
    fontSize: 14,
    fontWeight: '800',
    color: '#059669',
  },
  gradeValueBlue: {
    fontSize: 14,
    fontWeight: '800',
    color: colors.primary,
  },
  announcementCard: {
    backgroundColor: '#0F1E4B',
    borderRadius: 20,
    padding: spacing.lg,
    ...shadows.md,
  },
  announcementTag: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  announcementTagText: {
    color: '#93C5FD',
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 0.8,
  },
  announcementTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: '#FFFFFF',
    marginBottom: 6,
  },
  announcementDesc: {
    fontSize: 13,
    color: '#CBD5E1',
    lineHeight: 19,
    marginBottom: spacing.md,
  },
  dateTimeBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    borderRadius: 12,
    padding: 12,
  },
  dateTimeLabel: {
    fontSize: 11,
    color: '#94A3B8',
  },
  dateTimeVal: {
    fontSize: 13,
    fontWeight: '700',
    color: '#FFFFFF',
    marginTop: 1,
  },
  modalBg: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    padding: spacing.lg,
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: spacing.lg,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
    paddingBottom: 10,
    marginBottom: 10,
  },
  modalTitle: {
    fontSize: 17,
    fontWeight: '800',
    color: '#0F172A',
  },
  modalSubtitle: {
    fontSize: 12,
    color: '#64748B',
    marginTop: 2,
  },
  reportRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#F8FAFC',
  },
  reportSubject: {
    fontSize: 13,
    fontWeight: '600',
    color: '#334155',
  },
  reportScore: {
    fontSize: 13,
    fontWeight: '700',
    color: '#0F172A',
  },
});
