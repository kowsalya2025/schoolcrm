import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
  Modal,
  TextInput,
  Alert,
} from 'react-native';
import Layout from '../components/Layout';
import { Avatar, Badge, Button, Icon } from '../components/UI';
import { colors, spacing, radius, shadows } from '../theme';

const INITIAL_CONVERSATIONS = [
  {
    id: 1,
    sender: 'Ms. Sarah Jenkins',
    role: 'Mathematics Grade 10',
    time: '10:42 AM',
    title: "Leo's progress in Trigonometry...",
    preview: 'Hi there! I wanted to share that Leo did exceptionally well on his quiz today and showed great problem solving...',
    unread: true,
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&q=80',
    online: true,
    messages: [
      { sender: 'Ms. Sarah Jenkins', text: 'Good morning! Quick update on Leo.', time: '10:40 AM' },
      { sender: 'Ms. Sarah Jenkins', text: 'Hi there! I wanted to share that Leo did exceptionally well on his quiz today and showed great problem solving skills.', time: '10:42 AM' },
    ],
  },
  {
    id: 2,
    sender: 'Oakwood High Newsletter',
    role: 'Weekly Digest',
    time: 'Yesterday',
    title: "What's happening this week at...",
    preview: 'Weekly updates on school plays, football qualifiers, and parent orientation sessions.',
    attachment: 'calendar.pdf',
    unread: false,
    icon: '📰',
    messages: [
      { sender: 'Oakwood High', text: 'Welcome to this week edition of the Oakwood High newsletter. Please find the attached semester calendar.', time: 'Yesterday' },
    ],
  },
  {
    id: 3,
    sender: 'Mr. David Chen',
    role: 'Varsity Basketball Coach',
    time: 'Oct 12',
    title: 'Practice schedule update for...',
    preview: 'Practice times shifted 30 mins earlier this Wednesday due to gymnasium maintenance.',
    unread: false,
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
    online: false,
    messages: [
      { sender: 'Mr. David Chen', text: 'Hi parents, practice times shifted 30 mins earlier this Wednesday due to gymnasium maintenance.', time: 'Oct 12' },
    ],
  },
];

