function Input({ label, type, name, value, onChange, placeholder, rows }) {
    return (
        <div className="mb-3">
           {/* Rótulo do campo de entrada */}
          <label htmlFor={name} className="form-label">
            {label}
          </label>
           {/* Renderiza um textarea se o tipo for "textarea", caso contrário renderiza um input */}
          {type === "textarea" ? (
            <textarea
              id={name}
              name={name}
              className="form-control"
              value={value}
              onChange={onChange}
              placeholder={placeholder}
              rows={rows}
            />
          ) : (
            <input
              type={type}
              id={name}
              name={name}
              className="form-control"
              value={value}
              onChange={onChange}
              placeholder={placeholder}
            />
          )}
        </div>
      );
}

export default Input;