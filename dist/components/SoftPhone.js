import { jsxs as i, Fragment as L, jsx as t } from "react/jsx-runtime";
import { useState as a, useEffect as C } from "react";
import '../assets/SoftPhone.css';const y = "_fabIcon_1d5dg_7", I = "_floatingButton_1d5dg_13", W = "_dragging_1d5dg_29", M = "_dialWindow_1d5dg_33", A = "_draggablePlace_1d5dg_49", D = "_phoneHeader_1d5dg_54", H = "_closeButton_1d5dg_63", j = "_closeIcon_1d5dg_76", P = "_phoneNumber_1d5dg_81", S = "_dialButton1_1d5dg_90", E = "_dialButton2_1d5dg_91", Z = "_dialButton3_1d5dg_92", V = "_dialButton4_1d5dg_93", X = "_dialButton5_1d5dg_94", Y = "_dialButton6_1d5dg_95", $ = "_dialButton7_1d5dg_96", F = "_dialButton8_1d5dg_97", O = "_dialButton9_1d5dg_98", U = "_dialButtonStar_1d5dg_99", q = "_dialButton0_1d5dg_100", z = "_dialButtonHash_1d5dg_101", G = "_callButton_1d5dg_128", J = "_callIcon_1d5dg_144", K = "_clearButton_1d5dg_149", Q = "_clearIcon_1d5dg_165", n = {
  fabIcon: y,
  floatingButton: I,
  dragging: W,
  dialWindow: M,
  draggablePlace: A,
  phoneHeader: D,
  closeButton: H,
  closeIcon: j,
  phoneNumber: P,
  dialButton1: S,
  dialButton2: E,
  dialButton3: Z,
  dialButton4: V,
  dialButton5: X,
  dialButton6: Y,
  dialButton7: $,
  dialButton8: F,
  dialButton9: O,
  dialButtonStar: U,
  dialButton0: q,
  dialButtonHash: z,
  callButton: G,
  callIcon: J,
  clearButton: K,
  clearIcon: Q
}, tt = () => {
  const [l, p] = a({ x: 0, y: 0 }), [s, u] = a(!1), [d, w] = a({ x: 0, y: 0 }), [f, c] = a(!1), [g, b] = a(!1), [_, r] = a(""), h = (o) => {
    u(!0), w({
      x: o.clientX - l.x,
      y: o.clientY - l.y
    }), c(!1);
  }, B = (o) => {
    s && (p({
      x: o.clientX - d.x,
      y: o.clientY - d.y
    }), c(!0));
  }, m = () => {
    g && c(!1), u(!1);
  };
  C(() => (window.addEventListener("mousemove", B), window.addEventListener("mouseup", m), () => {
    window.removeEventListener("mousemove", B), window.removeEventListener("mouseup", m);
  }), [s, d]);
  const k = () => {
    f || b((o) => !o);
  }, N = (o) => {
    const x = o.target.value.replace(/\D/g, "");
    r(x);
  }, e = (o) => {
    r(_ + o);
  }, v = () => {
    r((o) => o.slice(0, -1));
  };
  return /* @__PURE__ */ i(L, { children: [
    /* @__PURE__ */ t(
      "div",
      {
        className: `${n.floatingButton} ${s ? n.dragging : ""}`,
        onMouseDown: h,
        onClick: k,
        style: { position: "absolute", top: l.y, left: l.x },
        children: /* @__PURE__ */ t("svg", { className: n.fabIcon, xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 256 256", children: /* @__PURE__ */ t("path", { d: "M222.37,158.46l-47.11-21.11-.13-.06a16,16,0,0,0-15.17,1.4,8.12,8.12,0,0,0-.75.56L134.87,160c-15.42-7.49-31.34-23.29-38.83-38.51l20.78-24.71c.2-.25.39-.5.57-.77a16,16,0,0,0,1.32-15.06l0-.12L97.54,33.64a16,16,0,0,0-16.62-9.52A56.26,56.26,0,0,0,32,80c0,79.4,64.6,144,144,144a56.26,56.26,0,0,0,55.88-48.92A16,16,0,0,0,222.37,158.46ZM176,208A128.14,128.14,0,0,1,48,80,40.2,40.2,0,0,1,82.87,40a.61.61,0,0,0,0,.12l21,47L83.2,111.86a6.13,6.13,0,0,0-.57.77,16,16,0,0,0-1,15.7c9.06,18.53,27.73,37.06,46.46,46.11a16,16,0,0,0,15.75-1.14,8.44,8.44,0,0,0,.74-.56L168.89,152l47,21.05h0s.08,0,.11,0A40.21,40.21,0,0,1,176,208Z" }) })
      }
    ),
    /* @__PURE__ */ i("div", { className: n.dialWindow, style: { visibility: g ? "visible" : "hidden", position: "absolute", top: l.y - 100, left: l.x - 95 }, children: [
      /* @__PURE__ */ i("div", { className: n.phoneHeader, children: [
        /* @__PURE__ */ t("div", { className: n.draggablePlace, onMouseDown: h }),
        /* @__PURE__ */ t("button", { className: n.closeButton, onClick: k, children: /* @__PURE__ */ i("svg", { className: n.closeIcon, xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 256 256", children: [
          /* @__PURE__ */ t("rect", { width: "256", height: "256", fill: "none" }),
          /* @__PURE__ */ t("polyline", { points: "144 64 144 112 192 112", fill: "none", stroke: "currentColor", strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "16" }),
          /* @__PURE__ */ t("line", { x1: "208", y1: "48", x2: "144", y2: "112", fill: "none", stroke: "currentColor", strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "16" }),
          /* @__PURE__ */ t("polyline", { points: "64 144 112 144 112 192", fill: "none", stroke: "currentColor", strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "16" }),
          /* @__PURE__ */ t("line", { x1: "48", y1: "208", x2: "112", y2: "144", fill: "none", stroke: "currentColor", strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "16" })
        ] }) })
      ] }),
      /* @__PURE__ */ t("input", { value: _, onChange: N, type: "text", pattern: "[0-9]*", className: n.phoneNumber }),
      /* @__PURE__ */ t("button", { onClick: () => e("1"), className: n.dialButton1, children: "1" }),
      /* @__PURE__ */ t("button", { onClick: () => e("2"), className: n.dialButton2, children: "2" }),
      /* @__PURE__ */ t("button", { onClick: () => e("3"), className: n.dialButton3, children: "3" }),
      /* @__PURE__ */ t("button", { onClick: () => e("4"), className: n.dialButton4, children: "4" }),
      /* @__PURE__ */ t("button", { onClick: () => e("5"), className: n.dialButton5, children: "5" }),
      /* @__PURE__ */ t("button", { onClick: () => e("6"), className: n.dialButton6, children: "6" }),
      /* @__PURE__ */ t("button", { onClick: () => e("7"), className: n.dialButton7, children: "7" }),
      /* @__PURE__ */ t("button", { onClick: () => e("8"), className: n.dialButton8, children: "8" }),
      /* @__PURE__ */ t("button", { onClick: () => e("9"), className: n.dialButton9, children: "9" }),
      /* @__PURE__ */ t("button", { onClick: () => e("*"), className: n.dialButtonStar, children: "*" }),
      /* @__PURE__ */ t("button", { onClick: () => e("0"), className: n.dialButton0, children: "0" }),
      /* @__PURE__ */ t("button", { onClick: () => e("#"), className: n.dialButtonHash, children: "#" }),
      /* @__PURE__ */ t("button", { className: n.clearButton, onClick: v, children: /* @__PURE__ */ i("svg", { className: n.clearIcon, xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 256 256", children: [
        /* @__PURE__ */ t("rect", { width: "256", height: "256", fill: "none" }),
        /* @__PURE__ */ t("path", { d: "M61.67,204.12,16,128,61.67,51.88A8,8,0,0,1,68.53,48H216a8,8,0,0,1,8,8V200a8,8,0,0,1-8,8H68.53A8,8,0,0,1,61.67,204.12Z", fill: "none", stroke: "currentColor", strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "16" }),
        /* @__PURE__ */ t("line", { x1: "160", y1: "104", x2: "112", y2: "152", fill: "none", stroke: "currentColor", strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "16" }),
        /* @__PURE__ */ t("line", { x1: "160", y1: "152", x2: "112", y2: "104", fill: "none", stroke: "currentColor", strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "16" })
      ] }) }),
      /* @__PURE__ */ t("button", { className: n.callButton, children: /* @__PURE__ */ t("svg", { className: n.callIcon, xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 256 256", children: /* @__PURE__ */ t("path", { d: "M222.37,158.46l-47.11-21.11-.13-.06a16,16,0,0,0-15.17,1.4,8.12,8.12,0,0,0-.75.56L134.87,160c-15.42-7.49-31.34-23.29-38.83-38.51l20.78-24.71c.2-.25.39-.5.57-.77a16,16,0,0,0,1.32-15.06l0-.12L97.54,33.64a16,16,0,0,0-16.62-9.52A56.26,56.26,0,0,0,32,80c0,79.4,64.6,144,144,144a56.26,56.26,0,0,0,55.88-48.92A16,16,0,0,0,222.37,158.46ZM176,208A128.14,128.14,0,0,1,48,80,40.2,40.2,0,0,1,82.87,40a.61.61,0,0,0,0,.12l21,47L83.2,111.86a6.13,6.13,0,0,0-.57.77,16,16,0,0,0-1,15.7c9.06,18.53,27.73,37.06,46.46,46.11a16,16,0,0,0,15.75-1.14,8.44,8.44,0,0,0,.74-.56L168.89,152l47,21.05h0s.08,0,.11,0A40.21,40.21,0,0,1,176,208Z" }) }) })
    ] })
  ] });
};
export {
  tt as SoftPhone
};
