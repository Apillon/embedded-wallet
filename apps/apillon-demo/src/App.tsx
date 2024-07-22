import { useState } from 'react';
import imageWallet from './assets/image-wallet.png';
import Modal from './components/Modal';
import Demo from './components/Demo';
import myImage from './assets/image.png'; // Adjust the path as needed
import { Toaster } from 'sonner';

export default function App() {
  const btnClass =
    'relative rounded-lg text-sm font-bold  ' +
    'px-4 py-2.5 min-w-[160px] ' +
    'text-yellow border-b-lightdark border-t-lightdark';

  const [isModalOpen, setIsModalOpen] = useState(false);

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

          <div className="w-full md:!w-1/3 md:!text-right text-center">
            <div id="wallet"></div>

            {/* <button
              style={{ color: 'white', border: 'solid 1px white' }}
              onClick={async () => {
                const w = getEmbeddedWallet();
                console.log(
                  await w?.contractRead({
                    contractAbi: AccountManagerAbi,
                    contractAddress: '0xF35C3eB93c6D3764A7D5efC6e9DEB614779437b1',
                    contractFunctionName: 'gaspayingAddress',
                    chainId: 23295,
                  })
                );
              }}
            >
              W READ
            </button> */}
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

        <div className="flex items-center justify-center gap-x-4 w-full">
          <span className="text-yellow ml-3 font-bold">Powered by</span>
          <div className="w-[120px]">
            <svg
              id="Layer_1"
              data-name="Layer 1"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 1080 1080"
            >
              <path
                className="cls-1"
                d="M382.54,430.12c-13.19-13.46-28.8-24.51-46.08-32.56-.7-.36-1.42-.69-2.15-1-3.4-1.52-6.83-2.96-10.35-4.24-9.84-3.58-20.14-6.19-30.78-7.74-7.44-1.09-15.04-1.67-22.77-1.67-86.62,0-157.1,70.47-157.1,157.1,0,67.49,42.78,125.16,102.64,147.35,7.04,2.61,14.32,4.72,21.79,6.31,10.54,2.24,21.46,3.44,32.66,3.44,59.67,0,111.67-33.45,138.26-82.57,12.01-22.19,18.84-47.57,18.84-74.53,0-42.74-17.18-81.53-44.97-109.88Zm-222.36,193.93c-18.56-24.48-28.38-53.69-28.38-84.47,0-52.56,29.14-98.43,72.11-122.32,1.14-.63,2.26,.87,1.31,1.77-3.92,3.7-7.69,7.65-11.29,11.85-24.9,29.12-39.25,68.73-39.37,108.7,0,51.89,34.71,107.9,90.79,107.9,50.04,0,90.76-48.4,90.76-107.9,0-27.95-9.37-54.8-25.37-74.71-.56-.7,.1-1.7,.97-1.44,27.05,8,47.28,39.11,47.28,76.16,0,32.71-11.87,65.27-32.56,89.35-21.45,24.95-50.24,38.7-81.07,38.71-32.46,0-63.53-15.92-85.17-43.58Zm222.97-168.87c18.55,24.43,28.33,53.59,28.31,84.36,0,52.56-29.14,98.43-72.11,122.32-1.14,.63-2.26-.87-1.31-1.77,3.93-3.7,7.69-7.65,11.29-11.85,24.9-29.12,39.25-68.73,39.37-108.7,0-51.89-34.71-107.9-90.79-107.9-50.04,0-90.76,48.4-90.76,107.9,0,27.95,9.37,54.8,25.38,74.72,.56,.7-.1,1.7-.97,1.44-27.05-8-47.28-39.1-47.28-76.13,0-32.7,11.87-65.26,32.56-89.33,21.46-24.95,50.26-38.7,81.1-38.7,32.44,0,63.5,15.91,85.21,43.64Zm-63.47,84.39c0,37.06-18,69.04-43.8,83.4-3.2,1.78-7.14,1.56-10.09-.6l-5.52-4.03c-22.63-16.51-36.69-46.71-36.69-78.8,0-37.06,18-69.04,43.81-83.4,3.2-1.78,7.14-1.56,10.09,.6l5.52,4.03c22.63,16.51,36.69,46.71,36.69,78.8Z"
              />
              <g>
                <path
                  className="cls-1"
                  d="M557.85,492.42c-7.01-4.49-15.21-6.73-24.59-6.73s-17.61,2.24-24.67,6.73c-7.06,4.48-12.53,10.9-16.39,19.25-3.86,8.35-5.8,18.3-5.8,29.85s1.94,21.34,5.8,29.69c3.87,8.35,9.33,14.79,16.39,19.33,7.06,4.54,15.28,6.8,24.67,6.8s17.57-2.27,24.59-6.8c7.01-4.54,12.48-10.98,16.39-19.33,3.92-8.35,5.88-18.25,5.88-29.69s-1.96-21.62-5.88-29.92c-3.92-8.3-9.38-14.69-16.39-19.18Zm-4.1,69.2c-2.01,5.57-4.79,9.82-8.35,12.76-3.56,2.94-7.6,4.41-12.14,4.41s-8.61-1.47-12.22-4.41c-3.61-2.94-6.42-7.19-8.43-12.76-2.01-5.57-3.02-12.27-3.02-20.1s1-14.54,3.02-20.1c2.01-5.57,4.82-9.82,8.43-12.76,3.61-2.94,7.68-4.41,12.22-4.41s8.58,1.47,12.14,4.41c3.56,2.94,6.34,7.17,8.35,12.68,2.01,5.52,3.02,12.24,3.02,20.18s-1,14.54-3.02,20.1Z"
                />
                <path
                  className="cls-1"
                  d="M620.21,491.26l-26.51,97.9c-.86,3.19,1.54,6.33,4.85,6.33h11.84c2.28,0,4.27-1.54,4.86-3.74l4.05-15.4c.58-2.21,2.57-3.74,4.86-3.74h27.01c2.29,0,4.29,1.55,4.86,3.76l3.97,15.36c.57,2.22,2.57,3.76,4.86,3.76h12.43c3.31,0,5.71-3.15,4.84-6.34l-26.65-97.9c-.59-2.19-2.58-3.7-4.84-3.7h-25.57c-2.27,0-4.25,1.52-4.85,3.71Zm11.46,62.79c-3.29,0-5.69-3.11-4.86-6.3l4.45-16.9,1.62-6.73c1.23-5.13,8.53-5.13,9.76,0l1.61,6.73,4.37,16.92c.82,3.18-1.58,6.28-4.86,6.28h-12.1Z"
                />
                <path
                  className="cls-1"
                  d="M803.24,492.57v8.52c0,2.77,2.25,5.02,5.02,5.02h8.05c2.77,0,5.02,2.25,5.02,5.02v60.79c0,2.77-2.25,5.02-5.02,5.02h-8.05c-2.77,0-5.02,2.25-5.02,5.02v8.52c0,2.77,2.25,5.02,5.02,5.02h48.57c2.77,0,5.02-2.25,5.02-5.02v-8.52c0-2.77-2.25-5.02-5.02-5.02h-8.06c-2.77,0-5.02-2.25-5.02-5.02v-60.79c0-2.77,2.25-5.02,5.02-5.02h8.06c2.77,0,5.02-2.25,5.02-5.02v-8.52c0-2.77-2.25-5.02-5.02-5.02h-48.57c-2.77,0-5.02,2.25-5.02,5.02Z"
                />
                <path
                  className="cls-1"
                  d="M963.51,549.95c-2.11-3.97-4.9-7.16-8.35-9.59-3.46-2.42-7.22-4.33-11.29-5.72-4.08-1.39-8.17-2.58-12.29-3.56-4.13-.98-7.91-2.01-11.37-3.09-3.45-1.08-6.21-2.5-8.27-4.25-2.06-1.75-3.09-4.07-3.09-6.96,0-4.02,1.52-7.11,4.56-9.28,3.04-2.17,6.88-3.25,11.52-3.25,3.19,0,6.22,.53,8.89,1.93,3.55,1.87,5.97,4.72,7.32,6.77,.92,1.4,2.49,2.22,4.16,2.22h13.55c3.51,0,6.01-3.53,4.71-6.79-.92-2.31-2.09-4.46-3.53-6.44-3.81-5.26-8.79-9.28-14.92-12.06-6.14-2.78-12.86-4.18-20.18-4.18-7.94,0-14.85,1.39-20.72,4.18-5.87,2.78-10.44,6.57-13.69,11.37-3.25,4.79-4.87,10.18-4.87,16.16s1.03,10.54,3.09,14.3c2.06,3.76,4.82,6.78,8.28,9.05,3.45,2.27,7.24,4.13,11.37,5.57,4.12,1.44,8.22,2.68,12.29,3.71,4.08,1.03,7.84,2.14,11.29,3.32,3.45,1.19,6.21,2.71,8.28,4.56,2.06,1.86,3.09,4.33,3.09,7.42,0,4.23-1.57,7.53-4.72,9.9-3.14,2.37-7.35,3.56-12.6,3.56-6.5,0-11.44-1.91-14.85-5.72-1.42-1.59-2.51-3.51-3.31-5.71-.79-2.16-2.8-3.63-5.1-3.63h-12.18c-3.34,0-5.73,3.2-4.84,6.42,.81,2.93,1.91,5.66,3.32,8.18,3.4,6.09,8.25,10.78,14.54,14.07,6.29,3.3,13.77,4.95,22.43,4.95,7.83,0,14.82-1.37,20.95-4.1,6.13-2.73,10.95-6.5,14.46-11.29,3.5-4.79,5.26-10.39,5.26-16.78s-1.06-11.26-3.17-15.23Z"
                />
                <path
                  className="cls-1"
                  d="M778.5,549.95c-2.11-3.97-4.9-7.16-8.35-9.59-3.46-2.42-7.22-4.33-11.29-5.72-4.08-1.39-8.17-2.58-12.29-3.56-4.13-.98-7.91-2.01-11.37-3.09-3.45-1.08-6.21-2.5-8.27-4.25-2.06-1.75-3.09-4.07-3.09-6.96,0-4.02,1.52-7.11,4.56-9.28,3.04-2.17,6.88-3.25,11.52-3.25,3.19,0,6.22,.53,8.89,1.93,3.55,1.87,5.97,4.72,7.32,6.77,.92,1.4,2.49,2.22,4.16,2.22h13.55c3.51,0,6.01-3.53,4.71-6.79-.92-2.31-2.09-4.46-3.53-6.44-3.81-5.26-8.79-9.28-14.92-12.06-6.14-2.78-12.86-4.18-20.18-4.18-7.94,0-14.85,1.39-20.72,4.18-5.87,2.78-10.44,6.57-13.69,11.37-3.25,4.79-4.87,10.18-4.87,16.16s1.03,10.54,3.09,14.3c2.06,3.76,4.82,6.78,8.28,9.05,3.45,2.27,7.24,4.13,11.37,5.57,4.12,1.44,8.22,2.68,12.29,3.71,4.08,1.03,7.84,2.14,11.29,3.32,3.45,1.19,6.21,2.71,8.28,4.56,2.06,1.86,3.09,4.33,3.09,7.42,0,4.23-1.57,7.53-4.72,9.9-3.14,2.37-7.35,3.56-12.6,3.56-6.5,0-11.44-1.91-14.85-5.72-1.42-1.59-2.51-3.51-3.31-5.71-.79-2.16-2.8-3.63-5.1-3.63h-12.18c-3.34,0-5.73,3.2-4.84,6.42,.81,2.93,1.91,5.66,3.32,8.18,3.4,6.09,8.25,10.78,14.54,14.07,6.29,3.3,13.77,4.95,22.43,4.95,7.83,0,14.82-1.37,20.95-4.1,6.13-2.73,10.95-6.5,14.46-11.29,3.5-4.79,5.26-10.39,5.26-16.78s-1.06-11.26-3.17-15.23Z"
                />
              </g>
            </svg>
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
