import clsx from 'clsx';

export default function Toast({
  text,
  before,
  after,
  children,
  className,
  onDismiss,
}: {
  text?: string;
  before?: React.ReactNode;
  after?: React.ReactNode;
  children?: React.ReactNode;
  className?: string;
  onDismiss?: () => void;
}) {
  return (
    <div
      className={clsx(
        'relative px-3 py-2 w-[320px] max-w-full mx-auto bg-primarydark group',
        'rounded-md overflow-hidden border border-solid border-brightdark',
        'flex justify-center items-start gap-2',
        className
      )}
    >
      {before}

      {children}

      {!!text && (
        <div
          className="min-w-0 overflow-auto -mr-3 pr-3 -my-2 py-2 text-offwhite text-sm font-normal break-words"
          style={{ maxHeight: '120px' }}
        >
          {text}
        </div>
      )}

      {after}

      {!!onDismiss && (
        <button
          title="Dismiss"
          className={clsx(
            'oaw-button-plain absolute z-20 right-0.5 top-0.5',
            '!text-white/50 hover:!text-white',
            'opacity-0 group-hover:opacity-100'
          )}
          onClick={onDismiss}
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="block w-4 h-4"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M12 10.6569L6.34317 5L4.92896 6.41421L10.5858 12.0711L4.92898 17.7279L6.3432 19.1421L12 13.4853L17.6569 19.1421L19.0711 17.7279L13.4143 12.0711L19.0711 6.41421L17.6569 5L12 10.6569Z"
              fill="currentColor"
            />
          </svg>
        </button>
      )}
    </div>
  );
}
