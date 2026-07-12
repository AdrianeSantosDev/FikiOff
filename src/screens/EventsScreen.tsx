import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function EventosScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Icon name="menu" size={30} color="#fff" />
        <View style={styles.logoContainer}>
          <Text style={styles.logoTitle}>casa</Text>
          <Text style={styles.logoSubtitle}>OFFLINE</Text>
        </View>
        <Text style={styles.headerPrompt}>Aproveite para ver eventos</Text>
      </View>

      {/* Conteúdo Principal */}
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.cardsRow}>

          {/* Card 1 */}
          <View style={styles.card}>
            <View style={[styles.cardImagePlaceholder, { backgroundColor: '#1a2e5a' }]}>
              <Text style={styles.cardImageText}>Cronicamente Off-line</Text>
            </View>
            <View style={styles.timerBadge}>
              <Icon name="access-time" size={14} color="#2dcf54" />
              <Text style={styles.timerText}>5 dias para o evento</Text>
            </View>
            <Text style={styles.eventTitle}>Bate-papo Literário</Text>
            <Text style={styles.eventSubtitle}>Clube Cronicamente Offline</Text>
            <View style={styles.infoRow}>
              <Icon name="place" size={16} color="#2dcf54" />
              <Text style={styles.infoText}>Pinheiros</Text>
            </View>
            <View style={styles.infoRow}>
              <Icon name="event" size={16} color="#2dcf54" />
              <Text style={styles.infoText}>Dia 20/06</Text>
            </View>
            <TouchableOpacity style={styles.button}>
              <Icon name="shopping-cart" size={16} color="#105b5c" />
              <Text style={styles.buttonText}>Obter Ingressos</Text>
            </TouchableOpacity>
          </View>

          {/* Card 2 */}
          <View style={styles.card}>
            <View style={[styles.cardImagePlaceholder, { backgroundColor: '#143a27' }]}>
              <Text style={styles.cardImageText}>Jogos de Tabuleiro</Text>
            </View>
            <View style={styles.timerBadge}>
              <Icon name="access-time" size={14} color="#2dcf54" />
              <Text style={styles.timerText}>12 dias para o evento</Text>
            </View>
            <Text style={styles.eventTitle}>Jogos de Tabuleiro</Text>
            <View style={styles.infoRow}>
              <Icon name="place" size={16} color="#2dcf54" />
              <Text style={styles.infoText}>Pinheiros</Text>
            </View>
            <View style={styles.infoRow}>
              <Icon name="event" size={16} color="#2dcf54" />
              <Text style={styles.infoText}>Dia 20/06</Text>
            </View>
            <TouchableOpacity style={styles.button}>
              <Icon name="shopping-cart" size={16} color="#105b5c" />
              <Text style={styles.buttonText}>Obter Ingressos</Text>
            </TouchableOpacity>
          </View>

        </View>

        {/* Botão de navegação para ir à tela do Mapa */}
        <TouchableOpacity
          style={styles.navButton}
          onPress={() => router.push('/map')}
        >
          <Text style={styles.navButtonText}>Ver Mapa / Distribuição</Text>
          <Icon name="arrow-forward" size={20} color="#fff" />
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#e2f4f2' },
  header: {
    backgroundColor: '#00d7c3',
    padding: 20,
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
    alignItems: 'center',
    paddingTop: 40,
  },
  logoContainer: { alignItems: 'center', marginBottom: 10 },
  logoTitle: { fontSize: 16, color: '#000', fontWeight: '300' },
  logoSubtitle: { fontSize: 24, color: '#000', fontWeight: 'bold', letterSpacing: 2 },
  headerPrompt: { color: '#005f56', fontSize: 16, marginTop: 10, fontWeight: '500' },
  content: { padding: 15, alignItems: 'center' },
  cardsRow: { flexDirection: 'row', justifyContent: 'space-between', width: '100%' },
  card: { backgroundColor: '#fff', borderRadius: 15, width: '48%', padding: 10, elevation: 2 },
  cardImagePlaceholder: { height: 80, borderRadius: 10, justifyContent: 'center', alignItems: 'center', padding: 5 },
  cardImageText: { color: '#fff', fontSize: 11, fontWeight: 'bold', textAlign: 'center' },
  timerBadge: { flexDirection: 'row', backgroundColor: '#d4f5dc', padding: 5, borderRadius: 20, alignItems: 'center', marginTop: 8, marginBottom: 8 },
  timerText: { fontSize: 9, color: '#1f7a34', marginLeft: 3, fontWeight: 'bold' },
  eventTitle: { fontSize: 12, fontWeight: 'bold', color: '#333' },
  eventSubtitle: { fontSize: 10, color: '#666', marginBottom: 5 },
  infoRow: { flexDirection: 'row', alignItems: 'center', marginTop: 3 },
  infoText: { fontSize: 11, color: '#444', marginLeft: 5 },
  button: { flexDirection: 'row', backgroundColor: '#bfebe6', padding: 6, borderRadius: 20, justifyContent: 'center', alignItems: 'center', marginTop: 10 },
  buttonText: { fontSize: 10, color: '#105b5c', marginLeft: 5, fontWeight: 'bold' },
  navButton: { flexDirection: 'row', backgroundColor: '#00d7c3', padding: 15, borderRadius: 30, marginTop: 40, alignItems: 'center', justifyContent: 'center', width: '80%' },
  navButtonText: { color: '#fff', fontWeight: 'bold', marginRight: 10 }
});
