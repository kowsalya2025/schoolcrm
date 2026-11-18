import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { colors, spacing } from '../theme';

export default function Page({ title, subtitle, children, actions }) {
  return (
    <ScrollView style={styles.scroll} contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <View style={{ flex: 1 }}>
          <Text style={styles.title}>{title}</Text>
          {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
        </View>
        {actions}
      </View>
      {children}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scroll: { flex: 1, backgroundColor: colors.bg },
  container: { padding: spacing.lg },
  header: { flexDirection: 'row', alignItems: 'center', marginBottom: spacing.lg },
  title: { fontSize: 24, fontWeight: '800', color: colors.text },
  subtitle: { color: colors.muted, marginTop: 4 },
});
