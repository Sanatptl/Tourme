const FormInput = ({
  value,
  placeholder,
  id,
  name,
  type,
  onChange,
  label,
  classDiv,
  classLabel,
  classInput,
  required,
  maxLength,
}) => {
  return (
    <div className={`form__group ${classDiv}`}>
      <label htmlFor={id} className={`form__label ${classLabel}`}>
        {label}
      </label>
      <input
        name={name}
        type={type}
        id={id}
        value={value}
        onChange={onChange}
        className={`form__input ${classInput}`}
        placeholder={placeholder}
        required={required ?? false}
        maxLength={maxLength ?? undefined}
      />
    </div>
  );
};

export default FormInput;
