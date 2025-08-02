import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Alert,
  StatusBar,
} from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useSupabaseAuth } from '../hooks/useSupabaseAuth';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Card, CardContent, CardHeader } from '../components/ui/Card';
import { Colors } from '../constants/Colors';

const loginSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

const registerSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

type LoginFormData = z.infer<typeof loginSchema>;
type RegisterFormData = z.infer<typeof registerSchema>;

const AuthScreen = () => {
  const router = useRouter();
  const { mode } = useLocalSearchParams<{ mode?: string }>();
  const [isLogin, setIsLogin] = useState(mode !== 'register');
  const [loading, setLoading] = useState(false);
  const { signIn, signUp, session } = useSupabaseAuth();

  const {
    control: loginControl,
    handleSubmit: handleLoginSubmit,
    formState: { errors: loginErrors },
    reset: resetLogin,
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const {
    control: registerControl,
    handleSubmit: handleRegisterSubmit,
    formState: { errors: registerErrors },
    reset: resetRegister,
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  // Redirect to dashboard if already authenticated
  useEffect(() => {
    if (session) {
      router.replace('/dashboard');
    }
  }, [session, router]);

  // Update form mode based on URL parameter
  useEffect(() => {
    setIsLogin(mode !== 'register');
  }, [mode]);

  const onLoginSubmit = async (data: LoginFormData) => {
    setLoading(true);
    try {
      const { error } = await signIn(data.email, data.password);
      if (error) {
        Alert.alert('Error', error.message);
      } else {
        router.replace('/dashboard');
      }
    } catch (error) {
      Alert.alert('Error', 'An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  const onRegisterSubmit = async (data: RegisterFormData) => {
    setLoading(true);
    try {
      const { error } = await signUp(data.email, data.password);
      if (error) {
        Alert.alert('Error', error.message);
      } else {
        Alert.alert(
          'Success',
          'Account created successfully! Please check your email to verify your account.',
          [
            {
              text: 'OK',
              onPress: () => {
                setIsLogin(true);
                resetRegister();
              },
            },
          ]
        );
      }
    } catch (error) {
      Alert.alert('Error', 'An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  const toggleMode = () => {
    setIsLogin(!isLogin);
    resetLogin();
    resetRegister();
    router.setParams({ mode: isLogin ? 'register' : 'login' });
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={Colors.light.background} />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Header */}
          <View style={styles.header}>
            <View style={styles.logo}>
              <Text style={styles.logoIcon}>⚡</Text>
              <Text style={styles.logoText}>Career English Spark</Text>
            </View>
            <Button
              title="← Back"
              variant="ghost"
              size="sm"
              onPress={() => router.back()}
            />
          </View>

          {/* Auth Form */}
          <View style={styles.formContainer}>
            <Card style={styles.authCard}>
              <CardHeader>
                <Text style={styles.authTitle}>
                  {isLogin ? 'Welcome Back' : 'Create Account'}
                </Text>
                <Text style={styles.authSubtitle}>
                  {isLogin
                    ? 'Sign in to continue your English learning journey'
                    : 'Start your journey to better English communication'}
                </Text>
              </CardHeader>

              <CardContent>
                {isLogin ? (
                  <View style={styles.form}>
                    <View style={styles.inputGroup}>
                      <Text style={styles.label}>Email</Text>
                      <Controller
                        control={loginControl}
                        name="email"
                        render={({ field: { onChange, onBlur, value } }) => (
                          <Input
                            placeholder="Enter your email"
                            value={value}
                            onChangeText={onChange}
                            onBlur={onBlur}
                            keyboardType="email-address"
                            autoCapitalize="none"
                            autoComplete="email"
                            style={loginErrors.email && styles.inputError}
                          />
                        )}
                      />
                      {loginErrors.email && (
                        <Text style={styles.errorText}>
                          {loginErrors.email.message}
                        </Text>
                      )}
                    </View>

                    <View style={styles.inputGroup}>
                      <Text style={styles.label}>Password</Text>
                      <Controller
                        control={loginControl}
                        name="password"
                        render={({ field: { onChange, onBlur, value } }) => (
                          <Input
                            placeholder="Enter your password"
                            value={value}
                            onChangeText={onChange}
                            onBlur={onBlur}
                            secureTextEntry
                            autoComplete="password"
                            style={loginErrors.password && styles.inputError}
                          />
                        )}
                      />
                      {loginErrors.password && (
                        <Text style={styles.errorText}>
                          {loginErrors.password.message}
                        </Text>
                      )}
                    </View>

                    <Button
                      title={loading ? 'Signing In...' : 'Sign In'}
                      onPress={handleLoginSubmit(onLoginSubmit)}
                      disabled={loading}
                      loading={loading}
                      style={styles.submitButton}
                    />
                  </View>
                ) : (
                  <View style={styles.form}>
                    <View style={styles.inputGroup}>
                      <Text style={styles.label}>Email</Text>
                      <Controller
                        control={registerControl}
                        name="email"
                        render={({ field: { onChange, onBlur, value } }) => (
                          <Input
                            placeholder="Enter your email"
                            value={value}
                            onChangeText={onChange}
                            onBlur={onBlur}
                            keyboardType="email-address"
                            autoCapitalize="none"
                            autoComplete="email"
                            style={registerErrors.email && styles.inputError}
                          />
                        )}
                      />
                      {registerErrors.email && (
                        <Text style={styles.errorText}>
                          {registerErrors.email.message}
                        </Text>
                      )}
                    </View>

                    <View style={styles.inputGroup}>
                      <Text style={styles.label}>Password</Text>
                      <Controller
                        control={registerControl}
                        name="password"
                        render={({ field: { onChange, onBlur, value } }) => (
                          <Input
                            placeholder="Create a password"
                            value={value}
                            onChangeText={onChange}
                            onBlur={onBlur}
                            secureTextEntry
                            autoComplete="new-password"
                            style={registerErrors.password && styles.inputError}
                          />
                        )}
                      />
                      {registerErrors.password && (
                        <Text style={styles.errorText}>
                          {registerErrors.password.message}
                        </Text>
                      )}
                    </View>

                    <View style={styles.inputGroup}>
                      <Text style={styles.label}>Confirm Password</Text>
                      <Controller
                        control={registerControl}
                        name="confirmPassword"
                        render={({ field: { onChange, onBlur, value } }) => (
                          <Input
                            placeholder="Confirm your password"
                            value={value}
                            onChangeText={onChange}
                            onBlur={onBlur}
                            secureTextEntry
                            autoComplete="new-password"
                            style={registerErrors.confirmPassword && styles.inputError}
                          />
                        )}
                      />
                      {registerErrors.confirmPassword && (
                        <Text style={styles.errorText}>
                          {registerErrors.confirmPassword.message}
                        </Text>
                      )}
                    </View>

                    <Button
                      title={loading ? 'Creating Account...' : 'Create Account'}
                      onPress={handleRegisterSubmit(onRegisterSubmit)}
                      disabled={loading}
                      loading={loading}
                      style={styles.submitButton}
                    />
                  </View>
                )}

                {/* Toggle Mode */}
                <View style={styles.toggleContainer}>
                  <Text style={styles.toggleText}>
                    {isLogin ? "Don't have an account?" : 'Already have an account?'}
                  </Text>
                  <Button
                    title={isLogin ? 'Sign Up' : 'Sign In'}
                    variant="ghost"
                    size="sm"
                    onPress={toggleMode}
                    disabled={loading}
                  />
                </View>
              </CardContent>
            </Card>

            {/* Features */}
            <View style={styles.features}>
              <Text style={styles.featuresTitle}>Why Choose Career English Spark?</Text>
              <View style={styles.featuresList}>
                <View style={styles.featureItem}>
                  <Text style={styles.featureIcon}>🤖</Text>
                  <Text style={styles.featureText}>AI-powered feedback on your writing</Text>
                </View>
                <View style={styles.featureItem}>
                  <Text style={styles.featureIcon}>📈</Text>
                  <Text style={styles.featureText}>Track your progress over time</Text>
                </View>
                <View style={styles.featureItem}>
                  <Text style={styles.featureIcon}>🎯</Text>
                  <Text style={styles.featureText}>Career-focused English questions</Text>
                </View>
                <View style={styles.featureItem}>
                  <Text style={styles.featureIcon}>⚡</Text>
                  <Text style={styles.featureText}>Daily practice to build habits</Text>
                </View>
              </View>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.light.background,
  },
  keyboardView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
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
  formContainer: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 32,
  },
  authCard: {
    marginBottom: 32,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 8,
  },
  authTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: Colors.light.text,
    textAlign: 'center',
    marginBottom: 8,
  },
  authSubtitle: {
    fontSize: 16,
    color: Colors.light.textSecondary,
    textAlign: 'center',
    lineHeight: 24,
  },
  form: {
    gap: 20,
  },
  inputGroup: {
    gap: 8,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.light.text,
  },
  inputError: {
    borderColor: Colors.light.error,
  },
  errorText: {
    fontSize: 14,
    color: Colors.light.error,
    marginTop: 4,
  },
  submitButton: {
    marginTop: 8,
  },
  toggleContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 24,
    gap: 8,
  },
  toggleText: {
    fontSize: 16,
    color: Colors.light.textSecondary,
  },
  features: {
    marginTop: 16,
  },
  featuresTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1f2937',
    textAlign: 'center',
    marginBottom: 20,
  },
  featuresList: {
    gap: 16,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  featureIcon: {
    fontSize: 20,
    marginRight: 12,
  },
  featureText: {
    fontSize: 16,
    color: '#374151',
    flex: 1,
  },
});

export default AuthScreen;