import React, { useState } from 'react';
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
import { Button, Badge, ProgressBar } from '../components/UI';
import { colors, spacing, radius, shadows } from '../theme';

const CALENDAR_DAYS = [
  { day: 1, status: 'regular' },
  { day: 2, status: 'regular' },
  { day: 3, status: 'regular' },
  { day: 4, status: 'present' },
  { day: 5, status: 'present' },
  { day: 6, status: 'absent' },
  { day: 7, status: 'present' },
  { day: 8, status: 'present', isToday: true },
  { day: 9, status: 'regular' },
  { day: 10, status: 'regular' },
  { day: 11, status: 'present' },
  { day: 12, status: 'present' },
  { day: 13, status: 'holiday' },
  { day: 14, status: 'present' },
  { day: 15, status: 'present' },
  { day: 16, status: 'regular' },
  { day: 17, status: 'regular' },
  { day: 18, status: 'present' },
  { day: 19, status: 'event' },
  { day: 20, status: 'present' },
  { day: 21, status: 'present' },
  { day: 22, status: 'present' },
  { day: 23, status: 'regular' },
  { day: 24, status: 'regular' },
];

const INITIAL_EVENTS = [
  {
    id: 1,
    day: '08',
    month: 'OCT',
    title: 'Science Fair Project Due',
    category: 'Academic Deadline',
    status: 'Present',
    tone: 'active',
    icon: '✓',
    notes: 'Submitted on time. Scored 94/100.',
  },
  {
    id: 2,
    day: '06',
    month: 'OCT',
    title: 'Regular School Day',
    category: 'Standard Attendance',
    status: 'Absent',
    tone: 'danger',
    icon: '!',
    notes: 'Excused sick leave. Medical note acknowledged.',
  },
  {
    id: 3,
    day: '13',
    month: 'OCT',
    title: "Fall Teacher's Institute",
    category: 'No School for Students',
    status: 'Holiday',
    tone: 'warning',
    icon: '☼',
    notes: 'Staff training day. Campus closed.',
  },
  {
    id: 4,
    day: '19',
    month: 'OCT',
    title: 'Football Team Practice',
    category: 'After School Event • 4:00 PM',
    status: 'Upcoming',
    tone: 'info',
    icon: '⏳',
    notes: 'Bring athletic gear and permission slip.',
  },
];

