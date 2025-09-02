const headerElement = document.querySelector('.site-header');
const navToggleButton = document.querySelector('.nav-toggle');
const navElement = document.querySelector('.site-nav');
const toastElement = document.getElementById('toast');

document.getElementById('year').textContent = new Date().getFullYear();

// Mobile navigation toggle
if (navToggleButton) {
  navToggleButton.addEventListener('click', () => {
    const isOpen = navElement.classList.toggle('open');
    navToggleButton.setAttribute('aria-expanded', String(isOpen));
  });
}

// Smooth scroll for in-page links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener('click', (event) => {
    const targetId = anchor.getAttribute('href');
    if (!targetId || targetId === '#') return;
    const target = document.querySelector(targetId);
    if (!target) return;
    event.preventDefault();
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    if (navElement.classList.contains('open')) {
      navElement.classList.remove('open');
      navToggleButton.setAttribute('aria-expanded', 'false');
    }
  });
});

// Scroll reveal
const revealElements = Array.from(document.querySelectorAll('.reveal'));
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const element = entry.target;
      const delay = Number(element.getAttribute('data-delay') || 0);
      setTimeout(() => element.classList.add('visible'), delay);
      observer.unobserve(element);
    }
  });
}, { threshold: 0.2 });

revealElements.forEach((el) => observer.observe(el));

// Contact form handling with simple client-side validation
const formElement = document.getElementById('contact-form');
if (formElement) {
  formElement.addEventListener('submit', (event) => {
    event.preventDefault();

    const formData = new FormData(formElement);
    const nameValue = String(formData.get('name') || '').trim();
    const emailValue = String(formData.get('email') || '').trim();
    const messageValue = String(formData.get('message') || '').trim();

    const emailRegex = /^(?:[a-zA-Z0-9_'^&\-]+(?:\.[a-zA-Z0-9_'^&\-]+)*)@(?:(?:[a-zA-Z0-9-]+\.)+[a-zA-Z]{2,})$/;

    let isValid = true;
    const setError = (field, text) => {
      const small = formElement.querySelector(`small[data-for="${field}"]`);
      if (small) { small.textContent = text || ''; }
    };

    setError('name');
    setError('email');
    setError('message');

    if (!nameValue) {
      isValid = false;
      setError('name', 'Укажите имя');
    }
    if (!emailValue || !emailRegex.test(emailValue)) {
      isValid = false;
      setError('email', 'Укажите корректный email');
    }
    if (!messageValue || messageValue.length < 10) {
      isValid = false;
      setError('message', 'Сообщение должно быть не короче 10 символов');
    }

    if (!isValid) {
      showToast('Проверьте правильность заполнения формы');
      return;
    }

    formElement.reset();
    const success = formElement.querySelector('.form-success');
    if (success) { success.hidden = false; }
    showToast('Спасибо! Я свяжусь с вами в ближайшее время.');
  });
}

function showToast(message) {
  if (!toastElement) return;
  toastElement.textContent = message;
  toastElement.hidden = false;
  clearTimeout(showToast.timer);
  showToast.timer = setTimeout(() => {
    toastElement.hidden = true;
  }, 2600);
}

$(document).ready(function() {
	$('.header__burger').click(function(event) {
		$('.header__burger,.header__menu').toggleClass('active');
		$('body').toggleClass('lock');
	});
});

