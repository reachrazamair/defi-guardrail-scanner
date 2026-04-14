use anchor_lang::prelude::*;

#[program]
pub mod vulnerable_shift_guard {
    use super::*;

    pub fn checked_shlw(_ctx: Context<Noop>, n: u128) -> Result<(u128, bool)> {
        let mask: u128 = 0xffffffffffffffff << 64;
        if n > mask {
            Ok((0, true))
        } else {
            Ok((n << 64, false))
        }
    }
}

#[derive(Accounts)]
pub struct Noop {}
