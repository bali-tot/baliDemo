// ═══════════════════════════════════════════
// Extracted from output.txt — task 165
// Variables: x, y, m, n
// D=3 branches (step 0/1/2), beam k=5
// ═══════════════════════════════════════════

// ── Branch labels (φ₀, φ₁, φ₂) ──────────
// (actual guards not in output.txt, inferred from invariant shapes)
const PHI2 = [
  { id: 'phi0', lbl: 'φ₀' },
  { id: 'phi1', lbl: 'φ₁' },
  { id: 'phi2', lbl: 'φ₂' },
];

// ── Helper ───────────────────────────────
// A candidate = list of sub-invariants, one per branch processed so far
// e.g. after step 1: [{phi:'phi0', inv:'...'}, {phi:'phi1', inv:'...'}]

// ═══════════════════════════════════════════
// STEP 0 (φ₀) — GenerateCandidates
// ═══════════════════════════════════════════

const step0_proposals = [
  'x >= n && y == x',
  'x >= n && y == m + (x - m)',
  ['x >= n && y == m + (x-m) && x >= m && m >= 0 && n >= 0 && m < n',
   'x >= n && y == m && x <= m && m >= 0 && n >= 0 && m < n'],   // 2-conjunct
  'y == m + (x-m) && x >= n && x >= m && m >= 0 && n >= 0',
  'x >= n && y == m + (x-m) && m < n && n >= 0 && m >= 0',
];

// new_ys = proposals sorted (Y={[]} × proposals = proposals themselves)
const step0_new_ys = [
  { phi0: 'y == m + (x-m) && x >= n && x >= m && m >= 0 && n >= 0' },
  { phi0: 'x >= n && y == m + (x-m) && m < n && n >= 0 && m >= 0' },
  { phi0: 'x >= n && y == x' },
  { phi0: ['x >= n && y == m + (x-m) && x >= m && m >= 0 && n >= 0 && m < n',
            'x >= n && y == m && x <= m && m >= 0 && n >= 0 && m < n'] },
  { phi0: 'x >= n && y == m + (x-m)' },
];

const step0_scores = [9.0, 9.0, 7.0, 7.0, 6.0];

// choices = TopK(new_ys, k=5) — all kept
const step0_choices = step0_new_ys;  // same order, all 5 survive

// ═══════════════════════════════════════════
// STEP 1 (φ₁) — GenerateCandidates
// ═══════════════════════════════════════════

const step1_proposals = [
  'y == m && m < n && n >= 0 && m >= 0 && x <= m && x < n',
  'y == m && m < n && x <= m && x >= 0 && n >= 0 && m >= 0',
  'y == m && m < n && x <= m && x < n',
  'y == m && m < n && m >= 0 && n >= 0 && x <= m && x < n',
  'y == m && x <= m && m < n && n >= 0 && m >= 0',
];

