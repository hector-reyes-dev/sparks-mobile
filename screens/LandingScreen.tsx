import React, { useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  Dimensions,
  StatusBar,
} from 'react-native';
import { useRouter } from 'expo-router';
import { useSupabaseAuth } from '../hooks/useSupabaseAuth';
import { Button } from '../components/ui/Button';
import { Card, CardContent, CardHeader } from '../components/ui/Card';
import { Colors } from '../constants/Colors';

const { width } = Dimensions.get('window');

const LandingScreen = () => {
  const router = useRouter();
  const { session, loading } = useSupabaseAuth();

  // Redirect to dashboard if already authenticated
  useEffect(() => {
    if (!loading && session) {
      router.replace('/dashboard');
    }
  }, [loading, session, router]);

  const features = [
    {
      icon: '📚',
      title: 'Daily English Practice',
      description: 'Get a new thought-provoking question every day to improve your English writing skills.',
    },
    {
      icon: '🤖',
      title: 'AI-Powered Feedback',
      description: 'Receive detailed feedback on structure, vocabulary, and grammar from advanced AI.',
    },
    {
      icon: '📈',
      title: 'Progress Tracking',
      description: 'Monitor your improvement over time with detailed analytics and streak tracking.',
    },
    {
      icon: '🎯',
      title: 'Career-Focused Content',
      description: 'Questions designed specifically for professional English communication.',
    },
    {
      icon: '⏰',
      title: 'Flexible Learning',
      description: 'Practice at your own pace with questions that fit your schedule.',
    },
    {
      icon: '🏆',
      title: 'Achievement System',
      description: 'Build streaks and track your longest learning periods for motivation.',
    },
  ];

  const benefits = [
    'Improve professional English communication',
    'Build confidence in writing',
    'Develop critical thinking skills',
    'Track your learning progress',
    'Get personalized AI feedback',
    'Build consistent learning habits',
  ];

  if (loading) {
    return (
      <SafeAreaView style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Loading...</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={Colors.light.background} />
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerContent}>
            <View style={styles.logo}>
              <Text style={styles.logoIcon}>⚡</Text>
              <Text style={styles.logoText}>Career English Spark</Text>
            </View>
            <View style={styles.headerButtons}>
              <Button
                title="Login"
                variant="ghost"
                size="sm"
                onPress={() => router.push('/auth?mode=login')}
              />
              <Button
                title="Get Started"
                size="sm"
                onPress={() => router.push('/auth?mode=register')}
              />
            </View>
          </View>
        </View>

        {/* Hero Section */}
        <View style={styles.hero}>
          <View style={styles.badge}>
            <Text style={styles.badgeText}>✨ AI-Powered English Learning Platform</Text>
          </View>
          <Text style={styles.heroTitle}>
            Master Professional English{'\n'}
            <Text style={styles.heroTitleAccent}>One Question at a Time</Text>
          </Text>
          <Text style={styles.heroDescription}>
            Boost your career with daily English practice. Get personalized AI feedback,
            track your progress, and build confidence in professional communication.
          </Text>
          <View style={styles.heroButtons}>
            <Button
              title="Start Learning Today"
              size="lg"
              onPress={() => router.push('/auth?mode=register')}
              style={styles.heroButton}
            />
            <Button
              title="Sign In"
              variant="outline"
              size="lg"
              onPress={() => router.push('/auth?mode=login')}
              style={styles.heroButton}
            />
          </View>
        </View>

        {/* Features Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Everything You Need to Excel</Text>
          <Text style={styles.sectionDescription}>
            Our comprehensive platform combines AI technology with proven learning methods
          </Text>
          
          <View style={styles.featuresGrid}>
            {features.map((feature, index) => (
              <Card key={index} style={styles.featureCard}>
                <CardHeader>
                  <View style={styles.featureIcon}>
                    <Text style={styles.featureIconText}>{feature.icon}</Text>
                  </View>
                  <Text style={styles.featureTitle}>{feature.title}</Text>
                </CardHeader>
                <CardContent>
                  <Text style={styles.featureDescription}>{feature.description}</Text>
                </CardContent>
              </Card>
            ))}
          </View>
        </View>

        {/* Benefits Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Why Choose Career English Spark?</Text>
          <Text style={styles.sectionDescription}>
            Our platform is designed specifically for professionals who want to improve
            their English communication skills and advance their careers.
          </Text>
          
          <View style={styles.benefitsList}>
            {benefits.map((benefit, index) => (
              <View key={index} style={styles.benefitItem}>
                <Text style={styles.benefitIcon}>✅</Text>
                <Text style={styles.benefitText}>{benefit}</Text>
              </View>
            ))}
          </View>

          <View style={styles.statsGrid}>
            <Card style={styles.statCard}>
              <Text style={styles.statNumber}>1000+</Text>
              <Text style={styles.statLabel}>Practice Questions</Text>
            </Card>
            <Card style={styles.statCard}>
              <Text style={styles.statNumber}>AI</Text>
              <Text style={styles.statLabel}>Powered Feedback</Text>
            </Card>
            <Card style={styles.statCard}>
              <Text style={styles.statNumber}>24/7</Text>
              <Text style={styles.statLabel}>Available</Text>
            </Card>
            <Card style={styles.statCard}>
              <Text style={styles.statNumber}>∞</Text>
              <Text style={styles.statLabel}>Learning Progress</Text>
            </Card>
          </View>
        </View>

        {/* CTA Section */}
        <View style={styles.ctaSection}>
          <Text style={styles.ctaTitle}>Ready to Transform Your English Skills?</Text>
          <Text style={styles.ctaDescription}>
            Join thousands of professionals who are already improving their English
            communication skills with our AI-powered platform.
          </Text>
          <Button
            title="Start Your Journey Today"
            size="lg"
            onPress={() => router.push('/auth?mode=register')}
            style={styles.ctaButton}
          />
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <View style={styles.footerLogo}>
            <Text style={styles.footerLogoIcon}>⚡</Text>
            <Text style={styles.footerLogoText}>Career English Spark</Text>
          </View>
          <Text style={styles.footerText}>
            Empowering professionals to excel in English communication
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.light.background,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 18,
    color: Colors.light.textSecondary,
  },
  scrollView: {
    flex: 1,
  },
  header: {
    backgroundColor: Colors.light.surface,
    borderBottomWidth: 1,
    borderBottomColor: Colors.light.border,
    paddingVertical: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  logo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logoIcon: {
    fontSize: 24,
    marginRight: 8,
    color: Colors.light.primary,
  },
  logoText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.light.text,
  },
  headerButtons: {
    flexDirection: 'row',
    gap: 8,
  },
  hero: {
    paddingHorizontal: 20,
    paddingVertical: 40,
    alignItems: 'center',
  },
  badge: {
    backgroundColor: Colors.light.borderLight,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginBottom: 24,
  },
  badgeText: {
    fontSize: 14,
    color: Colors.light.textSecondary,
    fontWeight: '500',
  },
  heroTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
    color: Colors.light.text,
    marginBottom: 16,
    lineHeight: 40,
  },
  heroTitleAccent: {
    color: Colors.light.primary,
  },
  heroDescription: {
    fontSize: 18,
    color: Colors.light.textSecondary,
    textAlign: 'center',
    lineHeight: 26,
    marginBottom: 32,
    paddingHorizontal: 20,
  },
  heroButtons: {
    width: '100%',
    gap: 12,
  },
  heroButton: {
    width: '100%',
  },
  section: {
    paddingHorizontal: 20,
    paddingVertical: 40,
  },
  sectionTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    color: Colors.light.text,
    marginBottom: 16,
  },
  sectionDescription: {
    fontSize: 18,
    color: Colors.light.textSecondary,
    textAlign: 'center',
    lineHeight: 26,
    marginBottom: 32,
  },
  featuresGrid: {
    gap: 16,
  },
  featureCard: {
    width: '100%',
  },
  featureIcon: {
    width: 48,
    height: 48,
    backgroundColor: Colors.light.borderLight,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  featureIconText: {
    fontSize: 24,
  },
  featureTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.light.text,
    marginBottom: 8,
  },
  featureDescription: {
    fontSize: 16,
    color: Colors.light.textSecondary,
    lineHeight: 24,
  },
  benefitsList: {
    marginBottom: 32,
  },
  benefitItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  benefitIcon: {
    fontSize: 16,
    marginRight: 12,
  },
  benefitText: {
    fontSize: 16,
    color: '#1f2937',
    flex: 1,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    justifyContent: 'space-between',
  },
  statCard: {
    width: (width - 60) / 2,
    alignItems: 'center',
    paddingVertical: 20,
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#007AFF',
    marginBottom: 8,
  },
  statLabel: {
    fontSize: 14,
    color: '#6b7280',
    textAlign: 'center',
  },
  ctaSection: {
    backgroundColor: Colors.light.primary,
    paddingHorizontal: 20,
    paddingVertical: 40,
    alignItems: 'center',
  },
  ctaTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 16,
  },
  ctaDescription: {
    fontSize: 18,
    color: 'rgba(255, 255, 255, 0.9)',
    textAlign: 'center',
    lineHeight: 26,
    marginBottom: 32,
  },
  ctaButton: {
    backgroundColor: '#fff',
    width: '100%',
  },
  footer: {
    paddingHorizontal: 20,
    paddingVertical: 40,
    backgroundColor: '#f9fafb',
    alignItems: 'center',
  },
  footerLogo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  footerLogoIcon: {
    fontSize: 20,
    marginRight: 8,
  },
  footerLogoText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1f2937',
  },
  footerText: {
    fontSize: 14,
    color: '#6b7280',
    textAlign: 'center',
  },
});

export default LandingScreen;