const FormInput = ({
  value,
  placeholder,
  id,
  type,
  onChange,
  label,
  classDiv,
  classLabel,
  classInput,
}) => {
  return (
    <div className={`form__group ${classDiv}`}>
      <label htmlFor={id} className={`form__label ${classLabel}`}>
        {label}
      </label>
      <input
        type={type}
        id={id}
        value={value}
        onChange={onChange}
        className={`form__input ${classInput}`}
        placeholder={placeholder}
      />
    </div>
  );
};

export default FormInput;
