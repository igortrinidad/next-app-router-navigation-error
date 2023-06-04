import React, { useState, useEffect } from 'react';

interface SelectProps {
  items: Array<any>;
  value: string | boolean | number | any;
  label?: string;
  placeholder?: string;
  icon?: string;
  keyLabel?: string;
  keyValue?: string;
  disabled?: boolean;
  hasError?: boolean;
  inputClasses?: string;
  keyToUpdate?: string;
  onChange?: (value: any, selectedItem: any) => void;
}

const Select: React.FC<SelectProps> = ({
  items,
  value,
  label,
  placeholder,
  icon,
  keyLabel = 'label',
  keyValue = 'id',
  disabled = false,
  hasError = false,
  inputClasses = 'w-full',
  keyToUpdate = null,
  onChange,
}) => {
  
  const [childValue, setChildValue] = useState(value);

  const getChildValue = (value: any) => {
    if (isString) {
      const selectedItem = items.find((item: any) => item === value);
      return selectedItem ? selectedItem : '';
    } else {
      const selectedItem = items.find((item: any) => item[keyValue] === value);
      return selectedItem ? selectedItem[keyValue] : '';
    }
  }

  useEffect(() => {
    const newValue = getChildValue(value)
    setChildValue(newValue);
  }, [value]);

  const getInputClass = () => {
    let classes = inputClasses.split(' ');
    if (hasError) {
      classes.push('border-rose-300');
    } else {
      classes.push('border-gray-400/30', 'focus:border-primary');
    }
    return classes.join(' ');
  };

  const handleChildValueChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newValue = event.target.value;
    setChildValue(newValue);

    if (typeof onChange === 'function') {
      // const selectedItem = items.find((item: any) => item[keyValue] === newValue);
      onChange(newValue, keyToUpdate);
    }
  };



  const isString = items.length > 0 && typeof items[0] === 'string';

  const getItems = () => {
    if (isString) {
      return items.map((item: string) => ({
        [keyLabel]: item,
        [keyValue]: item,
      }));
    } else {
      return items;
    }
  };

  return (
    <div className="block w-full">
      {label && (
        <label className="text-lg text-white">
          <span>{label}</span>
        </label>
      )}
      <select
        name={label}
        id={label}
        value={ childValue }
        onChange={handleChildValueChange}
        className={`p-3 rounded w-full backdrop-blur-sm bg-gray-800/60 ${getInputClass()}`}
        disabled={disabled}
      >
        <option className="text-gray-300 text-base" value={''} disabled>
          { placeholder || label || 'Select an option' }
        </option>
        {getItems().map((item: any) => (
          <option
            className="text-white text-base"
            value={item[keyValue]}
            key={item[keyValue]}
          >
            {item[keyLabel]}
          </option>
        ))}
      </select>
      {!hasError && <slot name="append" />}
    </div>
  );
};

export default Select;