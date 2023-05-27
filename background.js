chrome.runtime.onInstalled.addListener(function () {
  chrome.contextMenus.create({
    id: "bionify",
    title: "Bionic Read",
    contexts: ["selection"],
  });
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
  chrome.scripting.executeScript({
    target: { tabId: tab.id, allFrames: true },
    files: ["content.js"],
  });
});
