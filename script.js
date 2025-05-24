function scrollToMain() {
  document.getElementById('main').scrollIntoView({ behavior: 'smooth' });
}

let currentIndex = 0;
  const cards = document.querySelectorAll('.card');
  const navButtons = document.querySelectorAll('nav button');

  function showCard(index) {
    if (index === currentIndex) return;

    const oldCard = cards[currentIndex];
    const newCard = cards[index];

    // Remove active from current card and animate out
    oldCard.classList.remove('active');
    oldCard.classList.remove('exit-left', 'exit-right');
    oldCard.classList.add(index > currentIndex ? 'exit-left' : 'exit-right');

    // Prepare new card: reset its classes
    newCard.classList.remove('exit-left', 'exit-right');
    newCard.classList.add('active');

    // Force reflow to enable transition (trick to reset animation)
    void newCard.offsetWidth;

    // Slide in the new card
    newCard.classList.add(index > currentIndex ? 'enter-right' : 'enter-left');

    // Clean up the enter animation class after it finishes
    setTimeout(() => {
      newCard.classList.remove('enter-left', 'enter-right');
      oldCard.classList.remove('exit-left', 'exit-right');
    }, 400);

    // Update nav button states
    navButtons.forEach(btn => btn.classList.remove('active'));
    navButtons[index].classList.add('active');

    currentIndex = index;
  }