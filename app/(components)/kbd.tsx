export function Enter() {
  return (
    <kbd className="grid relative items-center px-2 text-xs font-light text-white bg-black rounded-sm border border-black scale-75">
      Enter
      <span className="absolute top-0 left-0 w-full h-full border scale-90 border-white/50" />
    </kbd>
  );
}

export function Shift() {
  return (
    <kbd className="grid relative items-center py-1 px-2 text-xs font-light text-white bg-black rounded-sm border border-black scale-75">
      Shift
      <span className="absolute top-0 left-0 w-full h-full border scale-90 border-white/50" />
    </kbd>
  );
}

export function Escape() {
  return (
    <kbd className="grid relative items-center px-1 max-h-8 text-xs font-light text-white bg-black rounded-sm border border-black scale-75 min-h-6 aspect-square">
      Esc
      <span className="absolute top-0 left-0 w-full h-full border scale-90 border-white/50" />
    </kbd>
  );
}
