
const globalListings = [
  { title: "Merkez Skyline Rezidans", category: "Rezidans", price: "50.000 ₺ / Ay", status: "rent", img: "/img/Residence/residence1.jpg", keywords: "rezidans residence kiralık lüks merkez skyline 2+1" },
  { title: "Kule Rezidans Lüks Daire", category: "Rezidans", price: "75.000 ₺ / Ay", status: "rent", img: "/img/Residence/residence2.jpg", keywords: "rezidans residence kiralık kule manzara 3+1" },
  { title: "Havuzlu Lüks Villa", category: "Villa", price: "30.000 ₺ / Ay", status: "rent", img: "/img/villa/villa1.avif", keywords: "villa kiralık havuzlu müstakil 4+1 bahçeli" },
  { title: "Panoramik Manzaralı Villa", category: "Villa", price: "50.000 ₺ / Ay", status: "rent", img: "/img/villa/villa2.webp", keywords: "villa kiralık manzaralı özel havuz 5+1" },
  { title: "Doğa İçerisinde Triplex Villa", category: "Villa", price: "18.500.000 ₺", status: "sale", img: "/img/villa/villa3.jpg", keywords: "villa satılık triplex doğa akıllı ev 6+2" },
  { title: "Deniz Manzaralı Mülk", category: "Villa", price: "14.000.000 ₺", status: "sale", img: "/img/villa/villa4.jpg", keywords: "villa satılık deniz manzaralı garajlı 4+2" },
  { title: "Merkezi 2+1 Daire", category: "Daire", price: "25.000 ₺ / Ay", status: "rent", img: "/img/Daire/daire1.jpg", keywords: "daire apartment kiralık merkezi 2+1" },
  { title: "Site İçi Sıfır Daire", category: "Daire", price: "35.000 ₺ / Ay", status: "rent", img: "/img/Daire/daire2.jpg", keywords: "daire apartment kiralık site içi sıfır 3+1" },
  { title: "Geniş Balkonlu 3+1", category: "Daire", price: "3.850.000 ₺", status: "sale", img: "/img/Daire/daire3.jpg", keywords: "daire apartment satılık balkonlu 3+1" },
  { title: "Boğaz Manzaralı Tarihi Köşk", category: "Köşk", price: "120.000 ₺ / Ay", status: "rent", img: "/img/Köşk/köşk1.jpg", keywords: "köşk yalı mansion kiralık boğaz tarihi 6+2" },
  { title: "Osmanlı Mimari Yalı", category: "Köşk", price: "85.000.000 ₺", status: "sale", img: "/img/Köşk/kosk2.jpg", keywords: "köşk yalı mansion satılık osmanlı rıhtım 8+3" }
];

document.addEventListener('DOMContentLoaded', () => {
  const searchInputs = document.querySelectorAll('input[type="search"]');
  const cardContainer = document.querySelector('.row.g-4');

  if (searchInputs.length === 0) return;
  function renderCards(items) {
    if (!cardContainer) return;

    if (items.length === 0) {
      cardContainer.innerHTML = `
        <div class="col-12 text-center py-5">
          <i class="fa-solid fa-magnifying-glass fs-1 text-muted mb-3 d-block"></i>
          <h4 class="fw-bold">Sonuç Bulunamadı</h4>
          <p class="text-muted">Aramanızla eşleşen herhangi bir konut ilanına ulaşılamadı.</p>
        </div>`;
      return;
    }

    cardContainer.innerHTML = items.map(item => `
      <div class="col-xl-3 col-lg-4 col-md-6">
        <div class="card listing-card">
          <div class="listing-img-wrapper">
            <span class="badge-status ${item.status === 'rent' ? 'badge-rent' : 'badge-sale'}">
              ${item.status === 'rent' ? 'Kiralık' : 'Satılık'}
            </span>
            <img src="${item.img}" alt="${item.title}">
          </div>
          <div class="listing-body">
            <div>
              <span class="badge bg-light text-dark mb-2">${item.category}</span>
              <h3 class="listing-title">${item.title}</h3>
              <span class="listing-price">${item.price}</span>
            </div>
            <div class="d-flex gap-2 mt-2">
              <a href="#" class="btn btn-primary-custom flex-fill text-center btn-sm">Detaylar</a>
            </div>
          </div>
        </div>
      </div>
    `).join('');
  }

  function executeSearch(query) {
    const searchTerm = query.trim().toLowerCase('tr-TR');

    if (!searchTerm) {
      location.reload();
      return;
    }
    const results = globalListings.filter(item => {
      const matchTitle = item.title.toLowerCase('tr-TR').includes(searchTerm);
      const matchCategory = item.category.toLowerCase('tr-TR').includes(searchTerm);
      const matchKeywords = item.keywords.toLowerCase('tr-TR').includes(searchTerm);
      const matchStatus = (item.status === 'rent' ? 'kiralık' : 'satılık').includes(searchTerm);

      return matchTitle || matchCategory || matchKeywords || matchStatus;
    });

    renderCards(results);
  }
  searchInputs.forEach(input => {
    input.addEventListener('input', (e) => {
      searchInputs.forEach(i => i.value = e.target.value); 
      executeSearch(e.target.value);
    });
    const form = input.closest('form');
    if (form) {
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        executeSearch(input.value);
      });
    }
  });
});