(function() {
  // Benign CSP bypass PoC — authorized pentest only
  // Effect: changes page title and adds a visible banner
  // No cookies, no tokens, no network calls, no user data

  var domain = document.domain;
  var origin = location.origin;

  // 1. Title change — visible in tab and screenshots
  document.title = "CSP_BYPASS_CONFIRMED | " + domain;

  // 2. On-page banner — visible in screen recording
  var banner = document.createElement("div");
  banner.id = "csp-bypass-poc-banner";
  banner.style.cssText = [
    "position:fixed",
    "top:0",
    "left:0",
    "width:100%",
    "background:#d00",
    "color:#fff",
    "font:700 15px/40px monospace",
    "text-align:center",
    "z-index:2147483647",
    "letter-spacing:1px",
    "border-bottom:3px solid #900",
    "pointer-events:none"
  ].join(";");
  banner.textContent = "\u26A0 CSP BYPASS via cdn.jsdelivr.net — " + origin
    + " — Authorized pentest | " + new Date().toISOString();

  // Wait for body if document not ready yet
  if (document.body) {
    document.body.appendChild(banner);
  } else {
    document.addEventListener("DOMContentLoaded", function() {
      document.body.appendChild(banner);
    });
  }

  // 3. Console marker — visible in DevTools screenshot
  console.warn(
    "%c[PENTEST] CSP BYPASS CONFIRMED",
    "background:#d00;color:#fff;font-size:14px;padding:4px 8px;font-weight:bold"
  );
  console.warn("Script origin:    cdn.jsdelivr.net (allowlisted in CSP script-src)");
  console.warn("Executing domain: " + domain);
  console.warn("No data was read, exfiltrated, or transmitted.");
  console.warn("Finding: unsafe CSP allowlist — remove cdn.jsdelivr.net from script-src");
})();
