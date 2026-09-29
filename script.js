document.addEventListener('DOMContentLoaded', () => {
    // 1. Initialize Slide Navigation
    let currentSlide = 1;
    const slides = document.querySelectorAll('.slide');
    const totalSlides = slides.length;

    function updateSlide() {
        slides.forEach((slide, index) => {
            slide.classList.remove('active');
            if (index + 1 === currentSlide) {
                slide.classList.add('active');
            }
        });

        document.querySelectorAll('.current').forEach(el => {
            el.textContent = currentSlide;
        });
        document.querySelectorAll('.total').forEach(el => {
            el.textContent = totalSlides;
        });

        document.querySelectorAll('.navigation').forEach(nav => {
            const prevBtn = nav.querySelector('.prevBtn, #prevBtn');
            const nextBtn = nav.querySelector('.nextBtn, #nextBtn');

            if (prevBtn) {
                prevBtn.disabled = currentSlide === 1;
            }
            if (nextBtn) {
                nextBtn.disabled = currentSlide === totalSlides;
            }
        });

        const activeSlide = document.querySelector('.slide.active');
        if (activeSlide) {
            const content = activeSlide.querySelector('.content');
            if (content) {
                content.scrollTop = 0;
            }
        }
    }

    function nextSlide() {
        if (currentSlide < totalSlides) {
            currentSlide++;
            updateSlide();
        }
    }

    function prevSlide() {
        if (currentSlide > 1) {
            currentSlide--;
            updateSlide();
        }
    }

    document.querySelectorAll('.nextBtn, #nextBtn').forEach(btn => {
        btn.addEventListener('click', nextSlide);
    });

    document.querySelectorAll('.prevBtn, #prevBtn').forEach(btn => {
        btn.addEventListener('click', prevSlide);
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowRight' || e.key === ' ') {
            e.preventDefault();
            nextSlide();
        } else if (e.key === 'ArrowLeft') {
            e.preventDefault();
            prevSlide();
        } else if (e.key === 'Home') {
            e.preventDefault();
            currentSlide = 1;
            updateSlide();
        } else if (e.key === 'End') {
            e.preventDefault();
            currentSlide = totalSlides;
            updateSlide();
        }
    });

    updateSlide();

    // 2. Initialize Syntax Highlighting
    if (typeof hljs !== 'undefined') {
        hljs.highlightAll();
    }
});