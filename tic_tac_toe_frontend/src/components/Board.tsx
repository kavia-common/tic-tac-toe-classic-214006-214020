import React from 'react';
import { StyleSheet, View } from 'react-native';
import type { Board as BoardType, GameStatus } from '../game/ticTacToe';
import Square from './Square';

type Props = {
  board: BoardType;
  status: GameStatus;
  onPlayAt: (index: number) => void;
};

function isIndexWinning(status: GameStatus, index: number): boolean {
  return status.kind === 'WIN' ? status.line.includes(index as never) : false;
}

/**
 * PUBLIC_INTERFACE
 * Renders the 3x3 Tic Tac Toe board.
 */
export function Board({ board, status, onPlayAt }: Props) {
  const disabled = status.kind !== 'IN_PROGRESS';

  return (
    <View style={styles.board} accessibilityRole="image" accessibilityLabel="Tic Tac Toe board">
      <View style={styles.row}>
        {[0, 1, 2].map((i) => (
          <Square
            key={i}
            index={i}
            value={board[i]}
            disabled={disabled || board[i] !== null}
            isWinning={isIndexWinning(status, i)}
            onPress={() => onPlayAt(i)}
          />
        ))}
      </View>
      <View style={styles.row}>
        {[3, 4, 5].map((i) => (
          <Square
            key={i}
            index={i}
            value={board[i]}
            disabled={disabled || board[i] !== null}
            isWinning={isIndexWinning(status, i)}
            onPress={() => onPlayAt(i)}
          />
        ))}
      </View>
      <View style={styles.row}>
        {[6, 7, 8].map((i) => (
          <Square
            key={i}
            index={i}
            value={board[i]}
            disabled={disabled || board[i] !== null}
            isWinning={isIndexWinning(status, i)}
            onPress={() => onPlayAt(i)}
          />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  board: {
    gap: 12,
    padding: 14,
    backgroundColor: '#0f172a',
    borderRadius: 18,
    borderWidth: 2,
    borderColor: 'rgba(147, 197, 253, 0.35)',
  },
  row: {
    flexDirection: 'row',
    gap: 12,
  },
});
