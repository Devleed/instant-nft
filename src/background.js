/*global chrome*/
// function injectedFunction() {
//   // eslint-disable-next-line no-undef
//   const canvasScript = `console.log(html2canvas);`;

//   const script = document.createElement('script');

//   script.innerHTML = canvasScript;

//   document.body.appendChild(script);
// }

chrome.action.onClicked.addListener(tab => {
  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    files: ['script2.js'],
  });
});
