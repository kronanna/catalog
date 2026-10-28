const products = [
  ['Стул «Связь / Link»','Elenium','furniture','545 × 520 × 845 мм','Стул построен на идее полукруглых соединений в цельную устойчивую конструкцию. Подлокотники и спинка образуют единую скульптурную форму, запоминающуюся и архитектурно выверенную при сохранении своей функциональности.','furniture','Хрящева Елена','130 000 ₽'],
  ['Кресло Roll','Elenium','furniture','1000 × 650 × 610 мм','Полноценным кресло будет органично смотреться как отдельный предмет или в вашей интерьере. Каждая часть комплекта состоит из безупречных геометрических фигур.','furniture','Хрящева Елена','249 000 ₽'],
  ['Банкетка Uno / Uno','Elenium','furniture','1300 × 400 × 450 мм','Элегантная банкетка с основанием из шпона или с металлизированной окраской — идеальное сочетание стиля и функциональности.','furniture','Хрящева Елена','160 000 ₽'],
  ['Кресло Neo / Neo','Elenium','furniture','600 × 984 × 800 мм','Кресло Neo — это яркий акцентный объект, созданный для интерьеров, где ценят выразительность и комфорт. Плавная волнообразная форма и цельная монотипная геометрия делают модель одновременно скульптурной и функциональной.','furniture','Хрящева Елена','195 000 ₽'],
  ['Консоль «Грань / Edge»','Elenium','furniture','1300 × 30 × 850 мм','Консоль «Грань / Edge» — совершенная элегантность в каждой линии. Дизайнерский шпон необычно сочетает две линии шпона, подчеркивая красоту природной текстуры дерева.','sketches','Хрящева Елена','180 000 ₽'],
  ['Столик Martin','Elenium','furniture','400 × 400 × 450 мм','Обтекаемая форма сиденья из переработанного пластика поддерживает больше — более строгий силуэт оживлён плавно скруглёнными углами основания.','furniture','Хрящева Елена','70 000 ₽'],
  ['Журнальный стол «Грань / Edge»','Elenium','furniture','1400 × 400 × 450 мм','Журнальный стол «Грань / Edge» сочетает современный дизайн с утончённой скульптурной формой и чёткими гранями.','furniture','Хрящева Елена','189 000 ₽'],
  ['Кресло «Фило / Filo»','Elenium','furniture','670 × 580 × 670 мм','Кресло «Фило / Filo» — эстетика баланса. Функциональный дизайн с узнаваемым силуэтом, кресло бережно сочетает лёгкость и плавность формы.','furniture','Хрящева Елена','170 000 ₽'],
  ['Компактное кресло X (Икс)','Elenium','furniture','—','Стул-кресло X — выразительная геометрия и тактильная глубина натурального материала. Акцентный предмет, в котором форма и текстура работают как единое целое.','furniture','Хрящева Елена','130 000 ₽'],
  ['Стол X (Икс)','Elenium','furniture','900 × 600 × 360 мм','Журнальный стол X — архитектура формы и выразительность натурального материала. Предмет, который задаёт ритм пространства и собирает интерьер вокруг себя.','furniture','Хрящева Елена','130 000 ₽'],
  ['Полукресло, обеденное кресло','Elenium','furniture','—','Полукресло Коко с тонкими подлокотниками из массива бука. Вдохновлено эстетикой парижской моды, а особое сиденье и спинка повышенной комфортности позволяют использовать его как в качестве обеденного кресла, так и кресла для гостиной.','furniture','Хрящева Елена','85 000 ₽'],
  ['Журнальные столики «Радуга / Rainbow»','Elenium','furniture','400 × 400 × 400 мм','Добавьте яркий акцент в ваш интерьер с радужным журнальным столиком. Его уникальный дизайн с градиентом от чёрного к жёлтому привлекает внимание и создаёт атмосферу света.','furniture','Хрящева Елена','от 77 000 ₽'],
  ['Журнальный стол «Пара / Pair»','Elenium','furniture','800 × 800 × 370 мм','Журнальный стол «Пара / Pair» — это журнальный стол-объект, созданный как гибкая модульная система для современного интерьера. Его геометрия построена на пересечении строгих линий и тактильных плоскостей.','furniture','Хрящева Елена','от 250 000 ₽'],
  ['Стол LОСС, серия «Дюна»','Artivo','art','400 × 400 × 580 мм','Предмет коллекционного дизайна. Латунь. Каркасная система. Тонировка химией. Покрытие — лак. Технология: литьё под давлением, сборка, сварка.','art','Екатерина Аксенова-Чаленко'],
  ['Ваза SIRS, серия JAPANESE','Artivo','art','500 × 500 × 153 мм','Произведение тиражного искусства. Тираж 2/11. Сертификат. Латунь. Ручная работа. Создаётся 11 предметов, все предметы пронумерованы и сертифицируются.','art','Екатерина Аксенова-Чаленко'],
  ['Ваза DRAMM, серия «Древность»','Artivo','art','280 × 280 × 120 мм','Произведение тиражного искусства. Тираж 2/11. Сертификат. Латунь. Ручная работа. Тонировка химией. Покрытие — лак.','art','Екатерина Аксенова-Чаленко'],
  ['Композиция подсвечников «Ветерено»','Artivo','art','50 × 195 × 510 мм','Произведение тиражного искусства. Тираж 3/11. Сертификат. Бронза. Литьё. Ручная работа. Создаётся 11 предметов, все предметы пронумерованы и сертифицируются.','art','Екатерина Аксенова-Чаленко'],
  ['Скульптура «Адам и Ева»','Kilta','art','—','Скульптуры-тотемы «Адам и Ева» от бренда KILTA. Выполненные из массива ясеня, они притягивают внимание своей тактильностью и природной теплотой материала.','sculpt','Татьяна Кухнецова'],
  ['Консоль','Kilta','furniture','—','Идеей создания стеллажа/консоли стало желание поэкспериментировать с формой аркады в архитектурной композиции в мебели, объединив два фундаментальных архетипа.','sketches','Татьяна Кухнецова'],
  ['Стол кофейный Z/H Maya','Алла Дулова','furniture','500 × 600 × 400 мм','Коллекция Z/H Maya — это цикл предметов интерьера, рожденный на стыке дизайна, пластики и эмоционального жеста. В основе — баланс сложных и в то же время минималистичных вещей.','furniture','Алла Дулова'],
  ['Напольная лампа Light Catcher («Ловец света»)','Ceramum','light','Высота 900 мм; длина 450 мм; ширина 210 мм','Light Catcher — керамический светильник, который хочется включать, настраивать и разглядывать. Каждый экземпляр — ручной, шамотной глины, с уникальной керамической крошкой.','light','Анастасия'],
  ['Вазы «Изгибы»','Ceramum','art','—','«Изгибы» — это история про смелость и тонкую игру формы. Ваза родилась в эксперименте с ручной лепкой и преодолением страха тонких стенок.','art','Анастасия'],
  ['Торшер Torii / BOO Totem','Ceramum','light','140 × 14 см; основание 100 × 12 см','Вдохновленные японской эстетикой, эти торшеры из рисовой бумаги приносят мягкость и атмосферу в интерьер, благодаря своему мягкому свечению.','light','Анастасия'],
  ['Кресло «BOO Nest»','BOOSTUDIO','furniture','80 × 80 × 74 см / 90 × 90 × 84 см','Мягкая скульптурная форма, вдохновленная природной пластикой. Какие формы рисует природа? Мягкие, текучие, свободные — словно капсула с линиями естественно перетекает в следующую.','furniture','Алла Дулова'],
  ['Консоль «Волна»','Ган.Т','furniture','1620 × 350 × 795–740 мм','Выразительная и ажурная консоль «Волна» из нержавеющей стали с последующим сатинированием. Несмотря на легковесный силуэт из тонких линий, изделие очень прочное и износостойкое.','sketches','Татьяна Ганжикова'],
  ['Стол «Красивый»','Анна Пименова','furniture','—','Стол, название которого говорит само за себя. Фактурная деталь в виде металлической подвески напоминает ювелирное украшение — небольшой штрих, который задаёт предмету характер.','furniture','Анна Пименова']
];

