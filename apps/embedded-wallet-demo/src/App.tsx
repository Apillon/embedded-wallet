import { useState } from 'react';
import imageWallet from './assets/image-wallet.png';
import Modal from './components/Modal';
import Demo from './components/Demo';
import myImage from './assets/image.png';
import { Toaster } from 'sonner';
import { AuthPasskeyMode } from '@apillon/wallet-sdk';

export default function App({
  onModeChange,
}: {
  onModeChange: (mode: AuthPasskeyMode | string) => void;
}) {
  const btnClass =
    'relative rounded-lg text-sm font-bold  ' +
    'px-4 py-2.5 min-w-[160px] ' +
    'text-yellow border-b-lightdark border-t-lightdark';

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [passkeyAuthMode, setPasskeyAuthMode] = useState<AuthPasskeyMode | string>(
    sessionStorage?.getItem('mode') || 'popup'
  );

  return (
    <>
      <div className="min-h-screen flex flex-col justify-between px-8 pb-8">
        <nav className="max-w-7xl w-full py-10 mx-auto flex flex-wrap md:flex-nowrap items-center gap-y-4">
          <div className="w-full md:!w-1/3">
            <a href="https://apillon.io/" target="_blank">
              <svg
                width="163"
                height="28"
                viewBox="0 0 163 28"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="md:!ml-0 mr-auto ml-auto"
              >
                <path
                  d="M63.2674 22.5834L61.8411 17.5233H55.8302L54.4039 22.5834H51.3135L56.832 3.70164H60.9751L66.4936 22.5834H63.2674ZM58.9375 6.75804H58.7168L56.3905 15.0443H61.2638L58.9375 6.75804ZM69.1425 8.62583H72.097V11.003H72.2668C72.6743 10.154 73.2347 9.49181 73.9139 9.01637C74.5931 8.54093 75.4591 8.30321 76.4779 8.30321C78.1249 8.30321 79.4324 8.91449 80.4002 10.1371C81.3681 11.3596 81.8605 13.1934 81.8605 15.6046C81.8605 18.0158 81.3681 19.8496 80.4002 21.0722C79.4324 22.2947 78.1249 22.906 76.4779 22.906C75.4421 22.906 74.5931 22.6683 73.9139 22.1928C73.2347 21.7174 72.6743 21.0552 72.2668 20.2062H72.097V28H69.1425V8.62583ZM75.2553 20.5118C76.376 20.5118 77.242 20.1722 77.8363 19.476C78.4475 18.7968 78.7362 17.8799 78.7362 16.7423V14.467C78.7362 13.3293 78.4306 12.4124 77.8363 11.7332C77.225 11.054 76.376 10.6974 75.2553 10.6974C74.8308 10.6974 74.4233 10.7483 74.0327 10.8672C73.6422 10.9861 73.3196 11.1389 73.0309 11.3596C72.7423 11.5804 72.5045 11.8351 72.3347 12.1577C72.1649 12.4803 72.08 12.8539 72.08 13.2784V17.9309C72.08 18.3554 72.1649 18.7459 72.3347 19.0515C72.5045 19.3742 72.7423 19.6289 73.0309 19.8496C73.3196 20.0703 73.6592 20.2232 74.0327 20.342C74.4063 20.4609 74.8138 20.5118 75.2553 20.5118ZM85.9697 20.1892H90.7241V11.037H85.9697V8.62583H93.6786V20.1722H98.1443V22.5834H85.9697V20.1722V20.1892ZM92.2183 6.09582C91.4542 6.09582 90.9278 5.943 90.6392 5.63736C90.3335 5.33172 90.1977 4.95816 90.1977 4.4997V3.93936C90.1977 3.4809 90.3505 3.10734 90.6392 2.8017C90.9448 2.49606 91.4542 2.34324 92.2013 2.34324C92.9484 2.34324 93.4918 2.49606 93.7805 2.8017C94.0861 3.10734 94.222 3.4809 94.222 3.93936V4.4997C94.222 4.95816 94.0691 5.33172 93.7805 5.63736C93.4748 5.943 92.9654 6.09582 92.2183 6.09582ZM101.506 20.1892H106.125V4.97514H101.506V2.56398H109.079V20.1892H113.698V22.6004H101.489V20.1892H101.506ZM117.739 20.1892H122.358V4.97514H117.739V2.56398H125.312V20.1892H129.931V22.6004H117.722V20.1892H117.739ZM140.068 22.923C139.032 22.923 138.115 22.7532 137.3 22.4136C136.485 22.074 135.789 21.5816 135.212 20.9533C134.651 20.325 134.21 19.5609 133.904 18.661C133.599 17.7611 133.446 16.7423 133.446 15.6386C133.446 14.5349 133.599 13.5161 133.904 12.6161C134.21 11.7162 134.651 10.9521 135.212 10.3238C135.772 9.69557 136.468 9.20315 137.3 8.86355C138.115 8.52395 139.049 8.35415 140.068 8.35415C141.087 8.35415 142.021 8.52395 142.836 8.86355C143.651 9.20315 144.347 9.69557 144.924 10.3238C145.485 10.9521 145.926 11.7162 146.232 12.6161C146.537 13.5161 146.69 14.5349 146.69 15.6386C146.69 16.7423 146.537 17.7611 146.232 18.661C145.926 19.5609 145.485 20.325 144.924 20.9533C144.364 21.5816 143.668 22.074 142.836 22.4136C142.021 22.7532 141.087 22.923 140.068 22.923ZM140.068 20.5967C141.155 20.5967 142.004 20.2741 142.649 19.6119C143.294 18.9497 143.617 17.9818 143.617 16.6743V14.5688C143.617 13.2783 143.294 12.2935 142.649 11.6313C142.004 10.9691 141.155 10.6465 140.068 10.6465C138.981 10.6465 138.132 10.9691 137.487 11.6313C136.842 12.2935 136.519 13.2614 136.519 14.5688V16.6743C136.519 17.9648 136.842 18.9497 137.487 19.6119C138.132 20.2741 138.981 20.5967 140.068 20.5967ZM150.46 22.6004V8.62583H153.414V11.003H153.55C153.686 10.6465 153.873 10.2899 154.11 9.96725C154.331 9.62765 154.603 9.33899 154.942 9.10127C155.265 8.86355 155.639 8.65979 156.08 8.52395C156.522 8.38811 157.014 8.30321 157.591 8.30321C159.001 8.30321 160.138 8.76167 161.004 9.67859C161.87 10.5955 162.295 11.903 162.295 13.601V22.5834H159.34V14.0255C159.34 11.8011 158.372 10.6974 156.454 10.6974C156.08 10.6974 155.706 10.7483 155.35 10.8502C154.993 10.9521 154.671 11.1049 154.382 11.2917C154.093 11.4955 153.856 11.7502 153.686 12.0558C153.516 12.3614 153.431 12.718 153.431 13.1086V22.5834H150.477L150.46 22.6004ZM18.661 13.9915L0 0V27.983L18.661 13.9915ZM18.661 13.9915L37.322 27.983V0L18.661 13.9915Z"
                  fill="#F0F2DA"
                />
              </svg>
            </a>
          </div>

          <div className="w-full md:!w-1/3 text-center">
            <button className={btnClass} onClick={() => setIsModalOpen(true)}>
              How it works?
            </button>
          </div>

          <div
            className="w-full md:!w-1/3 md:!text-left text-center"
            style={{ display: 'flex', alignItems: 'center', gap: '10px' }}
          >
            <select
              value={passkeyAuthMode}
              style={{
                padding: '8px',
                borderRadius: '5px',
                border: '1px solid #ccc',
                backgroundColor: 'gray',
                color: 'white',
                cursor: 'pointer',
              }}
              onChange={e => {
                setPasskeyAuthMode(e.target.value);
                sessionStorage.setItem('mode', e.target.value);
                onModeChange(e.target.value);
              }}
            >
              {['popup', 'redirect', 'tab_form'].map(x => (
                <option key={x} value={x}>
                  {x.replace(/_/g, ' ').replace(/\b\w/g, char => char.toUpperCase())}
                </option>
              ))}
            </select>

            <div id="wallet" />
          </div>
        </nav>

        <div className="grid md:grid-cols-2 gap-8 grow items-center">
          <div>
            <img className="max-w-[350px] w-full mx-auto" src={imageWallet} alt="" />
          </div>
          <div>
            <div className="flex justify-center w-full max-w-[450px] mx-auto">
              <Demo />
            </div>
          </div>
        </div>
      </div>

      <Modal maxWidth="767px" isOpen={isModalOpen} setIsOpen={o => setIsModalOpen(o)}>
        <img className="max-w-[767px] w-full" src={myImage} alt="" />
      </Modal>

      <Toaster position="top-center" />
    </>
  );
}
