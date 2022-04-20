/* eslint-disable no-undef */

// ? INSERT WEB3
const web3Script = document.createElement('script');
web3Script.src =
  'https://cdnjs.cloudflare.com/ajax/libs/web3/1.7.3/web3.min.js';
web3Script.integrity =
  'sha512-Ws+qbaGHSFw2Zc1e7XRpvW+kySrhmPLFYTyQ95mxAkss0sshj6ObdNP3HDWcwTs8zBJ60KpynKZywk0R8tG1GA==';
web3Script.crossOrigin = 'anonymous';
web3Script.referrerPolicy = 'no-referrer';
web3Script.type = 'text/javascript';
document.body.insertAdjacentElement('beforeend', web3Script);

web3Script.addEventListener('load', () => {
  // ? INSERT HTML2CANVAS
  const html2CanvasScript = document.createElement('script');
  html2CanvasScript.src =
    'https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js';
  html2CanvasScript.integrity =
    'sha512-BNaRQnYJYiPSqHHDb58B0yaPfCu+Wgds8Gp/gU33kqBtgNS4tSPHuGibyoeqMV/TJlSKda6FXzoEyYGjTe+vXA==';
  html2CanvasScript.crossOrigin = 'anonymous';
  html2CanvasScript.referrerPolicy = 'no-referrer';
  html2CanvasScript.type = 'text/javascript';
  document.body.insertAdjacentElement('beforeend', html2CanvasScript);

  html2CanvasScript.addEventListener('load', () => {
    const injectContainerDiv = `<div id="crop-container">${document.body.innerHTML}<div id="overlay"/>
  </div>`;

    document.body.innerHTML = injectContainerDiv;

    let overlay = document.getElementById('overlay');
    let cropContainer = document.getElementById('crop-container');

    overlay.style.position = 'fixed';
    overlay.style.top = 0;
    overlay.style.left = 0;
    overlay.style.width = '100%';
    overlay.style.height = '100%';
    overlay.style.background = 'rgba(0, 0, 0, 0.5)';
    overlay.style.cursor = 'pointer';

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
      cropPositionTop = 0,
      cropPositionLeft = 0,
      cropWidth = 0,
      cropHeigth = 0,
      imageURL = '';

    window.addEventListener('resize', e => {
      windowWidth =
        window.innerWidth ||
        document.documentElement.clientWidth ||
        document.body.clientWidth;

      windowHeight =
        window.innerHeight ||
        document.documentElement.clientHeight ||
        document.body.clientHeight;
    });

    cropContainer.addEventListener('mousemove', e => {
      let newCropPositionTop = startY;
      let newCropPositionLeft = startX;
      const endX = e.clientX;
      const endY = e.clientY;
      const isStartTop = endY >= startY;
      const isStartBottom = endY <= startY;
      const isStartLeft = endX >= startX;
      const isStartRight = endX <= startX;
      const isStartTopLeft = isStartTop && isStartLeft;
      const isStartTopRight = isStartTop && isStartRight;
      const isStartBottomLeft = isStartBottom && isStartLeft;
      const isStartBottomRight = isStartBottom && isStartRight;
      let newBorderWidth = overlay.style.borderWidth;

      if (isMouseDown) {
        if (isStartTopLeft) {
          newBorderWidth = `${startY}px ${windowWidth - endX}px ${
            windowHeight - endY
          }px ${startX}px`;
          cropWidth = endX - startX;
          cropHeigth = endY - startY;
        }

        if (isStartTopRight) {
          newBorderWidth = `${startY}px ${windowWidth - startX}px ${
            windowHeight - endY
          }px ${endX}px`;
          cropWidth = startX - endX;
          cropHeigth = endY - startY;
          cropPositionLeft = endX;
        }

        if (isStartBottomLeft) {
          newBorderWidth = `${endY}px ${windowWidth - endX}px ${
            windowHeight - startY
          }px ${startX}px`;
          cropWidth = endX - startX;
          cropHeigth = startY - endY;
          cropPositionTop = endY;
        }

        if (isStartBottomRight) {
          newBorderWidth = `${endY}px ${windowWidth - startX}px ${
            windowHeight - startY
          }px ${endX}px`;
          cropWidth = startX - endX;
          cropHeigth = startY - endY;
          cropPositionLeft = endX;
          cropPositionTop = endY;
        }
        console.log({
          crossHairsTop: e.clientY,
          crossHairsLeft: e.clientX,
          borderWidth: newBorderWidth,
          cropWidth,
          cropHeigth,
          cropPositionTop: newCropPositionTop,
          cropPositionLeft: newCropPositionLeft,
        });
      }

      crossHairsTop = e.clientY;
      crossHairsLeft = e.clientX;
      overlay.style.borderWidth = newBorderWidth;
      cropPositionTop = newCropPositionTop;
      cropPositionLeft = newCropPositionLeft;
    });
    cropContainer.addEventListener('mousedown', e => {
      overlay.style.background = 'none';
      overlay.style.borderStyle = 'solid';
      overlay.style.borderColor = 'rgba(0, 0, 0, 0.5)';

      startX = e.clientX;
      startY = e.clientY;
      cropPositionTop = e.clientX;
      cropPositionLeft = e.clientY;
      isMouseDown = true;
      overlay.style.borderWidth = `${windowWidth}px ${windowHeight}px`;
    });
    cropContainer.addEventListener('mouseup', () => {
      handleScreenshot();
      isMouseDown = false;
      overlay.style.borderWidth = 0;
    });

    const handleScreenshot = () => {
      const body = document.querySelector('body');

      html2canvas(body).then(canvas => {
        let croppedCanvas = document.createElement('canvas');
        let croppedCanvasContext = croppedCanvas.getContext('2d');

        croppedCanvas.width = cropWidth;
        croppedCanvas.height = cropHeigth;

        croppedCanvasContext.drawImage(
          canvas,
          cropPositionLeft,
          cropPositionTop,
          cropWidth,
          cropHeigth,
          0,
          0,
          cropWidth,
          cropHeigth,
        );

        onEndCapture(croppedCanvas.toDataURL());
      });

      crossHairsTop = 0;
      crossHairsLeft = 0;
    };

    const onEndCapture = img => {
      on = false;

      console.log('got img =', img);
    };
  });
});