const prices = [
  '130 000 ₽','249 000 ₽','160 000 ₽','195 000 ₽','180 000 ₽','70 000 ₽','189 000 ₽','170 000 ₽',
  '130 000 ₽','130 000 ₽','85 000 ₽','от 77 000 ₽','от 250 000 ₽','150 000 ₽','155 000 ₽','78 000 ₽',
  '220 000 ₽','300 000 ₽','70 000 ₽','216 000 ₽','58 410 ₽','45 900 ₽','117 600 ₽','176 400 ₽','280 000 ₽','220 000 ₽'
];
products.forEach((product, index) => { product[7] = prices[index]; });

// Фотографии объектов извлечены из утверждённого PDF-каталога в том же порядке, что и позиции выше.
const productPhotos = [
  '01-link','02-roll','03-uno','04-neo','05-edge-console','06-martin','07-edge-table','08-filo',
  '09-chair-x','10-table-x','11-koko','12-rainbow','13-pair','14-locc','15-sirs','16-dramm',
  '17-vetereno','18-adam-eve','19-kilta-console','20-maya','21-light-catcher','22-vases','23-torii',
  '24-boo-nest','25-wave','26-beautiful'
].map(name => `assets/products/${name}.png`);
productPhotos[2] = 'assets/products/03-uno-cutout.png';

