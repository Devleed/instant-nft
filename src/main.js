/*global chrome*/

export async function getCurrentUrl() {
  await chrome.tabs.query({ active: true, currentWindow: true }, r => {
    chrome.scripting.executeScript({
      target: { tabId: r[0].id, allFrames: true },
      files: ['script2.js'],
    });
  });
}
