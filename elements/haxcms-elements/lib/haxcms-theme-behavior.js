/**
 * Copyright 2018 The Pennsylvania State University
 * @license Apache-2.0, see License.md for full text.
 */
import "@lrnwebcomponents/simple-colors/simple-colors.js";
// ensure HAXCMSBehaviors exists
window.HAXCMSBehaviors = window.HAXCMSBehaviors || {};
/**
 * `HAXCMSBehaviors.Theme` streamline hooking themes up to HAXCMS
 *
 * @polymerBehavior HAXCMSBehaviors.Schema
 **/
window.HAXCMSBehaviors.Theme = {
  properties: {
    /**
     * editting state for the page
     */
    editMode: {
      type: Boolean,
      reflectToAttribute: true,
      value: false,
      notify: true
    },
    /**
     * Active item which is in JSON Outline Schema
     */
    activeItem: {
      type: Object,
      notify: true,
      observer: "_activeItemChanged"
    },
    /**
     * a manifest json file decoded, in JSON Outline Schema format
     */
    manifest: {
      type: Object,
      notify: true,
      observer: "_manifestChanged"
    }
  },
  /**
   * Toggle edit mode
   */
  _globalEditChanged: function(e) {
    this.editMode = e.detail;
  },
  /**
   * Notice that active item has changed.
   */
  _activeItemChanged: function(newValue, oldValue) {
    if (newValue && typeof newValue.id !== typeof undefined) {
      this.fire("json-outline-schema-active-item-changed", newValue);
      if (typeof newValue.title !== typeof undefined) {
        document.title = this.manifest.title + " - " + newValue.title;
      } else {
        document.title =
          this.manifest.title + " - " + this.manifest.description;
      }
    } else {
      document.title = this.manifest.title + " - " + this.manifest.description;
    }
  },
  /**
   * See if we need to update to match state if something external
   * to the theme makes a change in the active item globally
   */
  _activeItemUpdate: function(e) {
    this.set("activeItem", e.detail);
    this.notifyPath("activeItem.*");
  },
  /**
   * Setup HAX theme common design needs at a data layer
   */
  setupHAXTheme: function(load = true, injector = this.$.contentcontainer) {
    if (load) {
      document.body.addEventListener(
        "haxcms-edit-mode-changed",
        this._globalEditChanged.bind(this)
      );
      document.body.addEventListener(
        "json-outline-schema-changed",
        this._manifestUpdate.bind(this)
      );
      document.body.addEventListener(
        "haxcms-active-item-changed",
        this._activeItemUpdate.bind(this)
      );
      document.body.addEventListener(
        "haxcms-trigger-update",
        this._triggerUpdate.bind(this)
      );
      // this implies there's the possibility of an authoring experience
      if (typeof window.cmsSiteEditor !== typeof undefined) {
        window.cmsSiteEditor.requestAvailability(this, injector);
      }
    } else {
      document.body.removeEventListener(
        "haxcms-active-item-changed",
        this._activeItemUpdate.bind(this)
      );
      document.body.removeEventListener(
        "json-outline-schema-changed",
        this._manifestUpdate.bind(this)
      );
      document.body.removeEventListener(
        "haxcms-edit-mode-changed",
        this._globalEditChanged.bind(this)
      );
      document.body.removeEventListener(
        "haxcms-trigger-update",
        this._triggerUpdate.bind(this)
      );
    }
  },
  /**
   * refreshed data call
   */
  _triggerUpdate: function(e) {
    this.fire("json-outline-schema-active-item-changed", {});
  },
  /**
   * react to manifest being changed
   */
  _manifestUpdate: function(e) {
    this.set("manifest", e.detail);
    this.notifyPath("manifest.*");
  },
  /**
   * Manifest has changed
   */
  _manifestChanged: function(newValue, oldValue) {
    if (typeof newValue.title !== typeof undefined) {
      document.title = this.manifest.title + " - " + this.manifest.description;
    }
    if (
      typeof newValue.metadata !== typeof undefined &&
      typeof newValue.metadata.cssVariable !== typeof undefined
    ) {
      // json outline schema changed, allow other things to react
      // fake way of forcing an update of these items
      let color = this.manifest.metadata.cssVariable.replace(
        "--simple-colors-",
        ""
      );
      let ary = color.split("-");
      if (ary.length == 2) {
        color = ary[0];
        this.accentColor = color;
      } else if (ary.length == 3) {
        color = ary[0] + " " + ary[1];
        this.accentColor = color;
      }
      // set this directly instead of messing w/ accentColor
      let haxcmscolor = "";
      if (window.ShadyCSS) {
        haxcmscolor = ShadyCSS.getComputedStyleValue(
          this,
          this.manifest.metadata.cssVariable
        );
      } else {
        haxcmscolor = getComputedStyle(this).getPropertyValue(
          this.manifest.metadata.cssVariable
        );
      }
      document.body.style.setProperty("--haxcms-color", haxcmscolor);
      this.updateStyles({ "--haxcms-color": haxcmscolor });
    }
  }
};
