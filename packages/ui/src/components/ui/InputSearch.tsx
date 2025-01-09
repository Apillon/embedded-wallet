import { InputProps, Input as HeadlessInput } from '@headlessui/react';
import clsx from 'clsx';
import IconMagnify from './IconMagnify';
import { useRef, useState } from 'react';
import IconCircleX from './IconCircleX';
import useClickOutside from '../../hooks/useClickOutside';

export default function InputSearch({
  disabled,
  className,
  inputClass,
  onChange,
  ...inputProps
}: Omit<InputProps, 'onChange'> & {
  className?: string;
  inputClass?: string;
  onChange?: (val: string) => void;
}) {
  const fieldRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [focus, setFocus] = useState(false);
  const [hasContent, setHasContent] = useState(false);

  useClickOutside(fieldRef, () => setFocus(false));

  return (
    <div className={className}>
      <div ref={fieldRef} className="relative">
        <HeadlessInput
          ref={inputRef}
          placeholder="Search"
          disabled={disabled}
          {...inputProps}
          className={clsx(
            'w-full px-11 py-2 text-sm font-normal',
            'rounded-[20px] border border-brightdark',
            '!outline-none bg-lightdark text-offwhite',
            'placeholder:text-lightgrey',
            {
              'border-offwhite': focus && !disabled,
              'hover:border-lightgrey focus:border-offwhite': !disabled,
              'cursor-not-allowed !bg-transparent !text-darkgrey placeholder:!text-darkgrey':
                disabled,
            },
            inputClass
          )}
          onFocus={() => setFocus(true)}
          onChange={ev => {
            setHasContent(!!ev.target.value);
            onChange?.(ev.target.value);
          }}
        />

        <IconMagnify
          className={clsx('absolute left-3 top-1/2 -translate-y-1/2 text-darkgrey', {
            '!text-lightgrey': hasContent,
          })}
        />

        <button
          className={clsx(
            'oaw-button-plain absolute right-3 top-1/2 !-translate-y-1/2 !rounded-full',
            {
              '!opacity-0': !focus || !hasContent,
            }
          )}
          onClick={() => {
            if (inputRef.current) {
              inputRef.current.value = '';
              setHasContent(false);
              onChange?.('');
              inputRef.current.focus();
            }
          }}
        >
          <IconCircleX className="inline-block" />
        </button>
      </div>
    </div>
  );
}
