import React, { useEffect, useRef } from 'react';
import { Animated, Easing, Pressable, StyleSheet, Text, View } from 'react-native';
import { WATERCOLOR_THEME as theme } from '../theme';

interface Props {
  isOffline: boolean;
  onPress: () => void;
}

export default function MainButton({ isOffline, onPress }: Props) {
  const pulseAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const fillButton = useRef(new Animated.Value(0)).current; // Controla a subida da água
  const waveRotateAnim = useRef(new Animated.Value(0)).current; // Controla o balanço da água
  
  const loopPulseRef = useRef<Animated.CompositeAnimation | null>(null);
  const loopWaveRef = useRef<Animated.CompositeAnimation | null>(null);

  // 1. Controle do Pulso Externo
  useEffect(() => {
    if (isOffline) {
      loopPulseRef.current = Animated.loop(
        Animated.sequence([
          Animated.timing(pulseAnim, {
            toValue: 1,
            duration: 2500,
            easing: Easing.out(Easing.ease),
            useNativeDriver: true,
          }),
          Animated.timing(pulseAnim, {
            toValue: 0,
            duration: 0,
            useNativeDriver: true,
          }),
        ])
      );
      loopPulseRef.current.start();
    } else {
      loopPulseRef.current?.stop();
      pulseAnim.setValue(0);
    }
    return () => loopPulseRef.current?.stop();
  }, [isOffline, pulseAnim]);

  // 2. Controle da Rotação Contínua e da SUBIDA da Água
  useEffect(() => {
    if (isOffline) {
      // Inicia o giro infinito da onda
      loopWaveRef.current = Animated.loop(
        Animated.timing(waveRotateAnim, {
          toValue: 1,
          duration: 3500,
          easing: Easing.linear,
          useNativeDriver: true,
        })
      );
      loopWaveRef.current.start();

      Animated.timing(fillButton, {
        toValue: 1,
        duration: 5000,
        easing: Easing.out(Easing.ease),
        useNativeDriver: true,
      }).start();

    } else {
      // Para o giro e ESVAZIA o botão
      loopWaveRef.current?.stop();
      waveRotateAnim.setValue(0);
      
      Animated.timing(fillButton, {
        toValue: 0,
        duration: 400,
        easing: Easing.inOut(Easing.ease),
        useNativeDriver: true,
      }).start();
    }

    return () => loopWaveRef.current?.stop();
  }, [isOffline, waveRotateAnim, fillButton]);

  const pulseScale = pulseAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 1.4],
  });
  const pulseOpacity = pulseAnim.interpolate({
    inputRange: [0, 0.4, 1],
    outputRange: [0.6, 0.3, 0],
  });

  const waveRotate = waveRotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  const waveTranslateY = fillButton.interpolate({
    inputRange: [0, 1],
    outputRange: [SIZE, -SIZE * 0.4], // Começa totalmente abaixo do botão e sobe cobrindo tudo
  });

  const handlePressIn = () => {
    Animated.spring(scaleAnim, { toValue: 0.96, useNativeDriver: true }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleAnim, { toValue: 1, useNativeDriver: true }).start();
  };

  return (
    <View style={styles.container}>
      {/* Pulso Externo */}
      {isOffline && (
        <Animated.View
          style={[
            styles.pulseRing,
            { transform: [{ scale: pulseScale }], opacity: pulseOpacity },
          ]}
        />
      )}
      
      <View style={[styles.outerRing, isOffline && styles.outerRingActive]} />

      <Pressable
        onPress={onPress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        style={({ pressed }) => [
          styles.button,
          pressed && styles.buttonPressed,
        ]}
      >
        {/* Máscara Circular para a Onda */}
        <View style={styles.waveMask}>
          <Animated.View
            style={[
              styles.wave,
              {
                transform: [
                  { translateY: waveTranslateY },
                  { rotate: waveRotate }
                ],
              },
            ]}
          />
        </View>

        {/* Conteúdo do Botão (Z-Index alto para ficar por cima da água) */}
        <Animated.View style={{ transform: [{ scale: scaleAnim }], alignItems: 'center', zIndex: 10 }}>
          <Text style={[styles.icon, isOffline && styles.iconActive]}>
            {isOffline ? '💧' : '🌱'}
          </Text>
          <Text style={[styles.label, isOffline && styles.labelActive]}>
            {isOffline ? 'VOLTAR ONLINE' : 'FICAR OFFLINE'}
          </Text>
        </Animated.View>
      </Pressable>
    </View>
  );
}

const SIZE = theme.sizes.mainButton;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  pulseRing: {
    position: 'absolute',
    width: SIZE + 20,
    height: SIZE + 20,
    borderRadius: (SIZE + 20) / 2,
    borderWidth: 2,
    borderColor: theme.colors.activePulse,
  },
  outerRing: {
    position: 'absolute',
    width: SIZE + 20,
    height: SIZE + 20,
    borderRadius: (SIZE + 20) / 2,
    borderWidth: 1.5,
    borderColor: theme.colors.buttonBorder,
  },
  outerRingActive: {
    borderColor: theme.colors.primary,
  },
  button: {
    width: SIZE,
    height: SIZE,
    borderRadius: SIZE / 2,
    backgroundColor: theme.colors.buttonBg,
    borderWidth: 1,
    borderColor: theme.colors.buttonBorder,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden', 
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  buttonPressed: {
    backgroundColor: theme.colors.buttonPressed,
  },
  waveMask: {
    ...StyleSheet.absoluteFill,
    borderRadius: SIZE / 2,
    overflow: 'hidden',
    backgroundColor: 'transparent',
  },
  wave: {
    position: 'absolute',
    backgroundColor: theme.colors.primary,
    opacity: 1,
    width: SIZE * 2.2, // Um pouco maior para não cortar as quinas brancas no giro
    height: SIZE * 2.2,
    left: -SIZE * 0.6, // Ajuste fino de centralização do quadrado
    bottom: -SIZE * 1.5, // Começa bem posicionado abaixo da linha de visão
    borderRadius: SIZE * 0.85, 
  },
  icon: {
    fontSize: 42,
    color: theme.colors.iconInactive,
  },
  iconActive: {
    color: theme.colors.iconActive,
  },
  label: {
    fontSize: 11,
    fontWeight: '700',
    color: theme.colors.labelInactive,
    letterSpacing: 1.2,
    marginTop: 8,
  },
  labelActive: {
    color: theme.colors.labelActive,
  },
});