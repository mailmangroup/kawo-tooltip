const i = window, c = document, p = c.body, L = 500, s = 16, x = 5;
"ontouchstart" in i && console.warn("No tooltips on touch devices.");
let E, l, C, w = !1, d;
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
p.appendChild(o);
const g = () => {
  t.visibility = "hidden", w = !1, d = void 0;
};
p.addEventListener("mouseenter", A, !0);
p.addEventListener("mouseleave", $, !0);
p.addEventListener("click", g, !0);
p.addEventListener("pointerdown", g, !0);
c.addEventListener(
  "wheel",
  () => {
    C !== "fixed" && g();
  },
  !0
);
function A(h) {
  const n = h.target;
  if (n.hasAttribute("data-tooltip")) {
    d = n, C = i.getComputedStyle(n).getPropertyValue("position"), l && (clearTimeout(l), l = null), w || (E = setTimeout(() => {
      t.visibility = "visible", w = !0;
    }, L)), M.innerHTML = n.getAttribute("data-tooltip");
    const e = o.getBoundingClientRect(), a = n.getBoundingClientRect(), r = Math.round(a.left + a.width / 2);
    let y = a.bottom + 3, f = Math.round(r - e.width / 2), v = "center", m = Math.round(e.width / 2 - x), b = 45;
    a.bottom + e.height > i.innerHeight && (y = a.top - e.height - 3, b = -135), e.width / 2 > r - s && (f = s, v = "left", m = r - s - x), r + e.width / 2 > i.innerWidth - s && (f = i.innerWidth - e.width - s, v = "right", m = r - f - x), i.requestAnimationFrame(() => {
      t.transform = `translate( ${f}px, ${y}px )`, t.textAlign = v, u.transform = `rotate(${b}deg)`, u.inset = b > 0 ? `-5px auto auto ${m}px` : `auto auto -5px ${m}px`;
    });
  }
}
function $(h) {
  h.relatedTarget instanceof Node && (d != null && d.contains(h.relatedTarget)) || (E && clearTimeout(E), w && !l && (l = setTimeout(g, L)));
}
