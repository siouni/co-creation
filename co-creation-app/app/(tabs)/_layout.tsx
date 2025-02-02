import { Tabs, useRouter } from 'expo-router';
import React, { useEffect, useState, useRef } from 'react';
import { 
  Platform, ActivityIndicator, View, InteractionManager, StyleSheet, Animated, Dimensions, TouchableWithoutFeedback 
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { HapticTab } from '@/components/HapticTab';
import { IconSymbol } from '@/components/ui/IconSymbol';
import TabBarBackground from '@/components/ui/TabBarBackground';
import { CustomNavigationBar } from '@/components/CustomNavigationBar';
import { DrawerMenu } from '@/components/DrawerMenu';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

import pb from '../../lib/pocketbase';

const SCREEN_WIDTH = Dimensions.get('window').width;

export default function ProtectedTabsLayout() {
  const colorScheme = useColorScheme();

  const router = useRouter();

  // 認証状態の判定中かどうかを管理（任意）
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    // ここでは PocketBase の authStore.token を用いて認証状態をチェックします。
    // 実際の実装では、より複雑な状態管理（リフレッシュトークンの処理など）が必要になるかもしれません。
    if (!pb.authStore.token) {
      // 認証されていなければログイン画面へリダイレクト
      InteractionManager.runAfterInteractions(() => {
        router.replace('/(auth)/login');
      });
    } else {
      setIsChecking(false);
    }
  }, [router]);

  // 右側からスライドするので初期値は画面外（右側）のオフセット
  const [isDrawerOpen, setDrawerOpen] = useState(false);
  const animatedValue = useRef(new Animated.Value(SCREEN_WIDTH * 0.8)).current;

  useEffect(() => {
    Animated.timing(animatedValue, {
      toValue: isDrawerOpen ? 0 : SCREEN_WIDTH * 0.8,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, [isDrawerOpen, animatedValue]);

  // 認証状態をチェック中の場合はローディングなどを表示
  if (isChecking) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  const handleMenuPress = () => {
    setDrawerOpen(true);
  };

  // ドロワー外タッチで閉じる
  const closeDrawer = () => {
    setDrawerOpen(false);
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <CustomNavigationBar onMenuPress={handleMenuPress} />
      {isDrawerOpen && (
        <TouchableWithoutFeedback onPress={closeDrawer}>
          <View style={styles.overlay} />
        </TouchableWithoutFeedback>
      )}
      <Animated.View
        style={[
          styles.drawerContainer,
          { transform: [{ translateX: animatedValue }] },
        ]}
      >
        <DrawerMenu />
      </Animated.View>
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
          headerShown: false,
          tabBarButton: HapticTab,
          tabBarBackground: TabBarBackground,
          tabBarStyle: Platform.select({
            ios: {
              // Use a transparent background on iOS to show the blur effect
              position: 'absolute',
            },
            default: {},
          }),
        }}>
        <Tabs.Screen
          name="index"
          options={{
            title: 'Home',
            tabBarIcon: ({ color }) => <IconSymbol size={28} name="house.fill" color={color} />,
          }}
        />
      </Tabs>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  // 右側に配置するため、left の代わりに right: 0 を指定
  drawerContainer: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    width: SCREEN_WIDTH * 0.8, // 画面幅の80%の幅で表示
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 5,
    zIndex: 1000,
  },
  // オーバーレイは画面の左側部分を覆う（右側にドロワーがあるため）
  overlay: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: SCREEN_WIDTH * 0.8,
    backgroundColor: 'rgba(0,0,0,0.5)',
    zIndex: 999,
  },
});