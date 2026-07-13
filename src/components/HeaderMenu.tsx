import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  Pressable,
  StyleSheet,
} from 'react-native';
import { router } from 'expo-router';
import { WATERCOLOR_THEME as theme } from '../constants/theme';

const MENU_ITEMS = [
  { label: 'Mapa de Distribuição', route: '/map' },
  { label: 'Eventos', route: '/events' },
  { label: 'Home', route: '/home' },
] as const;

export default function HeaderMenu() {
  const [open, setOpen] = useState(false);

  function handleSelect(route: string) {
    setOpen(false);
    router.push(route);
  }

  return (
    <View style={styles.wrapper}>
      <TouchableOpacity
        onPress={() => setOpen(true)}
        hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
        style={styles.iconButton}
        accessibilityRole="button"
        accessibilityLabel="Abrir menu"
      >
        <View style={[styles.bar, { width: 18 }]} />
        <View style={[styles.bar, { width: 24 }]} />
        <View style={[styles.bar, { width: 14 }]} />
      </TouchableOpacity>

      <Modal
        visible={open}
        transparent
        animationType="fade"
        onRequestClose={() => setOpen(false)}
      >
        {/* Toca fora do menu para fechar */}
        <Pressable style={styles.overlay} onPress={() => setOpen(false)}>
          <View style={styles.dropdown}>
            {MENU_ITEMS.map((item, index) => (
              <TouchableOpacity
                key={item.route}
                style={[
                  styles.menuItem,
                  index < MENU_ITEMS.length - 1 && styles.menuItemDivider,
                ]}
                onPress={() => handleSelect(item.route)}
              >
                <Text style={styles.menuItemText}>{item.label}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </Pressable>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    position: 'absolute',
    top: 4,
    right: 4,
    zIndex: 10,
  },
  iconButton: {
    padding: 8,
    alignItems: 'flex-end',
    gap: 4,
  },
  bar: {
    height: 3,
    borderRadius: 2,
    backgroundColor: theme.colors.primary,
  },
  overlay: {
    flex: 1,
  },
  dropdown: {
    position: 'absolute',
    // Esse "top" é uma estimativa da posição do ícone (safe area + header).
    top: 56,
    right: 20,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    paddingVertical: 6,
    minWidth: 210,
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 6,
  },
  menuItem: {
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  menuItemDivider: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#E0E0E0',
  },
  menuItemText: {
    fontSize: 15,
    fontWeight: '500',
    color: theme.colors.textPrimary,
  },
});
