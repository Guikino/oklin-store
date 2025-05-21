const wrapper = document.querySelector('.cards-wrapper');
const prevBtn = document.querySelector('.prev');
const nextBtn = document.querySelector('.next');
const cardWidth = 230;

prevBtn.addEventListener('click', () => {
  wrapper.scrollBy({
    left: -cardWidth,
    behavior: 'smooth'
  });
});

nextBtn.addEventListener('click', () => {
  wrapper.scrollBy({
    left: cardWidth,
    behavior: 'smooth'
  });
});
