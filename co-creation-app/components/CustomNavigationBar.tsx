import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
} from 'react-native';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import { IconSymbol } from '@/components/ui/IconSymbol';

/**
 * 共通ナビゲーションバーコンポーネント
 * 左側にサービス名、右側にメニューボタンを配置
 */

type CustomNavigationBarProps = {
  onMenuPress: () => void;
};

export function CustomNavigationBar({ onMenuPress }: CustomNavigationBarProps) {
  return (
    <ThemedView style={styles.headerContainer}>
      <View style={styles.headerLeft}>
        <ThemedText style={styles.headerTitle}>co-creation</ThemedText>
      </View>
      <View style={styles.headerCenter}>
        {/* 中央は空白 */}
      </View>
      <View style={styles.headerRight}>
        <TouchableOpacity onPress={onMenuPress}>
          <IconSymbol size={28} name="menu" color="#fff" />
        </TouchableOpacity>
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    height: 60, // ヘッダーの高さ。必要に応じて調整してください
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    //backgroundColor: '#fff', // テーマに合わせて変更可
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  headerLeft: {
    flex: 1,
  },
  headerCenter: {
    flex: 1,
    alignItems: 'center',
  },
  headerRight: {
    flex: 1,
    alignItems: 'flex-end',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    // color: '#333',
  },
});