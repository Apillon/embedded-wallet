import { Menu as HeadlessMenu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';
import clsx from 'clsx';

export type MenuItemType = { label: string; onClick: () => void };

export default function Menu({
  items,
  children,
}: {
  items: MenuItemType[];
  children: React.ReactNode;
}) {
  return (
    <HeadlessMenu>
      <MenuButton as="div">{children}</MenuButton>

      <MenuItems
        anchor="bottom end"
        className={clsx(
          'p-1 bg-primarydark',
          'rounded-md overflow-hidden border border-solid border-brightdark',
          '[--anchor-gap:-4px]',
          'origin-top-right transition duration-100 ease-out',
          'focus:outline-none data-[closed]:scale-95 data-[closed]:opacity-0'
        )}
      >
        {items.map(item => (
          <MenuItem key={item.label}>
            <a
              href="#"
              className="block data-[focus]:bg-blue/10 p-1.5 rounded-sm text-sm leading-none"
              onClick={ev => {
                ev.preventDefault();
                item.onClick();
              }}
            >
              {item.label}
            </a>
          </MenuItem>
        ))}
      </MenuItems>
    </HeadlessMenu>
  );
}