// new_ys = Expand(choices₀, proposals₁) → 5×5=25, sorted by score
const step1_new_ys_scored = [
  { score: 9.000, phi0: 'y==m+(x-m)&&x>=n&&x>=m&&m>=0&&n>=0',         phi1: 'y==m&&m<n&&x<=m&&x>=0&&n>=0&&m>=0' },
  { score: 9.000, phi0: 'x>=n&&y==m+(x-m)&&m<n&&n>=0&&m>=0',           phi1: 'y==m&&m<n&&x<=m&&x>=0&&n>=0&&m>=0' },
  { score: 8.667, phi0: 'y==m+(x-m)&&x>=n&&x>=m&&m>=0&&n>=0',          phi1: 'y==m&&m<n&&n>=0&&m>=0&&x<=m&&x<n' },
  { score: 8.667, phi0: ['x>=n&&y==m+(x-m)&&x>=m&&m>=0&&n>=0&&m<n',
                          'x>=n&&y==m&&x<=m&&m>=0&&n>=0&&m<n'],          phi1: 'y==m&&m<n&&n>=0&&m>=0&&x<=m&&x<n' },
  { score: 8.333, phi0: 'y==m+(x-m)&&x>=n&&x>=m&&m>=0&&n>=0',          phi1: 'y==m&&m<n&&m>=0&&n>=0&&x<=m&&x<n' },
  { score: 8.333, phi0: ['x>=n&&y==m+(x-m)&&x>=m&&m>=0&&n>=0&&m<n',
                          'x>=n&&y==m&&x<=m&&m>=0&&n>=0&&m<n'],          phi1: 'y==m&&m<n&&m>=0&&n>=0&&x<=m&&x<n' },
  { score: 8.000, phi0: 'y==m+(x-m)&&x>=n&&x>=m&&m>=0&&n>=0',          phi1: 'y==m&&x<=m&&m<n&&n>=0&&m>=0' },
  { score: 8.000, phi0: 'x>=n&&y==m+(x-m)&&m<n&&n>=0&&m>=0',           phi1: 'y==m&&x<=m&&m<n&&n>=0&&m>=0' },
  { score: 8.000, phi0: ['x>=n&&y==m+(x-m)&&x>=m&&m>=0&&n>=0&&m<n',
                          'x>=n&&y==m&&x<=m&&m>=0&&n>=0&&m<n'],          phi1: 'y==m&&x<=m&&m<n&&n>=0&&m>=0' },
  { score: 7.667, phi0: 'y==m+(x-m)&&x>=n&&x>=m&&m>=0&&n>=0',          phi1: 'y==m&&m<n&&x<=m&&x<n' },
  { score: 7.667, phi0: 'x>=n&&y==m+(x-m)&&m<n&&n>=0&&m>=0',           phi1: 'y==m&&m<n&&n>=0&&m>=0&&x<=m&&x<n' },
  { score: 7.667, phi0: 'x>=n&&y==m+(x-m)&&m<n&&n>=0&&m>=0',           phi1: 'y==m&&m<n&&m>=0&&n>=0&&x<=m&&x<n' },
  { score: 7.667, phi0: ['x>=n&&y==m+(x-m)&&x>=m&&m>=0&&n>=0&&m<n',
                          'x>=n&&y==m&&x<=m&&m>=0&&n>=0&&m<n'],          phi1: 'y==m&&m<n&&x<=m&&x>=0&&n>=0&&m>=0' },
  { score: 7.667, phi0: ['x>=n&&y==m+(x-m)&&x>=m&&m>=0&&n>=0&&m<n',
                          'x>=n&&y==m&&x<=m&&m>=0&&n>=0&&m<n'],          phi1: 'y==m&&m<n&&x<=m&&x<n' },
  { score: 7.333, phi0: 'x>=n&&y==m+(x-m)',                              phi1: 'y==m&&m<n&&n>=0&&m>=0&&x<=m&&x<n' },
  { score: 7.000, phi0: 'x>=n&&y==m+(x-m)&&m<n&&n>=0&&m>=0',           phi1: 'y==m&&m<n&&n>=0&&m>=0&&x<=m&&x<n' },
  { score: 6.667, phi0: 'x>=n&&y==m+(x-m)&&m<n&&n>=0&&m>=0',           phi1: 'y==m&&m<n&&x<=m&&x<n' },
  { score: 6.333, phi0: 'x>=n&&y==x',                                   phi1: 'y==m&&m<n&&x<=m&&x<n' },
  { score: 6.333, phi0: 'x>=n&&y==x',                                   phi1: 'y==m&&m<n&&x<=m&&x>=0&&n>=0&&m>=0' },
  { score: 6.333, phi0: 'x>=n&&y==m+(x-m)',                             phi1: 'y==m&&m<n&&x<=m&&x>=0&&n>=0&&m>=0' },
  { score: 5.667, phi0: 'x>=n&&y==x',                                   phi1: 'y==m&&m<n&&n>=0&&m>=0&&x<=m&&x<n' },
  { score: 5.667, phi0: 'x>=n&&y==x',                                   phi1: 'y==m&&m<n&&m>=0&&n>=0&&x<=m&&x<n' },
  { score: 5.667, phi0: 'x>=n&&y==x',                                   phi1: 'y==m&&x<=m&&m<n&&n>=0&&m>=0' },
  { score: 5.000, phi0: 'x>=n&&y==m+(x-m)',                             phi1: 'y==m&&m<n&&x<=m&&x<n' },
  { score: 4.333, phi0: 'x>=n&&y==m+(x-m)',                             phi1: 'y==m&&x<=m&&m<n&&n>=0&&m>=0' },
];

