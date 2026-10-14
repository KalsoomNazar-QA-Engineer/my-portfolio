// ---------- Skills data (edit here) ----------
const skills = [
  { name: 'HTML5',          note: 'Semantic, accessible markup', mark: '5',  color: 'text-orange-400' },
  { name: 'CSS3',           note: 'Flexbox, Grid, animations',   mark: '3',  color: 'text-sky-400' },
  { name: 'JavaScript',     note: 'ES6+, DOM, async/fetch',      mark: 'JS', color: 'text-yellow-300' },
  { name: 'Tailwind CSS',   note: 'Utility-first, responsive',   mark: 'Tw', color: 'text-cyan-300' },
  { name: 'Bootstrap',      note: 'Rapid, consistent layouts',   mark: 'B',  color: 'text-violet-400' },
  { name: 'React.js',       note: 'Components, hooks, state',    mark: 'Re', color: 'text-sky-300' },
];

document.getElementById('skills-grid').innerHTML = skills.map(s => `
  <div class="group rounded-xl border border-slate-800 bg-slate-800/40 p-5 transition duration-300 hover:-translate-y-1 hover:border-accent/60 hover:bg-slate-800">
    <div class="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-slate-900 font-mono text-lg font-medium ${s.color} ring-1 ring-slate-700 transition group-hover:ring-accent/60">${s.mark}</div>
    <h3 class="font-semibold text-white">${s.name}</h3>
    <p class="mt-1 text-sm text-slate-400">${s.note}</p>
  </div>`).join('');

// ---------- Mobile menu ----------
const btn = document.getElementById('menu-btn');
const menu = document.getElementById('mobile-menu');
const iconOpen = document.getElementById('icon-open');
const iconClose = document.getElementById('icon-close');

function setMenu(open) {
  menu.classList.toggle('hidden', !open);
  iconOpen.classList.toggle('hidden', open);
  iconClose.classList.toggle('hidden', !open);
  btn.setAttribute('aria-expanded', String(open));
  btn.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
}
btn.addEventListener('click', () => setMenu(menu.classList.contains('hidden')));
menu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => setMenu(false)));
window.addEventListener('resize', () => { if (window.innerWidth >= 768) setMenu(false); });

// ---------- Highlight active nav link ----------
const links = document.querySelectorAll('.nav-link');
const sections = [...links].map(l => document.querySelector(l.getAttribute('href')));
const io = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      links.forEach(l => l.classList.toggle('text-white', l.getAttribute('href') === '#' + e.target.id));
    }
  });
}, { rootMargin: '-40% 0px -55% 0px' });
sections.forEach(s => s && io.observe(s));

// ---------- Contact form ----------

 // ---------- Contact form ----------
const form = document.getElementById('contact-form');
const status = document.getElementById('form-status');

if (form && status) {
  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    status.className = 'min-h-[1.25rem] text-sm text-slate-400';

    if (!form.checkValidity()) {
      status.className = 'min-h-[1.25rem] text-sm text-red-400';
      status.textContent = 'Please fill in your name, a valid email and a message.';
      form.reportValidity();
      return;
    }

    const submitBtn = form.querySelector('button[type="submit"]');
    submitBtn.disabled = true;
    status.textContent = 'Sending...';

    try {
      const res = await fetch('https://formsubmit.app/f/ed2g6y7sft', {
        method: 'POST',
        body: new FormData(form),
        headers: {
          'Accept': 'application/json'
        }
      });

      const result = await res.json();

      if (!res.ok || result.ok !== true) {
        throw new Error('Message submission failed');
      }

      form.reset();
      status.className = 'min-h-[1.25rem] text-sm text-accent';
      status.textContent = "Message sent successfully! I'll get back to you soon.";

    } catch (err) {
      status.className = 'min-h-[1.25rem] text-sm text-red-400';
      status.textContent = 'Could not send. Please try again or email me directly at kalsoomnazar44@gmail.com.';
    } finally {
      submitBtn.disabled = false;
    }
  });
}


document.getElementById('year').textContent = new Date().getFullYear();
