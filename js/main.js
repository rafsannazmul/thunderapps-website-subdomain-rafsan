// Rafsan Nazmul — portfolio. Small, dependency-free enhancements.
(() => {
  // Hairline under the top bar once the page scrolls.
  const bar = document.querySelector('.topbar');
  const onScroll = () => bar && bar.classList.toggle('is-scrolled', window.scrollY > 8);
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  // Highlight the nav link for the section in view.
  const links = [...document.querySelectorAll('.nav a[href^="#"]')];
  const sections = links.map(a => document.querySelector(a.getAttribute('href'))).filter(Boolean);
  if ('IntersectionObserver' in window && sections.length) {
    const io = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        links.forEach(a => {
          if (a.getAttribute('href') === '#' + entry.target.id) a.setAttribute('aria-current', 'true');
          else a.removeAttribute('aria-current');
        });
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    sections.forEach(s => io.observe(s));
  }

  // Copy email address.
  document.querySelectorAll('[data-copy]').forEach(btn => {
    const label = btn.textContent;
    btn.addEventListener('click', async () => {
      try {
        await navigator.clipboard.writeText(btn.dataset.copy);
        btn.textContent = 'Copied';
      } catch {
        btn.textContent = 'Press ⌘C to copy';
        const sel = window.getSelection();
        const range = document.createRange();
        range.selectNodeContents(document.querySelector('.email-link'));
        sel.removeAllRanges(); sel.addRange(range);
      }
      setTimeout(() => { btn.textContent = label; }, 2000);
    });
  });

  // Keep the copyright year current.
  document.querySelectorAll('[data-year]').forEach(el => { el.textContent = new Date().getFullYear(); });
})();