export default function InboxScreen({ navigation }) {
  const [conversations, setConversations] = useState(INITIAL_CONVERSATIONS);
  const [search, setSearch] = useState('');
  const [activeChat, setActiveChat] = useState(null);
  const [replyText, setReplyText] = useState('');
  const [newsModal, setNewsModal] = useState(null);

  const filteredConversations = conversations.filter(
    (c) =>
      c.sender.toLowerCase().includes(search.toLowerCase()) ||
      c.title.toLowerCase().includes(search.toLowerCase()) ||
      c.role.toLowerCase().includes(search.toLowerCase())
  );

  const openConversation = (conv) => {
    setActiveChat(conv);
    // Mark as read
    setConversations((prev) =>
      prev.map((c) => (c.id === conv.id ? { ...c, unread: false } : c))
    );
  };

  const sendMessage = () => {
    if (!replyText.trim()) return;
    const newMsg = { sender: 'You', text: replyText.trim(), time: 'Just now' };
    setActiveChat((prev) => ({
      ...prev,
      messages: [...prev.messages, newMsg],
    }));
    setConversations((prev) =>
      prev.map((c) =>
        c.id === activeChat.id
          ? {
              ...c,
              preview: `You: ${replyText.trim()}`,
              messages: [...c.messages, newMsg],
            }
          : c
      )
    );
    setReplyText('');
  };

  return (
    <Layout navigation={navigation} active="InboxScreen" title="EduParent">
      <ScrollView
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
      >
        {/* Search Bar */}
        <View style={styles.searchWrap}>
          <Text style={{ fontSize: 16, marginRight: 8, color: '#94A3B8' }}>🔍</Text>
          <TextInput
            value={search}
            onChangeText={setSearch}
            placeholder="Search conversations..."
            placeholderTextColor="#94A3B8"
            style={styles.searchInput}
          />
        </View>

        {/* Urgent & Upcoming Highlight Cards (Horizontal Carousel) */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.carousel}
          contentContainerStyle={{ gap: 12, paddingRight: 16 }}
        >
          {/* Mint Green Card */}
          <View style={styles.urgentCard}>
            <View style={styles.urgentTag}>
              <Text style={styles.urgentTagText}>URGENT NEWS</Text>
            </View>
            <Text style={styles.urgentTitle}>School Campus Expansion Update</Text>
            <Text style={styles.urgentAuthor}>From Principal Miller</Text>
            <Pressable
              onPress={() =>
                setNewsModal({
                  title: 'School Campus Expansion Update',
                  author: 'From Principal Miller',
                  body: 'We are thrilled to announce Phase 2 of our STEM & Arts wing expansion beginning next month. All academic schedules remain unaffected.',
                })
              }
              style={{ marginTop: 10 }}
            >
              <Text style={styles.urgentLink}>Read Full Story →</Text>
            </Pressable>
          </View>

          {/* Blue Card */}
          <View style={styles.upcomingCard}>
            <View style={styles.upcomingTag}>
              <Text style={styles.upcomingTagText}>UPCOMING</Text>
            </View>
            <Text style={styles.upcomingTitle}>Science Fair: Parent Volunteers</Text>
            <Text style={styles.upcomingAuthor}>24 slots remaining</Text>
            <Pressable
              onPress={() => Alert.alert('Volunteers', 'Thank you! You are signed up as a judge for the Science Fair.')}
              style={{ marginTop: 10 }}
            >
              <Text style={styles.upcomingLink}>Sign Up Now</Text>
            </Pressable>
          </View>
        </ScrollView>

        {/* Recent Conversations */}
        <View style={styles.sectionWrap}>
          <Text style={styles.sectionHeading}>Recent Conversations</Text>

          {filteredConversations.map((conv) => (
            <Pressable
              key={conv.id}
              onPress={() => openConversation(conv)}
              style={[
                styles.convCard,
                conv.unread && styles.convCardUnread,
              ]}
            >
              {/* Left Accent indicator for unread */}
              {conv.unread ? <View style={styles.unreadBar} /> : null}

              {/* Avatar */}
              <View style={{ marginRight: 12 }}>
                {conv.avatar ? (
                  <Avatar
                    source={conv.avatar}
                    name={conv.sender}
                    size={46}
                    status={conv.online ? 'online' : null}
                  />
                ) : (
                  <View style={styles.iconAvatarBox}>
                    <Text style={{ fontSize: 20 }}>{conv.icon}</Text>
                  </View>
                )}
              </View>

              {/* Message Details */}
              <View style={{ flex: 1 }}>
                <View style={styles.convHeaderRow}>
                  <Text style={styles.convSender}>{conv.sender}</Text>
                  <Text style={styles.convTime}>{conv.time}</Text>
                </View>
                <Text style={styles.convRole}>{conv.role}</Text>
                <Text style={styles.convTitle}>{conv.title}</Text>
                <Text numberOfLines={2} style={styles.convPreview}>
                  {conv.preview}
                </Text>

                {/* Attachment Pill if available */}
                {conv.attachment ? (
                  <View style={styles.attachmentPill}>
                    <Text style={{ fontSize: 12, marginRight: 4 }}>📎</Text>
                    <Text style={styles.attachmentText}>{conv.attachment}</Text>
                  </View>
                ) : null}
              </View>
            </Pressable>
          ))}
        </View>

        {/* Older Messages Archive Card */}
        <View style={styles.archiveCard}>
          <View style={styles.archiveIconCircle}>
            <Text style={{ fontSize: 20 }}>📥</Text>
          </View>
          <Text style={styles.archiveTitle}>Looking for older messages?</Text>
          <Text style={styles.archiveDesc}>
            All messages older than 3 months are moved to your archive.
          </Text>
          <Pressable
            onPress={() => Alert.alert('Archive', 'No archived messages older than 3 months.')}
            style={{ marginTop: 8 }}
          >
            <Text style={styles.archiveLink}>View Archive</Text>
          </Pressable>
        </View>
      </ScrollView>

      {/* Interactive Chat Modal */}
      <Modal
        visible={!!activeChat}
        animationType="slide"
        onRequestClose={() => setActiveChat(null)}
      >
        <Layout navigation={navigation} active="InboxScreen" hideBottomBar>
          <View style={styles.chatContainer}>
            {/* Chat Header */}
            <View style={styles.chatHeader}>
              <Pressable onPress={() => setActiveChat(null)} style={{ padding: 6 }}>
                <Text style={{ fontSize: 22, color: colors.primary }}>←</Text>
              </Pressable>
              <View style={{ flex: 1, marginLeft: 10 }}>
                <Text style={styles.chatHeaderName}>{activeChat?.sender}</Text>
                <Text style={styles.chatHeaderRole}>{activeChat?.role}</Text>
              </View>
              {activeChat?.online ? (
                <View style={styles.onlineStatusBadge}>
                  <View style={styles.onlineDot} />
                  <Text style={styles.onlineText}>Active</Text>
                </View>
              ) : null}
            </View>

            {/* Messages Thread */}
            <ScrollView
              style={{ flex: 1 }}
              contentContainerStyle={{ padding: spacing.md, gap: 10 }}
            >
              {activeChat?.messages.map((m, idx) => {
                const isMe = m.sender === 'You';
                return (
                  <View
                    key={idx}
                    style={[
                      styles.messageBubble,
                      isMe ? styles.messageBubbleMe : styles.messageBubbleOther,
                    ]}
                  >
                    <Text
                      style={[
                        styles.messageText,
                        isMe ? { color: '#FFFFFF' } : { color: '#0F172A' },
                      ]}
                    >
                      {m.text}
                    </Text>
                    <Text
                      style={[
                        styles.messageTime,
                        isMe ? { color: '#BFDBFE' } : { color: '#94A3B8' },
                      ]}
                    >
                      {m.time}
                    </Text>
                  </View>
                );
              })}
            </ScrollView>

            {/* Reply Input Bar */}
            <View style={styles.replyBar}>
              <TextInput
                value={replyText}
                onChangeText={setReplyText}
                placeholder="Type your reply..."
                placeholderTextColor="#94A3B8"
                style={styles.replyInput}
              />
              <Pressable onPress={sendMessage} style={styles.sendBtn}>
                <Text style={{ color: '#FFFFFF', fontWeight: '800', fontSize: 16 }}>↑</Text>
              </Pressable>
            </View>
          </View>
        </Layout>
      </Modal>

      {/* News Announcement Modal */}
      <Modal
        visible={!!newsModal}
        transparent
        animationType="fade"
        onRequestClose={() => setNewsModal(null)}
      >
        <View style={styles.newsModalBg}>
          <View style={styles.newsModalCard}>
            <Text style={styles.newsModalTitle}>{newsModal?.title}</Text>
            <Text style={styles.newsModalAuthor}>{newsModal?.author}</Text>
            <Text style={styles.newsModalBody}>{newsModal?.body}</Text>
            <Button
              title="Close"
              variant="primary"
              onPress={() => setNewsModal(null)}
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
  searchWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    paddingHorizontal: 14,
    height: 46,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    marginBottom: spacing.md,
    ...shadows.sm,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    color: '#0F172A',
  },
  carousel: {
    marginBottom: spacing.lg,
  },
  urgentCard: {
    width: 250,
    backgroundColor: '#A7F3D0',
    borderRadius: 18,
    padding: 16,
    justifyContent: 'space-between',
  },
  urgentTag: {
    backgroundColor: '#064E3B',
    paddingVertical: 3,
    paddingHorizontal: 8,
    borderRadius: radius.pill,
    alignSelf: 'flex-start',
    marginBottom: 8,
  },
  urgentTagText: {
    color: '#ECFDF5',
    fontSize: 10,
    fontWeight: '800',
  },
  urgentTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: '#064E3B',
    lineHeight: 22,
  },
  urgentAuthor: {
    fontSize: 12,
    color: '#047857',
    marginTop: 4,
  },
  urgentLink: {
    fontSize: 13,
    fontWeight: '800',
    color: '#064E3B',
  },
  upcomingCard: {
    width: 250,
    backgroundColor: '#BFDBFE',
    borderRadius: 18,
    padding: 16,
    justifyContent: 'space-between',
  },
  upcomingTag: {
    backgroundColor: '#1E3A8A',
    paddingVertical: 3,
    paddingHorizontal: 8,
    borderRadius: radius.pill,
    alignSelf: 'flex-start',
    marginBottom: 8,
  },
  upcomingTagText: {
    color: '#DBEAFE',
    fontSize: 10,
    fontWeight: '800',
  },
  upcomingTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: '#1E3A8A',
    lineHeight: 22,
  },
  upcomingAuthor: {
    fontSize: 12,
    color: '#2563EB',
    marginTop: 4,
  },
  upcomingLink: {
    fontSize: 13,
    fontWeight: '800',
    color: '#1E3A8A',
  },
  sectionWrap: {
    marginBottom: spacing.lg,
  },
  sectionHeading: {
    fontSize: 18,
    fontWeight: '800',
    color: '#0F172A',
    marginBottom: 12,
  },
  convCard: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: 14,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    position: 'relative',
    overflow: 'hidden',
    ...shadows.sm,
  },
  convCardUnread: {
    borderColor: '#93C5FD',
    backgroundColor: '#FAFCFF',
  },
  unreadBar: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    width: 4,
    backgroundColor: colors.primary,
  },
  iconAvatarBox: {
    width: 46,
    height: 46,
    borderRadius: 23,
    backgroundColor: '#FEF3C7',
    alignItems: 'center',
    justifyContent: 'center',
  },
  convHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  convSender: {
    fontSize: 15,
    fontWeight: '800',
    color: '#0F172A',
  },
  convTime: {
    fontSize: 11,
    color: '#64748B',
    fontWeight: '600',
  },
  convRole: {
    fontSize: 12,
    color: colors.primary,
    fontWeight: '600',
    marginTop: 1,
  },
  convTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: '#1E293B',
    marginTop: 3,
  },
  convPreview: {
    fontSize: 12,
    color: '#64748B',
    lineHeight: 17,
    marginTop: 2,
  },
  attachmentPill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F1F5F9',
    paddingVertical: 3,
    paddingHorizontal: 8,
    borderRadius: radius.pill,
    alignSelf: 'flex-start',
    marginTop: 6,
  },
  attachmentText: {
    fontSize: 11,
    color: '#334155',
    fontWeight: '600',
  },
  archiveCard: {
    backgroundColor: '#F8FAFC',
    borderRadius: 18,
    padding: spacing.lg,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#CBD5E1',
    borderStyle: 'dashed',
    marginBottom: spacing.xl,
  },
  archiveIconCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#EFF6FF',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  archiveTitle: {
    fontSize: 14,
    fontWeight: '800',
    color: '#0F172A',
  },
  archiveDesc: {
    fontSize: 12,
    color: '#64748B',
    textAlign: 'center',
    marginTop: 2,
  },
  archiveLink: {
    color: colors.primary,
    fontWeight: '700',
    fontSize: 13,
  },
  chatContainer: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  chatHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.md,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
  },
  chatHeaderName: {
    fontSize: 16,
    fontWeight: '800',
    color: '#0F172A',
  },
  chatHeaderRole: {
    fontSize: 12,
    color: '#64748B',
  },
  onlineStatusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ECFDF5',
    paddingVertical: 3,
    paddingHorizontal: 8,
    borderRadius: radius.pill,
  },
  onlineDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#10B981',
    marginRight: 4,
  },
  onlineText: {
    fontSize: 11,
    color: '#059669',
    fontWeight: '700',
  },
  messageBubble: {
    maxWidth: '80%',
    padding: 12,
    borderRadius: 16,
  },
  messageBubbleMe: {
    alignSelf: 'flex-end',
    backgroundColor: colors.primary,
    borderBottomRightRadius: 4,
  },
  messageBubbleOther: {
    alignSelf: 'flex-start',
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderBottomLeftRadius: 4,
  },
  messageText: {
    fontSize: 14,
    lineHeight: 20,
  },
  messageTime: {
    fontSize: 10,
    marginTop: 4,
    alignSelf: 'flex-end',
  },
  replyBar: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.md,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#E2E8F0',
  },
  replyInput: {
    flex: 1,
    height: 42,
    backgroundColor: '#F1F5F9',
    borderRadius: 21,
    paddingHorizontal: 16,
    fontSize: 14,
    color: '#0F172A',
    marginRight: 10,
  },
  sendBtn: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  newsModalBg: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    padding: spacing.lg,
  },
  newsModalCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: spacing.lg,
  },
  newsModalTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#0F172A',
  },
  newsModalAuthor: {
    fontSize: 13,
    color: colors.primary,
    fontWeight: '600',
    marginTop: 4,
    marginBottom: 10,
  },
  newsModalBody: {
    fontSize: 14,
    color: '#334155',
    lineHeight: 20,
  },
});