// choices = TopK(new_ys, k=5)
const step1_choices = step1_new_ys_scored.slice(0, 5);
// Note: choices[0] and choices[3] have identical phi0; choices[0] and choices[3]
// also have identical phi1 → duplicate by design (allowed).

// ═══════════════════════════════════════════
// STEP 2 (φ₂) — GenerateCandidates
// ═══════════════════════════════════════════

const step2_proposals = [
  'y == x && x >= m && x < n',
  'x >= m && y == x',
  'x >= 0 && n >= 0 && m >= 0 && m < n && x < n && x + 1 > m && y == m + (x - m)',
];
// Note: only 3 proposals generated (LLM output count varies)

// new_ys = Expand(choices₁, proposals₂) → 5×3=15, sorted
const step2_new_ys_scored = [
  { score: 10.000, phi0: 'y==m+(x-m)&&x>=n&&x>=m&&m>=0&&n>=0',          phi1: 'y==m&&m<n&&n>=0&&m>=0&&x<=m&&x<n',         phi2: 'x>=0&&n>=0&&m>=0&&m<n&&x<n&&x+1>m&&y==m+(x-m)' },
  { score: 10.000, phi0: 'y==m+(x-m)&&x>=n&&x>=m&&m>=0&&n>=0',          phi1: 'y==m&&m<n&&m>=0&&n>=0&&x<=m&&x<n',         phi2: 'x>=0&&n>=0&&m>=0&&m<n&&x<n&&x+1>m&&y==m+(x-m)' },
  { score:  9.333, phi0: 'x>=n&&y==m+(x-m)&&m<n&&n>=0&&m>=0',           phi1: 'y==m&&m<n&&x<=m&&x>=0&&n>=0&&m>=0',        phi2: 'x>=0&&n>=0&&m>=0&&m<n&&x<n&&x+1>m&&y==m+(x-m)' },
  { score:  9.000, phi0: 'y==m+(x-m)&&x>=n&&x>=m&&m>=0&&n>=0',          phi1: 'y==m&&m<n&&x<=m&&x>=0&&n>=0&&m>=0',        phi2: 'x>=0&&n>=0&&m>=0&&m<n&&x<n&&x+1>m&&y==m+(x-m)' },
  { score:  9.000, phi0: ['x>=n&&y==m+(x-m)&&x>=m&&m>=0&&n>=0&&m<n',
                           'x>=n&&y==m&&x<=m&&m>=0&&n>=0&&m<n'],          phi1: 'y==m&&m<n&&n>=0&&m>=0&&x<=m&&x<n',         phi2: 'x>=0&&n>=0&&m>=0&&m<n&&x<n&&x+1>m&&y==m+(x-m)' },
  { score:  8.667, phi0: 'y==m+(x-m)&&x>=n&&x>=m&&m>=0&&n>=0',          phi1: 'y==m&&m<n&&x<=m&&x>=0&&n>=0&&m>=0',        phi2: 'x>=m&&y==x' },
  { score:  8.667, phi0: 'y==m+(x-m)&&x>=n&&x>=m&&m>=0&&n>=0',          phi1: 'y==m&&m<n&&n>=0&&m>=0&&x<=m&&x<n',         phi2: 'y==x&&x>=m&&x<n' },
  { score:  8.333, phi0: 'y==m+(x-m)&&x>=n&&x>=m&&m>=0&&n>=0',          phi1: 'y==m&&m<n&&x<=m&&x>=0&&n>=0&&m>=0',        phi2: 'y==x&&x>=m&&x<n' },
  { score:  8.333, phi0: 'y==m+(x-m)&&x>=n&&x>=m&&m>=0&&n>=0',          phi1: 'y==m&&m<n&&n>=0&&m>=0&&x<=m&&x<n',         phi2: 'x>=m&&y==x' },
  { score:  8.333, phi0: 'y==m+(x-m)&&x>=n&&x>=m&&m>=0&&n>=0',          phi1: 'y==m&&m<n&&m>=0&&n>=0&&x<=m&&x<n',         phi2: 'x>=m&&y==x' },
  { score:  8.000, phi0: 'y==m+(x-m)&&x>=n&&x>=m&&m>=0&&n>=0',          phi1: 'y==m&&m<n&&m>=0&&n>=0&&x<=m&&x<n',         phi2: 'y==x&&x>=m&&x<n' },
  { score:  7.667, phi0: ['x>=n&&y==m+(x-m)&&x>=m&&m>=0&&n>=0&&m<n',
                           'x>=n&&y==m&&x<=m&&m>=0&&n>=0&&m<n'],          phi1: 'y==m&&m<n&&n>=0&&m>=0&&x<=m&&x<n',         phi2: 'x>=m&&y==x' },
  { score:  7.333, phi0: 'x>=n&&y==m+(x-m)&&m<n&&n>=0&&m>=0',           phi1: 'y==m&&m<n&&x<=m&&x>=0&&n>=0&&m>=0',        phi2: 'y==x&&x>=m&&x<n' },
  { score:  7.000, phi0: 'x>=n&&y==m+(x-m)&&m<n&&n>=0&&m>=0',           phi1: 'y==m&&m<n&&x<=m&&x>=0&&n>=0&&m>=0',        phi2: 'x>=m&&y==x' },
  { score:  6.333, phi0: ['x>=n&&y==m+(x-m)&&x>=m&&m>=0&&n>=0&&m<n',
                           'x>=n&&y==m&&x<=m&&m>=0&&n>=0&&m<n'],          phi1: 'y==m&&m<n&&n>=0&&m>=0&&x<=m&&x<n',         phi2: 'y==x&&x>=m&&x<n' },
];

