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
          <a class="btn btn--sm btn--outline" href="blog-single.html">View details</a>
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

  // Scroll animations with repeat on scroll back
  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.15
  };

  const animateOnScroll = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animated');
      } else {
        // Remove animated class when element leaves viewport
        // This allows animations to re-trigger when scrolling back
        entry.target.classList.remove('animated');
      }
    });
  }, observerOptions);

  // Add animation classes to elements
  const elementsToAnimate = [
    { selector: '#services .section__head', delay: 0 },
    { selector: '#services .features .feature', delay: 100, stagger: true },
    { selector: '#about .about__text', delay: 0 },
    { selector: '#about .about__media', delay: 200 },
    { selector: '#tournaments .section__head', delay: 0 },
    { selector: '#tournaments .tcard', delay: 100, stagger: true },
    { selector: '.cta__inner', delay: 0 },
    { selector: '#faq .section__head', delay: 0 },
    { selector: '#faq .faq details', delay: 50, stagger: true },
    { selector: '#contact .contact__left', delay: 0 },
    { selector: '#contact .contact__right', delay: 100 }
  ];

  elementsToAnimate.forEach(item => {
    const elements = document.querySelectorAll(item.selector);
    elements.forEach((el, index) => {
      el.classList.add('animate-on-scroll');
      const delay = item.stagger ? item.delay * index : item.delay;
      el.style.transitionDelay = `${delay}ms`;
      animateOnScroll.observe(el);
    });
  });

  // Add floating animation to the hero card (if visible)
  const heroCard = document.querySelector('.hero__card');
  if (heroCard && window.innerWidth > 980) {
    heroCard.style.animation = 'float 6s ease-in-out infinite';
  }


  /* ===== Blog Single (add to end of script.js) ===== */
(() => {
  // If this page doesn't have blog elements — do nothing.
  const postContent = document.getElementById('postContent');
  const relatedWrap = document.getElementById('relatedPosts');
  if (!postContent && !relatedWrap) return;

  // Date format
  const postDateEl = document.getElementById('postDate');
  if (postDateEl) {
    const iso = postDateEl.getAttribute('datetime');
    if (iso) {
      const d = new Date(iso);
      if (!Number.isNaN(d.getTime())) {
        postDateEl.textContent = d.toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'short',
          day: '2-digit'
        });
      }
    }
  }

  // Read time estimate
  const readTimeEl = document.getElementById('readTime');
  if (readTimeEl && postContent) {
    const text = postContent.innerText || '';
    const words = text.trim().split(/\s+/).filter(Boolean).length;
    const minutes = Math.max(1, Math.round(words / 200)); // 200 wpm
    readTimeEl.textContent = `${minutes} min read`;
  }

  // Share buttons
  const shareNote = document.getElementById('shareNote');
  const shareButtons = document.querySelectorAll('[data-share]');

  function setShareNote(msg, ok = true) {
    if (!shareNote) return;
    shareNote.textContent = msg;
    shareNote.style.color = ok ? "#0a3a22" : "#8a1f1f";
    setTimeout(() => (shareNote.textContent = ""), 3500);
  }

  function getShareUrl() {
    return window.location.href || 'index.html';
  }

  async function copyLink() {
    const url = getShareUrl();
    try {
      await navigator.clipboard.writeText(url);
      setShareNote('Link copied!');
    } catch (e) {
      const ta = document.createElement('textarea');
      ta.value = url;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      document.body.removeChild(ta);
      setShareNote('Link copied!');
    }
  }

  function openPopup(url) {
    window.open(url, '_blank', 'noopener,noreferrer,width=740,height=740');
  }

  shareButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const type = btn.getAttribute('data-share');
      const url = encodeURIComponent(getShareUrl());
      const title = encodeURIComponent(document.title || 'Sport Solution');

      if (type === 'copy') return copyLink();
      if (type === 'facebook') return openPopup(`https://www.facebook.com/sharer/sharer.php?u=${url}`);
      if (type === 'whatsapp') return openPopup(`https://wa.me/?text=${title}%20-%20${url}`);
    });
  });

  // Related posts demo (replace href/img/title as needed)
  if (relatedWrap) {
    const related = [
      {
        title: 'Friendly Matches: How We Pick Opponents',
        desc: 'Balanced games by level and age group, with safety and fairness in mind.',
        img: 'images/blogs/2.jpg',
        href: 'blog-single.html'
      },
      {
        title: 'Tournament Week: Sample Schedule (7 Days)',
        desc: 'A full itinerary with matches, training, recovery and a cultural day.',
        img: 'images/blogs/3.jpg',
        href: 'blog-single.html'
      },
      {
        title: 'Accommodation & Meals for Athletes',
        desc: 'What to look for in hotels and meal plans for youth teams.',
        img: 'images/blogs/1.jpg',
        href: 'blog-single.html'
      }
    ];

    relatedWrap.innerHTML = related.map(p => `
      <article class="tcard">
        <a href="${p.href}" aria-label="${p.title}">
          <div class="tcard__img" style="background-image:url('${p.img}')"></div>
        </a>
        <div class="tcard__body">
          <h3>${p.title}</h3>
          <p>${p.desc}</p>
          <a class="btn btn--sm btn--outline" href="${p.href}">Read more</a>
        </div>
      </article>
    `).join('');
  }
})();



  // Add stagger animation to tournament cards after they're rendered
  setTimeout(() => {
    const tcards = document.querySelectorAll('.tcard');
    tcards.forEach((card, index) => {
      card.style.opacity = '0';
      card.style.transform = 'translateY(30px)';
      setTimeout(() => {
        card.style.transition = 'all 0.6s ease';
        card.style.opacity = '1';
        card.style.transform = 'translateY(0)';
      }, 100 * index);
    });
  }, 100);
})();
