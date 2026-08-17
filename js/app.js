(function () {
  const cfg = window.AU_MALHERBE_CONFIG || {};
  const dict = window.AU_MALHERBE_TRANSLATIONS || {};
  const availableLanguages = ["en", "fr", "es"];
  let lang = localStorage.getItem("auMalherbeLang") || "en";
  if (!availableLanguages.includes(lang)) lang = "en";

  const t = (key) => (dict[lang] && dict[lang][key]) || (dict.en && dict.en[key]) || key;
  window.auMalherbeT = t;
  window.auMalherbeLang = () => lang;

  function applyTranslations() {
    document.documentElement.lang = lang;
    document.querySelectorAll("[data-i18n]").forEach(el => {
      el.textContent = t(el.dataset.i18n);
    });
    document.querySelectorAll(".lang-select").forEach(select => select.value = lang);
    populateConfig();
    if (typeof window.renderRecommendations === "function") window.renderRecommendations();
  }

  function populateConfig() {
    document.querySelectorAll("[data-config='address']").forEach(el => el.textContent = cfg.address || "");
    document.querySelectorAll("[data-config='apartment']").forEach(el => el.textContent = cfg.apartment || "");
    document.querySelectorAll("[data-config='checkIn']").forEach(el => el.textContent = cfg.checkIn || "");
    document.querySelectorAll("[data-config='checkOut']").forEach(el => el.textContent = cfg.checkOut || "");
    document.querySelectorAll("[data-config='hostName']").forEach(el => el.textContent = cfg.hostName || "");
    document.querySelectorAll("[data-config='wifiName']").forEach(el => el.textContent = cfg.wifiName || "TO ADD");

    document.querySelectorAll("[data-maps-home]").forEach(el => el.href = cfg.mapsUrl || "#");

    const wifiPassword = cfg.wifiPassword || "";
    document.querySelectorAll("[data-wifi-password]").forEach(el => {
      el.textContent = wifiPassword || t("apt.privateWifi");
    });
    document.querySelectorAll("[data-copy-wifi]").forEach(btn => {
      btn.disabled = !wifiPassword;
      btn.onclick = () => copyText(wifiPassword, btn);
    });

    setupHostButtons();
  }

  function setupHostButtons() {
    const phone = cfg.hostPhone || "";
    const wa = cfg.hostWhatsapp || "";
    document.querySelectorAll("[data-host-phone]").forEach(a => {
      if (!phone) return a.hidden = true;
      a.hidden = false;
      a.href = `tel:${phone.replace(/\s/g, "")}`;
    });
    document.querySelectorAll("[data-host-whatsapp]").forEach(a => {
      if (!wa) return a.hidden = true;
      a.hidden = false;
      a.href = `https://wa.me/${wa.replace(/[^0-9]/g, "")}`;
    });
  }

  async function copyText(text, button) {
    if (!text) return;
    try {
      await navigator.clipboard.writeText(text);
    } catch (_) {
      const ta = document.createElement("textarea");
      ta.value = text; document.body.appendChild(ta); ta.select(); document.execCommand("copy"); ta.remove();
    }
    showToast(t("common.copied"));
    const original = button.innerHTML;
    button.textContent = "✓ " + t("common.copied");
    setTimeout(() => button.innerHTML = original, 1300);
  }

  function showToast(message) {
    let toast = document.querySelector(".toast");
    if (!toast) {
      toast = document.createElement("div"); toast.className = "toast"; document.body.appendChild(toast);
    }
    toast.textContent = message; toast.classList.add("show");
    setTimeout(() => toast.classList.remove("show"), 1800);
  }

  function setActiveNav() {
    const file = location.pathname.split("/").pop() || "index.html";
    document.querySelectorAll("[data-nav-file]").forEach(a => {
      a.classList.toggle("active", a.dataset.navFile === file);
    });
  }

  function loadBackgroundImages() {
    document.querySelectorAll("[data-bg]").forEach(el => {
      const url = el.dataset.bg;
      const img = new Image();
      img.onload = () => {
        const overlay = el.classList.contains("hero-photo") ? "linear-gradient(180deg, rgba(31,34,29,.03), rgba(31,34,29,.72))," : "";
        el.style.backgroundImage = `${overlay} url('${url}')`;
        el.dataset.placeholder = "";
      };
      img.src = url;
    });
  }

  function setupShare() {
    document.querySelectorAll("[data-share]").forEach(btn => {
      btn.addEventListener("click", async () => {
        const url = location.href;
        if (navigator.share) {
          try { await navigator.share({ title: cfg.siteName || "Au Malherbe", url }); } catch (_) {}
        } else {
          copyText(url, btn);
        }
      });
    });
  }

  function setupQr() {
    const backdrop = document.getElementById("qr-modal");
    if (!backdrop) return;
    const qr = document.getElementById("qr-code");
    const openButtons = document.querySelectorAll("[data-open-qr]");
    const close = () => backdrop.classList.remove("open");
    const open = () => {
      backdrop.classList.add("open");
      qr.innerHTML = "";
      const baseUrl = `${location.origin}${location.pathname.replace(/[^/]*$/, "")}`;
      if (window.QRCode) {
        new QRCode(qr, { text: baseUrl, width: 220, height: 220, correctLevel: QRCode.CorrectLevel.M });
      } else {
        qr.innerHTML = `<p class="muted">QR library unavailable.<br>${baseUrl}</p>`;
      }
    };
    openButtons.forEach(btn => btn.addEventListener("click", open));
    backdrop.querySelectorAll("[data-close-qr]").forEach(btn => btn.addEventListener("click", close));
    backdrop.addEventListener("click", e => { if (e.target === backdrop) close(); });
    document.addEventListener("keydown", e => { if (e.key === "Escape") close(); });
  }

  function initLanguageSelectors() {
    document.querySelectorAll(".lang-select").forEach(select => {
      select.value = lang;
      select.addEventListener("change", e => {
        lang = e.target.value;
        localStorage.setItem("auMalherbeLang", lang);
        applyTranslations();
      });
    });
  }

  document.addEventListener("DOMContentLoaded", () => {
    initLanguageSelectors();
    setActiveNav();
    loadBackgroundImages();
    setupShare();
    setupQr();
    applyTranslations();
  });
})();