// choices = TopK(new_ys, k=5)
const step2_choices = step2_new_ys_scored.slice(0, 5);

// ═══════════════════════════════════════════
// VERIFICATION — CheckCandidates (Z3)
// ═══════════════════════════════════════════

const verification_candidates = [
  '(y==m+(x-m)&&x>=n&&x>=m&&m>=0&&n>=0) || (y==m&&m<n&&n>=0&&m>=0&&x<=m&&x<n) || (x>=0&&n>=0&&m>=0&&m<n&&x<n&&x+1>m&&y==m+(x-m))',
  '(y==m+(x-m)&&x>=n&&x>=m&&m>=0&&n>=0) || (y==m&&m<n&&m>=0&&n>=0&&x<=m&&x<n) || (x>=0&&n>=0&&m>=0&&m<n&&x<n&&x+1>m&&y==m+(x-m))',
  '(x>=n&&y==m+(x-m)&&m<n&&n>=0&&m>=0) || (y==m&&m<n&&x<=m&&x>=0&&n>=0&&m>=0) || (x>=0&&n>=0&&m>=0&&m<n&&x<n&&x+1>m&&y==m+(x-m))',
  '(y==m+(x-m)&&x>=n&&x>=m&&m>=0&&n>=0) || (y==m&&m<n&&x<=m&&x>=0&&n>=0&&m>=0) || (x>=0&&n>=0&&m>=0&&m<n&&x<n&&x+1>m&&y==m+(x-m))',
  '(x>=n&&y==m+(x-m)&&x>=m&&m>=0&&n>=0&&m<n) || (x>=n&&y==m&&x<=m&&m>=0&&n>=0&&m<n) || (y==m&&m<n&&n>=0&&m>=0&&x<=m&&x<n) || (x>=0&&n>=0&&m>=0&&m<n&&x<n&&x+1>m&&y==m+(x-m))',
];
// Result: ALL FAIL → I = None

