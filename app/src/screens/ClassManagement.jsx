import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
  Modal,
  Alert,
} from 'react-native';
import Layout from '../components/Layout';
import { Button, ProgressBar, Avatar, Input } from '../components/UI';
import { api } from '../api';
import { colors, spacing, radius, shadows } from '../theme';

const MOCK_CLASSES = [
  {
    id: 1,
    code: 'MATH 401',
    title: 'Advanced Mathematics',
    enrolled: 28,
    nextSession: 'Tomorrow, 10:00 AM',
    classroom: 'Building A, Room 204',
    progress: 72,
    gradientColor: '#2563EB',
  },
  {
    id: 2,
    code: 'PHYS 502',
    title: 'Quantum Physics II',
    enrolled: 15,
    nextSession: 'Wednesday, 2:00 PM',
    classroom: 'Main Lab, Hall 3',
    progress: 45,
    gradientColor: '#1E293B',
  },
  {
    id: 3,
    code: 'CS 304',
    title: 'Computational Linguistics',
    enrolled: 42,
    nextSession: 'Thursday, 9:00 AM',
    classroom: 'Virtual Hall 12',
    progress: 90,
    gradientColor: '#0D9488',
  },
];

export default function ClassManagement({ navigation }) {
  const [classes, setClasses] = useState(MOCK_CLASSES);
  const [newModal, setNewModal] = useState(false);
  const [newClass, setNewClass] = useState({
    code: '',
    title: '',
    classroom: '',
    nextSession: '',
  });

  const handleAddClass = () => {
    if (!newClass.title) return;
    setClasses((prev) => [
      ...prev,
      {
        id: Date.now(),
        code: newClass.code || 'GEN 101',
        title: newClass.title,
        enrolled: 20,
        nextSession: newClass.nextSession || 'Monday, 10:00 AM',
        classroom: newClass.classroom || 'Hall A',
        progress: 10,
        gradientColor: '#3B82F6',
      },
    ]);
    setNewModal(false);
    setNewClass({ code: '', title: '', classroom: '', nextSession: '' });
  };

  return (
    <Layout navigation={navigation} active="ClassManagement">
      <ScrollView contentContainerStyle={styles.scroll}>
        {/* Top Navbar Row */}
        <View style={styles.topNavRow}>
          <View style={styles.topNavLinks}>
            <Text style={styles.topNavLinkActive}>Class</Text>
            <Text style={styles.topNavLink}>Features</Text>
            <Text style={styles.topNavLink}>Benefits</Text>
            <Text style={styles.topNavLink}>Pricing</Text>
          </View>

          <View style={styles.topNavRight}>
            <View style={styles.searchBox}>
              <Text style={{ fontSize: 13, color: '#94A3B8', marginRight: 6 }}>🔍</Text>
              <TextInput
                placeholder="Search courses..."
                placeholderTextColor="#94A3B8"
                style={styles.searchInput}
              />
            </View>

            <View style={styles.teacherProfileChip}>
              <View style={{ alignItems: 'flex-end', marginRight: 8 }}>
                <Text style={styles.teacherName}>Dr. Julian Vance</Text>
                <Text style={styles.teacherRole}>Teacher</Text>
              </View>
              <Avatar
                size={34}
                name="Julian Vance"
                source="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80"
              />
            </View>
          </View>
        </View>

        {/* Header */}
        <View style={styles.headerRow}>
          <View>
            <Text style={styles.pageTitle}>My Classes</Text>
            <Text style={styles.pageSubtitle}>
              Manage your current academic course load and student materials.
            </Text>
          </View>

          <Button
            title="+ Create New Class"
            size="md"
            onPress={() => setNewModal(true)}
          />
        </View>

        {/* Classes Grid */}
        <View style={styles.grid}>
          {classes.map((cls) => (
            <View key={cls.id} style={styles.classCard}>
              {/* Colored Header Banner */}
              <View style={[styles.cardBanner, { backgroundColor: cls.gradientColor }]}>
                <View style={styles.codePill}>
                  <Text style={styles.codePillText}>{cls.code}</Text>
                </View>
                <Text style={styles.bannerTitle}>{cls.title}</Text>
              </View>

              {/* Body */}
              <View style={styles.cardBody}>
                {/* Enrolled row */}
                <View style={styles.enrolledRow}>
                  <Text style={{ fontSize: 14, marginRight: 6 }}>👥</Text>
                  <Text style={styles.enrolledText}>{cls.enrolled} Students Enrolled</Text>
                </View>

                {/* Session info */}
                <View style={styles.infoRow}>
                  <Text style={styles.infoLabel}>Next Session</Text>
                  <Text style={styles.infoVal}>{cls.nextSession}</Text>
                </View>

                <View style={styles.infoRow}>
                  <Text style={styles.infoLabel}>Classroom</Text>
                  <Text style={styles.infoVal}>{cls.classroom}</Text>
                </View>

                {/* Syllabus Progress */}
                <View style={styles.progressSection}>
                  <View style={styles.progressHeader}>
                    <Text style={styles.progressLabel}>SYLLABUS PROGRESS</Text>
                    <Text style={styles.progressPct}>{cls.progress}%</Text>
                  </View>
                  <ProgressBar progress={cls.progress} color={cls.gradientColor} height={6} />
                </View>

                {/* Action Buttons */}
                <View style={styles.actionsRow}>
                  <Button
                    title="Gradebook"
                    variant="outline"
                    size="sm"
                    onPress={() => Alert.alert('Gradebook', `Viewing gradebook for ${cls.title}`)}
                    style={{ flex: 1, marginRight: 8 }}
                  />
                  <Button
                    title="Class Materials"
                    variant="primary"
                    size="sm"
                    onPress={() => Alert.alert('Materials', `Accessing files and notes for ${cls.title}`)}
                    style={{ flex: 1 }}
                  />
                </View>
              </View>
            </View>
          ))}
        </View>

        {/* Summary Footer Card */}
        <View style={styles.summaryCard}>
          <View style={styles.summaryMetric}>
            <Text style={styles.summaryLabel}>TOTAL CLASSES</Text>
            <Text style={styles.summaryVal}>06</Text>
          </View>

          <View style={styles.divider} />

          <View style={styles.summaryMetric}>
            <Text style={styles.summaryLabel}>TOTAL STUDENTS</Text>
            <Text style={styles.summaryVal}>148</Text>
          </View>

          <View style={styles.divider} />

          <View style={styles.summaryMetric}>
            <Text style={styles.summaryLabel}>AVG. ATTENDANCE</Text>
            <Text style={[styles.summaryVal, { color: '#10B981' }]}>94%</Text>
          </View>

          <View style={styles.divider} />

          <View style={styles.performersCol}>
            <View style={styles.avatarGroup}>
              <Avatar size={28} name="J D" style={{ marginRight: -6 }} />
              <Avatar size={28} name="S M" style={{ marginRight: -6 }} />
              <Avatar size={28} name="K T" style={{ marginRight: -6 }} />
              <View style={styles.extraCount}>
                <Text style={{ fontSize: 9, color: '#fff', fontWeight: '800' }}>+145</Text>
              </View>
            </View>
            <Text style={styles.performersText}>Top performing students this week</Text>
          </View>
        </View>
      </ScrollView>

      {/* Add Class Modal */}
      <Modal
        visible={newModal}
        transparent
        animationType="slide"
        onRequestClose={() => setNewModal(false)}
      >
        <View style={styles.modalBg}>
          <View style={styles.modalCard}>
            <Text style={styles.modalTitle}>Create New Class</Text>
            <Input
              label="Course Code"
              placeholder="e.g. CS 401"
              value={newClass.code}
              onChangeText={(v) => setNewClass({ ...newClass, code: v })}
            />
            <Input
              label="Class Title"
              placeholder="e.g. Advanced Algorithms"
              value={newClass.title}
              onChangeText={(v) => setNewClass({ ...newClass, title: v })}
            />
            <Input
              label="Classroom"
              placeholder="e.g. Building B, Room 102"
              value={newClass.classroom}
              onChangeText={(v) => setNewClass({ ...newClass, classroom: v })}
            />
            <Input
              label="Next Session"
              placeholder="e.g. Tomorrow, 11:00 AM"
              value={newClass.nextSession}
              onChangeText={(v) => setNewClass({ ...newClass, nextSession: v })}
            />
            <Button
              title="Add Class"
              variant="primary"
              onPress={handleAddClass}
              style={{ marginTop: 8 }}
            />
            <Button
              title="Cancel"
              variant="ghost"
              onPress={() => setNewModal(false)}
              style={{ marginTop: 6 }}
            />
          </View>
        </View>
      </Modal>
    </Layout>
  );
}

