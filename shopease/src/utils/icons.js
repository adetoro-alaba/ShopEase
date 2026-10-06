const paths = {
  bag: '<path d="M5 8.5h14l-1 11H6l-1-11Z"/><path d="M8.5 8.5V7a3.5 3.5 0 0 1 7 0v1.5"/>',
  cart: '<path d="M3 4h2l2.2 11.2a2 2 0 0 0 2 1.6h7.7a2 2 0 0 0 1.9-1.4L21 8H6"/><circle cx="10" cy="20" r="1"/><circle cx="18" cy="20" r="1"/>',
  heart: '<path d="M20.8 8.8c0 5.4-8.8 10.1-8.8 10.1S3.2 14.2 3.2 8.8A4.8 4.8 0 0 1 12 6.1a4.8 4.8 0 0 1 8.8 2.7Z"/>',
  star: '<path d="m12 3 2.8 5.7 6.2.9-4.5 4.4 1.1 6.2-5.6-3-5.6 3 1.1-6.2L3 9.6l6.2-.9L12 3Z"/>',
  search: '<circle cx="11" cy="11" r="7"/><path d="m20 20-4-4"/>',
  moon: '<path d="M21 12.8A8.5 8.5 0 1 1 11.2 3 6.7 6.7 0 0 0 21 12.8Z"/>',
  menu: '<path d="M4 6h16M4 12h16M4 18h16"/>',
  home: '<path d="m3 10 9-7 9 7"/><path d="M5 9v11h14V9M9 20v-6h6v6"/>',
  package: '<path d="m16.5 9.4 3.5-2-8-4-8 4 3.5 2"/><path d="M4 7.5v9l8 4 8-4v-9"/><path d="M12 21V11.5"/><path d="m8.5 5.2 8 4"/>',
  card: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 10h18"/>',
  truck: '<path d="M3 6h11v9H3z"/><path d="M14 9h4l3 3v3h-7z"/><circle cx="7" cy="17" r="2"/><circle cx="17" cy="17" r="2"/>',
  shield: '<path d="M12 3 20 6v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6l8-3Z"/><path d="m9 12 2 2 4-4"/>',
  rotate: '<path d="M3 12a9 9 0 0 1 15.3-6.5L21 8"/><path d="M21 3v5h-5"/><path d="M21 12a9 9 0 0 1-15.3 6.5L3 16"/><path d="M3 21v-5h5"/>',
  zap: '<path d="m13 2-9 12h7l-1 8 9-12h-7l1-8Z"/>',
  check: '<path d="m5 12 4 4L19 6"/>',
  trash: '<path d="M4 7h16"/><path d="M10 11v6M14 11v6"/><path d="M6 7l1 14h10l1-14"/><path d="M9 7V4h6v3"/>',
  arrowLeft: '<path d="m15 18-6-6 6-6"/><path d="M9 12h12"/>',
  arrowRight: '<path d="m9 18 6-6-6-6"/><path d="M3 12h12"/>',
  info: '<circle cx="12" cy="12" r="9"/><path d="M12 11v5M12 8h.01"/>'
};

export function icon(name, className = "w-5 h-5", label = "") {
  const body = paths[name] || paths.info;
  const accessible = label ? `role="img" aria-label="${label}"` : 'aria-hidden="true"';
  return `<svg viewBox="0 0 24 24" class="${className} fill-none stroke-current" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" ${accessible}>${body}</svg>`;
}