// ═══════════════════════════════════════════
// REFINEMENT ROUND 1
// ═══════════════════════════════════════════

const refine1 = {
  selected: verification_candidates[0],   // SelectBest → candidate 0 (F1)
  ce: { y: 2, m: 0, x: 2, n: 1 },
  broken_terms: ['y == m', 'x <= m'],
  position: 'post',
  branch_index: 0,
  // RefineBranch: 4 refined candidates (only φ₀ part changes)
  refined: [
    '(x>=n&&y==m+(x-m)&&x>=m&&m>=0&&n>=0&&m<n) || (y==m&&m<n&&n>=0&&m>=0&&x<=m&&x<n) || (x>=0&&n>=0&&m>=0&&m<n&&x<n&&x+1>m&&y==m+(x-m))',
    '(x>=n&&n>=0&&m>=0&&m<n&&y==m+(x-m)) || (y==m&&m<n&&n>=0&&m>=0&&x<=m&&x<n) || (x>=0&&n>=0&&m>=0&&m<n&&x<n&&x+1>m&&y==m+(x-m))',
    '(x>=n&&y==m+(x-m)&&x>m&&m>=0&&n>=0&&m<n) || (y==m&&m<n&&n>=0&&m>=0&&x<=m&&x<n) || (x>=0&&n>=0&&m>=0&&m<n&&x<n&&x+1>m&&y==m+(x-m))',
    '(x>=n&&m>=0&&n>=0&&m<n&&y==m+(x-m)) || (y==m&&m<n&&n>=0&&m>=0&&x<=m&&x<n) || (x>=0&&n>=0&&m>=0&&m<n&&x<n&&x+1>m&&y==m+(x-m))',
  ],
};

// ═══════════════════════════════════════════
// REFINEMENT ROUND 2
// ═══════════════════════════════════════════

const refine2 = {
  selected: refine1.refined[0],   // SelectBest → R1 from round 1
  ce: { y: 2, m: 0, x: 2, n: 1 },  // same CE
  broken_terms: [],                  // no terms identified
  position: 'post',
  branch_index: 0,
  // RefineBranch: 3 refined candidates
  refined: [
    '(x>=n&&y==m+(x-m)&&x>=m&&m>=0&&n>=0&&m<n&&n>=m) || (y==m&&m<n&&n>=0&&m>=0&&x<=m&&x<n) || (x>=0&&n>=0&&m>=0&&m<n&&x<n&&x+1>m&&y==m+(x-m))',
    '(x>=n&&y==m+(x-m)&&x>=m&&m>=0&&n>=0&&m<n&&x<=n) || (y==m&&m<n&&n>=0&&m>=0&&x<=m&&x<n) || (x>=0&&n>=0&&m>=0&&m<n&&x<n&&x+1>m&&y==m+(x-m))',
    '(x>=n&&y==m+(x-m)&&x>=m&&m>=0&&n>=0&&m<n&&y==x) || (y==m&&m<n&&n>=0&&m>=0&&x<=m&&x<n) || (x>=0&&n>=0&&m>=0&&m<n&&x<n&&x+1>m&&y==m+(x-m))',
  ],
};

// ═══════════════════════════════════════════
// RESULT
// ═══════════════════════════════════════════

const result = {
  valid: true,
  invariant: '(x>=n&&y==m+(x-m)&&x>=m&&m>=0&&n>=0&&m<n&&x<=n) || (y==m&&m<n&&n>=0&&m>=0&&x<=m&&x<n) || (x>=0&&n>=0&&m>=0&&m<n&&x<n&&x+1>m&&y==m+(x-m))',
  task: 165,
  time_sec: 62.6,
  llm_queries: 52,
  prompt_tokens: 34516,
  completion_tokens: 3477,
  cost_usd: 0.0779,
};
