const fpsStatsId = 'fps-stats-id';

let animationFrameNumber: number;

function initFpsStats() {
  const script = document.createElement('script');
  script.onload = () => console.log('Stats script loaded');
  script.src = '//mrdoob.github.io/stats.js/build/stats.min.js';
  document.head.appendChild(script);
}
initFpsStats();

function startFpsStats() {
  // @ts-ignore
  const stats = new Stats();
  stats.dom.id = fpsStatsId;
  stats.dom.style.left = 'auto';
  stats.dom.style.right = '0px';
  // console.log('>>', stats.dom);
  document.body.appendChild(stats.dom);
  animationFrameNumber = requestAnimationFrame(function loop() {
    stats.update();
    requestAnimationFrame(loop);
  });
}
function stopFpsStats() {
  if (!!animationFrameNumber) cancelAnimationFrame(animationFrameNumber);
  const element = document.getElementById(fpsStatsId);
  const parent = element?.parentNode;
  if (!!element && !!parent) parent.removeChild(element);
}

export function setIsFpsStatsShown(isShown: boolean) {
  isShown ? startFpsStats() : stopFpsStats();
}
