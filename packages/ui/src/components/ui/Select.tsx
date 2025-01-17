import { Field, Label, Select as HeadlessSelect, SelectProps } from '@headlessui/react';
import clsx from 'clsx';

export default function Select({
  label,
  options,
  style,
  className,
  ...selectProps
}: {
  label?: string;
  options: { value: string | number; label: string }[];
} & SelectProps) {
  return (
    <Field>
      {!!label && <Label className="text-xs leading-relaxed font-bold mb-2 block">{label}</Label>}

      <HeadlessSelect
        aria-label={label}
        {...selectProps}
        className={clsx(
          'py-3 pl-5 pr-11',
          'bg-lightdark text-sm text-offwhite leading-relaxed',
          'rounded-lg border border-solid border-brightdark',
          className
        )}
        style={{
          appearance: 'none',
          backgroundImage: `url('data:image/svg+xml;utf-8,<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 16L6 10H18L12 16Z" fill="%23F0F2DA"/></svg>')`,
          backgroundRepeat: 'no-repeat',
          backgroundPosition: `calc(100% - 0.75rem) center`,
          ...style,
        }}
      >
        {options.map(o => (
          <option key={o.value} value={o.value} disabled={!o.value}>
            {o.label}
          </option>
        ))}
      </HeadlessSelect>
    </Field>
  );
}
