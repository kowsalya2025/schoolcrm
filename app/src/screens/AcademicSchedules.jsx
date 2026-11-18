import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
  TextInput,
  Modal,
  Alert,
} from 'react-native';
import Layout from '../components/Layout';
import { Button, Input } from '../components/UI';
import { colors, spacing, radius, shadows } from '../theme';

export default function AcademicSchedules({ navigation }) {
  const [viewMode, setViewMode] = useState('Week'); // Week, Day, Month
  const [perspective, setPerspective] = useState('Classrooms');
  const [departments, setDepartments] = useState(['Physical Sciences', 'Engineering']);
  const [addModal, setAddModal] = useState(false);
  const [newEntry, setNewEntry] = useState({ title: '', room: '', prof: '', time: '' });

  const toggleDept = (dept) => {
    if (departments.includes(dept)) {
      setDepartments(departments.filter((d) => d !== dept));
    } else {
      setDepartments([...departments, dept]);
    }
  };

  return (
    <Layout navigation={navigation} active="AcademicSchedules">
      <ScrollView contentContainerStyle={styles.scroll}>
        {/* Header */}
        <View style={styles.headerRow}>
          <View>
            <Text style={styles.pageTitle}>Academic Schedules</Text>
            <Text style={styles.pageSubtitle}>
              Manage institutional time slots, faculty allocations, and venue availability.
            </Text>
          </View>

          <View style={styles.headerRight}>
            <View style={styles.viewToggle}>
              {['Week', 'Day', 'Month'].map((mode) => (
                <Pressable
                  key={mode}
                  onPress={() => setViewMode(mode)}
                  style={[styles.toggleBtn, viewMode === mode && styles.toggleBtnActive]}
                >
                  <Text style={[styles.toggleText, viewMode === mode && styles.toggleTextActive]}>
                    {mode}
                  </Text>
                </Pressable>
              ))}
            </View>

            <Button
              title="📅 Create New Schedule"
              variant="dark"
              size="md"
              onPress={() => setAddModal(true)}
            />
          </View>
        </View>

        {/* 2-Column Schedule Workspace */}
        <View style={styles.workspaceRow}>
          {/* Left Controls & Filters Sidebar */}
          <View style={styles.leftFilterCard}>
            {/* View Perspective */}
            <Text style={styles.filterTitle}>VIEW PERSPECTIVE</Text>
            {['Classrooms', 'Faculty Members', 'Student Groups'].map((p) => {
              const active = perspective === p;
              return (
                <Pressable
                  key={p}
                  onPress={() => setPerspective(p)}
                  style={[styles.perspectiveBtn, active && styles.perspectiveBtnActive]}
                >
                  <Text style={[styles.perspectiveText, active && styles.perspectiveTextActive]}>
                    {p}
                  </Text>
                  <View style={[styles.radioCircle, active && styles.radioCircleActive]} />
                </Pressable>
              );
            })}

            {/* Departments Filter */}
            <Text style={[styles.filterTitle, { marginTop: spacing.lg }]}>DEPARTMENTS</Text>
            {['Physical Sciences', 'Engineering', 'Arts & Humanities', 'Medicine'].map((d) => {
              const checked = departments.includes(d);
              return (
                <Pressable
                  key={d}
                  onPress={() => toggleDept(d)}
                  style={styles.checkboxRow}
                >
                  <View style={[styles.checkbox, checked && styles.checkboxChecked]}>
                    {checked ? <Text style={{ color: '#fff', fontSize: 10, fontWeight: '800' }}>✓</Text> : null}
                  </View>
                  <Text style={styles.checkboxLabel}>{d}</Text>
                </Pressable>
              );
            })}
          </View>

          {/* Right Timetable Calendar Grid */}
          <View style={styles.timetableCard}>
            {/* Nav Row */}
            <View style={styles.calendarNavRow}>
              <View style={styles.weekNav}>
                <Pressable hitSlop={6}><Text style={{ fontSize: 16 }}>‹</Text></Pressable>
                <Text style={styles.weekNavTitle}>Week of Oct 7 - 11, 2024</Text>
                <Pressable hitSlop={6}><Text style={{ fontSize: 16 }}>›</Text></Pressable>
              </View>

              <View style={styles.todayActionRow}>
                <View style={styles.todayPill}><Text style={styles.todayText}>Today</Text></View>
                <Text style={{ fontSize: 16, color: '#64748B' }}>🖨️</Text>
                <Text style={{ fontSize: 16, color: '#64748B' }}>⋮</Text>
              </View>
            </View>

            {/* Timetable visual schedule */}
            <View style={styles.timetableGrid}>
              {/* Day Headers */}
              <View style={styles.timeHeaderRow}>
                <View style={{ width: 60 }} />
                <View style={styles.dayColHeader}><Text style={styles.dayColTitle}>MON</Text><Text style={styles.dayColDate}>Oct 7</Text></View>
                <View style={styles.dayColHeader}><Text style={styles.dayColTitle}>TUE</Text><Text style={styles.dayColDate}>Oct 8</Text></View>
                <View style={styles.dayColHeader}><Text style={styles.dayColTitle}>WED</Text><Text style={styles.dayColDate}>Oct 9</Text></View>
                <View style={styles.dayColHeader}><Text style={styles.dayColTitle}>THU</Text><Text style={styles.dayColDate}>Oct 10</Text></View>
                <View style={styles.dayColHeader}><Text style={styles.dayColTitle}>FRI</Text><Text style={styles.dayColDate}>Oct 11</Text></View>
              </View>

              {/* 08 AM - 09 AM */}
              <View style={styles.timeSlotRow}>
                <View style={styles.timeLabelBox}><Text style={styles.timeLabel}>08 AM</Text></View>
                <View style={[styles.slotCell, { backgroundColor: '#EFF6FF', borderLeftWidth: 3, borderLeftColor: colors.primary }]}>
                  <Text style={styles.slotLocation}>PHYSICS HALL 402</Text>
                  <Text style={styles.slotCourse}>Quantum Physics II</Text>
                  <Text style={styles.slotProf}>Prof. Aris Thorne</Text>
                </View>
                <View style={styles.slotCell} />
                <View style={[styles.slotCell, { backgroundColor: '#EFF6FF', borderLeftWidth: 3, borderLeftColor: colors.primary }]}>
                  <Text style={styles.slotLocation}>PHYSICS HALL 402</Text>
                  <Text style={styles.slotCourse}>Quantum Physics II</Text>
                  <Text style={styles.slotProf}>Prof. Aris Thorne</Text>
                </View>
                <View style={styles.slotCell} />
                <View style={[styles.slotCell, { backgroundColor: '#FDF2F8', borderLeftWidth: 3, borderLeftColor: '#DB2777' }]}>
                  <Text style={[styles.slotLocation, { color: '#9D174D' }]}>LAB B-12</Text>
                  <Text style={styles.slotCourse}>Faculty Meeting</Text>
                </View>
              </View>

              {/* 10 AM - 11 AM */}
              <View style={styles.timeSlotRow}>
                <View style={styles.timeLabelBox}><Text style={styles.timeLabel}>10 AM</Text></View>
                <View style={styles.slotCell} />
                <View style={[styles.slotCell, { backgroundColor: '#ECFDF5', borderLeftWidth: 3, borderLeftColor: '#059669' }]}>
                  <Text style={[styles.slotLocation, { color: '#065F46' }]}>MAIN AUDITORIUM</Text>
                  <Text style={styles.slotCourse}>Advanced Mathematics</Text>
                  <Text style={styles.slotProf}>Dr. Eleanor Rigby</Text>
                </View>
                <View style={styles.slotCell} />
                <View style={[styles.slotCell, { backgroundColor: '#ECFDF5', borderLeftWidth: 3, borderLeftColor: '#059669' }]}>
                  <Text style={[styles.slotLocation, { color: '#065F46' }]}>MAIN AUDITORIUM</Text>
                  <Text style={styles.slotCourse}>Advanced Mathematics</Text>
                </View>
                <View style={styles.slotCell} />
              </View>

              {/* 12 PM - Lunch Break */}
              <View style={styles.lunchBreakRow}>
                <Text style={styles.lunchText}>🍽 Campus-wide Lunch Break Period</Text>
              </View>

              {/* 01 PM */}
              <View style={styles.timeSlotRow}>
                <View style={styles.timeLabelBox}><Text style={styles.timeLabel}>01 PM</Text></View>
                <View style={[styles.slotCell, { backgroundColor: '#FEF3C7', borderLeftWidth: 3, borderLeftColor: '#D97706' }]}>
                  <Text style={[styles.slotLocation, { color: '#92400E' }]}>SEMINAR ROOM C</Text>
                  <Text style={styles.slotCourse}>History of Modernity</Text>
                  <Text style={styles.slotProf}>Prof. Julian Vane</Text>
                </View>
                <View style={styles.slotCell} />
                <View style={styles.slotCell} />
                <View style={styles.slotCell} />
                <View style={styles.slotCell} />
              </View>
            </View>
          </View>
        </View>

        {/* 4 Summary Stat Cards */}
        <View style={styles.statCardsRow}>
          <View style={styles.statBox}>
            <View style={[styles.statIconBox, { backgroundColor: '#EFF6FF' }]}>
              <Text style={{ fontSize: 16 }}>🏛️</Text>
            </View>
            <Text style={styles.statBoxLabel}>Active Classrooms</Text>
            <Text style={styles.statBoxVal}>42 / 45</Text>
          </View>

          <View style={styles.statBox}>
            <View style={[styles.statIconBox, { backgroundColor: '#ECFDF5' }]}>
              <Text style={{ fontSize: 16 }}>👔</Text>
            </View>
            <Text style={styles.statBoxLabel}>Faculty Utilization</Text>
            <Text style={styles.statBoxVal}>88%</Text>
          </View>

          <View style={styles.statBox}>
            <View style={[styles.statIconBox, { backgroundColor: '#EFF6FF' }]}>
              <Text style={{ fontSize: 16 }}>⚠️</Text>
            </View>
            <Text style={styles.statBoxLabel}>Schedule Conflicts</Text>
            <Text style={styles.statBoxVal}>0 <Text style={{ fontSize: 12, color: '#10B981' }}>Optimized</Text></Text>
          </View>

          <View style={styles.statBox}>
            <View style={[styles.statIconBox, { backgroundColor: '#EFF6FF' }]}>
              <Text style={{ fontSize: 16 }}>🔄</Text>
            </View>
            <Text style={styles.statBoxLabel}>Next Term Sync</Text>
            <Text style={styles.statBoxVal}>In 12 Days</Text>
          </View>
        </View>
      </ScrollView>

      {/* Add Schedule Modal */}
      <Modal
        visible={addModal}
        transparent
        animationType="slide"
        onRequestClose={() => setAddModal(false)}
      >
        <View style={styles.modalBg}>
          <View style={styles.modalCard}>
            <Text style={styles.modalTitle}>Create New Schedule</Text>
            <Input
              label="Course / Session Name"
              placeholder="e.g. Physics Lab 301"
              value={newEntry.title}
              onChangeText={(v) => setNewEntry({ ...newEntry, title: v })}
            />
            <Input
              label="Room / Hall"
              placeholder="e.g. Science Auditorium A"
              value={newEntry.room}
              onChangeText={(v) => setNewEntry({ ...newEntry, room: v })}
            />
            <Input
              label="Faculty / Professor"
              placeholder="e.g. Dr. Eleanor Rigby"
              value={newEntry.prof}
              onChangeText={(v) => setNewEntry({ ...newEntry, prof: v })}
            />
            <Button
              title="Add Schedule"
              variant="primary"
              onPress={() => {
                setAddModal(false);
                Alert.alert('Created', 'Schedule added to timetable.');
              }}
              style={{ marginTop: 8 }}
            />
            <Button
              title="Cancel"
              variant="ghost"
              onPress={() => setAddModal(false)}
              style={{ marginTop: 4 }}
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
  viewToggle: {
    flexDirection: 'row',
    backgroundColor: '#F1F5F9',
    borderRadius: radius.md,
    padding: 3,
  },
  toggleBtn: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: radius.sm,
  },
  toggleBtnActive: {
    backgroundColor: '#FFFFFF',
    ...shadows.sm,
  },
  toggleText: {
    fontSize: 12,
    color: '#64748B',
    fontWeight: '600',
  },
  toggleTextActive: {
    color: '#0F172A',
    fontWeight: '800',
  },
  workspaceRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
    marginBottom: spacing.lg,
  },
  leftFilterCard: {
    width: 220,
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: spacing.lg,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    ...shadows.sm,
  },
  filterTitle: {
    fontSize: 11,
    fontWeight: '800',
    color: '#94A3B8',
    letterSpacing: 0.8,
    marginBottom: 10,
  },
  perspectiveBtn: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderRadius: radius.md,
    marginBottom: 4,
  },
  perspectiveBtnActive: {
    backgroundColor: '#EFF6FF',
  },
  perspectiveText: {
    fontSize: 13,
    color: '#64748B',
    fontWeight: '600',
  },
  perspectiveTextActive: {
    color: colors.primary,
    fontWeight: '800',
  },
  radioCircle: {
    width: 14,
    height: 14,
    borderRadius: 7,
    borderWidth: 1.5,
    borderColor: '#CBD5E1',
  },
  radioCircleActive: {
    borderColor: colors.primary,
    backgroundColor: colors.primary,
  },
  checkboxRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 6,
  },
  checkbox: {
    width: 16,
    height: 16,
    borderRadius: 4,
    backgroundColor: '#F1F5F9',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
  },
  checkboxChecked: {
    backgroundColor: colors.primary,
  },
  checkboxLabel: {
    fontSize: 12,
    color: '#334155',
  },
  timetableCard: {
    flex: 1,
    minWidth: 480,
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: spacing.lg,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    ...shadows.sm,
  },
  calendarNavRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  weekNav: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  weekNavTitle: {
    fontSize: 14,
    fontWeight: '800',
    color: '#0F172A',
  },
  todayActionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  todayPill: {
    backgroundColor: '#F1F5F9',
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: radius.pill,
  },
  todayText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#334155',
  },
  timetableGrid: {
    borderTopWidth: 1,
    borderTopColor: '#E2E8F0',
  },
  timeHeaderRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
    paddingVertical: 8,
  },
  dayColHeader: {
    flex: 1,
    alignItems: 'center',
  },
  dayColTitle: {
    fontSize: 11,
    fontWeight: '800',
    color: '#94A3B8',
  },
  dayColDate: {
    fontSize: 12,
    fontWeight: '800',
    color: '#0F172A',
  },
  timeSlotRow: {
    flexDirection: 'row',
    minHeight: 70,
    borderBottomWidth: 1,
    borderBottomColor: '#F8FAFC',
  },
  timeLabelBox: {
    width: 60,
    justifyContent: 'center',
  },
  timeLabel: {
    fontSize: 11,
    color: '#94A3B8',
    fontWeight: '600',
  },
  slotCell: {
    flex: 1,
    borderRadius: 8,
    padding: 6,
    margin: 2,
    justifyContent: 'center',
  },
  slotLocation: {
    fontSize: 8,
    fontWeight: '800',
    color: colors.primary,
    letterSpacing: 0.5,
  },
  slotCourse: {
    fontSize: 11,
    fontWeight: '800',
    color: '#0F172A',
  },
  slotProf: {
    fontSize: 9,
    color: '#64748B',
  },
  lunchBreakRow: {
    backgroundColor: '#F8FAFC',
    paddingVertical: 10,
    alignItems: 'center',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#E2E8F0',
  },
  lunchText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#64748B',
  },
  statCardsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 14,
  },
  statBox: {
    flex: 1,
    minWidth: 160,
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: 16,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    ...shadows.sm,
  },
  statIconBox: {
    width: 34,
    height: 34,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  statBoxLabel: {
    fontSize: 11,
    color: '#64748B',
    fontWeight: '600',
  },
  statBoxVal: {
    fontSize: 20,
    fontWeight: '800',
    color: '#0F172A',
    marginTop: 2,
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
