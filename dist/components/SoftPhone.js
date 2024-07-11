import { jsx as i } from "react/jsx-runtime";
import { useState as t, useEffect as v } from "react";
import '../assets/SoftPhone.css';const h = "_fabIcon_1fjyb_4", p = "_floatingButton_1fjyb_10", x = "_dragging_1fjyb_21", a = {
  fabIcon: h,
  floatingButton: p,
  dragging: x
}, _ = () => {
  const [n, r] = t({ x: 0, y: 0 }), [e, c] = t(!1), [s, u] = t({ x: 0, y: 0 }), [d, l] = t(!1), w = (o) => {
    c(!0), u({
      x: o.clientX - n.x,
      y: o.clientY - n.y
    }), l(!1);
  }, f = (o) => {
    e && (r({
      x: o.clientX - s.x,
      y: o.clientY - s.y
    }), l(!0));
  }, g = () => {
    c(!1);
  };
  v(() => (window.addEventListener("mousemove", f), window.addEventListener("mouseup", g), () => {
    window.removeEventListener("mousemove", f), window.removeEventListener("mouseup", g);
  }), [e, s]);
  const m = () => {
    d || console.log("showSoftPhone");
  };
  return /* @__PURE__ */ i(
    "div",
    {
      className: `${a.floatingButton} ${e ? a.dragging : ""}`,
      onMouseDown: w,
      onClick: m,
      style: { position: "absolute", top: n.y, left: n.x },
      children: /* @__PURE__ */ i("svg", { className: a.fabIcon, xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 256 256", children: /* @__PURE__ */ i("path", { d: "M222.37,158.46l-47.11-21.11-.13-.06a16,16,0,0,0-15.17,1.4,8.12,8.12,0,0,0-.75.56L134.87,160c-15.42-7.49-31.34-23.29-38.83-38.51l20.78-24.71c.2-.25.39-.5.57-.77a16,16,0,0,0,1.32-15.06l0-.12L97.54,33.64a16,16,0,0,0-16.62-9.52A56.26,56.26,0,0,0,32,80c0,79.4,64.6,144,144,144a56.26,56.26,0,0,0,55.88-48.92A16,16,0,0,0,222.37,158.46ZM176,208A128.14,128.14,0,0,1,48,80,40.2,40.2,0,0,1,82.87,40a.61.61,0,0,0,0,.12l21,47L83.2,111.86a6.13,6.13,0,0,0-.57.77,16,16,0,0,0-1,15.7c9.06,18.53,27.73,37.06,46.46,46.11a16,16,0,0,0,15.75-1.14,8.44,8.44,0,0,0,.74-.56L168.89,152l47,21.05h0s.08,0,.11,0A40.21,40.21,0,0,1,176,208Z" }) })
    }
  );
};
export {
  _ as SoftPhone
};
