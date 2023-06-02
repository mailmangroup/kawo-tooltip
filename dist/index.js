const i = window, c = document, g = c.body, L = 500, s = 16, b = 5;
"ontouchstart" in i && console.warn("No tooltips on touch devices.");
let x, l, C, m = !1, d;
const o = c.createElement("div"), t = o.style;
o.className = "kawo-tooltip";
t.position = "fixed";
t.inset = "0 auto auto 0";
t.visibility = "hidden";
t.zIndex = "2_147_483_647";
t.pointerEvents = "none";
const M = c.createElement("span");
o.appendChild(M);
const T = c.createElement("div"), u = T.style;
T.className = "kawo-tooltip-arrow";
u.width = "0";
u.height = "0";
u.position = "absolute";
o.appendChild(T);
g.appendChild(o);
const y = () => {
  t.visibility = "hidden", m = !1, d = void 0;
};
g.addEventListener("mouseenter", A, !0);
g.addEventListener("mouseleave", $, !0);
g.addEventListener("click", y, !0);
c.addEventListener(
  "wheel",
  () => {
    C !== "fixed" && y();
  },
  !0
);
function A(h) {
  const n = h.target;
  if (n.hasAttribute("data-tooltip")) {
    d = n, C = i.getComputedStyle(n).getPropertyValue("position"), l && (clearTimeout(l), l = null), m || (x = setTimeout(() => {
      t.visibility = "visible", m = !0;
    }, L)), M.innerHTML = n.getAttribute("data-tooltip");
    const e = o.getBoundingClientRect(), a = n.getBoundingClientRect(), r = Math.round(a.left + a.width / 2);
    let E = a.bottom + 3, p = Math.round(r - e.width / 2), w = "center", f = Math.round(e.width / 2 - b), v = 45;
    a.bottom + e.height > i.innerHeight && (E = a.top - e.height - 3, v = -135), e.width / 2 > r - s && (p = s, w = "left", f = r - s - b), r + e.width / 2 > i.innerWidth - s && (p = i.innerWidth - e.width - s, w = "right", f = r - p - b), i.requestAnimationFrame(() => {
      t.transform = `translate( ${p}px, ${E}px )`, t.textAlign = w, u.transform = `rotate(${v}deg)`, u.inset = v > 0 ? `-5px auto auto ${f}px` : `auto auto -5px ${f}px`;
    });
  }
}
function $(h) {
  h.relatedTarget instanceof Node && (d != null && d.contains(h.relatedTarget)) || (x && clearTimeout(x), m && !l && (l = setTimeout(y, L)));
}
