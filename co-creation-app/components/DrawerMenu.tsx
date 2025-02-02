import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';

import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';

import pb from '../lib/pocketbase';

export function DrawerMenu() {
	const router = useRouter();

	const handleLogout = () => {
    console.log('ログアウトが押されました。仮のログアウト処理を実行します。');
    // ここに実際のログアウト処理を記述することも可能です
		pb.authStore.clear();
		router.replace('/(auth)/login');
  };

  return (
    <ThemedView style={styles.container}>
      <ThemedText style={styles.menuItem}>メニュー項目 1</ThemedText>
      <ThemedText style={styles.menuItem}>メニュー項目 2</ThemedText>
      <ThemedText style={styles.menuItem}>メニュー項目 3</ThemedText>
      {/* その他メニュー項目 */}
			<View style={styles.separator} />
			{/* ログアウト項目 */}
      <TouchableOpacity onPress={handleLogout}>
        <ThemedText style={[styles.menuItem, styles.logoutItem]}>ログアウト</ThemedText>
      </TouchableOpacity>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#fff',
    paddingTop: 50, // 必要に応じて調整
    paddingHorizontal: 20,
  },
  menuItem: {
    fontSize: 18,
    paddingVertical: 10,
  },
  separator: {
    marginVertical: 20,
    borderBottomColor: '#ccc',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  logoutItem: {
    color: 'red', // ログアウト項目を目立たせるため赤字にしています（必要に応じて変更）
    fontWeight: 'bold',
  },
});