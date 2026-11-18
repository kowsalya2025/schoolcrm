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
import { Avatar, Input, Button, SwitchToggle } from '../components/UI';
import { colors, spacing, radius, shadows } from '../theme';

export default function SystemSettings({ navigation }) {
  const [name, setName] = useState('Dr. Julian Sterling');
  const [email, setEmail] = useState('j.sterli@edustruc.edu');
  const [phone, setPhone] = useState('+1 (555) 892-4410');
  const [jobTitle, setJobTitle] = useState('Senior Administrator');
  const [schoolName, setSchoolName] = useState('St. Edwards Academic Center');
  const [timezone, setTimezone] = useState('Eastern Standard Time (GMT-5)');

  // Security & notification toggles
  const [twoFa, setTwoFa] = useState(true);
  const [enrollmentAlerts, setEnrollmentAlerts] = useState(true);
  const [gradeSubmissions, setGradeSubmissions] = useState(false);
  const [systemMaintenance, setSystemMaintenance] = useState(true);
  const [scheduleConflicts, setScheduleConflicts] = useState(true);

  const saveProfile = () => {
    Alert.alert('Saved', 'Profile and institution preferences saved successfully.');
  };

  return (
    <Layout navigation={navigation} active="SystemSettings">
      <ScrollView contentContainerStyle={styles.scroll}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.pageTitle}>System Settings</Text>
          <Text style={styles.pageSubtitle}>
            Manage your administrative profile, institution details, and system preferences.
          </Text>
        </View>

        {/* 2-Column Layout */}
        <View style={styles.twoCols}>
          {/* Left Column */}
          <View style={styles.leftCol}>
            {/* Profile Settings */}
            <View style={styles.card}>
              <View style={styles.cardHeader}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Text style={{ fontSize: 16, marginRight: 8, color: colors.primary }}>👤</Text>
                  <Text style={styles.cardTitle}>Profile Settings</Text>
                </View>
                <Button
                  title="Save Changes"
                  size="sm"
                  onPress={saveProfile}
                />
              </View>

              <View style={styles.avatarRow}>
                <Avatar
                  name={name}
                  source="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80"
                  size={64}
                />
                <Pressable onPress={() => Alert.alert('Avatar', 'Choose a new profile photo')}>
                  <Text style={styles.changeAvatarText}>Change Avatar</Text>
                </Pressable>
              </View>

              <View style={styles.inputsRow}>
                <View style={{ flex: 1 }}>
                  <Input label="FULL NAME" value={name} onChangeText={setName} />
                </View>
                <View style={{ flex: 1 }}>
                  <Input label="EMAIL ADDRESS" value={email} onChangeText={setEmail} />
                </View>
              </View>

              <View style={styles.inputsRow}>
                <View style={{ flex: 1 }}>
                  <Input label="PHONE NUMBER" value={phone} onChangeText={setPhone} />
                </View>
                <View style={{ flex: 1 }}>
                  <Input label="JOB TITLE" value={jobTitle} onChangeText={setJobTitle} />
                </View>
              </View>
            </View>

            {/* Institution Preferences */}
            <View style={styles.card}>
              <View style={styles.cardHeader}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Text style={{ fontSize: 16, marginRight: 8, color: colors.primary }}>🏛️</Text>
                  <Text style={styles.cardTitle}>Institution Preferences</Text>
                </View>
              </View>

              <Input
                label="INSTITUTION NAME"
                value={schoolName}
                onChangeText={setSchoolName}
              />

              <Input
                label="PRIMARY TIMEZONE"
                value={timezone}
                onChangeText={setTimezone}
              />

              <Text style={styles.logoLabel}>INSTITUTION LOGO</Text>
              <Pressable
                onPress={() => Alert.alert('Logo', 'Upload school badge')}
                style={styles.logoUploadBox}
              >
                <Text style={{ fontSize: 24, marginBottom: 4 }}>📤</Text>
                <Text style={styles.logoUploadText}>Click to upload brand logo</Text>
                <Text style={styles.logoUploadSub}>PNG or SVG, Max 2MB</Text>
              </Pressable>
            </View>
          </View>

          {/* Right Column */}
          <View style={styles.rightCol}>
            {/* Security */}
            <View style={styles.card}>
              <View style={styles.cardHeader}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Text style={{ fontSize: 16, marginRight: 8, color: colors.primary }}>🛡️</Text>
                  <Text style={styles.cardTitle}>Security</Text>
                </View>
              </View>

              <Pressable
                onPress={() => Alert.alert('Change Password', 'Enter current & new password')}
                style={styles.securityOption}
              >
                <View style={{ flex: 1 }}>
                  <Text style={styles.secOptionTitle}>Change Password</Text>
                  <Text style={styles.secOptionSub}>Last changed 4 months ago</Text>
                </View>
                <Text style={{ fontSize: 18, color: '#94A3B8' }}>›</Text>
              </Pressable>

              <View style={styles.tfaBox}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Text style={styles.tfaTitle}>2FA Authentication</Text>
                  <SwitchToggle value={twoFa} onValueChange={setTwoFa} />
                </View>
                <Text style={styles.tfaDesc}>
                  Two-factor authentication adds an extra layer of security to your admin account.
                </Text>
              </View>
            </View>

            {/* Notifications */}
            <View style={styles.card}>
              <View style={styles.cardHeader}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Text style={{ fontSize: 16, marginRight: 8, color: colors.primary }}>🔔</Text>
                  <Text style={styles.cardTitle}>Notifications</Text>
                </View>
              </View>

              {/* Enrollment Alerts */}
              <Pressable
                onPress={() => setEnrollmentAlerts(!enrollmentAlerts)}
                style={styles.notifRow}
              >
                <View style={{ flex: 1 }}>
                  <Text style={styles.notifName}>Enrollment Alerts</Text>
                  <Text style={styles.notifSub}>Notify when a new student enrolls</Text>
                </View>
                <View style={[styles.checkSquare, enrollmentAlerts && styles.checkSquareActive]}>
                  {enrollmentAlerts ? <Text style={{ color: '#fff', fontSize: 11 }}>✓</Text> : null}
                </View>
              </Pressable>

              {/* Grade Submissions */}
              <Pressable
                onPress={() => setGradeSubmissions(!gradeSubmissions)}
                style={styles.notifRow}
              >
                <View style={{ flex: 1 }}>
                  <Text style={styles.notifName}>Grade Submissions</Text>
                  <Text style={styles.notifSub}>Weekly digest of student performance</Text>
                </View>
                <View style={[styles.checkSquare, gradeSubmissions && styles.checkSquareActive]}>
                  {gradeSubmissions ? <Text style={{ color: '#fff', fontSize: 11 }}>✓</Text> : null}
                </View>
              </Pressable>

              {/* System Maintenance */}
              <Pressable
                onPress={() => setSystemMaintenance(!systemMaintenance)}
                style={styles.notifRow}
              >
                <View style={{ flex: 1 }}>
                  <Text style={styles.notifName}>System Maintenance</Text>
                  <Text style={styles.notifSub}>Critical platform updates and downtime</Text>
                </View>
                <View style={[styles.checkSquare, systemMaintenance && styles.checkSquareActive]}>
                  {systemMaintenance ? <Text style={{ color: '#fff', fontSize: 11 }}>✓</Text> : null}
                </View>
              </Pressable>

              {/* Schedule Conflicts */}
              <Pressable
                onPress={() => setScheduleConflicts(!scheduleConflicts)}
                style={styles.notifRow}
              >
                <View style={{ flex: 1 }}>
                  <Text style={styles.notifName}>Schedule Conflicts</Text>
                  <Text style={styles.notifSub}>Real-time alerts for faculty overlaps</Text>
                </View>
                <View style={[styles.checkSquare, scheduleConflicts && styles.checkSquareActive]}>
                  {scheduleConflicts ? <Text style={{ color: '#fff', fontSize: 11 }}>✓</Text> : null}
                </View>
              </Pressable>
            </View>
          </View>
        </View>

        {/* Account Security Danger Zone */}
        <View style={styles.dangerCard}>
          <View style={styles.dangerLeft}>
            <View style={styles.dangerIconBox}>
              <Text style={{ fontSize: 16 }}>⚠️</Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.dangerTitle}>Account Security Management</Text>
              <Text style={styles.dangerSub}>
                Manage higher-risk account permissions or deactivate administrative access.
              </Text>
            </View>
          </View>

          <Button
            title="Deactivate Portal"
            variant="dangerOutline"
            size="sm"
            onPress={() => Alert.alert('Deactivate', 'Administrative privileges require root approval.')}
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
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: spacing.lg,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    ...shadows.sm,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#F8FAFC',
    paddingBottom: 8,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: '#0F172A',
  },
  avatarRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    marginBottom: 14,
  },
  changeAvatarText: {
    fontSize: 13,
    fontWeight: '700',
    color: colors.primary,
  },
  inputsRow: {
    flexDirection: 'row',
    gap: 12,
  },
  logoLabel: {
    fontSize: 11,
    fontWeight: '700',
    color: '#64748B',
    marginBottom: 6,
    letterSpacing: 0.5,
  },
  logoUploadBox: {
    borderWidth: 2,
    borderColor: '#CBD5E1',
    borderStyle: 'dashed',
    borderRadius: 16,
    padding: spacing.lg,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F8FAFC',
  },
  logoUploadText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#0F172A',
  },
  logoUploadSub: {
    fontSize: 11,
    color: '#94A3B8',
    marginTop: 2,
  },
  securityOption: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8FAFC',
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
  },
  secOptionTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: '#0F172A',
  },
  secOptionSub: {
    fontSize: 11,
    color: '#94A3B8',
    marginTop: 1,
  },
  tfaBox: {
    backgroundColor: '#F8FAFC',
    borderRadius: 12,
    padding: 12,
  },
  tfaTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: '#0F172A',
  },
  tfaDesc: {
    fontSize: 11,
    color: '#64748B',
    lineHeight: 16,
    marginTop: 6,
  },
  notifRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#F8FAFC',
  },
  notifName: {
    fontSize: 13,
    fontWeight: '700',
    color: '#0F172A',
  },
  notifSub: {
    fontSize: 11,
    color: '#64748B',
    marginTop: 1,
  },
  checkSquare: {
    width: 20,
    height: 20,
    borderRadius: 5,
    borderWidth: 1.5,
    borderColor: '#CBD5E1',
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkSquareActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  dangerCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FFF5F5',
    borderRadius: 18,
    padding: spacing.lg,
    borderWidth: 1,
    borderColor: '#FED7D7',
    marginTop: spacing.lg,
    flexWrap: 'wrap',
    gap: 12,
  },
  dangerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    minWidth: 260,
  },
  dangerIconBox: {
    width: 38,
    height: 38,
    borderRadius: 10,
    backgroundColor: '#FEE2E2',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  dangerTitle: {
    fontSize: 14,
    fontWeight: '800',
    color: '#991B1B',
  },
  dangerSub: {
    fontSize: 12,
    color: '#7F1D1D',
    marginTop: 1,
  },
});
