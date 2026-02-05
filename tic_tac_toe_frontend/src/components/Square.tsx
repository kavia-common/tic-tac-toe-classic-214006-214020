import React, { memo } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import type { Cell } from '../game/ticTacToe';

type Props = {
  value: Cell;
  disabled?: boolean;
  isWinning?: boolean;
  onPress: () => void;
  index: number;
};

const Square = memo(function Square({ value, disabled, isWinning, onPress, index }: Props) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={`Square ${index + 1}${value ? `, ${value}` : ''}`}
      accessibilityState={{ disabled: !!disabled }}
      onPress={onPress}
      disabled={disabled}
      style={({ pressed }) => [
        styles.square,
        isWinning ? styles.squareWinning : undefined,
        pressed && !disabled ? styles.squarePressed : undefined,
      ]}
    >
      <View style={styles.inner}>
        <Text style={[styles.value, value === 'X' ? styles.valueX : styles.valueO]}>{value ?? ''}</Text>
      </View>
    </Pressable>
  );
});

const styles = StyleSheet.create({
  square: {
    width: 96,
    height: 96,
    backgroundColor: '#0b1020',
    borderWidth: 3,
    borderColor: '#93c5fd',
    borderRadius: 12,
    shadowColor: '#60a5fa',
    shadowOpacity: 0.35,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 6 },
    elevation: 4,
  },
  squarePressed: {
    transform: [{ translateY: 1 }],
    shadowOpacity: 0.15,
  },
  squareWinning: {
    borderColor: '#22d3ee',
    shadowColor: '#22d3ee',
    shadowOpacity: 0.55,
  },
  inner: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  value: {
    fontSize: 44,
    fontWeight: '900',
    letterSpacing: 2,
  },
  valueX: {
    color: '#3b82f6',
  },
  valueO: {
    color: '#06b6d4',
  },
});

export default Square;
