(() => {
  const root = document.documentElement;
  const themeButtons = [...document.querySelectorAll('[data-theme-choice]')];
  const themeReset = document.querySelector('[data-theme-choice="system"]');
  const themeStatus = document.querySelector('#theme-status');
  const button = document.querySelector('.menu-toggle');
  const sidebar = document.querySelector('.sidebar');
  const header = document.querySelector('.mobile-header');
  const nav = document.querySelector('#section-nav');
  const links = [...nav.querySelectorAll('a')];
  const sections = links.map(link => document.getElementById(link.hash.slice(1)));
  const mobile = matchMedia('(max-width: 1099px)');

  // No data-theme attribute means CSS follows the operating system automatically.
  function updateThemeControls() {
    const choice = root.dataset.theme || 'system';
    themeButtons.forEach(control => {
      if (control !== themeReset) control.setAttribute('aria-pressed', String(control.dataset.themeChoice === choice));
    });
    themeReset.hidden = choice === 'system';
    themeStatus.textContent = choice === 'system' ? 'Theme follows your system settings.' : `${choice === 'light' ? 'Light' : 'Dark'} theme selected.`;
  }
  themeButtons.forEach(control => control.addEventListener('click', () => {
    const value = control.dataset.themeChoice;
    // Move focus before hiding the reset control after a keyboard activation.
    if (value === 'system' && document.activeElement === themeReset) themeButtons[0].focus();
    if (value === 'system') delete root.dataset.theme;
    else root.dataset.theme = value;
    try { localStorage.setItem('jehu-theme', value); } catch {}
    updateThemeControls();
  }));
  updateThemeControls();

  function closeMenu(returnFocus = false) {
    sidebar.classList.remove('is-open');
    button.setAttribute('aria-expanded', 'false');
    if (returnFocus) button.focus();
  }
  function setOffset() {
    const height = header.getBoundingClientRect().height;
    root.style.setProperty('--mobile-header-height', `${height}px`);
    root.style.setProperty('--header-offset', `${mobile.matches ? height + 20 : 28}px`);
  }
  button.addEventListener('click', () => {
    const open = sidebar.classList.toggle('is-open');
    button.setAttribute('aria-expanded', String(open));
    setOffset();
  });
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && sidebar.classList.contains('is-open')) closeMenu(true);
  });
  document.addEventListener('click', event => {
    const link = event.target.closest('a[href^="#"]');
    if (!link || event.defaultPrevented || event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
    const target = document.getElementById(link.hash.slice(1));
    if (!target) return;
    closeMenu();
    setOffset();
    // Preserve native anchors and history; only move keyboard focus.
    const focusTarget = target.id === 'main' ? target : target.querySelector('h1,h2') || target;
    requestAnimationFrame(() => focusTarget.focus({ preventScroll: true }));
  });
  // Disclosure is not a modal: tabbing beyond it returns the space to the page.
  document.addEventListener('focusin', event => {
    if (mobile.matches && sidebar.classList.contains('is-open') &&
        !sidebar.contains(event.target) && !header.contains(event.target)) closeMenu();
  });

  function currentSection() {
    const offset = parseFloat(getComputedStyle(root).getPropertyValue('--header-offset')) || 28;
    let active = sections[0];
    for (const section of sections) {
      if (section.getBoundingClientRect().top <= offset + 35) active = section;
    }
    if (scrollY > 0 && innerHeight + scrollY >= document.documentElement.scrollHeight - 4) active = sections.at(-1);
    links.forEach(link => {
      if (link.hash === '#' + active.id) link.setAttribute('aria-current', 'location');
      else link.removeAttribute('aria-current');
    });
  }
  let queued = false;
  function schedule() {
    if (queued) return;
    queued = true;
    requestAnimationFrame(() => { queued = false; currentSection(); });
  }
  addEventListener('scroll', schedule, { passive: true });
  addEventListener('resize', () => { setOffset(); schedule(); });
  mobile.addEventListener('change', () => { closeMenu(); setOffset(); schedule(); });
  if ('ResizeObserver' in window) new ResizeObserver(() => { setOffset(); schedule(); }).observe(header);

  // A missing image never leaves a broken-image box or an empty image column.
  document.querySelectorAll('.profile-photo, .work-item__image img').forEach(photo => {
    function hideMissingPhoto() {
      photo.parentElement.hidden = true;
      photo.closest('.profile')?.classList.add('no-photo');
    }
    photo.addEventListener('error', hideMissingPhoto);
    if (photo.complete && !photo.naturalWidth) hideMissingPhoto();
  });

  closeMenu();
  root.classList.add('enhanced');
  setOffset();
  currentSection();
  addEventListener('load', () => {
    setOffset();
    if (location.hash) document.getElementById(location.hash.slice(1))?.scrollIntoView({ behavior: 'instant' });
    currentSection();
  });
  addEventListener('hashchange', schedule);
})();
