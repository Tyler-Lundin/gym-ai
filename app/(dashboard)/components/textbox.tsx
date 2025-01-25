"use client";
import useTextbox from "../hooks/useTextbox";

export default function TextBox() {
  const {
    inputValue,
    timestamp,
    updateInputValue,
    calculateLines,
    textareaRef,
    handleSend,
  } = useTextbox();

  return (
    <div className="grid relative gap-2 py-4 px-4 pb-20 bg-gradient-to-br border shadow-md md:px-8 md:m-4 md:rounded-lg from-black/80 via-black/70 to-black/90">
      {/* Timestamp */}
      <h6 className="font-thin text-right text-white uppercase">
        {timestamp || "01-23-4567 89:10:11"}
      </h6>

      {/* Textarea */}
      <div className="flex">
        <textarea
          ref={textareaRef}
          style={{
            resize: "none",
            overflow: "hidden",
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              handleSend();
            }
          }}
          rows={1}
          value={inputValue}
          onInput={calculateLines}
          onChange={(e) => updateInputValue(e.target.value)}
          placeholder="Type here"
          className="relative z-10 p-2 w-full text-2xl bg-black rounded-l-lg border resize-none focus:outline-none text-white/100 placeholder-white/50 border-white/20 focus:border-white/30"
        />

        {/* Buttons */}
        <button
          onClick={handleSend}
          id="SAVE_BUTTON"
          className="py-1 px-8 font-bold text-black bg-green-400 rounded-r-lg border transition-transform transform hover:bg-green-300 focus:bg-green-300"
        >
          Send
        </button>
      </div>
    </div>
  );
}
