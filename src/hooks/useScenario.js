import { useState } from "react";

const useScenario = (scenarioOption = "Add") => {
  const [scenario, setScenario] = useState(scenarioOption);

  return {
    scenario,
    setScenario,
    handleScenario: (event, newScenario) => {
      if (newScenario === null) {
        setScenario("Add");
      } else {
        setScenario(newScenario);
      }
    },
  };
};

export default useScenario;
