import { useRef, useState } from 'react';
import { useWalletContext } from '../../contexts/wallet.context';
import IconPencil from '../ui/IconPencil';
import Input from '../ui/Input';
import clsx from 'clsx';
import Loader from '../ui/Loader';
import IconCheck from '../ui/IconCheck';
import useClickOutside from '../../hooks/useClickOutside';

export default ({ className }: { className?: string }) => {
  const {
    state: { walletIndex },
    activeWallet,
    wallet,
    handleError,
  } = useWalletContext();

  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(activeWallet?.title || '');
  const [loading, setLoading] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  useClickOutside(formRef, () => setIsEditing(false));

  async function updateWalletTitle() {
    if (title === activeWallet?.title) {
      setIsEditing(false);
      return;
    }

    if (loading || !title) {
      return;
    }

    setLoading(true);

    try {
      await wallet?.updateAccountWalletTitle({
        walletIndex,
        title,
      });

      setIsEditing(false);
    } catch (e) {
      handleError(e);
    }

    setLoading(false);
  }

  if (!activeWallet) {
    return <></>;
  }

  return (
    <div className={clsx('relative', className)}>
      <button
        className={clsx('oaw-button-plain !inline-flex items-center gap-2', {
          invisible: isEditing,
        })}
        title="Edit account name"
        onClick={() => setIsEditing(true)}
      >
        <span className="text-sm font-bold text-offwhite">{activeWallet.title}</span>

        <IconPencil />
      </button>

      {isEditing && (
        <form
          ref={formRef}
          className="flex w-full items-center justify-center gap-2 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
          onSubmit={ev => {
            ev.preventDefault();
            updateWalletTitle();
          }}
        >
          <Input
            autoFocus
            value={title}
            placeholder="Enter account name"
            disabled={loading}
            onChange={ev => setTitle(ev.target.value)}
          />

          <button
            type="submit"
            className="oaw-button-plain w-12 h-12 !rounded-sm !bg-green !text-deepdark !flex items-center justify-center"
          >
            {loading ? <Loader size={36} fill="currentColor" /> : <IconCheck />}
          </button>
        </form>
      )}
    </div>
  );
};
