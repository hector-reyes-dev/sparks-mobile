import { useRouter } from "expo-router";
import React from "react";
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Colors } from "../constants/Colors";

export default function Index() {
  const router = useRouter();

  const handleGetStarted = () => {
    router.push("/auth");
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor={Colors.light.background}
      />

      {/* Hero Section */}
      <View style={styles.heroSection}>
        <View style={styles.sparkIcon}>
          <Text style={styles.sparkEmoji}>✨</Text>
        </View>

        <Text style={styles.title}>English Spark</Text>
        <Text style={styles.subtitle}>Your Daily English Practice</Text>

        <Text style={styles.description}>
          Improve your English skills with daily questions designed to spark
          meaningful conversations and boost your confidence.
        </Text>
      </View>

      {/* Features */}
      <View style={styles.featuresSection}>
        <View style={styles.feature}>
          <View style={styles.featureIcon}>
            <Text style={styles.featureEmoji}>📝</Text>
          </View>
          <View style={styles.featureContent}>
            <Text style={styles.featureTitle}>Daily Questions</Text>
            <Text style={styles.featureDescription}>
              Practice with thoughtful questions every day
            </Text>
          </View>
        </View>

        <View style={styles.feature}>
          <View style={styles.featureIcon}>
            <Text style={styles.featureEmoji}>🔥</Text>
          </View>
          <View style={styles.featureContent}>
            <Text style={styles.featureTitle}>Track Progress</Text>
            <Text style={styles.featureDescription}>
              Build streaks and monitor your improvement
            </Text>
          </View>
        </View>

        <View style={styles.feature}>
          <View style={styles.featureIcon}>
            <Text style={styles.featureEmoji}>🎯</Text>
          </View>
          <View style={styles.featureContent}>
            <Text style={styles.featureTitle}>Get Feedback</Text>
            <Text style={styles.featureDescription}>
              Receive personalized feedback on your answers
            </Text>
          </View>
        </View>
      </View>

      {/* CTA Button */}
      <View style={styles.ctaSection}>
        <TouchableOpacity
          style={styles.getStartedButton}
          onPress={handleGetStarted}
        >
          <Text style={styles.getStartedButtonText}>Get Started</Text>
        </TouchableOpacity>

        <Text style={styles.footerText}>
          Start your English learning journey today
        </Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.light.background,
  },
  heroSection: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 24,
    paddingTop: 60,
  },
  sparkIcon: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: Colors.light.primary,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 24,
    shadowColor: Colors.light.primary,
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 8,
  },
  sparkEmoji: {
    fontSize: 32,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: Colors.light.text,
    marginBottom: 8,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 18,
    color: Colors.light.textSecondary,
    marginBottom: 24,
    textAlign: "center",
  },
  description: {
    fontSize: 16,
    color: Colors.light.textMuted,
    textAlign: "center",
    lineHeight: 24,
    maxWidth: 300,
  },
  featuresSection: {
    paddingHorizontal: 24,
    paddingVertical: 32,
    gap: 20,
  },
  feature: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.light.surface,
    padding: 20,
    borderRadius: 16,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  featureIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: Colors.light.background,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 16,
  },
  featureEmoji: {
    fontSize: 20,
  },
  featureContent: {
    flex: 1,
  },
  featureTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: Colors.light.text,
    marginBottom: 4,
  },
  featureDescription: {
    fontSize: 14,
    color: Colors.light.textSecondary,
    lineHeight: 20,
  },
  ctaSection: {
    paddingHorizontal: 24,
    paddingBottom: 40,
    alignItems: "center",
  },
  getStartedButton: {
    backgroundColor: Colors.light.primary,
    paddingVertical: 16,
    paddingHorizontal: 48,
    borderRadius: 16,
    shadowColor: Colors.light.primary,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
    marginBottom: 16,
  },
  getStartedButtonText: {
    color: Colors.light.surface,
    fontSize: 16,
    fontWeight: "600",
    textAlign: "center",
  },
  footerText: {
    fontSize: 14,
    color: Colors.light.textMuted,
    textAlign: "center",
  },
});
