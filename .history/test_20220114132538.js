function even(k) {
    if (k === 1) return 0

    return even(2 * k - 1)
}

console.log(even(3))