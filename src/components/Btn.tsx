import { forwardRef } from 'react';
import clsx from 'clsx';
import Spinner from './Spinner';

type Props = {
  children?: React.ReactNode;
  style?: React.CSSProperties;
  className?: string;
  blank?: boolean; // render as <a> with target="_blank"
  self?: boolean; // render as <a> with target="_self"
  variant?: 'primary' | 'secondary';
  minWidth?: string;
  minHeight?: string;
  paddingClass?: string;
  disabled?: boolean;
  loading?: boolean;
} & Partial<React.ComponentPropsWithoutRef<'button'>> &
  Partial<React.ComponentPropsWithoutRef<'a'>>;

const DEFAULT_WIDTH = '160px';
const DEFAULT_HEIGHT = '40px'; // + borders top/bottom 4px
const DEFAULT_PADDING = 'px-4 py-2.5';

const Btn = forwardRef<HTMLAnchorElement, Props>(
  (
    {
      blank = false,
      self = false,
      variant = 'primary',
      minWidth = DEFAULT_WIDTH,
      minHeight = DEFAULT_HEIGHT,
      paddingClass = DEFAULT_PADDING,
      disabled = false,
      loading = false,
      type = 'button',
      className,
      ...props
    },
    ref
  ) => {
    const btnClass = clsx(
      paddingClass,
      className,
      'relative inline-block rounded-lg text-sm font-bold border-b-[4px] border-t-[4px]',
      {
        'transition-all hover:border-b-blue/50 hover:translate-y-[-2px] focus:translate-y-px focus:border-b-yellow/50':
          !loading && !disabled,
        'bg-yellow text-dark border-b-yellow border-t-yellow': variant === 'primary',
        'bg-lightdark text-offwhite border-b-lightdark border-t-lightdark': variant === 'secondary',
        'opacity-60': disabled,
      }
    );

    const btnStyle = { minWidth, minHeight };

    const btnContent = (
      <>
        {!!loading && <Spinner color="#141721" />} {!loading && props.children}
      </>
    );

    // External link
    if ((blank || self) && typeof props.href === 'string') {
      return (
        <a
          ref={ref}
          href={props.href}
          target={blank ? '_blank' : '_self'}
          rel="noreferrer"
          title={props.title}
          className={btnClass}
          style={btnStyle}
          onClick={props.onClick}
        >
          {btnContent}
        </a>
      );
    }

    // Internal navigation not implemented

    // Just a button :/
    return (
      <button
        ref={ref as any}
        type={type}
        disabled={loading || disabled}
        className={btnClass}
        style={btnStyle}
        {...props}
      >
        {btnContent}
      </button>
    );
  }
);

Btn.displayName = 'Btn';
export default Btn;
