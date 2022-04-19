/*global chrome*/

function injectedFunction() {
  let on = true,
    startX = 0,
    startY = 0,
    endX = 0,
    endY = 0,
    crossHairsTop = 0,
    crossHairsLeft = 0,
    isMouseDown = false,
    windowWidth = 0,
    windowHeight = 0,
    borderWidth = 0,
    cropPositionTop = 0,
    cropPositionLeft = 0,
    cropWidth = 0,
    cropHeigth = 0,
    imageURL = '';

  const injectContainerDiv = `<div id="crop-container">${document.body.innerHTML}<div id="overlay"/>
  </div>`;

  document.body.innerHTML = injectContainerDiv;

  // const script = document.createElement('script');
  // script.src =
  //   'https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js';
  // script.integrity =
  //   'sha512-BNaRQnYJYiPSqHHDb58B0yaPfCu+Wgds8Gp/gU33kqBtgNS4tSPHuGibyoeqMV/TJlSKda6FXzoEyYGjTe+vXA==';
  // script.crossOrigin = 'anonymous';
  // script.referrerPolicy = 'no-referrer';
  // script.addEventListener('load', () => {
  //   console.log('html2canvas loaded');
  // });
  // script.type = 'text/javascript';

  // document.body.insertAdjacentElement('beforeend', script);

  // setTimeout(() => {
  //   document.body.insertAdjacentHTML(
  //     'beforeend',
  //     `<script>console.log('html2canvas', html2canvas)</script>`,
  //   );
  // }, 3000);

  // eslint-disable-next-line no-undef
  console.log('html2 canvas =', html2canvas);

  // let overlay = document.getElementById('overlay');
  // let cropContainer = document.getElementById('overlay');

  // window.addEventListener('resize', e => {
  //   windowWidth =
  //     window.innerWidth ||
  //     document.documentElement.clientWidth ||
  //     document.body.clientWidth;

  //   windowHeight =
  //     window.innerHeight ||
  //     document.documentElement.clientHeight ||
  //     document.body.clientHeight;
  // });

  // cropContainer.addEventListener('mousemove', () => {});
  // cropContainer.addEventListener('mousedown', e => {
  //   startX = e.clientX;
  //   startY = e.clientY;
  //   cropPositionTop = e.clientX;
  //   cropPositionLeft = e.clientY;
  //   isMouseDown = true;
  //   borderWidth = `${windowWidth}px ${windowHeight}px`;
  // });
  // cropContainer.addEventListener('mouseup', () => {});

  // overlay.style.position = 'fixed';
  // overlay.style.top = 0;
  // overlay.style.left = 0;
  // overlay.style.width = '100%';
  // overlay.style.height = '100%';
  // overlay.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
  // overlay.style.cursor = 'pointer';
}

export async function getCurrentUrl() {
  await chrome.tabs.query({ active: true, currentWindow: true }, r => {
    console.log('getCurrentUrl', __filename);

    chrome.scripting.executeScript({
      target: { tabId: r[0].id, allFrames: true },
      function: injectedFunction,
    });
  });
}
