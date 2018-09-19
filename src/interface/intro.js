const timesTutorialLeft = window.localStorage.getItem('dotsTutorial') || 2;

const addClass = (id, className) =>
  document.getElementById(id).classList.add(className);

const removeClass = (id, className) =>
  document.getElementById(id).classList.remove(className);

const sleep = seconds =>
  new Promise(resolve => setTimeout(resolve, seconds * 1000));

const startTutorial = async () => {
  await sleep(0);
  removeClass('title', 'hidden');
  await sleep(3);
  addClass('title', 'hidden');
  if (timesTutorialLeft !== '0') {
    removeClass('select-mode', 'hidden');
    document.querySelector('.mode').onclick = async () => {
      addClass('select-mode', 'fade-out');
      await sleep(0.99);
      addClass('select-mode', 'hidden');
      removeClass('select-options', 'hidden');
      document.querySelector('.options').onclick = async () => {
        addClass('select-options', 'fade-out');
        await sleep(0.99);
        addClass('welcome', 'hidden');
      };
    };
    window.localStorage.setItem('dotsTutorial', timesTutorialLeft - 1);
  } else {
    addClass('welcome', 'hidden');
  }
};

export default startTutorial;
