(function () {
  let activeCategory = "all";

  function mapsLink(query) {
    return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
  }

  window.renderRecommendations = function () {
    const grid = document.getElementById("recommendations-grid");
    if (!grid) return;
    const lang = window.auMalherbeLang ? window.auMalherbeLang() : "en";
    const t = window.auMalherbeT || (x => x);
    const data = window.AU_MALHERBE_RECOMMENDATIONS || [];
    const visible = data.filter(item => activeCategory === "all" || item.category === activeCategory);

    grid.innerHTML = visible.map(item => `
      <article class="rec-card">
        <div class="rec-card-body">
          <div class="rec-top">
            <div>
              <div class="rec-tag">${item.tag[lang] || item.tag.en}</div>
              <h3>${item.title}</h3>
            </div>
            <div class="rec-emoji" aria-hidden="true">${item.emoji}</div>
          </div>
          <p>${item.description[lang] || item.description.en}</p>
          <div class="rec-address">📍 ${item.address}</div>
          <div class="rec-actions">
            <a class="btn btn-ghost" target="_blank" rel="noopener" href="${mapsLink(item.mapsQuery || item.address)}">↗ ${t("common.maps")}</a>
          </div>
        </div>
      </article>
    `).join("");
  };

  document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll("[data-filter]").forEach(btn => {
      btn.addEventListener("click", () => {
        activeCategory = btn.dataset.filter;
        document.querySelectorAll("[data-filter]").forEach(b => b.classList.toggle("active", b === btn));
        window.renderRecommendations();
      });
    });
    window.renderRecommendations();
  });
})();
