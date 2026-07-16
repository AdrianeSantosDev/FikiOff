import React from 'react';

// Design
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, SafeAreaView } from 'react-native';
import { MaterialIcons as Icon } from '@expo/vector-icons';

// Third-party
import { router } from 'expo-router';

export default function MapaScreen() {
  // Dados simulados do histórico de doações
  const doacoes = [
    { id: '1', data: '10/06', minutos: '109 Minutos' },
    { id: '2', data: '01/06', minutos: '200 Minutos' },
    { id: '3', data: '03/02', minutos: '360 Minutos' },
    { id: '4', data: '10/06', minutos: '160 Minutos' },
  ];

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Icon name="menu" size={30} color="#fff" style={styles.menuIcon} />
        <View style={styles.logoRow}>
          <Text style={styles.logoText}>FikiOff</Text>
          <Icon name="opacity" size={24} color="#2dcf54" style={{ marginLeft: 5 }} />
        </View>

        {/* Placeholder do Mapa fictício */}
        <View style={styles.mapContainer}>
          <Text style={styles.mapText}>[ Simulador de Mapa de SP ]</Text>
          <View style={styles.pinContainer}>
            <Icon name="place" size={40} color="#00c4b4" />
          </View>
          <View style={styles.mapFooterTextRow}>
            <Text style={styles.mapFooterText}>JARDIM PAULISTA</Text>
            <Text style={styles.mapFooterText}>PARAÍSO</Text>
          </View>
        </View>
      </View>

      {/* Conteúdo Inferior */}
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.infoRow}>
          <View>
            <Text style={styles.addressTitle}>Avenida Paulista</Text>
            <Text style={styles.addressSub}>4 Doações</Text>
          </View>
          <View style={styles.waterBadge}>
            <Text style={styles.waterText}>12 Litros de água</Text>
          </View>
        </View>

        <View style={styles.divider} />

        {/* Lista de Doações */}
        {doacoes.map((item) => (
          <View key={item.id} style={styles.historyCard}>
            <Text style={styles.historyDate}>Doação dia {item.data}</Text>
            <View style={styles.minutesBadge}>
              <Text style={styles.minutesText}>{item.minutos}</Text>
            </View>
          </View>
        ))}

        {/* Botão para voltar */}
        <TouchableOpacity 
          style={styles.backButton} 
          onPress={() => router.push('/events')}
        >
          <Icon name="arrow-back" size={20} color="#00d7c3" />
          <Text style={styles.backButtonText}>Voltar para Eventos</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  header: {
    backgroundColor: '#00d7c3',
    padding: 20,
    paddingTop: 40,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    alignItems: 'center',
    position: 'relative'
  },
  menuIcon: { position: 'absolute', right: 20, top: 40 },
  logoRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 20 },
  logoText: { fontSize: 28, fontWeight: 'bold', color: '#105b5c' },
  mapContainer: {
    backgroundColor: '#e3ece9',
    width: '100%',
    height: 180,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#ccc'
  },
  mapText: { color: '#666', fontSize: 12 },
  pinContainer: { position: 'absolute' },
  mapFooterTextRow: { position: 'absolute', bottom: 10, flexDirection: 'row', justifyContent: 'space-around', width: '100%' },
  mapFooterText: { fontSize: 10, fontWeight: 'bold', color: '#333', backgroundColor: 'rgba(255,255,255,0.7)', paddingHorizontal: 5, borderRadius: 5 },
  content: { padding: 20 },
  infoRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginVertical: 10 },
  addressTitle: { fontSize: 18, fontWeight: 'bold', color: '#333' },
  addressSub: { fontSize: 14, color: '#666' },
  waterBadge: { backgroundColor: '#e2edff', paddingVertical: 8, paddingHorizontal: 15, borderRadius: 20 },
  waterText: { color: '#4d8eff', fontWeight: 'bold', fontSize: 13 },
  divider: { height: 1, backgroundColor: '#eee', marginVertical: 15 },
  historyCard: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#fcfcfc', padding: 15, borderRadius: 12, marginBottom: 10, borderWidth: 1, borderColor: '#f0f0f0' },
  historyDate: { fontSize: 14, color: '#555' },
  minutesBadge: { backgroundColor: '#ffeeda', paddingVertical: 6, paddingHorizontal: 12, borderRadius: 15 },
  minutesText: { color: '#ff991f', fontWeight: 'bold', fontSize: 12 },
  backButton: { flexDirection: 'row', marginTop: 20, alignSelf: 'center', alignItems: 'center', padding: 10 },
  backButtonText: { color: '#00d7c3', fontWeight: 'bold', marginLeft: 8 }
});