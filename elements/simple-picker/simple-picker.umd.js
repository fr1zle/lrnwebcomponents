!function(e,t){"object"==typeof exports&&"undefined"!=typeof module?t(exports,require("@polymer/polymer/polymer-element.js"),require("@polymer/iron-icon/iron-icon.js"),require("@polymer/iron-icons/iron-icons.js"),require("@lrnwebcomponents/lrn-shared-styles/lrn-shared-styles.js")):"function"==typeof define&&define.amd?define(["exports","@polymer/polymer/polymer-element.js","@polymer/iron-icon/iron-icon.js","@polymer/iron-icons/iron-icons.js","@lrnwebcomponents/lrn-shared-styles/lrn-shared-styles.js"],t):t(e.SimplePicker={},e.polymerElement_js)}(this,function(e,t){"use strict";function n(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function o(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}function i(e,t,n){return t&&o(e.prototype,t),n&&o(e,n),e}function r(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&s(e,t)}function l(e){return(l=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}function s(e,t){return(s=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}function a(e,t){return!t||"object"!=typeof t&&"function"!=typeof t?function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}(e):t}function c(e,t,n){return(c="undefined"!=typeof Reflect&&Reflect.get?Reflect.get:function(e,t,n){var o=function(e,t){for(;!Object.prototype.hasOwnProperty.call(e,t)&&null!==(e=l(e)););return e}(e,t);if(o){var i=Object.getOwnPropertyDescriptor(o,t);return i.get?i.get.call(n):i.value}})(e,t,n||e)}function p(e,t){return t||(t=e.slice(0)),Object.freeze(Object.defineProperties(e,{raw:{value:Object.freeze(t)}}))}function u(){var e=p(['<style is="custom-style" include="lrn-shared-styles">\n  :host .label {\n    padding: 5px 10px;\n    @apply --simple-picker-option-label;\n  }\n</style>\n<iron-icon aria-hidden="true" hidden$="[[_hideIcon(icon)]]" icon$="[[icon]]"></iron-icon> \n<span class$="[[_getSrOnly(hideOptionLabels)]]">[[title]]</span>']);return u=function(){return e},e}var d=function(e){function o(){return n(this,o),a(this,l(o).apply(this,arguments))}return r(o,t.PolymerElement),i(o,[{key:"_hideIcon",value:function(e){return null===this.icon}},{key:"_handleFocus",value:function(){this.dispatchEvent(new CustomEvent("option-focus",{detail:this}))}},{key:"_handleHover",value:function(){this.dispatchEvent(new CustomEvent("option-focus",{detail:this}))}},{key:"_getSrOnly",value:function(e){return!1===e?"label":"label sr-only"}},{key:"ready",value:function(){c(l(o.prototype),"ready",this).call(this);var e=this;this.addEventListener("focus",function(t){e._handleFocus()}),this.addEventListener("mouseover",function(t){e._handleHover()})}},{key:"connectedCallback",value:function(){c(l(o.prototype),"connectedCallback",this).call(this)}}],[{key:"template",get:function(){return t.html(u())}},{key:"properties",get:function(){return{active:{name:"active",type:"Boolean",value:null,reflectToAttribute:!0,observer:!1},icon:{name:"icon",type:"String",value:null,reflectToAttribute:!1,observer:!1},hideOptionLabels:{name:"hideOptionLabels",type:"Boolean",value:!1,reflectToAttribute:!0,observer:!1},id:{name:"order",type:"String",value:null,reflectToAttribute:!0,observer:!1},selected:{name:"selected",type:"Boolean",value:!1,reflectToAttribute:!0,observer:!1},title:{name:"title",type:"String",value:null,reflectToAttribute:!0,observer:!1},value:{name:"label",type:"Object",value:null,reflectToAttribute:!1,observer:!1}}}},{key:"tag",get:function(){return"simple-picker-option"}}]),o}();function h(){var e=p(['\n<style>:host {\n  display: inline-block;\n  position: relative;\n  @apply --simple-picker;\n}\n:host, \n:host #sample, \n:host .rows {\n  margin: 0;\n  padding: 0;\n}\n\n:host([disabled]) {\n  cursor: not-allowed;\n}\n\n:host([hidden]) {\n  display: none;\n}\n:host #sample {\n  display: inline-flex;\n  justify-content: space-between;\n  align-items: center;\n  padding: 2px;\n  border-radius: 2px;\n  background-color: var(--simple-picker-background-color,#ddd);\n  border: 1px solid var(--simple-picker-border-color,black);\n}\n\n:host #icon {\n  transform: rotate(-90deg);\n  transition: transform 0.25s;\n}\n\n:host([expanded]) #icon {\n  transform: rotate(0deg);\n  transition: transform 0.25s;\n}\n\n:host #collapse {\n  display: none;\n  position: absolute;\n  top: calc(var(--simple-picker-swatch-size, 20px)+12px);\n  background-color: var(--simple-picker-background-color,#ddd);\n}\n\n:host([expanded]:not([disabled])) #collapse {\n  display: block;\n} \n\n:host .rows {\n  display: table;\n  border-collapse: collapse;\n  position: absolute;\n  z-index: 1000;\n  outline: 1px solid var(--simple-picker-border-color,black);\n}\n\n:host .row {\n  display: table-row;\n  align-items: stretch;\n}\n\n:host simple-picker-option {\n  z-index: 1;\n  display: table-cell;\n  overflow: hidden;\n  max-height: unset;\n  height: var(--simple-picker-option-size, 24px);\n  min-width: var(--simple-picker-option-size, 24px);\n  line-height: var(--simple-picker-option-size, 24px);\n  color: var(--simple-picker-option-color, black);\n  background-color: var(--simple-picker-option-background-color, white);\n  outline: var(--simple-picker-option-outline, none);\n  transition: max-height 2s;\n}\n\n:host simple-picker-option[selected] {\n  z-index: 50;\n  color: var(--simple-picker-selected-option-color, white);\n  background-color: var(--simple-picker-selected-option-background-color, black);\n  outline: var(--simple-picker-selected-option-outline, none);\n}\n\n:host simple-picker-option[active] {\n  z-index: 100;\n  cursor: pointer;\n  color: var(--simple-picker-active-option-color, white);\n  background-color: var(--simple-picker-active-option-background-color, #0088ff);\n  outline: var(--simple-picker-active-option-outline, none);\n}\n\n:host #sample simple-picker-option {\n  background-color: var(--simple-picker-sample-background-color, transparent);\n  border: none;\n}\n\n:host(:not([expanded])) #collapse simple-picker-option {\n  max-height: 0;\n  transition: max-height 1.5s;\n}\n\n@media screen and (max-width: 600px) {\n  :host {\n    position: static;\n  }\n  :host #collapse {\n    top: 0;\n    margin-top: 0;\n    position: relative;\n  } \n  :host .rows {\n    position: sticky;\n  }  \n}\n</style>\n<div id="listbox"\n  aria-activedescendant$="[[__activeDesc]]" \n  aria-labelledby$="[[ariaLabelledby]]" \n  disabled$="[[disabled]]"\n  label$="[[label]]" \n  role="listbox" \n  tabindex="0">\n  <div id="sample">\n    <simple-picker-option \n      aria-hidden="true" \n      hide-option-labels$="[[hideOptionLabels]]"\n      icon$="[[__selectedOption.icon]]"\n      style$="[[__selectedOption.style]]" \n      title$="[[__selectedOption.alt]]">\n    </simple-picker-option>\n    <span id="icon"><iron-icon aria-hidden="true" icon="arrow-drop-down"></iron-icon></span>\n  </div>\n  <div id="collapse">\n    <div class="rows">\n      <template is="dom-repeat" items="[[options]]" as="row" index-as="rownum">\n        <div class="row">\n          <template is="dom-repeat" items=[[row]] as="option" index-as="colnum">\n            <simple-picker-option \n              active$="[[_isMatch(__activeDesc,rownum,colnum)]]"\n              aria-selected$="[[option.selected]]" \n              hide-option-labels$="[[hideOptionLabels]]"\n              icon$="[[option.icon]]"\n              id$="[[_getOptionId(rownum,colnum)]]"\n              role="option"\n              selected$="[[_isMatch(__selectedDesc,rownum,colnum)]]"\n              on-option-focus="_handleOptionFocus"\n              on-set-selected-option="_handleSetSelectedOption"\n              style$="[[option.style]]" \n              tabindex="-1"\n              title$="[[option.alt]]"\n              value$="[[option]]">\n            </simple-picker-option>\n          </template>\n        </div>\n      </template>\n    </div>\n  </div>\n</div>']);return h=function(){return e},e}window.customElements.define(d.tag,d);var v=function(e){function o(){return n(this,o),a(this,l(o).apply(this,arguments))}return r(o,t.PolymerElement),i(o,[{key:"_getValue",value:function(e){for(var t=null,n=0;n<this.options.length;n++)for(var o=this.options[n],i=0;i<o.length;i++)!0===o[i].selected&&(t=o[i]);return this.$.texture.style.display=null!==t?"none":"block",null!==t?t.value:null}},{key:"_getOptionId",value:function(e,t){return"option-"+e+"-"+t}},{key:"_getValue",value:function(e){return this._getOption(e).value}},{key:"_getOption",value:function(e){var t=this.__selectedDesc.split("-");return this.options[t[1]][t[2]]}},{key:"_isMatch",value:function(e,t,n){return e===this._getOptionId(t,n)}},{key:"_handleListboxClick",value:function(e){this._toggleListbox(!this.expanded)}},{key:"_handleListboxKeydown",value:function(e){var t=this.__activeDesc.split("-"),n=parseInt(t[1]),o=parseInt(t[2]);if(32===e.keyCode)e.preventDefault(),this._toggleListbox(!this.expanded);else if(this.expanded&&[9,35,36,38,40].includes(e.keyCode))if(e.preventDefault(),35===e.keyCode){var i=this.options.length-1,r=this.options[i].length-1;this._goToOption(i,r)}else 36===e.keyCode?this._goToOption(0,0):38===e.keyCode?o>0?this._goToOption(n,o-1):n>0&&this._goToOption(n-1,this.options[n-1].length-1):40===e.keyCode&&(o<this.options[n].length-1?this._goToOption(n,o+1):n<this.options.length-1&&this._goToOption(n+1,[0]))}},{key:"_handleOptionFocus",value:function(e){this._setActiveOption(e.detail.id)}},{key:"_goToOption",value:function(e,t){var n=this._getOptionId(e,t),o=this.shadowRoot.querySelector("#"+n),i=this.shadowRoot.querySelector("#"+this.__activeDesc);null!==o&&(o.tabindex=0,o.focus(),i.tabindex=-1)}},{key:"_setActiveOption",value:function(e){this.__activeDesc=e}},{key:"_setSelectedOption",value:function(e){this.__selectedDesc=e}},{key:"_toggleListbox",value:function(e){if(this.expanded=e,e){var t=this.shadowRoot.querySelector("#"+this.__activeDesc);null!==t&&t.focus()}else this._setSelectedOption(this.__activeDesc)}},{key:"ready",value:function(){c(l(o.prototype),"ready",this).call(this);for(var e=this,t=0;t<this.options.length;t++)for(var n=0;n<this.options[t].length;n++){this.options[t][n].selected&&(this.__activeDesc=this._getOptionId(t,n),this.__selectedDesc=this._getOptionId(t,n))}console.log(this.__activeDesc),this.$.listbox.addEventListener("click",function(t){e._handleListboxClick(t)}),this.$.listbox.addEventListener("keydown",function(t){e._handleListboxKeydown(t)})}},{key:"connectedCallback",value:function(){c(l(o.prototype),"connectedCallback",this).call(this)}}],[{key:"template",get:function(){return t.html(h())}},{key:"properties",get:function(){return{ariaLabelledby:{name:"ariaLabelledby",type:"String",value:null,reflectToAttribute:!1,observer:!1},disabled:{name:"disabled",type:"Boolean",value:!1,reflectToAttribute:!1,observer:!1},expanded:{name:"expanded",type:"Boolean",value:!1,reflectToAttribute:!0,observer:!1},label:{name:"label",type:"String",value:null,reflectToAttribute:!1,observer:!1},options:{name:"options",type:"Array",value:[],reflectToAttribute:!1,observer:!1},hideOptionLabels:{name:"hideOptionLabels",type:"Boolean",value:!1,reflectToAttribute:!1,observer:!1},value:{name:"value",type:"String",value:"_getValue(__selectedDesc)",reflectToAttribute:!1,"read-only":!0,observer:!1},__activeDesc:{name:"__activeDesc",type:"String",value:"option-0-0",reflectToAttribute:!1,observer:!1},__selectedDesc:{name:"__selectedDesc",type:"String",value:"option-0-0",reflectToAttribute:!1,observer:!1},__selectedOption:{name:"__selectedOption",type:"Object",computed:"_getOption(__selectedDesc)",reflectToAttribute:!1,observer:!1}}}},{key:"tag",get:function(){return"simple-picker"}}]),o}();window.customElements.define(v.tag,v),e.SimplePicker=v,Object.defineProperty(e,"__esModule",{value:!0})});
//# sourceMappingURL=simple-picker.umd.js.map