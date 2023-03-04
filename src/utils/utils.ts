export function withDebounce(cb, dbTime = 1000) {
  let timer;
  return function (...args) {
    clearTimeout(timer);
    timer = setTimeout(() => {
      cb(...args);
    }, dbTime);
  };
}

export function promisify<D>(data:D, delayMS:number = 1000) : Promise<D> {
  return new Promise(resolve=>{
    setTimeout(()=>{
      resolve(data)
    },delayMS)
  })
}