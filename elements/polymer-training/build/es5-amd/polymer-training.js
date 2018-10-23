define([
  "exports",
  "./node_modules/@polymer/polymer/polymer-element.js",
  "./node_modules/@lrnwebcomponents/hax-body-behaviors/lib/HAXWiring.js"
], function(_exports, _polymerElement, _HAXWiring) {
  "use strict";
  Object.defineProperty(_exports, "__esModule", { value: !0 });
  _exports.PolymerTraining = void 0;
  function _templateObject_8beb2f80d70311e896a83f5094247f57() {
    var data = babelHelpers.taggedTemplateLiteral([
      "\n<style>:host {\n  display: block;\n}\n\n:host([hidden]) {\n  display: none;\n}\n</style>\n<slot></slot>"
    ]);
    _templateObject_8beb2f80d70311e896a83f5094247f57 = function() {
      return data;
    };
    return data;
  }
  var PolymerTraining = (function(_PolymerElement) {
    babelHelpers.inherits(PolymerTraining, _PolymerElement);
    function PolymerTraining() {
      babelHelpers.classCallCheck(this, PolymerTraining);
      return babelHelpers.possibleConstructorReturn(
        this,
        (
          PolymerTraining.__proto__ || Object.getPrototypeOf(PolymerTraining)
        ).apply(this, arguments)
      );
    }
    babelHelpers.createClass(
      PolymerTraining,
      [
        {
          key: "connectedCallback",
          value: function connectedCallback() {
            babelHelpers
              .get(
                PolymerTraining.prototype.__proto__ ||
                  Object.getPrototypeOf(PolymerTraining.prototype),
                "connectedCallback",
                this
              )
              .call(this);
            this.HAXWiring = new _HAXWiring.HAXWiring();
            this.HAXWiring.setHaxProperties(
              PolymerTraining.haxProperties,
              PolymerTraining.tag,
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
              _templateObject_8beb2f80d70311e896a83f5094247f57()
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
                title: "Polymer training",
                description: "Automated conversion of polymer-training/",
                icon: "icons:android",
                color: "green",
                groups: ["Training"],
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
            return "polymer-training";
          }
        }
      ]
    );
    return PolymerTraining;
  })(_polymerElement.PolymerElement);
  _exports.PolymerTraining = PolymerTraining;
  window.customElements.define(PolymerTraining.tag, PolymerTraining);
});
