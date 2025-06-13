import React from "react";

interface SelectBoxProps {
  values: any[]; // Replace `any` with a more specific type if possible (e.g., string[])
  name: string;
  id: number;
  onChange: any;
  defaultValue?: string;
}
function SelectBox({
  values,
  name,
  id,
  onChange,
  defaultValue,
}: SelectBoxProps) {
  return (
    <>
      <select
        className="select-box"
        onChange={(e) => onChange(id, e.target.value)}
        name={name}
        defaultValue={defaultValue}
      >
        <option>{name}</option>
        {values.map((value: any) => (
          <option key={value.id} value={value}>
            {" "}
            {value}
          </option>
        ))}
      </select>
    </>
  );
}

export default SelectBox;
