export function Enter({ label }: { label?: string }) {
  return (
    <span className="flex gap-2 px-8">
      {label && <label className="text-lg font-bold uppercase">{label}</label>}
      <kbd className="grid relative items-center px-2 w-16 text-xs font-light text-white bg-black rounded-sm border border-black scale-75">
        Enter
        <span className="absolute top-0 left-0 w-full h-full border scale-90 border-white/50" />
      </kbd>
    </span>
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

export function Escape({ label }: { label?: string }) {
  return (
    <span className="flex gap-2 px-8">
      {label && <label className="text-lg font-bold uppercase">{label}</label>}
      <kbd className="grid relative items-center px-2 w-10 text-xs font-light text-white bg-black rounded-sm border border-black scale-75">
        Esc
        <span className="absolute top-0 left-0 w-full h-full border scale-90 border-white/50" />
      </kbd>
    </span>
  );
}
