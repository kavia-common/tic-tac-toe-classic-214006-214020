import React, { useMemo } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Pressable, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { Board } from './src/components/Board';
import { useTicTacToe } from './src/hooks/useTicTacToe';

function getStatusText(nextPlayer: 'X' | 'O', status: ReturnType<typeof useTicTacToe>['status']) {
  if (status.kind === 'WIN') return `Player ${status.winner} wins!`;
  if (status.kind === 'DRAW') return `It's a draw.`;
  return `Turn: ${nextPlayer}`;
}

export default function App() {
  const { board, nextPlayer, status, score, playAt, resetBoard, newMatch } = useTicTacToe();

  const statusText = useMemo(() => getStatusText(nextPlayer, status), [nextPlayer, status]);

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar style="light" />

      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>TIC • TAC • TOE</Text>
          <Text style={styles.subtitle}>Classic 3×3 • Same device • Two players</Text>
        </View>

        <View style={styles.statusCard} accessibilityRole="summary">
          <Text style={styles.statusLabel}>{statusText}</Text>
          <View style={styles.scoreRow}>
            <Text style={styles.scoreText}>X: {score.X}</Text>
            <Text style={styles.scoreDot}>•</Text>
            <Text style={styles.scoreText}>O: {score.O}</Text>
            <Text style={styles.scoreDot}>•</Text>
            <Text style={styles.scoreText}>Draws: {score.draws}</Text>
          </View>
        </View>

        <View style={styles.boardWrap}>
          <Board board={board} status={status} onPlayAt={playAt} />
        </View>

        <View style={styles.controls}>
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Reset board"
            onPress={resetBoard}
            style={({ pressed }) => [styles.button, styles.buttonPrimary, pressed && styles.buttonPressed]}
          >
            <Text style={styles.buttonText}>Reset Round</Text>
          </Pressable>

          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Start new match"
            onPress={newMatch}
            style={({ pressed }) => [styles.button, styles.buttonSecondary, pressed && styles.buttonPressed]}
          >
            <Text style={styles.buttonText}>New Match</Text>
          </Pressable>
        </View>

        <Text style={styles.footerHint}>
          Tip: Tap any empty tile. Winning line will glow.
        </Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#050814',
  },
  container: {
    flex: 1,
    paddingHorizontal: 18,
    paddingTop: 18,
    paddingBottom: 24,
    alignItems: 'center',
    justifyContent: 'flex-start',
    gap: 16,
  },
  header: {
    alignItems: 'center',
    gap: 6,
    paddingTop: 8,
  },
  title: {
    color: '#e5e7eb',
    fontSize: 28,
    fontWeight: '900',
    letterSpacing: 2,
  },
  subtitle: {
    color: 'rgba(229, 231, 235, 0.72)',
    fontSize: 13,
    fontWeight: '600',
  },
  statusCard: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: '#0b1020',
    borderRadius: 16,
    paddingVertical: 14,
    paddingHorizontal: 14,
    borderWidth: 1,
    borderColor: 'rgba(147, 197, 253, 0.25)',
  },
  statusLabel: {
    color: '#e5e7eb',
    fontSize: 18,
    fontWeight: '800',
    textAlign: 'center',
    marginBottom: 8,
  },
  scoreRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
  },
  scoreText: {
    color: 'rgba(229, 231, 235, 0.82)',
    fontSize: 13,
    fontWeight: '700',
  },
  scoreDot: {
    color: 'rgba(34, 211, 238, 0.85)',
    fontWeight: '900',
  },
  boardWrap: {
    paddingTop: 6,
  },
  controls: {
    width: '100%',
    maxWidth: 360,
    flexDirection: 'row',
    gap: 12,
    paddingTop: 6,
  },
  button: {
    flex: 1,
    borderRadius: 14,
    paddingVertical: 12,
    paddingHorizontal: 12,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
  },
  buttonPrimary: {
    backgroundColor: 'rgba(59, 130, 246, 0.18)',
    borderColor: '#3b82f6',
  },
  buttonSecondary: {
    backgroundColor: 'rgba(6, 182, 212, 0.14)',
    borderColor: '#06b6d4',
  },
  buttonPressed: {
    transform: [{ translateY: 1 }],
    opacity: 0.92,
  },
  buttonText: {
    color: '#e5e7eb',
    fontSize: 14,
    fontWeight: '900',
    letterSpacing: 0.5,
  },
  footerHint: {
    color: 'rgba(229, 231, 235, 0.6)',
    fontSize: 12,
    fontWeight: '600',
    textAlign: 'center',
    marginTop: 4,
  },
});
