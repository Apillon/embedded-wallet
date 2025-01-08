import clsx from 'clsx';

export default ({
  title,
  description,
  header,
  className,
  titleClass,
}: {
  title: string;
  description?: string;
  header?: JSX.Element;
  className?: string;
  titleClass?: string;
}) => {
  return (
    <header className={clsx('text-center mb-6', className)}>
      {!!header && <div className="flex justify-center items-center mb-6">{header}</div>}

      <h2 className={clsx('mb-2', titleClass)}>{title}</h2>

      {!!description && <p className="text-sm text-lightgrey">{description}</p>}
    </header>
  );
};
