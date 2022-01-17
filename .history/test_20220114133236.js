function even(k) {
    if (k === 1) {
        return 0
    }
    return even(k - 1)
}