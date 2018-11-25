export function msToMMSS(ms: number) {
  const totalSeconds = Math.floor(ms / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;

  return `${padWithZero(minutes.toString())}:${padWithZero(
    seconds.toString()
  )}`;
}

function padWithZero(s: string) {
  return s.length < 2 ? "0" + s : s;
}
