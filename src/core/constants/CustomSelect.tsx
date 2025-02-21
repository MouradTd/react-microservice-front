import { useState, useEffect } from "react";

interface Option {
  key: string;
  value: string;
}

interface CustomSelectProps {
  label?: string;
  placeholder?: string;
  modelValue?: Option;
  data?: Option[];
  action?: (item: Option) => void;
  error?: boolean;
  errorMessage?: string;
  onUpdate?: (value: Option) => void;
}

const CustomSelect: React.FC<CustomSelectProps> = ({
  label = "",
  placeholder = "",
  modelValue,
  data = [{ key: "key", value: "value" }],
  action,
  error = false,
  errorMessage = "Error",
  onUpdate,
}) => {
  const [filterData, setFilterData] = useState<Option[]>(data);
  const [show, setShow] = useState<boolean>(false);

  useEffect(() => {
    setFilterData(data);
  }, [data]);

  const toggleDropdown = () => {
    setShow(!show);
  };

  const chooseOption = (item: Option) => {
    setShow(false);
    onUpdate?.(item);
    if (action) action(item);
  };

  const search = (word: string) => {
    if (word === "") {
      setFilterData(data);
      return;
    }
    const filtered = data.filter((item) =>
      Object.values(item).some((value) =>
        String(value).toLowerCase().includes(word.toLowerCase())
      )
    );
    setFilterData(filtered);
  };

  return (
    <div className="input-wrapper">
      <div className="relative">
        {label && (
          <label htmlFor={label} className="mb-2">
            {label} <span className="text-danger">*</span>
          </label>
        )}
        <input
          id={label}
          className={`form-select ${error ? "is-invalid" : ""}`}
          tabIndex={-1}
          autoComplete="off"
          placeholder={placeholder}
          aria-hidden="true"
          value={modelValue?.value || ""}
          onClick={toggleDropdown}
          onChange={(e) =>
            onUpdate?.({ key: modelValue?.key || "", value: e.target.value })
          }
        />
        {show && (
          <div className="bg">
            <input
              type="text"
              className="form-control"
              placeholder="Rechercher"
              onKeyUp={(e) => search(e.currentTarget.value)}
            />
            <ul role="list" className="select2-results__options">
              {filterData.length > 0 ? (
                filterData.map((item) => (
                  <li
                    key={item.key}
                    className="select2-results__option"
                    role="option"
                    onClick={() => chooseOption(item)}
                    style={{
                      padding: '10px 15px',
                      cursor: 'pointer',
                      backgroundColor: '#fff',
                      borderBottom: '1px solid #e0e0e0',
                      transition: 'background-color 0.2s',
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#f0f0f0')}
                    onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#fff')}
                  >
                    <span>{item.value}</span>
                  </li>
                ))
              ) : (
                <li className="select2-results__option">
                  <span className="text-center">Pas d'article</span>
                </li>
              )}
            </ul>
          </div>
        )}
        {error && <div className="invalid-feedback">{errorMessage}</div>}
      </div>
    </div>
  );
};

export default CustomSelect;
