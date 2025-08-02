import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Alert,
  RefreshControl,
  TextInput,
  Dimensions,
  StatusBar,
} from 'react-native';
import { useRouter } from 'expo-router';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { format } from 'date-fns';
import { useSupabaseAuth } from '../hooks/useSupabaseAuth';
import { useDailyQuestion, useUserStats, useSubmitAnswer } from '../hooks/useDailyQuestion';
import { Button } from '../components/ui/Button';
import { Card, CardContent, CardHeader } from '../components/ui/Card';
import { Colors } from '../constants/Colors';

const { width } = Dimensions.get('window');

const answerSchema = z.object({
  answer: z.string().min(10, 'Answer must be at least 10 characters long'),
});

type AnswerFormData = z.infer<typeof answerSchema>;

const DashboardScreen = () => {
  const router = useRouter();
  const { session, signOut } = useSupabaseAuth();
  const { data: question, isLoading: questionLoading, refetch: refetchQuestion } = useDailyQuestion();
  const { data: stats, isLoading: statsLoading, refetch: refetchStats } = useUserStats();
  const submitAnswerMutation = useSubmitAnswer();
  
  const [view, setView] = useState<'question' | 'progress'>('question');
  const [refreshing, setRefreshing] = useState(false);
  const [hasAnsweredToday, setHasAnsweredToday] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm<AnswerFormData>({
    resolver: zodResolver(answerSchema),
  });

  const answerValue = watch('answer', '');

  // Check if user has already answered today's question
  useEffect(() => {
    if (question && stats?.last_answer_date) {
      const today = format(new Date(), 'yyyy-MM-dd');
      const lastAnswerDate = format(new Date(stats.last_answer_date), 'yyyy-MM-dd');
      setHasAnsweredToday(today === lastAnswerDate);
    }
  }, [question, stats]);

  // Redirect to auth if not authenticated
  useEffect(() => {
    if (!session) {
      router.replace('/auth');
    }
  }, [session, router]);

  const onRefresh = async () => {
    setRefreshing(true);
    try {
      await Promise.all([refetchQuestion(), refetchStats()]);
    } catch (error) {
      console.error('Error refreshing data:', error);
    } finally {
      setRefreshing(false);
    }
  };

  const onSubmitAnswer = async (data: AnswerFormData) => {
    if (!question) return;

    try {
      await submitAnswerMutation.mutateAsync({
        questionId: question.id,
        answer: data.answer,
      });

      Alert.alert(
        'Success!',
        'Your answer has been submitted successfully. AI feedback is being generated.',
        [
          {
            text: 'View Progress',
            onPress: () => setView('progress'),
          },
          {
            text: 'OK',
            style: 'default',
          },
        ]
      );

      reset();
      setHasAnsweredToday(true);
      refetchStats();
    } catch (error) {
      Alert.alert(
        'Error',
        'Failed to submit your answer. Please try again.'
      );
    }
  };

  const handleSignOut = async () => {
    Alert.alert(
      'Sign Out',
      'Are you sure you want to sign out?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Sign Out',
          style: 'destructive',
          onPress: async () => {
            await signOut();
            router.replace('/');
          },
        },
      ]
    );
  };

  if (!session) {
    return null;
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={Colors.light.background} />
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Text style={styles.logoIcon}>⚡</Text>
          <View>
            <Text style={styles.headerTitle}>Career English Spark</Text>
            <Text style={styles.headerSubtitle}>
              Welcome back, {session.user.email?.split('@')[0]}!
            </Text>
          </View>
        </View>
        <Button
          title="Sign Out"
          variant="ghost"
          size="sm"
          onPress={handleSignOut}
        />
      </View>

      {/* Navigation Tabs */}
      <View style={styles.tabs}>
        <Button
          title="Today's Question"
          variant={view === 'question' ? 'primary' : 'ghost'}
          size="sm"
          onPress={() => setView('question')}
          style={[styles.tab, view === 'question' && styles.activeTab]}
        />
        <Button
          title="Progress"
          variant={view === 'progress' ? 'primary' : 'ghost'}
          size="sm"
          onPress={() => setView('progress')}
          style={[styles.tab, view === 'progress' && styles.activeTab]}
        />
      </View>

      <ScrollView
        style={styles.content}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        showsVerticalScrollIndicator={false}
      >
        {view === 'question' ? (
          <View style={styles.questionView}>
            {/* Stats Cards */}
            <View style={styles.statsGrid}>
              <Card style={styles.statCard}>
                <CardContent style={styles.statContent}>
                  <Text style={styles.statNumber}>
                    {statsLoading ? '...' : stats?.current_streak || 0}
                  </Text>
                  <Text style={styles.statLabel}>Current Streak</Text>
                </CardContent>
              </Card>
              <Card style={styles.statCard}>
                <CardContent style={styles.statContent}>
                  <Text style={styles.statNumber}>
                    {statsLoading ? '...' : stats?.longest_streak || 0}
                  </Text>
                  <Text style={styles.statLabel}>Longest Streak</Text>
                </CardContent>
              </Card>
              <Card style={styles.statCard}>
                <CardContent style={styles.statContent}>
                  <Text style={styles.statNumber}>
                    {statsLoading ? '...' : stats?.total_answers || 0}
                  </Text>
                  <Text style={styles.statLabel}>Total Answers</Text>
                </CardContent>
              </Card>
              <Card style={styles.statCard}>
                <CardContent style={styles.statContent}>
                  <Text style={styles.statNumber}>
                    {statsLoading ? '...' : Math.round(stats?.average_score || 0)}
                  </Text>
                  <Text style={styles.statLabel}>Avg Score</Text>
                </CardContent>
              </Card>
            </View>

            {/* Daily Question */}
            {questionLoading ? (
              <Card style={styles.questionCard}>
                <CardContent>
                  <Text style={styles.loadingText}>Loading today's question...</Text>
                </CardContent>
              </Card>
            ) : question ? (
              <Card style={styles.questionCard}>
                <CardHeader>
                  <View style={styles.questionHeader}>
                    <Text style={styles.questionDate}>
                      {format(new Date(), 'EEEE, MMMM d, yyyy')}
                    </Text>
                    <View style={styles.questionBadge}>
                      <Text style={styles.questionBadgeText}>Daily Question</Text>
                    </View>
                  </View>
                </CardHeader>
                <CardContent>
                  <Text style={styles.questionText}>{question.question}</Text>
                  
                  {hasAnsweredToday ? (
                    <View style={styles.completedContainer}>
                      <Text style={styles.completedIcon}>✅</Text>
                      <Text style={styles.completedText}>
                        Great job! You&apos;ve already answered today&apos;s question.
                      </Text>
                      <Button
                        title="View Your Progress"
                        variant="outline"
                        onPress={() => setView('progress')}
                      />
                    </View>
                  ) : (
                    <View style={styles.answerForm}>
                      <Text style={styles.answerLabel}>Your Answer</Text>
                      <Controller
                        control={control}
                        name="answer"
                        render={({ field: { onChange, onBlur, value } }) => (
                          <TextInput
                            style={[
                              styles.answerInput,
                              errors.answer && styles.inputError,
                            ]}
                            placeholder="Write your thoughtful response here..."
                            value={value}
                            onChangeText={onChange}
                            onBlur={onBlur}
                            multiline
                            numberOfLines={6}
                            textAlignVertical="top"
                          />
                        )}
                      />
                      {errors.answer && (
                        <Text style={styles.errorText}>
                          {errors.answer.message}
                        </Text>
                      )}
                      
                      <View style={styles.answerMeta}>
                        <Text style={styles.characterCount}>
                          {answerValue.length} characters
                        </Text>
                        <Text style={styles.answerHint}>
                          Aim for at least 50 words for better feedback
                        </Text>
                      </View>

                      <Button
                        title={submitAnswerMutation.isPending ? 'Submitting...' : 'Submit Answer'}
                        onPress={handleSubmit(onSubmitAnswer)}
                        disabled={submitAnswerMutation.isPending}
                        loading={submitAnswerMutation.isPending}
                        style={styles.submitButton}
                      />
                    </View>
                  )}
                </CardContent>
              </Card>
            ) : (
              <Card style={styles.questionCard}>
                <CardContent>
                  <Text style={styles.errorText}>
                    No question available today. Please try again later.
                  </Text>
                </CardContent>
              </Card>
            )}

            {/* Tips */}
            <Card style={styles.tipsCard}>
              <CardHeader>
                <Text style={styles.tipsTitle}>💡 Writing Tips</Text>
              </CardHeader>
              <CardContent>
                <View style={styles.tipsList}>
                  <Text style={styles.tipItem}>
                    • Structure your response with clear introduction, body, and conclusion
                  </Text>
                  <Text style={styles.tipItem}>
                    • Use professional vocabulary and varied sentence structures
                  </Text>
                  <Text style={styles.tipItem}>
                    • Support your points with specific examples or experiences
                  </Text>
                  <Text style={styles.tipItem}>
                    • Proofread for grammar, spelling, and clarity before submitting
                  </Text>
                </View>
              </CardContent>
            </Card>
          </View>
        ) : (
          <View style={styles.progressView}>
            {/* Progress Overview */}
            <Card style={styles.progressCard}>
              <CardHeader>
                <Text style={styles.progressTitle}>Your Learning Journey</Text>
              </CardHeader>
              <CardContent>
                <View style={styles.progressStats}>
                  <View style={styles.progressStat}>
                    <Text style={styles.progressStatNumber}>
                      {stats?.total_answers || 0}
                    </Text>
                    <Text style={styles.progressStatLabel}>Questions Answered</Text>
                  </View>
                  <View style={styles.progressStat}>
                    <Text style={styles.progressStatNumber}>
                      {stats?.current_streak || 0}
                    </Text>
                    <Text style={styles.progressStatLabel}>Day Streak</Text>
                  </View>
                  <View style={styles.progressStat}>
                    <Text style={styles.progressStatNumber}>
                      {Math.round(stats?.average_score || 0)}%
                    </Text>
                    <Text style={styles.progressStatLabel}>Average Score</Text>
                  </View>
                </View>
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card style={styles.activityCard}>
              <CardHeader>
                <Text style={styles.activityTitle}>Recent Activity</Text>
              </CardHeader>
              <CardContent>
                {stats?.last_answer_date ? (
                  <View style={styles.activityItem}>
                    <Text style={styles.activityIcon}>📝</Text>
                    <View style={styles.activityContent}>
                      <Text style={styles.activityText}>
                        Last answered on {format(new Date(stats.last_answer_date), 'MMM d, yyyy')}
                      </Text>
                      <Text style={styles.activitySubtext}>
                        Keep up the great work!
                      </Text>
                    </View>
                  </View>
                ) : (
                  <Text style={styles.noActivityText}>
                    No activity yet. Answer today's question to get started!
                  </Text>
                )}
              </CardContent>
            </Card>

            {/* Achievements */}
            <Card style={styles.achievementsCard}>
              <CardHeader>
                <Text style={styles.achievementsTitle}>🏆 Achievements</Text>
              </CardHeader>
              <CardContent>
                <View style={styles.achievementsList}>
                  <View style={[
                    styles.achievement,
                    (stats?.total_answers || 0) >= 1 && styles.achievementUnlocked
                  ]}>
                    <Text style={styles.achievementIcon}>🎯</Text>
                    <View style={styles.achievementContent}>
                      <Text style={styles.achievementTitle}>First Answer</Text>
                      <Text style={styles.achievementDescription}>
                        Submit your first answer
                      </Text>
                    </View>
                  </View>
                  
                  <View style={[
                    styles.achievement,
                    (stats?.current_streak || 0) >= 3 && styles.achievementUnlocked
                  ]}>
                    <Text style={styles.achievementIcon}>🔥</Text>
                    <View style={styles.achievementContent}>
                      <Text style={styles.achievementTitle}>3-Day Streak</Text>
                      <Text style={styles.achievementDescription}>
                        Answer questions for 3 consecutive days
                      </Text>
                    </View>
                  </View>
                  
                  <View style={[
                    styles.achievement,
                    (stats?.current_streak || 0) >= 7 && styles.achievementUnlocked
                  ]}>
                    <Text style={styles.achievementIcon}>⭐</Text>
                    <View style={styles.achievementContent}>
                      <Text style={styles.achievementTitle}>Week Warrior</Text>
                      <Text style={styles.achievementDescription}>
                        Maintain a 7-day streak
                      </Text>
                    </View>
                  </View>
                  
                  <View style={[
                    styles.achievement,
                    (stats?.total_answers || 0) >= 10 && styles.achievementUnlocked
                  ]}>
                    <Text style={styles.achievementIcon}>📚</Text>
                    <View style={styles.achievementContent}>
                      <Text style={styles.achievementTitle}>Dedicated Learner</Text>
                      <Text style={styles.achievementDescription}>
                        Answer 10 questions
                      </Text>
                    </View>
                  </View>
                </View>
              </CardContent>
            </Card>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.light.background,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: Colors.light.surface,
    borderBottomWidth: 1,
    borderBottomColor: Colors.light.border,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  logoIcon: {
    fontSize: 24,
    color: Colors.light.primary,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.light.text,
  },
  headerSubtitle: {
    fontSize: 14,
    color: Colors.light.textSecondary,
  },
  tabs: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 12,
    backgroundColor: Colors.light.surface,
    borderBottomWidth: 1,
    borderBottomColor: Colors.light.border,
    gap: 8,
  },
  tab: {
    flex: 1,
  },
  activeTab: {
    backgroundColor: Colors.light.primary,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  questionView: {
    paddingVertical: 20,
  },
  progressView: {
    paddingVertical: 20,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginBottom: 20,
  },
  statCard: {
    width: (width - 56) / 2,
  },
  statContent: {
    alignItems: 'center',
    paddingVertical: 16,
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.light.primary,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: Colors.light.textSecondary,
    textAlign: 'center',
  },
  questionCard: {
    marginBottom: 20,
  },
  questionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  questionDate: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.light.text,
  },
  questionBadge: {
    backgroundColor: Colors.light.borderLight,
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  questionBadgeText: {
    fontSize: 12,
    color: Colors.light.primary,
    fontWeight: '500',
  },
  questionText: {
    fontSize: 18,
    color: Colors.light.text,
    lineHeight: 26,
    marginBottom: 24,
  },
  completedContainer: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  completedIcon: {
    fontSize: 48,
    marginBottom: 16,
    textAlign: 'center',
  },
  completedText: {
    fontSize: 16,
    color: '#059669',
    textAlign: 'center',
    marginBottom: 20,
  },
  progressButton: {
    width: '100%',
  },
  answerForm: {
    gap: 16,
  },
  answerLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#374151',
  },
  answerInput: {
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 8,
    padding: 16,
    fontSize: 16,
    backgroundColor: '#fff',
    minHeight: 120,
  },
  inputError: {
    borderColor: '#ef4444',
  },
  errorText: {
    fontSize: 14,
    color: '#ef4444',
  },
  answerMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  characterCount: {
    fontSize: 14,
    color: '#6b7280',
  },
  answerHint: {
    fontSize: 12,
    color: '#9ca3af',
  },
  submitButton: {
    marginTop: 8,
  },
  tipsCard: {
    marginBottom: 20,
  },
  tipsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1f2937',
  },
  tipsList: {
    gap: 8,
  },
  tipItem: {
    fontSize: 14,
    color: '#4b5563',
    lineHeight: 20,
  },
  loadingText: {
    fontSize: 16,
    color: '#6b7280',
    textAlign: 'center',
    paddingVertical: 20,
  },
  progressCard: {
    marginBottom: 20,
  },
  progressTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1f2937',
  },
  progressStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 16,
  },
  progressStat: {
    alignItems: 'center',
  },
  progressStatNumber: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#007AFF',
    marginBottom: 4,
  },
  progressStatLabel: {
    fontSize: 12,
    color: '#6b7280',
    textAlign: 'center',
  },
  activityCard: {
    marginBottom: 20,
  },
  activityTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1f2937',
  },
  activityItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  activityIcon: {
    fontSize: 24,
    marginRight: 12,
  },
  activityContent: {
    flex: 1,
  },
  activityText: {
    fontSize: 16,
    color: '#374151',
    marginBottom: 4,
  },
  activitySubtext: {
    fontSize: 14,
    color: '#6b7280',
  },
  noActivityText: {
    fontSize: 16,
    color: '#6b7280',
    textAlign: 'center',
    paddingVertical: 20,
  },
  achievementsCard: {
    marginBottom: 20,
  },
  achievementsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1f2937',
  },
  achievementsList: {
    gap: 16,
  },
  achievement: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#f9fafb',
    borderRadius: 12,
    opacity: 0.5,
  },
  achievementUnlocked: {
    backgroundColor: '#ecfdf5',
    opacity: 1,
  },
  achievementIcon: {
    fontSize: 24,
    marginRight: 12,
  },
  achievementContent: {
    flex: 1,
  },
  achievementTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 4,
  },
  achievementDescription: {
    fontSize: 14,
    color: '#6b7280',
  },
});

export default DashboardScreen;