# Submission Assets

## Loom Walkthrough Script (3-5 minutes)
1. Introduce problem: Cetus exploit and why audits missed it.
2. Show vulnerable fixture (`fixtures/move/vulnerable.move`).
3. Run scanner on vulnerable file and explain each high severity finding.
4. Show fixed fixture (`fixtures/move/safe.move`).
5. Run scanner on safe file and show clean/low-risk output.
6. Close with roadmap: AST engine, protocol packs, CI integration.

## Email Draft
Subject: Olympix Take-Home - DeFi Exploit Prevention PoC (OverflowSentinel)

Hi Mason, Channi, and Anish,

I completed the assignment by analyzing recent DeFi exploits and selecting the Cetus Protocol incident (~$223M, May 2025) as the most compelling case. I chose it because a small boundary-check mistake in arithmetic logic caused catastrophic loss, and the issue passed through multiple audits.

I designed and implemented a proof-of-concept tool called **OverflowSentinel**, an off-chain static analyzer that flags Cetus-style overflow guard mistakes before deployment. The PoC includes:
- exploit analysis and rationale,
- tool architecture and detection rules,
- runnable scanner CLI,
- vulnerable vs safe contract fixtures,
- demo flow showing findings and fixes.

I also recorded a Loom walkthrough of the complete flow.

Repository and demo details are attached in this thread. Happy to walk through design decisions or extend the PoC further.

Best,  
Mair Ahmed

## Action Items to Share Internally
- Finalize Loom link and insert into email.
- Add one screenshot of vulnerable scan output.
- Add one screenshot of safe scan output.
- Attach repo link and short run instructions.
