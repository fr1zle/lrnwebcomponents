/**
 * Copyright 2019 The Pennsylvania State University
 * @license Apache-2.0, see License.md for full text.
 */
import { html, PolymerElement } from "@polymer/polymer/polymer-element.js";
import { HAXWiring } from "@lrnwebcomponents/hax-body-behaviors/lib/HAXWiring.js";
import "@lrnwebcomponents/json-editor/json-editor.js";
import "@lrnwebcomponents/code-editor/code-editor.js";
import "@vaadin/vaadin-split-layout/vaadin-split-layout.js";
import "@polymer/paper-button/paper-button.js";
import "@lrnwebcomponents/hax-body/lib/hax-schema-form.js";
/**
 * `haxschema-builder`
 * `dynamically build and visualize HAXschema`
 *
 * @microcopy - language worth noting:
 *  -
 *
 * @customElement
 * @polymer
 * @demo demo/index.html
 */
class HaxschemaBuilder extends PolymerElement {
  // render function
  static get template() {
    return html`
      <style>
        :host {
          display: block;
        }

        :host([hidden]) {
          display: none;
        }
        eco-json-schema-object {
          color: var(--hax-text-color);
          --eco-json-schema-object-form : {
            -ms-flex: unset;
            -webkit-flex: unset;
            flex: unset;
            -webkit-flex-basis: unset;
            flex-basis: unset;
          }
        }
        #form {
          --eco-json-schema-object-form: {
            display: block !important;
          }
        }
      </style>
      <vaadin-split-layout>
        <div>
          <paper-button raised="" noink="">Add to configure</paper-button>
          <paper-button raised="" noink="">Add to advanced</paper-button>
          <code-editor
            id="code"
            show-code-pen
            on-value-changed="_editorDataChanged"
          >
            <template>
              [[haxSchema]]
            </template>
          </code-editor>
          <json-editor
            id="json"
            label="JSON"
            value="[[haxSchema]]"
          ></json-editor>
        </div>
        <div>
          <hax-schema-form
            id="form"
            configure-schema="[[configureSchema]]"
            advanced-schema="[[advancedSchema]]"
            value="{{value}}"
          ></hax-schema-form>
        </div>
      </vaadin-split-layout>
    `;
  }

  // haxProperty definition
  static get haxProperties() {
    return {
      canScale: true,
      canPosition: true,
      canEditSource: false,
      gizmo: {
        title: "Haxschema builder",
        description: "dynamically build and visualize HAXschema",
        icon: "icons:android",
        color: "green",
        groups: ["Builder"],
        handles: [
          {
            type: "todo:read-the-docs-for-usage"
          }
        ],
        meta: {
          author: "btopro",
          owner: "The Pennsylvania State University"
        }
      },
      settings: {
        quick: [
          {
            property: "source",
            description: "",
            inputMethod: "textfield",
            required: true,
            icon: "icons:link",
            validationType: "url"
          }
        ],
        configure: [
          {
            property: "haxSchema",
            description: "",
            inputMethod: "array",
            required: false,
            icon: "icons:android"
          },
          {
            property: "source",
            description: "",
            inputMethod: "textfield",
            required: true,
            icon: "icons:link",
            validationType: "url"
          }
        ],
        advanced: []
      }
    };
  }
  // properties available to the custom element for data binding
  static get properties() {
    return {
      /**
       * schema to extract for whatever you wanted it for
       */
      haxSchema: {
        name: "haxSchema",
        type: "Object",
        value: {}
      },
      /**
       * configure form schema to extract for whatever you wanted it for
       */
      configureSchema: {
        name: "configureSchema",
        type: "Object",
        value: {}
      },
      /**
       * advanced form schema to extract for whatever you wanted it for
       */
      advancedSchema: {
        name: "advancedSchema",
        type: "Object",
        value: {}
      },
      /**
       * Optional remote source to pull in
       */
      source: {
        name: "source",
        type: "String"
      },
      /**
       * String based value passed between the elements to stitch together
       */
      value: {
        name: "value",
        type: "String"
      }
    };
  }

  /**
   * Store the tag name to make it easier to obtain directly.
   * @notice function name must be here for tooling to operate correctly
   */
  static get tag() {
    return "haxschema-builder";
  }
  /**
   * life cycle, element is afixed to the DOM
   */
  connectedCallback() {
    super.connectedCallback();
    this.HAXWiring = new HAXWiring();
    this.HAXWiring.setup(
      HaxschemaBuilder.haxProperties,
      HaxschemaBuilder.tag,
      this
    );
    if (!this.source) {
      this.haxSchema = JSON.stringify(
        this.HAXWiring.prototypeHaxProperties(),
        null,
        2
      );
    }
  }
  /**
   * Notice code editor changes and reflect them into this element
   */
  _editorDataChanged(e) {
    // value coming up off of thiss
    this.haxSchema = e.detail.value;
    let hs = JSON.parse(this.haxSchema);
    for (var key in hs.settings) {
      let schema = this.HAXWiring.getHaxJSONSchema(key, hs);
      this.set(key + "Schema", schema);
    }
  }
  /**
   * life cycle, element is removed from the DOM
   */
  //disconnectedCallback() {}
}
window.customElements.define(HaxschemaBuilder.tag, HaxschemaBuilder);
export { HaxschemaBuilder };