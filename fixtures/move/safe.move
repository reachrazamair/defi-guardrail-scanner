module cetus::math_u256 {
    public fun checked_shlw(n: u256): (u256, bool) {
        let mask = 1 << 192;
        if (n >= mask) {
            (0, true)
        } else {
            (n << 64, false)
        }
    }
}
