// app/(auth)/register.jsx
import React, { useState } from 'react';
import { Platform, View, Button, StyleSheet, Alert } from 'react-native';
import { useRouter } from 'expo-router';

import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedLink } from '@/components/ThemedLink';
import { ThemedTextInput } from '@/components/ThemedTextInput';

import pb from '../../lib/pocketbase';

export default function RegisterScreen() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');

  const handleRegister = async () => {
    if (password !== passwordConfirm) {
      Alert.alert('エラー', 'パスワードが一致しません');
      return;
    }
    try {
      const result = await pb.collection('users').create({
        email,
        password,
        passwordConfirm,
      });
      console.log('Register success:', result);
      const result2 = await pb.collection('users').requestVerification(email);
      console.log('Verification success:', result2);
      if (Platform.OS === 'web') {
        window.alert('登録が完了しました。ログインしてください。');
      } else {
        Alert.alert('成功', '登録が完了しました。ログインしてください。');
      }
      router.replace('/(auth)/login');
    } catch (error) {
      console.error('Register error:', error);
      if (Platform.OS === 'web') {
        window.alert('登録に失敗しました');
      } else {
        Alert.alert('エラー', '登録に失敗しました');
      }
      
    }
  };

  return (
    <ThemedView style={styles.container}>
      <View style={styles.formContainer}>
        <ThemedText style={styles.title}>新規登録</ThemedText>
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
        <ThemedTextInput
          style={styles.input}
          placeholder="パスワード（確認）"
          value={passwordConfirm}
          onChangeText={setPasswordConfirm}
          secureTextEntry
        />
        <Button title="登録" onPress={handleRegister} />
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
    // 必要に応じてリンクのスタイルを調整してください
  },
});
