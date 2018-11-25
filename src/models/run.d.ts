interface RunInfo {
  id: string;
  name: string;
  startTime: number;
  duration: number;
  numberOfTargets: number;
  players: number;
  entryFee: number;
  description: string;
}

interface Stats extends RunInfo {
  visitedTargets: number[];
}
