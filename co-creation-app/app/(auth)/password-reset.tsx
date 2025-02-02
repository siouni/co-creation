// app/(auth)/password-reset.jsx
import React, { useState } from 'react';
import { Platform, Button, StyleSheet, Alert, View } from 'react-native';
import { useRouter } from 'expo-router';

import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedTextInput } from '@/components/ThemedTextInput';
import { ThemedLink } from '@/components/ThemedLink';

import pb from '../../lib/pocketbase';

export default function PasswordResetScreen() {
  const router = useRouter();
  const [email, setEmail] = useState('');

  const handlePasswordReset = async () => {
    try {
      await pb.collection('users').requestPasswordReset(email);
      if (Platform.OS === 'web') {
        window.alert('パスワードリセット用のメールを送信しました');
      } else {
        Alert.alert('成功', 'パスワードリセット用のメールを送信しました');
      }
      router.replace('/(auth)/login');
    } catch (error) {
      console.error('Password reset error:', error);
      if (Platform.OS === 'web') {
        window.alert('パスワードリセットに失敗しました');
      } else {
        Alert.alert('エラー', 'パスワードリセットに失敗しました');
      }
    }
  };

  return (
    <ThemedView style={styles.container}>
      <View style={styles.formContainer}>
        <ThemedText style={styles.title}>パスワードリセット</ThemedText>
        <ThemedText style={styles.description}>
          ご登録のメールアドレスを入力してください
        </ThemedText>
        <ThemedTextInput
          style={styles.input}
          placeholder="メールアドレス"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <Button title="リセットメールを送信" onPress={handlePasswordReset} />
        <View style={styles.linkContainer}>
          <ThemedLink href="/(auth)/login" style={styles.linkText}>
            ログイン画面へ戻る
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
  description: {
    textAlign: 'center',
    marginBottom: 12,
  },
  input: {
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: 12,
    paddingHorizontal: 8,
    borderRadius: 4,
  },
  linkContainer: {
    marginTop: 10,
    alignItems: 'center',
  },
  linkText: {
    // 必要に応じてリンクのスタイルを調整
  },
});
