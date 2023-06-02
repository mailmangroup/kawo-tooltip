const i = window, u = document, f = u.body, T = 500, r = 16, g = 5;
"ontouchstart" in i && console.warn("No tooltips on touch devices.");
let v, s, E, c = !1;
const o = u.createElement("div"), t = o.style;
o.className = "kawo-tooltip";
t.position = "fixed";
t.inset = "0 auto auto 0";
t.visibility = "hidden";
t.zIndex = "2_147_483_647";
t.pointerEvents = "none";
const C = u.createElement("span");
o.appendChild(C);
const b = u.createElement("div"), d = b.style;
b.className = "kawo-tooltip-arrow";
d.width = "0";
d.height = "0";
d.position = "absolute";
o.appendChild(b);
f.appendChild(o);
const x = () => {
  t.visibility = "hidden", c = !1;
};
f.addEventListener(
  "mouseenter",
  (L) => {
    let n = L.target;
    if (n.hasAttribute("data-tooltip")) {
      console.error(n), E = i.getComputedStyle(n).getPropertyValue("position"), s && (clearTimeout(s), s = null), c || (v = setTimeout(() => {
        t.visibility = "visible", c = !0;
      }, T)), C.innerHTML = n.getAttribute("data-tooltip");
      let e = o.getBoundingClientRect(), a = n.getBoundingClientRect(), l = Math.round(a.left + a.width / 2), y = a.bottom + 3, p = Math.round(l - e.width / 2), m = "center", h = Math.round(e.width / 2 - g), w = 45;
      a.bottom + e.height > i.innerHeight && (y = a.top - e.height - 3, w = -135), e.width / 2 > l - r && (p = r, m = "left", h = l - r - g), l + e.width / 2 > i.innerWidth - r && (p = i.innerWidth - e.width - r, m = "right", h = l - p - g), i.requestAnimationFrame(() => {
        t.transform = `translate( ${p}px, ${y}px )`, t.textAlign = m, d.transform = `rotate(${w}deg)`, d.inset = w > 0 ? `-5px auto auto ${h}px` : `auto auto -5px ${h}px`;
      });
    }
  },
  !0
);
f.addEventListener(
  "mouseleave",
  () => {
    v && clearTimeout(v), c && !s && (s = setTimeout(x, T));
  },
  !0
);
f.addEventListener("click", x, !0);
u.addEventListener(
  "wheel",
  () => {
    E !== "fixed" && x();
  },
  !0
);
