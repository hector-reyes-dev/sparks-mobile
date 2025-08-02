import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Alert,
  SafeAreaView,
  StatusBar,
  TextInput,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Colors } from '../constants/Colors';

export default function DashboardPage() {
  const router = useRouter();
  const [currentStreak] = useState(5);
  const [longestStreak] = useState(16);
  const [totalAnswers] = useState(58);
  const [answer, setAnswer] = useState('');

  const todayQuestion = 'What book or movie has influenced you the most?';

  const handleSignOut = () => {
    Alert.alert(
      'Sign Out',
      'Are you sure you want to sign out?',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Sign Out', 
          style: 'destructive',
          onPress: () => router.replace('/') 
        }
      ]
    );
  };

  const handleGetFeedback = () => {
    if (!answer.trim()) {
      Alert.alert(
        'No Answer',
        'Please write your answer before getting feedback.',
        [{ text: 'OK' }]
      );
      return;
    }
    
    Alert.alert(
      'Feedback',
      'Great answer! Your response shows thoughtful reflection. Consider adding more specific examples to strengthen your points.',
      [{ text: 'Thanks!' }]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={Colors.light.background} />
      
      <ScrollView style={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        {/* Status Bar */}
        <View style={styles.statusBar}>
          <Text style={styles.timeText}>5:13</Text>
          <View style={styles.statusIcons}>
            <Text style={styles.statusIcon}>📶</Text>
            <Text style={styles.statusIcon}>📶</Text>
            <Text style={styles.batteryText}>76</Text>
          </View>
        </View>

        {/* Header */}
        <View style={styles.header}>
          <View style={styles.avatarGreeting}>
            <View style={styles.avatar} />
            <View style={styles.greeting}>
              <Text style={styles.welcomeText}>Hello Carol</Text>
              <View style={styles.sparkContainer}>
                <Text style={styles.sparkText}>Your Daily Spark</Text>
                <View style={styles.sparkIconContainer}>
                  <Text style={styles.sparkEmoji}>✨</Text>
                </View>
              </View>
            </View>
          </View>
          <TouchableOpacity style={styles.bellIcon} onPress={handleSignOut}>
            <Text style={styles.bellEmoji}>🔔</Text>
          </TouchableOpacity>
        </View>

        {/* Stats Cards */}
        <View style={styles.statsContainer}>
          <View style={styles.statCard}>
            <View style={styles.statIconNumber}>
              <Text style={styles.statNumber}>{currentStreak}</Text>
              <View style={styles.statIcon}>
                <Text style={styles.statEmoji}>✅</Text>
              </View>
            </View>
            <Text style={styles.statLabel}>Current Streak</Text>
          </View>

          <View style={styles.statCard}>
            <View style={styles.statIconNumber}>
              <Text style={styles.statNumber}>{longestStreak}</Text>
              <View style={styles.statIcon}>
                <Text style={styles.statEmoji}>🌊</Text>
              </View>
            </View>
            <Text style={styles.statLabel}>Longest Streak</Text>
          </View>

          <View style={styles.statCard}>
            <View style={styles.statIconNumber}>
              <Text style={styles.statNumber}>{totalAnswers}</Text>
              <View style={styles.statIcon}>
                <Text style={styles.statEmoji}>✏️</Text>
              </View>
            </View>
            <Text style={styles.statLabel}>Total Answers</Text>
          </View>
        </View>

        {/* Question Card */}
        <View style={styles.questionCard}>
          <View style={styles.questionHeader}>
            <Text style={styles.questionBadge}>Today&apos;s Spark</Text>
          </View>
          
          <Text style={styles.questionText}>{todayQuestion}</Text>
          
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.answerInput}
              placeholder="Write your answer here..."
              placeholderTextColor={Colors.light.textMuted}
              value={answer}
              onChangeText={setAnswer}
              multiline
              numberOfLines={4}
              textAlignVertical="top"
            />
          </View>

          <TouchableOpacity style={styles.feedbackButton} onPress={handleGetFeedback}>
            <View style={styles.feedbackButtonContent}>
              <View style={styles.feedbackIcon}>
                <Text style={styles.feedbackEmoji}>✨</Text>
              </View>
              <Text style={styles.feedbackButtonText}>Get Feedback</Text>
            </View>
          </TouchableOpacity>
        </View>

        {/* Bottom Navigation */}
        <View style={styles.bottomNav}>
          <View style={styles.navMenu}>
            <TouchableOpacity style={styles.navItem}>
              <Text style={styles.navEmoji}>✨</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.navItem}>
              <Text style={styles.navEmoji}>📅</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.light.background,
  },
  scrollContainer: {
    flex: 1,
  },
  statusBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingTop: 8,
    paddingBottom: 16,
  },
  timeText: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.light.text,
  },
  statusIcons: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  statusIcon: {
    fontSize: 12,
  },
  batteryText: {
    fontSize: 12,
    color: Colors.light.text,
    marginLeft: 4,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingBottom: 24,
  },
  avatarGreeting: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: Colors.light.primary,
    marginRight: 12,
  },
  greeting: {
    flex: 1,
  },
  welcomeText: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.light.text,
    marginBottom: 4,
  },
  sparkContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  sparkText: {
    fontSize: 14,
    color: Colors.light.textSecondary,
    marginRight: 6,
  },
  sparkIconContainer: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: Colors.light.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sparkEmoji: {
    fontSize: 10,
  },
  bellIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.light.surface,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  bellEmoji: {
    fontSize: 18,
  },
  statsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 24,
    gap: 12,
    marginBottom: 24,
  },
  statCard: {
    flex: 1,
    backgroundColor: Colors.light.surface,
    padding: 20,
    borderRadius: 24,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  statIconNumber: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.light.textSecondary,
    marginRight: 8,
  },
  statIcon: {
    width: 20,
    height: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  statEmoji: {
    fontSize: 16,
  },
  statLabel: {
    fontSize: 12,
    color: Colors.light.text,
    textAlign: 'center',
    fontWeight: '600',
  },
  questionCard: {
    margin: 24,
    marginTop: 0,
    backgroundColor: Colors.light.surface,
    borderRadius: 24,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 4,
    borderWidth: 1,
    borderColor: Colors.light.borderLight,
  },
  questionHeader: {
    marginBottom: 16,
  },
  questionBadge: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.light.text,
  },
  questionText: {
    fontSize: 18,
    color: Colors.light.textSecondary,
    lineHeight: 26,
    marginBottom: 24,
    fontWeight: '500',
  },
  inputContainer: {
    backgroundColor: Colors.light.background,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: Colors.light.border,
    marginBottom: 20,
  },
  answerInput: {
    padding: 20,
    fontSize: 16,
    color: Colors.light.text,
    minHeight: 100,
  },
  feedbackButton: {
    backgroundColor: Colors.light.secondary,
    borderRadius: 16,
    shadowColor: Colors.light.secondary,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
    borderWidth: 1,
    borderColor: Colors.light.secondary,
  },
  feedbackButtonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    paddingHorizontal: 20,
  },
  feedbackIcon: {
    marginRight: 8,
  },
  feedbackEmoji: {
    fontSize: 16,
  },
  feedbackButtonText: {
    color: Colors.light.surface,
    fontSize: 16,
    fontWeight: '600',
  },
  bottomNav: {
    backgroundColor: Colors.light.surface,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingVertical: 20,
    paddingHorizontal: 24,
    marginTop: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: -2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  navMenu: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 40,
  },
  navItem: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: Colors.light.background,
    alignItems: 'center',
    justifyContent: 'center',
  },
  navEmoji: {
    fontSize: 20,
  },
});