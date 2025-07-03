function filterKategori(event, kategori) {
  const cards = document.querySelectorAll(".produk-card");
  cards.forEach((card) => {
    card.style.display =
      kategori === "semua" || card.classList.contains(kategori)
        ? "block"
        : "none";
  });
  document.querySelectorAll(".filter-btn").forEach((btn) => {
    btn.classList.remove("bg-orange-100", "text-orange-500");
  });
  event.target.classList.add("bg-orange-100", "text-orange-500");
}

function clearSearch() {
  document.getElementById("searchInput").value = "";
}

function toggleSubmenu() {
  const submenu = document.getElementById("sosmedSubmenu");
  const icon = document.getElementById("sosmedIcon");
  submenu.classList.toggle("hidden");
  icon.classList.toggle("ph-caret-down");
  icon.classList.toggle("ph-caret-up");
}

const menuBtn = document.getElementById("menuBtn");
const mobileMenu = document.getElementById("mobileMenu");
const closeMenu = document.getElementById("closeMenu");

menuBtn.addEventListener("click", () => {
  mobileMenu.classList.remove("translate-x-full");
});

closeMenu.addEventListener("click", () => {
  mobileMenu.classList.add("translate-x-full");
});

document.querySelectorAll(".mobile-link").forEach((link) => {
  link.addEventListener("click", () => {
    mobileMenu.classList.add("translate-x-full");
  });
});

document.addEventListener("click", function (event) {
  const isClickInsideMenu = mobileMenu.contains(event.target);
  const isClickOnMenuBtn = menuBtn.contains(event.target);
  if (!isClickInsideMenu && !isClickOnMenuBtn) {
    mobileMenu.classList.add("translate-x-full");
  }
});

const fullscreenSearch = document.getElementById("fullscreenSearch");
const fullscreenResults = document.getElementById("fullscreenResults");
const originalProdukList = document.getElementById("produkList").innerHTML;

document
  .getElementById("searchInput")
  .addEventListener("focus", activateFullscreenSearch);

function activateFullscreenSearch() {
  document
    .querySelectorAll("header, footer, #produkList, #tentang, .filter-btn, nav")
    .forEach((el) => {
      el.classList.add("hidden-all");
    });

  fullscreenSearch.classList.remove("hidden");
  document.getElementById("fullscreenSearchInput").focus();

  const parser = new DOMParser();
  const doc = parser.parseFromString(originalProdukList, "text/html");
  const cards = doc.querySelectorAll(".produk-card");

  fullscreenResults.innerHTML = "";
  cards.forEach((card) => {
    const clone = card.cloneNode(true);
    clone.querySelectorAll("a").forEach((a) => {
      const beliBtn = a.querySelector(".btn-beli");
      if (!beliBtn) {
        const span = document.createElement("span");
        span.innerHTML = a.innerHTML;
        span.className = a.className;
        a.replaceWith(span);
      }
    });
    fullscreenResults.appendChild(clone);
  });
}

function filterProdukFullscreen() {
  const input = document
    .getElementById("fullscreenSearchInput")
    .value.toLowerCase();
  const parser = new DOMParser();
  const doc = parser.parseFromString(originalProdukList, "text/html");
  const cards = doc.querySelectorAll(".produk-card");

  fullscreenResults.innerHTML = "";

  cards.forEach((card) => {
    const namaProduk = card.querySelector("p").textContent.toLowerCase();
    if (namaProduk.includes(input) || !input.trim()) {
      const clone = card.cloneNode(true);
      clone.querySelectorAll("a").forEach((a) => {
        const beliBtn = a.querySelector(".btn-beli");
        if (!beliBtn) {
          const span = document.createElement("span");
          span.innerHTML = a.innerHTML;
          span.className = a.className;
          a.replaceWith(span);
        }
      });
      fullscreenResults.appendChild(clone);
    }
  });
}

function exitFullscreenSearch() {
  fullscreenSearch.classList.add("hidden");
  document
    .querySelectorAll("header, footer, #produkList, #tentang, .filter-btn, nav")
    .forEach((el) => {
      el.classList.remove("hidden-all");
    });

  document.getElementById("fullscreenSearchInput").value = "";
  fullscreenResults.innerHTML = "";
}

function clearFullscreenSearch() {
  document.getElementById("fullscreenSearchInput").value = "";

  const parser = new DOMParser();
  const doc = parser.parseFromString(originalProdukList, "text/html");
  const cards = doc.querySelectorAll(".produk-card");

  fullscreenResults.innerHTML = "";

  cards.forEach((card) => {
    const clone = card.cloneNode(true);
    clone.querySelectorAll("a").forEach((a) => {
      const beliBtn = a.querySelector(".btn-beli");
      if (!beliBtn) {
        const span = document.createElement("span");
        span.innerHTML = a.innerHTML;
        span.className = a.className;
        a.replaceWith(span);
      }
    });
    fullscreenResults.appendChild(clone);
  });
}
