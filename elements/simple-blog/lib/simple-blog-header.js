import { html, PolymerElement } from "@polymer/polymer/polymer-element.js";
import { store } from "@lrnwebcomponents/haxcms-elements/lib/core/haxcms-site-store.js";
import { autorun, toJS } from "mobx";
/**
 * `simple-blog-header`
 * `A simple blog header to the front of the site`
 * @demo demo/index.html
 */
class SimpleBlogHeader extends PolymerElement {
  /**
   * Store the tag name to make it easier to obtain directly.
   * @notice function name must be here for tooling to operate correctly
   */
  static get tag() {
    return "simple-blog-header";
  }
  constructor() {
    super();
    import("@lrnwebcomponents/haxcms-elements/lib/ui-components/site/site-title.js");
    import("@lrnwebcomponents/haxcms-elements/lib/ui-components/site/site-rss-button.js");
  }
  // render function
  static get template() {
    return html`
      <style>
        :host {
          display: block;
        }
        .teaserimage {
          height: 450px;
          padding: 0;
          margin: 0;
          position: relative;
          overflow: hidden;
          background-color: var(--haxcms-color, black);
        }
        .teaserimage-image {
          transition: all 0.6s linear;
          background-size: cover;
          background-position: center;
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          z-index: 1;
          text-indent: -9999px;
          transform: translate3d(0px, 24px, 0px);
          opacity: 0.8;
          visibility: visible;
        }
        .teaserimage-image:hover {
          opacity: 1;
        }
        .blog-logo {
          width: 120px;
          height: 120px;
          position: absolute;
          margin-top: -60px;
          right: 50%;
          margin-right: -60px;
          background-size: cover;
          border-radius: 50%;
          z-index: 99;
          text-indent: -9999px;
          border: 3px solid #fff;
          background-color: #fff;
          -webkit-box-shadow: 0 1px 1px rgba(0, 0, 0, 0.3);
          -moz-box-shadow: 0 1px 1px rgba(0, 0, 0, 0.3);
          box-shadow: 0 1px 1px rgba(0, 0, 0, 0.3);
        }
        .site-title {
          margin: 0;
          padding: 84px 16px 8px;
          font-size: 50px;
          text-align: center;
          font-weight: 700;
          letter-spacing: -2px;
          outline: 0;
          line-height: 50px;
          word-break: break-word;
          color: #333;
        }
        .blog-description {
          margin: 0 0 20px;
          padding: 0 32px;
          font-size: 18px;
          line-height: 1.5;
          color: #666;
          text-align: center;
          font-weight: 400;
        }
        .custom-links {
          margin: 0 auto 36px;
          text-align: center;
          color: #ccc;
          display: flex;
          justify-content: center;
        }
        site-rss-button {
          margin: 0 4px;
        }
      </style>
      <div class="teaserimage">
        <div
          class="teaserimage-image"
          style\$="background-image: url([[image]]);"
        ></div>
      </div>
      <header class="blog-header">
        <iron-icon class="blog-logo" icon="[[icon]]"></iron-icon>
        <h1 class="site-title">[[title]]</h1>
        <h2 class="blog-description">[[description]]</h2>
        <div class="custom-links">
          <site-rss-button type="atom"></site-rss-button>
          <site-rss-button type="rss"></site-rss-button>
        </div>
      </header>
    `;
  }

  static get properties() {
    return {
      description: {
        type: String
      },
      image: {
        type: String
      },
      icon: {
        type: String
      },
      title: {
        type: String
      }
    };
  }
  connectedCallback() {
    super.connectedCallback();
    this.__disposer = [];
    autorun(reaction => {
      let manifest = toJS(store.manifest);
      this.description = manifest.description;
      this.title = manifest.title;
      this.image = manifest.metadata.image;
      this.icon = manifest.metadata.icon;
      this.__disposer.push(reaction);
    });
  }
  disconnectedCallback() {
    for (var i in this.__disposer) {
      this.__disposer[i].dispose();
    }
    super.disconnectedCallback();
  }
}
window.customElements.define(SimpleBlogHeader.tag, SimpleBlogHeader);
export { SimpleBlogHeader };
