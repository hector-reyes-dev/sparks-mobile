import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Dimensions, Animated } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { useFonts } from 'expo-font';
import Svg, { Path } from 'react-native-svg';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

const SparksLogo = () => {
  return (
    <Svg width={131} height={121} viewBox="0 0 131 121" fill="none">
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M0.0869141 62.5064L0.0869141 58.3156C0.0869141 56.4641 1.58722 54.9629 3.43956 54.9629C21.7157 54.9629 37.7748 45.3802 46.8605 30.9718C47.4933 29.9677 48.6081 29.3734 49.7941 29.4086C50.9801 29.4442 52.0613 30.1043 52.6313 31.1445C53.0713 31.9457 54.4417 34.3475 54.9278 35.1945C55.5648 36.31 55.5062 37.6913 54.7811 38.7512C43.5749 55.1155 24.754 65.859 3.43956 65.859C1.58722 65.859 0.0869141 64.3579 0.0869141 62.5064Z"
        fill="#C9CACF"
      />
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M130.914 58.4937V62.6845C130.914 64.536 129.413 66.0372 127.561 66.0372C109.423 66.0372 93.4729 75.4728 84.3537 89.6964C83.7335 90.6657 82.6565 91.2478 81.504 91.2394C80.3557 91.2306 79.287 90.6322 78.6835 89.6541C78.1345 88.7694 77.0533 86.9171 76.2906 85.6917C75.5866 84.5576 75.6201 83.1135 76.3786 82.0155C87.6058 65.7824 106.351 55.1411 127.561 55.1411C129.413 55.1411 130.914 56.6422 130.914 58.4937Z"
        fill="#C9CACF"
      />
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M0.0891266 62.5064L0.0891266 58.3155C0.0891266 56.464 1.58944 54.9629 3.44177 54.9629C37.7603 54.9629 65.625 82.8267 65.625 117.147C65.625 118.999 64.1247 120.5 62.2723 120.5H58.0815C56.2292 120.5 54.7289 118.999 54.7289 117.147C54.7289 88.8405 31.7465 65.859 3.44177 65.859C1.58944 65.859 0.0891266 64.3583 0.0891266 62.5064Z"
        fill="white"
      />
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M130.913 58.4936V62.6845C130.913 64.536 129.413 66.0371 127.56 66.0371C93.2417 66.0371 65.377 38.1733 65.377 3.85265C65.377 2.00115 66.8773 0.5 68.7296 0.5L72.9204 0.5C74.7728 0.5 76.2731 2.00115 76.2731 3.85265C76.2731 32.1595 99.2555 55.141 127.56 55.141C129.413 55.141 130.913 56.6417 130.913 58.4936Z"
        fill="white"
      />
    </Svg>
  );
};

export default function SplashScreen() {
  const router = useRouter();
  const fadeAnim = useRef(new Animated.Value(1)).current;

  const [fontsLoaded] = useFonts({
    'InstrumentSerif-Regular': require('../assets/fonts/InstrumentSerif-Regular.ttf'),
    'InstrumentSerif-Italic': require('../assets/fonts/InstrumentSerif-Italic.ttf'),
  });

  useEffect(() => {
    if (!fontsLoaded) {
      return;
    }
    // Simular tiempo de carga de 2 segundos, luego fade out
    const timer = setTimeout(() => {
      // Iniciar fade out
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 500, // 500ms de fade out
        useNativeDriver: true,
      }).start(() => {
        // Navegar después del fade out
        router.replace('/');
      });
    }, 2000);

    return () => clearTimeout(timer);
  }, [router, fadeAnim, fontsLoaded]);

  if (!fontsLoaded) {
    return (
      <LinearGradient
        colors={['#7584F0', '#495BD9']}
        style={styles.container}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
      >
        <View style={styles.logoContainer}>
          <SparksLogo />
        </View>
      </LinearGradient>
    );
  }

  return (
    <Animated.View style={[styles.animatedContainer, { opacity: fadeAnim }]}>
      <LinearGradient
        colors={['#7584F0', '#495BD9']}
        style={styles.container}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
      >
        <View style={styles.logoContainer}>
          <SparksLogo />
          <Text style={styles.sparksText}>Sparks</Text>
        </View>
      </LinearGradient>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  animatedContainer: {
    flex: 1,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: screenWidth,
    height: screenHeight,
  },
  logoContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    gap: 24,
  },
  sparksText: {
    fontSize: 64,
    lineHeight: 83,
    letterSpacing: -0.64,
    color: '#FFFFFF',
    fontFamily: 'InstrumentSerif-Regular', // Fuente Instrument Serif del diseño de Figma
    fontWeight: '400',
  },
});