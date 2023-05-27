document.addEventListener("DOMContentLoaded", function () {
  const saveSettings = document.getElementById("saveSettings");
  const fontSize = document.getElementById("fontSize");
  const letterSpacing = document.getElementById("letterSpacing");
  const opacity = document.getElementById("opacity");
  const fontSpan = document.getElementById("fontSpan");
  const spacingSpan = document.getElementById("spacingSpan");
  const opacitySpan = document.getElementById("opacitySpan");

  saveSettings.onclick = async function (e) {
    localStorage.setItem(
      "options",
      JSON.stringify({
        fontSize: fontSize.value,
        letterSpacing: letterSpacing.value,
        opacity: opacity.value / 10,
      })
    );

    let queryOptions = { active: true, currentWindow: true };
    const [tab] = await chrome.tabs.query(queryOptions);
    const response = await chrome.tabs.sendMessage(tab.id, {
      options: JSON.stringify({
        fontSize: fontSize.value,
        letterSpacing: letterSpacing.value,
        opacity: opacity.value / 10,
      }),
    });
    //console.log(response);
  };

  fontSize.addEventListener("input", (event) => {
    fontSpan.textContent = event.target.value;
  });

  letterSpacing.addEventListener("input", (event) => {
    spacingSpan.textContent = event.target.value;
  });

  opacity.addEventListener("input", (event) => {
    opacitySpan.textContent = event.target.value / 10;
  });

  function getOrSetOptions() {
    if (!localStorage.getItem("options")) {
      localStorage.setItem(
        "options",
        JSON.stringify({
          fontSize: fontSize.value,
          letterSpacing: letterSpacing.value,
          opacity: opacity.value / 10,
        })
      );
    } else {
      let opt = JSON.parse(localStorage.getItem("options"));
      document.getElementById("fontSize").value = opt.fontSize;
      document.getElementById("letterSpacing").value = opt.letterSpacing;
      document.getElementById("opacity").value = opt.opacity * 10;
    }

    fontSpan.textContent = fontSize.value;
    spacingSpan.textContent = letterSpacing.value;
    opacitySpan.textContent = opacity.value / 10;
  }

  getOrSetOptions();
});