export default function CalendarScreen({ navigation }) {
  const [selectedDay, setSelectedDay] = useState(8);
  const [activeEvent, setActiveEvent] = useState(null);

  const handleDayPress = (item) => {
    setSelectedDay(item.day);
    const ev = INITIAL_EVENTS.find((e) => parseInt(e.day, 10) === item.day);
    if (ev) {
      setActiveEvent(ev);
    }
  };

  return (
    <Layout navigation={navigation} active="CalendarScreen" title="EduParent">
      <ScrollView
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.headerWrap}>
          <Text style={styles.title}>Attendance & Events</Text>
          <Text style={styles.subtitle}>October 2026 Overview for Leo Smith</Text>
        </View>

        {/* Calendar Card */}
        <View style={styles.calendarCard}>
          {/* Month Selector */}
          <View style={styles.monthSelector}>
            <Text style={styles.monthTitle}>October 2026</Text>
            <View style={styles.monthArrows}>
              <Pressable
                hitSlop={8}
                onPress={() => Alert.alert('Calendar', 'Showing previous month')}
                style={styles.arrowBtn}
              >
                <Text style={{ fontSize: 16, color: '#334155' }}>‹</Text>
              </Pressable>
              <Pressable
                hitSlop={8}
                onPress={() => Alert.alert('Calendar', 'Showing next month')}
                style={styles.arrowBtn}
              >
                <Text style={{ fontSize: 16, color: '#334155' }}>›</Text>
              </Pressable>
            </View>
          </View>

          {/* Weekday names */}
          <View style={styles.weekdaysRow}>
            {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((w) => (
              <Text key={w} style={styles.weekdayText}>
                {w}
              </Text>
            ))}
          </View>

          {/* Days Grid */}
          <View style={styles.daysGrid}>
            {/* 4 empty offset slots for start of October */}
            <View style={styles.daySlot} />
            <View style={styles.daySlot} />
            <View style={styles.daySlot} />
            <View style={styles.daySlot} />

            {CALENDAR_DAYS.map((item) => {
              const isSelected = selectedDay === item.day;
              const isPresent = item.status === 'present';
              const isAbsent = item.status === 'absent';
              const isHoliday = item.status === 'holiday' || item.status === 'event';

              return (
                <Pressable
                  key={item.day}
                  onPress={() => handleDayPress(item)}
                  style={[
                    styles.daySlot,
                    isPresent && styles.daySlotPresent,
                    item.isToday && styles.daySlotToday,
                    isSelected && styles.daySlotSelected,
                  ]}
                >
                  <Text
                    style={[
                      styles.dayNumber,
                      isSelected && styles.dayNumberSelected,
                      item.isToday && { color: colors.primary, fontWeight: '800' },
                    ]}
                  >
                    {item.day}
                  </Text>
                  {/* Status Indicator Dot */}
                  {isPresent ? (
                    <View style={styles.dotPresent} />
                  ) : isAbsent ? (
                    <View style={styles.dotAbsent} />
                  ) : isHoliday ? (
                    <View style={styles.dotHoliday} />
                  ) : null}
                </Pressable>
              );
            })}
          </View>

          {/* Legend */}
          <View style={styles.legendRow}>
            <View style={styles.legendItem}>
              <View style={[styles.legendDot, { backgroundColor: '#10B981' }]} />
              <Text style={styles.legendLabel}>Present</Text>
            </View>
            <View style={styles.legendItem}>
              <View style={[styles.legendDot, { backgroundColor: '#EF4444' }]} />
              <Text style={styles.legendLabel}>Absent</Text>
            </View>
            <View style={styles.legendItem}>
              <View style={[styles.legendDot, { backgroundColor: '#F59E0B' }]} />
              <Text style={styles.legendLabel}>Event/Holiday</Text>
            </View>
          </View>
        </View>

        {/* Attendance Score Card (Blue) */}
        <View style={styles.attendanceScoreCard}>
          <Text style={styles.scoreLabel}>Attendance Score</Text>
          <Text style={styles.scoreNumber}>
            94% <Text style={styles.scoreSub}>Monthly Avg.</Text>
          </Text>

          {/* Score progress bar */}
          <View style={styles.progressBarTrack}>
            <View style={[styles.progressBarFill, { width: '94%' }]} />
          </View>

          <Text style={styles.scoreMessage}>
            Leo has missed only 1 day this month. Keep it up!
          </Text>
        </View>

        {/* Next Meeting Card (Light Blue) */}
        <View style={styles.meetingCard}>
          <View style={styles.meetingIconBox}>
            <Text style={{ fontSize: 18 }}>📅</Text>
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.meetingTitle}>Next Meeting</Text>
            <Text style={styles.meetingEvent}>Parent-Teacher Conf.</Text>
            <Text style={styles.meetingTime}>Oct 13, 3:30 PM • Room 204</Text>
          </View>
        </View>

        {/* October Schedule & History */}
        <View style={styles.historySection}>
          <Text style={styles.historyHeading}>October Schedule & History</Text>

          {INITIAL_EVENTS.map((item) => (
            <Pressable
              key={item.id}
              onPress={() => setActiveEvent(item)}
              style={styles.historyItemCard}
            >
              {/* Date Box */}
              <View style={styles.dateBox}>
                <Text style={styles.dateBoxMonth}>{item.month}</Text>
                <Text style={styles.dateBoxDay}>{item.day}</Text>
              </View>

              {/* Event Content */}
              <View style={{ flex: 1, marginRight: 8 }}>
                <Text style={styles.historyTitle}>{item.title}</Text>
                <Text style={styles.historyCategory}>{item.category}</Text>
              </View>

              {/* Status Badge */}
              <Badge
                text={`${item.icon} ${item.status}`}
                tone={item.tone}
                size="sm"
              />

              <Text style={{ fontSize: 18, color: '#94A3B8', marginLeft: 6 }}>›</Text>
            </Pressable>
          ))}
        </View>
      </ScrollView>

      {/* Event Details Modal */}
      <Modal
        visible={!!activeEvent}
        transparent
        animationType="fade"
        onRequestClose={() => setActiveEvent(null)}
      >
        <View style={styles.eventModalOverlay}>
          <View style={styles.eventModalContent}>
            <View style={styles.eventModalHeader}>
              <Text style={styles.eventModalTitle}>{activeEvent?.title}</Text>
              <Pressable onPress={() => setActiveEvent(null)}>
                <Text style={{ fontSize: 20, color: colors.muted }}>✕</Text>
              </Pressable>
            </View>
            <Text style={styles.eventModalDate}>
              Date: October {activeEvent?.day}, 2026
            </Text>
            <Text style={styles.eventModalCategory}>
              Category: {activeEvent?.category}
            </Text>
            <View style={styles.notesBox}>
              <Text style={styles.notesText}>{activeEvent?.notes}</Text>
            </View>
            <Button
              title="Close"
              variant="secondary"
              onPress={() => setActiveEvent(null)}
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
  headerWrap: {
    marginBottom: spacing.md,
  },
  title: {
    fontSize: 22,
    fontWeight: '800',
    color: '#0F172A',
  },
  subtitle: {
    fontSize: 13,
    color: '#64748B',
    marginTop: 2,
  },
  calendarCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: spacing.lg,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    marginBottom: spacing.md,
    ...shadows.sm,
  },
  monthSelector: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  monthTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: '#0F172A',
  },
  monthArrows: {
    flexDirection: 'row',
    gap: 8,
  },
  arrowBtn: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#F1F5F9',
    alignItems: 'center',
    justifyContent: 'center',
  },
  weekdaysRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  weekdayText: {
    flex: 1,
    textAlign: 'center',
    fontSize: 11,
    fontWeight: '700',
    color: '#94A3B8',
  },
  daysGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  daySlot: {
    width: '14.28%',
    height: 42,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    marginVertical: 2,
  },
  daySlotPresent: {
    backgroundColor: '#ECFDF5',
  },
  daySlotToday: {
    borderWidth: 1.5,
    borderColor: colors.primary,
  },
  daySlotSelected: {
    backgroundColor: colors.primary,
  },
  dayNumber: {
    fontSize: 13,
    fontWeight: '600',
    color: '#334155',
  },
  dayNumberSelected: {
    color: '#FFFFFF',
    fontWeight: '800',
  },
  dotPresent: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#10B981',
    marginTop: 2,
  },
  dotAbsent: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#EF4444',
    marginTop: 2,
  },
  dotHoliday: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#F59E0B',
    marginTop: 2,
  },
  legendRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 16,
    marginTop: spacing.md,
    paddingTop: spacing.md,
    borderTopWidth: 1,
    borderTopColor: '#F1F5F9',
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  legendDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 6,
  },
  legendLabel: {
    fontSize: 11,
    fontWeight: '600',
    color: '#64748B',
  },
  attendanceScoreCard: {
    backgroundColor: '#1D4ED8',
    borderRadius: 20,
    padding: spacing.lg,
    marginBottom: spacing.md,
    ...shadows.sm,
  },
  scoreLabel: {
    color: '#BFDBFE',
    fontSize: 13,
    fontWeight: '700',
  },
  scoreNumber: {
    fontSize: 32,
    fontWeight: '800',
    color: '#FFFFFF',
    marginVertical: 4,
  },
  scoreSub: {
    fontSize: 13,
    fontWeight: '600',
    color: '#93C5FD',
  },
  progressBarTrack: {
    height: 6,
    backgroundColor: 'rgba(255, 255, 255, 0.25)',
    borderRadius: 3,
    marginVertical: 8,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: '#34D399',
    borderRadius: 3,
  },
  scoreMessage: {
    color: '#DBEAFE',
    fontSize: 12,
    lineHeight: 18,
  },
  meetingCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EFF6FF',
    borderRadius: 18,
    padding: 14,
    marginBottom: spacing.lg,
    borderWidth: 1,
    borderColor: '#DBEAFE',
  },
  meetingIconBox: {
    width: 40,
    height: 40,
    borderRadius: 10,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
    ...shadows.sm,
  },
  meetingTitle: {
    fontSize: 11,
    color: '#64748B',
    fontWeight: '600',
  },
  meetingEvent: {
    fontSize: 15,
    fontWeight: '800',
    color: '#1E40AF',
    marginTop: 1,
  },
  meetingTime: {
    fontSize: 12,
    color: '#3B82F6',
    marginTop: 2,
  },
  historySection: {
    marginBottom: spacing.xl,
  },
  historyHeading: {
    fontSize: 17,
    fontWeight: '800',
    color: '#0F172A',
    marginBottom: 10,
  },
  historyItemCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 12,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    ...shadows.sm,
  },
  dateBox: {
    width: 44,
    height: 44,
    borderRadius: 10,
    backgroundColor: '#EFF6FF',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  dateBoxMonth: {
    fontSize: 9,
    fontWeight: '800',
    color: colors.primary,
    letterSpacing: 0.5,
  },
  dateBoxDay: {
    fontSize: 15,
    fontWeight: '800',
    color: colors.primary,
    marginTop: -1,
  },
  historyTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: '#0F172A',
  },
  historyCategory: {
    fontSize: 11,
    color: '#64748B',
    marginTop: 2,
  },
  eventModalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    padding: spacing.lg,
  },
  eventModalContent: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: spacing.lg,
  },
  eventModalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  eventModalTitle: {
    fontSize: 17,
    fontWeight: '800',
    color: '#0F172A',
  },
  eventModalDate: {
    fontSize: 13,
    color: '#475569',
    marginBottom: 4,
  },
  eventModalCategory: {
    fontSize: 13,
    color: '#64748B',
    marginBottom: 12,
  },
  notesBox: {
    backgroundColor: '#F8FAFC',
    borderRadius: 12,
    padding: 12,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  notesText: {
    fontSize: 12,
    color: '#334155',
    lineHeight: 18,
  },
});
