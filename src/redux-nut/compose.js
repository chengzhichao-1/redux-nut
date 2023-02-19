export default function compose(...fns) {
  return (...args) => {
    const len = fns.length
    if (len === 0) {
      return args
    }
    if (len === 1) {
      return fns[0](...args)
    }
    const finalFnRes = fns[len - 1](...args)
    const restFns = fns.slice(0, len - 1)
    return compose(...restFns)(finalFnRes)
  }
}

// export default function compose(...funcs) {
//   if (funcs.length === 0) {
//     return (arg) => arg;
//   }

//   if (funcs.length === 1) {
//     return funcs[0];
//   }

//   return funcs.reduce(
//     (a, b) =>
//       (...args) =>
//         a(b(...args))
//   );
// }

// const fn1 = (arg) => {
//   console.log("fn1:", arg);
//   return arg + 1
// }
// const fn2 = (arg) => {
//   console.log("fn2:", arg);
//   return arg + 1
// }
// const fn3 = (arg) => {
//   console.log("fn3:", arg);
//   return arg + 1
// }

// console.log(compose(fn1, fn2, fn3)(-5));
