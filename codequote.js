/* exported codequote */

const codequote = (function () {
  let ns = {};

  const SRC_ATT = "src";
  const LINES_ATT = "lines";
  const TRIM_ATT = "trim";

  function extractLines(code, fromLine, toLine, trim = true) {
    if (fromLine < 1) return code;
    var lines = code.split("\n").slice(fromLine - 1, toLine);
    if (trim) {
      var pad = lines[0].length - lines[0].trimStart().length;
      lines = lines.map((line) => line.slice(pad));
    }
    code = lines.join("\n");
    return code;
  }

  function getText(url) {
    return fetch(url).then((response) => {
      if (response.ok) {
        return response.text();
      }
    });
  }

  function fetchCode(codeUrl, fromLine, toLine, trim) {
    return getText(codeUrl).then((response) => {
      return extractLines(response, fromLine, toLine, trim);
    });
  }

  function quoteAll(callback) {
    const elements = document.querySelectorAll("code");

    const promises = Array.from(elements)
      .filter((element) => SRC_ATT in element.dataset)
      .map((element) => {
        let from = -1;
        let to = -1;

        if (LINES_ATT in element.dataset) {
          const lines = element.dataset[LINES_ATT].split("-");
          if (lines.length === 2) {
            from = parseInt(lines[0]);
            to = parseInt(lines[1]);
          }
        }
        let trim = true;
        if (TRIM_ATT in element.dataset) {
          trim = element.dataset[TRIM_ATT] === "true";
        }
        return fetchCode(element.dataset[SRC_ATT], from, to, trim).then(
          (code) => (element.textContent = code),
        );
      });

    Promise.all(promises).finally(callback);
  }

  function onReady(callback) {
    if (
      document.readyState === "complete" ||
      document.readyState === "interactive"
    ) {
      callback();
      return;
    }

    window.addEventListener("DOMContentLoaded", callback);
  }

  ns.all = function (callback) {
    onReady(() => quoteAll(callback));
  };

  return ns;
})();
