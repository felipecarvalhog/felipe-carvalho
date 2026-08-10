/**
 * Dev-only helper: prints WCAG 2.2 contrast ratios for the token pairs used in
 * the design system. Run with `node scripts/contrast.mjs`.
 */
const hex = (h) => {
  const v = h.replace('#', '');
  return [0, 2, 4].map((i) => parseInt(v.slice(i, i + 2), 16) / 255);
};

const lin = (c) => (c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4);

const lum = (h) => {
  const [r, g, b] = hex(h).map(lin);
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
};

const ratio = (a, b) => {
  const [l1, l2] = [lum(a), lum(b)].sort((x, y) => y - x);
  return (l1 + 0.05) / (l2 + 0.05);
};

const pairs = process.argv.slice(2);
if (pairs.length >= 2) {
  console.log(ratio(pairs[0], pairs[1]).toFixed(2));
} else {
  const checks = [
    ['ink on white', '#171C26', '#FFFFFF'],
    ['body on white', '#3A4356', '#FFFFFF'],
    ['muted on white', '#5A6478', '#FFFFFF'],
    ['slate on white', '#4D576B', '#FFFFFF'],
    ['cobalt on white', '#2B4BA9', '#FFFFFF'],
    ['white on cobalt', '#FFFFFF', '#2B4BA9'],
    ['white on cobalt-strong', '#FFFFFF', '#223C87'],
    ['ink on subtle', '#171C26', '#F6F8FB'],
    ['body on subtle', '#3A4356', '#F6F8FB'],
    ['ink on mist', '#171C26', '#CEE4EA'],
    ['body on mist', '#3A4356', '#CEE4EA'],
    ['slate on mist', '#4D576B', '#CEE4EA'],
    ['cobalt on mist', '#2B4BA9', '#CEE4EA'],
    ['ink on lavender', '#171C26', '#D0DEED'],
    ['body on lavender', '#3A4356', '#D0DEED'],
    ['cobalt on lavender', '#2B4BA9', '#D0DEED'],
    ['ink on mist-tint', '#171C26', '#E9F3F6'],
    ['body on mist-tint', '#3A4356', '#E9F3F6'],
    ['white on deep', '#FFFFFF', '#232B3A'],
    ['mist on deep', '#CEE4EA', '#232B3A'],
    ['lavender on deep', '#D0DEED', '#232B3A'],
    ['footer muted on deep', '#B9C4D6', '#232B3A'],
    ['border-strong vs white (UI 3:1)', '#8894AA', '#FFFFFF'],
    ['border vs white', '#CFD8E4', '#FFFFFF'],
    ['focus ring vs white', '#2B4BA9', '#FFFFFF'],
    ['focus ring vs mist', '#2B4BA9', '#CEE4EA'],
    ['focus ring vs deep', '#CEE4EA', '#232B3A'],
    ['success ink on white', '#1F5A46', '#FFFFFF'],
    ['success on tint', '#1F5A46', '#E8F3EF'],
    ['danger ink on white', '#A32222', '#FFFFFF'],
    ['danger on tint', '#A32222', '#FCEDED'],
    ['warn ink on white', '#7A4A05', '#FFFFFF'],
    ['warn on tint', '#7A4A05', '#FFF5E4'],
  ];
  for (const [label, fg, bg] of checks) {
    const r = ratio(fg, bg);
    console.log(`${r.toFixed(2).padStart(6)}  ${label}  (${fg} on ${bg})`);
  }
}
