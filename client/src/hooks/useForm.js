import { useState } from "react";

function useForm(initialValue) {
  const [values, setValues] = useState(initialValue);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues((prev) => {
      return { ...prev, [name]: value };
    });
  };

  const resetForm = () => setValues(initialValue);

  return [values, handleChange, resetForm];
}

export default useForm;
