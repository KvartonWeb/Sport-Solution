// script.js
(() => {
  // Year
  document.getElementById('year').textContent = new Date().getFullYear();

  // Mobile menu
  const burger = document.getElementById('burger');
  const nav = document.getElementById('nav');

  function toggleMenu() {
    const isOpen = burger.getAttribute('aria-expanded') === 'true';
    burger.setAttribute('aria-expanded', String(!isOpen));
    nav.style.display = isOpen ? 'none' : 'flex';
    nav.style.flexDirection = 'column';
    nav.style.position = 'absolute';
    nav.style.right = '18px';
    nav.style.top = '72px';
    nav.style.background = 'rgba(255,255,255,.96)';
    nav.style.border = '1px solid rgba(15,23,42,.10)';
    nav.style.borderRadius = '18px';
    nav.style.padding = '14px';
    nav.style.boxShadow = '0 18px 45px rgba(10,20,15,.14)';
    nav.style.minWidth = '220px';
    nav.querySelectorAll('a').forEach(a => {
      a.style.padding = '10px 8px';
      a.addEventListener('click', () => {
        if (window.matchMedia('(max-width: 980px)').matches) {
          burger.setAttribute('aria-expanded', 'false');
          nav.style.display = 'none';
        }
      }, { once: true });
    });
  }

  burger.addEventListener('click', () => {
    if (!window.matchMedia('(max-width: 980px)').matches) return;
    toggleMenu();
  });

  // Tournaments data
  const tournaments = [
    {
      month: 'APR',
      day: 25,
      title: 'Batumi Cup 2025',
      desc: 'Group stage + playoffs, referees, awards and media support.',
      img: 'images/blogs/1.jpg'
    },
    {
      month: 'DEC',
      day: 23,
      title: 'Sport Solutions and the youth teams of Denmark and Wales.',
      desc: 'Two matches + one joint training session with local academy.',
      img: 'images/blogs/2.jpg'
    },
    {
      month: 'SEP',
      day: 27,
      title: 'Sport Solutions and the youth teams of Austria and Belgium.',
      desc: 'High-quality fields, wellness schedule and cultural tour day.',
      img: 'images/blogs/3.jpg'
    }
  ];

  const cardsWrap = document.getElementById('tournamentCards');

  function renderCards(items) {
    cardsWrap.innerHTML = items.map(t => `
      <article class="tcard">
        <div class="tcard__img" style="background-image:url('${t.img}')">
          <div class="tcard__date">
            <strong>${t.day}</strong>
            <span>${t.month}</span>
          </div>
        </div>
        <div class="tcard__body">
          <h3>${t.title}</h3>
          <p>${t.desc}</p>
          <a class="btn btn--sm btn--outline" href="#contact">View details</a>
        </div>
      </article>
    `).join('');
  }

  renderCards(tournaments);



  // Fake form handlers (demo)
  const quickForm = document.getElementById('quickForm');
  quickForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const fd = new FormData(quickForm);
    alert(`Thanks! We’ll contact you at ${fd.get('email')} with a proposal.`);
    quickForm.reset();
  });

  const contactForm = document.getElementById('contactForm');
  const contactNote = document.getElementById('contactNote');

  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    contactNote.textContent = "Message sent (demo). Connect this form to your backend/email service.";
    contactNote.style.color = "#0a3a22";
    contactForm.reset();
    setTimeout(() => (contactNote.textContent = ""), 5000);
  });

  // Back to top
  document.getElementById('backToTop').addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
})();
