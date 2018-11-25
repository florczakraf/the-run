interface RunInfo {
  id: string;
  name: string;
  startTime: number;
  duration: number;
  numberOfTargets: number;
  players: number;
  entryFee: number;
  description: string;
  finished: number;
}

interface Stats extends RunInfo {
  visitedTargets: number[];
}

interface Summary {
  winners: string[];
  visitedTargets: any[];
  targets: any[];
  players: number;
}
