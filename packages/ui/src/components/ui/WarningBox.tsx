import clsx from 'clsx';
import IconInfo from './Icon/IconInfo';

export default ({ text, className }: { text: string; className?: string }) => (
  <div
    className={clsx('flex items-start justify-between gap-3 p-4 border border-solid', className)}
    style={{
      borderImageSource:
        'linear-gradient(180deg, #F9FF73 0%, #78DCE8 20.31%, #F7AF39 39.58%, #FF6188 59.37%, #A9DC76 79.17%, #AB9DF2 100%)',
      borderImageSlice: 1,
    }}
  >
    <div className="shrink-0">
      <IconInfo className="text-offwhite" />
    </div>

    <div className="text-sm font-normal text-offwhite">{text}</div>
  </div>
);
