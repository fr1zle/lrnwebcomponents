import { LitElement, html } from "lit-element/lit-element.js";
import "@polymer/iron-ajax/iron-ajax.js";
/**
 * `jwt-login`
 * `a simple element to check for and fetch JWTs`
 * @demo demo/index.html
 * @microcopy - the mental model for this element
 * - jwt - a json web token which is an encrypted security token to talk
 * @element jwt-login
 */
class JwtLogin extends LitElement {
  constructor() {
    super();
    this.auto = false;
    this.method = "GET";
    this.body = {};
    this.key = "jwt";
    this.jwt = null;
  }
  /**
   * Handle the last error rolling in
   */
  lastErrorChanged(e) {
    if (e.detail.value) {
      // check for JWT needing refreshed vs busted but must be 403
      console.error(e);
      this.dispatchEvent(
        new CustomEvent("jwt-login-refresh-error", {
          composed: true,
          bubbles: true,
          cancelable: false,
          detail: {
            value: e.detail.value
          }
        })
      );
    }
  }
  /**
   * LitElement
   */
  render() {
    return html`
      <iron-ajax
        reject-with-request
        ?auto="${this.auto}"
        id="request"
        method="${this.method}"
        url="${this.url}"
        handle-as="json"
        content-type="application/json"
        @response="${this.loginResponse}"
        @last-error-changed="${this.lastErrorChanged}"
      >
      </iron-ajax>
    `;
  }

  static get tag() {
    return "jwt-login";
  }

  static get properties() {
    return {
      /**
       * auto, useful for demos
       */
      auto: {
        type: Boolean
      },
      /**
       * refreshUrl to get a new JSON web token
       */
      refreshUrl: {
        type: String,
        attribute: "refresh-url"
      },
      /**
       * where to redirect for a login token if we REALLY are logged out
       */
      redirectUrl: {
        type: String,
        attribute: "redirect-url"
      },
      /**
       * logout url
       */
      logoutUrl: {
        type: String,
        attribute: "logout-url"
      },
      /**
       * url to get the JWT
       */
      url: {
        type: String
      },
      /**
       * Request method
       */
      method: {
        type: String
      },
      /**
       * Optional body, useful when doing posts
       */
      body: {
        type: Object
      },
      /**
       * Key that contains the token in local storage
       */
      key: {
        type: String
      },
      /**
       * JSON Web token to securely pass around
       */
      jwt: {
        type: String
      }
    };
  }
  /**
   * LitElement life cycle - properties changed callback
   */
  updated(changedProperties) {
    changedProperties.forEach((oldValue, propName) => {
      if (propName == "jwt") {
        this._jwtChanged(this[propName], oldValue);
        // notify
        this.dispatchEvent(
          new CustomEvent("jwt-changed", {
            detail: {
              value: this[propName]
            }
          })
        );
      }
    });
  }
  _jwtChanged(newValue, oldValue) {
    if (
      (newValue == null || newValue == "" || newValue == "null") &&
      typeof oldValue !== typeof undefined
    ) {
      // remove this key from local storage bin
      localStorage.removeItem(this.key);
      // jwt was invalid some how
      this.dispatchEvent(
        new CustomEvent("jwt-logged-in", {
          bubbles: true,
          cancelable: true,
          composed: true,
          detail: false
        })
      );
    } else if (newValue) {
      // set the jwt into local storage so we can reference later
      localStorage.setItem(this.key, newValue);
      this.dispatchEvent(
        new CustomEvent("jwt-token", {
          bubbles: true,
          cancelable: true,
          composed: true,
          detail: newValue
        })
      );
      this.dispatchEvent(
        new CustomEvent("jwt-logged-in", {
          bubbles: true,
          cancelable: true,
          composed: true,
          detail: true
        })
      );
    }
  }
  /**
   * HTMLElement
   */
  connectedCallback() {
    super.connectedCallback();
    window.addEventListener(
      "jwt-login-refresh-token",
      this.requestRefreshToken.bind(this)
    );
    window.addEventListener("jwt-login-toggle", this.toggleLogin.bind(this));
    window.addEventListener("jwt-login-login", this.loginRequest.bind(this));
    window.addEventListener("jwt-login-logout", this.logoutRequest.bind(this));
  }
  /**
   * HTMLElement
   */
  disconnectedCallback() {
    window.removeEventListener(
      "jwt-login-refresh-token",
      this.requestRefreshToken.bind(this)
    );
    window.removeEventListener("jwt-login-login", this.loginRequest.bind(this));
    window.removeEventListener("jwt-login-toggle", this.toggleLogin.bind(this));
    window.removeEventListener(
      "jwt-login-logout",
      this.logoutRequest.bind(this)
    );
    super.disconnectedCallback();
  }
  /**
   * LitElement life cycle - ready
   */
  firstUpdated(changedProperties) {
    // set jwt from local storage bin
    this.jwt = localStorage.getItem(this.key);
  }
  /**
   * Request a refresh token
   */
  requestRefreshToken(e) {
    this.__context = "refresh";
    if (e.detail.element) {
      this.__element = e.detail.element;
    }
    this.shadowRoot.querySelector("#request").url = this.refreshUrl;
    this.shadowRoot.querySelector("#request").body = {};
    this.shadowRoot.querySelector("#request").generateRequest();
  }
  /**
   * Request a user login if we need one or log out
   */
  toggleLogin(e) {
    // null is default, if we don't have anything go get one
    if (this.jwt == null) {
      this.loginRequest(e);
    } else {
      this.logoutRequest(e);
    }
  }
  loginRequest(e) {
    this.__context = "login";
    // detail of a login request event is the body which should have
    // the authorization data in it
    this.body = e.detail;
    this.shadowRoot.querySelector("#request").url = this.url;
    this.shadowRoot.querySelector("#request").body = { ...this.body };
    this.shadowRoot.querySelector("#request").generateRequest();
  }
  logoutRequest(e) {
    this.__context = "logout";
    this.__redirect = e.detail.redirect;
    // we were told to logout, reset body
    this.body = {};
    // reset jwt which will do all the events / local storage work
    this.jwt = null;
    this.shadowRoot.querySelector("#request").url = this.logoutUrl;
    this.shadowRoot.querySelector("#request").body = {};
    this.shadowRoot.querySelector("#request").generateRequest();
  }
  /**
   * Login bridge to get a JWT and hang onto it
   */
  loginResponse(e) {
    switch (this.__context) {
      case "login":
        this.jwt = e.detail.response;
        break;
      case "refresh":
        // jwt change events will propagate and do their thing
        this.jwt = e.detail.response;
        // if we had a requesting element, let's let it do its thing
        if (this.__element) {
          this.__element.obj[this.__element.callback](
            this.jwt,
            ...this.__element.params
          );
          this.__element = false;
        }
        break;
      case "logout":
        if (this.__redirect && this.redirectUrl) {
          setTimeout(() => {
            window.location.href = this.redirectUrl;
          }, 100);
        }
        break;
    }
  }
}
window.customElements.define(JwtLogin.tag, JwtLogin);
export { JwtLogin };
