// Footer year (all pages)
const yr = document.getElementById("yr");
if (yr) yr.textContent = new Date().getFullYear();

// Projects page: filter buttons + popup viewer
const grid = document.getElementById("grid");
if (grid) {
  const chips = document.querySelectorAll(".chip");
  const cards = document.querySelectorAll(".proj");
  const empty = document.getElementById("empty");

  chips.forEach(chip => chip.addEventListener("click", () => {
    const cat = chip.dataset.cat;
    chips.forEach(c => c.classList.toggle("on", c === chip));
    let shown = 0;
    cards.forEach(card => {
      const ok = cat === "All" || card.dataset.category === cat;
      card.hidden = !ok;
      if (ok) shown++;
    });
    empty.hidden = shown > 0;
  }));

  const modal = document.getElementById("modal");
  const box = document.getElementById("m-content");
  cards.forEach(card => card.addEventListener("click", e => {
    if (e.target.closest("a")) return;
    box.innerHTML = "";
    ["thumb", "cat", "title", "desc", "tags", "link"].forEach(k => {
      const src = card.querySelector("[data-m='" + k + "']");
      if (src) box.appendChild(src.cloneNode(true));
    });
    modal.hidden = false;
  }));
  const close = () => { modal.hidden = true; };
  document.getElementById("m-close").addEventListener("click", close);
  modal.addEventListener("click", e => { if (e.target === modal) close(); });
  document.addEventListener("keydown", e => { if (e.key === "Escape") close(); });
}

// Contact page: opens the visitor's email app
const form = document.getElementById("msg-form");
if (form) form.addEventListener("submit", e => {
  e.preventDefault();
  const to = form.dataset.email;
  const name = document.getElementById("f-name").value;
  const body = document.getElementById("f-msg").value + "\n\n— " + name + " (" + document.getElementById("f-email").value + ")";
  location.href = "mailto:" + to + "?subject=" + encodeURIComponent("Portfolio message from " + name) + "&body=" + encodeURIComponent(body);
});
