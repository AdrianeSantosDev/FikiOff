import React, { useEffect, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Animated,
  Dimensions,
  Platform,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
const theme = {
  colors: {
    textPrimary: "#003F5C", // Azul escuro do FikiOff
    primary: "#149F5F", // Verde do ícone gota
    background: "#ECFBF7", // Fundo claro
    footerBackground: "#0FE0C3", // Fundo ciano do rodapé
    textSecondary: "#757575", // Cinza suave
    loadingRing: "#0FE0C3", // Cor do anel de loading (fino e sólido no Figma)
  },
};

const { width } = Dimensions.get("window");
const CIRCLE_SIZE = 55;

const LogoImage = require("../../assets/fikioff_logo_completo.png");
const AtadosImage = require("../../assets/atados_logo.png");
const CasaOfflineImage = require("../../assets/casa_offline_logo.png");

const LoadingScreen: React.FC = () => {
  const spinValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const timer = setTimeout(() => {
      router.replace('/home');
    }, 2500); // tempo de exibição do loading
    return () => clearTimeout(timer);
  }, []);

  // Interpola o valor da animação para graus de rotação
  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });

  return (
    <SafeAreaView style={styles.root}>
      {/* --- Área Central Principal --- */}
      <View style={styles.centerContainer}>
        <Text style={styles.welcomeText}>Bem vindo ao</Text>

        <Image
          source={LogoImage}
          style={styles.logoImage}
          resizeMode="contain"
        />

        {/* FALLBACK COM TEXTO E ÍCONE GOTA (BASEADO NO SEU LOGO) */}
        {/*<View style={styles.logoContainer}>
          <Text style={styles.brandText}>FikiOff</Text>*/}
          {/* Você pode usar um SVG ou Image aqui para a Gota+L */}
          {/*<View style={styles.dropIconFallback}>
            <Text style={styles.dropText}>💧L</Text>
          </View>
        </View>*/}

        {/* --- Círculo de Carregamento Animado --- */}
        <Animated.View
          style={[
            styles.loadingRingContainer,
            { transform: [{ rotate: spin }] },
          ]}
        >
          {/* Este container tem a borda tracejada de carregamento */}
          <View style={styles.loadingRing} />
        </Animated.View>
      </View>

      {/* --- Área de Rodapé/Parceria --- */}
      <View style={styles.footer}>
        <Text style={styles.initiativeText}>Uma iniciativa</Text>

        <View style={styles.partnersBar}>
          <Image
            source={AtadosImage}
            style={styles.partnerAtados}
            resizeMode="contain"
          />
          {/* FALLBACK ATADOS */}
          {/*<Text style={styles.partnerTextFallback}>✨ATADOS</Text>*/}

          <Image
            source={CasaOfflineImage}
            style={styles.partnerCasa}
            resizeMode="contain"
          />
          {/* FALLBACK CASA OFFLINE */}
          {/*<View style={styles.casaOfflineFallback}>
            <Text style={styles.casaHouseFallback}>🏠</Text>
            <Text style={styles.casaTextFallback}>casa{"\n"}OFFLINE</Text>
          </View>*/}
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  centerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
    marginTop: -50,
  },
  welcomeText: {
    fontSize: 20,
    fontWeight: "400",
    color: theme.colors.textPrimary,
    marginBottom: 10,
    letterSpacing: 0.5,
  },
  logoContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 50,
  },
  brandText: {
    fontSize: 42,
    fontWeight: "bold",
    color: theme.colors.textPrimary,
    letterSpacing: -1,
  },
  dropIconFallback: {
    marginLeft: 15,
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 3,
    borderColor: theme.colors.primary,
    justifyContent: "center",
    alignItems: "center",
  },
  dropText: {
    color: theme.colors.primary,
    fontSize: 24,
    fontWeight: "bold",
  },

  logoImage: {
      width: '70%',
      maxWidth: 335,
      height: 100,
      marginBottom: 50,
    },

  loadingRingContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  loadingRing: {
    width: CIRCLE_SIZE,
    height: CIRCLE_SIZE,
    borderRadius: CIRCLE_SIZE / 2,
    borderWidth: 2,
    borderColor: theme.colors.loadingRing,
    borderStyle: "solid",
  },

  footer: {
    width: "100%",
    position: "absolute",
    bottom: 0,
    paddingBottom: Platform.OS === "ios" ? 20 : 30,
    alignItems: "center",
  },
  initiativeText: {
    fontSize: 16,
    color: theme.colors.textSecondary,
    marginBottom: 15,
    fontWeight: "400",
  },
  partnersBar: {
    width: width - 32, // largura da tela menos 16px de margem de cada lado
    alignSelf: "center",
    backgroundColor: theme.colors.footerBackground,
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 30, // pílula com todos os cantos arredondados
  },
  partnerTextFallback: {
    color: "white",
    fontSize: 18,
    fontWeight: "700",
  },
  casaOfflineFallback: {
    flexDirection: "row",
    alignItems: "center",
  },
  casaHouseFallback: {
    fontSize: 28,
    marginRight: 8,
  },
  casaTextFallback: {
    color: "white",
    fontSize: 12,
    fontWeight: "700",
    textTransform: "uppercase",
    lineHeight: 14,
  },
  partnerAtados: {
    width: '35%',
    maxWidth: 110,     // Limite para não estourar no rodapé
    height: 35,
  },
  partnerCasa: {
    width: '35%',
    maxWidth: 110,
    height: 35,
  },
});

export default LoadingScreen;
