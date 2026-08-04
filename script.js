// ============================================================
// NCU BoltNut Robotics — Shared Script
// ============================================================

// Mobile nav toggle
const navToggle = document.querySelector('.nav-toggle');
const navMobileMenu = document.querySelector('.nav-mobile-menu');
if (navToggle && navMobileMenu) {
  navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('open');
    navMobileMenu.classList.toggle('open');
  });
  navMobileMenu.querySelectorAll('a').forEach(a =>
    a.addEventListener('click', () => {
      navToggle.classList.remove('open');
      navMobileMenu.classList.remove('open');
    })
  );
}

// Mobile nav — collapsible dropdown groups
document.querySelectorAll('.nav-mobile-group-toggle').forEach(btn => {
  btn.addEventListener('click', () => {
    const submenu = btn.nextElementSibling;
    const isOpen = btn.classList.toggle('open');
    if (submenu && submenu.classList.contains('nav-mobile-submenu')) {
      submenu.classList.toggle('open', isOpen);
    }
  });
});

// Overlay navbar (home hero) — solid once scrolled
const overlayNav = document.querySelector('.navbar.overlay');
if (overlayNav) {
  const onScroll = () => overlayNav.classList.toggle('scrolled', window.scrollY > 40);
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

// News page — year filter tabs
const newsTabs = document.querySelectorAll('.news-tab');
const newsItems = document.querySelectorAll('.news-item');
const newsEmpty = document.querySelector('.news-empty');
if (newsTabs.length && newsItems.length) {
  const applyFilter = (year) => {
    let visibleCount = 0;
    newsItems.forEach(item => {
      const match = year === 'all' || item.dataset.year === year;
      item.classList.toggle('is-hidden', !match);
      if (match) visibleCount++;
    });
    if (newsEmpty) newsEmpty.style.display = visibleCount === 0 ? 'block' : 'none';
  };
  newsTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      newsTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      applyFilter(tab.dataset.year);
    });
  });
  const tabOrder = Array.from(newsTabs).map(t => t.dataset.year);
  window.addEventListener('keydown', (e) => {
    if (e.key !== 'ArrowLeft' && e.key !== 'ArrowRight') return;
    const activeTab = document.querySelector('.news-tab.active');
    const idx = tabOrder.indexOf(activeTab.dataset.year);
    const dir = e.key === 'ArrowRight' ? 1 : -1;
    const nextIdx = (idx + dir + tabOrder.length) % tabOrder.length;
    newsTabs[nextIdx].click();
  });
}