// Кадры с окружением сохраняют исходный фон; предметные изображения аккуратно сливаются с фоном каталога.
const sceneImageIndexes = new Set([0, 1, 18, 19, 20, 22, 24]);

const grid = document.querySelector('#productGrid');
const dialog = document.querySelector('#productDialog');
const dialogImage = document.querySelector('#dialogImage');
const dialogName = document.querySelector('#dialogName');
const dialogPrice = document.querySelector('#dialogPrice');
const dialogAuthor = document.querySelector('#dialogAuthor');
const dialogDescription = document.querySelector('#dialogDescription');
const dialogSpecs = document.querySelector('#dialogSpecs');
const dialogIndex = document.querySelector('#dialogIndex');

function photoFor(product) {
  return productPhotos[products.indexOf(product)];
}
function imageClassFor(product) {
  return sceneImageIndexes.has(products.indexOf(product)) ? 'product-photo--scene' : 'product-photo--cutout';
}
function showProducts(filter = 'all') {
  grid.innerHTML = '';
  products.filter(p => filter === 'all' || p[2] === filter).forEach((product, index) => {
    const card = document.createElement('button');
    card.className = 'product-card';
    card.type = 'button';
    card.innerHTML = `<div class="card-image"><img class="${imageClassFor(product)}" src="${photoFor(product)}" alt="${product[0]}" loading="lazy"></div><div class="card-meta"><span>${product[2] === 'furniture' ? 'Мебель' : product[2] === 'art' ? 'Искусство' : 'Свет'}</span><span>${String(products.indexOf(product)+1).padStart(2,'0')}</span></div><p class="card-name">${product[0]}</p><p class="card-price">${product[7]}</p><p class="card-contact"><span>Резидент:</span> ${product[1]}<br><span>Контактное лицо:</span> ${product[6]}</p>`;
    card.addEventListener('click', () => openProduct(product));
    grid.append(card);
  });
}
function openProduct(product) {
  const index = products.indexOf(product) + 1;
  dialogImage.style.backgroundImage = `url("${photoFor(product)}")`;
  dialogImage.dataset.cutout = String(!sceneImageIndexes.has(index - 1));
  dialogName.textContent = product[0];
  dialogPrice.textContent = product[7];
  dialogAuthor.textContent = product[1];
  dialogDescription.textContent = product[4];
  dialogIndex.textContent = `${String(index).padStart(2,'0')} / ${product[2] === 'furniture' ? 'мебель' : product[2] === 'art' ? 'искусство' : 'свет'}`;
  dialogSpecs.innerHTML = `<div><dt>Размеры</dt><dd>${product[3]}</dd></div><div><dt>Резидент</dt><dd>${product[1]}</dd></div><div><dt>Контактное лицо</dt><dd>${product[6]}</dd></div>`;
  dialog.showModal();
}
showProducts();
document.querySelectorAll('.filter').forEach(button => button.addEventListener('click', () => {
  document.querySelector('.filter.is-active').classList.remove('is-active');
  button.classList.add('is-active'); showProducts(button.dataset.filter);
}));
document.querySelector('.dialog-close').addEventListener('click', () => dialog.close());
dialog.addEventListener('click', event => { if (event.target === dialog) dialog.close(); });
const menuTrigger = document.querySelector('#menuTrigger'); const nav = document.querySelector('#siteNav');
menuTrigger.addEventListener('click', () => { const open = nav.classList.toggle('is-open'); menuTrigger.setAttribute('aria-expanded', open); });
nav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => { nav.classList.remove('is-open'); menuTrigger.setAttribute('aria-expanded', 'false'); }));
