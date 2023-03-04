import React from "react";
import { init } from "xstate/lib/actionTypes";

type TextInputProps = {
  initValue: string;
  onChange: (value: string) => void;
  classes:string
};

const TextInput = ({ initValue, onChange, classes }: TextInputProps) => {
  const [value, setValue] = React.useState(initValue);

  React.useEffect(()=>{
    onChange(value)
  }, [value])


  return (
    <input
      value={value}
      onChange={(e) => {
        setValue(e.target.value)
      }}
      className={` px-4 mx-2 outline-none text-sm text-gray-900 rounded-md bg-gray-50 border border-gray-300 focus:border-2 focus:border-blue-500 ${classes}`}
      type="text"
      placeholder="Sell amount"
    />
  );
};

export default TextInput;
