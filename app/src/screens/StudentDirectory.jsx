import React, { useEffect, useState } from 'react';
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
import { Avatar, Badge, Button } from '../components/UI';
import { api } from '../api';
import { colors, spacing, radius, shadows } from '../theme';

const MOCK_STUDENTS = [
  {
    id: 1,
    name: 'Alexander Thompson',
    email: 'alex.t@edustruc.edu',
    studentId: 'STU-2024-001',
    grade: '12th Grade',
    major: 'Computer Science',
    status: 'active',
    avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=150&q=80',
  },
  {
    id: 2,
    name: 'Beatrix Vance',
    email: 'b.vance@edustruc.edu',
    studentId: 'STU-2024-042',
    grade: '11th Grade',
    major: 'Mathematics',
    status: 'inactive',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=150&q=80',
  },
  {
    id: 3,
    name: 'Cassian Thorne',
    email: 'cassian.t@edustruc.edu',
    studentId: 'STU-2024-089',
    grade: '12th Grade',
    major: 'Literature',
    status: 'active',
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=150&q=80',
  },
  {
    id: 4,
    name: 'Daphne Moore',
    email: 'd.moore@edustruc.edu',
    studentId: 'STU-2024-112',
    grade: '10th Grade',
    major: 'Physics',
    status: 'active',
    avatar: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=150&q=80',
  },
  {
    id: 5,
    name: 'Elias Sterling',
    email: 'e.sterling@edustruc.edu',
    studentId: 'STU-2024-156',
    grade: '11th Grade',
    major: 'Economics',
    status: 'active',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80',
  },
];

