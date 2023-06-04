import React, { useState } from 'react';
import { StringHelpers } from '@igortrindade/lazyfy'
interface InputProps {
  type?: string;
  id_input?: string;
  placeholder?: string;
  label?: string;
  action?: string;
  mask?: string | string[];
  value?: string | number | any;
  hasError?: boolean;
  disabled?: boolean;
  children?: any;
  icon?: any;
  keyToUpdate?: string | undefined;
  onChange: (value: any, keyToUpdate?: string) => void;
  inputClasses?: string;
}

interface InputEvent {
  target: {
    value: string;
  };
}


const Checkbox: React.FC<InputProps> = ({
  type = 'text',
  id_input,
  placeholder,
  label,
  value,
  hasError = false,
  disabled = false,
  children = null,
  icon = null,
  keyToUpdate = undefined,
  onChange,
  inputClasses = '',
}) => {
  const [childValue, setChildValue] = useState(value);
  const id = StringHelpers.randomString(12);

  const handleChildValueChange = (event: any) => {
    setChildValue(event.target.checked);
  };

  const generateId = () => {
    const characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let result = '';
    for (let i = 0; i < 10; i++) {
      result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
  };

  return (
    <div className="w-full flex flex-col">
      <div className="flex items-center">
        <input
          id={id}
          type="checkbox"
          checked={ value }
          onChange={handleChildValueChange}
          className={`checkbox ${ inputClasses }`}
        />
        <label htmlFor={id} className="ml-2 font-medium dark:text-gray-300">
          {label}
        </label>
      </div>
      <p className="text-red-600 h-4">{hasError && <slot name="error" />}</p>
    </div>
  );
}

export default Checkbox;