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
import { Badge, Button, ProgressBar } from '../components/UI';
import { api } from '../api';
import { colors, spacing, radius, shadows } from '../theme';

const MOCK_COURSES = [
  {
    id: 1,
    code: 'MATH-401',
    title: 'Advanced Mathematics',
    instructor: 'Dr. Elena Rosetti',
    status: 'In Progress',
    tone: 'active',
    enrolled: 32,
    capacity: 35,
    schedule: 'Mon/Wed 10:00 AM — Room 402',
  },
  {
    id: 2,
    code: 'PHYS-502',
    title: 'Quantum Physics II',
    instructor: 'Prof. Julian Vane',
    status: 'Upcoming',
    tone: 'info',
    enrolled: 18,
    capacity: 40,
    schedule: 'Tue/Thu 02:30 PM — Lab B',
  },
  {
    id: 3,
    code: 'LIT-301',
    title: 'Modern Literature',
    instructor: 'Dr. Sarah Jenkins',
    status: 'Full',
    tone: 'danger',
    enrolled: 25,
    capacity: 25,
    schedule: 'Fri 09:00 AM — Auditorium 1',
  },
  {
    id: 4,
    code: 'PSYC-101',
    title: 'Intro to Psychology',
    instructor: 'Prof. Mark Steiner',
    status: 'In Progress',
    tone: 'active',
    enrolled: 48,
    capacity: 50,
    schedule: 'Mon/Wed 01:00 PM — Room 102',
  },
  {
    id: 5,
    code: 'ECON-101',
    title: 'Economics 101',
    instructor: 'Dr. Amanda Chace',
    status: 'Upcoming',
    tone: 'info',
    enrolled: 12,
    capacity: 30,
    schedule: 'Tue/Thu 11:30 AM — Room 305',
  },
];

