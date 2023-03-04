export function withDebounce(cb, dbTime = 1000) {
  let timer;
  return function (...args) {
    clearTimeout(timer);
    timer = setTimeout(() => {
      cb(...args);
    }, dbTime);
  };
}