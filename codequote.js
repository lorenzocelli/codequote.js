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

  function request(url) {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open("GET", url);
      xhr.onload = () => resolve(xhr.responseText);
      xhr.onerror = () =>
        reject({
          status: xhr.status,
          statusText: xhr.statusText,
        });
      xhr.send();
    });
  }

  function fetchCode(codeUrl, fromLine, toLine, trim) {
    return new Promise(function (resolve, reject) {
      request(codeUrl)
        .then(function (response) {
          const code = extractLines(response, fromLine, toLine, trim);
          resolve(code);
        })
        .catch(function (err) {
          reject(err);
        });
    });
  }

  function quoteAll(callback) {
    let promises = [];
    const elements = document.querySelectorAll("code");

    elements.forEach(function (element) {
      if (!(SRC_ATT in element.dataset)) return;

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
      let p = fetchCode(element.dataset[SRC_ATT], from, to, trim);
      p.then(function (code) {
        element.textContent = code;
      });
      promises.push(p);
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
