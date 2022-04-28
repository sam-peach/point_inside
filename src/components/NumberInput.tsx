import { useState, ChangeEvent } from "react";

const numberInputStyle = {
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  width: "100%",
};

const NumberInput = ({
  name,
  min,
  max,
  step,
  debounce,
  onChange,
}: {
  name: string;
  min?: number;
  max?: number;
  step?: number;
  debounce?: number;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}): JSX.Element => {
  const [disabled, setDisabled] = useState<boolean>(false);

  return (
    <div style={numberInputStyle}>
      <label>{name}</label>
      <input
        name={name}
        type="number"
        min={min}
        max={max}
        step={step}
        onChange={(e) => {
          if (!disabled) {
            setDisabled(true);
            setTimeout(() => {
              onChange(e);
              setDisabled(false);
            }, debounce);
          }
        }}
      />
    </div>
  );
};

export default NumberInput;
