import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
  Image,
  Modal,
  Alert,
  Linking,
} from 'react-native';
import Layout from '../components/Layout';
import { Button, SwitchToggle, Input } from '../components/UI';
import { colors, spacing, radius, shadows } from '../theme';
import { useAuth } from '../auth';

export default function ProfileScreen({ navigation }) {
  const { user } = useAuth();
  const [student, setStudent] = useState({
    name: 'Marcus T. Richardson',
    grade: 'Grade 10',
    studentId: '#ST-2024-8891',
    program: 'Honors Program',
    activity: 'Varsity Soccer',
    avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=400&q=80',
    gpa: '3.82',
    attendance: '98%',
    assignments: '24/25',
    ranking: 'Top 10%',
  });

  const [editModal, setEditModal] = useState(false);
  const [editForm, setEditForm] = useState({ ...student });

  // Preferences toggles
  const [pushNotifs, setPushNotifs] = useState(false);
  const [weeklyDigest, setWeeklyDigest] = useState(true);
  const [darkMode, setDarkMode] = useState(false);

  const saveProfile = () => {
    setStudent({ ...editForm });
    setEditModal(false);
    Alert.alert('Updated', 'Student profile details updated successfully.');
  };

  const callContact = (number, name) => {
    Alert.alert(
      `Call ${name}`,
      `Dial ${number}?`,
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Call', onPress: () => Linking.openURL(`tel:${number}`).catch(() => {}) },
      ]
    );
  };

  return (
    <Layout navigation={navigation} active="ProfileScreen" title="EduParent">
      <ScrollView
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
      >
        {/* Student Profile Header Card */}
        <View style={styles.profileCard}>
          {/* Avatar with Grade 10 Badge */}
          <View style={styles.avatarWrap}>
            <Image
              source={{ uri: student.avatar }}
              style={styles.avatarImg}
            />
            <View style={styles.gradeBadge}>
              <Text style={styles.gradeBadgeText}>{student.grade}</Text>
            </View>
          </View>

          {/* Student Name & ID */}
          <Text style={styles.studentName}>{student.name}</Text>
          <View style={styles.idRow}>
            <Text style={{ fontSize: 13, marginRight: 4, color: '#64748B' }}>🪪</Text>
            <Text style={styles.studentId}>Student ID: {student.studentId}</Text>
          </View>

          {/* Program & Extracurricular Badges */}
          <View style={styles.tagsRow}>
            <View style={styles.honorsTag}>
              <Text style={{ fontSize: 11, marginRight: 4 }}>🌱</Text>
              <Text style={styles.honorsTagText}>{student.program}</Text>
            </View>
            <View style={styles.soccerTag}>
              <Text style={{ fontSize: 11, marginRight: 4 }}>⚽</Text>
              <Text style={styles.soccerTagText}>{student.activity}</Text>
            </View>
          </View>

          {/* Edit Profile Button */}
          <Button
            title="Edit Profile"
            variant="primary"
            onPress={() => setEditModal(true)}
            style={{ width: '100%', marginTop: spacing.md }}
          />
        </View>

        {/* Medical Alerts Card (Red Cross) */}
        <View style={styles.medicalCard}>
          <View style={styles.medicalHeader}>
            <View style={styles.medicalIconBox}>
              <Text style={{ fontSize: 14 }}>➕</Text>
            </View>
            <Text style={styles.medicalTitle}>Medical Alerts</Text>
          </View>

          <View style={styles.alertItemBox}>
            <Text style={styles.alertName}>Severe Nut Allergy</Text>
            <Text style={styles.alertDetail}>
              Carries EpiPen in backpack side pocket.
            </Text>
          </View>

          <View style={styles.alertItemBox}>
            <Text style={styles.alertName}>Asthma</Text>
            <Text style={styles.alertDetail}>
              Inhaler kept in nurse's station.
            </Text>
          </View>
        </View>

        {/* Emergency Contacts Card */}
        <View style={styles.contactsCard}>
          <View style={styles.contactsHeader}>
            <Text style={{ fontSize: 18, marginRight: 8 }}>👥</Text>
            <Text style={styles.contactsTitle}>Emergency Contacts</Text>
          </View>

          {/* Contact 1 */}
          <View style={styles.contactItem}>
            <View style={styles.contactUserIcon}>
              <Text style={{ fontSize: 16 }}>👤</Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.contactName}>Sarah Richardson</Text>
              <Text style={styles.contactRelation}>Mother (Primary)</Text>
            </View>
            <Pressable
              onPress={() => callContact('+15550001111', 'Sarah Richardson')}
              style={styles.callBtn}
              hitSlop={8}
            >
              <Text style={{ fontSize: 16 }}>📞</Text>
            </Pressable>
          </View>

          {/* Contact 2 */}
          <View style={styles.contactItem}>
            <View style={styles.contactUserIcon}>
              <Text style={{ fontSize: 16 }}>👤</Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.contactName}>Robert Richardson</Text>
              <Text style={styles.contactRelation}>Father</Text>
            </View>
            <Pressable
              onPress={() => callContact('+15550002222', 'Robert Richardson')}
              style={styles.callBtn}
              hitSlop={8}
            >
              <Text style={{ fontSize: 16 }}>📞</Text>
            </Pressable>
          </View>
        </View>

        {/* App Preferences Card */}
        <View style={styles.preferencesCard}>
          <View style={styles.prefHeader}>
            <Text style={{ fontSize: 18, marginRight: 8, color: colors.primary }}>⚙️</Text>
            <Text style={styles.prefTitle}>App Preferences</Text>
          </View>

          {/* Push Notifications */}
          <View style={styles.prefItem}>
            <View style={{ marginRight: 12 }}>
              <Text style={{ fontSize: 18 }}>🔔</Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.prefItemName}>Push Notifications</Text>
              <Text style={styles.prefItemSub}>Attendance & Grade alerts</Text>
            </View>
            <SwitchToggle value={pushNotifs} onValueChange={setPushNotifs} />
          </View>

          {/* Email Weekly Digest */}
          <View style={styles.prefItem}>
            <View style={{ marginRight: 12 }}>
              <Text style={{ fontSize: 18 }}>✉️</Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.prefItemName}>Email Weekly Digest</Text>
              <Text style={styles.prefItemSub}>Summary of child's progress</Text>
            </View>
            <SwitchToggle value={weeklyDigest} onValueChange={setWeeklyDigest} />
          </View>

          {/* Dark Mode */}
          <View style={styles.prefItem}>
            <View style={{ marginRight: 12 }}>
              <Text style={{ fontSize: 18 }}>🌙</Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.prefItemName}>Dark Mode</Text>
              <Text style={styles.prefItemSub}>Reduce eye strain at night</Text>
            </View>
            <SwitchToggle value={darkMode} onValueChange={setDarkMode} />
          </View>

          {/* Log Out */}
          <Pressable
            onPress={() => navigation.navigate('LogoutConfirmation')}
            style={styles.logoutItem}
          >
            <View style={{ marginRight: 12 }}>
              <Text style={{ fontSize: 18, color: '#DC2626' }}>🚪</Text>
            </View>
            <Text style={styles.logoutText}>Log Out</Text>
            <Text style={{ fontSize: 16, color: '#DC2626' }}>›</Text>
          </Pressable>
        </View>

        {/* Academic Status Card (Royal Blue) */}
        <View style={styles.academicStatusCard}>
          <Text style={styles.statusSectionHeading}>Academic Status</Text>

          <View style={styles.statsGrid}>
            {/* GPA */}
            <View style={styles.statCell}>
              <Text style={styles.statCellLabel}>GPA</Text>
              <Text style={styles.statCellValue}>{student.gpa}</Text>
            </View>

            {/* Attendance */}
            <View style={styles.statCell}>
              <Text style={styles.statCellLabel}>Attendance</Text>
              <Text style={styles.statCellValue}>{student.attendance}</Text>
            </View>

            {/* Assignments */}
            <View style={styles.statCell}>
              <Text style={styles.statCellLabel}>Assignments</Text>
              <Text style={styles.statCellValue}>{student.assignments}</Text>
            </View>

            {/* Ranking */}
            <View style={styles.statCell}>
              <Text style={styles.statCellLabel}>Ranking</Text>
              <Text style={styles.statCellValue}>{student.ranking}</Text>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Edit Profile Modal */}
      <Modal
        visible={editModal}
        transparent
        animationType="slide"
        onRequestClose={() => setEditModal(false)}
      >
        <View style={styles.editModalBg}>
          <View style={styles.editModalCard}>
            <View style={styles.editModalHeader}>
              <Text style={styles.editModalTitle}>Edit Student Profile</Text>
              <Pressable onPress={() => setEditModal(false)}>
                <Text style={{ fontSize: 20, color: colors.muted }}>✕</Text>
              </Pressable>
            </View>

            <Input
              label="Student Name"
              value={editForm.name}
              onChangeText={(v) => setEditForm({ ...editForm, name: v })}
            />
            <Input
              label="Grade"
              value={editForm.grade}
              onChangeText={(v) => setEditForm({ ...editForm, grade: v })}
            />
            <Input
              label="Student ID"
              value={editForm.studentId}
              onChangeText={(v) => setEditForm({ ...editForm, studentId: v })}
            />
            <Input
              label="Special Program"
              value={editForm.program}
              onChangeText={(v) => setEditForm({ ...editForm, program: v })}
            />

            <Button
              title="Save Changes"
              variant="primary"
              onPress={saveProfile}
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
  profileCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 22,
    padding: spacing.lg,
    alignItems: 'center',
    marginBottom: spacing.md,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    ...shadows.sm,
  },
  avatarWrap: {
    position: 'relative',
    marginBottom: 12,
  },
  avatarImg: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 3,
    borderColor: '#EFF6FF',
  },
  gradeBadge: {
    position: 'absolute',
    bottom: -4,
    right: 0,
    backgroundColor: '#047857',
    paddingVertical: 3,
    paddingHorizontal: 8,
    borderRadius: radius.pill,
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  gradeBadgeText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '800',
  },
  studentName: {
    fontSize: 20,
    fontWeight: '800',
    color: '#0F172A',
  },
  idRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  studentId: {
    fontSize: 12,
    color: '#64748B',
    fontWeight: '600',
  },
  tagsRow: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 10,
  },
  honorsTag: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#D1FAE5',
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: radius.pill,
  },
  honorsTagText: {
    color: '#065F46',
    fontSize: 11,
    fontWeight: '700',
  },
  soccerTag: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EFF6FF',
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: radius.pill,
  },
  soccerTagText: {
    color: colors.primary,
    fontSize: 11,
    fontWeight: '700',
  },
  medicalCard: {
    backgroundColor: '#FFF5F5',
    borderRadius: 20,
    padding: spacing.lg,
    marginBottom: spacing.md,
    borderWidth: 1,
    borderColor: '#FED7D7',
  },
  medicalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  medicalIconBox: {
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: '#E53E3E',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
  },
  medicalTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: '#9B2C2C',
  },
  alertItemBox: {
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 12,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#FED7D7',
  },
  alertName: {
    fontSize: 13,
    fontWeight: '800',
    color: '#C53030',
  },
  alertDetail: {
    fontSize: 12,
    color: '#4A5568',
    marginTop: 2,
  },
  contactsCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: spacing.lg,
    marginBottom: spacing.md,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    ...shadows.sm,
  },
  contactsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  contactsTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: '#0F172A',
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  contactUserIcon: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: '#F1F5F9',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  contactName: {
    fontSize: 14,
    fontWeight: '700',
    color: '#0F172A',
  },
  contactRelation: {
    fontSize: 12,
    color: '#64748B',
    marginTop: 1,
  },
  callBtn: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: '#EFF6FF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  preferencesCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: spacing.lg,
    marginBottom: spacing.md,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    ...shadows.sm,
  },
  prefHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  prefTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: '#0F172A',
  },
  prefItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F8FAFC',
  },
  prefItemName: {
    fontSize: 14,
    fontWeight: '700',
    color: '#0F172A',
  },
  prefItemSub: {
    fontSize: 11,
    color: '#64748B',
    marginTop: 2,
  },
  logoutItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    marginTop: 4,
  },
  logoutText: {
    flex: 1,
    fontSize: 14,
    fontWeight: '700',
    color: '#DC2626',
  },
  academicStatusCard: {
    backgroundColor: '#1D4ED8',
    borderRadius: 20,
    padding: spacing.lg,
    marginBottom: spacing.xl,
    ...shadows.md,
  },
  statusSectionHeading: {
    fontSize: 16,
    fontWeight: '800',
    color: '#FFFFFF',
    marginBottom: 12,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  statCell: {
    width: '50%',
    paddingVertical: 8,
  },
  statCellLabel: {
    fontSize: 12,
    color: '#BFDBFE',
    fontWeight: '600',
  },
  statCellValue: {
    fontSize: 26,
    fontWeight: '800',
    color: '#FFFFFF',
    marginTop: 2,
  },
  editModalBg: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    padding: spacing.lg,
  },
  editModalCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: spacing.lg,
  },
  editModalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  editModalTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#0F172A',
  },
});
