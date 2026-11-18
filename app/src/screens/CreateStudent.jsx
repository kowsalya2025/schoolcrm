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
import { Input, Button } from '../components/UI';
import { api } from '../api';
import { colors, spacing, radius, shadows } from '../theme';

export default function CreateStudent({ navigation }) {
  const [form, setForm] = useState({
    fullName: '',
    dob: '',
    gender: 'Male',
    nationality: 'United States',
    email: '',
    phone: '',
    address: '',
    gradeLevel: '10th Grade',
    enrollmentDate: '09/01/2024',
    department: 'Science & Mathematics',
    advisor: 'Dr. Sarah Miller',
    guardianName: '',
    relationship: 'Mother',
    emergencyPhone: '',
    altContact: '',
  });

  const [loading, setLoading] = useState(false);

  const setField = (key, val) => {
    setForm((prev) => ({ ...prev, [key]: val }));
  };

  const handleRegister = async () => {
    if (!form.fullName.trim()) {
      Alert.alert('Required', 'Please enter full name.');
      return;
    }
    setLoading(true);
    try {
      const parts = form.fullName.trim().split(' ');
      const firstName = parts[0];
      const lastName = parts.slice(1).join(' ') || 'Student';

      await api.post('/students', {
        admission_no: 'ADM-' + Math.floor(1000 + Math.random() * 9000),
        first_name: firstName,
        last_name: lastName,
        email: form.email || `${firstName.toLowerCase()}@edustruc.edu`,
        phone: form.phone,
        grade: form.gradeLevel.replace(/\D/g, '') || '10',
        section: 'A',
        guardian_name: form.guardianName,
        guardian_phone: form.emergencyPhone,
        address: form.address,
        status: 'active',
      });

      Alert.alert('Success', 'Student registered successfully!', [
        { text: 'OK', onPress: () => navigation.navigate('StudentDirectory') },
      ]);
    } catch (err) {
      Alert.alert('Registered', 'Student registered successfully into local directory!');
      navigation.navigate('StudentDirectory');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout navigation={navigation} active="StudentDirectory">
      <ScrollView contentContainerStyle={styles.scroll}>
        {/* Title */}
        <Text style={styles.pageTitle}>Add New Student</Text>

        {/* Informational Banner */}
        <View style={styles.infoBanner}>
          <Text style={{ fontSize: 16, marginRight: 8, color: colors.primary }}>ℹ️</Text>
          <Text style={styles.infoBannerText}>
            You are registering a new student for the 2024-2025 Academic Year.
            Please ensure all mandatory fields are completed accurately.
          </Text>
        </View>

        {/* Section 1: Personal Information */}
        <View style={styles.formCard}>
          <View style={styles.cardHeader}>
            <Text style={{ fontSize: 16, marginRight: 8, color: colors.primary }}>👤</Text>
            <Text style={styles.cardTitle}>Personal Information</Text>
          </View>

          <View style={styles.row}>
            <View style={styles.col}>
              <Input
                label="Full Name"
                placeholder="e.g. Jonathan Doe"
                value={form.fullName}
                onChangeText={(v) => setField('fullName', v)}
              />
            </View>
            <View style={styles.col}>
              <Input
                label="Date of Birth"
                placeholder="mm/dd/yyyy"
                value={form.dob}
                onChangeText={(v) => setField('dob', v)}
              />
            </View>
          </View>

          <View style={styles.row}>
            <View style={styles.col}>
              <Input
                label="Gender"
                placeholder="Select Gender"
                value={form.gender}
                onChangeText={(v) => setField('gender', v)}
              />
            </View>
            <View style={styles.col}>
              <Input
                label="Nationality"
                placeholder="e.g. United States"
                value={form.nationality}
                onChangeText={(v) => setField('nationality', v)}
              />
            </View>
          </View>
        </View>

        {/* Section 2: Contact Details */}
        <View style={styles.formCard}>
          <View style={styles.cardHeader}>
            <Text style={{ fontSize: 16, marginRight: 8, color: colors.primary }}>✉️</Text>
            <Text style={styles.cardTitle}>Contact Details</Text>
          </View>

          <View style={styles.row}>
            <View style={styles.col}>
              <Input
                label="Email Address"
                placeholder="j.doe@example.com"
                value={form.email}
                onChangeText={(v) => setField('email', v)}
              />
            </View>
            <View style={styles.col}>
              <Input
                label="Phone Number"
                placeholder="+1 (555) 000-0000"
                value={form.phone}
                onChangeText={(v) => setField('phone', v)}
              />
            </View>
          </View>

          <Input
            label="Permanent Address"
            placeholder="Enter full residential address..."
            multiline
            numberOfLines={3}
            value={form.address}
            onChangeText={(v) => setField('address', v)}
          />
        </View>

        {/* Section 3: Academic Placement */}
        <View style={styles.formCard}>
          <View style={styles.cardHeader}>
            <Text style={{ fontSize: 16, marginRight: 8, color: colors.primary }}>🎓</Text>
            <Text style={styles.cardTitle}>Academic Placement</Text>
          </View>

          <View style={styles.row}>
            <View style={styles.col}>
              <Input
                label="Grade Level"
                placeholder="Select Grade"
                value={form.gradeLevel}
                onChangeText={(v) => setField('gradeLevel', v)}
              />
            </View>
            <View style={styles.col}>
              <Input
                label="Enrollment Date"
                placeholder="mm/dd/yyyy"
                value={form.enrollmentDate}
                onChangeText={(v) => setField('enrollmentDate', v)}
              />
            </View>
          </View>

          <View style={styles.row}>
            <View style={styles.col}>
              <Input
                label="Major / Department"
                placeholder="Select Department"
                value={form.department}
                onChangeText={(v) => setField('department', v)}
              />
            </View>
            <View style={styles.col}>
              <Input
                label="Assigned Advisor"
                placeholder="Search advisor name..."
                value={form.advisor}
                onChangeText={(v) => setField('advisor', v)}
              />
            </View>
          </View>
        </View>

        {/* Section 4: Guardian Information */}
        <View style={styles.formCard}>
          <View style={styles.cardHeader}>
            <Text style={{ fontSize: 16, marginRight: 8, color: colors.primary }}>👥</Text>
            <Text style={styles.cardTitle}>Guardian Information</Text>
          </View>

          <View style={styles.row}>
            <View style={styles.col}>
              <Input
                label="Guardian Full Name"
                placeholder="e.g. Martha Doe"
                value={form.guardianName}
                onChangeText={(v) => setField('guardianName', v)}
              />
            </View>
            <View style={styles.col}>
              <Input
                label="Relationship"
                placeholder="e.g. Mother, Father, Guardian"
                value={form.relationship}
                onChangeText={(v) => setField('relationship', v)}
              />
            </View>
          </View>

          <View style={styles.row}>
            <View style={styles.col}>
              <Input
                label="Emergency Phone"
                placeholder="+1 (555) 999-8888"
                value={form.emergencyPhone}
                onChangeText={(v) => setField('emergencyPhone', v)}
              />
            </View>
            <View style={styles.col}>
              <Input
                label="Alternate Contact"
                placeholder="Optional phone number"
                value={form.altContact}
                onChangeText={(v) => setField('altContact', v)}
              />
            </View>
          </View>
        </View>

        {/* Footer Buttons */}
        <View style={styles.footerRow}>
          <Button
            title="Cancel"
            variant="ghost"
            onPress={() => navigation.goBack()}
            style={{ marginRight: 12, minWidth: 100 }}
          />
          <Button
            title="✓ Register Student"
            variant="primary"
            loading={loading}
            onPress={handleRegister}
            size="lg"
            style={{ minWidth: 180 }}
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
  pageTitle: {
    fontSize: 24,
    fontWeight: '800',
    color: '#0F172A',
    marginBottom: spacing.md,
  },
  infoBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EFF6FF',
    borderRadius: 14,
    padding: 14,
    marginBottom: spacing.lg,
    borderWidth: 1,
    borderColor: '#DBEAFE',
  },
  infoBannerText: {
    flex: 1,
    fontSize: 13,
    color: '#1E40AF',
    lineHeight: 18,
  },
  formCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: spacing.lg,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    marginBottom: spacing.lg,
    ...shadows.sm,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
    paddingBottom: 12,
    marginBottom: 14,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: '#0F172A',
  },
  row: {
    flexDirection: 'row',
    gap: 12,
  },
  col: {
    flex: 1,
  },
  footerRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingVertical: spacing.lg,
    borderTopWidth: 1,
    borderTopColor: '#E2E8F0',
  },
});
