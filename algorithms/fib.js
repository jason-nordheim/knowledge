// time → θ(n²)
// space → θ(n)
const fib = (n) => {
    if (n <= 2) return 1
    return fib(n - 1) + fib(n - 2)
}

// time → θ(n)
// space → θ(n)
const memoFib = (n, memo = {}) => {
    if (n in memo) return memo[n]
    memo[n] = memoFib(n - 1, memo) + memoFib(n - 2, memo)
    return memo
}
