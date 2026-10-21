import { forwardRef, useRef } from 'react';
import { TFormElement } from '../../types/formTypes.ts';
import Input from './Input.tsx';

const RangeInput = forwardRef<HTMLInputElement, TFormElement<HTMLInputElement>>((props, ref) => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const value = inputRef.current?.value;
  const style = value === undefined ? props.style : { ...props.style, '--range-progress': `${value}%` };

  return (
    <Input
      {...props}
      ref={element => {
        if (ref) {
          if (typeof ref === 'function') ref(element);
          else ref.current = element;
        }
        inputRef.current = element;
        // The first render has no DOM value yet, so set the fill once the registered value is in place
        element?.style.setProperty('--range-progress', `${element.value}%`);
      }}
      type="range"
      style={style}
    />
  );
});

RangeInput.displayName = 'RangeInput';
export default RangeInput;