export default function StudentDirectory({ navigation }) {
  const [students, setStudents] = useState(MOCK_STUDENTS);
  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [activeModalStudent, setActiveModalStudent] = useState(null);

  useEffect(() => {
    api.get('/students')
      .then((rows) => {
        if (Array.isArray(rows) && rows.length > 0) {
          const mapped = rows.map((r, i) => ({
            id: r.id || i + 1,
            name: `${r.first_name} ${r.last_name}`,
            email: r.email || `${r.first_name?.toLowerCase()}@edustruc.edu`,
            studentId: r.admission_no || `STU-2024-${String(i + 1).padStart(3, '0')}`,
            grade: r.grade ? `${r.grade}th Grade` : '10th Grade',
            major: r.section ? `Section ${r.section}` : 'General Studies',
            status: r.status || 'active',
            avatar: null,
          }));
          setStudents([...mapped, ...MOCK_STUDENTS]);
        }
      })
      .catch(() => {});
  }, []);

  const filtered = students.filter((s) => {
    const matchQuery =
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.email.toLowerCase().includes(search.toLowerCase()) ||
      s.studentId.toLowerCase().includes(search.toLowerCase());
    const matchStatus = filterStatus === 'all' || s.status === filterStatus;
    return matchQuery && matchStatus;
  });

  return (
    <Layout navigation={navigation} active="StudentDirectory">
      <ScrollView contentContainerStyle={styles.scroll}>
        {/* Header */}
        <View style={styles.headerRow}>
          <View>
            <Text style={styles.pageTitle}>Student Directory</Text>
            <Text style={styles.pageSubtitle}>
              Manage and track student enrollment and academic records.
            </Text>
          </View>

          <View style={styles.headerRight}>
            <View style={styles.searchBar}>
              <Text style={{ fontSize: 14, color: '#94A3B8', marginRight: 6 }}>🔍</Text>
              <TextInput
                value={search}
                onChangeText={setSearch}
                placeholder="Search by name, ID or email..."
                placeholderTextColor="#94A3B8"
                style={styles.searchInput}
              />
            </View>

            <Button
              title="+ Add New Student"
              size="md"
              onPress={() => navigation.navigate('CreateStudent')}
            />
          </View>
        </View>

        {/* Filter Pills */}
        <View style={styles.filterPillsRow}>
          <Pressable
            onPress={() => setFilterStatus('all')}
            style={[styles.filterPill, filterStatus === 'all' && styles.filterPillActive]}
          >
            <Text
              style={[
                styles.filterPillText,
                filterStatus === 'all' && styles.filterPillTextActive,
              ]}
            >
              All Students: 2,480
            </Text>
          </Pressable>

          <View style={styles.filterChip}>
            <Text style={styles.filterChipText}>Grade: 10th - 12th</Text>
            <Text style={{ fontSize: 12, color: '#64748B', marginLeft: 4 }}>✕</Text>
          </View>

          <Pressable
            onPress={() => setFilterStatus(filterStatus === 'active' ? 'all' : 'active')}
            style={[styles.filterChip, filterStatus === 'active' && styles.filterPillActive]}
          >
            <Text
              style={[
                styles.filterChipText,
                filterStatus === 'active' && styles.filterPillTextActive,
              ]}
            >
              Status: Active
            </Text>
            <Text style={{ fontSize: 12, color: '#64748B', marginLeft: 4 }}>✕</Text>
          </Pressable>

          <Pressable
            onPress={() => {
              setFilterStatus('all');
              setSearch('');
            }}
          >
            <Text style={styles.clearAllText}>Clear All</Text>
          </Pressable>
        </View>

        {/* Students Table / Cards */}
        <View style={styles.tableCard}>
          {/* Table Header */}
          <View style={styles.tableHeaderRow}>
            <Text style={[styles.th, { flex: 2 }]}>STUDENT NAME</Text>
            <Text style={[styles.th, { flex: 1 }]}>STUDENT ID</Text>
            <Text style={[styles.th, { flex: 1 }]}>GRADE LEVEL</Text>
            <Text style={[styles.th, { flex: 1.5 }]}>MAJOR</Text>
            <Text style={[styles.th, { flex: 1 }]}>STATUS</Text>
            <Text style={[styles.th, { width: 70, textAlign: 'right' }]}>ACTIONS</Text>
          </View>

          {/* Student Rows */}
          {filtered.map((s) => (
            <View key={s.id} style={styles.tableRow}>
              {/* Name & Avatar */}
              <View style={[styles.td, { flex: 2, flexDirection: 'row', alignItems: 'center' }]}>
                <Avatar
                  name={s.name}
                  source={s.avatar}
                  size={36}
                  style={{ marginRight: 10 }}
                />
                <View>
                  <Text style={styles.studentName}>{s.name}</Text>
                  <Text style={styles.studentEmail}>{s.email}</Text>
                </View>
              </View>

              {/* Student ID */}
              <View style={[styles.td, { flex: 1 }]}>
                <Text style={styles.tdText}>{s.studentId}</Text>
              </View>

              {/* Grade */}
              <View style={[styles.td, { flex: 1 }]}>
                <Text style={styles.tdText}>{s.grade}</Text>
              </View>

              {/* Major */}
              <View style={[styles.td, { flex: 1.5 }]}>
                <Text style={styles.tdText}>{s.major}</Text>
              </View>

              {/* Status */}
              <View style={[styles.td, { flex: 1 }]}>
                <Badge
                  text={s.status === 'active' ? 'Active' : 'Inactive'}
                  tone={s.status === 'active' ? 'active' : 'inactive'}
                  size="sm"
                />
              </View>

              {/* Actions */}
              <View style={[styles.td, { width: 70, flexDirection: 'row', justifyContent: 'flex-end', gap: 10 }]}>
                <Pressable hitSlop={6} onPress={() => setActiveModalStudent(s)}>
                  <Text style={{ fontSize: 16 }}>👁️</Text>
                </Pressable>
                <Pressable
                  hitSlop={6}
                  onPress={() => Alert.alert('Edit Student', `Editing profile for ${s.name}`)}
                >
                  <Text style={{ fontSize: 16 }}>✏️</Text>
                </Pressable>
              </View>
            </View>
          ))}

          {/* Pagination Footer */}
          <View style={styles.paginationRow}>
            <Text style={styles.paginationInfo}>
              Showing 1 - {filtered.length} of 2,480 students
            </Text>
            <View style={styles.pageNumbers}>
              <Pressable style={styles.pageBtn}>
                <Text style={{ fontSize: 12 }}>‹</Text>
              </Pressable>
              <View style={[styles.pageBtn, styles.pageBtnActive]}>
                <Text style={styles.pageTextActive}>1</Text>
              </View>
              <View style={styles.pageBtn}>
                <Text style={styles.pageText}>2</Text>
              </View>
              <View style={styles.pageBtn}>
                <Text style={styles.pageText}>3</Text>
              </View>
              <Text style={{ marginHorizontal: 4, color: '#94A3B8' }}>...</Text>
              <View style={styles.pageBtn}>
                <Text style={styles.pageText}>496</Text>
              </View>
              <Pressable style={styles.pageBtn}>
                <Text style={{ fontSize: 12 }}>›</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Student Details View Modal */}
      <Modal
        visible={!!activeModalStudent}
        transparent
        animationType="fade"
        onRequestClose={() => setActiveModalStudent(null)}
      >
        <View style={styles.modalBg}>
          <View style={styles.modalCard}>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 12 }}>
              <Avatar
                name={activeModalStudent?.name || ''}
                source={activeModalStudent?.avatar}
                size={54}
                style={{ marginRight: 14 }}
              />
              <View>
                <Text style={{ fontSize: 18, fontWeight: '800', color: '#0F172A' }}>
                  {activeModalStudent?.name}
                </Text>
                <Text style={{ fontSize: 12, color: '#64748B' }}>
                  {activeModalStudent?.studentId} • {activeModalStudent?.email}
                </Text>
              </View>
            </View>

            <View style={{ gap: 8, marginVertical: 12 }}>
              <Text style={{ fontSize: 13, color: '#334155' }}>
                <Text style={{ fontWeight: '700' }}>Grade Level:</Text> {activeModalStudent?.grade}
              </Text>
              <Text style={{ fontSize: 13, color: '#334155' }}>
                <Text style={{ fontWeight: '700' }}>Major / Section:</Text> {activeModalStudent?.major}
              </Text>
              <Text style={{ fontSize: 13, color: '#334155' }}>
                <Text style={{ fontWeight: '700' }}>Status:</Text> {activeModalStudent?.status}
              </Text>
            </View>

            <Button
              title="Close"
              variant="secondary"
              onPress={() => setActiveModalStudent(null)}
              style={{ marginTop: 8 }}
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
    marginBottom: spacing.md,
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
    height: 42,
    width: 260,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  searchInput: {
    flex: 1,
    fontSize: 13,
    color: '#0F172A',
  },
  filterPillsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: spacing.md,
  },
  filterPill: {
    backgroundColor: '#F1F5F9',
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: radius.pill,
  },
  filterPillActive: {
    backgroundColor: colors.primarySubtle,
    borderWidth: 1,
    borderColor: colors.primary,
  },
  filterPillText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#64748B',
  },
  filterPillTextActive: {
    color: colors.primary,
  },
  filterChip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8FAFC',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: radius.pill,
  },
  filterChipText: {
    fontSize: 12,
    color: '#334155',
    fontWeight: '600',
  },
  clearAllText: {
    fontSize: 12,
    fontWeight: '700',
    color: colors.primary,
    marginLeft: 6,
  },
  tableCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    overflow: 'hidden',
    ...shadows.sm,
  },
  tableHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 18,
    backgroundColor: '#F8FAFC',
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
  },
  th: {
    fontSize: 11,
    fontWeight: '800',
    color: '#94A3B8',
    letterSpacing: 0.8,
  },
  tableRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 18,
    borderBottomWidth: 1,
    borderBottomColor: '#F8FAFC',
  },
  td: {
    justifyContent: 'center',
  },
  studentName: {
    fontSize: 14,
    fontWeight: '700',
    color: '#0F172A',
  },
  studentEmail: {
    fontSize: 12,
    color: '#64748B',
    marginTop: 1,
  },
  tdText: {
    fontSize: 13,
    color: '#334155',
  },
  paginationRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 18,
    borderTopWidth: 1,
    borderTopColor: '#E2E8F0',
  },
  paginationInfo: {
    fontSize: 12,
    color: '#64748B',
  },
  pageNumbers: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  pageBtn: {
    width: 30,
    height: 30,
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F8FAFC',
  },
  pageBtnActive: {
    backgroundColor: colors.primary,
  },
  pageText: {
    fontSize: 12,
    color: '#64748B',
    fontWeight: '600',
  },
  pageTextActive: {
    fontSize: 12,
    color: '#FFFFFF',
    fontWeight: '800',
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
});
