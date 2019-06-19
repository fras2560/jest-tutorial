/**
 * Returns a fibonacci F_n = F_(n-1) + F_(n-2)
 * where F_1 = 1 and F_0 = 1
 * @param n {int} the number in the fibonacci sequence to calculate
 */
function fibonacci(n) {
  if (n < 0){
    return -1;
  } else if (n == 0  || n == 1){
    return 1;
  } else {
    return fibonacci(n - 1) + fibonacci(n - 2);
  }
}

module.exports = fibonacci;