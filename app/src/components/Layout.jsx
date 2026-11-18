import React, { useState } from 'react';
import {
  View,
  Text,
  Pressable,
  StyleSheet,
  useWindowDimensions,
  StatusBar,
  Modal,
  ScrollView,
  Platform,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors, spacing, radius, shadows } from '../theme';
import { useAuth } from '../auth';
import { Avatar, Icon, Badge, Button } from './UI';

// Navigation items configuration
const MOBILE_TABS = [
  { key: 'ParentDashboard', label: 'Home', icon: 'home' },
  { key: 'PaymentsScreen', label: 'Payments', icon: 'payments' },
  { key: 'CalendarScreen', label: 'Calendar', icon: 'calendar' },
  { key: 'InboxScreen', label: 'Inbox', icon: 'inbox', badge: 2 },
  { key: 'ProfileScreen', label: 'Profile', icon: 'profile' },
];

const DESKTOP_NAV = [
  { key: 'AdminDashboard', label: 'Dashboard', icon: 'dashboard', roles: ['admin'] },
  { key: 'ClassManagement', label: 'My Classes', icon: 'folder', roles: ['teacher'] },
  { key: 'StudentDirectory', label: 'Students', icon: 'profile', roles: ['admin', 'teacher'] },
  { key: 'CourseManagement', label: 'Courses', icon: 'document', roles: ['admin', 'teacher'] },
  { key: 'AcademicSchedules', label: 'Schedules', icon: 'calendar', roles: ['admin', 'teacher'] },
  { key: 'SystemSettings', label: 'Settings', icon: 'settings', roles: ['admin'] },
  { key: 'HelpSupport', label: 'Help & Support', icon: 'alert', roles: ['admin', 'teacher'] },
];

