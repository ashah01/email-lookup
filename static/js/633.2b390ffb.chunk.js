"use strict";
(self.webpackChunkconnect_client = self.webpackChunkconnect_client || []).push([
  [633],
  {
    6633: (fn, N, O) => {
      O.r(N),
        O.d(N, {
          getCLS: () => G,
          getFCP: () => B,
          getFID: () => U,
          getINP: () => $,
          getLCP: () => nn,
          getTTFB: () => tn,
          onCLS: () => G,
          onFCP: () => B,
          onFID: () => U,
          onINP: () => $,
          onLCP: () => nn,
          onTTFB: () => tn,
        });
      var v,
        T,
        _,
        L,
        A,
        j = -1,
        m = function (t) {
          addEventListener(
            "pageshow",
            function (n) {
              n.persisted && ((j = n.timeStamp), t(n));
            },
            !0
          );
        },
        F = function () {
          return (
            window.performance &&
            performance.getEntriesByType &&
            performance.getEntriesByType("navigation")[0]
          );
        },
        b = function () {
          var t = F();
          return (t && t.activationStart) || 0;
        },
        d = function (t, n) {
          var e = F(),
            a = "navigate";
          return (
            j >= 0
              ? (a = "back-forward-cache")
              : e &&
                (a =
                  document.prerendering || b() > 0
                    ? "prerender"
                    : document.wasDiscarded
                    ? "restore"
                    : e.type.replace(/_/g, "-")),
            {
              name: t,
              value: n === void 0 ? -1 : n,
              rating: "good",
              delta: 0,
              entries: [],
              id: "v3-"
                .concat(Date.now(), "-")
                .concat(Math.floor(8999999999999 * Math.random()) + 1e12),
              navigationType: a,
            }
          );
        },
        h = function (t, n, e) {
          try {
            if (PerformanceObserver.supportedEntryTypes.includes(t)) {
              var a = new PerformanceObserver(function (r) {
                Promise.resolve().then(function () {
                  n(r.getEntries());
                });
              });
              return (
                a.observe(Object.assign({ type: t, buffered: !0 }, e || {})), a
              );
            }
          } catch (r) {}
        },
        l = function (t, n, e, a) {
          var r, i;
          return function (o) {
            n.value >= 0 &&
              (o || a) &&
              ((i = n.value - (r || 0)) || r === void 0) &&
              ((r = n.value),
              (n.delta = i),
              (n.rating = (function (f, u) {
                return f > u[1]
                  ? "poor"
                  : f > u[0]
                  ? "needs-improvement"
                  : "good";
              })(n.value, e)),
              t(n));
          };
        },
        k = function (t) {
          requestAnimationFrame(function () {
            return requestAnimationFrame(function () {
              return t();
            });
          });
        },
        w = function (t) {
          var n = function (e) {
            (e.type !== "pagehide" && document.visibilityState !== "hidden") ||
              t(e);
          };
          addEventListener("visibilitychange", n, !0),
            addEventListener("pagehide", n, !0);
        },
        M = function (t) {
          var n = !1;
          return function (e) {
            n || (t(e), (n = !0));
          };
        },
        g = -1,
        q = function () {
          return document.visibilityState !== "hidden" || document.prerendering
            ? 1 / 0
            : 0;
        },
        S = function (t) {
          document.visibilityState === "hidden" &&
            g > -1 &&
            ((g = t.type === "visibilitychange" ? t.timeStamp : 0), en());
        },
        z = function () {
          addEventListener("visibilitychange", S, !0),
            addEventListener("prerenderingchange", S, !0);
        },
        en = function () {
          removeEventListener("visibilitychange", S, !0),
            removeEventListener("prerenderingchange", S, !0);
        },
        D = function () {
          return (
            g < 0 &&
              ((g = q()),
              z(),
              m(function () {
                setTimeout(function () {
                  (g = q()), z();
                }, 0);
              })),
            {
              get firstHiddenTime() {
                return g;
              },
            }
          );
        },
        E = function (t) {
          document.prerendering
            ? addEventListener(
                "prerenderingchange",
                function () {
                  return t();
                },
                !0
              )
            : t();
        },
        B = function (t, n) {
          (n = n || {}),
            E(function () {
              var e,
                a = [1800, 3e3],
                r = D(),
                i = d("FCP"),
                o = h("paint", function (f) {
                  f.forEach(function (u) {
                    u.name === "first-contentful-paint" &&
                      (o.disconnect(),
                      u.startTime < r.firstHiddenTime &&
                        ((i.value = Math.max(u.startTime - b(), 0)),
                        i.entries.push(u),
                        e(!0)));
                  });
                });
              o &&
                ((e = l(t, i, a, n.reportAllChanges)),
                m(function (f) {
                  (i = d("FCP")),
                    (e = l(t, i, a, n.reportAllChanges)),
                    k(function () {
                      (i.value = performance.now() - f.timeStamp), e(!0);
                    });
                }));
            });
        },
        G = function (t, n) {
          (n = n || {}),
            B(
              M(function () {
                var e,
                  a = [0.1, 0.25],
                  r = d("CLS", 0),
                  i = 0,
                  o = [],
                  f = function (c) {
                    c.forEach(function (s) {
                      if (!s.hadRecentInput) {
                        var y = o[0],
                          P = o[o.length - 1];
                        i &&
                        s.startTime - P.startTime < 1e3 &&
                        s.startTime - y.startTime < 5e3
                          ? ((i += s.value), o.push(s))
                          : ((i = s.value), (o = [s]));
                      }
                    }),
                      i > r.value && ((r.value = i), (r.entries = o), e());
                  },
                  u = h("layout-shift", f);
                u &&
                  ((e = l(t, r, a, n.reportAllChanges)),
                  w(function () {
                    f(u.takeRecords()), e(!0);
                  }),
                  m(function () {
                    (i = 0),
                      (r = d("CLS", 0)),
                      (e = l(t, r, a, n.reportAllChanges)),
                      k(function () {
                        return e();
                      });
                  }),
                  setTimeout(e, 0));
              })
            );
        },
        C = { passive: !0, capture: !0 },
        rn = new Date(),
        J = function (t, n) {
          v ||
            ((v = n), (T = t), (_ = new Date()), Q(removeEventListener), K());
        },
        K = function () {
          if (T >= 0 && T < _ - rn) {
            var t = {
              entryType: "first-input",
              name: v.type,
              target: v.target,
              cancelable: v.cancelable,
              startTime: v.timeStamp,
              processingStart: v.timeStamp + T,
            };
            L.forEach(function (n) {
              n(t);
            }),
              (L = []);
          }
        },
        an = function (t) {
          if (t.cancelable) {
            var n =
              (t.timeStamp > 1e12 ? new Date() : performance.now()) -
              t.timeStamp;
            t.type == "pointerdown"
              ? (function (e, a) {
                  var r = function () {
                      J(e, a), o();
                    },
                    i = function () {
                      o();
                    },
                    o = function () {
                      removeEventListener("pointerup", r, C),
                        removeEventListener("pointercancel", i, C);
                    };
                  addEventListener("pointerup", r, C),
                    addEventListener("pointercancel", i, C);
                })(n, t)
              : J(n, t);
          }
        },
        Q = function (t) {
          ["mousedown", "keydown", "touchstart", "pointerdown"].forEach(
            function (n) {
              return t(n, an, C);
            }
          );
        },
        U = function (t, n) {
          (n = n || {}),
            E(function () {
              var e,
                a = [100, 300],
                r = D(),
                i = d("FID"),
                o = function (c) {
                  c.startTime < r.firstHiddenTime &&
                    ((i.value = c.processingStart - c.startTime),
                    i.entries.push(c),
                    e(!0));
                },
                f = function (c) {
                  c.forEach(o);
                },
                u = h("first-input", f);
              (e = l(t, i, a, n.reportAllChanges)),
                u &&
                  w(
                    M(function () {
                      f(u.takeRecords()), u.disconnect();
                    })
                  ),
                u &&
                  m(function () {
                    var c;
                    (i = d("FID")),
                      (e = l(t, i, a, n.reportAllChanges)),
                      (L = []),
                      (T = -1),
                      (v = null),
                      Q(addEventListener),
                      (c = o),
                      L.push(c),
                      K();
                  });
            });
        },
        V = 0,
        R = 1 / 0,
        I = 0,
        on = function (t) {
          t.forEach(function (n) {
            n.interactionId &&
              ((R = Math.min(R, n.interactionId)),
              (I = Math.max(I, n.interactionId)),
              (V = I ? (I - R) / 7 + 1 : 0));
          });
        },
        W = function () {
          return A ? V : performance.interactionCount || 0;
        },
        cn = function () {
          "interactionCount" in performance ||
            A ||
            (A = h("event", on, {
              type: "event",
              buffered: !0,
              durationThreshold: 0,
            }));
        },
        X = 0,
        Y = function () {
          return W() - X;
        },
        p = [],
        x = {},
        Z = function (t) {
          var n = p[p.length - 1],
            e = x[t.interactionId];
          if (e || p.length < 10 || t.duration > n.latency) {
            if (e)
              e.entries.push(t), (e.latency = Math.max(e.latency, t.duration));
            else {
              var a = {
                id: t.interactionId,
                latency: t.duration,
                entries: [t],
              };
              (x[a.id] = a), p.push(a);
            }
            p.sort(function (r, i) {
              return i.latency - r.latency;
            }),
              p.splice(10).forEach(function (r) {
                delete x[r.id];
              });
          }
        },
        $ = function (t, n) {
          (n = n || {}),
            E(function () {
              var e = [200, 500];
              cn();
              var a,
                r = d("INP"),
                i = function (f) {
                  f.forEach(function (s) {
                    s.interactionId && Z(s),
                      s.entryType === "first-input" &&
                        !p.some(function (y) {
                          return y.entries.some(function (P) {
                            return (
                              s.duration === P.duration &&
                              s.startTime === P.startTime
                            );
                          });
                        }) &&
                        Z(s);
                  });
                  var u,
                    c =
                      ((u = Math.min(p.length - 1, Math.floor(Y() / 50))),
                      p[u]);
                  c &&
                    c.latency !== r.value &&
                    ((r.value = c.latency), (r.entries = c.entries), a());
                },
                o = h("event", i, {
                  durationThreshold: n.durationThreshold || 40,
                });
              (a = l(t, r, e, n.reportAllChanges)),
                o &&
                  (o.observe({ type: "first-input", buffered: !0 }),
                  w(function () {
                    i(o.takeRecords()),
                      r.value < 0 &&
                        Y() > 0 &&
                        ((r.value = 0), (r.entries = [])),
                      a(!0);
                  }),
                  m(function () {
                    (p = []),
                      (X = W()),
                      (r = d("INP")),
                      (a = l(t, r, e, n.reportAllChanges));
                  }));
            });
        },
        H = {},
        nn = function (t, n) {
          (n = n || {}),
            E(function () {
              var e,
                a = [2500, 4e3],
                r = D(),
                i = d("LCP"),
                o = function (c) {
                  var s = c[c.length - 1];
                  if (s) {
                    var y = Math.max(s.startTime - b(), 0);
                    y < r.firstHiddenTime &&
                      ((i.value = y), (i.entries = [s]), e());
                  }
                },
                f = h("largest-contentful-paint", o);
              if (f) {
                e = l(t, i, a, n.reportAllChanges);
                var u = M(function () {
                  H[i.id] ||
                    (o(f.takeRecords()), f.disconnect(), (H[i.id] = !0), e(!0));
                });
                ["keydown", "click"].forEach(function (c) {
                  addEventListener(c, u, !0);
                }),
                  w(u),
                  m(function (c) {
                    (i = d("LCP")),
                      (e = l(t, i, a, n.reportAllChanges)),
                      k(function () {
                        (i.value = performance.now() - c.timeStamp),
                          (H[i.id] = !0),
                          e(!0);
                      });
                  });
              }
            });
        },
        un = function t(n) {
          document.prerendering
            ? E(function () {
                return t(n);
              })
            : document.readyState !== "complete"
            ? addEventListener(
                "load",
                function () {
                  return t(n);
                },
                !0
              )
            : setTimeout(n, 0);
        },
        tn = function (t, n) {
          n = n || {};
          var e = [800, 1800],
            a = d("TTFB"),
            r = l(t, a, e, n.reportAllChanges);
          un(function () {
            var i = F();
            if (i) {
              var o = i.responseStart;
              if (o <= 0 || o > performance.now()) return;
              (a.value = Math.max(o - b(), 0)),
                (a.entries = [i]),
                r(!0),
                m(function () {
                  (a = d("TTFB", 0)), (r = l(t, a, e, n.reportAllChanges))(!0);
                });
            }
          });
        };
    },
  },
]);

//# sourceMappingURL=633.2b390ffb.chunk.js.map
