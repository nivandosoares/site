const menuButton = document.querySelector('.menu-toggle');
const navigation = document.querySelector('#navigation');
function closeMenu() {
  navigation.classList.remove('open');
  menuButton.setAttribute('aria-expanded', 'false');
  menuButton.setAttribute('aria-label', 'Abrir menu');
}
menuButton.addEventListener('click', () => {
  const open = navigation.classList.toggle('open');
  menuButton.setAttribute('aria-expanded', String(open));
  menuButton.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu');
});
navigation.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && navigation.classList.contains('open')) {
    closeMenu();
    menuButton.focus();
  }
});
document.addEventListener('click', event => {
  if (!event.target.closest('header')) closeMenu();
});
const filters = [...document.querySelectorAll('[data-filter]')];
const cards = [...document.querySelectorAll('.product-card')];
const search = document.querySelector('#search');
const status = document.querySelector('#results-status');
let category = 'all';
const normalize = value => value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
function updateCatalog() {
  const query = normalize(search.value.trim());
  let count = 0;
  cards.forEach(card => {
    const visible = (category === 'all' || card.dataset.category === category) && normalize(card.textContent).includes(query);
    card.hidden = !visible;
    if (visible) count++;
  });
  status.textContent = count ? `${count} ${count === 1 ? 'produto nesta seleção' : 'produtos nesta seleção'}` : 'Nenhum produto encontrado. Tente outra busca ou fale com a gente pelo WhatsApp.';
  filters.forEach(button => {
    const active = button.dataset.filter === category;
    button.classList.toggle('active', active);
    button.setAttribute('aria-pressed', String(active));
  });
}
filters.forEach(button => button.addEventListener('click', () => {
  category = button.dataset.filter;
  updateCatalog();
}));
search.addEventListener('input', updateCatalog);
document.querySelectorAll('[data-category]:not(.product-card)').forEach(button => button.addEventListener('click', () => {
  category = button.dataset.category;
  search.value = '';
  updateCatalog();
  document.querySelector('#produtos').scrollIntoView({ behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' });
}));
document.querySelector('#see-all').addEventListener('click', () => {
  category = 'all';
  search.value = '';
  updateCatalog();
});
