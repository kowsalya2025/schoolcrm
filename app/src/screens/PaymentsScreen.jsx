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
import { Button, Badge, Icon, Input } from '../components/UI';
import { colors, spacing, radius, shadows } from '../theme';

const INITIAL_FEES = [
  {
    id: 1,
    title: 'Advanced Chemistry Lab Fee',
    due: 'Due Sep 30, 2023',
    amount: 575.0,
    status: 'overdue',
    category: 'Chemistry & Physics Consumables',
  },
  {
    id: 2,
    title: 'Q4 Tuition Installment',
    due: 'Due Oct 15, 2023',
    amount: 19200.0,
    status: 'pending',
    category: 'Academic Year 2025-2026',
  },
  {
    id: 3,
    title: 'Annual Transportation Fee',
    due: 'Paid Sep 12, 2023',
    amount: 9350.0,
    status: 'paid',
    category: 'Bus Route #14',
  },
  {
    id: 4,
    title: 'Field Trip: Science Museum',
    due: 'Due Oct 01, 2023',
    amount: 745.0,
    status: 'overdue',
    category: 'Natural History Museum Admission',
  },
];

export default function PaymentsScreen({ navigation }) {
  const [fees, setFees] = useState(INITIAL_FEES);
  const [filter, setFilter] = useState('ALL'); // ALL, OVERDUE, PENDING, PAID
  const [showCheckout, setShowCheckout] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showAddMethod, setShowAddMethod] = useState(false);
  const [showStatement, setShowStatement] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  // Calculate dynamic outstanding balance
  const unpaidItems = fees.filter((f) => f.status === 'overdue' || f.status === 'pending');
  const totalBalance = unpaidItems.reduce((acc, curr) => acc + curr.amount, 0);
  const overdueCount = fees.filter((f) => f.status === 'overdue').length;

  const filteredFees = fees.filter((f) => {
    if (filter === 'OVERDUE') return f.status === 'overdue';
    if (filter === 'PENDING') return f.status === 'pending';
    if (filter === 'PAID') return f.status === 'paid';
    return true;
  });

  const handlePayCheckout = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      // Mark all pending/overdue as paid
      setFees((prev) =>
        prev.map((item) =>
          item.status !== 'paid'
            ? { ...item, status: 'paid', due: 'Paid Just Now' }
            : item
        )
      );
      setShowCheckout(false);
      setShowSuccess(true);
    }, 1200);
  };

  return (
    <Layout navigation={navigation} active="PaymentsScreen" title="EduParent">
      <ScrollView
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
      >
        {/* Total Outstanding Balance Card (Royal Blue) */}
        <View style={styles.balanceCard}>
          <Text style={styles.balanceLabel}>Total Outstanding Balance</Text>
          <Text style={styles.balanceAmount}>
            ${totalBalance.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </Text>

          <View style={styles.balanceActions}>
            <Pressable
              onPress={() => (totalBalance > 0 ? setShowCheckout(true) : Alert.alert('All Caught Up', 'No pending fees!'))}
              style={styles.payNowBtn}
            >
              <Text style={{ fontSize: 16, marginRight: 6 }}>💵</Text>
              <Text style={styles.payNowText}>Pay Now</Text>
            </Pressable>

            <Pressable
              onPress={() => setShowStatement(true)}
              style={styles.statementBtn}
            >
              <Text style={{ fontSize: 14, marginRight: 6 }}>🕒</Text>
              <Text style={styles.statementText}>Statement</Text>
            </Pressable>
          </View>
        </View>

        {/* Quick Stats Row */}
        <View style={styles.statsRow}>
          {/* Next Auto-pay */}
          <View style={styles.statWidget}>
            <View style={styles.statIconGreen}>
              <Text style={{ fontSize: 16 }}>📅</Text>
            </View>
            <Text style={styles.statLabel}>Next Auto-pay</Text>
            <Text style={styles.statValue}>Oct 15</Text>
          </View>

          {/* Overdue Items */}
          <View style={styles.statWidget}>
            <View style={styles.statIconRed}>
              <Text style={{ fontSize: 16 }}>⚠️</Text>
            </View>
            <Text style={styles.statLabel}>Overdue Items</Text>
            <Text style={[styles.statValue, overdueCount > 0 && { color: colors.danger }]}>
              {overdueCount}
            </Text>
          </View>
        </View>

        {/* Fee Breakdown Section */}
        <View style={styles.sectionWrap}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionHeading}>Fee Breakdown</Text>
            {/* Filter Toggle */}
            <View style={styles.filterPills}>
              {['ALL', 'OVERDUE', 'PAID'].map((type) => (
                <Pressable
                  key={type}
                  onPress={() => setFilter(type)}
                  style={[
                    styles.filterPill,
                    filter === type && styles.filterPillActive,
                  ]}
                >
                  <Text
                    style={[
                      styles.filterPillText,
                      filter === type && styles.filterPillTextActive,
                    ]}
                  >
                    {type}
                  </Text>
                </Pressable>
              ))}
            </View>
          </View>

          {filteredFees.map((fee) => {
            const isOverdue = fee.status === 'overdue';
            const isPaid = fee.status === 'paid';

            return (
              <View
                key={fee.id}
                style={[
                  styles.feeCard,
                  isOverdue && styles.feeCardOverdue,
                  isPaid && styles.feeCardPaid,
                ]}
              >
                <View style={styles.feeLeft}>
                  <View
                    style={[
                      styles.feeIconBox,
                      isOverdue
                        ? { backgroundColor: '#FEE2E2' }
                        : isPaid
                        ? { backgroundColor: '#ECFDF5' }
                        : { backgroundColor: '#EFF6FF' },
                    ]}
                  >
                    <Text style={{ fontSize: 18 }}>
                      {isOverdue ? '⚗️' : isPaid ? '🚌' : '🎓'}
                    </Text>
                  </View>
                  <View style={{ flex: 1, marginRight: 8 }}>
                    <Text style={styles.feeTitle}>{fee.title}</Text>
                    <Text style={styles.feeDue}>{fee.due}</Text>
                  </View>
                </View>

                <View style={styles.feeRight}>
                  <Text style={styles.feeAmount}>
                    {fee.amount.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                  </Text>
                  <View
                    style={[
                      styles.statusTag,
                      isOverdue
                        ? styles.statusTagOverdue
                        : isPaid
                        ? styles.statusTagPaid
                        : styles.statusTagPending,
                    ]}
                  >
                    <Text
                      style={[
                        styles.statusTagText,
                        isOverdue
                          ? { color: '#DC2626' }
                          : isPaid
                          ? { color: '#059669' }
                          : { color: '#D97706' },
                      ]}
                    >
                      {isPaid ? '✓ PAID' : fee.status.toUpperCase()}
                    </Text>
                  </View>
                </View>
              </View>
            );
          })}
        </View>

        {/* Payment Methods Section */}
        <View style={styles.sectionWrap}>
          <Text style={styles.sectionHeading}>Payment Methods</Text>

          {/* Visa Card */}
          <View style={styles.methodCard}>
            <View style={styles.cardBrandBadge}>
              <Text style={styles.cardBrandText}>VISA</Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.methodTitle}>•••• 4242</Text>
              <Text style={styles.methodSubtitle}>Expires 12/25</Text>
            </View>
            <View style={styles.primaryBadge}>
              <Text style={styles.primaryBadgeText}>Primary</Text>
            </View>
          </View>

          {/* Bank Account */}
          <View style={styles.methodCard}>
            <View style={styles.bankIconBadge}>
              <Text style={{ fontSize: 16 }}>🏛️</Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.methodTitle}>Chase Checking</Text>
              <Text style={styles.methodSubtitle}>•••• 8901</Text>
            </View>
            <Text style={{ fontSize: 18, color: colors.muted }}>⋮</Text>
          </View>

          <Button
            title="+ Add Payment Method"
            variant="ghost"
            onPress={() => setShowAddMethod(true)}
            style={{ marginTop: spacing.xs }}
          />
        </View>

        {/* Encrypted Payments Security Banner */}
        <View style={styles.securityBanner}>
          <Text style={{ fontSize: 24, marginRight: 12 }}>🛡️</Text>
          <View style={{ flex: 1 }}>
            <Text style={styles.securityHeading}>Encrypted Payments</Text>
            <Text style={styles.securityText}>
              Your payment information is stored securely with 256-bit encryption.
              EduParent never stores your full card numbers.
            </Text>
          </View>
        </View>
      </ScrollView>

      {/* SECURE CHECKOUT MODAL (Payment-1.pdf) */}
      <Modal
        visible={showCheckout}
        animationType="slide"
        onRequestClose={() => setShowCheckout(false)}
      >
        <Layout navigation={navigation} active="PaymentsScreen" hideBottomBar>
          <ScrollView contentContainerStyle={styles.checkoutScroll}>
            {/* Header */}
            <View style={styles.checkoutHeader}>
              <Pressable
                onPress={() => setShowCheckout(false)}
                hitSlop={8}
                style={styles.backBtn}
              >
                <Text style={{ fontSize: 22, color: colors.primary }}>←</Text>
              </Pressable>
              <Text style={styles.checkoutTitle}>Secure Checkout</Text>
              <Text style={{ fontSize: 18, color: colors.primary }}>🔒</Text>
            </View>

            {/* Order Summary */}
            <Text style={styles.checkoutSectionTitle}>Order Summary</Text>
            <View style={styles.orderSummaryCard}>
              {unpaidItems.map((item) => (
                <View key={item.id} style={styles.orderItem}>
                  <View style={{ flex: 1 }}>
                    <Text style={styles.orderItemTitle}>{item.title}</Text>
                    <Text style={styles.orderItemSub}>{item.category}</Text>
                  </View>
                  <Text style={styles.orderItemAmount}>
                    {item.amount.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                  </Text>
                </View>
              ))}

              <View style={styles.orderTotalBox}>
                <View>
                  <Text style={styles.orderTotalLabel}>Total Amount</Text>
                  <Text style={styles.orderTotalSub}>Inclusive of all processing fees</Text>
                </View>
                <Text style={styles.orderTotalVal}>
                  ${totalBalance.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                </Text>
              </View>
            </View>

            {/* 256-bit SSL Tag */}
            <View style={styles.sslTagBox}>
              <Text style={{ fontSize: 16, marginRight: 8 }}>🛡️</Text>
              <View style={{ flex: 1 }}>
                <Text style={styles.sslTagTitle}>256-bit SSL Encrypted</Text>
                <Text style={styles.sslTagSub}>
                  Your transaction is processed securely via enterprise-grade encryption protocols.
                </Text>
              </View>
            </View>

            {/* Selected Payment Method */}
            <Text style={styles.checkoutSectionTitle}>Payment Method</Text>
            <View style={styles.checkoutMethodBox}>
              <View style={styles.visaCardThumb}>
                <Text style={{ color: '#fff', fontSize: 10, fontWeight: '800' }}>VISA</Text>
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.checkoutMethodTitle}>Visa ending in 4242</Text>
                <Text style={styles.checkoutMethodExp}>Expires 12/26</Text>
                <View style={styles.defaultPill}>
                  <Text style={styles.defaultPillText}>Default</Text>
                </View>
              </View>
              <Pressable onPress={() => Alert.alert('Payment Methods', 'Select another card')}>
                <Text style={styles.changeLink}>Change</Text>
              </Pressable>
            </View>

            {/* Note banner */}
            <View style={styles.noteBanner}>
              <Text style={{ fontSize: 16, marginRight: 8, color: colors.primary }}>ℹ️</Text>
              <View style={{ flex: 1 }}>
                <Text style={styles.noteTitle}>NOTE</Text>
                <Text style={styles.noteText}>
                  Payments are non-refundable once processed. A confirmation receipt will be sent
                  to parent.portal@school.edu immediately after successful transaction.
                </Text>
              </View>
            </View>

            {/* Pay Button */}
            <Button
              title={`Pay $${totalBalance.toLocaleString('en-US', { minimumFractionDigits: 2 })} →`}
              loading={isProcessing}
              onPress={handlePayCheckout}
              size="lg"
              style={{ marginTop: spacing.md, height: 52 }}
            />

            <Text style={styles.termsAgreement}>
              By clicking pay, you agree to the School District's Terms of Service.
            </Text>
          </ScrollView>
        </Layout>
      </Modal>

      {/* PAYMENT SUCCESSFUL MODAL (Payment-2.pdf) */}
      <Modal
        visible={showSuccess}
        animationType="fade"
        onRequestClose={() => setShowSuccess(false)}
      >
        <Layout navigation={navigation} active="PaymentsScreen" hideBottomBar>
          <View style={styles.successContainer}>
            {/* Green Check Circle */}
            <View style={styles.successCircle}>
              <Text style={{ fontSize: 42, color: '#FFFFFF', fontWeight: '800' }}>✓</Text>
            </View>

            <Text style={styles.successTitle}>Payment Successful!</Text>
            <Text style={styles.successDesc}>
              Your payment has been processed successfully. A receipt has been sent to your registered email.
            </Text>

            {/* Transaction Details */}
            <View style={styles.txDetailsCard}>
              <Text style={styles.txHeading}>TRANSACTION DETAILS</Text>

              <View style={styles.txRow}>
                <Text style={styles.txLabel}>Date</Text>
                <Text style={styles.txVal}>Oct 24, 2023</Text>
              </View>

              <View style={styles.txRow}>
                <Text style={styles.txLabel}>Transaction ID</Text>
                <Text style={styles.txVal}>#EP-99283-X</Text>
              </View>

              <View style={styles.txRow}>
                <Text style={styles.txLabel}>Paid to</Text>
                <Text style={styles.txVal}>Oakwood High School</Text>
              </View>
            </View>

            {/* Actions */}
            <Button
              title="Back to Dashboard"
              size="lg"
              onPress={() => setShowSuccess(false)}
              style={{ width: '100%', marginBottom: 10 }}
            />

            <Button
              title="📄 View Receipt"
              variant="outline"
              size="lg"
              onPress={() => Alert.alert('Receipt', 'Receipt #EP-99283-X download started.')}
              style={{ width: '100%' }}
            />
          </View>
        </Layout>
      </Modal>

      {/* Statement Modal */}
      <Modal
        visible={showStatement}
        transparent
        animationType="slide"
        onRequestClose={() => setShowStatement(false)}
      >
        <View style={styles.statementModalBg}>
          <View style={styles.statementModalContent}>
            <View style={styles.statementHeader}>
              <Text style={styles.statementTitle}>Fee Statement</Text>
              <Pressable onPress={() => setShowStatement(false)}>
                <Text style={{ fontSize: 20, color: colors.muted }}>✕</Text>
              </Pressable>
            </View>
            <Text style={{ fontSize: 13, color: colors.muted, marginBottom: 12 }}>
              Academic Year 2025-2026 • Student: Alex
            </Text>
            {fees.map((f) => (
              <View key={f.id} style={styles.statementRow}>
                <View style={{ flex: 1 }}>
                  <Text style={{ fontWeight: '600', color: colors.text }}>{f.title}</Text>
                  <Text style={{ fontSize: 12, color: colors.muted }}>{f.due}</Text>
                </View>
                <Text style={{ fontWeight: '700', color: colors.text }}>${f.amount}</Text>
              </View>
            ))}
            <Button
              title="Download Statement (PDF)"
              variant="primary"
              onPress={() => {
                setShowStatement(false);
                Alert.alert('Downloaded', 'Statement downloaded successfully.');
              }}
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
  balanceCard: {
    backgroundColor: '#1D4ED8',
    borderRadius: 22,
    padding: spacing.lg,
    marginBottom: spacing.md,
    ...shadows.md,
  },
  balanceLabel: {
    color: 'rgba(255,255,255,0.85)',
    fontSize: 13,
    fontWeight: '600',
  },
  balanceAmount: {
    color: '#FFFFFF',
    fontSize: 32,
    fontWeight: '800',
    marginVertical: 6,
  },
  balanceActions: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 8,
  },
  payNowBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
    paddingVertical: 12,
    borderRadius: radius.pill,
  },
  payNowText: {
    color: '#1D4ED8',
    fontWeight: '700',
    fontSize: 14,
  },
  statementBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingVertical: 12,
    borderRadius: radius.pill,
  },
  statementText: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 14,
  },
  statsRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: spacing.md,
  },
  statWidget: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: 14,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    ...shadows.sm,
  },
  statIconGreen: {
    width: 32,
    height: 32,
    borderRadius: 8,
    backgroundColor: '#ECFDF5',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 6,
  },
  statIconRed: {
    width: 32,
    height: 32,
    borderRadius: 8,
    backgroundColor: '#FEF2F2',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 6,
  },
  statLabel: {
    fontSize: 12,
    color: '#64748B',
    fontWeight: '600',
  },
  statValue: {
    fontSize: 18,
    fontWeight: '800',
    color: '#0F172A',
    marginTop: 2,
  },
  sectionWrap: {
    marginBottom: spacing.lg,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  sectionHeading: {
    fontSize: 18,
    fontWeight: '800',
    color: '#0F172A',
  },
  filterPills: {
    flexDirection: 'row',
    gap: 6,
  },
  filterPill: {
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: radius.pill,
    backgroundColor: '#F1F5F9',
  },
  filterPillActive: {
    backgroundColor: colors.primarySubtle,
  },
  filterPillText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#64748B',
  },
  filterPillTextActive: {
    color: colors.primary,
  },
  feeCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 14,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderLeftWidth: 4,
    borderLeftColor: '#3B82F6',
  },
  feeCardOverdue: {
    borderLeftColor: '#DC2626',
  },
  feeCardPaid: {
    borderLeftColor: '#10B981',
  },
  feeLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  feeIconBox: {
    width: 40,
    height: 40,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  feeTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#0F172A',
  },
  feeDue: {
    fontSize: 11,
    color: '#64748B',
    marginTop: 2,
  },
  feeRight: {
    alignItems: 'flex-end',
  },
  feeAmount: {
    fontSize: 16,
    fontWeight: '800',
    color: '#0F172A',
  },
  statusTag: {
    paddingVertical: 2,
    paddingHorizontal: 8,
    borderRadius: radius.pill,
    marginTop: 4,
  },
  statusTagOverdue: {
    backgroundColor: '#FEE2E2',
  },
  statusTagPending: {
    backgroundColor: '#FEF3C7',
  },
  statusTagPaid: {
    backgroundColor: '#ECFDF5',
  },
  statusTagText: {
    fontSize: 10,
    fontWeight: '800',
  },
  methodCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 14,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  cardBrandBadge: {
    backgroundColor: '#0F172A',
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 6,
    marginRight: 12,
  },
  cardBrandText: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: '800',
  },
  bankIconBadge: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#F1F5F9',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  methodTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#0F172A',
  },
  methodSubtitle: {
    fontSize: 11,
    color: '#64748B',
    marginTop: 2,
  },
  primaryBadge: {
    backgroundColor: '#EFF6FF',
    paddingVertical: 3,
    paddingHorizontal: 8,
    borderRadius: radius.pill,
  },
  primaryBadgeText: {
    color: colors.primary,
    fontSize: 11,
    fontWeight: '700',
  },
  securityBanner: {
    flexDirection: 'row',
    backgroundColor: '#EFF6FF',
    borderRadius: 16,
    padding: 16,
    alignItems: 'flex-start',
    borderWidth: 1,
    borderColor: '#DBEAFE',
  },
  securityHeading: {
    fontSize: 13,
    fontWeight: '800',
    color: '#1E3A8A',
  },
  securityText: {
    fontSize: 11,
    color: '#3B82F6',
    lineHeight: 16,
    marginTop: 2,
  },
  checkoutScroll: {
    padding: spacing.md,
    paddingBottom: spacing.xxl,
  },
  checkoutHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 10,
    marginBottom: 10,
  },
  backBtn: {
    padding: 6,
  },
  checkoutTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: colors.primary,
  },
  checkoutSectionTitle: {
    fontSize: 17,
    fontWeight: '800',
    color: '#0F172A',
    marginTop: 14,
    marginBottom: 8,
  },
  orderSummaryCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: spacing.lg,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    ...shadows.sm,
  },
  orderItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  orderItemTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#0F172A',
  },
  orderItemSub: {
    fontSize: 11,
    color: '#64748B',
    marginTop: 2,
  },
  orderItemAmount: {
    fontSize: 15,
    fontWeight: '800',
    color: '#0F172A',
  },
  orderTotalBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#EFF6FF',
    borderRadius: 14,
    padding: 14,
    marginTop: 14,
  },
  orderTotalLabel: {
    fontSize: 14,
    fontWeight: '800',
    color: '#1E3A8A',
  },
  orderTotalSub: {
    fontSize: 10,
    color: '#60A5FA',
    marginTop: 1,
  },
  orderTotalVal: {
    fontSize: 22,
    fontWeight: '800',
    color: colors.primary,
  },
  sslTagBox: {
    flexDirection: 'row',
    backgroundColor: '#ECFDF5',
    borderRadius: 14,
    padding: 12,
    alignItems: 'center',
    marginTop: 12,
    borderWidth: 1,
    borderColor: '#A7F3D0',
  },
  sslTagTitle: {
    fontSize: 12,
    fontWeight: '800',
    color: '#065F46',
  },
  sslTagSub: {
    fontSize: 11,
    color: '#047857',
    marginTop: 1,
  },
  checkoutMethodBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 14,
    borderWidth: 1.5,
    borderColor: colors.primary,
  },
  visaCardThumb: {
    width: 44,
    height: 28,
    borderRadius: 6,
    backgroundColor: '#0F172A',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  checkoutMethodTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: '#0F172A',
  },
  checkoutMethodExp: {
    fontSize: 11,
    color: '#64748B',
    marginTop: 1,
  },
  defaultPill: {
    backgroundColor: '#D1FAE5',
    paddingVertical: 2,
    paddingHorizontal: 6,
    borderRadius: radius.pill,
    alignSelf: 'flex-start',
    marginTop: 4,
  },
  defaultPillText: {
    fontSize: 9,
    fontWeight: '800',
    color: '#059669',
  },
  changeLink: {
    color: colors.primary,
    fontWeight: '700',
    fontSize: 13,
  },
  noteBanner: {
    flexDirection: 'row',
    backgroundColor: '#EFF6FF',
    borderRadius: 14,
    padding: 12,
    marginTop: 14,
  },
  noteTitle: {
    fontSize: 11,
    fontWeight: '800',
    color: '#1E3A8A',
  },
  noteText: {
    fontSize: 11,
    color: '#3B82F6',
    lineHeight: 16,
    marginTop: 2,
  },
  termsAgreement: {
    fontSize: 11,
    color: '#64748B',
    textAlign: 'center',
    marginTop: 12,
    lineHeight: 16,
  },
  successContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.xl,
  },
  successCircle: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: '#10B981',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.lg,
    ...shadows.md,
  },
  successTitle: {
    fontSize: 24,
    fontWeight: '800',
    color: '#0F172A',
    marginBottom: 6,
  },
  successDesc: {
    fontSize: 13,
    color: '#64748B',
    textAlign: 'center',
    lineHeight: 19,
    maxWidth: 290,
    marginBottom: spacing.xl,
  },
  txDetailsCard: {
    width: '100%',
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: spacing.lg,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    marginBottom: spacing.xl,
    ...shadows.sm,
  },
  txHeading: {
    fontSize: 11,
    fontWeight: '800',
    color: '#94A3B8',
    letterSpacing: 0.8,
    marginBottom: 10,
  },
  txRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#F8FAFC',
  },
  txLabel: {
    fontSize: 13,
    color: '#64748B',
  },
  txVal: {
    fontSize: 13,
    fontWeight: '700',
    color: '#0F172A',
  },
  statementModalBg: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    padding: spacing.lg,
  },
  statementModalContent: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: spacing.lg,
  },
  statementHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  statementTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#0F172A',
  },
  statementRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
});
