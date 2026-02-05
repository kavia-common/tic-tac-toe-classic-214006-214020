export type Player = 'X' | 'O';
export type Cell = Player | null;
export type Board = Cell[];

export type WinningLine = [number, number, number];

export type GameStatus =
  | { kind: 'IN_PROGRESS' }
  | { kind: 'WIN'; winner: Player; line: WinningLine }
  | { kind: 'DRAW' };

/**
 * Returns a new empty 3x3 board (length 9).
 */
export function createEmptyBoard(): Board {
  return Array.from({ length: 9 }, () => null);
}

/**
 * Get the other player.
 */
export function togglePlayer(player: Player): Player {
  return player === 'X' ? 'O' : 'X';
}

const WINNING_LINES: WinningLine[] = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],

  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],

  [0, 4, 8],
  [2, 4, 6],
];

/**
 * Evaluate the current board and determine game status.
 */
export function evaluateBoard(board: Board): GameStatus {
  for (const line of WINNING_LINES) {
    const [a, b, c] = line;
    const v = board[a];
    if (v && v === board[b] && v === board[c]) {
      return { kind: 'WIN', winner: v, line };
    }
  }

  const isFull = board.every((cell) => cell !== null);
  if (isFull) return { kind: 'DRAW' };

  return { kind: 'IN_PROGRESS' };
}

/**
 * Returns true if the given index is a legal move.
 */
export function isLegalMove(board: Board, index: number): boolean {
  return index >= 0 && index < board.length && board[index] === null;
}
