var os = Object.defineProperty,
  ss = Object.defineProperties;
var as = Object.getOwnPropertyDescriptors;
var Pn = Object.getOwnPropertySymbols;
var cs = Object.prototype.hasOwnProperty,
  us = Object.prototype.propertyIsEnumerable;
var Mn = (K, z, b) =>
    z in K
      ? os(K, z, { enumerable: !0, configurable: !0, writable: !0, value: b })
      : (K[z] = b),
  h = (K, z) => {
    for (var b in z || (z = {})) cs.call(z, b) && Mn(K, b, z[b]);
    if (Pn) for (var b of Pn(z)) us.call(z, b) && Mn(K, b, z[b]);
    return K;
  },
  U = (K, z) => ss(K, as(z));
var Ln = (K, z, b) =>
  new Promise((Nt, m) => {
    var v = (N) => {
        try {
          D(b.next(N));
        } catch (y) {
          m(y);
        }
      },
      S = (N) => {
        try {
          D(b.throw(N));
        } catch (y) {
          m(y);
        }
      },
      D = (N) => (N.done ? Nt(N.value) : Promise.resolve(N.value).then(v, S));
    D((b = b.apply(K, z)).next());
  });
(() => {
  var K = {
      5161: () => {
        chrome.runtime.onMessage.addListener((m, v, S) => {
          m.type === "inboxsdk__injectPageWorld" &&
            v.tab &&
            (chrome.scripting
              ? (chrome.scripting.executeScript({
                  target: { tabId: v.tab.id },
                  world: "MAIN",
                  files: ["pageWorld.js"],
                }),
                S(!0))
              : S(!1));
        });
      },
      2661: (m, v, S) => {
        "use strict";
        S.d(v, { S: () => N, n: () => D });
        function D() {
          return (
            typeof __SENTRY_BROWSER_BUNDLE__ != "undefined" &&
            !!__SENTRY_BROWSER_BUNDLE__
          );
        }
        function N() {
          return "npm";
        }
      },
      4305: (m, v, S) => {
        "use strict";
        S.d(v, { KV: () => N, l$: () => y });
        var D = S(2661);
        m = S.hmd(m);
        function N() {
          return (
            !(0, D.n)() &&
            Object.prototype.toString.call(
              typeof process != "undefined" ? process : 0
            ) === "[object process]"
          );
        }
        function y(I, C) {
          return I.require(C);
        }
        function X(I) {
          let C;
          try {
            C = y(m, I);
          } catch (j) {}
          try {
            const { cwd: j } = y(m, "process");
            C = y(m, `${j()}/node_modules/${I}`);
          } catch (j) {}
          return C;
        }
      },
      6400: (m, v, S) => {
        "use strict";
        S.d(v, { ph: () => W, yW: () => re });
        var D = S(4305),
          N = S(1846);
        m = S.hmd(m);
        const y = (0, N.Rf)(),
          X = { nowSeconds: () => Date.now() / 1e3 };
        function I() {
          const { performance: M } = y;
          if (!M || !M.now) return;
          const B = Date.now() - M.now();
          return { now: () => M.now(), timeOrigin: B };
        }
        function C() {
          try {
            return (0, D.l$)(m, "perf_hooks").performance;
          } catch (M) {
            return;
          }
        }
        const j = (0, D.KV)() ? C() : I(),
          te =
            j === void 0
              ? X
              : { nowSeconds: () => (j.timeOrigin + j.now()) / 1e3 },
          re = X.nowSeconds.bind(X),
          W = te.nowSeconds.bind(te),
          pe = null,
          G = j !== void 0;
        let Q;
        const _e = (() => {
          const { performance: M } = y;
          if (!M || !M.now) {
            Q = "none";
            return;
          }
          const B = 3600 * 1e3,
            E = M.now(),
            u = Date.now(),
            l = M.timeOrigin ? Math.abs(M.timeOrigin + E - u) : B,
            f = l < B,
            g = M.timing && M.timing.navigationStart,
            k = typeof g == "number" ? Math.abs(g + E - u) : B,
            F = k < B;
          return f || F
            ? l <= k
              ? ((Q = "timeOrigin"), M.timeOrigin)
              : ((Q = "navigationStart"), g)
            : ((Q = "dateNow"), u);
        })();
      },
      1846: (m, v, S) => {
        "use strict";
        S.d(v, { Rf: () => y, YO: () => X, n2: () => N });
        function D(I) {
          return I && I.Math == Math ? I : void 0;
        }
        const N =
          (typeof globalThis == "object" && D(globalThis)) ||
          (typeof window == "object" && D(window)) ||
          (typeof self == "object" && D(self)) ||
          (typeof S.g == "object" && D(S.g)) ||
          (function () {
            return this;
          })() ||
          {};
        function y() {
          return N;
        }
        function X(I, C, j) {
          const te = j || N,
            re = (te.__SENTRY__ = te.__SENTRY__ || {});
          return re[I] || (re[I] = C());
        }
      },
      3666: (m) => {
        const v =
            typeof performance == "object" &&
            performance &&
            typeof performance.now == "function"
              ? performance
              : Date,
          D =
            typeof AbortController == "function"
              ? AbortController
              : class {
                  constructor() {
                    this.signal = new X();
                  }
                  abort() {
                    this.signal.dispatchEvent("abort");
                  }
                },
          N = typeof AbortSignal == "function",
          y = typeof D.AbortSignal == "function",
          X = N
            ? AbortSignal
            : y
            ? D.AbortController
            : class {
                constructor() {
                  (this.aborted = !1), (this._listeners = []);
                }
                dispatchEvent(u) {
                  if (u === "abort") {
                    this.aborted = !0;
                    const l = { type: u, target: this };
                    this.onabort(l), this._listeners.forEach((f) => f(l), this);
                  }
                }
                onabort() {}
                addEventListener(u, l) {
                  u === "abort" && this._listeners.push(l);
                }
                removeEventListener(u, l) {
                  u === "abort" &&
                    (this._listeners = this._listeners.filter((f) => f !== l));
                }
              },
          I = new Set(),
          C = (E, u) => {
            const l = `LRU_CACHE_OPTION_${E}`;
            W(l) && pe(l, `${E} option`, `options.${u}`, B);
          },
          j = (E, u) => {
            const l = `LRU_CACHE_METHOD_${E}`;
            if (W(l)) {
              const { prototype: f } = B,
                { get: g } = Object.getOwnPropertyDescriptor(f, E);
              pe(l, `${E} method`, `cache.${u}()`, g);
            }
          },
          te = (E, u) => {
            const l = `LRU_CACHE_PROPERTY_${E}`;
            if (W(l)) {
              const { prototype: f } = B,
                { get: g } = Object.getOwnPropertyDescriptor(f, E);
              pe(l, `${E} property`, `cache.${u}`, g);
            }
          },
          re = (...E) => {
            typeof process == "object" &&
            process &&
            typeof process.emitWarning == "function"
              ? process.emitWarning(...E)
              : console.error(...E);
          },
          W = (E) => !I.has(E),
          pe = (E, u, l, f) => {
            I.add(E);
            const g = `The ${u} is deprecated. Please use ${l} instead.`;
            re(g, "DeprecationWarning", E, f);
          },
          G = (E) => E && E === Math.floor(E) && E > 0 && isFinite(E),
          Q = (E) =>
            G(E)
              ? E <= Math.pow(2, 8)
                ? Uint8Array
                : E <= Math.pow(2, 16)
                ? Uint16Array
                : E <= Math.pow(2, 32)
                ? Uint32Array
                : E <= Number.MAX_SAFE_INTEGER
                ? _e
                : null
              : null;
        class _e extends Array {
          constructor(u) {
            super(u), this.fill(0);
          }
        }
        class M {
          constructor(u) {
            if (u === 0) return [];
            const l = Q(u);
            (this.heap = new l(u)), (this.length = 0);
          }
          push(u) {
            this.heap[this.length++] = u;
          }
          pop() {
            return this.heap[--this.length];
          }
        }
        class B {
          constructor(u = {}) {
            const {
                max: l = 0,
                ttl: f,
                ttlResolution: g = 1,
                ttlAutopurge: x,
                updateAgeOnGet: k,
                updateAgeOnHas: F,
                allowStale: ie,
                dispose: R,
                disposeAfter: J,
                noDisposeOnSet: L,
                noUpdateTTL: Z,
                maxSize: we = 0,
                maxEntrySize: Ue = 0,
                sizeCalculation: O,
                fetchMethod: q,
                fetchContext: ne,
                noDeleteOnFetchRejection: Be,
                noDeleteOnStaleGet: at,
              } = u,
              { length: Fe, maxAge: $e, stale: ze } = u instanceof B ? {} : u;
            if (l !== 0 && !G(l))
              throw new TypeError("max option must be a nonnegative integer");
            const je = l ? Q(l) : Array;
            if (!je) throw new Error("invalid max value: " + l);
            if (
              ((this.max = l),
              (this.maxSize = we),
              (this.maxEntrySize = Ue || this.maxSize),
              (this.sizeCalculation = O || Fe),
              this.sizeCalculation)
            ) {
              if (!this.maxSize && !this.maxEntrySize)
                throw new TypeError(
                  "cannot set sizeCalculation without setting maxSize or maxEntrySize"
                );
              if (typeof this.sizeCalculation != "function")
                throw new TypeError("sizeCalculation set to non-function");
            }
            if (
              ((this.fetchMethod = q || null),
              this.fetchMethod && typeof this.fetchMethod != "function")
            )
              throw new TypeError(
                "fetchMethod must be a function if specified"
              );
            if (((this.fetchContext = ne), !this.fetchMethod && ne !== void 0))
              throw new TypeError(
                "cannot set fetchContext without fetchMethod"
              );
            if (
              ((this.keyMap = new Map()),
              (this.keyList = new Array(l).fill(null)),
              (this.valList = new Array(l).fill(null)),
              (this.next = new je(l)),
              (this.prev = new je(l)),
              (this.head = 0),
              (this.tail = 0),
              (this.free = new M(l)),
              (this.initialFill = 1),
              (this.size = 0),
              typeof R == "function" && (this.dispose = R),
              typeof J == "function"
                ? ((this.disposeAfter = J), (this.disposed = []))
                : ((this.disposeAfter = null), (this.disposed = null)),
              (this.noDisposeOnSet = !!L),
              (this.noUpdateTTL = !!Z),
              (this.noDeleteOnFetchRejection = !!Be),
              this.maxEntrySize !== 0)
            ) {
              if (this.maxSize !== 0 && !G(this.maxSize))
                throw new TypeError(
                  "maxSize must be a positive integer if specified"
                );
              if (!G(this.maxEntrySize))
                throw new TypeError(
                  "maxEntrySize must be a positive integer if specified"
                );
              this.initializeSizeTracking();
            }
            if (
              ((this.allowStale = !!ie || !!ze),
              (this.noDeleteOnStaleGet = !!at),
              (this.updateAgeOnGet = !!k),
              (this.updateAgeOnHas = !!F),
              (this.ttlResolution = G(g) || g === 0 ? g : 1),
              (this.ttlAutopurge = !!x),
              (this.ttl = f || $e || 0),
              this.ttl)
            ) {
              if (!G(this.ttl))
                throw new TypeError(
                  "ttl must be a positive integer if specified"
                );
              this.initializeTTLTracking();
            }
            if (this.max === 0 && this.ttl === 0 && this.maxSize === 0)
              throw new TypeError(
                "At least one of max, maxSize, or ttl is required"
              );
            if (!this.ttlAutopurge && !this.max && !this.maxSize) {
              const me = "LRU_CACHE_UNBOUNDED";
              W(me) &&
                (I.add(me),
                re(
                  "TTL caching without ttlAutopurge, max, or maxSize can result in unbounded memory consumption.",
                  "UnboundedCacheWarning",
                  me,
                  B
                ));
            }
            ze && C("stale", "allowStale"),
              $e && C("maxAge", "ttl"),
              Fe && C("length", "sizeCalculation");
          }
          getRemainingTTL(u) {
            return this.has(u, { updateAgeOnHas: !1 }) ? 1 / 0 : 0;
          }
          initializeTTLTracking() {
            (this.ttls = new _e(this.max)),
              (this.starts = new _e(this.max)),
              (this.setItemTTL = (f, g, x = v.now()) => {
                if (
                  ((this.starts[f] = g !== 0 ? x : 0),
                  (this.ttls[f] = g),
                  g !== 0 && this.ttlAutopurge)
                ) {
                  const k = setTimeout(() => {
                    this.isStale(f) && this.delete(this.keyList[f]);
                  }, g + 1);
                  k.unref && k.unref();
                }
              }),
              (this.updateItemAge = (f) => {
                this.starts[f] = this.ttls[f] !== 0 ? v.now() : 0;
              });
            let u = 0;
            const l = () => {
              const f = v.now();
              if (this.ttlResolution > 0) {
                u = f;
                const g = setTimeout(() => (u = 0), this.ttlResolution);
                g.unref && g.unref();
              }
              return f;
            };
            (this.getRemainingTTL = (f) => {
              const g = this.keyMap.get(f);
              return g === void 0
                ? 0
                : this.ttls[g] === 0 || this.starts[g] === 0
                ? 1 / 0
                : this.starts[g] + this.ttls[g] - (u || l());
            }),
              (this.isStale = (f) =>
                this.ttls[f] !== 0 &&
                this.starts[f] !== 0 &&
                (u || l()) - this.starts[f] > this.ttls[f]);
          }
          updateItemAge(u) {}
          setItemTTL(u, l, f) {}
          isStale(u) {
            return !1;
          }
          initializeSizeTracking() {
            (this.calculatedSize = 0),
              (this.sizes = new _e(this.max)),
              (this.removeItemSize = (u) => {
                (this.calculatedSize -= this.sizes[u]), (this.sizes[u] = 0);
              }),
              (this.requireSize = (u, l, f, g) => {
                if (this.isBackgroundFetch(l)) return 0;
                if (!G(f))
                  if (g) {
                    if (typeof g != "function")
                      throw new TypeError("sizeCalculation must be a function");
                    if (((f = g(l, u)), !G(f)))
                      throw new TypeError(
                        "sizeCalculation return invalid (expect positive integer)"
                      );
                  } else
                    throw new TypeError(
                      "invalid size value (must be positive integer)"
                    );
                return f;
              }),
              (this.addItemSize = (u, l) => {
                if (((this.sizes[u] = l), this.maxSize)) {
                  const f = this.maxSize - this.sizes[u];
                  for (; this.calculatedSize > f; ) this.evict(!0);
                }
                this.calculatedSize += this.sizes[u];
              });
          }
          removeItemSize(u) {}
          addItemSize(u, l) {}
          requireSize(u, l, f, g) {
            if (f || g)
              throw new TypeError(
                "cannot set size without setting maxSize or maxEntrySize on cache"
              );
          }
          *indexes({ allowStale: u = this.allowStale } = {}) {
            if (this.size)
              for (
                let l = this.tail;
                !(
                  !this.isValidIndex(l) ||
                  ((u || !this.isStale(l)) && (yield l), l === this.head)
                );

              )
                l = this.prev[l];
          }
          *rindexes({ allowStale: u = this.allowStale } = {}) {
            if (this.size)
              for (
                let l = this.head;
                !(
                  !this.isValidIndex(l) ||
                  ((u || !this.isStale(l)) && (yield l), l === this.tail)
                );

              )
                l = this.next[l];
          }
          isValidIndex(u) {
            return this.keyMap.get(this.keyList[u]) === u;
          }
          *entries() {
            for (const u of this.indexes())
              yield [this.keyList[u], this.valList[u]];
          }
          *rentries() {
            for (const u of this.rindexes())
              yield [this.keyList[u], this.valList[u]];
          }
          *keys() {
            for (const u of this.indexes()) yield this.keyList[u];
          }
          *rkeys() {
            for (const u of this.rindexes()) yield this.keyList[u];
          }
          *values() {
            for (const u of this.indexes()) yield this.valList[u];
          }
          *rvalues() {
            for (const u of this.rindexes()) yield this.valList[u];
          }
          [Symbol.iterator]() {
            return this.entries();
          }
          find(u, l = {}) {
            for (const f of this.indexes())
              if (u(this.valList[f], this.keyList[f], this))
                return this.get(this.keyList[f], l);
          }
          forEach(u, l = this) {
            for (const f of this.indexes())
              u.call(l, this.valList[f], this.keyList[f], this);
          }
          rforEach(u, l = this) {
            for (const f of this.rindexes())
              u.call(l, this.valList[f], this.keyList[f], this);
          }
          get prune() {
            return j("prune", "purgeStale"), this.purgeStale;
          }
          purgeStale() {
            let u = !1;
            for (const l of this.rindexes({ allowStale: !0 }))
              this.isStale(l) && (this.delete(this.keyList[l]), (u = !0));
            return u;
          }
          dump() {
            const u = [];
            for (const l of this.indexes({ allowStale: !0 })) {
              const f = this.keyList[l],
                g = this.valList[l],
                k = {
                  value: this.isBackgroundFetch(g) ? g.__staleWhileFetching : g,
                };
              if (this.ttls) {
                k.ttl = this.ttls[l];
                const F = v.now() - this.starts[l];
                k.start = Math.floor(Date.now() - F);
              }
              this.sizes && (k.size = this.sizes[l]), u.unshift([f, k]);
            }
            return u;
          }
          load(u) {
            this.clear();
            for (const [l, f] of u) {
              if (f.start) {
                const g = Date.now() - f.start;
                f.start = v.now() - g;
              }
              this.set(l, f.value, f);
            }
          }
          dispose(u, l, f) {}
          set(
            u,
            l,
            {
              ttl: f = this.ttl,
              start: g,
              noDisposeOnSet: x = this.noDisposeOnSet,
              size: k = 0,
              sizeCalculation: F = this.sizeCalculation,
              noUpdateTTL: ie = this.noUpdateTTL,
            } = {}
          ) {
            if (
              ((k = this.requireSize(u, l, k, F)),
              this.maxEntrySize && k > this.maxEntrySize)
            )
              return this.delete(u), this;
            let R = this.size === 0 ? void 0 : this.keyMap.get(u);
            if (R === void 0)
              (R = this.newIndex()),
                (this.keyList[R] = u),
                (this.valList[R] = l),
                this.keyMap.set(u, R),
                (this.next[this.tail] = R),
                (this.prev[R] = this.tail),
                (this.tail = R),
                this.size++,
                this.addItemSize(R, k),
                (ie = !1);
            else {
              const J = this.valList[R];
              l !== J &&
                (this.isBackgroundFetch(J)
                  ? J.__abortController.abort()
                  : x ||
                    (this.dispose(J, u, "set"),
                    this.disposeAfter && this.disposed.push([J, u, "set"])),
                this.removeItemSize(R),
                (this.valList[R] = l),
                this.addItemSize(R, k)),
                this.moveToTail(R);
            }
            if (
              (f !== 0 &&
                this.ttl === 0 &&
                !this.ttls &&
                this.initializeTTLTracking(),
              ie || this.setItemTTL(R, f, g),
              this.disposeAfter)
            )
              for (; this.disposed.length; )
                this.disposeAfter(...this.disposed.shift());
            return this;
          }
          newIndex() {
            return this.size === 0
              ? this.tail
              : this.size === this.max && this.max !== 0
              ? this.evict(!1)
              : this.free.length !== 0
              ? this.free.pop()
              : this.initialFill++;
          }
          pop() {
            if (this.size) {
              const u = this.valList[this.head];
              return this.evict(!0), u;
            }
          }
          evict(u) {
            const l = this.head,
              f = this.keyList[l],
              g = this.valList[l];
            return (
              this.isBackgroundFetch(g)
                ? g.__abortController.abort()
                : (this.dispose(g, f, "evict"),
                  this.disposeAfter && this.disposed.push([g, f, "evict"])),
              this.removeItemSize(l),
              u &&
                ((this.keyList[l] = null),
                (this.valList[l] = null),
                this.free.push(l)),
              (this.head = this.next[l]),
              this.keyMap.delete(f),
              this.size--,
              l
            );
          }
          has(u, { updateAgeOnHas: l = this.updateAgeOnHas } = {}) {
            const f = this.keyMap.get(u);
            return f !== void 0 && !this.isStale(f)
              ? (l && this.updateItemAge(f), !0)
              : !1;
          }
          peek(u, { allowStale: l = this.allowStale } = {}) {
            const f = this.keyMap.get(u);
            if (f !== void 0 && (l || !this.isStale(f))) {
              const g = this.valList[f];
              return this.isBackgroundFetch(g) ? g.__staleWhileFetching : g;
            }
          }
          backgroundFetch(u, l, f, g) {
            const x = l === void 0 ? void 0 : this.valList[l];
            if (this.isBackgroundFetch(x)) return x;
            const k = new D(),
              F = { signal: k.signal, options: f, context: g },
              ie = (Z) => (k.signal.aborted || this.set(u, Z, F.options), Z),
              R = (Z) => {
                if (
                  (this.valList[l] === L &&
                    (!f.noDeleteOnFetchRejection ||
                    L.__staleWhileFetching === void 0
                      ? this.delete(u)
                      : (this.valList[l] = L.__staleWhileFetching)),
                  L.__returned === L)
                )
                  throw Z;
              },
              J = (Z) => Z(this.fetchMethod(u, x, F)),
              L = new Promise(J).then(ie, R);
            return (
              (L.__abortController = k),
              (L.__staleWhileFetching = x),
              (L.__returned = null),
              l === void 0
                ? (this.set(u, L, F.options), (l = this.keyMap.get(u)))
                : (this.valList[l] = L),
              L
            );
          }
          isBackgroundFetch(u) {
            return (
              u &&
              typeof u == "object" &&
              typeof u.then == "function" &&
              Object.prototype.hasOwnProperty.call(u, "__staleWhileFetching") &&
              Object.prototype.hasOwnProperty.call(u, "__returned") &&
              (u.__returned === u || u.__returned === null)
            );
          }
          fetch(we) {
            return Ln(
              this,
              arguments,
              function* (
                u,
                {
                  allowStale: l = this.allowStale,
                  updateAgeOnGet: f = this.updateAgeOnGet,
                  noDeleteOnStaleGet: g = this.noDeleteOnStaleGet,
                  ttl: x = this.ttl,
                  noDisposeOnSet: k = this.noDisposeOnSet,
                  size: F = 0,
                  sizeCalculation: ie = this.sizeCalculation,
                  noUpdateTTL: R = this.noUpdateTTL,
                  noDeleteOnFetchRejection: J = this.noDeleteOnFetchRejection,
                  fetchContext: L = this.fetchContext,
                  forceRefresh: Z = !1,
                } = {}
              ) {
                if (!this.fetchMethod)
                  return this.get(u, {
                    allowStale: l,
                    updateAgeOnGet: f,
                    noDeleteOnStaleGet: g,
                  });
                const Ue = {
                  allowStale: l,
                  updateAgeOnGet: f,
                  noDeleteOnStaleGet: g,
                  ttl: x,
                  noDisposeOnSet: k,
                  size: F,
                  sizeCalculation: ie,
                  noUpdateTTL: R,
                  noDeleteOnFetchRejection: J,
                };
                let O = this.keyMap.get(u);
                if (O === void 0) {
                  const q = this.backgroundFetch(u, O, Ue, L);
                  return (q.__returned = q);
                } else {
                  const q = this.valList[O];
                  if (this.isBackgroundFetch(q))
                    return l && q.__staleWhileFetching !== void 0
                      ? q.__staleWhileFetching
                      : (q.__returned = q);
                  if (!Z && !this.isStale(O))
                    return this.moveToTail(O), f && this.updateItemAge(O), q;
                  const ne = this.backgroundFetch(u, O, Ue, L);
                  return l && ne.__staleWhileFetching !== void 0
                    ? ne.__staleWhileFetching
                    : (ne.__returned = ne);
                }
              }
            );
          }
          get(
            u,
            {
              allowStale: l = this.allowStale,
              updateAgeOnGet: f = this.updateAgeOnGet,
              noDeleteOnStaleGet: g = this.noDeleteOnStaleGet,
            } = {}
          ) {
            const x = this.keyMap.get(u);
            if (x !== void 0) {
              const k = this.valList[x],
                F = this.isBackgroundFetch(k);
              return this.isStale(x)
                ? F
                  ? l
                    ? k.__staleWhileFetching
                    : void 0
                  : (g || this.delete(u), l ? k : void 0)
                : F
                ? void 0
                : (this.moveToTail(x), f && this.updateItemAge(x), k);
            }
          }
          connect(u, l) {
            (this.prev[l] = u), (this.next[u] = l);
          }
          moveToTail(u) {
            u !== this.tail &&
              (u === this.head
                ? (this.head = this.next[u])
                : this.connect(this.prev[u], this.next[u]),
              this.connect(this.tail, u),
              (this.tail = u));
          }
          get del() {
            return j("del", "delete"), this.delete;
          }
          delete(u) {
            let l = !1;
            if (this.size !== 0) {
              const f = this.keyMap.get(u);
              if (f !== void 0)
                if (((l = !0), this.size === 1)) this.clear();
                else {
                  this.removeItemSize(f);
                  const g = this.valList[f];
                  this.isBackgroundFetch(g)
                    ? g.__abortController.abort()
                    : (this.dispose(g, u, "delete"),
                      this.disposeAfter &&
                        this.disposed.push([g, u, "delete"])),
                    this.keyMap.delete(u),
                    (this.keyList[f] = null),
                    (this.valList[f] = null),
                    f === this.tail
                      ? (this.tail = this.prev[f])
                      : f === this.head
                      ? (this.head = this.next[f])
                      : ((this.next[this.prev[f]] = this.next[f]),
                        (this.prev[this.next[f]] = this.prev[f])),
                    this.size--,
                    this.free.push(f);
                }
            }
            if (this.disposed)
              for (; this.disposed.length; )
                this.disposeAfter(...this.disposed.shift());
            return l;
          }
          clear() {
            for (const u of this.rindexes({ allowStale: !0 })) {
              const l = this.valList[u];
              if (this.isBackgroundFetch(l)) l.__abortController.abort();
              else {
                const f = this.keyList[u];
                this.dispose(l, f, "delete"),
                  this.disposeAfter && this.disposed.push([l, f, "delete"]);
              }
            }
            if (
              (this.keyMap.clear(),
              this.valList.fill(null),
              this.keyList.fill(null),
              this.ttls && (this.ttls.fill(0), this.starts.fill(0)),
              this.sizes && this.sizes.fill(0),
              (this.head = 0),
              (this.tail = 0),
              (this.initialFill = 1),
              (this.free.length = 0),
              (this.calculatedSize = 0),
              (this.size = 0),
              this.disposed)
            )
              for (; this.disposed.length; )
                this.disposeAfter(...this.disposed.shift());
          }
          get reset() {
            return j("reset", "clear"), this.clear;
          }
          get length() {
            return te("length", "size"), this.size;
          }
          static get AbortController() {
            return D;
          }
          static get AbortSignal() {
            return X;
          }
        }
        m.exports = B;
      },
    },
    z = {};
  function b(m) {
    var v = z[m];
    if (v !== void 0) return v.exports;
    var S = (z[m] = { id: m, loaded: !1, exports: {} });
    return K[m](S, S.exports, b), (S.loaded = !0), S.exports;
  }
  (b.n = (m) => {
    var v = m && m.__esModule ? () => m.default : () => m;
    return b.d(v, { a: v }), v;
  }),
    (b.d = (m, v) => {
      for (var S in v)
        b.o(v, S) &&
          !b.o(m, S) &&
          Object.defineProperty(m, S, { enumerable: !0, get: v[S] });
    }),
    (b.g = (function () {
      if (typeof globalThis == "object") return globalThis;
      try {
        return this || new Function("return this")();
      } catch (m) {
        if (typeof window == "object") return window;
      }
    })()),
    (b.hmd = (m) => (
      (m = Object.create(m)),
      m.children || (m.children = []),
      Object.defineProperty(m, "exports", {
        enumerable: !0,
        set: () => {
          throw new Error(
            "ES Modules may not assign module.exports or exports.*, Use ESM export syntax, instead: " +
              m.id
          );
        },
      }),
      m
    )),
    (b.o = (m, v) => Object.prototype.hasOwnProperty.call(m, v));
  var Nt = {};
  (() => {
    var m =
      typeof window != "undefined"
        ? window
        : typeof b.g != "undefined"
        ? b.g
        : typeof self != "undefined"
        ? self
        : {};
    (m.SENTRY_RELEASE = { id: "connect-v3.2.2" }),
      (m.SENTRY_RELEASES = m.SENTRY_RELEASES || {}),
      (m.SENTRY_RELEASES["connect-client@apihub"] = { id: "connect-v3.2.2" });
  })(),
    (() => {
      "use strict";
      var m = b(1846);
      const v = "Sentry Logger ",
        S = ["debug", "info", "warn", "error", "log", "assert", "trace"];
      function D(t) {
        if (!("console" in m.n2)) return t();
        const e = m.n2.console,
          n = {};
        S.forEach((r) => {
          const i = e[r] && e[r].__sentry_original__;
          r in e && i && ((n[r] = e[r]), (e[r] = i));
        });
        try {
          return t();
        } finally {
          Object.keys(n).forEach((r) => {
            e[r] = n[r];
          });
        }
      }
      function N() {
        let t = !1;
        const e = {
          enable: () => {
            t = !0;
          },
          disable: () => {
            t = !1;
          },
        };
        return (
          typeof __SENTRY_DEBUG__ == "undefined" || __SENTRY_DEBUG__
            ? S.forEach((n) => {
                e[n] = (...r) => {
                  t &&
                    D(() => {
                      m.n2.console[n](`${v}[${n}]:`, ...r);
                    });
                };
              })
            : S.forEach((n) => {
                e[n] = () => {};
              }),
          e
        );
      }
      let y;
      typeof __SENTRY_DEBUG__ == "undefined" || __SENTRY_DEBUG__
        ? (y = (0, m.YO)("logger", N))
        : (y = N());
      const X = Object.prototype.toString;
      function I(t) {
        switch (X.call(t)) {
          case "[object Error]":
          case "[object Exception]":
          case "[object DOMException]":
            return !0;
          default:
            return l(t, Error);
        }
      }
      function C(t, e) {
        return X.call(t) === `[object ${e}]`;
      }
      function j(t) {
        return C(t, "ErrorEvent");
      }
      function te(t) {
        return C(t, "DOMError");
      }
      function re(t) {
        return C(t, "DOMException");
      }
      function W(t) {
        return C(t, "String");
      }
      function pe(t) {
        return t === null || (typeof t != "object" && typeof t != "function");
      }
      function G(t) {
        return C(t, "Object");
      }
      function Q(t) {
        return typeof Event != "undefined" && l(t, Event);
      }
      function _e(t) {
        return typeof Element != "undefined" && l(t, Element);
      }
      function M(t) {
        return C(t, "RegExp");
      }
      function B(t) {
        return Boolean(t && t.then && typeof t.then == "function");
      }
      function E(t) {
        return (
          G(t) &&
          "nativeEvent" in t &&
          "preventDefault" in t &&
          "stopPropagation" in t
        );
      }
      function u(t) {
        return typeof t == "number" && t !== t;
      }
      function l(t, e) {
        try {
          return t instanceof e;
        } catch (n) {
          return !1;
        }
      }
      const f = (0, m.Rf)(),
        g = 80;
      function x(t, e = {}) {
        try {
          let n = t;
          const r = 5,
            i = [];
          let o = 0,
            s = 0;
          const c = " > ",
            a = c.length;
          let d;
          const _ = Array.isArray(e) ? e : e.keyAttrs,
            p = (!Array.isArray(e) && e.maxStringLength) || g;
          for (
            ;
            n &&
            o++ < r &&
            ((d = k(n, _)),
            !(d === "html" || (o > 1 && s + i.length * a + d.length >= p)));

          )
            i.push(d), (s += d.length), (n = n.parentNode);
          return i.reverse().join(c);
        } catch (n) {
          return "<unknown>";
        }
      }
      function k(t, e) {
        const n = t,
          r = [];
        let i, o, s, c, a;
        if (!n || !n.tagName) return "";
        r.push(n.tagName.toLowerCase());
        const d =
          e && e.length
            ? e
                .filter((p) => n.getAttribute(p))
                .map((p) => [p, n.getAttribute(p)])
            : null;
        if (d && d.length)
          d.forEach((p) => {
            r.push(`[${p[0]}="${p[1]}"]`);
          });
        else if ((n.id && r.push(`#${n.id}`), (i = n.className), i && W(i)))
          for (o = i.split(/\s+/), a = 0; a < o.length; a++) r.push(`.${o[a]}`);
        const _ = ["aria-label", "type", "name", "title", "alt"];
        for (a = 0; a < _.length; a++)
          (s = _[a]), (c = n.getAttribute(s)), c && r.push(`[${s}="${c}"]`);
        return r.join("");
      }
      function F() {
        try {
          return f.document.location.href;
        } catch (t) {
          return "";
        }
      }
      function ie(t) {
        return f.document && f.document.querySelector
          ? f.document.querySelector(t)
          : null;
      }
      function R(t, e = 0) {
        return typeof t != "string" || e === 0 || t.length <= e
          ? t
          : `${t.slice(0, e)}...`;
      }
      function J(t, e) {
        let n = t;
        const r = n.length;
        if (r <= 150) return n;
        e > r && (e = r);
        let i = Math.max(e - 60, 0);
        i < 5 && (i = 0);
        let o = Math.min(i + 140, r);
        return (
          o > r - 5 && (o = r),
          o === r && (i = Math.max(o - 140, 0)),
          (n = n.slice(i, o)),
          i > 0 && (n = `'{snip} ${n}`),
          o < r && (n += " {snip}"),
          n
        );
      }
      function L(t, e) {
        if (!Array.isArray(t)) return "";
        const n = [];
        for (let r = 0; r < t.length; r++) {
          const i = t[r];
          try {
            n.push(String(i));
          } catch (o) {
            n.push("[value cannot be serialized]");
          }
        }
        return n.join(e);
      }
      function Z(t, e, n = !1) {
        return W(t)
          ? M(e)
            ? e.test(t)
            : W(e)
            ? n
              ? t === e
              : t.includes(e)
            : !1
          : !1;
      }
      function we(t, e = [], n = !1) {
        return e.some((r) => Z(t, r, n));
      }
      function Ue(t) {
        return t.replace(/[|\\{}()[\]^$+*?.]/g, "\\$&").replace(/-/g, "\\x2d");
      }
      function O(t, e, n) {
        if (!(e in t)) return;
        const r = t[e],
          i = n(r);
        if (typeof i == "function")
          try {
            ne(i, r);
          } catch (o) {}
        t[e] = i;
      }
      function q(t, e, n) {
        Object.defineProperty(t, e, {
          value: n,
          writable: !0,
          configurable: !0,
        });
      }
      function ne(t, e) {
        const n = e.prototype || {};
        (t.prototype = e.prototype = n), q(t, "__sentry_original__", e);
      }
      function Be(t) {
        return t.__sentry_original__;
      }
      function at(t) {
        return Object.keys(t)
          .map((e) => `${encodeURIComponent(e)}=${encodeURIComponent(t[e])}`)
          .join("&");
      }
      function Fe(t) {
        if (I(t))
          return h({ message: t.message, name: t.name, stack: t.stack }, ze(t));
        if (Q(t)) {
          const e = h(
            {
              type: t.type,
              target: $e(t.target),
              currentTarget: $e(t.currentTarget),
            },
            ze(t)
          );
          return (
            typeof CustomEvent != "undefined" &&
              l(t, CustomEvent) &&
              (e.detail = t.detail),
            e
          );
        } else return t;
      }
      function $e(t) {
        try {
          return _e(t) ? x(t) : Object.prototype.toString.call(t);
        } catch (e) {
          return "<unknown>";
        }
      }
      function ze(t) {
        if (typeof t == "object" && t !== null) {
          const e = {};
          for (const n in t)
            Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n]);
          return e;
        } else return {};
      }
      function je(t, e = 40) {
        const n = Object.keys(Fe(t));
        if ((n.sort(), !n.length)) return "[object has no keys]";
        if (n[0].length >= e) return R(n[0], e);
        for (let r = n.length; r > 0; r--) {
          const i = n.slice(0, r).join(", ");
          if (!(i.length > e)) return r === n.length ? i : R(i, e);
        }
        return "";
      }
      function me(t) {
        return Ze(t, new Map());
      }
      function Ze(t, e) {
        if (G(t)) {
          const n = e.get(t);
          if (n !== void 0) return n;
          const r = {};
          e.set(t, r);
          for (const i of Object.keys(t))
            typeof t[i] != "undefined" && (r[i] = Ze(t[i], e));
          return r;
        }
        if (Array.isArray(t)) {
          const n = e.get(t);
          if (n !== void 0) return n;
          const r = [];
          return (
            e.set(t, r),
            t.forEach((i) => {
              r.push(Ze(i, e));
            }),
            r
          );
        }
        return t;
      }
      function ls(t) {
        let e;
        switch (!0) {
          case t == null:
            e = new String(t);
            break;
          case typeof t == "symbol" || typeof t == "bigint":
            e = Object(t);
            break;
          case isPrimitive(t):
            e = new t.constructor(t);
            break;
          default:
            e = t;
            break;
        }
        return e;
      }
      function ke() {
        const t = m.n2,
          e = t.crypto || t.msCrypto;
        if (e && e.randomUUID) return e.randomUUID().replace(/-/g, "");
        const n =
          e && e.getRandomValues
            ? () => e.getRandomValues(new Uint8Array(1))[0]
            : () => Math.random() * 16;
        return ([1e7] + 1e3 + 4e3 + 8e3 + 1e11).replace(/[018]/g, (r) =>
          (r ^ ((n() & 15) >> (r / 4))).toString(16)
        );
      }
      function It(t) {
        return t.exception && t.exception.values
          ? t.exception.values[0]
          : void 0;
      }
      function ge(t) {
        const { message: e, event_id: n } = t;
        if (e) return e;
        const r = It(t);
        return r
          ? r.type && r.value
            ? `${r.type}: ${r.value}`
            : r.type || r.value || n || "<unknown>"
          : n || "<unknown>";
      }
      function ct(t, e, n) {
        const r = (t.exception = t.exception || {}),
          i = (r.values = r.values || []),
          o = (i[0] = i[0] || {});
        o.value || (o.value = e || ""), o.type || (o.type = n || "Error");
      }
      function Ge(t, e) {
        const n = It(t);
        if (!n) return;
        const r = { type: "generic", handled: !0 },
          i = n.mechanism;
        if (((n.mechanism = h(h(h({}, r), i), e)), e && "data" in e)) {
          const o = h(h({}, i && i.data), e.data);
          n.mechanism.data = o;
        }
      }
      const Un =
        /^(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)(?:-((?:0|[1-9]\d*|\d*[a-zA-Z-][0-9a-zA-Z-]*)(?:\.(?:0|[1-9]\d*|\d*[a-zA-Z-][0-9a-zA-Z-]*))*))?(?:\+([0-9a-zA-Z-]+(?:\.[0-9a-zA-Z-]+)*))?$/;
      function ds(t) {
        const e = t.match(Un) || [],
          n = parseInt(e[1], 10),
          r = parseInt(e[2], 10),
          i = parseInt(e[3], 10);
        return {
          buildmetadata: e[5],
          major: isNaN(n) ? void 0 : n,
          minor: isNaN(r) ? void 0 : r,
          patch: isNaN(i) ? void 0 : i,
          prerelease: e[4],
        };
      }
      function fs(t, e, n = 5) {
        if (e.lineno === void 0) return;
        const r = t.length,
          i = Math.max(Math.min(r, e.lineno - 1), 0);
        (e.pre_context = t
          .slice(Math.max(0, i - n), i)
          .map((o) => snipLine(o, 0))),
          (e.context_line = snipLine(t[Math.min(r - 1, i)], e.colno || 0)),
          (e.post_context = t
            .slice(Math.min(i + 1, r), i + 1 + n)
            .map((o) => snipLine(o, 0)));
      }
      function Ct(t) {
        if (t && t.__sentry_captured__) return !0;
        try {
          q(t, "__sentry_captured__", !0);
        } catch (e) {}
        return !1;
      }
      function Pt(t) {
        return Array.isArray(t) ? t : [t];
      }
      const Bn = [
        /^Script error\.?$/,
        /^Javascript error: Script error\.? on line 0$/,
      ];
      class Te {
        static __initStatic() {
          this.id = "InboundFilters";
        }
        __init() {
          this.name = Te.id;
        }
        constructor(e = {}) {
          (this._options = e), Te.prototype.__init.call(this);
        }
        setupOnce(e, n) {
          const r = (i) => {
            const o = n();
            if (o) {
              const s = o.getIntegration(Te);
              if (s) {
                const c = o.getClient(),
                  a = c ? c.getOptions() : {},
                  d = Fn(s._options, a);
                return $n(i, d) ? null : i;
              }
            }
            return i;
          };
          (r.id = this.name), e(r);
        }
      }
      Te.__initStatic();
      function Fn(t = {}, e = {}) {
        return {
          allowUrls: [...(t.allowUrls || []), ...(e.allowUrls || [])],
          denyUrls: [...(t.denyUrls || []), ...(e.denyUrls || [])],
          ignoreErrors: [
            ...(t.ignoreErrors || []),
            ...(e.ignoreErrors || []),
            ...Bn,
          ],
          ignoreInternal: t.ignoreInternal !== void 0 ? t.ignoreInternal : !0,
        };
      }
      function $n(t, e) {
        return e.ignoreInternal && Hn(t)
          ? ((typeof __SENTRY_DEBUG__ == "undefined" || __SENTRY_DEBUG__) &&
              y.warn(`Event dropped due to being internal Sentry Error.
Event: ${ge(t)}`),
            !0)
          : zn(t, e.ignoreErrors)
          ? ((typeof __SENTRY_DEBUG__ == "undefined" || __SENTRY_DEBUG__) &&
              y.warn(`Event dropped due to being matched by \`ignoreErrors\` option.
Event: ${ge(t)}`),
            !0)
          : jn(t, e.denyUrls)
          ? ((typeof __SENTRY_DEBUG__ == "undefined" || __SENTRY_DEBUG__) &&
              y.warn(`Event dropped due to being matched by \`denyUrls\` option.
Event: ${ge(t)}.
Url: ${Qe(t)}`),
            !0)
          : Gn(t, e.allowUrls)
          ? !1
          : ((typeof __SENTRY_DEBUG__ == "undefined" || __SENTRY_DEBUG__) &&
              y.warn(`Event dropped due to not being matched by \`allowUrls\` option.
Event: ${ge(t)}.
Url: ${Qe(t)}`),
            !0);
      }
      function zn(t, e) {
        return !e || !e.length ? !1 : Yn(t).some((n) => we(n, e));
      }
      function jn(t, e) {
        if (!e || !e.length) return !1;
        const n = Qe(t);
        return n ? we(n, e) : !1;
      }
      function Gn(t, e) {
        if (!e || !e.length) return !0;
        const n = Qe(t);
        return n ? we(n, e) : !0;
      }
      function Yn(t) {
        if (t.message) return [t.message];
        if (t.exception)
          try {
            const { type: e = "", value: n = "" } =
              (t.exception.values && t.exception.values[0]) || {};
            return [`${n}`, `${e}: ${n}`];
          } catch (e) {
            return (
              (typeof __SENTRY_DEBUG__ == "undefined" || __SENTRY_DEBUG__) &&
                y.error(`Cannot extract message for event ${ge(t)}`),
              []
            );
          }
        return [];
      }
      function Hn(t) {
        try {
          return t.exception.values[0].type === "SentryError";
        } catch (e) {}
        return !1;
      }
      function Wn(t = []) {
        for (let e = t.length - 1; e >= 0; e--) {
          const n = t[e];
          if (
            n &&
            n.filename !== "<anonymous>" &&
            n.filename !== "[native code]"
          )
            return n.filename || null;
        }
        return null;
      }
      function Qe(t) {
        try {
          let e;
          try {
            e = t.exception.values[0].stacktrace.frames;
          } catch (n) {}
          return e ? Wn(e) : null;
        } catch (e) {
          return (
            (typeof __SENTRY_DEBUG__ == "undefined" || __SENTRY_DEBUG__) &&
              y.error(`Cannot extract url for event ${ge(t)}`),
            null
          );
        }
      }
      let Mt;
      class Ye {
        constructor() {
          Ye.prototype.__init.call(this);
        }
        static __initStatic() {
          this.id = "FunctionToString";
        }
        __init() {
          this.name = Ye.id;
        }
        setupOnce() {
          (Mt = Function.prototype.toString),
            (Function.prototype.toString = function (...e) {
              const n = Be(this) || this;
              return Mt.apply(n, e);
            });
        }
      }
      Ye.__initStatic();
      var Re = b(6400),
        qn = b(4305),
        oe;
      (function (t) {
        t[(t.PENDING = 0)] = "PENDING";
        const n = 1;
        t[(t.RESOLVED = n)] = "RESOLVED";
        const r = 2;
        t[(t.REJECTED = r)] = "REJECTED";
      })(oe || (oe = {}));
      function ye(t) {
        return new V((e) => {
          e(t);
        });
      }
      function et(t) {
        return new V((e, n) => {
          n(t);
        });
      }
      class V {
        __init() {
          this._state = oe.PENDING;
        }
        __init2() {
          this._handlers = [];
        }
        constructor(e) {
          V.prototype.__init.call(this),
            V.prototype.__init2.call(this),
            V.prototype.__init3.call(this),
            V.prototype.__init4.call(this),
            V.prototype.__init5.call(this),
            V.prototype.__init6.call(this);
          try {
            e(this._resolve, this._reject);
          } catch (n) {
            this._reject(n);
          }
        }
        then(e, n) {
          return new V((r, i) => {
            this._handlers.push([
              !1,
              (o) => {
                if (!e) r(o);
                else
                  try {
                    r(e(o));
                  } catch (s) {
                    i(s);
                  }
              },
              (o) => {
                if (!n) i(o);
                else
                  try {
                    r(n(o));
                  } catch (s) {
                    i(s);
                  }
              },
            ]),
              this._executeHandlers();
          });
        }
        catch(e) {
          return this.then((n) => n, e);
        }
        finally(e) {
          return new V((n, r) => {
            let i, o;
            return this.then(
              (s) => {
                (o = !1), (i = s), e && e();
              },
              (s) => {
                (o = !0), (i = s), e && e();
              }
            ).then(() => {
              if (o) {
                r(i);
                return;
              }
              n(i);
            });
          });
        }
        __init3() {
          this._resolve = (e) => {
            this._setResult(oe.RESOLVED, e);
          };
        }
        __init4() {
          this._reject = (e) => {
            this._setResult(oe.REJECTED, e);
          };
        }
        __init5() {
          this._setResult = (e, n) => {
            if (this._state === oe.PENDING) {
              if (B(n)) {
                n.then(this._resolve, this._reject);
                return;
              }
              (this._state = e), (this._value = n), this._executeHandlers();
            }
          };
        }
        __init6() {
          this._executeHandlers = () => {
            if (this._state === oe.PENDING) return;
            const e = this._handlers.slice();
            (this._handlers = []),
              e.forEach((n) => {
                n[0] ||
                  (this._state === oe.RESOLVED && n[1](this._value),
                  this._state === oe.REJECTED && n[2](this._value),
                  (n[0] = !0));
              });
          };
        }
      }
      function Vn(t) {
        const e = (0, Re.ph)(),
          n = {
            sid: ke(),
            init: !0,
            timestamp: e,
            started: e,
            duration: 0,
            status: "ok",
            errors: 0,
            ignoreDuration: !1,
            toJSON: () => Jn(n),
          };
        return t && Oe(n, t), n;
      }
      function Oe(t, e = {}) {
        if (
          (e.user &&
            (!t.ipAddress &&
              e.user.ip_address &&
              (t.ipAddress = e.user.ip_address),
            !t.did &&
              !e.did &&
              (t.did = e.user.id || e.user.email || e.user.username)),
          (t.timestamp = e.timestamp || (0, Re.ph)()),
          e.ignoreDuration && (t.ignoreDuration = e.ignoreDuration),
          e.sid && (t.sid = e.sid.length === 32 ? e.sid : ke()),
          e.init !== void 0 && (t.init = e.init),
          !t.did && e.did && (t.did = `${e.did}`),
          typeof e.started == "number" && (t.started = e.started),
          t.ignoreDuration)
        )
          t.duration = void 0;
        else if (typeof e.duration == "number") t.duration = e.duration;
        else {
          const n = t.timestamp - t.started;
          t.duration = n >= 0 ? n : 0;
        }
        e.release && (t.release = e.release),
          e.environment && (t.environment = e.environment),
          !t.ipAddress && e.ipAddress && (t.ipAddress = e.ipAddress),
          !t.userAgent && e.userAgent && (t.userAgent = e.userAgent),
          typeof e.errors == "number" && (t.errors = e.errors),
          e.status && (t.status = e.status);
      }
      function Kn(t, e) {
        let n = {};
        e
          ? (n = { status: e })
          : t.status === "ok" && (n = { status: "exited" }),
          Oe(t, n);
      }
      function Jn(t) {
        return me({
          sid: `${t.sid}`,
          init: t.init,
          started: new Date(t.started * 1e3).toISOString(),
          timestamp: new Date(t.timestamp * 1e3).toISOString(),
          status: t.status,
          errors: t.errors,
          did:
            typeof t.did == "number" || typeof t.did == "string"
              ? `${t.did}`
              : void 0,
          duration: t.duration,
          attrs: {
            release: t.release,
            environment: t.environment,
            ip_address: t.ipAddress,
            user_agent: t.userAgent,
          },
        });
      }
      const Xn = 100;
      class ae {
        constructor() {
          (this._notifyingListeners = !1),
            (this._scopeListeners = []),
            (this._eventProcessors = []),
            (this._breadcrumbs = []),
            (this._attachments = []),
            (this._user = {}),
            (this._tags = {}),
            (this._extra = {}),
            (this._contexts = {}),
            (this._sdkProcessingMetadata = {});
        }
        static clone(e) {
          const n = new ae();
          return (
            e &&
              ((n._breadcrumbs = [...e._breadcrumbs]),
              (n._tags = h({}, e._tags)),
              (n._extra = h({}, e._extra)),
              (n._contexts = h({}, e._contexts)),
              (n._user = e._user),
              (n._level = e._level),
              (n._span = e._span),
              (n._session = e._session),
              (n._transactionName = e._transactionName),
              (n._fingerprint = e._fingerprint),
              (n._eventProcessors = [...e._eventProcessors]),
              (n._requestSession = e._requestSession),
              (n._attachments = [...e._attachments]),
              (n._sdkProcessingMetadata = h({}, e._sdkProcessingMetadata))),
            n
          );
        }
        addScopeListener(e) {
          this._scopeListeners.push(e);
        }
        addEventProcessor(e) {
          return this._eventProcessors.push(e), this;
        }
        setUser(e) {
          return (
            (this._user = e || {}),
            this._session && Oe(this._session, { user: e }),
            this._notifyScopeListeners(),
            this
          );
        }
        getUser() {
          return this._user;
        }
        getRequestSession() {
          return this._requestSession;
        }
        setRequestSession(e) {
          return (this._requestSession = e), this;
        }
        setTags(e) {
          return (
            (this._tags = h(h({}, this._tags), e)),
            this._notifyScopeListeners(),
            this
          );
        }
        setTag(e, n) {
          return (
            (this._tags = U(h({}, this._tags), { [e]: n })),
            this._notifyScopeListeners(),
            this
          );
        }
        setExtras(e) {
          return (
            (this._extra = h(h({}, this._extra), e)),
            this._notifyScopeListeners(),
            this
          );
        }
        setExtra(e, n) {
          return (
            (this._extra = U(h({}, this._extra), { [e]: n })),
            this._notifyScopeListeners(),
            this
          );
        }
        setFingerprint(e) {
          return (this._fingerprint = e), this._notifyScopeListeners(), this;
        }
        setLevel(e) {
          return (this._level = e), this._notifyScopeListeners(), this;
        }
        setTransactionName(e) {
          return (
            (this._transactionName = e), this._notifyScopeListeners(), this
          );
        }
        setContext(e, n) {
          return (
            n === null ? delete this._contexts[e] : (this._contexts[e] = n),
            this._notifyScopeListeners(),
            this
          );
        }
        setSpan(e) {
          return (this._span = e), this._notifyScopeListeners(), this;
        }
        getSpan() {
          return this._span;
        }
        getTransaction() {
          const e = this.getSpan();
          return e && e.transaction;
        }
        setSession(e) {
          return (
            e ? (this._session = e) : delete this._session,
            this._notifyScopeListeners(),
            this
          );
        }
        getSession() {
          return this._session;
        }
        update(e) {
          if (!e) return this;
          if (typeof e == "function") {
            const n = e(this);
            return n instanceof ae ? n : this;
          }
          return (
            e instanceof ae
              ? ((this._tags = h(h({}, this._tags), e._tags)),
                (this._extra = h(h({}, this._extra), e._extra)),
                (this._contexts = h(h({}, this._contexts), e._contexts)),
                e._user &&
                  Object.keys(e._user).length &&
                  (this._user = e._user),
                e._level && (this._level = e._level),
                e._fingerprint && (this._fingerprint = e._fingerprint),
                e._requestSession && (this._requestSession = e._requestSession))
              : G(e) &&
                ((e = e),
                (this._tags = h(h({}, this._tags), e.tags)),
                (this._extra = h(h({}, this._extra), e.extra)),
                (this._contexts = h(h({}, this._contexts), e.contexts)),
                e.user && (this._user = e.user),
                e.level && (this._level = e.level),
                e.fingerprint && (this._fingerprint = e.fingerprint),
                e.requestSession && (this._requestSession = e.requestSession)),
            this
          );
        }
        clear() {
          return (
            (this._breadcrumbs = []),
            (this._tags = {}),
            (this._extra = {}),
            (this._user = {}),
            (this._contexts = {}),
            (this._level = void 0),
            (this._transactionName = void 0),
            (this._fingerprint = void 0),
            (this._requestSession = void 0),
            (this._span = void 0),
            (this._session = void 0),
            this._notifyScopeListeners(),
            (this._attachments = []),
            this
          );
        }
        addBreadcrumb(e, n) {
          const r = typeof n == "number" ? n : Xn;
          if (r <= 0) return this;
          const i = h({ timestamp: (0, Re.yW)() }, e);
          return (
            (this._breadcrumbs = [...this._breadcrumbs, i].slice(-r)),
            this._notifyScopeListeners(),
            this
          );
        }
        getLastBreadcrumb() {
          return this._breadcrumbs[this._breadcrumbs.length - 1];
        }
        clearBreadcrumbs() {
          return (this._breadcrumbs = []), this._notifyScopeListeners(), this;
        }
        addAttachment(e) {
          return this._attachments.push(e), this;
        }
        getAttachments() {
          return this._attachments;
        }
        clearAttachments() {
          return (this._attachments = []), this;
        }
        applyToEvent(e, n = {}) {
          if (
            (this._extra &&
              Object.keys(this._extra).length &&
              (e.extra = h(h({}, this._extra), e.extra)),
            this._tags &&
              Object.keys(this._tags).length &&
              (e.tags = h(h({}, this._tags), e.tags)),
            this._user &&
              Object.keys(this._user).length &&
              (e.user = h(h({}, this._user), e.user)),
            this._contexts &&
              Object.keys(this._contexts).length &&
              (e.contexts = h(h({}, this._contexts), e.contexts)),
            this._level && (e.level = this._level),
            this._transactionName && (e.transaction = this._transactionName),
            this._span)
          ) {
            e.contexts = h({ trace: this._span.getTraceContext() }, e.contexts);
            const r = this._span.transaction && this._span.transaction.name;
            r && (e.tags = h({ transaction: r }, e.tags));
          }
          return (
            this._applyFingerprint(e),
            (e.breadcrumbs = [...(e.breadcrumbs || []), ...this._breadcrumbs]),
            (e.breadcrumbs = e.breadcrumbs.length > 0 ? e.breadcrumbs : void 0),
            (e.sdkProcessingMetadata = h(
              h({}, e.sdkProcessingMetadata),
              this._sdkProcessingMetadata
            )),
            this._notifyEventProcessors(
              [...Lt(), ...this._eventProcessors],
              e,
              n
            )
          );
        }
        setSDKProcessingMetadata(e) {
          return (
            (this._sdkProcessingMetadata = h(
              h({}, this._sdkProcessingMetadata),
              e
            )),
            this
          );
        }
        _notifyEventProcessors(e, n, r, i = 0) {
          return new V((o, s) => {
            const c = e[i];
            if (n === null || typeof c != "function") o(n);
            else {
              const a = c(h({}, n), r);
              (typeof __SENTRY_DEBUG__ == "undefined" || __SENTRY_DEBUG__) &&
                c.id &&
                a === null &&
                y.log(`Event processor "${c.id}" dropped event`),
                B(a)
                  ? a
                      .then((d) =>
                        this._notifyEventProcessors(e, d, r, i + 1).then(o)
                      )
                      .then(null, s)
                  : this._notifyEventProcessors(e, a, r, i + 1)
                      .then(o)
                      .then(null, s);
            }
          });
        }
        _notifyScopeListeners() {
          this._notifyingListeners ||
            ((this._notifyingListeners = !0),
            this._scopeListeners.forEach((e) => {
              e(this);
            }),
            (this._notifyingListeners = !1));
        }
        _applyFingerprint(e) {
          (e.fingerprint = e.fingerprint ? Pt(e.fingerprint) : []),
            this._fingerprint &&
              (e.fingerprint = e.fingerprint.concat(this._fingerprint)),
            e.fingerprint && !e.fingerprint.length && delete e.fingerprint;
        }
      }
      function Lt() {
        return (0, m.YO)("globalEventProcessors", () => []);
      }
      function ut(t) {
        Lt().push(t);
      }
      const lt = 4,
        Zn = 100;
      class He {
        __init() {
          this._stack = [{}];
        }
        constructor(e, n = new ae(), r = lt) {
          (this._version = r),
            He.prototype.__init.call(this),
            (this.getStackTop().scope = n),
            e && this.bindClient(e);
        }
        isOlderThan(e) {
          return this._version < e;
        }
        bindClient(e) {
          const n = this.getStackTop();
          (n.client = e), e && e.setupIntegrations && e.setupIntegrations();
        }
        pushScope() {
          const e = ae.clone(this.getScope());
          return (
            this.getStack().push({ client: this.getClient(), scope: e }), e
          );
        }
        popScope() {
          return this.getStack().length <= 1 ? !1 : !!this.getStack().pop();
        }
        withScope(e) {
          const n = this.pushScope();
          try {
            e(n);
          } finally {
            this.popScope();
          }
        }
        getClient() {
          return this.getStackTop().client;
        }
        getScope() {
          return this.getStackTop().scope;
        }
        getStack() {
          return this._stack;
        }
        getStackTop() {
          return this._stack[this._stack.length - 1];
        }
        captureException(e, n) {
          const r = (this._lastEventId = n && n.event_id ? n.event_id : ke()),
            i = new Error("Sentry syntheticException");
          return (
            this._withClient((o, s) => {
              o.captureException(
                e,
                U(h({ originalException: e, syntheticException: i }, n), {
                  event_id: r,
                }),
                s
              );
            }),
            r
          );
        }
        captureMessage(e, n, r) {
          const i = (this._lastEventId = r && r.event_id ? r.event_id : ke()),
            o = new Error(e);
          return (
            this._withClient((s, c) => {
              s.captureMessage(
                e,
                n,
                U(h({ originalException: e, syntheticException: o }, r), {
                  event_id: i,
                }),
                c
              );
            }),
            i
          );
        }
        captureEvent(e, n) {
          const r = n && n.event_id ? n.event_id : ke();
          return (
            e.type || (this._lastEventId = r),
            this._withClient((i, o) => {
              i.captureEvent(e, U(h({}, n), { event_id: r }), o);
            }),
            r
          );
        }
        lastEventId() {
          return this._lastEventId;
        }
        addBreadcrumb(e, n) {
          const { scope: r, client: i } = this.getStackTop();
          if (!r || !i) return;
          const { beforeBreadcrumb: o = null, maxBreadcrumbs: s = Zn } =
            (i.getOptions && i.getOptions()) || {};
          if (s <= 0) return;
          const c = (0, Re.yW)(),
            a = h({ timestamp: c }, e),
            d = o ? D(() => o(a, n)) : a;
          d !== null && r.addBreadcrumb(d, s);
        }
        setUser(e) {
          const n = this.getScope();
          n && n.setUser(e);
        }
        setTags(e) {
          const n = this.getScope();
          n && n.setTags(e);
        }
        setExtras(e) {
          const n = this.getScope();
          n && n.setExtras(e);
        }
        setTag(e, n) {
          const r = this.getScope();
          r && r.setTag(e, n);
        }
        setExtra(e, n) {
          const r = this.getScope();
          r && r.setExtra(e, n);
        }
        setContext(e, n) {
          const r = this.getScope();
          r && r.setContext(e, n);
        }
        configureScope(e) {
          const { scope: n, client: r } = this.getStackTop();
          n && r && e(n);
        }
        run(e) {
          const n = Ut(this);
          try {
            e(this);
          } finally {
            Ut(n);
          }
        }
        getIntegration(e) {
          const n = this.getClient();
          if (!n) return null;
          try {
            return n.getIntegration(e);
          } catch (r) {
            return (
              (typeof __SENTRY_DEBUG__ == "undefined" || __SENTRY_DEBUG__) &&
                y.warn(
                  `Cannot retrieve integration ${e.id} from the current Hub`
                ),
              null
            );
          }
        }
        startTransaction(e, n) {
          return this._callExtensionMethod("startTransaction", e, n);
        }
        traceHeaders() {
          return this._callExtensionMethod("traceHeaders");
        }
        captureSession(e = !1) {
          if (e) return this.endSession();
          this._sendSessionUpdate();
        }
        endSession() {
          const e = this.getStackTop(),
            n = e && e.scope,
            r = n && n.getSession();
          r && Kn(r), this._sendSessionUpdate(), n && n.setSession();
        }
        startSession(e) {
          const { scope: n, client: r } = this.getStackTop(),
            { release: i, environment: o } = (r && r.getOptions()) || {},
            { userAgent: s } = m.n2.navigator || {},
            c = Vn(
              h(
                h(
                  h({ release: i, environment: o }, n && { user: n.getUser() }),
                  s && { userAgent: s }
                ),
                e
              )
            );
          if (n) {
            const a = n.getSession && n.getSession();
            a && a.status === "ok" && Oe(a, { status: "exited" }),
              this.endSession(),
              n.setSession(c);
          }
          return c;
        }
        shouldSendDefaultPii() {
          const e = this.getClient(),
            n = e && e.getOptions();
          return Boolean(n && n.sendDefaultPii);
        }
        _sendSessionUpdate() {
          const { scope: e, client: n } = this.getStackTop();
          if (!e) return;
          const r = e.getSession();
          r && n && n.captureSession && n.captureSession(r);
        }
        _withClient(e) {
          const { scope: n, client: r } = this.getStackTop();
          r && e(r, n);
        }
        _callExtensionMethod(e, ...n) {
          const i = tt().__SENTRY__;
          if (i && i.extensions && typeof i.extensions[e] == "function")
            return i.extensions[e].apply(this, n);
          (typeof __SENTRY_DEBUG__ == "undefined" || __SENTRY_DEBUG__) &&
            y.warn(`Extension method ${e} couldn't be found, doing nothing.`);
        }
      }
      function tt() {
        return (
          (m.n2.__SENTRY__ = m.n2.__SENTRY__ || {
            extensions: {},
            hub: void 0,
          }),
          m.n2
        );
      }
      function Ut(t) {
        const e = tt(),
          n = ce(e);
        return dt(e, t), n;
      }
      function $() {
        const t = tt();
        return (
          (!Bt(t) || ce(t).isOlderThan(lt)) && dt(t, new He()),
          (0, qn.KV)() ? Qn(t) : ce(t)
        );
      }
      function Qn(t) {
        try {
          const e = tt().__SENTRY__,
            n =
              e &&
              e.extensions &&
              e.extensions.domain &&
              e.extensions.domain.active;
          if (!n) return ce(t);
          if (!Bt(n) || ce(n).isOlderThan(lt)) {
            const r = ce(t).getStackTop();
            dt(n, new He(r.client, ae.clone(r.scope)));
          }
          return ce(n);
        } catch (e) {
          return ce(t);
        }
      }
      function Bt(t) {
        return !!(t && t.__SENTRY__ && t.__SENTRY__.hub);
      }
      function ce(t) {
        return (0, m.YO)("hub", () => new He(), t);
      }
      function dt(t, e) {
        if (!t) return !1;
        const n = (t.__SENTRY__ = t.__SENTRY__ || {});
        return (n.hub = e), !0;
      }
      const Ft = [];
      function er(t) {
        const e = {};
        return (
          t.forEach((n) => {
            const { name: r } = n,
              i = e[r];
            (i && !i.isDefaultInstance && n.isDefaultInstance) || (e[r] = n);
          }),
          Object.values(e)
        );
      }
      function tr(t) {
        const e = t.defaultIntegrations || [],
          n = t.integrations;
        e.forEach((s) => {
          s.isDefaultInstance = !0;
        });
        let r;
        Array.isArray(n)
          ? (r = [...e, ...n])
          : typeof n == "function"
          ? (r = Pt(n(e)))
          : (r = e);
        const i = er(r),
          o = i.findIndex((s) => s.name === "Debug");
        if (o !== -1) {
          const [s] = i.splice(o, 1);
          i.push(s);
        }
        return i;
      }
      function nr(t) {
        const e = {};
        return (
          t.forEach((n) => {
            n && $t(n, e);
          }),
          e
        );
      }
      function $t(t, e) {
        (e[t.name] = t),
          Ft.indexOf(t.name) === -1 &&
            (t.setupOnce(ut, $),
            Ft.push(t.name),
            (typeof __SENTRY_DEBUG__ == "undefined" || __SENTRY_DEBUG__) &&
              y.log(`Integration installed: ${t.name}`));
      }
      function rr(t, e) {
        e.debug === !0 &&
          (typeof __SENTRY_DEBUG__ == "undefined" || __SENTRY_DEBUG__
            ? y.enable()
            : console.warn(
                "[Sentry] Cannot initialize SDK with `debug` option using a non-debug bundle."
              ));
        const n = $(),
          r = n.getScope();
        r && r.update(e.initialScope);
        const i = new t(e);
        n.bindClient(i);
      }
      const ir = 50,
        ft = new Map();
      function zt(...t) {
        const e = t.sort((n, r) => n[0] - r[0]).map((n) => n[1]);
        return (n, r = 0) => {
          const i = [];
          for (const o of e) {
            let s = ft.get(o);
            s || ((s = new Map()), ft.set(o, s));
            const c = m.n2._sentryDebugIds;
            c &&
              Object.keys(c).forEach((a) => {
                a.split(
                  `
`
                ).forEach((d) => {
                  const _ = o(d);
                  _ && _.filename && s.set(_.filename, c[a]);
                });
              });
          }
          for (const o of n
            .split(
              `
`
            )
            .slice(r)) {
            if (o.length > 1024) continue;
            const s = o.replace(/\(error: (.*)\)/, "$1");
            for (const c of e) {
              const a = c(s);
              if (a) {
                const d = ft.get(c);
                if (d && a.filename) {
                  const _ = d.get(a.filename);
                  _ && (a.debug_id = _);
                }
                i.push(a);
                break;
              }
            }
          }
          return sr(i);
        };
      }
      function or(t) {
        return Array.isArray(t) ? zt(...t) : t;
      }
      function sr(t) {
        if (!t.length) return [];
        let e = t;
        const n = e[0].function || "",
          r = e[e.length - 1].function || "";
        return (
          (n.indexOf("captureMessage") !== -1 ||
            n.indexOf("captureException") !== -1) &&
            (e = e.slice(1)),
          r.indexOf("sentryWrapped") !== -1 && (e = e.slice(0, -1)),
          e
            .slice(0, ir)
            .map((i) =>
              U(h({}, i), {
                filename: i.filename || e[0].filename,
                function: i.function || "?",
              })
            )
            .reverse()
        );
      }
      const ht = "<anonymous>";
      function ue(t) {
        try {
          return !t || typeof t != "function" ? ht : t.name || ht;
        } catch (e) {
          return ht;
        }
      }
      function ar(t) {
        const e = /^\s*[-]{4,}$/,
          n = /at (?:async )?(?:(.+?)\s+\()?(?:(.+):(\d+):(\d+)?|([^)]+))\)?/;
        return (r) => {
          if (r.match(e)) return { filename: r };
          const i = r.match(n);
          if (!i) return;
          let o, s, c, a, d;
          if (i[1]) {
            c = i[1];
            let P = c.lastIndexOf(".");
            if ((c[P - 1] === "." && P--, P > 0)) {
              (o = c.slice(0, P)), (s = c.slice(P + 1));
              const Le = o.indexOf(".Module");
              Le > 0 && ((c = c.slice(Le + 1)), (o = o.slice(0, Le)));
            }
            a = void 0;
          }
          s && ((a = o), (d = s)),
            s === "<anonymous>" && ((d = void 0), (c = void 0)),
            c === void 0 &&
              ((d = d || "<anonymous>"), (c = a ? `${a}.${d}` : d));
          const _ = i[2] && i[2].startsWith("file://") ? i[2].slice(7) : i[2],
            H =
              !(
                i[5] === "native" ||
                (_ &&
                  !_.startsWith("/") &&
                  !_.startsWith(".") &&
                  _.indexOf(":\\") !== 1)
              ) &&
              _ !== void 0 &&
              !_.includes("node_modules/");
          return {
            filename: _,
            module: t ? t(_) : void 0,
            function: c,
            lineno: parseInt(i[3], 10) || void 0,
            colno: parseInt(i[4], 10) || void 0,
            in_app: H,
          };
        };
      }
      function hs(t) {
        return [90, ar(t)];
      }
      const le = (0, m.Rf)();
      function ps() {
        try {
          return new ErrorEvent(""), !0;
        } catch (t) {
          return !1;
        }
      }
      function _s() {
        try {
          return new DOMError(""), !0;
        } catch (t) {
          return !1;
        }
      }
      function ms() {
        try {
          return new DOMException(""), !0;
        } catch (t) {
          return !1;
        }
      }
      function pt() {
        if (!("fetch" in le)) return !1;
        try {
          return (
            new Headers(),
            new Request("http://www.example.com"),
            new Response(),
            !0
          );
        } catch (t) {
          return !1;
        }
      }
      function _t(t) {
        return (
          t &&
          /^function fetch\(\)\s+\{\s+\[native code\]\s+\}$/.test(t.toString())
        );
      }
      function cr() {
        if (!pt()) return !1;
        if (_t(le.fetch)) return !0;
        let t = !1;
        const e = le.document;
        if (e && typeof e.createElement == "function")
          try {
            const n = e.createElement("iframe");
            (n.hidden = !0),
              e.head.appendChild(n),
              n.contentWindow &&
                n.contentWindow.fetch &&
                (t = _t(n.contentWindow.fetch)),
              e.head.removeChild(n);
          } catch (n) {
            (typeof __SENTRY_DEBUG__ == "undefined" || __SENTRY_DEBUG__) &&
              y.warn(
                "Could not create sandbox iframe for pure fetch check, bailing to window.fetch: ",
                n
              );
          }
        return t;
      }
      function gs() {
        return "ReportingObserver" in le;
      }
      function ys() {
        if (!pt()) return !1;
        try {
          return new Request("_", { referrerPolicy: "origin" }), !0;
        } catch (t) {
          return !1;
        }
      }
      function ur() {
        const t = le.chrome,
          e = t && t.app && t.app.runtime,
          n =
            "history" in le &&
            !!le.history.pushState &&
            !!le.history.replaceState;
        return !e && n;
      }
      const A = (0, m.Rf)(),
        We = {},
        jt = {};
      function lr(t) {
        if (!jt[t])
          switch (((jt[t] = !0), t)) {
            case "console":
              dr();
              break;
            case "dom":
              br();
              break;
            case "xhr":
              _r();
              break;
            case "fetch":
              fr();
              break;
            case "history":
              mr();
              break;
            case "error":
              Sr();
              break;
            case "unhandledrejection":
              vr();
              break;
            default:
              (typeof __SENTRY_DEBUG__ == "undefined" || __SENTRY_DEBUG__) &&
                y.warn("unknown instrumentation type:", t);
              return;
          }
      }
      function de(t, e) {
        (We[t] = We[t] || []), We[t].push(e), lr(t);
      }
      function ee(t, e) {
        if (!(!t || !We[t]))
          for (const n of We[t] || [])
            try {
              n(e);
            } catch (r) {
              (typeof __SENTRY_DEBUG__ == "undefined" || __SENTRY_DEBUG__) &&
                y.error(
                  `Error while triggering instrumentation handler.
Type: ${t}
Name: ${ue(n)}
Error:`,
                  r
                );
            }
      }
      function dr() {
        "console" in A &&
          S.forEach(function (t) {
            t in A.console &&
              O(A.console, t, function (e) {
                return function (...n) {
                  ee("console", { args: n, level: t }),
                    e && e.apply(A.console, n);
                };
              });
          });
      }
      function fr() {
        cr() &&
          O(A, "fetch", function (t) {
            return function (...e) {
              const n = {
                args: e,
                fetchData: { method: hr(e), url: pr(e) },
                startTimestamp: Date.now(),
              };
              return (
                ee("fetch", h({}, n)),
                t.apply(A, e).then(
                  (r) => (
                    ee(
                      "fetch",
                      U(h({}, n), { endTimestamp: Date.now(), response: r })
                    ),
                    r
                  ),
                  (r) => {
                    throw (
                      (ee(
                        "fetch",
                        U(h({}, n), { endTimestamp: Date.now(), error: r })
                      ),
                      r)
                    );
                  }
                )
              );
            };
          });
      }
      function hr(t = []) {
        return "Request" in A && l(t[0], Request) && t[0].method
          ? String(t[0].method).toUpperCase()
          : t[1] && t[1].method
          ? String(t[1].method).toUpperCase()
          : "GET";
      }
      function pr(t = []) {
        return typeof t[0] == "string"
          ? t[0]
          : "Request" in A && l(t[0], Request)
          ? t[0].url
          : String(t[0]);
      }
      function _r() {
        if (!("XMLHttpRequest" in A)) return;
        const t = XMLHttpRequest.prototype;
        O(t, "open", function (e) {
          return function (...n) {
            const r = this,
              i = n[1],
              o = (r.__sentry_xhr__ = {
                method: W(n[0]) ? n[0].toUpperCase() : n[0],
                url: n[1],
              });
            W(i) &&
              o.method === "POST" &&
              i.match(/sentry_key/) &&
              (r.__sentry_own_request__ = !0);
            const s = function () {
              if (r.readyState === 4) {
                try {
                  o.status_code = r.status;
                } catch (c) {}
                ee("xhr", {
                  args: n,
                  endTimestamp: Date.now(),
                  startTimestamp: Date.now(),
                  xhr: r,
                });
              }
            };
            return (
              "onreadystatechange" in r &&
              typeof r.onreadystatechange == "function"
                ? O(r, "onreadystatechange", function (c) {
                    return function (...a) {
                      return s(), c.apply(r, a);
                    };
                  })
                : r.addEventListener("readystatechange", s),
              e.apply(r, n)
            );
          };
        }),
          O(t, "send", function (e) {
            return function (...n) {
              return (
                this.__sentry_xhr__ &&
                  n[0] !== void 0 &&
                  (this.__sentry_xhr__.body = n[0]),
                ee("xhr", { args: n, startTimestamp: Date.now(), xhr: this }),
                e.apply(this, n)
              );
            };
          });
      }
      let nt;
      function mr() {
        if (!ur()) return;
        const t = A.onpopstate;
        A.onpopstate = function (...n) {
          const r = A.location.href,
            i = nt;
          if (((nt = r), ee("history", { from: i, to: r }), t))
            try {
              return t.apply(this, n);
            } catch (o) {}
        };
        function e(n) {
          return function (...r) {
            const i = r.length > 2 ? r[2] : void 0;
            if (i) {
              const o = nt,
                s = String(i);
              (nt = s), ee("history", { from: o, to: s });
            }
            return n.apply(this, r);
          };
        }
        O(A.history, "pushState", e), O(A.history, "replaceState", e);
      }
      const gr = 1e3;
      let rt, it;
      function yr(t, e) {
        if (!t || t.type !== e.type) return !0;
        try {
          if (t.target !== e.target) return !0;
        } catch (n) {}
        return !1;
      }
      function Er(t) {
        if (t.type !== "keypress") return !1;
        try {
          const e = t.target;
          if (!e || !e.tagName) return !0;
          if (
            e.tagName === "INPUT" ||
            e.tagName === "TEXTAREA" ||
            e.isContentEditable
          )
            return !1;
        } catch (e) {}
        return !0;
      }
      function Gt(t, e = !1) {
        return (n) => {
          if (!n || it === n || Er(n)) return;
          const r = n.type === "keypress" ? "input" : n.type;
          rt === void 0
            ? (t({ event: n, name: r, global: e }), (it = n))
            : yr(it, n) && (t({ event: n, name: r, global: e }), (it = n)),
            clearTimeout(rt),
            (rt = A.setTimeout(() => {
              rt = void 0;
            }, gr));
        };
      }
      function br() {
        if (!("document" in A)) return;
        const t = ee.bind(null, "dom"),
          e = Gt(t, !0);
        A.document.addEventListener("click", e, !1),
          A.document.addEventListener("keypress", e, !1),
          ["EventTarget", "Node"].forEach((n) => {
            const r = A[n] && A[n].prototype;
            !r ||
              !r.hasOwnProperty ||
              !r.hasOwnProperty("addEventListener") ||
              (O(r, "addEventListener", function (i) {
                return function (o, s, c) {
                  if (o === "click" || o == "keypress")
                    try {
                      const a = this,
                        d = (a.__sentry_instrumentation_handlers__ =
                          a.__sentry_instrumentation_handlers__ || {}),
                        _ = (d[o] = d[o] || { refCount: 0 });
                      if (!_.handler) {
                        const p = Gt(t);
                        (_.handler = p), i.call(this, o, p, c);
                      }
                      _.refCount++;
                    } catch (a) {}
                  return i.call(this, o, s, c);
                };
              }),
              O(r, "removeEventListener", function (i) {
                return function (o, s, c) {
                  if (o === "click" || o == "keypress")
                    try {
                      const a = this,
                        d = a.__sentry_instrumentation_handlers__ || {},
                        _ = d[o];
                      _ &&
                        (_.refCount--,
                        _.refCount <= 0 &&
                          (i.call(this, o, _.handler, c),
                          (_.handler = void 0),
                          delete d[o]),
                        Object.keys(d).length === 0 &&
                          delete a.__sentry_instrumentation_handlers__);
                    } catch (a) {}
                  return i.call(this, o, s, c);
                };
              }));
          });
      }
      let mt = null;
      function Sr() {
        (mt = A.onerror),
          (A.onerror = function (t, e, n, r, i) {
            return (
              ee("error", { column: r, error: i, line: n, msg: t, url: e }),
              mt ? mt.apply(this, arguments) : !1
            );
          });
      }
      let gt = null;
      function vr() {
        (gt = A.onunhandledrejection),
          (A.onunhandledrejection = function (t) {
            return (
              ee("unhandledrejection", t), gt ? gt.apply(this, arguments) : !0
            );
          });
      }
      class Y extends Error {
        constructor(e, n = "warn") {
          super(e),
            (this.message = e),
            (this.name = new.target.prototype.constructor.name),
            Object.setPrototypeOf(this, new.target.prototype),
            (this.logLevel = n);
        }
      }
      const wr =
        /^(?:(\w+):)\/\/(?:(\w+)(?::(\w+)?)?@)([\w.-]+)(?::(\d+))?\/(.+)/;
      function kr(t) {
        return t === "http" || t === "https";
      }
      function yt(t, e = !1) {
        const {
          host: n,
          path: r,
          pass: i,
          port: o,
          projectId: s,
          protocol: c,
          publicKey: a,
        } = t;
        return `${c}://${a}${e && i ? `:${i}` : ""}@${n}${o ? `:${o}` : ""}/${
          r && `${r}/`
        }${s}`;
      }
      function Tr(t) {
        const e = wr.exec(t);
        if (!e) throw new Y(`Invalid Sentry Dsn: ${t}`);
        const [n, r, i = "", o, s = "", c] = e.slice(1);
        let a = "",
          d = c;
        const _ = d.split("/");
        if (
          (_.length > 1 && ((a = _.slice(0, -1).join("/")), (d = _.pop())), d)
        ) {
          const p = d.match(/^\d+/);
          p && (d = p[0]);
        }
        return Yt({
          host: o,
          pass: i,
          path: a,
          projectId: d,
          port: s,
          protocol: n,
          publicKey: r,
        });
      }
      function Yt(t) {
        return {
          protocol: t.protocol,
          publicKey: t.publicKey || "",
          pass: t.pass || "",
          host: t.host,
          port: t.port || "",
          path: t.path || "",
          projectId: t.projectId,
        };
      }
      function Rr(t) {
        if (!(typeof __SENTRY_DEBUG__ == "undefined" || __SENTRY_DEBUG__))
          return;
        const { port: e, projectId: n, protocol: r } = t;
        if (
          (["protocol", "publicKey", "host", "projectId"].forEach((o) => {
            if (!t[o]) throw new Y(`Invalid Sentry Dsn: ${o} missing`);
          }),
          !n.match(/^\d+$/))
        )
          throw new Y(`Invalid Sentry Dsn: Invalid projectId ${n}`);
        if (!kr(r)) throw new Y(`Invalid Sentry Dsn: Invalid protocol ${r}`);
        if (e && isNaN(parseInt(e, 10)))
          throw new Y(`Invalid Sentry Dsn: Invalid port ${e}`);
        return !0;
      }
      function Or(t) {
        const e = typeof t == "string" ? Tr(t) : Yt(t);
        return Rr(e), e;
      }
      function xr() {
        const t = typeof WeakSet == "function",
          e = t ? new WeakSet() : [];
        function n(i) {
          if (t) return e.has(i) ? !0 : (e.add(i), !1);
          for (let o = 0; o < e.length; o++) if (e[o] === i) return !0;
          return e.push(i), !1;
        }
        function r(i) {
          if (t) e.delete(i);
          else
            for (let o = 0; o < e.length; o++)
              if (e[o] === i) {
                e.splice(o, 1);
                break;
              }
        }
        return [n, r];
      }
      function fe(t, e = 1 / 0, n = 1 / 0) {
        try {
          return Et("", t, e, n);
        } catch (r) {
          return { ERROR: `**non-serializable** (${r})` };
        }
      }
      function Ht(t, e = 3, n = 100 * 1024) {
        const r = fe(t, e);
        return Ir(r) > n ? Ht(t, e - 1, n) : r;
      }
      function Et(t, e, n = 1 / 0, r = 1 / 0, i = xr()) {
        const [o, s] = i;
        if (
          e === null ||
          (["number", "boolean", "string"].includes(typeof e) && !u(e))
        )
          return e;
        const c = Ar(t, e);
        if (!c.startsWith("[object ")) return c;
        if (e.__sentry_skip_normalization__) return e;
        if (n === 0) return c.replace("object ", "");
        if (o(e)) return "[Circular ~]";
        const a = e;
        if (a && typeof a.toJSON == "function")
          try {
            const T = a.toJSON();
            return Et("", T, n - 1, r, i);
          } catch (T) {}
        const d = Array.isArray(e) ? [] : {};
        let _ = 0;
        const p = Fe(e);
        for (const T in p) {
          if (!Object.prototype.hasOwnProperty.call(p, T)) continue;
          if (_ >= r) {
            d[T] = "[MaxProperties ~]";
            break;
          }
          const H = p[T];
          (d[T] = Et(T, H, n - 1, r, i)), _++;
        }
        return s(e), d;
      }
      function Ar(t, e) {
        try {
          return t === "domain" && e && typeof e == "object" && e._events
            ? "[Domain]"
            : t === "domainEmitter"
            ? "[DomainEmitter]"
            : typeof b.g != "undefined" && e === b.g
            ? "[Global]"
            : typeof window != "undefined" && e === window
            ? "[Window]"
            : typeof document != "undefined" && e === document
            ? "[Document]"
            : E(e)
            ? "[SyntheticEvent]"
            : typeof e == "number" && e !== e
            ? "[NaN]"
            : e === void 0
            ? "[undefined]"
            : typeof e == "function"
            ? `[Function: ${ue(e)}]`
            : typeof e == "symbol"
            ? `[${String(e)}]`
            : typeof e == "bigint"
            ? `[BigInt: ${String(e)}]`
            : `[object ${Dr(e)}]`;
        } catch (n) {
          return `**non-serializable** (${n})`;
        }
      }
      function Dr(t) {
        const e = Object.getPrototypeOf(t);
        return e ? e.constructor.name : "null prototype";
      }
      function Nr(t) {
        return ~-encodeURI(t).split(/%..|./).length;
      }
      function Ir(t) {
        return Nr(JSON.stringify(t));
      }
      function ot(t, e = []) {
        return [t, e];
      }
      function Cr(t, e) {
        const [n, r] = t;
        return [n, [...r, e]];
      }
      function Wt(t, e) {
        t[1].forEach((r) => {
          const i = r[0].type;
          e(r, i);
        });
      }
      function bt(t, e) {
        return (e || new TextEncoder()).encode(t);
      }
      function qt(t, e) {
        const [n, r] = t;
        let i = JSON.stringify(n);
        function o(s) {
          typeof i == "string"
            ? (i = typeof s == "string" ? i + s : [bt(i, e), s])
            : i.push(typeof s == "string" ? bt(s, e) : s);
        }
        for (const s of r) {
          const [c, a] = s;
          if (
            (o(`
${JSON.stringify(c)}
`),
            typeof a == "string" || a instanceof Uint8Array)
          )
            o(a);
          else {
            let d;
            try {
              d = JSON.stringify(a);
            } catch (_) {
              d = JSON.stringify(fe(a));
            }
            o(d);
          }
        }
        return typeof i == "string" ? i : Pr(i);
      }
      function Pr(t) {
        const e = t.reduce((i, o) => i + o.length, 0),
          n = new Uint8Array(e);
        let r = 0;
        for (const i of t) n.set(i, r), (r += i.length);
        return n;
      }
      function Es(t, e, n) {
        let r = typeof t == "string" ? e.encode(t) : t;
        function i(a) {
          const d = r.subarray(0, a);
          return (r = r.subarray(a + 1)), d;
        }
        function o() {
          let a = r.indexOf(10);
          return a < 0 && (a = r.length), JSON.parse(n.decode(i(a)));
        }
        const s = o(),
          c = [];
        for (; r.length; ) {
          const a = o(),
            d = typeof a.length == "number" ? a.length : void 0;
          c.push([a, d ? i(d) : o()]);
        }
        return [s, c];
      }
      function Mr(t, e) {
        const n = typeof t.data == "string" ? bt(t.data, e) : t.data;
        return [
          me({
            type: "attachment",
            length: n.length,
            filename: t.filename,
            content_type: t.contentType,
            attachment_type: t.attachmentType,
          }),
          n,
        ];
      }
      const Lr = {
        session: "session",
        sessions: "session",
        attachment: "attachment",
        transaction: "transaction",
        event: "error",
        client_report: "internal",
        user_report: "default",
        profile: "profile",
        replay_event: "replay",
        replay_recording: "replay",
      };
      function Vt(t) {
        return Lr[t];
      }
      function Kt(t) {
        if (!t || !t.sdk) return;
        const { name: e, version: n } = t.sdk;
        return { name: e, version: n };
      }
      function Ur(t, e, n, r) {
        const i =
          t.sdkProcessingMetadata &&
          t.sdkProcessingMetadata.dynamicSamplingContext;
        return h(
          h(
            h(
              { event_id: t.event_id, sent_at: new Date().toISOString() },
              e && { sdk: e }
            ),
            !!n && { dsn: yt(r) }
          ),
          t.type === "transaction" && i && { trace: me(h({}, i)) }
        );
      }
      const Br = "7";
      function Jt(t) {
        const e = t.protocol ? `${t.protocol}:` : "",
          n = t.port ? `:${t.port}` : "";
        return `${e}//${t.host}${n}${t.path ? `/${t.path}` : ""}/api/`;
      }
      function Fr(t) {
        return `${Jt(t)}${t.projectId}/envelope/`;
      }
      function $r(t, e) {
        return at(
          h(
            { sentry_key: t.publicKey, sentry_version: Br },
            e && { sentry_client: `${e.name}/${e.version}` }
          )
        );
      }
      function Xt(t, e = {}) {
        const n = typeof e == "string" ? e : e.tunnel,
          r = typeof e == "string" || !e._metadata ? void 0 : e._metadata.sdk;
        return n || `${Fr(t)}?${$r(t, r)}`;
      }
      function bs(t, e) {
        const n = makeDsn(t),
          r = `${Jt(n)}embed/error-page/`;
        let i = `dsn=${dsnToString(n)}`;
        for (const o in e)
          if (o !== "dsn")
            if (o === "user") {
              const s = e.user;
              if (!s) continue;
              s.name && (i += `&name=${encodeURIComponent(s.name)}`),
                s.email && (i += `&email=${encodeURIComponent(s.email)}`);
            } else i += `&${encodeURIComponent(o)}=${encodeURIComponent(e[o])}`;
        return `${r}?${i}`;
      }
      function zr(t, e) {
        return (
          e &&
            ((t.sdk = t.sdk || {}),
            (t.sdk.name = t.sdk.name || e.name),
            (t.sdk.version = t.sdk.version || e.version),
            (t.sdk.integrations = [
              ...(t.sdk.integrations || []),
              ...(e.integrations || []),
            ]),
            (t.sdk.packages = [
              ...(t.sdk.packages || []),
              ...(e.packages || []),
            ])),
          t
        );
      }
      function jr(t, e, n, r) {
        const i = Kt(n),
          o = h(
            h({ sent_at: new Date().toISOString() }, i && { sdk: i }),
            !!r && { dsn: yt(e) }
          ),
          s =
            "aggregates" in t
              ? [{ type: "sessions" }, t]
              : [{ type: "session" }, t];
        return ot(o, [s]);
      }
      function Gr(t, e, n, r) {
        const i = Kt(n),
          o = t.type && t.type !== "replay_event" ? t.type : "event";
        zr(t, n && n.sdk);
        const s = Ur(t, i, r, e);
        return delete t.sdkProcessingMetadata, ot(s, [[{ type: o }, t]]);
      }
      function Yr(t, e, n, r) {
        const { normalizeDepth: i = 3, normalizeMaxBreadth: o = 1e3 } = t,
          s = U(h({}, e), {
            event_id: e.event_id || n.event_id || ke(),
            timestamp: e.timestamp || (0, Re.yW)(),
          }),
          c = n.integrations || t.integrations.map((_) => _.name);
        Hr(s, t), Wr(s, c);
        let a = r;
        n.captureContext && (a = ae.clone(a).update(n.captureContext));
        let d = ye(s);
        if (a) {
          if (a.getAttachments) {
            const _ = [...(n.attachments || []), ...a.getAttachments()];
            _.length && (n.attachments = _);
          }
          d = a.applyToEvent(s, n);
        }
        return d.then((_) => (typeof i == "number" && i > 0 ? qr(_, i, o) : _));
      }
      function Hr(t, e) {
        const {
          environment: n,
          release: r,
          dist: i,
          maxValueLength: o = 250,
        } = e;
        "environment" in t ||
          (t.environment = "environment" in e ? n : "production"),
          t.release === void 0 && r !== void 0 && (t.release = r),
          t.dist === void 0 && i !== void 0 && (t.dist = i),
          t.message && (t.message = R(t.message, o));
        const s = t.exception && t.exception.values && t.exception.values[0];
        s && s.value && (s.value = R(s.value, o));
        const c = t.request;
        c && c.url && (c.url = R(c.url, o));
      }
      function Wr(t, e) {
        e.length > 0 &&
          ((t.sdk = t.sdk || {}),
          (t.sdk.integrations = [...(t.sdk.integrations || []), ...e]));
      }
      function qr(t, e, n) {
        if (!t) return null;
        const r = h(
          h(
            h(
              h(
                h({}, t),
                t.breadcrumbs && {
                  breadcrumbs: t.breadcrumbs.map((i) =>
                    h(h({}, i), i.data && { data: fe(i.data, e, n) })
                  ),
                }
              ),
              t.user && { user: fe(t.user, e, n) }
            ),
            t.contexts && { contexts: fe(t.contexts, e, n) }
          ),
          t.extra && { extra: fe(t.extra, e, n) }
        );
        return (
          t.contexts &&
            t.contexts.trace &&
            r.contexts &&
            ((r.contexts.trace = t.contexts.trace),
            t.contexts.trace.data &&
              (r.contexts.trace.data = fe(t.contexts.trace.data, e, n))),
          t.spans &&
            (r.spans = t.spans.map(
              (i) => (i.data && (i.data = fe(i.data, e, n)), i)
            )),
          r
        );
      }
      const Zt = "Not capturing exception because it's already been captured.";
      class xe {
        __init() {
          this._integrations = {};
        }
        __init2() {
          this._integrationsInitialized = !1;
        }
        __init3() {
          this._numProcessing = 0;
        }
        __init4() {
          this._outcomes = {};
        }
        constructor(e) {
          if (
            (xe.prototype.__init.call(this),
            xe.prototype.__init2.call(this),
            xe.prototype.__init3.call(this),
            xe.prototype.__init4.call(this),
            (this._options = e),
            e.dsn)
          ) {
            this._dsn = Or(e.dsn);
            const n = Xt(this._dsn, e);
            this._transport = e.transport(
              U(
                h(
                  { recordDroppedEvent: this.recordDroppedEvent.bind(this) },
                  e.transportOptions
                ),
                { url: n }
              )
            );
          } else
            (typeof __SENTRY_DEBUG__ == "undefined" || __SENTRY_DEBUG__) &&
              y.warn("No DSN provided, client will not do anything.");
        }
        captureException(e, n, r) {
          if (Ct(e)) {
            (typeof __SENTRY_DEBUG__ == "undefined" || __SENTRY_DEBUG__) &&
              y.log(Zt);
            return;
          }
          let i = n && n.event_id;
          return (
            this._process(
              this.eventFromException(e, n)
                .then((o) => this._captureEvent(o, n, r))
                .then((o) => {
                  i = o;
                })
            ),
            i
          );
        }
        captureMessage(e, n, r, i) {
          let o = r && r.event_id;
          const s = pe(e)
            ? this.eventFromMessage(String(e), n, r)
            : this.eventFromException(e, r);
          return (
            this._process(
              s
                .then((c) => this._captureEvent(c, r, i))
                .then((c) => {
                  o = c;
                })
            ),
            o
          );
        }
        captureEvent(e, n, r) {
          if (n && n.originalException && Ct(n.originalException)) {
            (typeof __SENTRY_DEBUG__ == "undefined" || __SENTRY_DEBUG__) &&
              y.log(Zt);
            return;
          }
          let i = n && n.event_id;
          return (
            this._process(
              this._captureEvent(e, n, r).then((o) => {
                i = o;
              })
            ),
            i
          );
        }
        captureSession(e) {
          if (!this._isEnabled()) {
            (typeof __SENTRY_DEBUG__ == "undefined" || __SENTRY_DEBUG__) &&
              y.warn("SDK not enabled, will not capture session.");
            return;
          }
          typeof e.release != "string"
            ? (typeof __SENTRY_DEBUG__ == "undefined" || __SENTRY_DEBUG__) &&
              y.warn(
                "Discarded session because of missing or non-string release"
              )
            : (this.sendSession(e), Oe(e, { init: !1 }));
        }
        getDsn() {
          return this._dsn;
        }
        getOptions() {
          return this._options;
        }
        getSdkMetadata() {
          return this._options._metadata;
        }
        getTransport() {
          return this._transport;
        }
        flush(e) {
          const n = this._transport;
          return n
            ? this._isClientDoneProcessing(e).then((r) =>
                n.flush(e).then((i) => r && i)
              )
            : ye(!0);
        }
        close(e) {
          return this.flush(e).then(
            (n) => ((this.getOptions().enabled = !1), n)
          );
        }
        setupIntegrations() {
          this._isEnabled() &&
            !this._integrationsInitialized &&
            ((this._integrations = nr(this._options.integrations)),
            (this._integrationsInitialized = !0));
        }
        getIntegrationById(e) {
          return this._integrations[e];
        }
        getIntegration(e) {
          try {
            return this._integrations[e.id] || null;
          } catch (n) {
            return (
              (typeof __SENTRY_DEBUG__ == "undefined" || __SENTRY_DEBUG__) &&
                y.warn(
                  `Cannot retrieve integration ${e.id} from the current Client`
                ),
              null
            );
          }
        }
        addIntegration(e) {
          $t(e, this._integrations);
        }
        sendEvent(e, n = {}) {
          if (this._dsn) {
            let r = Gr(
              e,
              this._dsn,
              this._options._metadata,
              this._options.tunnel
            );
            for (const i of n.attachments || [])
              r = Cr(
                r,
                Mr(
                  i,
                  this._options.transportOptions &&
                    this._options.transportOptions.textEncoder
                )
              );
            this._sendEnvelope(r);
          }
        }
        sendSession(e) {
          if (this._dsn) {
            const n = jr(
              e,
              this._dsn,
              this._options._metadata,
              this._options.tunnel
            );
            this._sendEnvelope(n);
          }
        }
        recordDroppedEvent(e, n, r) {
          if (this._options.sendClientReports) {
            const i = `${e}:${n}`;
            (typeof __SENTRY_DEBUG__ == "undefined" || __SENTRY_DEBUG__) &&
              y.log(`Adding outcome: "${i}"`),
              (this._outcomes[i] = this._outcomes[i] + 1 || 1);
          }
        }
        _updateSessionFromEvent(e, n) {
          let r = !1,
            i = !1;
          const o = n.exception && n.exception.values;
          if (o) {
            i = !0;
            for (const a of o) {
              const d = a.mechanism;
              if (d && d.handled === !1) {
                r = !0;
                break;
              }
            }
          }
          const s = e.status === "ok";
          ((s && e.errors === 0) || (s && r)) &&
            (Oe(
              e,
              U(h({}, r && { status: "crashed" }), {
                errors: e.errors || Number(i || r),
              })
            ),
            this.captureSession(e));
        }
        _isClientDoneProcessing(e) {
          return new V((n) => {
            let r = 0;
            const i = 1,
              o = setInterval(() => {
                this._numProcessing == 0
                  ? (clearInterval(o), n(!0))
                  : ((r += i), e && r >= e && (clearInterval(o), n(!1)));
              }, i);
          });
        }
        _isEnabled() {
          return this.getOptions().enabled !== !1 && this._dsn !== void 0;
        }
        _prepareEvent(e, n, r) {
          const i = this.getOptions(),
            o = Object.keys(this._integrations);
          return (
            !n.integrations && o.length > 0 && (n.integrations = o),
            Yr(i, e, n, r)
          );
        }
        _captureEvent(e, n = {}, r) {
          return this._processEvent(e, n, r).then(
            (i) => i.event_id,
            (i) => {
              if (typeof __SENTRY_DEBUG__ == "undefined" || __SENTRY_DEBUG__) {
                const o = i;
                o.logLevel === "log" ? y.log(o.message) : y.warn(o);
              }
            }
          );
        }
        _processEvent(e, n, r) {
          const i = this.getOptions(),
            { sampleRate: o } = i;
          if (!this._isEnabled())
            return et(new Y("SDK not enabled, will not capture event.", "log"));
          const s = en(e),
            c = Qt(e),
            a = e.type || "error",
            d = `before send for type \`${a}\``;
          if (c && typeof o == "number" && Math.random() > o)
            return (
              this.recordDroppedEvent("sample_rate", "error", e),
              et(
                new Y(
                  `Discarding event because it's not included in the random sample (sampling rate = ${o})`,
                  "log"
                )
              )
            );
          const _ = a === "replay_event" ? "replay" : a;
          return this._prepareEvent(e, n, r)
            .then((p) => {
              if (p === null)
                throw (
                  (this.recordDroppedEvent("event_processor", _, e),
                  new Y(
                    "An event processor returned `null`, will not send event.",
                    "log"
                  ))
                );
              if (n.data && n.data.__sentry__ === !0) return p;
              const H = Kr(i, p, n);
              return Vr(H, d);
            })
            .then((p) => {
              if (p === null)
                throw (
                  (this.recordDroppedEvent("before_send", _, e),
                  new Y(`${d} returned \`null\`, will not send event.`, "log"))
                );
              const T = r && r.getSession();
              !s && T && this._updateSessionFromEvent(T, p);
              const H = p.transaction_info;
              if (s && H && p.transaction !== e.transaction) {
                const P = "custom";
                p.transaction_info = U(h({}, H), { source: P });
              }
              return this.sendEvent(p, n), p;
            })
            .then(null, (p) => {
              throw p instanceof Y
                ? p
                : (this.captureException(p, {
                    data: { __sentry__: !0 },
                    originalException: p,
                  }),
                  new Y(`Event processing pipeline threw an error, original event will not be sent. Details have been sent as a new event.
Reason: ${p}`));
            });
        }
        _process(e) {
          this._numProcessing++,
            e.then(
              (n) => (this._numProcessing--, n),
              (n) => (this._numProcessing--, n)
            );
        }
        _sendEnvelope(e) {
          this._transport && this._dsn
            ? this._transport.send(e).then(null, (n) => {
                (typeof __SENTRY_DEBUG__ == "undefined" || __SENTRY_DEBUG__) &&
                  y.error("Error while sending event:", n);
              })
            : (typeof __SENTRY_DEBUG__ == "undefined" || __SENTRY_DEBUG__) &&
              y.error("Transport disabled");
        }
        _clearOutcomes() {
          const e = this._outcomes;
          return (
            (this._outcomes = {}),
            Object.keys(e).map((n) => {
              const [r, i] = n.split(":");
              return { reason: r, category: i, quantity: e[n] };
            })
          );
        }
      }
      function Vr(t, e) {
        const n = `${e} must return \`null\` or a valid event.`;
        if (B(t))
          return t.then(
            (r) => {
              if (!G(r) && r !== null) throw new Y(n);
              return r;
            },
            (r) => {
              throw new Y(`${e} rejected with ${r}`);
            }
          );
        if (!G(t) && t !== null) throw new Y(n);
        return t;
      }
      function Kr(t, e, n) {
        const { beforeSend: r, beforeSendTransaction: i } = t;
        return Qt(e) && r ? r(e, n) : en(e) && i ? i(e, n) : e;
      }
      function Qt(t) {
        return t.type === void 0;
      }
      function en(t) {
        return t.type === "transaction";
      }
      const tn = "7.38.0";
      var Jr = b(2661);
      function Xr(t, e, n) {
        const r = [
          { type: "client_report" },
          { timestamp: n || (0, Re.yW)(), discarded_events: t },
        ];
        return ot(e ? { dsn: e } : {}, [r]);
      }
      function nn(t, e) {
        const n = vt(t, e),
          r = { type: e && e.name, value: ti(e) };
        return (
          n.length && (r.stacktrace = { frames: n }),
          r.type === void 0 &&
            r.value === "" &&
            (r.value = "Unrecoverable error caught"),
          r
        );
      }
      function Zr(t, e, n, r) {
        const o = $().getClient(),
          s = o && o.getOptions().normalizeDepth,
          c = {
            exception: {
              values: [
                {
                  type: Q(e)
                    ? e.constructor.name
                    : r
                    ? "UnhandledRejection"
                    : "Error",
                  value: `Non-Error ${
                    r ? "promise rejection" : "exception"
                  } captured with keys: ${je(e)}`,
                },
              ],
            },
            extra: { __serialized__: Ht(e, s) },
          };
        if (n) {
          const a = vt(t, n);
          a.length && (c.exception.values[0].stacktrace = { frames: a });
        }
        return c;
      }
      function St(t, e) {
        return { exception: { values: [nn(t, e)] } };
      }
      function vt(t, e) {
        const n = e.stacktrace || e.stack || "",
          r = ei(e);
        try {
          return t(n, r);
        } catch (i) {}
        return [];
      }
      const Qr = /Minified React error #\d+;/i;
      function ei(t) {
        if (t) {
          if (typeof t.framesToPop == "number") return t.framesToPop;
          if (Qr.test(t.message)) return 1;
        }
        return 0;
      }
      function ti(t) {
        const e = t && t.message;
        return e
          ? e.error && typeof e.error.message == "string"
            ? e.error.message
            : e
          : "No error message";
      }
      function ni(t, e, n, r) {
        const i = (n && n.syntheticException) || void 0,
          o = wt(t, e, i, r);
        return (
          Ge(o),
          (o.level = "error"),
          n && n.event_id && (o.event_id = n.event_id),
          ye(o)
        );
      }
      function ri(t, e, n = "info", r, i) {
        const o = (r && r.syntheticException) || void 0,
          s = kt(t, e, o, i);
        return (
          (s.level = n), r && r.event_id && (s.event_id = r.event_id), ye(s)
        );
      }
      function wt(t, e, n, r, i) {
        let o;
        if (j(e) && e.error) return St(t, e.error);
        if (te(e) || re(e)) {
          const s = e;
          if ("stack" in e) o = St(t, e);
          else {
            const c = s.name || (te(s) ? "DOMError" : "DOMException"),
              a = s.message ? `${c}: ${s.message}` : c;
            (o = kt(t, a, n, r)), ct(o, a);
          }
          return (
            "code" in s &&
              (o.tags = U(h({}, o.tags), { "DOMException.code": `${s.code}` })),
            o
          );
        }
        return I(e)
          ? St(t, e)
          : G(e) || Q(e)
          ? ((o = Zr(t, e, n, i)), Ge(o, { synthetic: !0 }), o)
          : ((o = kt(t, e, n, r)),
            ct(o, `${e}`, void 0),
            Ge(o, { synthetic: !0 }),
            o);
      }
      function kt(t, e, n, r) {
        const i = { message: e };
        if (r && n) {
          const o = vt(t, n);
          o.length &&
            (i.exception = {
              values: [{ value: e, stacktrace: { frames: o } }],
            });
        }
        return i;
      }
      function ii(t, e) {
        return $().captureException(t, { captureContext: e });
      }
      function Ss(t, e) {
        const n = typeof e == "string" ? e : void 0,
          r = typeof e != "string" ? { captureContext: e } : void 0;
        return getCurrentHub().captureMessage(t, n, r);
      }
      function vs(t, e) {
        return getCurrentHub().captureEvent(t, e);
      }
      function ws(t) {
        getCurrentHub().configureScope(t);
      }
      function ks(t) {
        getCurrentHub().addBreadcrumb(t);
      }
      function Ts(t, e) {
        getCurrentHub().setContext(t, e);
      }
      function Rs(t) {
        getCurrentHub().setExtras(t);
      }
      function Os(t, e) {
        getCurrentHub().setExtra(t, e);
      }
      function xs(t) {
        getCurrentHub().setTags(t);
      }
      function As(t, e) {
        getCurrentHub().setTag(t, e);
      }
      function Ds(t) {
        getCurrentHub().setUser(t);
      }
      function oi(t) {
        $().withScope(t);
      }
      function Ns(t, e) {
        return getCurrentHub().startTransaction(h({}, t), e);
      }
      const w = m.n2;
      let Tt = 0;
      function rn() {
        return Tt > 0;
      }
      function si() {
        Tt++,
          setTimeout(() => {
            Tt--;
          });
      }
      function Ae(t, e = {}, n) {
        if (typeof t != "function") return t;
        try {
          const i = t.__sentry_wrapped__;
          if (i) return i;
          if (Be(t)) return t;
        } catch (i) {
          return t;
        }
        const r = function () {
          const i = Array.prototype.slice.call(arguments);
          try {
            n && typeof n == "function" && n.apply(this, arguments);
            const o = i.map((s) => Ae(s, e));
            return t.apply(this, o);
          } catch (o) {
            throw (
              (si(),
              oi((s) => {
                s.addEventProcessor(
                  (c) => (
                    e.mechanism && (ct(c, void 0, void 0), Ge(c, e.mechanism)),
                    (c.extra = U(h({}, c.extra), { arguments: i })),
                    c
                  )
                ),
                  ii(o);
              }),
              o)
            );
          }
        };
        try {
          for (const i in t)
            Object.prototype.hasOwnProperty.call(t, i) && (r[i] = t[i]);
        } catch (i) {}
        ne(r, t), q(t, "__sentry_wrapped__", r);
        try {
          Object.getOwnPropertyDescriptor(r, "name").configurable &&
            Object.defineProperty(r, "name", {
              get() {
                return t.name;
              },
            });
        } catch (i) {}
        return r;
      }
      const ai = ["fatal", "error", "warning", "log", "info", "debug"];
      function Is(t) {
        return on(t);
      }
      function on(t) {
        return t === "warn" ? "warning" : ai.includes(t) ? t : "log";
      }
      function Rt(t) {
        if (!t) return {};
        const e = t.match(
          /^(([^:/?#]+):)?(\/\/([^/?#]*))?([^?#]*)(\?([^#]*))?(#(.*))?$/
        );
        if (!e) return {};
        const n = e[6] || "",
          r = e[8] || "";
        return {
          host: e[4],
          path: e[5],
          protocol: e[2],
          relative: e[5] + n + r,
        };
      }
      function Cs(t) {
        return t.split(/[\?#]/, 1)[0];
      }
      function Ps(t) {
        return t.split(/\\?\//).filter((e) => e.length > 0 && e !== ",").length;
      }
      const st = 1024,
        sn = "Breadcrumbs";
      class qe {
        static __initStatic() {
          this.id = sn;
        }
        __init() {
          this.name = qe.id;
        }
        constructor(e) {
          qe.prototype.__init.call(this),
            (this.options = h(
              {
                console: !0,
                dom: !0,
                fetch: !0,
                history: !0,
                sentry: !0,
                xhr: !0,
              },
              e
            ));
        }
        setupOnce() {
          this.options.console && de("console", ui),
            this.options.dom && de("dom", ci(this.options.dom)),
            this.options.xhr && de("xhr", li),
            this.options.fetch && de("fetch", di),
            this.options.history && de("history", fi);
        }
        addSentryBreadcrumb(e) {
          this.options.sentry &&
            $().addBreadcrumb(
              {
                category: `sentry.${
                  e.type === "transaction" ? "transaction" : "event"
                }`,
                event_id: e.event_id,
                level: e.level,
                message: ge(e),
              },
              { event: e }
            );
        }
      }
      qe.__initStatic();
      function ci(t) {
        function e(n) {
          let r,
            i = typeof t == "object" ? t.serializeAttribute : void 0,
            o =
              typeof t == "object" && typeof t.maxStringLength == "number"
                ? t.maxStringLength
                : void 0;
          o &&
            o > st &&
            ((typeof __SENTRY_DEBUG__ == "undefined" || __SENTRY_DEBUG__) &&
              y.warn(
                `\`dom.maxStringLength\` cannot exceed ${st}, but a value of ${o} was configured. Sentry will use ${st} instead.`
              ),
            (o = st)),
            typeof i == "string" && (i = [i]);
          try {
            r = n.event.target
              ? x(n.event.target, { keyAttrs: i, maxStringLength: o })
              : x(n.event, { keyAttrs: i, maxStringLength: o });
          } catch (s) {
            r = "<unknown>";
          }
          r.length !== 0 &&
            $().addBreadcrumb(
              { category: `ui.${n.name}`, message: r },
              { event: n.event, name: n.name, global: n.global }
            );
        }
        return e;
      }
      function ui(t) {
        for (let n = 0; n < t.args.length; n++)
          if (t.args[n] === "ref=Ref<") {
            t.args[n + 1] = "viewRef";
            break;
          }
        const e = {
          category: "console",
          data: { arguments: t.args, logger: "console" },
          level: on(t.level),
          message: L(t.args, " "),
        };
        if (t.level === "assert")
          if (t.args[0] === !1)
            (e.message = `Assertion failed: ${
              L(t.args.slice(1), " ") || "console.assert"
            }`),
              (e.data.arguments = t.args.slice(1));
          else return;
        $().addBreadcrumb(e, { input: t.args, level: t.level });
      }
      function li(t) {
        if (t.endTimestamp) {
          if (t.xhr.__sentry_own_request__) return;
          const {
            method: e,
            url: n,
            status_code: r,
            body: i,
          } = t.xhr.__sentry_xhr__ || {};
          $().addBreadcrumb(
            {
              category: "xhr",
              data: { method: e, url: n, status_code: r },
              type: "http",
            },
            { xhr: t.xhr, input: i }
          );
          return;
        }
      }
      function di(t) {
        t.endTimestamp &&
          ((t.fetchData.url.match(/sentry_key/) &&
            t.fetchData.method === "POST") ||
            (t.error
              ? $().addBreadcrumb(
                  {
                    category: "fetch",
                    data: t.fetchData,
                    level: "error",
                    type: "http",
                  },
                  { data: t.error, input: t.args }
                )
              : $().addBreadcrumb(
                  {
                    category: "fetch",
                    data: U(h({}, t.fetchData), {
                      status_code: t.response.status,
                    }),
                    type: "http",
                  },
                  { input: t.args, response: t.response }
                )));
      }
      function fi(t) {
        let e = t.from,
          n = t.to;
        const r = Rt(w.location.href);
        let i = Rt(e);
        const o = Rt(n);
        i.path || (i = r),
          r.protocol === o.protocol && r.host === o.host && (n = o.relative),
          r.protocol === i.protocol && r.host === i.host && (e = i.relative),
          $().addBreadcrumb({
            category: "navigation",
            data: { from: e, to: n },
          });
      }
      class hi extends xe {
        constructor(e) {
          const n = w.SENTRY_SDK_SOURCE || (0, Jr.S)();
          (e._metadata = e._metadata || {}),
            (e._metadata.sdk = e._metadata.sdk || {
              name: "sentry.javascript.browser",
              packages: [{ name: `${n}:@sentry/browser`, version: tn }],
              version: tn,
            }),
            super(e),
            e.sendClientReports &&
              w.document &&
              w.document.addEventListener("visibilitychange", () => {
                w.document.visibilityState === "hidden" &&
                  this._flushOutcomes();
              });
        }
        eventFromException(e, n) {
          return ni(
            this._options.stackParser,
            e,
            n,
            this._options.attachStacktrace
          );
        }
        eventFromMessage(e, n = "info", r) {
          return ri(
            this._options.stackParser,
            e,
            n,
            r,
            this._options.attachStacktrace
          );
        }
        sendEvent(e, n) {
          const r = this.getIntegrationById(sn);
          r && r.addSentryBreadcrumb && r.addSentryBreadcrumb(e),
            super.sendEvent(e, n);
        }
        _prepareEvent(e, n, r) {
          return (
            (e.platform = e.platform || "javascript"),
            super._prepareEvent(e, n, r)
          );
        }
        _flushOutcomes() {
          const e = this._clearOutcomes();
          if (e.length === 0) {
            (typeof __SENTRY_DEBUG__ == "undefined" || __SENTRY_DEBUG__) &&
              y.log("No outcomes to send");
            return;
          }
          if (!this._dsn) {
            (typeof __SENTRY_DEBUG__ == "undefined" || __SENTRY_DEBUG__) &&
              y.log("No dsn provided, will not send outcomes");
            return;
          }
          (typeof __SENTRY_DEBUG__ == "undefined" || __SENTRY_DEBUG__) &&
            y.log("Sending outcomes:", e);
          const n = Xt(this._dsn, this._options),
            r = Xr(e, this._options.tunnel && yt(this._dsn));
          try {
            Object.prototype.toString.call(w && w.navigator) ===
              "[object Navigator]" &&
            typeof w.navigator.sendBeacon == "function" &&
            !this._options.transportOptions
              ? w.navigator.sendBeacon.bind(w.navigator)(n, qt(r))
              : this._sendEnvelope(r);
          } catch (i) {
            (typeof __SENTRY_DEBUG__ == "undefined" || __SENTRY_DEBUG__) &&
              y.error(i);
          }
        }
      }
      class he {
        static __initStatic() {
          this.id = "GlobalHandlers";
        }
        __init() {
          this.name = he.id;
        }
        __init2() {
          this._installFunc = { onerror: pi, onunhandledrejection: _i };
        }
        constructor(e) {
          he.prototype.__init.call(this),
            he.prototype.__init2.call(this),
            (this._options = h({ onerror: !0, onunhandledrejection: !0 }, e));
        }
        setupOnce() {
          Error.stackTraceLimit = 50;
          const e = this._options;
          for (const n in e) {
            const r = this._installFunc[n];
            r && e[n] && (yi(n), r(), (this._installFunc[n] = void 0));
          }
        }
      }
      he.__initStatic();
      function pi() {
        de("error", (t) => {
          const [e, n, r] = un();
          if (!e.getIntegration(he)) return;
          const { msg: i, url: o, line: s, column: c, error: a } = t;
          if (rn() || (a && a.__sentry_own_request__)) return;
          const d =
            a === void 0 && W(i)
              ? gi(i, o, s, c)
              : an(wt(n, a || i, void 0, r, !1), o, s, c);
          (d.level = "error"), cn(e, a, d, "onerror");
        });
      }
      function _i() {
        de("unhandledrejection", (t) => {
          const [e, n, r] = un();
          if (!e.getIntegration(he)) return;
          let i = t;
          try {
            "reason" in t
              ? (i = t.reason)
              : "detail" in t && "reason" in t.detail && (i = t.detail.reason);
          } catch (s) {}
          if (rn() || (i && i.__sentry_own_request__)) return !0;
          const o = pe(i) ? mi(i) : wt(n, i, void 0, r, !0);
          (o.level = "error"), cn(e, i, o, "onunhandledrejection");
        });
      }
      function mi(t) {
        return {
          exception: {
            values: [
              {
                type: "UnhandledRejection",
                value: `Non-Error promise rejection captured with value: ${String(
                  t
                )}`,
              },
            ],
          },
        };
      }
      function gi(t, e, n, r) {
        const i =
          /^(?:[Uu]ncaught (?:exception: )?)?(?:((?:Eval|Internal|Range|Reference|Syntax|Type|URI|)Error): )?(.*)$/i;
        let o = j(t) ? t.message : t,
          s = "Error";
        const c = o.match(i);
        return (
          c && ((s = c[1]), (o = c[2])),
          an({ exception: { values: [{ type: s, value: o }] } }, e, n, r)
        );
      }
      function an(t, e, n, r) {
        const i = (t.exception = t.exception || {}),
          o = (i.values = i.values || []),
          s = (o[0] = o[0] || {}),
          c = (s.stacktrace = s.stacktrace || {}),
          a = (c.frames = c.frames || []),
          d = isNaN(parseInt(r, 10)) ? void 0 : r,
          _ = isNaN(parseInt(n, 10)) ? void 0 : n,
          p = W(e) && e.length > 0 ? e : F();
        return (
          a.length === 0 &&
            a.push({
              colno: d,
              filename: p,
              function: "?",
              in_app: !0,
              lineno: _,
            }),
          t
        );
      }
      function yi(t) {
        (typeof __SENTRY_DEBUG__ == "undefined" || __SENTRY_DEBUG__) &&
          y.log(`Global Handler attached: ${t}`);
      }
      function cn(t, e, n, r) {
        Ge(n, { handled: !1, type: r }),
          t.captureEvent(n, { originalException: e });
      }
      function un() {
        const t = $(),
          e = t.getClient(),
          n = (e && e.getOptions()) || {
            stackParser: () => [],
            attachStacktrace: !1,
          };
        return [t, n.stackParser, n.attachStacktrace];
      }
      const Ei = [
        "EventTarget",
        "Window",
        "Node",
        "ApplicationCache",
        "AudioTrackList",
        "ChannelMergerNode",
        "CryptoOperation",
        "EventSource",
        "FileReader",
        "HTMLUnknownElement",
        "IDBDatabase",
        "IDBRequest",
        "IDBTransaction",
        "KeyOperation",
        "MediaController",
        "MessagePort",
        "ModalWindow",
        "Notification",
        "SVGElementInstance",
        "Screen",
        "TextTrack",
        "TextTrackCue",
        "TextTrackList",
        "WebSocket",
        "WebSocketWorker",
        "Worker",
        "XMLHttpRequest",
        "XMLHttpRequestEventTarget",
        "XMLHttpRequestUpload",
      ];
      class Ve {
        static __initStatic() {
          this.id = "TryCatch";
        }
        __init() {
          this.name = Ve.id;
        }
        constructor(e) {
          Ve.prototype.__init.call(this),
            (this._options = h(
              {
                XMLHttpRequest: !0,
                eventTarget: !0,
                requestAnimationFrame: !0,
                setInterval: !0,
                setTimeout: !0,
              },
              e
            ));
        }
        setupOnce() {
          this._options.setTimeout && O(w, "setTimeout", ln),
            this._options.setInterval && O(w, "setInterval", ln),
            this._options.requestAnimationFrame &&
              O(w, "requestAnimationFrame", bi),
            this._options.XMLHttpRequest &&
              "XMLHttpRequest" in w &&
              O(XMLHttpRequest.prototype, "send", Si);
          const e = this._options.eventTarget;
          e && (Array.isArray(e) ? e : Ei).forEach(vi);
        }
      }
      Ve.__initStatic();
      function ln(t) {
        return function (...e) {
          const n = e[0];
          return (
            (e[0] = Ae(n, {
              mechanism: {
                data: { function: ue(t) },
                handled: !0,
                type: "instrument",
              },
            })),
            t.apply(this, e)
          );
        };
      }
      function bi(t) {
        return function (e) {
          return t.apply(this, [
            Ae(e, {
              mechanism: {
                data: { function: "requestAnimationFrame", handler: ue(t) },
                handled: !0,
                type: "instrument",
              },
            }),
          ]);
        };
      }
      function Si(t) {
        return function (...e) {
          const n = this;
          return (
            ["onload", "onerror", "onprogress", "onreadystatechange"].forEach(
              (i) => {
                i in n &&
                  typeof n[i] == "function" &&
                  O(n, i, function (o) {
                    const s = {
                        mechanism: {
                          data: { function: i, handler: ue(o) },
                          handled: !0,
                          type: "instrument",
                        },
                      },
                      c = Be(o);
                    return c && (s.mechanism.data.handler = ue(c)), Ae(o, s);
                  });
              }
            ),
            t.apply(this, e)
          );
        };
      }
      function vi(t) {
        const e = w,
          n = e[t] && e[t].prototype;
        !n ||
          !n.hasOwnProperty ||
          !n.hasOwnProperty("addEventListener") ||
          (O(n, "addEventListener", function (r) {
            return function (i, o, s) {
              try {
                typeof o.handleEvent == "function" &&
                  (o.handleEvent = Ae(o.handleEvent, {
                    mechanism: {
                      data: {
                        function: "handleEvent",
                        handler: ue(o),
                        target: t,
                      },
                      handled: !0,
                      type: "instrument",
                    },
                  }));
              } catch (c) {}
              return r.apply(this, [
                i,
                Ae(o, {
                  mechanism: {
                    data: {
                      function: "addEventListener",
                      handler: ue(o),
                      target: t,
                    },
                    handled: !0,
                    type: "instrument",
                  },
                }),
                s,
              ]);
            };
          }),
          O(n, "removeEventListener", function (r) {
            return function (i, o, s) {
              const c = o;
              try {
                const a = c && c.__sentry_wrapped__;
                a && r.call(this, i, a, s);
              } catch (a) {}
              return r.call(this, i, c, s);
            };
          }));
      }
      const wi = "cause",
        ki = 5;
      class De {
        static __initStatic() {
          this.id = "LinkedErrors";
        }
        __init() {
          this.name = De.id;
        }
        constructor(e = {}) {
          De.prototype.__init.call(this),
            (this._key = e.key || wi),
            (this._limit = e.limit || ki);
        }
        setupOnce() {
          const e = $().getClient();
          e &&
            ut((n, r) => {
              const i = $().getIntegration(De);
              return i
                ? Ti(e.getOptions().stackParser, i._key, i._limit, n, r)
                : n;
            });
        }
      }
      De.__initStatic();
      function Ti(t, e, n, r, i) {
        if (
          !r.exception ||
          !r.exception.values ||
          !i ||
          !l(i.originalException, Error)
        )
          return r;
        const o = dn(t, n, i.originalException, e);
        return (r.exception.values = [...o, ...r.exception.values]), r;
      }
      function dn(t, e, n, r, i = []) {
        if (!l(n[r], Error) || i.length + 1 >= e) return i;
        const o = nn(t, n[r]);
        return dn(t, e, n[r], r, [o, ...i]);
      }
      class Ne {
        constructor() {
          Ne.prototype.__init.call(this);
        }
        static __initStatic() {
          this.id = "HttpContext";
        }
        __init() {
          this.name = Ne.id;
        }
        setupOnce() {
          ut((e) => {
            if ($().getIntegration(Ne)) {
              if (!w.navigator && !w.location && !w.document) return e;
              const n =
                  (e.request && e.request.url) ||
                  (w.location && w.location.href),
                { referrer: r } = w.document || {},
                { userAgent: i } = w.navigator || {},
                o = h(
                  h(h({}, e.request && e.request.headers), r && { Referer: r }),
                  i && { "User-Agent": i }
                ),
                s = U(h(h({}, e.request), n && { url: n }), { headers: o });
              return U(h({}, e), { request: s });
            }
            return e;
          });
        }
      }
      Ne.__initStatic();
      class Ie {
        constructor() {
          Ie.prototype.__init.call(this);
        }
        static __initStatic() {
          this.id = "Dedupe";
        }
        __init() {
          this.name = Ie.id;
        }
        setupOnce(e, n) {
          const r = (i) => {
            if (i.type) return i;
            const o = n().getIntegration(Ie);
            if (o) {
              try {
                if (Ri(i, o._previousEvent))
                  return (
                    (typeof __SENTRY_DEBUG__ == "undefined" ||
                      __SENTRY_DEBUG__) &&
                      y.warn(
                        "Event dropped due to being a duplicate of previously captured event."
                      ),
                    null
                  );
              } catch (s) {
                return (o._previousEvent = i);
              }
              return (o._previousEvent = i);
            }
            return i;
          };
          (r.id = this.name), e(r);
        }
      }
      Ie.__initStatic();
      function Ri(t, e) {
        return e ? !!(Oi(t, e) || xi(t, e)) : !1;
      }
      function Oi(t, e) {
        const n = t.message,
          r = e.message;
        return !(
          (!n && !r) ||
          (n && !r) ||
          (!n && r) ||
          n !== r ||
          !hn(t, e) ||
          !fn(t, e)
        );
      }
      function xi(t, e) {
        const n = pn(e),
          r = pn(t);
        return !(
          !n ||
          !r ||
          n.type !== r.type ||
          n.value !== r.value ||
          !hn(t, e) ||
          !fn(t, e)
        );
      }
      function fn(t, e) {
        let n = _n(t),
          r = _n(e);
        if (!n && !r) return !0;
        if ((n && !r) || (!n && r) || ((n = n), (r = r), r.length !== n.length))
          return !1;
        for (let i = 0; i < r.length; i++) {
          const o = r[i],
            s = n[i];
          if (
            o.filename !== s.filename ||
            o.lineno !== s.lineno ||
            o.colno !== s.colno ||
            o.function !== s.function
          )
            return !1;
        }
        return !0;
      }
      function hn(t, e) {
        let n = t.fingerprint,
          r = e.fingerprint;
        if (!n && !r) return !0;
        if ((n && !r) || (!n && r)) return !1;
        (n = n), (r = r);
        try {
          return n.join("") === r.join("");
        } catch (i) {
          return !1;
        }
      }
      function pn(t) {
        return t.exception && t.exception.values && t.exception.values[0];
      }
      function _n(t) {
        const e = t.exception;
        if (e)
          try {
            return e.values[0].stacktrace.frames;
          } catch (n) {
            return;
          }
      }
      const Ce = "?",
        Ai = 10,
        Di = 20,
        Ni = 30,
        Ii = 40,
        Ci = 50;
      function Ke(t, e, n, r) {
        const i = { filename: t, abs_path: t, function: e, in_app: !0 };
        return n !== void 0 && (i.lineno = n), r !== void 0 && (i.colno = r), i;
      }
      const Pi =
          /^\s*at (?:(.*\).*?|.*?) ?\((?:address at )?)?(?:async )?((?:file|https?|blob|chrome-extension|address|native|eval|webpack|<anonymous>|[-a-z]+:|.*bundle|\/)?.*?)(?::(\d+))?(?::(\d+))?\)?\s*$/i,
        Mi = /\((\S*)(?::(\d+))(?::(\d+))\)/,
        Li = [
          Ni,
          (t) => {
            const e = Pi.exec(t);
            if (e) {
              if (e[2] && e[2].indexOf("eval") === 0) {
                const o = Mi.exec(e[2]);
                o && ((e[2] = o[1]), (e[3] = o[2]), (e[4] = o[3]));
              }
              const [r, i] = mn(e[1] || Ce, e[2]);
              return Ke(i, r, e[3] ? +e[3] : void 0, e[4] ? +e[4] : void 0);
            }
          },
        ],
        Ui =
          /^\s*(.*?)(?:\((.*?)\))?(?:^|@)?((?:file|https?|blob|chrome|webpack|resource|moz-extension|safari-extension|safari-web-extension|capacitor)?:\/.*?|\[native code\]|[^@]*(?:bundle|\d+\.js)|\/[\w\-. /=]+)(?::(\d+))?(?::(\d+))?\s*$/i,
        Bi = /(\S+) line (\d+)(?: > eval line \d+)* > eval/i,
        Fi = [
          Ci,
          (t) => {
            const e = Ui.exec(t);
            if (e) {
              if (e[3] && e[3].indexOf(" > eval") > -1) {
                const o = Bi.exec(e[3]);
                o &&
                  ((e[1] = e[1] || "eval"),
                  (e[3] = o[1]),
                  (e[4] = o[2]),
                  (e[5] = ""));
              }
              let r = e[3],
                i = e[1] || Ce;
              return (
                ([i, r] = mn(i, r)),
                Ke(r, i, e[4] ? +e[4] : void 0, e[5] ? +e[5] : void 0)
              );
            }
          },
        ],
        $i =
          /^\s*at (?:((?:\[object object\])?.+) )?\(?((?:file|ms-appx|https?|webpack|blob):.*?):(\d+)(?::(\d+))?\)?\s*$/i,
        zi = [
          Ii,
          (t) => {
            const e = $i.exec(t);
            return e
              ? Ke(e[2], e[1] || Ce, +e[3], e[4] ? +e[4] : void 0)
              : void 0;
          },
        ],
        ji = / line (\d+).*script (?:in )?(\S+)(?:: in function (\S+))?$/i,
        Fs = [
          Ai,
          (t) => {
            const e = ji.exec(t);
            return e ? Ke(e[2], e[3] || Ce, +e[1]) : void 0;
          },
        ],
        Gi =
          / line (\d+), column (\d+)\s*(?:in (?:<anonymous function: ([^>]+)>|([^)]+))\(.*\))? in (.*):\s*$/i,
        zs = [
          Di,
          (t) => {
            const e = Gi.exec(t);
            return e ? Ke(e[5], e[3] || e[4] || Ce, +e[1], +e[2]) : void 0;
          },
        ],
        Yi = zt(...[Li, Fi, zi]),
        mn = (t, e) => {
          const n = t.indexOf("safari-extension") !== -1,
            r = t.indexOf("safari-web-extension") !== -1;
          return n || r
            ? [
                t.indexOf("@") !== -1 ? t.split("@")[0] : Ce,
                n ? `safari-extension:${e}` : `safari-web-extension:${e}`,
              ]
            : [t, e];
        };
      function Hi(t) {
        const e = [];
        function n() {
          return t === void 0 || e.length < t;
        }
        function r(s) {
          return e.splice(e.indexOf(s), 1)[0];
        }
        function i(s) {
          if (!n())
            return et(
              new Y("Not adding Promise because buffer limit was reached.")
            );
          const c = s();
          return (
            e.indexOf(c) === -1 && e.push(c),
            c.then(() => r(c)).then(null, () => r(c).then(null, () => {})),
            c
          );
        }
        function o(s) {
          return new V((c, a) => {
            let d = e.length;
            if (!d) return c(!0);
            const _ = setTimeout(() => {
              s && s > 0 && c(!1);
            }, s);
            e.forEach((p) => {
              ye(p).then(() => {
                --d || (clearTimeout(_), c(!0));
              }, a);
            });
          });
        }
        return { $: e, add: i, drain: o };
      }
      const Wi = 60 * 1e3;
      function qi(t, e = Date.now()) {
        const n = parseInt(`${t}`, 10);
        if (!isNaN(n)) return n * 1e3;
        const r = Date.parse(`${t}`);
        return isNaN(r) ? Wi : r - e;
      }
      function Vi(t, e) {
        return t[e] || t.all || 0;
      }
      function Ki(t, e, n = Date.now()) {
        return Vi(t, e) > n;
      }
      function Ji(t, { statusCode: e, headers: n }, r = Date.now()) {
        const i = h({}, t),
          o = n && n["x-sentry-rate-limits"],
          s = n && n["retry-after"];
        if (o)
          for (const c of o.trim().split(",")) {
            const [a, d] = c.split(":", 2),
              _ = parseInt(a, 10),
              p = (isNaN(_) ? 60 : _) * 1e3;
            if (!d) i.all = r + p;
            else for (const T of d.split(";")) i[T] = r + p;
          }
        else s ? (i.all = r + qi(s, r)) : e === 429 && (i.all = r + 60 * 1e3);
        return i;
      }
      const Xi = 30;
      function gn(t, e, n = Hi(t.bufferSize || Xi)) {
        let r = {};
        const i = (s) => n.drain(s);
        function o(s) {
          const c = [];
          if (
            (Wt(s, (p, T) => {
              const H = Vt(T);
              if (Ki(r, H)) {
                const P = yn(p, T);
                t.recordDroppedEvent("ratelimit_backoff", H, P);
              } else c.push(p);
            }),
            c.length === 0)
          )
            return ye();
          const a = ot(s[0], c),
            d = (p) => {
              Wt(a, (T, H) => {
                const P = yn(T, H);
                t.recordDroppedEvent(p, Vt(H), P);
              });
            },
            _ = () =>
              e({ body: qt(a, t.textEncoder) }).then(
                (p) => (
                  p.statusCode !== void 0 &&
                    (p.statusCode < 200 || p.statusCode >= 300) &&
                    (typeof __SENTRY_DEBUG__ == "undefined" ||
                      __SENTRY_DEBUG__) &&
                    y.warn(
                      `Sentry responded with status code ${p.statusCode} to sent event.`
                    ),
                  (r = Ji(r, p)),
                  p
                ),
                (p) => {
                  throw (d("network_error"), p);
                }
              );
          return n.add(_).then(
            (p) => p,
            (p) => {
              if (p instanceof Y)
                return (
                  (typeof __SENTRY_DEBUG__ == "undefined" ||
                    __SENTRY_DEBUG__) &&
                    y.error("Skipped sending event because buffer is full."),
                  d("queue_overflow"),
                  ye()
                );
              throw p;
            }
          );
        }
        return { send: o, flush: i };
      }
      function yn(t, e) {
        if (!(e !== "event" && e !== "transaction"))
          return Array.isArray(t) ? t[1] : void 0;
      }
      let Je;
      function Zi() {
        if (Je) return Je;
        if (_t(w.fetch)) return (Je = w.fetch.bind(w));
        const t = w.document;
        let e = w.fetch;
        if (t && typeof t.createElement == "function")
          try {
            const n = t.createElement("iframe");
            (n.hidden = !0), t.head.appendChild(n);
            const r = n.contentWindow;
            r && r.fetch && (e = r.fetch), t.head.removeChild(n);
          } catch (n) {
            (typeof __SENTRY_DEBUG__ == "undefined" || __SENTRY_DEBUG__) &&
              y.warn(
                "Could not create sandbox iframe for pure fetch check, bailing to window.fetch: ",
                n
              );
          }
        return (Je = e.bind(w));
      }
      function Qi() {
        Je = void 0;
      }
      function eo(t, e = Zi()) {
        function n(r) {
          const i = h(
            {
              body: r.body,
              method: "POST",
              referrerPolicy: "origin",
              headers: t.headers,
              keepalive: r.body.length <= 65536,
            },
            t.fetchOptions
          );
          try {
            return e(t.url, i).then((o) => ({
              statusCode: o.status,
              headers: {
                "x-sentry-rate-limits": o.headers.get("X-Sentry-Rate-Limits"),
                "retry-after": o.headers.get("Retry-After"),
              },
            }));
          } catch (o) {
            return Qi(), et(o);
          }
        }
        return gn(t, n);
      }
      const to = 4;
      function no(t) {
        function e(n) {
          return new V((r, i) => {
            const o = new XMLHttpRequest();
            (o.onerror = i),
              (o.onreadystatechange = () => {
                o.readyState === to &&
                  r({
                    statusCode: o.status,
                    headers: {
                      "x-sentry-rate-limits": o.getResponseHeader(
                        "X-Sentry-Rate-Limits"
                      ),
                      "retry-after": o.getResponseHeader("Retry-After"),
                    },
                  });
              }),
              o.open("POST", t.url);
            for (const s in t.headers)
              Object.prototype.hasOwnProperty.call(t.headers, s) &&
                o.setRequestHeader(s, t.headers[s]);
            o.send(n.body);
          });
        }
        return gn(t, e);
      }
      const ro = [
        new Te(),
        new Ye(),
        new Ve(),
        new qe(),
        new he(),
        new De(),
        new Ie(),
        new Ne(),
      ];
      function io(t = {}) {
        t.defaultIntegrations === void 0 && (t.defaultIntegrations = ro),
          t.release === void 0 &&
            (typeof __SENTRY_RELEASE__ == "string" &&
              (t.release = __SENTRY_RELEASE__),
            w.SENTRY_RELEASE &&
              w.SENTRY_RELEASE.id &&
              (t.release = w.SENTRY_RELEASE.id)),
          t.autoSessionTracking === void 0 && (t.autoSessionTracking = !0),
          t.sendClientReports === void 0 && (t.sendClientReports = !0);
        const e = U(h({}, t), {
          stackParser: or(t.stackParser || Yi),
          integrations: tr(t),
          transport: t.transport || (pt() ? eo : no),
        });
        rr(hi, e), t.autoSessionTracking && oo();
      }
      function Gs(t = {}, e = getCurrentHub()) {
        if (!WINDOW.document) {
          (typeof __SENTRY_DEBUG__ == "undefined" || __SENTRY_DEBUG__) &&
            logger.error(
              "Global document not defined in showReportDialog call"
            );
          return;
        }
        const { client: n, scope: r } = e.getStackTop(),
          i = t.dsn || (n && n.getDsn());
        if (!i) {
          (typeof __SENTRY_DEBUG__ == "undefined" || __SENTRY_DEBUG__) &&
            logger.error("DSN not configured for showReportDialog call");
          return;
        }
        r && (t.user = h(h({}, r.getUser()), t.user)),
          t.eventId || (t.eventId = e.lastEventId());
        const o = WINDOW.document.createElement("script");
        (o.async = !0),
          (o.src = getReportDialogEndpoint(i, t)),
          t.onLoad && (o.onload = t.onLoad);
        const s = WINDOW.document.head || WINDOW.document.body;
        s
          ? s.appendChild(o)
          : (typeof __SENTRY_DEBUG__ == "undefined" || __SENTRY_DEBUG__) &&
            logger.error(
              "Not injecting report dialog. No injection point found in HTML"
            );
      }
      function Ys() {
        return getCurrentHub().lastEventId();
      }
      function Hs() {}
      function Ws(t) {
        t();
      }
      function qs(t) {
        const e = getCurrentHub().getClient();
        return e
          ? e.flush(t)
          : ((typeof __SENTRY_DEBUG__ == "undefined" || __SENTRY_DEBUG__) &&
              logger.warn("Cannot flush events. No client defined."),
            resolvedSyncPromise(!1));
      }
      function Vs(t) {
        const e = getCurrentHub().getClient();
        return e
          ? e.close(t)
          : ((typeof __SENTRY_DEBUG__ == "undefined" || __SENTRY_DEBUG__) &&
              logger.warn(
                "Cannot flush events and disable SDK. No client defined."
              ),
            resolvedSyncPromise(!1));
      }
      function Ks(t) {
        return wrap$1(t)();
      }
      function En(t) {
        t.startSession({ ignoreDuration: !0 }), t.captureSession();
      }
      function oo() {
        if (typeof w.document == "undefined") {
          (typeof __SENTRY_DEBUG__ == "undefined" || __SENTRY_DEBUG__) &&
            y.warn(
              "Session tracking in non-browser environment with @sentry/browser is not supported."
            );
          return;
        }
        const t = $();
        t.captureSession &&
          (En(t),
          de("history", ({ from: e, to: n }) => {
            e === void 0 || e === n || En($());
          }));
      }
      const Xe = !1,
        Js = "https://connect-client.clearbit.com/icons",
        Xs =
          "https://s3-us-west-1.amazonaws.com/clearbit-assets/connect-client-icons/logo.svg",
        Zs =
          "https://help.clearbit.com/hc/en-us/categories/4421572620439-Free-Tools",
        Qs =
          "https://chrome.google.com/webstore/detail/bemecidfpcjokfloipcdkenfecjdocac",
        bn = {
          local_development: "http://localhost:3000",
          development: "https://connect.dev.clearbit.com",
          staging: "https://connect.staging.clearbit.com",
          production: "https://connect.clearbit.com",
        },
        ea =
          '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="currentColor"><path fill-rule="evenodd" d="M3.3352346,13.1409137 L3.33523455,13.1409138 C2.91548014,13.5733825 2.92546046,14.2645641 3.35752584,14.684707 C3.78087294,15.0963751 4.45458199,15.0962796 4.87780976,14.6844919 L9.00453522,10.5538595 L13.1373639,14.6904917 L13.1373638,14.6904917 C13.568947,15.1110906 14.2594594,15.1018597 14.6796682,14.6698737 C15.0920236,14.2459591 15.0919517,13.570408 14.6795052,13.1465834 L10.5469491,9.01016937 L14.6955806,4.85777412 L14.6955806,4.85777409 C15.1130468,4.423134 15.0994531,3.73205118 14.6652183,3.31419357 C14.2430237,2.90792372 13.5756331,2.90792372 13.1534407,3.31419361 L9.00453675,7.46620706 L4.86206292,3.31981159 L4.86206295,3.31981162 C4.436122,2.89342832 3.74549844,2.89339123 3.31951335,3.31972975 C2.89352771,3.74606833 2.89349066,4.43733659 3.31943155,4.86371935 L7.46206886,9.01011482 L3.3352346,13.1409137 Z" fill=""></path></svg>',
        Sn = "TOGGLE_CONNECT_EVERYWHERE",
        vn = "OPEN_CONNECT_OPTIONS",
        ta = "cb-connect-open",
        wn = 60 * 60 * 24 * 30,
        na = new Date(2020, 0, 1),
        ra = bn.production,
        ia = ".inboxsdk__composeButton",
        oa = "cv6",
        sa = null,
        aa = null,
        ca = [{ domain: "clearbit.com", name: "Clearbit" }],
        ua = 10,
        so = ["connect", "autocomplete"],
        Pe = "prospect_eu_agreed",
        Ee = "connect_everywhere_agreed",
        kn = [
          "*.google.com",
          "*.bing.com",
          "*.yandex.ru",
          "*.baidu.com",
          "*.duckduckgo.com",
          "*.ask.com",
          "*.stackoverflow.com",
          "*.yelp.com",
          "*.expedia.com",
          "*.tripadvisor.com",
          "*.hotels.com",
          "*.booking.com",
          "*.airbnb.com",
          "*.kayak.com",
          "*.orbitz.com",
          "*.travelocity.com",
          "*.priceline.com",
          "*.trip.com",
          "*.agoda.com",
          "*.travelzoo.com",
          "*.skyscanner.com",
          "*.tripsta.com",
          "*.lastminute.com",
          "*.momondo.com",
          "*.opodo.com",
          "*.trivago.com",
          "*.netflix.com",
          "*.youtube.com",
          "*.hulu.com",
          "*.disneyplus.com",
          "*.hbo.com",
          "*.hbogo.com",
          "*.hbomax.com",
          "*.primevideo.com",
          "*.imdb.com",
          "*.xfinity.com",
          "*.bing.com",
          "*.outlook.com",
          "*.yahoo.com",
          "*.aol.com",
          "*.gmx.com",
          "*.mail.*",
          "*.nytimes.com",
          "*.cnn.com",
          "*.bbc.com",
          "*.foxnews.com",
          "*.wsj.com",
          "*.theguardian.com",
          "*.nbcnews.com",
          "*.bloomberg.com",
          "*.huffpost.com",
          "*.buzzfeed.com",
          "*.vice.com",
          "*.dailymail.*",
          "*.reuters.com",
          "*.apnews.com",
          "*.npr.org",
          "*.nbcnews.com",
          "*.cbsnews.com",
          "*.abcnews.go.com",
          "*.msnbc.com",
          "*.usatoday.com",
          "*.latimes.com",
          "*.washingtonpost.com",
          "*.newsweek.com",
          "*.time.com",
          "*.cnbc.com",
          "*.forbes.com",
          "*.fortune.com",
          "*.businessinsider.com",
          "*.investopedia.com",
          "*.marketwatch.com",
          "*.ebay.com",
          "*.aliexpress.com",
          "*.walmart.com",
          "*.etsy.com",
          "*.taobao.com",
          "*.craigslist.org",
          "*.amazon.com",
          "*.instagram.com",
          "*.tiktok.com",
          "*.facebook.com",
          "*.twitter.com",
          "*.instagram.com",
          "*.whatsapp.com",
          "*.reddit.com",
          "*.pinterest.com",
          "*.quora.com",
          "*.wikipedia.org",
          "*.github.com",
          "*.gitlab.com",
          "*.slack.com",
          "*.zoom.us",
          "*.trello.com",
          "app.*",
          "dashboard.*",
          "cloud.*",
          "portal.*",
          "admin.*",
          "console.*",
          "mail.*",
          "webmail.*",
        ],
        ao = { i8: "3.2.2" },
        la = null,
        co = ["tab", "popup", "background", "options", "unknown"],
        uo = [
          "background",
          "analytics",
          "sentry",
          "account",
          "api",
          "page",
          "gmail",
          "widget",
          "icp",
          "blocklist",
        ],
        lo = () => "connect-v" + ao.i8,
        da = (t) =>
          t.toLowerCase().replace(/(?:^|\s|-)\S/g, (e) => e.toUpperCase()),
        fa = (t) => /\S+@\S+/.test(t),
        ha = (t) => /\S+\.\S+/.test(t),
        pa = (t) => t.split(/@/)[1],
        _a = null,
        ma = (t = "") => {
          try {
            return new URL(t).hostname;
          } catch (e) {
            return t;
          }
        },
        ga = (t) =>
          "?" +
          Object.keys(t)
            .map((e) =>
              [encodeURIComponent(e), encodeURIComponent(t[e])].join("=")
            )
            .join("&"),
        ya = (t) => (t ? (/https?:\/\//.test(t) ? t : `http://${t}`) : ""),
        Ea = (t, e, n) => {
          const r = t === 1 ? e : n;
          return `${fo(t)} ${r}`;
        },
        fo = (t) =>
          Math.abs(Number(t)) >= 1e9
            ? (Math.abs(Number(t)) / 1e9).toFixed(1) + "B"
            : Math.abs(Number(t)) >= 1e6
            ? (Math.abs(Number(t)) / 1e6).toFixed(1) + "M"
            : Math.abs(Number(t)) >= 1e3
            ? Math.floor(Math.abs(Number(t)) / 1e3) + "K"
            : Math.abs(Number(t)),
        ba = (t) => {
          if (typeof t != "string") throw new TypeError("Expected a string");
          return (
            (t = t
              .replace(/[_-]+/g, " ")
              .replace(/\s{2,}/g, " ")
              .trim()),
            t.charAt(0).toUpperCase() + t.slice(1)
          );
        },
        Sa = (t) => new Date(t) >= TOS_LAST_UPDATED;
      function ho(t, e, n) {
        if ((t == null ? void 0 : t.type) !== "inboxsdk__injectPageWorld")
          try {
            if (
              e.id === chrome.runtime.id &&
              co.includes(t.from) &&
              uo.includes(n)
            ) {
              const [i, o] = t.fn.split(".", 2);
              if (i === n && o) return { method: o, payload: t.payload };
            } else
              console.error(
                "invalid sender!",
                e.id,
                chrome.runtime.id,
                JSON.stringify(t),
                n
              );
          } catch (r) {
            console.error(r);
          }
        return { method: !1 };
      }
      function be(t, e) {
        Xe &&
          console.log("[DEBUG] Attaching message listener", t, Object.keys(e)),
          chrome.runtime.onMessage.addListener((n, r, i) => {
            const { method: o, payload: s } = ho(n, r, t);
            if (o)
              if (typeof e[o] != "undefined") {
                Xe && console.log("[DEBUG] Executing method", t, o);
                const c = e[o];
                c(s).then((a) => {
                  i(a);
                });
              } else
                throw new Error(`Method ${o} not found (${JSON.stringify(n)})`);
            return !0;
          });
      }
      function po(t, e, n) {
        return new Promise((r, i) => {
          chrome.tabs.query({ active: !0, currentWindow: !0 }, function (o) {
            o[0].id
              ? chrome.tabs.sendMessage(
                  o[0].id,
                  { from: t, fn: e, payload: n },
                  (s) => r(s)
                )
              : i(new Error("No active tab found"));
          });
        });
      }
      function va(t, e, n) {
        return new Promise((r, i) => {
          chrome.tabs.query({ currentWindow: !0 }, function (o) {
            o.forEach((s) => {
              s.id &&
                chrome.tabs.sendMessage(
                  s.id,
                  { from: t, fn: e, payload: n },
                  (c) => r(c)
                );
            });
          });
        });
      }
      function Tn(t, e, n) {
        return new Promise((r) => {
          chrome.runtime.sendMessage({ from: t, fn: e, payload: n }, (i) =>
            r(i)
          );
        });
      }
      function wa(t, e) {
        return Tn("tab", t, e);
      }
      function ka(t, e) {
        return Tn("options", t, e);
      }
      const Ta = (t) => (t == null ? void 0 : t.error) !== void 0;
      function Ot(t, e, n) {
        return `${
          n && n !== "connect"
            ? `https://${n}.clearbit.com`
            : bn[t || "production"]
        }${e}`;
      }
      const Ra = {
          "1_and_1_hosting": "1&1 Hosting",
          "3d_cart": "3d Cart",
          acquia: "Acquia",
          acquisio: "Acquisio",
          act_on: "Act On",
          action_network: "Action Network",
          active_demand: "Active Demand",
          activecampaign: "Activecampaign",
          add_to_any: "Add To Any",
          adform_advertiser: "Adform Advertiser",
          admeld: "Admeld",
          adobe_business_catalyst: "Adobe Business Catalyst",
          adobe_connect: "Adobe Connect",
          adobe_dynamic_tag_management: "Adobe Dynamic Tag Management",
          adobe_experience_manager: "Adobe Experience Manager",
          adobe_marketing_cloud: "Adobe Marketing Cloud",
          adp: "ADP",
          adroll: "AdRoll",
          adscale: "Adscale",
          aggregate_knowledge: "Aggregate Knowledge",
          airbrake: "Airbrake",
          akamai: "Akamai",
          akamai_dns: "Akamai DNS",
          alexa: "Alexa",
          algolia: "Algolia",
          alteryx: "Alteryx",
          altocloud: "Altocloud",
          amazon_associates: "Amazon Associates",
          amazon_payments: "Amazon Payments",
          amazon_s3: "Amazon S3",
          amazon_ses: "Amazon Simple Email Service",
          amcharts: "amCharts",
          amplitude: "Amplitude",
          android: "Android",
          apache: "Apache",
          apache_apex: "Apache Apex",
          apache_cassandra: "Apache Cassandra",
          apache_hadoop: "Apache Hadoop",
          apache_http_server: "Apache Http Server",
          apache_kafka: "Apache Kafka",
          apache_maven: "Apache Maven",
          apache_nifi: "Apache Nifi",
          apache_spark: "Apache Spark",
          apache_storm: "Apache Storm",
          apache_tomcat: "Apache Tomcat",
          app_nexus: "App Nexus",
          appboy: "Appboy",
          appcues: "Appcues",
          appdynamics: "AppDynamics",
          appier: "Appier",
          applepay: "Applepay",
          appnexus: "Appnexus",
          apteligent: "Apteligent",
          asp_net: "ASP.Net",
          atlassian_confluence: "Atlassian Confluence",
          atlassian_crowd: "Atlassian Crowd",
          atlassian_crucible: "Atlassian Crucible",
          atlassian_fisheye: "Atlassian Fisheye",
          atlassian_jira: "Atlassian Jira",
          attraqt: "Attraqt",
          attribution: "Attribution",
          authorizenet: "Authorizenet",
          autopilot: "Autopilot",
          aweber: "Aweber",
          aws_cloudwatch: "AWS Cloudwatch",
          aws_dynamodb: "AWS Dynamodb",
          aws_ec2: "Amazon Web Services",
          aws_iam: "AWS IAM",
          aws_kinesis: "AWS Kinesis",
          aws_lambda: "AWS Lambda",
          aws_redshift: "AWS Redshift",
          aws_route_53: "Route 53",
          baidu_analytics: "Baidu Analytics",
          bamboohr: "Bamboohr",
          basecamp: "Basecamp",
          bazaarvoice: "Bazaarvoice",
          benchmarkemail: "Benchmarkemail",
          big_cartel: "Big Cartel",
          bigcommerce: "Bigcommerce",
          bing_ads: "Bing Ads",
          bing_advertiser: "Bing Advertiser",
          bing_maps: "Bing Maps",
          bloomreach: "Bloomreach",
          bluehost_hosting: "Bluehost Hosting",
          bluekai: "Bluekai",
          bold_commerce: "Bold Commerce",
          braintree: "Braintree",
          branch: "Branch",
          brightcove: "Image and Video Services",
          bronto: "Bronto",
          bug_herd: "Bug Herd",
          bugsnag: "Bugsnag",
          c3_metrics: "C3 Metrics",
          callrail: "Callrail",
          calq: "Calq",
          campaignmonitor: "Campaignmonitor",
          castle: "Castle",
          centos: "CentOS",
          ceridian: "Ceridian",
          chargify: "Chargify",
          chart_beat: "Chart Beat",
          chartio: "Chartio",
          chatlio: "Chatlio",
          chownow: "Chownow",
          cision: "Cision",
          cj_affiliate: "CJ Affiliate",
          classy: "Classy",
          clearslide: "Clearslide",
          clickfunnels: "ClickFunnels",
          clicktale: "Clicktale",
          clicky: "Clicky",
          cloud_flare: "Cloud Flare",
          cloudera: "Cloudera",
          cloudinary: "Cloudinary",
          cludo: "Cludo",
          commerce_sciences: "Commerce Sciences",
          confluence: "Confluence",
          constant_contact: "Constant Contact",
          contentful: "Contentful",
          contently: "Contently",
          conversio: "Conversio",
          convert_kit: "Convert Kit",
          convertro: "Convertro",
          convio: "Convio",
          couchbase: "Couchbase",
          couchdb: "Couchdb",
          coveo: "Coveo",
          crazy_egg: "Crazy Egg",
          criteo: "Criteo",
          crowdskout: "Crowdskout",
          customer_io: "Customer.io",
          cyberark: "Cyberark",
          cybersource: "Cybersource",
          dailymotion: "Dailymotion",
          datadog: "Datadog",
          db2: "Db2",
          dc_storm: "DC Storm",
          debian: "Debian",
          dell_boomi_atomsphere: "Dell Boomi Atomsphere",
          demandbase: "Demandbase",
          demandware: "Demandware",
          demandware_analytics: "Demandware Analytics",
          digital_ocean: "Digital Ocean",
          disqus: "Disqus",
          django: "Django",
          dns_made_easy: "DNS Made Easy",
          dotmailer: "Dotmailer",
          double_click: "DoubleClick Ads",
          double_click_advertiser: "DoubleClick Advertiser",
          dreamhost_hosting: "DreamHost Hosting",
          drift: "Drift",
          drip: "Drip",
          dropbox: "Dropbox",
          drupal: "Drupal",
          drupal_commerce: "Drupal Commerce",
          dstillery: "Dstillery",
          dwolla: "Dwolla",
          dyn_dns: "Dyn DNS",
          dynamic_yield: "Dynamic Yield",
          dynatrace: "Dynatrace",
          ecwid: "Ecwid",
          elasticemail: "ElasticEmail",
          elevio: "Elevio",
          eloqua: "Eloqua",
          emarsys: "Emarsys",
          ember: "Ember",
          emma: "Emma",
          engagio: "Engagio",
          entrust: "Entrust",
          errorception: "Errorception",
          express: "Express",
          facebook_advertiser: "Facebook Advertiser",
          facebook_beacon: "Facebook Beacon",
          facebook_comments: "Facebook Comments",
          facebook_connect: "Facebook Connect",
          facebook_conversion_tracking: "Facebook Conversion Tracking",
          facebook_like_button: "Facebook Like Button",
          facebook_social_plugins: "Facebook Social Plugins",
          facebook_workplace: "Facebook Workplace",
          factset: "Factset",
          fedora: "Fedora",
          filemaker_pro: "Filemaker Pro",
          flexera_software: "Flexera Software",
          flowplayer: "Flowplayer",
          formstack: "Formstack",
          freebsd: "FreeBSD",
          freshdesk: "Freshdesk",
          fullcontact: "Fullcontact",
          fullstory: "Fullstory",
          fusioncharts: "FusionCharts",
          gauges: "Gauges",
          get_response: "Get Response",
          get_satisfaction: "Get Satisfaction",
          gigya: "Gigya",
          github: "Github",
          gitlab: "Gitlab",
          go_squared: "Go Squared",
          gocardless: "Gocardless",
          godaddy_hosting: "GoDaddy Hosting",
          godaddy_nameserver: "Godaddy Nameserver",
          goldengate: "Goldengate",
          goldmine: "Goldmine",
          google_adsense: "Google Adsense",
          google_adwords: "Google Adwords",
          google_affiliate_network: "Google Affiliate Network",
          google_analytics: "Google Analytics",
          google_apps: "Google Apps",
          google_charts: "Google Charts",
          google_cloud: "Google Cloud",
          google_forms: "Google Forms",
          google_maps: "Google Maps",
          google_places: "Google_places",
          google_remarketing: "Google_remarketing",
          google_search_appliance: "Google Search Appliance",
          google_tag_manager: "Google Tag Manager",
          google_website_optimizer: "Google Website Optimizer",
          google_widgets: "Google Widgets",
          gotomeeting: "Gotomeeting",
          grafana: "Grafana",
          graphiq: "GraphIQ",
          gravity_forms: "Gravity Forms",
          greenhouse: "Greenhouse",
          groupby: "GroupBy",
          hbase: "Hbase",
          heap: "Heap",
          hello_bar: "Hello Bar",
          help_scout: "Help Scout",
          heroku: "Heroku",
          highcharts: "Highcharts",
          hive: "Hive",
          hootsuite: "Hootsuite",
          hotjar: "Hotjar",
          hoverowl: "Hoverowl",
          hp_servers: "HP Servers",
          hubspot: "HubSpot",
          ibm_cognos: "IBM Cognos",
          ibm_infosphere: "IBM Infosphere",
          ibm_infosphere_datastage: "IBM Infosphere Datastage",
          ibm_lotus_domino: "IBM Lotus Domino",
          ibm_lotus_notes: "IBM Lotus Notes",
          ibm_websphere: "IBM Websphere",
          ibm_websphere_commerce: "IBM Websphere Commerce",
          icims: "Icims",
          indicative: "Indicative",
          influitive: "Influitive",
          informatica: "Informatica",
          information_builders: "Information Builders",
          infusionsoft: "Infusionsoft",
          inside_sales: "Inside Sales",
          inspectlet: "Inspectlet",
          instagram: "Instagram",
          instagram_links: "Instagram Links",
          instart_logic: "Instart Logic",
          intense_debate: "Intense Debate",
          intercom: "Intercom",
          interspire: "Interspire",
          invoca: "Invoca",
          ios: "ios",
          iponweb_bidswitch: "Iponweb Bidswitch",
          iterable: "Iterable",
          jabmo: "Jabmo",
          janrain: "Janrain",
          jaspersoft: "Jaspersoft",
          java: "Java",
          jha_payment_solutions: "Jha Payment Solutions",
          jobvite: "Jobvite",
          joomla: "Joomla",
          justuno: "Justuno",
          jw_player: "Jw Player",
          kaltura: "Kaltura",
          kapost: "Kapost",
          keen_io: "Keen IO",
          kiss_metrics: "Kissmetrics",
          klaviyo: "Klaviyo",
          klevu: "Klevu",
          knowtify: "Knowtify",
          kronos: "Kronos",
          lawpay: "Lawpay",
          lead_dyno: "Lead Dyno",
          lever: "Lever",
          lightspeed: "Lightspeed",
          linked_in_advertiser: "LinkedIn Advertiser",
          linkwithin: "Linkwithin",
          linode_hosting: "Linode Hosting",
          litespeed: "Litespeed",
          live_chat: "Live Chat",
          livefyre: "Livefyre",
          liveramp: "Liveramp",
          lkqd: "LKQD",
          localytics: "Localytics",
          logrocket: "Logrocket",
          looker: "Looker",
          lucky_orange: "Lucky Orange",
          mad_kudu: "Mad Kudu",
          madison_logic: "Madison Logic",
          magento: "Magento",
          magento_enterprise: "Magento Enterprise",
          magento_v1: "Magento V1",
          magento_v2: "Magento V2",
          mailchimp: "Mailchimp",
          mailerlite: "Mailer Lite",
          mailgun: "Mailgun",
          mailjet: "Mailjet",
          mandrill: "Mandrill",
          marchex: "Marchex",
          marin: "Marin",
          marketo: "Marketo",
          matomo: "Matomo",
          mavenlink: "Mavenlink",
          maxmind: "Maxmind",
          medallia: "Medallia",
          "media.net": "Media.net",
          mediamath: "Mediamath",
          meltwater: "Meltwater",
          microsoft_azure: "Microsoft Azure",
          microsoft_dynamics: "Microsoft Dynamics",
          microsoft_exchange_online: "Microsoft Exchange Online",
          microsoft_office_365: "Microsoft Office 365",
          microsoft_power_bi: "Microsoft Power BI",
          microsoft_project: "Microsoft Project",
          microsoft_sql_server: "Microsoft Sql Server",
          microsoft_team_foundation_server: "Microsoft Team Foundation Server",
          microsoft_teams: "Microsoft Teams",
          microstrategy: "Microstrategy",
          mindbody: "Mindbody",
          mixpanel: "Mixpanel",
          mode: "Mode",
          mongodb: "Mongodb",
          monstercommerce: "Monstercommerce",
          moonclerk: "MoonClerk",
          mouseflow: "Mouseflow",
          mousestats: "Mousestats",
          mrp: "mrp",
          my_site_auditor: "My Site Auditor",
          mysql: "Mysql",
          namecheap_dns: "Namecheap Dns",
          nation_builder: "NationBuilder",
          ncr_retail: "Ncr Retail",
          neo4j: "Neo4J",
          netsuite: "Netsuite",
          netsuite_crm: "Netsuite CRM",
          netsuite_suitecommerce: "Netsuite Suitecommerce",
          neustar_ad_advisor: "Neustar Ad Advisor",
          new_relic: "New Relic",
          nextable: "Nextable",
          nginx: "Nginx",
          nimsoft: "Nimsoft",
          nopcommerce: "Nopcommerce",
          nosto: "Nosto",
          ns1: "Ns1",
          okta: "Okta",
          olark: "Olark",
          omniconvert: "Omniconvert",
          omniture_adobe_analytics: "Omniture (Adobe Analytics)",
          ooyala: "Ooyala",
          open_table: "Open Table",
          openid: "OpenID",
          openx: "Openx",
          optimizely: "Optimizely",
          optimonk: "Optimonk",
          oracle_application_server: "Oracle Application Server",
          oracle_business_intelligence: "Oracle Business Intelligence",
          oracle_cash_and_treasury_management:
            "Oracle Cash And Treasury Management",
          oracle_commerce_cloud: "Oracle Commerce Cloud",
          oracle_crm: "Oracle CRM",
          oracle_data_integrator: "Oracle Data Integrator",
          oracle_endeca: "Oracle Endeca",
          oracle_essbase: "Oracle Essbase",
          oracle_fusion: "Oracle Fusion",
          oracle_human_resources: "Oracle Human Resources",
          oracle_hyperion: "Oracle Hyperion",
          oracle_peoplesoft: "Oracle Peoplesoft",
          oracle_weblogic: "Oracle Weblogic",
          oscommerce: "Oscommerce",
          outbound: "Outbound",
          outbrain_ads: "Outbrain Ads",
          outlook: "Outlook",
          owneriq: "ownerIQ",
          oxid: "Oxid",
          pagerduty: "Pagerduty",
          panopto: "Panopto",
          pardot: "Pardot",
          paychex: "Paychex",
          paypal: "PayPal",
          payza: "Payza",
          pentaho: "Pentaho",
          peoplesoft_crm: "Peoplesoft CRM",
          peoplesoft_sales: "Peoplesoft Sales",
          percolate: "Percolate",
          perfect_audience: "Perfect Audience",
          periscope_data: "Periscope Data",
          picreel: "Picreel",
          pingdom: "Pingdom",
          pinterest: "Pinterest",
          pipedrive: "Pipedrive",
          pivotal_tracker: "Pivotal Tracker",
          piwik: "Piwik",
          planisware: "Planisware",
          playwire: "Playwire",
          podio: "Podio",
          postgresql: "Postgresql",
          postmark: "Postmark",
          powerreviews: "PowerReviews",
          presta_shop: "Presta Shop",
          privy: "Privy",
          pubmatic: "Pubmatic",
          qbrick: "Qbrick",
          qliktech: "Qliktech",
          qlikview: "Qlikview",
          qualaroo: "Qualaroo",
          qualtrics: "Qualtrics",
          quantcast: "Quantcast",
          qubit: "Qubit",
          quest_foglight: "Quest Foglight",
          quickbooks: "Quickbooks",
          rabbitmq: "Rabbitmq",
          rackspace: "Rackspace",
          rackspace_email: "Rackspace Email",
          raygun: "Raygun",
          recaptcha: "Recaptcha",
          recruiterbox: "Recruiterbox",
          recurly: "Recurly",
          red_hat: "Red Hat",
          resrcit: "ReSRCit",
          resumator: "Resumator",
          retailrocket: "RetailRocket",
          rezdy: "Rezdy",
          rezgo: "Rezgo",
          robly: "Robly",
          rocket_fuel: "Rocket Fuel",
          rollbar: "Rollbar",
          rsa_securid: "RSA SecureID",
          rubicon_project: "Rubicon Project",
          ruby_on_rails: "Ruby On Rails",
          sage_50cloud: "Sage 50Cloud",
          sage_crm: "Sage CRM",
          sage_intacct: "Sage Intacct",
          sage_pay: "Sage Pay",
          sailpoint: "Sailpoint",
          salesforce: "Salesforce",
          salesforce_dmp: "Salesforce Dmp",
          salesloft: "SalesLoft",
          saleslogix: "Saleslogix",
          salesmachine: "Salesmachine",
          salsa: "Salsa",
          sap_business_objects: "SAP Business Objects",
          sap_concur: "SAP Concur",
          sap_crm: "SAP CRM",
          sap_crystal_reports: "SAP Crystal Reports",
          sap_hana: "SAP Hana",
          sap_human_capital_management: "SAP Human Capital Management",
          sap_hybris_marketing: "SAP Hybris Marketing",
          sap_sales_order_management: "SAP Sales Order Management",
          sas_data_integration: "Sas Data Integration",
          sas_enterprise: "SAS Enterprise",
          satismeter: "Satismeter",
          segment: "Segment",
          sendgrid: "Sendgrid",
          sendlane: "Sendlane",
          sentry: "Sentry",
          sessioncam: "Sessioncam",
          sharepoint: "Sharepoint",
          sharp_spring: "Sharp Spring",
          shopify: "Shopify",
          shopify_plus: "Shopify Plus",
          shopware: "Shopware",
          sidecar: "Sidecar",
          silkroad: "Silkroad",
          simplicant: "Simplicant",
          sitecore: "Sitecore",
          siteimprove_analytics: "Siteimprove Analytics",
          sixsense: "6sense",
          sizmek: "Sizmek",
          slack: "Slack",
          smartlook: "Smartlook",
          smartrecruiters: "Smartrecruiters",
          smartsheet: "Smartsheet",
          smileio: "Smile",
          snaplogic: "Snaplogic",
          snowflake: "Snowflake",
          snowplow_analytics: "Snowplow Analytics",
          soasta: "Soasta",
          sociomantic: "Sociomantic",
          socket_io: "Socket.io",
          softlayer_hosting: "Softlayer Hosting",
          speedcurve: "SpeedCurve",
          splunk: "Splunk",
          squarespace: "Squarespace",
          squarespace_online_stores: "Squarespace Online Stores",
          statcounter: "Statcounter",
          steel_house: "SteelHouse",
          stripe: "Stripe",
          success_factors: "Success Factors",
          successfactors: "Successfactors",
          sugarcrm: "SugarCRM",
          sumo: "Sumo",
          survey_monkey: "Survey Monkey",
          swell_rewards: "Swell Rewards",
          swifttype: "Swifttype",
          sybase: "Sybase",
          tableau: "Tableau",
          taboola_ads: "Taboola Ads",
          talend: "Talend",
          taleo: "Taleo",
          talkable: "Talkable",
          tawk: "Tawk",
          tealium: "Tealium",
          teradata: "Teradata",
          terminus: "Terminus",
          thomson_reuters_eikon: "Thomson Reuters Eikon",
          tibco_ems: "Tibco Ems",
          tibco_rendezvous: "Tibco Rendezvous",
          tibco_spotfire: "Tibco Spotfire",
          top_producer: "Top Producer",
          totango: "Totango",
          tout: "Tout",
          toutapp: "Toutapp",
          towerdata: "TowerData",
          track_js: "Track JS",
          trello: "Trello",
          triblio: "Triblio",
          tripleseat: "Tripleseat",
          trustpilot: "Trustpilot",
          turn: "Turn",
          twilio: "Twilio",
          twitter_advertiser: "Twitter Advertiser",
          twitter_badge: "Twitter Badge",
          twitter_button: "Twitter Button",
          typeform: "Typeform",
          typekit_by_adobe: "Typekit",
          uber_cart: "Uber Cart",
          ubuntu: "Ubuntu",
          ultipro: "Ultipro",
          unbounce: "Unbounce",
          unbxd: "Unbxd",
          unix: "Unix",
          uptrends: "Uptrends",
          user_voice: "UserVoice",
          vanco_payment_solutions: "Vanco Payment Solutions",
          vero: "Vero",
          verticalresponse: "Verticalresponse",
          videojs: "Video.js",
          vidyard: "Vidyard",
          vimeo: "Vimeo",
          virtue_mart: "Virtue Mart",
          visual_iq: "Visual IQ",
          visual_website_optimizer: "Visual Website Optimizer",
          vmware_server: "Vmware Server",
          volusion: "Volusion",
          vzaar: "Vzaar",
          webengage: "WebEngage",
          webmethods: "Webmethods",
          weebly: "Weebly",
          weebly_ecommerce: "Weebly Ecommerce",
          windows_server: "Windows Server",
          wistia: "Wistia",
          wix_stores: "Wix Stores",
          wixstores: "Wixstores",
          woo_commerce: "Woo Commerce",
          woopra: "Woopra",
          wootric: "Wootric",
          wordpress: "Wordpress",
          workable: "Workable",
          workamajig: "Workamajig",
          workday: "Workday",
          wp_engine: "Wp Engine",
          wrike: "Wrike",
          wufoo: "Wufoo",
          xt_commerce: "xt:Commerce",
          yahoo_stores: "Yahoo Stores",
          yandex_metrica: "Yandex Metrica",
          yelp_seatme: "Yelp Seatme",
          yesware: "Yesware",
          yext: "Yext",
          yieldify: "Yieldify",
          yotpo: "Yotpo",
          youtube: "Youtube",
          zaius: "Zaius",
          zedo: "Zedo",
          zeit_now: "Zeit Now",
          zen_cart: "Zen Cart",
          zendesk: "Zendesk",
          zeniq: "ZenIQ",
          zenreach: "Zenreach",
          zoho_crm: "Zoho CRM",
          zopim: "Zopim",
          zuora: "Zuora",
          zype: "Zype",
        },
        Oa = {
          account_based_marketing: "Account Based Marketing",
          accounting_and_finance: "Accounting And Finance",
          advertising: "Advertising",
          analytics: "Analytics",
          applicant_tracking_system: "Applicant Tracking System",
          authentication_services: "Authentication Services",
          bookings_reservations: "Bookings and Reservations",
          business_management: "Business Management",
          cloud_computing_services: "Cloud Computing Services",
          content_management_system: "Content Management System",
          conversion_optimization: "Conversion Optimization",
          crm: "CRM",
          customer_data_platform: "Customer Data Platform",
          customer_support: "Customer Support",
          data_enrichment_services: "Data Enrichment Services",
          data_management: "Data Management",
          data_processing: "Data Processing",
          data_visualization: "Data Visualization",
          database: "Database",
          dns: "DNS",
          ecommerce: "eCommerce",
          email_delivery_service: "Email Delivery Service",
          email_hosting_service: "Email Hosting Service",
          form_builder: "Form Builder",
          geolocation: "Geolocation",
          human_capital_management: "Human Capital Management",
          image_video_services: "Image and Video Services",
          live_chat: "Live Chat",
          marketing_automation: "Marketing Automation",
          monitoring: "Monitoring",
          operating_system: "Operating System",
          payment: "Payment",
          productivity: "Productivity",
          programming_framework: "Programming Framework",
          project_management_software: "Project Management Software",
          sales_productivity: "Sales Productivity",
          security: "Security",
          site_search: "Site Search",
          social_sharing: "Social Sharing",
          survey: "Survey",
          tag_management: "Tag Management",
          user_engagement: "User Engagement",
          web_hosting: "Web Hosting",
          web_servers: "Web Servers",
          website_optimization: "Website Optimization",
        };
      try {
        io({
          release: lo(),
          dsn: "https://ae2e2221d19a47ca8ff0ba8e3d96e5ff@sentry.io/127023",
          tracesSampleRate: 0.25,
          attachStacktrace: !0,
        });
      } catch (t) {
        console.error(t);
      }
      var xa = b(5161);
      const Aa = (t) => {
          const e = { active: !0, lastFocusedWindow: !0 };
          chrome.tabs &&
            chrome.tabs.query(e, (n) => {
              t(n[0].url);
            });
        },
        Da = (t) => {
          const e = { active: !0, lastFocusedWindow: !0 };
          chrome.tabs &&
            chrome.tabs.query(e, (n) => {
              t(n[0].id);
            });
        },
        _o = (t, e) => {
          const { menuItemId: n } = t;
          if (n === vn) chrome.runtime.openOptionsPage();
          else if (n === Sn) {
            const r = (e == null ? void 0 : e.url) || "";
            chrome.tabs.create({
              url: `chrome-extension://${
                chrome.runtime.id
              }/options.html?toggle=true&url=${
                r.startsWith("http://") || r.startsWith("https://") ? r : ""
              }`,
            });
          }
        },
        mo = (t = !1) => {
          (t ? chrome.contextMenus.removeAll : (n) => n())(() => {
            chrome.contextMenus.create({
              title: "Show / Hide Connect Browser Widget",
              contexts: ["all"],
              id: Sn,
            }),
              chrome.contextMenus.create({
                title: "Open Connect Options",
                contexts: ["page", "frame", "image", "link"],
                id: vn,
              });
          });
        },
        go = "PDju4PVw0LdtAYvu8dnmhnxUydWZdV06";
      function yo(t) {
        return [
          {
            id: 1,
            priority: 1,
            action: {
              type: chrome.declarativeNetRequest.RuleActionType.MODIFY_HEADERS,
              requestHeaders: [
                {
                  operation: chrome.declarativeNetRequest.HeaderOperation.SET,
                  header: "x-connect-extension",
                  value: `${go}:${t}`,
                },
              ],
            },
            condition: {
              requestDomains: [
                "dashboard.clearbit.com",
                "grow.clearbit.com",
                "clearbit.com",
              ],
              resourceTypes: [
                chrome.declarativeNetRequest.ResourceType.MAIN_FRAME,
                chrome.declarativeNetRequest.ResourceType.SUB_FRAME,
                chrome.declarativeNetRequest.ResourceType.SCRIPT,
                chrome.declarativeNetRequest.ResourceType.XMLHTTPREQUEST,
              ],
            },
          },
        ];
      }
      const Eo = yo;
      chrome.runtime.onStartup.addListener(() => {
        chrome.runtime.setUninstallURL(
          `https://connect.clearbit.com/uninstall?version=v3&extension_version=${
            chrome.runtime.getManifest().version
          }`
        );
      }),
        chrome.runtime.onInstalled.addListener((t) => {
          t.reason === "install" &&
            (chrome.storage.local.set({ blocklist: kn }),
            chrome.tabs.create({
              url: `chrome-extension://${chrome.runtime.id}/options.html?authorise=true`,
            })),
            chrome.storage.local.get("clientID", function ({ clientID: e }) {
              let n = e;
              e || ((n = So()), chrome.storage.local.set({ clientID: n })),
                bo(n);
            }),
            mo(!0);
        });
      function bo(t) {
        const e = Eo(t);
        chrome.declarativeNetRequest.updateDynamicRules({
          removeRuleIds: Array(1e3)
            .fill("")
            .map((n, r) => r),
          addRules: e,
        });
      }
      function So() {
        let t = new Date().getTime(),
          e = (performance && performance.now && performance.now() * 1e3) || 0;
        return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (n) => {
          let r = Math.random() * 16;
          return (
            t > 0
              ? ((r = (t + r) % 16 | 0), (t = Math.floor(t / 16)))
              : ((r = (e + r) % 16 | 0), (e = Math.floor(e / 16))),
            (n === "x" ? r : (r & 7) | 8).toString(16)
          );
        });
      }
      var vo = b(3666),
        wo = b.n(vo);
      function ko(t) {
        try {
          if (!t) return "";
          const e = Object.values(t).length > 1;
          let n = e ? "and:(" : "";
          return (
            (n += Se("country", t.countries)),
            (n += Se("type", t.type)),
            (n += Se("tech", t.technologies)),
            (n += Se("industry", t.industries)),
            (n += Se("employees", t.sizes)),
            (n += Se("raised", t.raised)),
            (n += Se("tag", t.businessModels)),
            t.description &&
              t.description.length > 0 &&
              (n += `description:'${t.description}'`),
            (n = n.trim()),
            e && (n += ")"),
            n === "and:()" && (n = ""),
            n
          );
        } catch (e) {
          return console.error(e), "";
        }
      }
      function Se(t, e, n) {
        if (e === void 0 || !e.length) return "";
        let r = "";
        return n
          ? ((r += e.map((i) => `${t}:${xt(i.id)}`).join(" ")), (r += " "), r)
          : e.length === 1
          ? ((r += `${t}:${xt(e[0].id)} `), r)
          : ((r += "or:("),
            (r += e.map((i) => `${t}:${xt(i.id)}`).join(" ")),
            (r += ") "),
            r);
      }
      function xt(t) {
        return t.includes(" ") ? `"${t}"` : t;
      }
      const To = ko;
      var se = (t, e, n) =>
        new Promise((r, i) => {
          var o = (a) => {
              try {
                c(n.next(a));
              } catch (d) {
                i(d);
              }
            },
            s = (a) => {
              try {
                c(n.throw(a));
              } catch (d) {
                i(d);
              }
            },
            c = (a) =>
              a.done ? r(a.value) : Promise.resolve(a.value).then(o, s);
          c((n = n.apply(t, e)).next());
        });
      const Me = new (wo())({ max: 100, ttl: 1e3 * 3600 * 24 });
      function Ro(t) {
        return new Promise((e, n) => {
          const { env: r, url: i, options: o, subdomain: s } = t;
          if (s && !so.includes(s))
            return n(new Error(`Invalid subdomain: ${s}`));
          const c = Ot(r, i, s);
          Xe && console.log("[DEBUG]", `Calling ${c} with options:`, o),
            chrome.storage.local.get([Pe], function (a) {
              a[Pe] && (o.prospect_eu = !0),
                fetch(c, o)
                  .then((d) => d.text())
                  .then((d) => {
                    var _;
                    let p = {};
                    try {
                      p = JSON.parse(d);
                    } catch (T) {}
                    return (
                      ((_ = p == null ? void 0 : p.error) == null
                        ? void 0
                        : _.type) === "auth_fail" &&
                        chrome.storage.local.remove(["account"]),
                      e(p)
                    );
                  })
                  .catch((d) => (console.error(d), n(d)));
            });
        });
      }
      function Oo(t) {
        return new Promise((e) => {
          var n;
          const { url: r } = t;
          let i = "";
          try {
            i =
              (n = new URL(r).host) == null ? void 0 : n.replace(/^www\./, "");
          } catch (o) {}
          if (!i || ["mail.google.com"].includes(i)) return e(!0);
          chrome.storage.local.get(["blocklist"], function (o) {
            try {
              if (chrome.runtime.lastError) return e(!1);
              const { blocklist: s } = o;
              if (!s) return e(!1);
              const c = s.some((a) => {
                if (
                  ((a = a.split("/")[0]),
                  (a = a.split("\\")[0]),
                  a.includes("*"))
                ) {
                  const d = new RegExp(a.replace(/\*/g, ".*"));
                  return d.test(i) || d.test(`.${i}`);
                } else return i === a || `www.${i}` === a;
              });
              return e(c);
            } catch (s) {
              return console.error(s), e(!1);
            }
          });
        });
      }
      function xo(t) {
        return new Promise((e, n) => {
          const { url: r } = t;
          chrome.storage.local.get(
            ["account", "icp", Ee, "icp_cache"],
            function (i) {
              var o;
              if (!(i != null && i.account)) return e({ isICP: !1 });
              function s(c, a, d) {
                return new Promise((_) => {
                  fetch(c, {
                    credentials: "include",
                    headers: {
                      Accept: "application/json",
                      "X-Context": a,
                      "X-Session-ID": d,
                    },
                  })
                    .then((p) => p.text())
                    .then((p) => {
                      const T = p.toString().split(";"),
                        P = { isICP: T[0] === "true" };
                      return T[1] && (P.finalUrl = `https://${T[1]}`), _(P);
                    })
                    .catch((p) => (console.error(p), _({ isICP: !1 })));
                });
              }
              if (chrome.runtime.lastError) n(chrome.runtime.lastError);
              else if (!!i[Ee]) {
                const { email: a, session_id: d } = i.account,
                  _ = (o = i.icp) == null ? void 0 : o.main,
                  p = To(_);
                if (Me.size < 1 && i.icp_cache)
                  try {
                    Me.load(JSON.parse(i.icp_cache));
                  } catch (P) {
                    console.error(P);
                  }
                const T = r.startsWith("https://www.linkedin.com/company/")
                  ? `${r.replace(
                      /^https:\/\/www\.linkedin\.com\/company\/([^/]+)\/.*$/,
                      "linkedin:$1"
                    )}---${p}`
                  : `${new URL(r).host}---${p}`;
                if (Me.has(T)) {
                  const P = Ot(
                    "production",
                    `/v1/icp?icp=skip&url=${encodeURIComponent(r)}`,
                    "connect"
                  );
                  return s(P, a, d), e(Me.get(T));
                } else {
                  const P = Ot(
                    "production",
                    `/v1/icp?icp=${encodeURIComponent(
                      p
                    )}&url=${encodeURIComponent(r)}`,
                    "connect"
                  );
                  s(P, a, d).then(
                    (Le) => (
                      Me.set(T, Le),
                      chrome.storage.local.set({
                        icp_cache: JSON.stringify(Me.dump()),
                      }),
                      e(Le)
                    )
                  );
                }
              } else return e({ isICP: !1 });
            }
          );
        });
      }
      function Ao(t) {
        return new Promise((e, n) => {
          const { enabled: r } = t;
          r
            ? (chrome.storage.local.set(
                { [Ee]: new Date().toISOString() },
                function () {
                  chrome.runtime.lastError
                    ? n(chrome.runtime.lastError)
                    : e(!0);
                }
              ),
              chrome.storage.local.get(["blocklist"], function (i) {
                if (chrome.runtime.lastError) n(chrome.runtime.lastError);
                else {
                  const o = i.blocklist || [];
                  o &&
                    o.length === 1 &&
                    o[0] === "*" &&
                    chrome.storage.local.set({ blocklist: kn });
                }
              }))
            : chrome.storage.local.remove([Ee], function () {
                chrome.runtime.lastError ? n(chrome.runtime.lastError) : e(!0);
              });
        });
      }
      function Do() {
        return new Promise((t, e) => {
          chrome.storage.local.get([Ee], function (n) {
            if (chrome.runtime.lastError) e(chrome.runtime.lastError);
            else {
              const r = !!n[Ee];
              return t(r);
            }
          });
        });
      }
      function No(t) {
        return new Promise((e, n) => {
          const { enabled: r } = t;
          r
            ? chrome.storage.local.set(
                { [Pe]: new Date().toISOString() },
                function () {
                  chrome.runtime.lastError
                    ? n(chrome.runtime.lastError)
                    : e(!0);
                }
              )
            : chrome.storage.local.remove([Pe], function () {
                chrome.runtime.lastError ? n(chrome.runtime.lastError) : e(!0);
              });
        });
      }
      function Io() {
        return new Promise((t, e) => {
          chrome.storage.local.get([Pe], function (n) {
            if (chrome.runtime.lastError) e(chrome.runtime.lastError);
            else {
              const r = !!n[Pe];
              return t(r);
            }
          });
        });
      }
      function Co(t) {
        return new Promise((e) => {
          const { id: n } = t;
          if (!n) return e(!1);
          chrome.storage.local.get(["cached_prospects"], function (r) {
            if (chrome.runtime.lastError) e(!1);
            else {
              const i = Math.floor(new Date().getTime() / 1e3),
                o = r.cached_prospects || {};
              return o[n] && i - o[n] < wn ? e(!0) : e(!1);
            }
          });
        });
      }
      function Po(t) {
        return new Promise((e, n) => {
          const { id: r } = t;
          if (!r) return e(!1);
          chrome.storage.local.get(["cached_prospects"], function (i) {
            if (chrome.runtime.lastError) n(chrome.runtime.lastError);
            else {
              const o = Math.floor(new Date().getTime() / 1e3),
                s = i.cached_prospects || {};
              Object.keys(s).forEach((c) => {
                o - s[c] > wn && delete s[c];
              }),
                s[r] || (s[r] = o),
                chrome.storage.local.set({ cached_prospects: s }, function () {
                  if (chrome.runtime.lastError) n(chrome.runtime.lastError);
                  else return e(!0);
                });
            }
          });
        });
      }
      be("api", {
        call: (t) =>
          se(void 0, null, function* () {
            return Ro(t);
          }),
        isICP: (t) =>
          se(void 0, null, function* () {
            return xo(t);
          }),
        isBlockedUrl: (t) =>
          se(void 0, null, function* () {
            return Oo(t);
          }),
        isConnectEverywhereEnabled: (t) =>
          se(void 0, null, function* () {
            return Do();
          }),
        toggleConnectEverywhere: (t) =>
          se(void 0, null, function* () {
            return Ao(t);
          }),
        isProspectEuEnabled: (t) =>
          se(void 0, null, function* () {
            return Io();
          }),
        toggleProspectEu: (t) =>
          se(void 0, null, function* () {
            return No(t);
          }),
        isProspectAvailableForFree: (t) =>
          se(void 0, null, function* () {
            return Co(t);
          }),
        markProspectAsAvailableForFree: (t) =>
          se(void 0, null, function* () {
            return Po(t);
          }),
      });
      var ve = (t, e, n) =>
        new Promise((r, i) => {
          var o = (a) => {
              try {
                c(n.next(a));
              } catch (d) {
                i(d);
              }
            },
            s = (a) => {
              try {
                c(n.throw(a));
              } catch (d) {
                i(d);
              }
            },
            c = (a) =>
              a.done ? r(a.value) : Promise.resolve(a.value).then(o, s);
          c((n = n.apply(t, e)).next());
        });
      function Rn() {
        return new Promise((t, e) => {
          chrome.storage.local.get(["account"], function (n) {
            chrome.runtime.lastError
              ? e(chrome.runtime.lastError)
              : t(n.account);
          });
        });
      }
      function Mo(t) {
        return new Promise((e, n) => {
          chrome.storage.local.set({ account: t }, function () {
            chrome.runtime.lastError ? n(chrome.runtime.lastError) : e(!0);
          });
        });
      }
      function Lo() {
        return new Promise((t, e) => {
          chrome.storage.local.remove(
            ["account", "icp_cache", "cached_prospects", "widget_position", Ee],
            function () {
              chrome.runtime.lastError ? e(chrome.runtime.lastError) : t(!0);
            }
          );
        });
      }
      function At(t, e) {
        return new Promise((n, r) => {
          chrome.tabs.create(
            {
              url: `chrome-extension://${chrome.runtime.id}/options.html?${
                t || ""
              }${e ? `#${e}` : ""}`,
            },
            function () {
              chrome.runtime.lastError ? r(chrome.runtime.lastError) : n(!0);
            }
          );
        });
      }
      be("account", {
        get: () =>
          ve(void 0, null, function* () {
            return Rn();
          }),
        betaFeaturesEnabled: () =>
          ve(void 0, null, function* () {
            const t = yield Rn();
            return (t == null ? void 0 : t.betaFeaturesEnabled) || [];
          }),
        set: (t) =>
          ve(void 0, null, function* () {
            return Mo(t);
          }),
        remove: () =>
          ve(void 0, null, function* () {
            return Lo();
          }),
        openOptionsPage: (t) =>
          ve(void 0, null, function* () {
            return At(
              t == null ? void 0 : t.queryString,
              t == null ? void 0 : t.anchor
            );
          }),
        openOptionsPageAndAuthorise: () =>
          ve(void 0, null, function* () {
            return At("authorise=true");
          }),
        openOptionsPageAndAuthoriseError: () =>
          ve(void 0, null, function* () {
            return At("authfail=true");
          }),
      });
      var Uo = Object.defineProperty,
        Bo = Object.defineProperties,
        Fo = Object.getOwnPropertyDescriptors,
        On = Object.getOwnPropertySymbols,
        $o = Object.prototype.hasOwnProperty,
        zo = Object.prototype.propertyIsEnumerable,
        xn = (t, e, n) =>
          e in t
            ? Uo(t, e, {
                enumerable: !0,
                configurable: !0,
                writable: !0,
                value: n,
              })
            : (t[e] = n),
        jo = (t, e) => {
          for (var n in e || (e = {})) $o.call(e, n) && xn(t, n, e[n]);
          if (On) for (var n of On(e)) zo.call(e, n) && xn(t, n, e[n]);
          return t;
        },
        Go = (t, e) => Bo(t, Fo(e)),
        Yo = (t, e, n) =>
          new Promise((r, i) => {
            var o = (a) => {
                try {
                  c(n.next(a));
                } catch (d) {
                  i(d);
                }
              },
              s = (a) => {
                try {
                  c(n.throw(a));
                } catch (d) {
                  i(d);
                }
              },
              c = (a) =>
                a.done ? r(a.value) : Promise.resolve(a.value).then(o, s);
            c((n = n.apply(t, e)).next());
          });
      function Ho(t, e) {
        return Yo(this, null, function* () {
          const n = new AbortController(),
            r = setTimeout(() => n.abort(), e.timeout ? e.timeout : 1e4),
            i = yield fetch(t, Go(jo({}, e), { signal: n.signal }));
          return clearTimeout(r), i;
        });
      }
      const Wo = Ho;
      var An = Object.getOwnPropertySymbols,
        qo = Object.prototype.hasOwnProperty,
        Vo = Object.prototype.propertyIsEnumerable,
        Ko = (t, e) => {
          var n = {};
          for (var r in t) qo.call(t, r) && e.indexOf(r) < 0 && (n[r] = t[r]);
          if (t != null && An)
            for (var r of An(t))
              e.indexOf(r) < 0 && Vo.call(t, r) && (n[r] = t[r]);
          return n;
        },
        Dn = (t, e, n) =>
          new Promise((r, i) => {
            var o = (a) => {
                try {
                  c(n.next(a));
                } catch (d) {
                  i(d);
                }
              },
              s = (a) => {
                try {
                  c(n.throw(a));
                } catch (d) {
                  i(d);
                }
              },
              c = (a) =>
                a.done ? r(a.value) : Promise.resolve(a.value).then(o, s);
            c((n = n.apply(t, e)).next());
          });
      const Nn = "ANDxPXJ22PWLe6109DGUBY0vr8lfcRYq";
      function Jo(t) {
        function e(n, r) {
          return Wo(n, {
            timeout: 5e3,
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Basic ${btoa(`${Nn}:`)}`,
            },
            body: JSON.stringify(r),
          });
        }
        return {
          identify: (n) =>
            Dn(this, null, function* () {
              Xe &&
                console.log("[DEBUG]: analytics.identify", {
                  userId: t,
                  payload: n,
                }),
                e("https://api.segment.io/v1/identify", {
                  userId: t,
                  traits: n,
                });
            }),
          track: (n) =>
            Dn(this, null, function* () {
              Xe &&
                console.log("[DEBUG]: analytics.track", {
                  userId: t,
                  payload: n,
                });
              const r = n,
                { event: i } = r,
                o = Ko(r, ["event"]);
              e("https://api.segment.io/v1/track", {
                userId: t,
                event: i,
                properties: o,
                timestamp: new Date().toISOString(),
              });
            }),
        };
      }
      Nn &&
        chrome.storage.local.get("clientID", function ({ clientID: t }) {
          t && be("analytics", Jo(t));
        });
      var In = (t, e, n) =>
        new Promise((r, i) => {
          var o = (a) => {
              try {
                c(n.next(a));
              } catch (d) {
                i(d);
              }
            },
            s = (a) => {
              try {
                c(n.throw(a));
              } catch (d) {
                i(d);
              }
            },
            c = (a) =>
              a.done ? r(a.value) : Promise.resolve(a.value).then(o, s);
          c((n = n.apply(t, e)).next());
        });
      function Xo() {
        return new Promise((t, e) => {
          chrome.storage.local.get(["widget_position"], function (n) {
            chrome.runtime.lastError
              ? e(chrome.runtime.lastError)
              : t(n.widget_position);
          });
        });
      }
      function Zo(t) {
        return new Promise((e, n) => {
          chrome.storage.local.set({ widget_position: t }, function () {
            chrome.runtime.lastError ? n(chrome.runtime.lastError) : e(!0);
          });
        });
      }
      be("widget", {
        getPosition: () =>
          In(void 0, null, function* () {
            return Xo();
          }),
        setPosition: (t) =>
          In(void 0, null, function* () {
            return Zo(t);
          }),
      });
      var Cn = (t, e, n) =>
        new Promise((r, i) => {
          var o = (a) => {
              try {
                c(n.next(a));
              } catch (d) {
                i(d);
              }
            },
            s = (a) => {
              try {
                c(n.throw(a));
              } catch (d) {
                i(d);
              }
            },
            c = (a) =>
              a.done ? r(a.value) : Promise.resolve(a.value).then(o, s);
          c((n = n.apply(t, e)).next());
        });
      function Qo() {
        return new Promise((t, e) => {
          chrome.storage.local.get(["icp"], function (n) {
            var r;
            chrome.runtime.lastError
              ? e(chrome.runtime.lastError)
              : t((r = n.icp) == null ? void 0 : r.main);
          });
        });
      }
      function es(t) {
        return new Promise((e, n) => {
          chrome.storage.local.set({ icp: { main: t.icp } }, function () {
            chrome.runtime.lastError ? n(chrome.runtime.lastError) : e(!0);
          });
        });
      }
      be("icp", {
        getICP: () =>
          Cn(void 0, null, function* () {
            return Qo();
          }),
        setICP: (t) =>
          Cn(void 0, null, function* () {
            return es(t);
          }),
      });
      var Dt = (t, e, n) =>
        new Promise((r, i) => {
          var o = (a) => {
              try {
                c(n.next(a));
              } catch (d) {
                i(d);
              }
            },
            s = (a) => {
              try {
                c(n.throw(a));
              } catch (d) {
                i(d);
              }
            },
            c = (a) =>
              a.done ? r(a.value) : Promise.resolve(a.value).then(o, s);
          c((n = n.apply(t, e)).next());
        });
      function ts() {
        return new Promise((t, e) => {
          chrome.storage.local.get(["blocklist"], function (n) {
            chrome.runtime.lastError
              ? e(chrome.runtime.lastError)
              : t(n.blocklist || []);
          });
        });
      }
      function ns(t) {
        return new Promise((e, n) => {
          chrome.storage.local.set({ blocklist: t.blocklist }, function () {
            chrome.runtime.lastError ? n(chrome.runtime.lastError) : e(!0);
          });
        });
      }
      function rs(t) {
        return new Promise((e, n) => {
          chrome.storage.local.get(["blocklist"], function (r) {
            if (chrome.runtime.lastError) n(chrome.runtime.lastError);
            else {
              const i = r.blocklist || [];
              i.includes(t.domain)
                ? e(!0)
                : (i.push(t.domain),
                  chrome.storage.local.set({ blocklist: i }, function () {
                    chrome.runtime.lastError
                      ? n(chrome.runtime.lastError)
                      : e(!0);
                  }));
            }
          });
        });
      }
      be("blocklist", {
        getBlocklist: () =>
          Dt(void 0, null, function* () {
            return ts();
          }),
        setBlocklist: (t) =>
          Dt(void 0, null, function* () {
            return ns(t);
          }),
        addToBlocklist: (t) =>
          Dt(void 0, null, function* () {
            return rs(t);
          }),
      });
      var is = (t, e, n) =>
        new Promise((r, i) => {
          var o = (a) => {
              try {
                c(n.next(a));
              } catch (d) {
                i(d);
              }
            },
            s = (a) => {
              try {
                c(n.throw(a));
              } catch (d) {
                i(d);
              }
            },
            c = (a) =>
              a.done ? r(a.value) : Promise.resolve(a.value).then(o, s);
          c((n = n.apply(t, e)).next());
        });
      be("background", {
        forwardMessageToContentScript: (t) =>
          is(void 0, null, function* () {
            const { message: e, payload: n } = t;
            po("background", e, n);
          }),
      }),
        chrome.contextMenus.onClicked.addListener(_o),
        (globalThis.__triggerTestError = (t) => {
          throw (
            (console.error("error from the console: " + t || 0),
            new Error(t || "This is a test error"))
          );
        });
    })();
})();

//# sourceMappingURL=background.js.map