const styles = StyleSheet.create({
  scroll: {
    padding: spacing.lg,
    paddingBottom: spacing.xxl,
  },
  topNavRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
    paddingBottom: 12,
    marginBottom: spacing.lg,
  },
  topNavLinks: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  topNavLinkActive: {
    fontSize: 14,
    fontWeight: '800',
    color: '#0F172A',
  },
  topNavLink: {
    fontSize: 13,
    color: '#64748B',
    fontWeight: '600',
  },
  topNavRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    paddingHorizontal: 10,
    height: 36,
    width: 200,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  searchInput: {
    flex: 1,
    fontSize: 12,
    color: '#0F172A',
  },
  teacherProfileChip: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  teacherName: {
    fontSize: 12,
    fontWeight: '700',
    color: '#0F172A',
  },
  teacherRole: {
    fontSize: 10,
    color: '#64748B',
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
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
    marginBottom: spacing.lg,
  },
  classCard: {
    flex: 1,
    minWidth: 280,
    maxWidth: 380,
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    ...shadows.sm,
  },
  cardBanner: {
    padding: spacing.lg,
    paddingTop: 18,
    minHeight: 110,
    justifyContent: 'space-between',
  },
  codePill: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingVertical: 3,
    paddingHorizontal: 8,
    borderRadius: radius.pill,
    alignSelf: 'flex-start',
    marginBottom: 8,
  },
  codePillText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  bannerTitle: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '800',
  },
  cardBody: {
    padding: spacing.lg,
  },
  enrolledRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  enrolledText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#334155',
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 6,
    borderBottomWidth: 1,
    borderBottomColor: '#F8FAFC',
  },
  infoLabel: {
    fontSize: 12,
    color: '#64748B',
  },
  infoVal: {
    fontSize: 12,
    fontWeight: '700',
    color: '#0F172A',
  },
  progressSection: {
    marginVertical: 12,
  },
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  progressLabel: {
    fontSize: 10,
    fontWeight: '800',
    color: '#94A3B8',
    letterSpacing: 0.5,
  },
  progressPct: {
    fontSize: 11,
    fontWeight: '800',
    color: '#0F172A',
  },
  actionsRow: {
    flexDirection: 'row',
    marginTop: 8,
  },
  summaryCard: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: spacing.lg,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    gap: 16,
    ...shadows.sm,
  },
  summaryMetric: {
    paddingHorizontal: spacing.sm,
  },
  summaryLabel: {
    fontSize: 10,
    fontWeight: '800',
    color: '#94A3B8',
    letterSpacing: 0.5,
  },
  summaryVal: {
    fontSize: 26,
    fontWeight: '800',
    color: colors.primary,
    marginTop: 2,
  },
  divider: {
    width: 1,
    height: 40,
    backgroundColor: '#E2E8F0',
  },
  performersCol: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 'auto',
    gap: 10,
  },
  avatarGroup: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  extraCount: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#0F172A',
    alignItems: 'center',
    justifyContent: 'center',
  },
  performersText: {
    fontSize: 11,
    color: '#64748B',
    maxWidth: 140,
    lineHeight: 15,
  },
  modalBg: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    padding: spacing.lg,
  },
  modalCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: spacing.xl,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#0F172A',
    marginBottom: 12,
  },
});