export default function Layout({ navigation, active, children, hideTopBar = false, hideBottomBar = false, title }) {
  const { user } = useAuth();
  const { width } = useWindowDimensions();
  const insets = useSafeAreaInsets();
  const isMobile = width < 768;
  const isStaff = user?.role === 'admin' || user?.role === 'teacher';
  const [showNotifications, setShowNotifications] = useState(false);

  const topInset = Math.max(insets.top, Platform.OS === 'android' ? (StatusBar.currentHeight || 28) : 0);
  const bottomInset = Math.max(insets.bottom, Platform.OS === 'android' ? 14 : 8);

  const notificationsList = [
    { id: 1, title: 'Parent-Teacher Meeting', time: 'Friday, 3:00 PM', unread: true },
    { id: 2, title: 'New grade posted: History Quiz (92%)', time: '2 hours ago', unread: true },
    { id: 3, title: 'Q4 Tuition Due Oct 15', time: '1 day ago', unread: false },
  ];

  const go = (key) => {
    if (active === key) return;
    navigation.navigate(key);
  };

  // Mobile Bottom Navigation Bar (exact match to Parent Dashboard / Payments / Calendar designs)
  const MobileBottomNav = (
    <View style={[styles.mobileTabBar, { paddingBottom: bottomInset, height: 60 + bottomInset }]}>
      {MOBILE_TABS.map((tab) => {
        const isActive =
          active === tab.key ||
          (tab.key === 'ParentDashboard' && (active === 'Home' || active === 'AdminDashboard'));

        return (
          <Pressable
            key={tab.key}
            onPress={() => go(tab.key)}
            style={styles.tabItem}
            hitSlop={8}
          >
            <View
              style={[
                styles.tabIconWrap,
                isActive && styles.tabIconWrapActive,
              ]}
            >
              <Icon
                name={tab.icon}
                size={18}
                color={isActive ? '#FFFFFF' : '#64748B'}
              />
              {tab.badge && !isActive ? (
                <View style={styles.tabBadge}>
                  <Text style={styles.tabBadgeText}>{tab.badge}</Text>
                </View>
              ) : null}
            </View>
            <Text
              style={[
                styles.tabLabel,
                isActive && styles.tabLabelActive,
              ]}
            >
              {tab.label}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );

  // Mobile Top Bar
  const MobileTopBar = (
    <View style={[styles.mobileHeaderWrapper, { paddingTop: topInset }]}>
      <View style={styles.mobileHeader}>
        <Pressable onPress={() => go('ProfileScreen')} style={styles.headerAvatarWrap}>
          <Avatar
            name={user?.name || 'Sarah'}
            size={38}
            source="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80"
          />
        </Pressable>
        <Text style={styles.headerTitle}>{title || (isStaff ? 'EduStruc' : 'EduParent')}</Text>
        <Pressable
          onPress={() => setShowNotifications(true)}
          style={styles.headerBellWrap}
          hitSlop={10}
        >
          <Icon name="bell" size={22} color={colors.primary} />
          <View style={styles.bellDot} />
        </Pressable>
      </View>
    </View>
  );

  // Desktop Sidebar
  const filteredNav = DESKTOP_NAV.filter((n) => !user?.role || n.roles.includes(user.role));
  const DesktopSidebar = (
    <View style={styles.desktopSidebar}>
      <View style={styles.sidebarBrand}>
        <View style={styles.brandIconBox}>
          <Text style={{ color: '#fff', fontSize: 16, fontWeight: '800' }}>🎓</Text>
        </View>
        <View>
          <Text style={styles.brandTitle}>EduStruc SMS</Text>
          <Text style={styles.brandSubtitle}>
            {user?.role === 'teacher' ? 'STAFF PORTAL' : 'ADMIN PORTAL'}
          </Text>
        </View>
      </View>

      <ScrollView style={{ flex: 1, paddingVertical: spacing.md }}>
        {filteredNav.map((item) => {
          const isActive = active === item.key;
          return (
            <Pressable
              key={item.key}
              onPress={() => go(item.key)}
              style={[styles.sidebarItem, isActive && styles.sidebarItemActive]}
            >
              <Icon
                name={item.icon}
                size={18}
                color={isActive ? '#FFFFFF' : '#94A3B8'}
                style={{ marginRight: 12 }}
              />
              <Text style={[styles.sidebarItemText, isActive && styles.sidebarItemTextActive]}>
                {item.label}
              </Text>
            </Pressable>
          );
        })}
      </ScrollView>

      {isStaff ? (
        <View style={{ paddingHorizontal: spacing.md, marginBottom: spacing.md }}>
          <Button
            title="+ Add New Student"
            onPress={() => go('CreateStudent')}
            variant="primary"
            size="md"
          />
        </View>
      ) : null}

      <View style={styles.sidebarFooter}>
        <Pressable onPress={() => go('HelpSupport')} style={styles.sidebarFooterLink}>
          <Icon name="alert" size={16} color="#94A3B8" style={{ marginRight: 8 }} />
          <Text style={styles.sidebarFooterText}>Support</Text>
        </Pressable>
        <Pressable onPress={() => go('LogoutConfirmation')} style={styles.sidebarFooterLink}>
          <Icon name="logout" size={16} color="#94A3B8" style={{ marginRight: 8 }} />
          <Text style={styles.sidebarFooterText}>Logout</Text>
        </Pressable>
      </View>
    </View>
  );

  return (
    <View style={styles.safe}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      {/* Notifications Drawer Modal */}
      <Modal
        visible={showNotifications}
        transparent
        animationType="fade"
        onRequestClose={() => setShowNotifications(false)}
      >
        <Pressable
          style={styles.modalOverlay}
          onPress={() => setShowNotifications(false)}
        >
          <View style={styles.notifSheet}>
            <View style={styles.notifHeader}>
              <Text style={styles.notifTitle}>Notifications</Text>
              <Pressable onPress={() => setShowNotifications(false)}>
                <Text style={{ fontSize: 18, color: colors.muted }}>✕</Text>
              </Pressable>
            </View>
            {notificationsList.map((n) => (
              <View key={n.id} style={styles.notifItem}>
                <View style={{ flex: 1 }}>
                  <Text style={[styles.notifItemTitle, n.unread && { fontWeight: '700' }]}>
                    {n.title}
                  </Text>
                  <Text style={styles.notifItemTime}>{n.time}</Text>
                </View>
                {n.unread ? <View style={styles.unreadPill} /> : null}
              </View>
            ))}
            <Button
              title="Close"
              variant="ghost"
              size="sm"
              onPress={() => setShowNotifications(false)}
              style={{ marginTop: 8 }}
            />
          </View>
        </Pressable>
      </Modal>

      {isMobile ? (
        <View style={styles.mobileContainer}>
          {!hideTopBar ? MobileTopBar : null}
          <View style={styles.mobileContent}>{children}</View>
          {!hideBottomBar ? MobileBottomNav : null}
        </View>
      ) : (
        <View style={styles.desktopContainer}>
          {DesktopSidebar}
          <View style={styles.desktopContent}>{children}</View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: colors.bg,
  },
  mobileContainer: {
    flex: 1,
    backgroundColor: colors.bg,
  },
  mobileContent: {
    flex: 1,
  },
  mobileHeaderWrapper: {
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: colors.borderLight,
    ...shadows.sm,
  },
  mobileHeader: {
    height: 56,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.md,
    backgroundColor: '#FFFFFF',
  },
  headerAvatarWrap: {
    width: 38,
    height: 38,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: colors.primary,
    letterSpacing: -0.3,
  },
  headerBellWrap: {
    width: 38,
    height: 38,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  bellDot: {
    position: 'absolute',
    top: 6,
    right: 8,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.danger,
    borderWidth: 1.5,
    borderColor: '#FFFFFF',
  },
  mobileTabBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: colors.borderLight,
    ...shadows.md,
  },
  tabItem: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  tabIconWrap: {
    width: 44,
    height: 30,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  tabIconWrapActive: {
    backgroundColor: colors.primary,
  },
  tabLabel: {
    fontSize: 10,
    fontWeight: '600',
    color: '#64748B',
    marginTop: 2,
  },
  tabLabelActive: {
    color: colors.primary,
    fontWeight: '700',
  },
  tabBadge: {
    position: 'absolute',
    top: -2,
    right: 2,
    backgroundColor: colors.danger,
    borderRadius: 8,
    minWidth: 14,
    height: 14,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 3,
  },
  tabBadgeText: {
    color: '#fff',
    fontSize: 9,
    fontWeight: '800',
  },
  desktopContainer: {
    flex: 1,
    flexDirection: 'row',
  },
  desktopSidebar: {
    width: 250,
    backgroundColor: '#0F1E4B',
    paddingVertical: spacing.lg,
  },
  sidebarBrand: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
    marginBottom: spacing.lg,
  },
  brandIconBox: {
    width: 36,
    height: 36,
    borderRadius: 8,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  brandTitle: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '800',
  },
  brandSubtitle: {
    color: '#94A3B8',
    fontSize: 9,
    fontWeight: '700',
    letterSpacing: 1,
  },
  sidebarItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: spacing.lg,
    marginHorizontal: spacing.sm,
    borderRadius: radius.md,
  },
  sidebarItemActive: {
    backgroundColor: colors.primary,
  },
  sidebarItemText: {
    color: '#94A3B8',
    fontSize: 14,
    fontWeight: '600',
  },
  sidebarItemTextActive: {
    color: '#FFFFFF',
    fontWeight: '700',
  },
  sidebarFooter: {
    paddingHorizontal: spacing.lg,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255,255,255,0.1)',
    paddingTop: spacing.md,
  },
  sidebarFooterLink: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
  },
  sidebarFooterText: {
    color: '#94A3B8',
    fontSize: 13,
  },
  desktopContent: {
    flex: 1,
    backgroundColor: colors.bg,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(15, 23, 42, 0.4)',
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
    paddingTop: 60,
    paddingRight: 16,
  },
  notifSheet: {
    width: 300,
    backgroundColor: '#FFFFFF',
    borderRadius: radius.lg,
    padding: spacing.md,
    ...shadows.lg,
  },
  notifHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: colors.borderLight,
    paddingBottom: 8,
    marginBottom: 8,
  },
  notifTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: colors.text,
  },
  notifItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: colors.borderLight,
  },
  notifItemTitle: {
    fontSize: 13,
    color: colors.text,
  },
  notifItemTime: {
    fontSize: 11,
    color: colors.muted,
    marginTop: 2,
  },
  unreadPill: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: colors.primary,
    marginLeft: 8,
  },
});
