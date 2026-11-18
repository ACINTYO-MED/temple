const menuToggle = document.querySelector('.menu-toggle');
const navigation = document.querySelector('.primary-nav');

menuToggle.addEventListener('click', () => {
  const isOpen = menuToggle.getAttribute('aria-expanded') === 'true';
  menuToggle.setAttribute('aria-expanded', String(!isOpen));
  navigation.classList.toggle('is-open', !isOpen);
});

navigation.addEventListener('click', (event) => {
  if (event.target.closest('a')) {
    menuToggle.setAttribute('aria-expanded', 'false');
    navigation.classList.remove('is-open');
  }
});

const directionsLink = document.querySelector('#directions-link');
const isAndroidChrome = /Android/i.test(navigator.userAgent) && /Chrome\/\d+/i.test(navigator.userAgent);

if (isAndroidChrome) {
  const mapsUrl = new URL(directionsLink.href);
  const fallbackUrl = encodeURIComponent(mapsUrl.href);
  directionsLink.href = `intent://${mapsUrl.host}${mapsUrl.pathname}${mapsUrl.search}#Intent;scheme=https;package=com.google.android.apps.maps;S.browser_fallback_url=${fallbackUrl};end`;
}

const lightbox = document.querySelector('.lightbox');
const lightboxImage = lightbox.querySelector('img');
const lightboxCaption = lightbox.querySelector('p');

document.querySelectorAll('.gallery-item').forEach((item) => {
  item.addEventListener('click', () => {
    lightboxImage.src = item.dataset.full;
    lightboxImage.alt = item.querySelector('img').alt;
    lightboxCaption.textContent = item.dataset.caption;
    lightbox.showModal();
  });
});

lightbox.querySelector('.lightbox-close').addEventListener('click', () => lightbox.close());
lightbox.addEventListener('click', (event) => {
  if (event.target === lightbox) lightbox.close();
});
document.querySelector('#year').textContent = new Date().getFullYear();

const languageSelect = document.querySelector('#language-select');
const translationStatus = document.querySelector('#translation-status');

languageSelect.addEventListener('change', () => {
  const language = languageSelect.value;
  if (!language) return;

  if (location.protocol === 'file:' || location.hostname === 'localhost' || location.hostname === '127.0.0.1') {
    translationStatus.textContent = 'Translation works after publishing this site to a public web address.';
    translationStatus.hidden = false;
    languageSelect.value = '';
    return;
  }

  const translatedPage = new URL('https://translate.google.com/translate');
  translatedPage.searchParams.set('sl', 'auto');
  translatedPage.searchParams.set('tl', language);
  translatedPage.searchParams.set('u', location.href);
  location.assign(translatedPage);
});
