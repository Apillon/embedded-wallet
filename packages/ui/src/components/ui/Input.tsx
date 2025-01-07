import { Field, InputProps, Input as HeadlessInput, Label } from '@headlessui/react';
import clsx from 'clsx';

export default function Input({
  label,
  className,
  ...inputProps
}: { label?: string } & InputProps) {
  return (
    <Field>
      {!!label && <Label className="text-xs leading-relaxed font-bold mb-2 block">{label}</Label>}

      <HeadlessInput
        {...inputProps}
        className={clsx(
          'w-full px-5 py-3 text-sm',
          'rounded-lg border border-brightdark focus:border-lightgrey',
          'outline-none bg-lightdark text-offwhite',
          'placeholder:text-lightgrey',
          className
        )}
      />
    </Field>
  );
}
