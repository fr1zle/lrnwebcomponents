define([
  "exports",
  "./node_modules/@polymer/polymer/polymer-element.js",
  "./node_modules/@lrnwebcomponents/hax-body-behaviors/lib/HAXWiring.js"
], function(_exports, _polymerElement, _HAXWiring) {
  "use strict";
  Object.defineProperty(_exports, "__esModule", { value: !0 });
  _exports.LrndesignPaperstack = void 0;
  function _templateObject_01834bb0d6fa11e89e5765048b017048() {
    var data = babelHelpers.taggedTemplateLiteral([
      "\n<style>:host {\n  display: block;\n}\n\n:host([hidden]) {\n  display: none;\n}\n</style>\n<slot></slot>"
    ]);
    _templateObject_01834bb0d6fa11e89e5765048b017048 = function() {
      return data;
    };
    return data;
  }
  var LrndesignPaperstack = (function(_PolymerElement) {
    babelHelpers.inherits(LrndesignPaperstack, _PolymerElement);
    function LrndesignPaperstack() {
      babelHelpers.classCallCheck(this, LrndesignPaperstack);
      return babelHelpers.possibleConstructorReturn(
        this,
        (
          LrndesignPaperstack.__proto__ ||
          Object.getPrototypeOf(LrndesignPaperstack)
        ).apply(this, arguments)
      );
    }
    babelHelpers.createClass(
      LrndesignPaperstack,
      [
        {
          key: "connectedCallback",
          value: function connectedCallback() {
            babelHelpers
              .get(
                LrndesignPaperstack.prototype.__proto__ ||
                  Object.getPrototypeOf(LrndesignPaperstack.prototype),
                "connectedCallback",
                this
              )
              .call(this);
            this.HAXWiring = new _HAXWiring.HAXWiring();
            this.HAXWiring.setHaxProperties(
              LrndesignPaperstack.haxProperties,
              LrndesignPaperstack.tag,
              this
            );
          }
        }
      ],
      [
        {
          key: "template",
          get: function get() {
            return (0, _polymerElement.html)(
              _templateObject_01834bb0d6fa11e89e5765048b017048()
            );
          }
        },
        {
          key: "haxProperties",
          get: function get() {
            return {
              canScale: !0,
              canPosition: !0,
              canEditSource: !1,
              gizmo: {
                title: "Lrndesign paperstack",
                description: "Automated conversion of lrndesign-paperstack/",
                icon: "icons:android",
                color: "green",
                groups: ["Paperstack"],
                handles: [{ type: "todo:read-the-docs-for-usage" }],
                meta: {
                  author: "btopro",
                  owner: "The Pennsylvania State University"
                }
              },
              settings: { quick: [], configure: [], advanced: [] }
            };
          }
        },
        {
          key: "properties",
          get: function get() {
            return {};
          }
        },
        {
          key: "tag",
          get: function get() {
            return "lrndesign-paperstack";
          }
        }
      ]
    );
    return LrndesignPaperstack;
  })(_polymerElement.PolymerElement);
  _exports.LrndesignPaperstack = LrndesignPaperstack;
  window.customElements.define(LrndesignPaperstack.tag, LrndesignPaperstack);
});