const i = window, d = document, f = d.body, T = 500, l = 16, g = 5;
"ontouchstart" in i && console.warn("No tooltips on touch devices.");
let v, r, E, c = !1;
const o = d.createElement("div"), t = o.style;
o.className = "kawo-tooltip";
t.position = "fixed";
t.inset = "0 auto auto 0";
t.visibility = "hidden";
t.zIndex = "2_147_483_647";
t.pointerEvents = "none";
const C = d.createElement("span");
o.appendChild(C);
const b = d.createElement("div"), s = b.style;
b.className = "kawo-tooltip-arrow";
s.width = "0";
s.height = "0";
s.position = "absolute";
o.appendChild(b);
f.appendChild(o);
const x = () => {
  t.visibility = "hidden", c = !1;
};
f.addEventListener(
  "mouseenter",
  (L) => {
    let u = L.target;
    if (u.hasAttribute("data-tooltip")) {
      E = i.getComputedStyle(u).getPropertyValue("position"), r && (clearTimeout(r), r = null), c || (v = setTimeout(() => {
        t.visibility = "visible", c = !0;
      }, T)), C.innerHTML = u.getAttribute("data-tooltip");
      let e = o.getBoundingClientRect(), n = u.getBoundingClientRect(), a = Math.round(n.left + n.width / 2), y = n.bottom + 3, p = Math.round(a - e.width / 2), m = "center", h = Math.round(e.width / 2 - g), w = 45;
      n.bottom + e.height > i.innerHeight && (y = n.top - e.height - 3, w = -135), e.width / 2 > a - l && (p = l, m = "left", h = a - l - g), a + e.width / 2 > i.innerWidth - l && (p = i.innerWidth - e.width - l, m = "right", h = a - p - g), i.requestAnimationFrame(() => {
        t.transform = `translate( ${p}px, ${y}px )`, t.textAlign = m, s.transform = `rotate(${w}deg)`, s.inset = w > 0 ? `-5px auto auto ${h}px` : `auto auto -5px ${h}px`;
      });
    }
  },
  !0
);
f.addEventListener(
  "mouseleave",
  () => {
    v && clearTimeout(v), c && !r && (r = setTimeout(x, T));
  },
  !0
);
f.addEventListener("click", x, !0);
d.addEventListener(
  "wheel",
  () => {
    E !== "fixed" && x();
  },
  !0
);
