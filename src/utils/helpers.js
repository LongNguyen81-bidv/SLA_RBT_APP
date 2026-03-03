export function getSLAStatus(actualHours, slaHours) {
  if (actualHours === null) {
    return 'pending';
  }
  const ratio = actualHours / slaHours;
  if (ratio > 1) {
    return 'exceeded';
  }
  if (ratio >= 0.8) {
    return 'warning';
  }
  return 'ok';
}

export function formatHours(h) {
  if (h === null || h === undefined) {
    return '—';
  }
  if (h < 1) {
    return `${Math.round(h * 60)}p`;
  }
  return `${h.toFixed(1)}h`;
}

export function getElapsedHours(startTime) {
  return (Date.now() - startTime) / 3600000;
}
