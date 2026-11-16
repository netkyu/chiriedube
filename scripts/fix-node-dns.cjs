/**
 * Some routers keep a stale NXDOMAIN for paused Supabase hosts.
 * Node's fetch uses dns.lookup (getaddrinfo), which hits that cache,
 * while dns.resolve4 (DNS protocol) still works. Patch lookup for local dev.
 */
const dns = require("dns");
const { promisify } = require("util");

const resolve4 = promisify(dns.resolve4);
const originalLookup = dns.lookup.bind(dns);

dns.lookup = function patchedLookup(hostname, options, callback) {
  if (typeof options === "function") {
    callback = options;
    options = undefined;
  }

  const opts = typeof options === "number" ? { family: options } : options || {};
  const wantsAll = Boolean(opts.all);

  resolve4(hostname)
    .then((addrs) => {
      if (!addrs.length) {
        return originalLookup(hostname, opts, callback);
      }
      if (wantsAll) {
        callback(null, addrs.map((address) => ({ address, family: 4 })));
      } else {
        callback(null, addrs[0], 4);
      }
    })
    .catch(() => originalLookup(hostname, opts, callback));
};
