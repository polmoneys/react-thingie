export const openUrl = (to: string): unknown => window?.open(to, '_blank');

/*
  // URL: https://example.com/page?user=alice&age=30#ref=home
  uQuery('user'); // "alice"
  uQuery('age');  // "30"
  uQuery('ref');  // "home"   (from hash)
*/

export default function queryURL(name: string) {
    const url = new URL(window.location.href);
    const qs = url.search || `?${url.hash.slice(1)}`;
    return new URLSearchParams(qs).get(name);
}
