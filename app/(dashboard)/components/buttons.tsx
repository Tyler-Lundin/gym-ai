import StatusDot from "./status-dot";

export function NextButton({
  onClick,
  isDisabled = false,
}: {
  onClick: () => void;
  isDisabled?: boolean;
}) {
  return (
    <button
      disabled={isDisabled}
      className="relative w-full h-14 text-white rounded-lg border border-black opacity-100 transition-all hover:opacity-50 focus:opacity-50 disabled:pointer-events-none bg-black/100 disabled:bg-black/50"
      onClick={onClick}
    >
      Next
      <StatusDot status={!isDisabled} />
    </button>
  );
}