export default function CourseManagement({ navigation }) {
  const [courses, setCourses] = useState(MOCK_COURSES);
  const [tab, setTab] = useState('CURRENT'); // CURRENT, ARCHIVE
  const [search, setSearch] = useState('');

  useEffect(() => {
    api.get('/courses')
      .then((rows) => {
        if (Array.isArray(rows) && rows.length > 0) {
          const mapped = rows.map((r, i) => ({
            id: r.id || i + 10,
            code: r.code || `CRS-${i + 100}`,
            title: r.title,
            instructor: r.teacher || 'Faculty Staff',
            status: 'In Progress',
            tone: 'active',
            enrolled: 28,
            capacity: 35,
            schedule: 'Mon/Wed 10:00 AM — Room 101',
          }));
          setCourses([...mapped, ...MOCK_COURSES]);
        }
      })
      .catch(() => {});
  }, []);

  const filtered = courses.filter((c) =>
    c.title.toLowerCase().includes(search.toLowerCase()) ||
    c.instructor.toLowerCase().includes(search.toLowerCase()) ||
    c.code.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Layout navigation={navigation} active="CourseManagement">
      <ScrollView contentContainerStyle={styles.scroll}>
        {/* Top Header */}
        <View style={styles.headerRow}>
          <View>
            <Text style={styles.pageTitle}>Course Directory</Text>
            <Text style={styles.pageSubtitle}>
              Manage academic programs, faculty assignments, and enrollment quotas.
            </Text>
          </View>

          <Button
            title="+ Create New Course"
            size="md"
            onPress={() => navigation.navigate('CreateCourse')}
          />
        </View>

        {/* Tab & Controls Row */}
        <View style={styles.controlsRow}>
          <View style={styles.tabsRow}>
            <Pressable
              onPress={() => setTab('CURRENT')}
              style={[styles.tabBtn, tab === 'CURRENT' && styles.tabBtnActive]}
            >
              <Text style={[styles.tabText, tab === 'CURRENT' && styles.tabTextActive]}>
                Current Semester
              </Text>
            </Pressable>
            <Pressable
              onPress={() => setTab('ARCHIVE')}
              style={[styles.tabBtn, tab === 'ARCHIVE' && styles.tabBtnActive]}
            >
              <Text style={[styles.tabText, tab === 'ARCHIVE' && styles.tabTextActive]}>
                Archive
              </Text>
            </Pressable>
          </View>

          <View style={styles.searchWrap}>
            <Text style={{ fontSize: 14, color: '#94A3B8', marginRight: 6 }}>🔍</Text>
            <TextInput
              value={search}
              onChangeText={setSearch}
              placeholder="Search courses..."
              placeholderTextColor="#94A3B8"
              style={styles.searchInput}
            />
          </View>
        </View>

        {/* Course Cards Grid */}
        <View style={styles.grid}>
          {filtered.map((course) => {
            const pct = Math.round((course.enrolled / course.capacity) * 100);
            return (
              <View key={course.id} style={styles.courseCard}>
                {/* Status & Menu */}
                <View style={styles.cardTopRow}>
                  <Badge
                    text={`● ${course.status}`}
                    tone={course.tone}
                    size="sm"
                  />
                  <Text style={{ fontSize: 16, color: '#94A3B8' }}>⋮</Text>
                </View>

                {/* Title & Instructor */}
                <Text style={styles.courseTitle}>{course.title}</Text>
                <View style={styles.instructorRow}>
                  <Text style={{ fontSize: 13, marginRight: 4, color: '#64748B' }}>👤</Text>
                  <Text style={styles.instructorText}>{course.instructor}</Text>
                </View>

                {/* Enrollment Bar */}
                <View style={styles.enrollmentBox}>
                  <View style={styles.enrollmentLabels}>
                    <Text style={styles.enrolledLabel}>ENROLLED</Text>
                    <Text style={styles.enrolledFraction}>
                      {course.enrolled}/{course.capacity}
                    </Text>
                  </View>
                  <ProgressBar
                    progress={pct}
                    color={course.status === 'Full' ? colors.danger : colors.primary}
                    height={6}
                  />
                </View>

                {/* Schedule & Location */}
                <View style={styles.scheduleRow}>
                  <Text style={{ fontSize: 13, marginRight: 6 }}>📅</Text>
                  <Text style={styles.scheduleText}>{course.schedule}</Text>
                </View>

                {/* Manage Course Button */}
                <Button
                  title="Manage Course"
                  variant="outline"
                  size="sm"
                  onPress={() => Alert.alert('Course Details', `Managing curriculum for ${course.title}`)}
                  style={{ marginTop: 12 }}
                />
              </View>
            );
          })}

          {/* Add Course Dashed Card */}
          <Pressable
            onPress={() => navigation.navigate('CreateCourse')}
            style={styles.addCourseDashed}
          >
            <View style={styles.addCourseIconBox}>
              <Text style={{ fontSize: 24, color: colors.primary }}>➕</Text>
            </View>
            <Text style={styles.addCourseTitle}>Add Course</Text>
            <Text style={styles.addCourseSub}>Click to define a new curriculum</Text>
          </Pressable>
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
  controlsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: 12,
    marginBottom: spacing.lg,
  },
  tabsRow: {
    flexDirection: 'row',
    borderBottomWidth: 2,
    borderBottomColor: '#E2E8F0',
  },
  tabBtn: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
    marginBottom: -2,
  },
  tabBtnActive: {
    borderBottomColor: colors.primary,
  },
  tabText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#64748B',
  },
  tabTextActive: {
    color: colors.primary,
    fontWeight: '800',
  },
  searchWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    paddingHorizontal: 12,
    height: 38,
    width: 240,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  searchInput: {
    flex: 1,
    fontSize: 13,
    color: '#0F172A',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
  },
  courseCard: {
    flex: 1,
    minWidth: 280,
    maxWidth: 380,
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: spacing.lg,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    ...shadows.sm,
  },
  cardTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  courseTitle: {
    fontSize: 17,
    fontWeight: '800',
    color: '#0F172A',
    marginBottom: 4,
  },
  instructorRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  instructorText: {
    fontSize: 12,
    color: '#64748B',
  },
  enrollmentBox: {
    marginVertical: 10,
  },
  enrollmentLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  enrolledLabel: {
    fontSize: 10,
    fontWeight: '800',
    color: '#94A3B8',
    letterSpacing: 0.5,
  },
  enrolledFraction: {
    fontSize: 12,
    fontWeight: '800',
    color: '#0F172A',
  },
  scheduleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  scheduleText: {
    fontSize: 12,
    color: '#64748B',
  },
  addCourseDashed: {
    flex: 1,
    minWidth: 280,
    maxWidth: 380,
    minHeight: 220,
    borderRadius: 18,
    borderWidth: 2,
    borderColor: '#CBD5E1',
    borderStyle: 'dashed',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F8FAFC',
    padding: spacing.lg,
  },
  addCourseIconBox: {
    width: 48,
    height: 48,
    borderRadius: 14,
    backgroundColor: '#EFF6FF',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  addCourseTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: '#0F172A',
  },
  addCourseSub: {
    fontSize: 12,
    color: '#64748B',
    marginTop: 2,
  },
});
