import React from 'react';
import { masker } from '@/util/mask-input';
interface onChangeInput {
  value: any
}

interface onChangeInputModel {
  value: any;
  keyToUpdate: string
}

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
}

interface InputEvent {
  target: {
    value: string;
  };
}

const InputWithIcon: React.FC<InputProps> = ({
  type = 'text',
  id_input,
  placeholder,
  label,
  action,
  mask,
  value,
  hasError = false,
  disabled = false,
  children = null,
  icon = null,
  keyToUpdate = undefined,
  onChange,
}) => {
  const onKeyDownEnter = (value: string) => {
    // Emit keydown_enter event
  };

  const getInputClass = () => {
    let classes = ['input-classes input-bordered'];
    if (icon) {
      classes.push('pl-9');
    } else {
      classes.push('pl-4');
    }
    if (hasError) {
      classes.push('border-rose-300');
    } else {
      classes.push('border-gray-400/30 focus:border-primary');
    }
    return classes.join(' ');
  };

  return (
    <div className="w-full">
      {label && (
        <label className="text-lg">
          <span>{ label }</span>
        </label>
      )}
      <div className="relative">
        { icon && <div className="icon-classes">{ icon }</div>}
        <input
          type={ type }
          id={ id_input }
          placeholder={ placeholder }
          value={ value }
          onChange={(e: InputEvent) => {

            if(!mask) {
              onChange(e.target.value, keyToUpdate)
            } else {
              const masked = masker(e.target.value, mask, true);
              if(masked != value) {
                onChange(masked, keyToUpdate)
              }
            }
          }}
          onKeyDown={(e: any) => {
            if (e.key === 'Enter') {
              onKeyDownEnter(e.target.value);
            }
          }}
          className={`backdrop-blur-sm ${getInputClass()}`}
          disabled={ disabled }
        />
      </div>

      {hasError && (
        <p className="text-red-600 h-4 text-sm">
          { children }
        </p>
      )}

      {!hasError && <>{ children }</>}
    </div>
  );
};

export default InputWithIcon;
