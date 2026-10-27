/* OOP-specific enhancements; sample/script.js handles all slide navigation. */
(() => {
  'use strict';
  function initializeOOP() {
    if (window.hljs) {
      document.querySelectorAll('pre code').forEach(code => {
        if (!code.dataset.highlighted) window.hljs.highlightElement(code);
      });
    }
    document.querySelectorAll('.answer-reveal').forEach(button => {
      button.addEventListener('click', () => {
        const answer = button.nextElementSibling;
        if (!answer) return;
        answer.classList.remove('answer-hidden');
        button.setAttribute('aria-expanded', 'true');
        button.hidden = true;
      });
    });
    // Reset the scroll position when changing slides (including via overview).
    const deck = document.getElementById('deck');
    if (deck) {
      const observer = new MutationObserver(mutations => {
        for (const mutation of mutations) {
          if (mutation.type !== 'attributes' || mutation.attributeName !== 'class') continue;
          const slide = mutation.target;
          if (slide.classList.contains('active')) {
            const body = slide.querySelector('.legacy-slide-body');
            if (body) body.scrollTop = 0;
          }
        }
      });
      deck.querySelectorAll('.slide').forEach(slide => observer.observe(slide, {attributes:true,attributeFilter:['class']}));
    }
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded',initializeOOP,{once:true});
  else initializeOOP();
})();
