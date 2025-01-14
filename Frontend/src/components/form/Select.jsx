function Select({ text, name, options, value, onChange }) {
    return (
      <div className="mb-3">
        {/* Rótulo do campo select */}
        <label htmlFor={name} className="form-label">
          {text}
        </label>
        {/* Campo select */}
        <select
          id={name}
          name={name}
          className="form-select"
          value={value}
          onChange={onChange}
        >
           {/* Renderiza as opções do select */}
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
    );
  }
  
  export default Select;
