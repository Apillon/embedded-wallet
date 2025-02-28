import { Field, InputProps, Input as HeadlessInput, Label } from '@headlessui/react';
import clsx from 'clsx';

export default function Input({
  label,
  className,
  disabled,
  ...inputProps
}: { label?: string } & InputProps) {
  return (
    <Field>
      {!!label && <Label className="text-sm text-lightgrey font-normal mb-2 block">{label}</Label>}

      <HeadlessInput
        {...inputProps}
        disabled={disabled}
        className={clsx(
          'w-full px-5 py-3 text-sm',
          'rounded-lg border border-brightdark',
          '!outline-none bg-lightdark text-offwhite',
          'placeholder:text-lightgrey',
          {
            'hover:border-lightgrey focus:border-offwhite': !disabled,
            '!text-darkgrey': disabled,
          },
          className
        )}
      />
    </Field>
  );
}
