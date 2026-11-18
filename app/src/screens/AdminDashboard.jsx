import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
  TextInput,
  Alert,
} from 'react-native';
import Layout from '../components/Layout';
import { Card, Button, Badge, Avatar, Icon } from '../components/UI';
import { api } from '../api';
import { colors, spacing, radius, shadows } from '../theme';

export default function AdminDashboard({ navigation }) {
  const [data, setData] = useState(null);
  const [gradeApproved, setGradeApproved] = useState(false);
  const [search, setSearch] = useState('');

  useEffect(() => {
    api.get('/dashboard')
      .then(setData)
      .catch(() => {});
  }, []);

  const performanceBars = [
    { subject: 'Eng', height: '55%' },
    { subject: 'Math', height: '80%' },
    { subject: 'Sci', height: '100%', primary: true },
    { subject: 'Arts', height: '65%' },
    { subject: 'Hist', height: '85%' },
    { subject: 'Tech', height: '45%' },
  ];

  return (
    <Layout navigation={navigation} active="AdminDashboard">
      <ScrollView
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
      >
        {/* Top Header */}
        <View style={styles.headerRow}>
          <View>
            <Text style={styles.pageTitle}>Dashboard Overview</Text>
            <Text style={styles.pageSubtitle}>
              Welcome back, Admin. Here's what's happening today.
            </Text>
          </View>

          <View style={styles.headerRight}>
            <View style={styles.searchBar}>
              <Text style={{ fontSize: 14, color: '#94A3B8', marginRight: 6 }}>🔍</Text>
              <TextInput
                value={search}
                onChangeText={setSearch}
                placeholder="Search records..."
                placeholderTextColor="#94A3B8"
                style={styles.searchInput}
              />
            </View>

            <View style={styles.userChip}>
              <View style={{ alignItems: 'flex-end', marginRight: 8 }}>
                <Text style={styles.chipName}>Dr. Julian Vance</Text>
                <Text style={styles.chipRole}>Super Admin</Text>
              </View>
              <Avatar
                size={36}
                name="Julian Vance"
                source="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80"
              />
            </View>
          </View>
        </View>

        {/* 4 Top Metric Cards */}
        <View style={styles.metricsGrid}>
          {/* Card 1 */}
          <View style={styles.metricCard}>
            <View style={styles.metricTop}>
              <View style={[styles.metricIconBox, { backgroundColor: '#EFF6FF' }]}>
                <Text style={{ fontSize: 16 }}>👥</Text>
              </View>
              <View style={styles.metricBadgeGreen}>
                <Text style={styles.metricBadgeGreenText}>+12%</Text>
              </View>
            </View>
            <Text style={styles.metricLabel}>TOTAL STUDENTS</Text>
            <Text style={styles.metricVal}>2,450</Text>
          </View>

          {/* Card 2 */}
          <View style={styles.metricCard}>
            <View style={styles.metricTop}>
              <View style={[styles.metricIconBox, { backgroundColor: '#EFF6FF' }]}>
                <Text style={{ fontSize: 16 }}>📘</Text>
              </View>
              <View style={styles.metricBadgeBlue}>
                <Text style={styles.metricBadgeBlueText}>Current Semester</Text>
              </View>
            </View>
            <Text style={styles.metricLabel}>ACTIVE COURSES</Text>
            <Text style={styles.metricVal}>124</Text>
          </View>

          {/* Card 3 */}
          <View style={styles.metricCard}>
            <View style={styles.metricTop}>
              <View style={[styles.metricIconBox, { backgroundColor: '#ECFDF5' }]}>
                <Text style={{ fontSize: 16 }}>📊</Text>
              </View>
              <View style={styles.attendanceBar}>
                <View style={{ width: '94%', height: '100%', backgroundColor: '#10B981', borderRadius: 2 }} />
              </View>
            </View>
            <Text style={styles.metricLabel}>AVERAGE ATTENDANCE</Text>
            <Text style={styles.metricVal}>94%</Text>
          </View>

          {/* Card 4 */}
          <View style={styles.metricCard}>
            <View style={styles.metricTop}>
              <View style={[styles.metricIconBox, { backgroundColor: '#EFF6FF' }]}>
                <Text style={{ fontSize: 16 }}>👔</Text>
              </View>
            </View>
            <Text style={styles.metricLabel}>FACULTY MEMBERS</Text>
            <Text style={styles.metricVal}>85</Text>
          </View>
        </View>

        {/* Main 2-column Content */}
        <View style={styles.twoColWrap}>
          {/* Left Column */}
          <View style={styles.leftCol}>
            {/* Recent Activity Card */}
            <View style={styles.contentCard}>
              <View style={styles.cardHeaderRow}>
                <Text style={styles.cardHeading}>Recent Activity</Text>
                <Pressable onPress={() => Alert.alert('Activity', 'Showing all system logs')}>
                  <Text style={styles.viewAllLink}>View All</Text>
                </Pressable>
              </View>

              {/* Activity 1 */}
              <View style={styles.activityItem}>
                <Avatar
                  size={40}
                  name="Sarah Miller"
                  source="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80"
                  style={{ marginRight: 12 }}
                />
                <View style={{ flex: 1 }}>
                  <View style={styles.activityTitleRow}>
                    <Text style={styles.activityTitle}>New Enrollment: Sarah Miller</Text>
                    <Text style={styles.activityTime}>2 mins ago</Text>
                  </View>
                  <Text style={styles.activityDesc}>
                    Enrolled in "Advanced Quantitative Economics" - Group B
                  </Text>
                  <View style={styles.activityTagsRow}>
                    <View style={styles.tagGreen}>
                      <Text style={styles.tagGreenText}>Verified</Text>
                    </View>
                    <View style={styles.tagBlue}>
                      <Text style={styles.tagBlueText}>Academic Year 2024</Text>
                    </View>
                  </View>
                </View>
              </View>

              {/* Activity 2 */}
              <View style={styles.activityItem}>
                <View style={styles.refreshIconBox}>
                  <Text style={{ fontSize: 16 }}>🔄</Text>
                </View>
                <View style={{ flex: 1 }}>
                  <View style={styles.activityTitleRow}>
                    <Text style={styles.activityTitle}>Schedule Update: Math 301</Text>
                    <Text style={styles.activityTime}>45 mins ago</Text>
                  </View>
                  <Text style={styles.activityDesc}>
                    Classroom shifted from Lab 4 to Auditorium A for tomorrow's lecture.
                  </Text>
                </View>
              </View>

              {/* Activity 3 */}
              <View style={styles.activityItem}>
                <Avatar
                  size={40}
                  name="Arthur Thorne"
                  source="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=150&q=80"
                  style={{ marginRight: 12 }}
                />
                <View style={{ flex: 1 }}>
                  <View style={styles.activityTitleRow}>
                    <Text style={styles.activityTitle}>Grade Submission: Prof. Arthur Thorne</Text>
                    <Text style={styles.activityTime}>2 hours ago</Text>
                  </View>
                  <Text style={styles.activityDesc}>
                    Final grades for "Architectural History" have been submitted for review.
                  </Text>
                  <Button
                    title={gradeApproved ? '✓ Grades Approved' : 'Approve Grades'}
                    variant={gradeApproved ? 'success' : 'dark'}
                    size="sm"
                    onPress={() => setGradeApproved(!gradeApproved)}
                    style={{ alignSelf: 'flex-start', marginTop: 8 }}
                  />
                </View>
              </View>
            </View>

            {/* Institutional Performance Chart */}
            <View style={styles.contentCard}>
              <View style={styles.cardHeaderRow}>
                <Text style={styles.cardHeading}>Institutional Performance</Text>
                <View style={styles.dropdownPill}>
                  <Text style={styles.dropdownText}>This Quarter ▾</Text>
                </View>
              </View>

              <View style={styles.chartContainer}>
                {performanceBars.map((bar) => (
                  <View key={bar.subject} style={styles.chartCol}>
                    <View style={styles.barTrack}>
                      <View
                        style={[
                          styles.barFill,
                          { height: bar.height },
                          bar.primary
                            ? { backgroundColor: colors.primary }
                            : { backgroundColor: '#BFDBFE' },
                        ]}
                      />
                    </View>
                    <Text style={styles.barSubject}>{bar.subject}</Text>
                  </View>
                ))}
              </View>
            </View>
          </View>

          {/* Right Column */}
          <View style={styles.rightCol}>
            {/* Quick Actions */}
            <View style={styles.contentCard}>
              <Text style={styles.cardHeading}>Quick Actions</Text>

              <Pressable
                onPress={() => navigation.navigate('CreateStudent')}
                style={styles.actionBtn}
              >
                <View style={styles.actionLeft}>
                  <Text style={{ fontSize: 16, marginRight: 10, color: colors.primary }}>➕</Text>
                  <Text style={styles.actionText}>Add Student</Text>
                </View>
                <Text style={styles.actionChevron}>›</Text>
              </Pressable>

              <Pressable
                onPress={() => navigation.navigate('CreateCourse')}
                style={styles.actionBtn}
              >
                <View style={styles.actionLeft}>
                  <Text style={{ fontSize: 16, marginRight: 10, color: colors.primary }}>📘</Text>
                  <Text style={styles.actionText}>Create Course</Text>
                </View>
                <Text style={styles.actionChevron}>›</Text>
              </Pressable>

              <Pressable
                onPress={() => Alert.alert('Report', 'Institutional attendance and performance report generated.')}
                style={styles.actionBtn}
              >
                <View style={styles.actionLeft}>
                  <Text style={{ fontSize: 16, marginRight: 10, color: colors.primary }}>📄</Text>
                  <Text style={styles.actionText}>Generate Report</Text>
                </View>
                <Text style={styles.actionChevron}>›</Text>
              </Pressable>
            </View>

            {/* Mid-Term Exams Notice Box */}
            <View style={styles.midtermCard}>
              <Text style={styles.midtermTitle}>Mid-Term Exams</Text>
              <Text style={styles.midtermDesc}>
                Starting in 12 days. Ensure all proctor schedules are finalized.
              </Text>

              <View style={styles.midtermFooter}>
                <View style={styles.avatarStack}>
                  <Avatar size={28} name="A B" style={{ marginRight: -8 }} />
                  <Avatar size={28} name="C D" style={{ marginRight: -8 }} />
                  <View style={styles.stackCount}>
                    <Text style={{ fontSize: 10, color: '#fff', fontWeight: '800' }}>+4</Text>
                  </View>
                </View>

                <Pressable
                  onPress={() => navigation.navigate('AcademicSchedules')}
                  style={styles.reviewScheduleBtn}
                >
                  <Text style={styles.reviewScheduleText}>Review Schedule</Text>
                </Pressable>
              </View>
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
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: 12,
    marginBottom: spacing.lg,
  },
  pageTitle: {
    fontSize: 24,
    fontWeight: '800',
    color: '#0F172A',
  },
  pageSubtitle: {
    fontSize: 13,
    color: '#64748B',
    marginTop: 2,
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    paddingHorizontal: 12,
    height: 40,
    width: 220,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  searchInput: {
    flex: 1,
    fontSize: 13,
    color: '#0F172A',
  },
  userChip: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  chipName: {
    fontSize: 13,
    fontWeight: '700',
    color: '#0F172A',
  },
  chipRole: {
    fontSize: 11,
    color: '#64748B',
  },
  metricsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 14,
    marginBottom: spacing.lg,
  },
  metricCard: {
    flex: 1,
    minWidth: 160,
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: 16,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    ...shadows.sm,
  },
  metricTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  metricIconBox: {
    width: 36,
    height: 36,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  metricBadgeGreen: {
    backgroundColor: '#DCFCE7',
    paddingVertical: 3,
    paddingHorizontal: 8,
    borderRadius: radius.pill,
  },
  metricBadgeGreenText: {
    fontSize: 11,
    fontWeight: '800',
    color: '#16A34A',
  },
  metricBadgeBlue: {
    backgroundColor: '#EFF6FF',
    paddingVertical: 3,
    paddingHorizontal: 8,
    borderRadius: radius.pill,
  },
  metricBadgeBlueText: {
    fontSize: 10,
    fontWeight: '700',
    color: colors.primary,
  },
  attendanceBar: {
    width: 44,
    height: 6,
    backgroundColor: '#E2E8F0',
    borderRadius: 3,
  },
  metricLabel: {
    fontSize: 11,
    fontWeight: '700',
    color: '#94A3B8',
    letterSpacing: 0.5,
  },
  metricVal: {
    fontSize: 26,
    fontWeight: '800',
    color: '#0F172A',
    marginTop: 2,
  },
  twoColWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
  },
  leftCol: {
    flex: 2,
    minWidth: 320,
    gap: 16,
  },
  rightCol: {
    flex: 1,
    minWidth: 260,
    gap: 16,
  },
  contentCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: spacing.lg,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    ...shadows.sm,
  },
  cardHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  cardHeading: {
    fontSize: 17,
    fontWeight: '800',
    color: '#0F172A',
  },
  viewAllLink: {
    fontSize: 12,
    fontWeight: '700',
    color: colors.primary,
  },
  activityItem: {
    flexDirection: 'row',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F8FAFC',
  },
  activityTitleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  activityTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: '#0F172A',
  },
  activityTime: {
    fontSize: 11,
    color: '#94A3B8',
  },
  activityDesc: {
    fontSize: 12,
    color: '#64748B',
    marginTop: 2,
    lineHeight: 17,
  },
  activityTagsRow: {
    flexDirection: 'row',
    gap: 6,
    marginTop: 6,
  },
  tagGreen: {
    backgroundColor: '#DCFCE7',
    paddingVertical: 2,
    paddingHorizontal: 8,
    borderRadius: radius.pill,
  },
  tagGreenText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#16A34A',
  },
  tagBlue: {
    backgroundColor: '#EFF6FF',
    paddingVertical: 2,
    paddingHorizontal: 8,
    borderRadius: radius.pill,
  },
  tagBlueText: {
    fontSize: 10,
    fontWeight: '700',
    color: colors.primary,
  },
  refreshIconBox: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#EFF6FF',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  dropdownPill: {
    backgroundColor: '#F1F5F9',
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: radius.pill,
  },
  dropdownText: {
    fontSize: 11,
    color: '#475569',
    fontWeight: '600',
  },
  chartContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    height: 140,
    paddingTop: 10,
  },
  chartCol: {
    flex: 1,
    alignItems: 'center',
    height: '100%',
    justifyContent: 'flex-end',
  },
  barTrack: {
    width: 36,
    height: 110,
    backgroundColor: '#F1F5F9',
    borderRadius: 6,
    overflow: 'hidden',
    justifyContent: 'flex-end',
  },
  barFill: {
    width: '100%',
    borderRadius: 6,
  },
  barSubject: {
    fontSize: 11,
    fontWeight: '600',
    color: '#64748B',
    marginTop: 6,
  },
  actionBtn: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#F8FAFC',
    borderRadius: 14,
    padding: 14,
    marginTop: 8,
  },
  actionLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#0F172A',
  },
  actionChevron: {
    fontSize: 18,
    color: '#94A3B8',
    fontWeight: '700',
  },
  midtermCard: {
    backgroundColor: '#0F172A',
    borderRadius: 20,
    padding: spacing.lg,
  },
  midtermTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#FFFFFF',
    marginBottom: 6,
  },
  midtermDesc: {
    fontSize: 12,
    color: '#94A3B8',
    lineHeight: 18,
    marginBottom: spacing.md,
  },
  midtermFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  avatarStack: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  stackCount: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#334155',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#0F172A',
  },
  reviewScheduleBtn: {
    backgroundColor: '#FFFFFF',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: radius.md,
  },
  reviewScheduleText: {
    fontSize: 11,
    fontWeight: '800',
    color: '#0F172A',
  },
});
