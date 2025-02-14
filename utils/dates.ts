export function isSameDay({
  dateA,
  dateB,
}: {
  dateA: Date;
  dateB: Date;
}): boolean {
  return (
    dateA.getFullYear() === dateB.getFullYear() &&
    dateA.getMonth() === dateB.getMonth() &&
    dateA.getDate() === dateB.getDate()
  );
}
