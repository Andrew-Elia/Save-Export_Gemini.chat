const fullPdf = document.querySelector("#pdfFull");
const fullJpg = document.querySelector("#jpgFull");
const responsePdf = document.querySelector("#pdfSingle");
const responseJpg = document.querySelector("#jpgSingle");

fullPdf.addEventListener("click", () => {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    chrome.scripting.executeScript({
      target: { tabId: tabs[0].id },
      function: () => {
        // putting the whole document here in order to access tab content.
        function grabWholeConversation() {
          return document.querySelector("infinite-scroller");
        }

        function purify(elements) {
          deleteArray = elements.querySelectorAll(
            ".avatar-gutter, source-footnote, .response-container-header, .response-container-footer, button, freemium-file-upload-quota-exceeded-disclaimer, .restart-chat-button-scroll-placeholder, freemium-rag-disclaimer, .related-search-footer, .feedback-form-turn-index, sensitive-memories-banner, .response-footer, .skeleton-loader-container"
          );
          deleteArray.forEach((element) => {
            element.remove();
          });

          return elements.innerHTML;
        }

        function sendElementsToWindow(elements) {
          let win = window.open(
            "",
            "",
            "popup,height=1080, width=1200,toolbar=false,location=false"
          );
          win.document.write(`
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Gemini</title>
        <link rel="stylesheet" href="/css/mvp.css" />
        <link rel="stylesheet" href="/css/styleHTML.css" />
        <link rel="stylesheet" href="/css/print.css" media="print" />
      </head>
      <body>
        <main>`);
          win.document.write(elements);
          win.document.write(`</main></body></html>`);
          setTimeout(2000, win.print);
        }

        function wholePDF() {
          sendElementsToWindow(purify(grabWholeConversation()));
        }

        wholePDF();
      },
    });
  });
});
