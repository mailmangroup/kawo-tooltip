const o = window, r = document, c = r.body, y = 500, h = 16;
"ontouchstart" in o && console.warn("No tooltips on touch devices.");
let w, a, T, p = !1;
const n = r.createElement("div"), t = n.style;
n.className = "tt";
t.position = "fixed";
t.inset = "0 auto auto 0";
t.visibility = "hidden";
t.zIndex = "2_147_483_647";
t.pointerEvents = "none";
const E = r.createElement("span");
n.appendChild(E);
const v = r.createElement("div"), l = v.style;
v.className = "tta";
l.width = "0";
l.height = "0";
l.position = "absolute";
n.appendChild(v);
c.appendChild(n);
const b = () => {
  t.visibility = "hidden", p = !1;
};
c.addEventListener(
  "mouseenter",
  (M) => {
    let s = M.target;
    if (s.hasAttribute("data-tooltip")) {
      T = o.getComputedStyle(s).getPropertyValue("position"), a && (clearTimeout(a), a = null), p || (w = setTimeout(() => {
        t.visibility = "visible", p = !0;
      }, y)), E.innerHTML = s.getAttribute("data-tooltip");
      let e = n.getBoundingClientRect(), i = s.getBoundingClientRect(), d = i.left + i.width / 2, x = Math.round(i.bottom + 3), m = Math.round(d - e.width / 2), f = "center", u = Math.round(e.width / 2 - 5), g = 45;
      i.bottom + e.height > o.innerHeight && (x = Math.round(i.top - e.height - 5), g = -135), e.width / 2 > d - h && (m = h, f = "left", u = Math.round(d - 25)), d + e.width / 2 > o.innerWidth - h && (m = o.innerWidth - e.width - h, f = "right", u = Math.round(e.width - i.width / 2 - 5)), o.requestAnimationFrame(() => {
        t.transform = `translate( ${m}px, ${x}px )`, t.textAlign = f, l.transform = `rotate(${g}deg)`, l.inset = g > 0 ? `-5px auto auto ${u}px` : `auto auto -5px ${u}px`;
      });
    }
  },
  !0
);
c.addEventListener(
  "mouseleave",
  () => {
    w && clearTimeout(w), p && !a && (a = setTimeout(b, y));
  },
  !0
);
c.addEventListener("click", b, !0);
r.addEventListener(
  "wheel",
  () => {
    T !== "fixed" && b();
  },
  !0
);
