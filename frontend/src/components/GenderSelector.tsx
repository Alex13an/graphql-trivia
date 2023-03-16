import { useState } from "react";
import GenderForm from "./GenderForm";

const GenderSelector = () => {
  const [gender, setGender] = useState(0);
  const [isFormOpen, setIsFormOpen] = useState(false);

  return (
    <div className="mt-1">
      {isFormOpen && <GenderForm setIsFormOpen={setIsFormOpen} />}
      <button className="text-accent-color" onClick={() => setIsFormOpen(true)}>
        Add Gender
      </button>
    </div>
  );
};

export default GenderSelector;
