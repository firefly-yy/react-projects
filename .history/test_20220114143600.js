function even(k) {
    if (k ==== 0) return 1

    return 2 * even(k - 1)
}
console.log(even(2))