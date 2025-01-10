import { Field, InputProps, Input as HeadlessInput, Label } from '@headlessui/react';
import clsx from 'clsx';
import { useRef, useState } from 'react';
import useClickOutside from '../../hooks/useClickOutside';
import { TokenInfo } from '../../contexts/tokens.context';
import { useWalletContext } from '../../contexts/wallet.context';

export default ({
  token,
  label,
  className,
  disabled,
  ...inputProps
}: { token: TokenInfo; label?: string } & InputProps) => {
  const { setScreen } = useWalletContext();

  const fieldRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [focus, setFocus] = useState(false);

  useClickOutside(fieldRef, () => setFocus(false));

  return (
    <Field>
      {!!label && <Label className="text-xs leading-relaxed font-bold mb-2 block">{label}</Label>}

      <div
        ref={fieldRef}
        className={clsx(
          'w-full px-5 py-3 text-sm cursor-text',
          'flex flex-col justify-end',
          'rounded-lg border border-brightdark',
          '!outline-none bg-lightdark',
          {
            'hover:border-lightgrey': !disabled,
            '!border-offwhite': focus && !disabled,
          },
          className
        )}
        onClick={() => inputRef.current?.focus()}
      >
        <HeadlessInput
          ref={inputRef}
          type="number"
          step="0.01"
          {...inputProps}
          disabled={disabled}
          className={clsx(
            'placeholder:text-lightgrey !outline-none text-offwhite text-right rounded-none'
          )}
          onFocus={() => setFocus(true)}
        />

        <div className="text-right">
          <button
            type="button"
            className="oaw-button-plain !font-bold !text-offwhite"
            onClick={ev => {
              ev.stopPropagation();
              setScreen('selectToken');
            }}
          >
            {token.symbol}
          </button>
        </div>
      </div>
    </Field>
  );
};
