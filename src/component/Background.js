export const createStars = () => {
  const container = document.querySelector('.login-background');
  if (!container) return;
  for (let i = 0; i < 100; i++) {
    const star = document.createElement('div');
    star.className = 'star';
    star.style.width = `${Math.random() * 2}px`;
    star.style.height = star.style.width;
    star.style.left = `${Math.random() * 100}%`;
    star.style.top = `${Math.random() * 100}%`;
    star.style.animationDelay = `${Math.random() * 2}s`;
    container.appendChild(star);
  }
};
export const createOrbs = () => {
  const container = document.querySelector('.login-background');
  if (!container) return;
  for (let i = 0; i < 5; i++) {
    const orb = document.createElement('div');
    orb.className = 'floating-orb';
    orb.style.width = `${Math.random() * 100 + 50}px`;
    orb.style.height = orb.style.width;
    orb.style.left = `${Math.random() * 100}%`;
    orb.style.top = `${Math.random() * 100}%`;
    orb.style.animationDuration = `${Math.random() * 10 + 15}s`;
    container.appendChild(orb);
  }
};
