var opacity = 0.6;

function main() {
  const sel = window.getSelection();

  if (sel.rangeCount) {
    const e = document.createElement("span");

    if (localStorage.getItem("options")) {
      let opt = JSON.parse(localStorage.getItem("options"));
      e.style = `font-size:${opt.fontSize}px; letter-spacing:${opt.letterSpacing}px; line-height:1.2;`;
      opacity = opt.opacity;
    } else {
      e.style = "font-size:25px; letter-spacing:1px; line-height:1.2;";

      localStorage.setItem(
        "options",
        JSON.stringify({
          fontSize: 25,
          letterSpacing: 1,
          opacity: 0.6,
        })
      );
    }

    e.innerHTML = bionifyText(sel.toString());
    const range = sel.getRangeAt(0);
    range.deleteContents();
    range.insertNode(e);
  }
}

function bionifyText(text) {
  const words = text.split(/\s+/);
  return words.map(bionifyWord).join(" ");
}

function bionifyWord(word) {
  const wordLength = word.length;
  const numBionifiedCharacters = Math.floor((wordLength * 60) / 100);
  const bionifiedToken = word.slice(0, numBionifiedCharacters);
  const theRest = word.slice(numBionifiedCharacters);
  return `<b>${bionifiedToken}</b><span style="opacity:${opacity}">${theRest}</span>`;
}

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.options) {
    localStorage.setItem("options", request.options);

    sendResponse({ status: "update settings" });
  }
});

main();
