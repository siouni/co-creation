// app/(auth)/login.jsx
import React, { useState } from 'react';
import { View, Button, StyleSheet, Alert } from 'react-native';
import { useRouter } from 'expo-router';

import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedLink } from '@/components/ThemedLink';
import { ThemedTextInput } from '@/components/ThemedTextInput';

import pb from '../../lib/pocketbase';

export default function LoginScreen() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      // PocketBase による認証
      const authData = await pb.collection('users').authWithPassword(email, password);
      console.log('Login success:', authData);
      Alert.alert('成功', 'ログインに成功しました');
      router.replace('/(tabs)');
    } catch (error) {
      console.error('Login error:', error);
      Alert.alert('エラー', 'ログインに失敗しました');
    }
  };

  return (
    <ThemedView style={styles.container}>
      <View style={styles.formContainer}>
        <ThemedText style={styles.title}>ログイン</ThemedText>
        <ThemedTextInput
          style={styles.input}
          placeholder="メールアドレス"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <ThemedTextInput
          style={styles.input}
          placeholder="パスワード"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        <Button title="ログイン" onPress={handleLogin} />

        <View style={styles.linkContainer}>
          <ThemedLink href="/(auth)/register" style={styles.linkText}>
            新規登録はこちら
          </ThemedLink>
        </View>
        <View style={styles.linkContainer}>
          <ThemedLink href="/(auth)/password-reset" style={styles.linkText}>
            パスワードをお忘れの方
          </ThemedLink>
        </View>
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  formContainer: {
    width: '100%',
    maxWidth: 400,
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
    textAlign: 'center',
  },
  input: {
    height: 40,
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
    borderRadius: 4,
    borderColor: '#ccc',
  },
  linkContainer: {
    marginTop: 10,
    alignItems: 'center',
  },
  linkText: {
    // 必要に応じてリンクの色などを調整
  },
});
