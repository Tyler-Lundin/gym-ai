import { useState } from "react";

export default function CyclesSetup({ userData, setUserData, onNext }: any) {
  const [cycles, setCycles] = useState(userData.periods[0]?.cycles || []);

  const handleAddCycle = () => {
    setCycles((prev) => [...prev, { name: "", duration: 4, notes: "" }]);
  };

  const handleNext = () => {
    const updatedPeriods = [...userData.periods];
    updatedPeriods[0].cycles = cycles;
    onNext({ periods: updatedPeriods });
  };

  return (
    <div>
      <h2>Define Cycles</h2>
      {cycles.map((cycle, index) => (
        <div key={index}>
          <label>
            Cycle Name:
            <input
              value={cycle.name}
              onChange={(e) =>
                setCycles((prev) =>
                  prev.map((c, i) =>
                    i === index ? { ...c, name: e.target.value } : c,
                  ),
                )
              }
            />
          </label>
        </div>
      ))}
      <button onClick={handleAddCycle}>Add Cycle</button>
      <button onClick={handleNext}>Next</button>
    </div>
  );
}
