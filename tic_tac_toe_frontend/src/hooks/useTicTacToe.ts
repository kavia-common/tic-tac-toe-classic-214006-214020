import { useCallback, useMemo, useState } from 'react';
import {
  Board,
  GameStatus,
  Player,
  createEmptyBoard,
  evaluateBoard,
  isLegalMove,
  togglePlayer,
} from '../game/ticTacToe';

type Score = Record<Player, number> & { draws: number };

export type TicTacToeState = {
  board: Board;
  nextPlayer: Player;
  status: GameStatus;
  score: Score;
};

export type TicTacToeActions = {
  playAt: (index: number) => void;
  resetBoard: () => void;
  newMatch: () => void;
};

/**
 * PUBLIC_INTERFACE
 * Hook that provides complete Tic Tac Toe game state + actions:
 * - board state (3x3)
 * - next player
 * - win/draw detection
 * - score tracking across rounds
 * - reset/new match controls
 */
export function useTicTacToe(): TicTacToeState & TicTacToeActions {
  const [board, setBoard] = useState<Board>(() => createEmptyBoard());
  const [nextPlayer, setNextPlayer] = useState<Player>('X');
  const [score, setScore] = useState<Score>({ X: 0, O: 0, draws: 0 });

  const status = useMemo(() => evaluateBoard(board), [board]);

  const playAt = useCallback(
    (index: number) => {
      // Don't allow moves after the game ends.
      if (status.kind !== 'IN_PROGRESS') return;
      if (!isLegalMove(board, index)) return;

      setBoard((prev) => {
        // Use functional update to ensure we never apply based on stale state.
        if (!isLegalMove(prev, index)) return prev;
        const next = prev.slice();
        next[index] = nextPlayer;
        return next;
      });

      setNextPlayer((p) => togglePlayer(p));
    },
    [board, nextPlayer, status.kind]
  );

  const resetBoard = useCallback(() => {
    setBoard(createEmptyBoard());
    setNextPlayer('X');
  }, []);

  const newMatch = useCallback(() => {
    setScore({ X: 0, O: 0, draws: 0 });
    setBoard(createEmptyBoard());
    setNextPlayer('X');
  }, []);

  // Update score when status transitions to WIN or DRAW.
  // We do it with memoized "status" and a guarded setScore to avoid double counts.
  // Since status is derived from board, this will run once per terminal board.
  const terminalKey = useMemo(() => {
    if (status.kind === 'WIN') return `WIN:${status.winner}:${status.line.join('-')}:${board.join('')}`;
    if (status.kind === 'DRAW') return `DRAW:${board.join('')}`;
    return null;
  }, [status, board]);

  const [lastCountedTerminalKey, setLastCountedTerminalKey] = useState<string | null>(null);
  if (terminalKey && terminalKey !== lastCountedTerminalKey) {
    // Safe to synchronously enqueue state updates; React will batch.
    setLastCountedTerminalKey(terminalKey);
    if (status.kind === 'WIN') {
      setScore((prev) => ({ ...prev, [status.winner]: prev[status.winner] + 1 }));
    } else if (status.kind === 'DRAW') {
      setScore((prev) => ({ ...prev, draws: prev.draws + 1 }));
    }
  }
  if (!terminalKey && lastCountedTerminalKey !== null) {
    setLastCountedTerminalKey(null);
  }

  return {
    board,
    nextPlayer,
    status,
    score,
    playAt,
    resetBoard,
    newMatch,
  };
}
