import { forwardRef, useRef } from 'react';
import { TFormElement } from '../../types/formTypes.ts';
import Input from './Input.tsx';

const RangeInput = forwardRef<HTMLInputElement, TFormElement<HTMLInputElement>>((props, ref) => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const style = { ...props?.style, '--range-progress': `${String(inputRef?.current?.value)?.replace('%', '')}%` };
  console.log('rerender', props.name);
  return (
    <Input
      {...props}
      ref={element => {
        if (ref) {
          if (typeof ref === 'function') ref(element);
          else ref.current = element;
        }
        if (inputRef) inputRef.current = element;
      }}
      type="range"
      style={style}
    />
  );
});

RangeInput.displayName = 'RangeInput';
export default RangeInput;
