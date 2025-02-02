import React from 'react';
import { StyleSheet } from 'react-native';
import { Link, type LinkProps } from 'expo-router';
import { useThemeColor } from '@/hooks/useThemeColor';

export type ThemedLinkProps = LinkProps & {
  lightColor?: string;
  darkColor?: string;
};

export function ThemedLink({
  style,
  lightColor,
  darkColor,
  ...rest
}: ThemedLinkProps) {
  const color = useThemeColor({ light: lightColor, dark: darkColor }, 'text');

  return (
    <Link
      style={[styles.link, { color }, style]}
      {...rest}
    />
  );
}

const styles = StyleSheet.create({
  link: {
    fontSize: 16,
    lineHeight: 30,
    color: '#0a7ea4', // デフォルトのリンク色（テーマカラーで上書きされます）
    textDecorationLine: 'underline',
  },
});
