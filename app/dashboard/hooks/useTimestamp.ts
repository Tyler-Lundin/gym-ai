import { useEffect, useState } from "react";

export default function useTimestamp() {
  const [timestamp, setTimestamp] = useState<Date | null>();

  useEffect(() => {
    const updateTimestamp = () => {
      setTimestamp(new Date());
    };

    updateTimestamp();
    const intervalId = setInterval(updateTimestamp, 1000);

    return () => clearInterval(intervalId);
  }, []);

  return timestamp;
}
