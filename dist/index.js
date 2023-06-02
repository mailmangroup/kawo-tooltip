const i = window, c = document, g = c.body, L = 500, r = 16, b = 5;
"ontouchstart" in i && console.warn("No tooltips on touch devices.");
let x, l, C, m = !1, d;
const n = c.createElement("div"), t = n.style;
n.className = "kawo-tooltip";
t.position = "fixed";
t.inset = "0 auto auto 0";
t.visibility = "hidden";
t.zIndex = "2_147_483_647";
t.pointerEvents = "none";
const M = c.createElement("span");
n.appendChild(M);
const T = c.createElement("div"), u = T.style;
T.className = "kawo-tooltip-arrow";
u.width = "0";
u.height = "0";
u.position = "absolute";
n.appendChild(T);
g.appendChild(n);
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
function A(p) {
  const o = p.target;
  if (o.hasAttribute("data-tooltip") || o.closest("[data-tooltip]")) {
    d = o, C = i.getComputedStyle(o).getPropertyValue("position"), l && (clearTimeout(l), l = null), m || (x = setTimeout(() => {
      t.visibility = "visible", m = !0;
    }, L)), M.innerHTML = o.getAttribute("data-tooltip");
    const e = n.getBoundingClientRect(), a = o.getBoundingClientRect(), s = Math.round(a.left + a.width / 2);
    let E = a.bottom + 3, h = Math.round(s - e.width / 2), w = "center", f = Math.round(e.width / 2 - b), v = 45;
    a.bottom + e.height > i.innerHeight && (E = a.top - e.height - 3, v = -135), e.width / 2 > s - r && (h = r, w = "left", f = s - r - b), s + e.width / 2 > i.innerWidth - r && (h = i.innerWidth - e.width - r, w = "right", f = s - h - b), i.requestAnimationFrame(() => {
      t.transform = `translate( ${h}px, ${E}px )`, t.textAlign = w, u.transform = `rotate(${v}deg)`, u.inset = v > 0 ? `-5px auto auto ${f}px` : `auto auto -5px ${f}px`;
    });
  }
}
function $(p) {
  p.relatedTarget instanceof Node && (d != null && d.contains(p.relatedTarget)) || (x && clearTimeout(x), m && !l && (l = setTimeout(y, L)));
}
