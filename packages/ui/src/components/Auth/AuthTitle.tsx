import clsx from 'clsx';

export default ({
  title,
  description,
  header,
  className,
}: {
  title: string;
  description?: string;
  header?: JSX.Element;
  className?: string;
}) => {
  return (
    <header className={clsx('text-center mb-6', className)}>
      {!!header && <div className="flex justify-center items-center mb-6">{header}</div>}

      <h2 className="mb-2">{title}</h2>

      {!!description && <p className="text-sm text-lightgrey">{description}</p>}
    </header>
  );
};
