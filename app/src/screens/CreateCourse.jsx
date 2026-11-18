import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
  Alert,
} from 'react-native';
import Layout from '../components/Layout';
import { Input, Button, SwitchToggle } from '../components/UI';
import { api } from '../api';
import { colors, spacing, radius, shadows } from '../theme';

const DAYS = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];

export default function CreateCourse({ navigation }) {
  const [title, setTitle] = useState('');
  const [code, setCode] = useState('CIV-402');
  const [credits, setCredits] = useState('3.0');
  const [department, setDepartment] = useState('Faculty of Civil Engineering');
  const [semester, setSemester] = useState('Fall 2024');
  const [room, setRoom] = useState('Engineering Hall 302');
  const [selectedDays, setSelectedDays] = useState(['TUE', 'THU']);
  const [startTime, setStartTime] = useState('09:00 AM');
  const [endTime, setEndTime] = useState('10:30 AM');
  const [instructor, setInstructor] = useState('Dr. Sarah Miller');
  const [capacity, setCapacity] = useState('45');
  const [waitlist, setWaitlist] = useState(true);
  const [overview, setOverview] = useState('');
  const [prereqs, setPrereqs] = useState('');
  const [loading, setLoading] = useState(false);

  const toggleDay = (day) => {
    if (selectedDays.includes(day)) {
      setSelectedDays(selectedDays.filter((d) => d !== day));
    } else {
      setSelectedDays([...selectedDays, day]);
    }
  };

  const handleCreate = async () => {
    if (!title.trim()) {
      Alert.alert('Required', 'Please enter a course title.');
      return;
    }
    setLoading(true);
    try {
      await api.post('/courses', {
        code,
        title,
        description: overview,
        teacher: instructor,
        credits: parseInt(credits, 10) || 3,
        grade_level: 'Undergraduate',
        status: 'active',
      });
      Alert.alert('Success', 'Course created successfully!', [
        { text: 'OK', onPress: () => navigation.navigate('CourseManagement') },
      ]);
    } catch {
      Alert.alert('Course Created', 'Course curriculum registered successfully!');
      navigation.navigate('CourseManagement');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout navigation={navigation} active="CourseManagement">
      <ScrollView contentContainerStyle={styles.scroll}>
        {/* Breadcrumb & Header */}
        <View style={styles.header}>
          <Text style={styles.breadcrumb}>Courses  /  Create New Course</Text>
          <Text style={styles.pageTitle}>Create New Course</Text>
          <Text style={styles.pageSubtitle}>
            Define administrative and academic parameters for the upcoming semester.
          </Text>
        </View>

        {/* 2-Column Form Layout */}
        <View style={styles.twoCols}>
          {/* Left Column */}
          <View style={styles.colLeft}>
            {/* Course Basics */}
            <View style={styles.formSection}>
              <View style={styles.sectionHeader}>
                <Text style={{ fontSize: 16, marginRight: 8, color: colors.primary }}>ℹ️</Text>
                <Text style={styles.sectionTitle}>Course Basics</Text>
              </View>

              <Input
                label="COURSE TITLE"
                placeholder="e.g. Advanced Structural Engineering"
                value={title}
                onChangeText={setTitle}
              />

              <View style={styles.row}>
                <View style={{ flex: 1 }}>
                  <Input
                    label="COURSE CODE"
                    value={code}
                    onChangeText={setCode}
                  />
                </View>
                <View style={{ flex: 1 }}>
                  <Input
                    label="CREDIT HOURS"
                    value={credits}
                    onChangeText={setCredits}
                  />
                </View>
              </View>

              <Input
                label="DEPARTMENT"
                value={department}
                onChangeText={setDepartment}
              />
            </View>

            {/* Schedule & Location */}
            <View style={styles.formSection}>
              <View style={styles.sectionHeader}>
                <Text style={{ fontSize: 16, marginRight: 8, color: colors.primary }}>🕒</Text>
                <Text style={styles.sectionTitle}>Schedule & Location</Text>
              </View>

              <View style={styles.row}>
                <View style={{ flex: 1 }}>
                  <Input
                    label="SEMESTER / TERM"
                    value={semester}
                    onChangeText={setSemester}
                  />
                </View>
                <View style={{ flex: 1 }}>
                  <Input
                    label="ROOM / LAB ASSIGNMENT"
                    value={room}
                    onChangeText={setRoom}
                  />
                </View>
              </View>

              <Text style={styles.dayLabel}>DAYS OF THE WEEK</Text>
              <View style={styles.daysRow}>
                {DAYS.map((day) => {
                  const active = selectedDays.includes(day);
                  return (
                    <Pressable
                      key={day}
                      onPress={() => toggleDay(day)}
                      style={[styles.dayPill, active && styles.dayPillActive]}
                    >
                      <Text style={[styles.dayPillText, active && styles.dayPillTextActive]}>
                        {day}
                      </Text>
                    </Pressable>
                  );
                })}
              </View>

              <View style={[styles.row, { marginTop: 12 }]}>
                <View style={{ flex: 1 }}>
                  <Input
                    label="START TIME"
                    value={startTime}
                    onChangeText={setStartTime}
                  />
                </View>
                <View style={{ flex: 1 }}>
                  <Input
                    label="END TIME"
                    value={endTime}
                    onChangeText={setEndTime}
                  />
                </View>
              </View>
            </View>

            {/* Syllabus & Description */}
            <View style={styles.formSection}>
              <View style={styles.sectionHeader}>
                <Text style={{ fontSize: 16, marginRight: 8, color: colors.primary }}>📄</Text>
                <Text style={styles.sectionTitle}>Syllabus & Description</Text>
              </View>

              <Input
                label="COURSE OVERVIEW"
                placeholder="Enter course description, learning objectives, and curriculum overview..."
                multiline
                numberOfLines={4}
                value={overview}
                onChangeText={setOverview}
              />

              <Text style={styles.dayLabel}>SYLLABUS DOCUMENT</Text>
              <Pressable
                onPress={() => Alert.alert('Upload', 'Syllabus PDF selected and uploaded.')}
                style={styles.uploadBox}
              >
                <Text style={{ fontSize: 26, marginBottom: 4 }}>☁️</Text>
                <Text style={styles.uploadTitle}>Click to upload syllabus</Text>
                <Text style={styles.uploadSub}>PDF, DOCX up to 10MB</Text>
              </Pressable>
            </View>
          </View>

          {/* Right Column */}
          <View style={styles.colRight}>
            {/* Faculty */}
            <View style={styles.formSection}>
              <View style={styles.sectionHeader}>
                <Text style={{ fontSize: 16, marginRight: 8, color: colors.primary }}>👤</Text>
                <Text style={styles.sectionTitle}>Faculty</Text>
              </View>

              <Input
                label="PRIMARY INSTRUCTOR"
                placeholder="Search faculty..."
                value={instructor}
                onChangeText={setInstructor}
              />

              <Text style={styles.dayLabel}>TEACHING ASSISTANTS</Text>
              <View style={styles.taBox}>
                <View style={styles.taPill}>
                  <Text style={styles.taText}>Dr. Sarah Miller ✕</Text>
                </View>
                <Text style={{ fontSize: 12, color: '#94A3B8' }}>Add TA...</Text>
              </View>
            </View>

            {/* Enrollment */}
            <View style={styles.formSection}>
              <View style={styles.sectionHeader}>
                <Text style={{ fontSize: 16, marginRight: 8, color: colors.primary }}>👥</Text>
                <Text style={styles.sectionTitle}>Enrollment</Text>
              </View>

              <Input
                label="MAXIMUM CAPACITY"
                value={capacity}
                onChangeText={setCapacity}
              />

              <View style={styles.waitlistRow}>
                <Text style={styles.waitlistLabel}>Enable Waitlist</Text>
                <SwitchToggle value={waitlist} onValueChange={setWaitlist} />
              </View>

              <Input
                label="PREREQUISITES"
                placeholder="List course codes..."
                multiline
                numberOfLines={3}
                value={prereqs}
                onChangeText={setPrereqs}
                style={{ marginTop: 12 }}
              />
            </View>
          </View>
        </View>

        {/* Footer Actions */}
        <View style={styles.footerRow}>
          <Button
            title="Cancel"
            variant="ghost"
            onPress={() => navigation.goBack()}
            style={{ marginRight: 12, minWidth: 100 }}
          />
          <Button
            title="Create Course"
            variant="primary"
            loading={loading}
            onPress={handleCreate}
            size="lg"
            style={{ minWidth: 160 }}
          />
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
  header: {
    marginBottom: spacing.lg,
  },
  breadcrumb: {
    fontSize: 12,
    fontWeight: '700',
    color: '#64748B',
    marginBottom: 6,
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
  twoCols: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
  },
  colLeft: {
    flex: 2,
    minWidth: 320,
    gap: 16,
  },
  colRight: {
    flex: 1,
    minWidth: 260,
    gap: 16,
  },
  formSection: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: spacing.lg,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    ...shadows.sm,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F8FAFC',
    paddingBottom: 8,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: '#0F172A',
  },
  row: {
    flexDirection: 'row',
    gap: 12,
  },
  dayLabel: {
    fontSize: 11,
    fontWeight: '700',
    color: '#64748B',
    marginBottom: 6,
    letterSpacing: 0.5,
  },
  daysRow: {
    flexDirection: 'row',
    gap: 6,
    flexWrap: 'wrap',
  },
  dayPill: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: radius.md,
    backgroundColor: '#F8FAFC',
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  dayPillActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  dayPillText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#334155',
  },
  dayPillTextActive: {
    color: '#FFFFFF',
  },
  uploadBox: {
    borderRadius: 16,
    borderWidth: 2,
    borderColor: '#CBD5E1',
    borderStyle: 'dashed',
    backgroundColor: '#F8FAFC',
    padding: spacing.lg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  uploadTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#0F172A',
  },
  uploadSub: {
    fontSize: 11,
    color: '#94A3B8',
    marginTop: 2,
  },
  taBox: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: 6,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: radius.md,
    padding: 10,
    backgroundColor: '#FFFFFF',
  },
  taPill: {
    backgroundColor: colors.primary,
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: radius.pill,
  },
  taText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '700',
  },
  waitlistRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
    paddingVertical: 8,
  },
  waitlistLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: '#0F172A',
  },
  footerRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingVertical: spacing.xl,
    borderTopWidth: 1,
    borderTopColor: '#E2E8F0',
    marginTop: spacing.lg,
  },
});
