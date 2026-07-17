import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { msToHMS } from '../hooks/useOfflineTimer';
import { WATERCOLOR_THEME as theme } from '../constants/theme';

interface Props {
  elapsedMs: number;
  totalTodayMs: number;
  sessionCount: number;
  isOffline: boolean;
}

function StatCard({
  label,
  value,
  highlight,
  icon,
}: {
  label: string;
  value: string;
  highlight?: boolean;
  icon?: string;
}) {
  return (
    <View style={{...styles.card, 
    borderTopLeftRadius: label === "ÁGUA DOADA" ? 16 : 0, 
    borderTopRightRadius: label === "ÁGUA DOADA" ? 16 : 0,
    borderBottomLeftRadius: label === "SESSÕES" ? 16 : 0, 
    borderBottomRightRadius: label === "SESSÕES" ? 16 : 0
    }}>
      <View style={styles.labelRow}>
        {icon && <Text style={styles.cardIcon}>{icon}</Text>}
        <Text style={styles.label}>{label}</Text>
        <Text style={[styles.value, highlight && styles.valueHighlight]}>{value}</Text>
      </View>
    </View>
  );
}

export default function StatsRow({ elapsedMs, totalTodayMs, sessionCount, isOffline }: Props) {
  return (
    <View style={styles.row}>
      {/* <StatCard label="SESSÃO ATUAL" value={msToHMS(elapsedMs)} icon="⏱" /> */}
      <StatCard
        label="ÁGUA DOADA" // Mudamos o foco
        value={`${( (totalTodayMs + (isOffline ? elapsedMs : 0)) / 60000 * 0.1 ).toFixed(2)} L`} // Ex: 0.1L por minuto
        highlight
        icon="💧"
      />
      <StatCard label="SESSÕES" value={String(sessionCount)} icon="📊" />
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'column',
    gap: 0,
    width: '100%',
    height: 80,
    marginTop: 8,
  },
  card: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    backgroundColor: theme.colors.buttonBg, // Branco Papel
    // borderRadius: 16,
    borderWidth: 1,
    borderColor: theme.colors.buttonBorder,
    gap: 4,
    // elevation: 2,
    // shadowColor: '#000',
    // shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 1.5,
  },
  labelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  cardIcon: {
    fontSize: 14,
  },
  label: {
    fontSize: 8,
    color: theme.colors.textSecondary,
    letterSpacing: 0.8,
    fontWeight: '600',
  },
  value: {
    fontSize: 16,
    fontWeight: '700',
    color: theme.colors.textPrimary,
    fontFamily: theme.fonts.timer,
  },
  valueHighlight: {
    color: theme.colors.primary, // Verde Água
  },
});
