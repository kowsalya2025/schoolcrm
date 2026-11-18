import React from 'react';
import { View, Text, StyleSheet, useWindowDimensions } from 'react-native';
import { colors, radius, spacing } from '../theme';

export default function DataTable({ columns, rows, empty }) {
  const { width } = useWindowDimensions();
  const isMobile = width < 768;

  if (!rows.length) {
    return <Text style={styles.empty}>{empty || 'No records found'}</Text>;
  }

  if (isMobile) {
    return (
      <View>
        {rows.map((row, i) => (
          <View key={i} style={styles.mobileCard}>
            {columns.map((col) => (
              <View key={col.key} style={styles.mobileRow}>
                <Text style={styles.mobileLabel}>{col.title}</Text>
                <Text style={styles.mobileValue}>{String(row[col.key] ?? '—')}</Text>
              </View>
            ))}
          </View>
        ))}
      </View>
    );
  }

  return (
    <View style={styles.table}>
      <View style={[styles.tr, styles.thead]}>
        {columns.map((col) => (
          <Text key={col.key} style={[styles.th, { flex: col.flex || 1 }]}>{col.title}</Text>
        ))}
      </View>
      {rows.map((row, i) => (
        <View key={i} style={[styles.tr, i % 2 === 1 && { backgroundColor: '#FAFBFE' }]}>
          {columns.map((col) => (
            <Text key={col.key} style={[styles.td, { flex: col.flex || 1 }]}>
              {String(row[col.key] ?? '—')}
            </Text>
          ))}
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  table: { backgroundColor: colors.card, borderRadius: radius.lg, borderWidth: 1, borderColor: colors.border, overflow: 'hidden' },
  tr: { flexDirection: 'row', paddingVertical: 12, paddingHorizontal: spacing.md, borderBottomWidth: 1, borderBottomColor: colors.border },
  thead: { backgroundColor: '#EEF2FF' },
  th: { fontWeight: '700', color: colors.primary, fontSize: 13 },
  td: { color: colors.text, fontSize: 13 },
  empty: { color: colors.muted, textAlign: 'center', marginTop: spacing.lg },
  mobileCard: { backgroundColor: colors.card, borderRadius: radius.lg, borderWidth: 1, borderColor: colors.border, padding: spacing.md, marginBottom: spacing.md },
  mobileRow: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 4 },
  mobileLabel: { color: colors.muted, fontWeight: '600', fontSize: 13 },
  mobileValue: { color: colors.text, fontSize: 13, flexShrink: 1, textAlign: 'right' },
});
