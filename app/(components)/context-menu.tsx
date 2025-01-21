// components/ContextMenu.js
import React, { useEffect, useState } from "react";

export interface Item {
  label: string;
  onClick: () => void;
}

const useContextMenu = (context: string) => {
  const [items, setItems] = useState<Item[]>([]);

  useEffect(() => {
    if (context === "local-entry") {
      setItems([
        { label: "Delete", onClick: () => console.log("Delete clicked") },
        { label: "Edit", onClick: () => console.log("Edit clicked") },
        { label: "Stats", onClick: () => console.log("Stats clicked") },
        { label: "Review", onClick: () => console.log("Review clicked") },
      ]);
    }
  }, [context]);

  return { items };
};

const ContextMenu = ({
  position,
  context,
  visible,
  setVisible,
}: {
  position: { x: number; y: number };
  context: string;
  visible: boolean;
  setVisible: (visible: boolean) => void;
}) => {
  const { items } = useContextMenu(context);

  const handleOutsideClick = () => setVisible(false);

  return (
    <div
      style={{
        display: visible ? "block" : "none",
        position: "absolute",
        top: position.y,
        left: position.x,
        zIndex: 50,
      }}
      className="p-2 w-60 text-white rounded-lg bg-black/70 backdrop-blur-2xl"
      onClick={handleOutsideClick}
    >
      <ul>
        {items.map((item, index) => (
          <li
            key={index}
            className="p-2 cursor-pointer hover:bg-white/20"
            onClick={() => {
              item.onClick();
              setVisible(false);
            }}
          >
            {item.label}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ContextMenu;
