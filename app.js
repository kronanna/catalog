const products = window.catalogProducts || [];
const grid = document.querySelector('#productGrid');
const dialog = document.querySelector('#productDialog');
const dialogImage = document.querySelector('#dialogImage');
const dialogName = document.querySelector('#dialogName');
const dialogPrice = document.querySelector('#dialogPrice');
const dialogAuthor = document.querySelector('#dialogAuthor');
const dialogDescription = document.querySelector('#dialogDescription');
const dialogSpecs = document.querySelector('#dialogSpecs');
const dialogIndex = document.querySelector('#dialogIndex');
const labels = { furniture: 'Мебель', art: 'Искусство', light: 'Свет' };

function photoClass(product) { return product.scene ? 'product-photo--scene' : 'product-photo--cutout'; }

function updateFilterCounts() {
  document.querySelectorAll('.filter').forEach((button) => {
    const filter = button.dataset.filter;
    const total = filter === 'all' ? products.length : products.filter((product) => product.type === filter).length;
    button.querySelector('span').textContent = total;
  });
}

function makeCard(product) {
  const card = document.createElement('button');
  card.className = 'product-card';
  if (product.name === 'Скульптура «Искра / Étincelle»') card.classList.add('product-card--no-hover');
  card.type = 'button';
  card.setAttribute('aria-label', `Открыть: ${product.name}`);
  const image = document.createElement('div');
  image.className = 'card-image';
  if (product.photo) {
    const photo = document.createElement('img');
    photo.className = photoClass(product);
    photo.src = encodeURI(product.photo);
    photo.alt = product.name;
    photo.loading = 'lazy';
    photo.addEventListener('error', () => {
      image.replaceChildren();
      image.classList.add('image-unavailable');
      image.textContent = 'Фото по запросу';
    }, { once: true });
    image.append(photo);
  } else {
    image.classList.add('image-unavailable');
    image.textContent = 'Фото по запросу';
  }
  const meta = document.createElement('div');
  meta.className = 'card-meta';
  meta.innerHTML = `<span>${labels[product.type]}</span><span>${String(products.indexOf(product) + 1).padStart(2, '0')}</span>`;
  const name = document.createElement('p');
  name.className = 'card-name';
  name.textContent = product.name;
  const price = document.createElement('p');
  price.className = 'card-price';
  price.textContent = product.price;
  const resident = document.createElement('p');
  resident.className = 'card-resident';
  resident.textContent = `Резидент: ${product.resident}`;
  card.append(image, meta, name, price, resident);
  card.addEventListener('click', () => openProduct(product));
  return card;
}

function showProducts(filter = 'all') {
  grid.replaceChildren(...products.filter((product) => filter === 'all' || product.type === filter).map(makeCard));
}

function makeSpec(label, value) {
  const row = document.createElement('div');
  const term = document.createElement('dt');
  const detail = document.createElement('dd');
  term.textContent = label;
  detail.textContent = value;
  row.append(term, detail);
  return row;
}

function renderDescription(value) {
  const paragraphs = String(value).split(/\n\s*\n/);
  dialogDescription.replaceChildren(...paragraphs.map((paragraph) => {
    const element = document.createElement('p');
    element.textContent = paragraph;
    return element;
  }));
}

function openProduct(product) {
  const index = products.indexOf(product) + 1;
  dialogImage.style.backgroundImage = product.photo ? `url("${encodeURI(product.photo)}")` : 'none';
  dialogImage.dataset.cutout = String(!product.scene);
  dialogImage.classList.toggle('image-unavailable', !product.photo);
  dialogName.textContent = product.name;
  dialogPrice.textContent = product.price;
  dialogAuthor.textContent = product.resident;
  renderDescription(product.description);
  dialogIndex.textContent = `${String(index).padStart(2, '0')} / ${labels[product.type].toLowerCase()}`;
  dialogSpecs.replaceChildren(makeSpec('Характеристики', product.specs), makeSpec('Резидент', product.resident));
  dialog.showModal();
}

updateFilterCounts();
showProducts();
document.querySelectorAll('.filter').forEach((button) => button.addEventListener('click', () => {
  document.querySelector('.filter.is-active').classList.remove('is-active');
  button.classList.add('is-active');
  showProducts(button.dataset.filter);
}));
document.querySelector('.dialog-close').addEventListener('click', () => dialog.close());
dialog.addEventListener('click', (event) => { if (event.target === dialog) dialog.close(); });
const menuTrigger = document.querySelector('#menuTrigger');
const nav = document.querySelector('#siteNav');
menuTrigger.addEventListener('click', () => {
  const open = nav.classList.toggle('is-open');
  menuTrigger.setAttribute('aria-expanded', open);
});
nav.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => {
  nav.classList.remove('is-open');
  menuTrigger.setAttribute('aria-expanded', 'false');
}));
