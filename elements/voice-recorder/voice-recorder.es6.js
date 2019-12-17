/**
 * Copyright 2019 The Pennsylvania State University
 * @license Apache-2.0, see License.md for full text.
 */
import { LitElement, html, css } from "lit-element/lit-element.js";
import { record } from "vmsg/vmsg.js";

/**
 * `voice-recorder`
 * `LAME bridge`
 *
 * @microcopy - language worth noting:
 *  -
 *
 * @demo demo/index.html
 * @customElement voice-recorder
 */
class VoiceRecorder extends LitElement {
  static get styles() {
    return [
      css`
        :host {
          display: inline-flex;
        }
      `
    ];
  }
  render() {
    return html`
      <button @click="${this.recordState}">
        <iron-icon icon="${this.iconState}"></iron-icon>${this.textState}
      </button>
    `;
  }
  static get properties() {
    return {
      iconState: {
        type: String
      },
      textState: {
        type: String
      },
      recording: {
        type: Boolean
      }
    };
  }
  /**
   * Convention we use
   */
  static get tag() {
    return "voice-recorder";
  }

  /**
   * HTMLElement
   */
  constructor() {
    super();
    this.recording = false;
    import("@polymer/iron-icon/iron-icon.js");
    import("@polymer/iron-icons/av-icons.js");
  }
  recordState(e) {
    this.recording = !this.recording;
  }
  /**
   * LitElement ready
   */
  firstUpdated(changedProperties) {}
  /**
   * LitElement life cycle - property changed
   */
  updated(changedProperties) {
    changedProperties.forEach((oldValue, propName) => {
      if (propName == "recording") {
        if (this[propName]) {
          this.textState = "stop";
          this.iconState = "av:stop";
        } else {
          this.textState = "Record";
          this.iconState = "av:play-arrow";
        }
        // observer to act on the recording piece
        this.toggleRecording(this[propName], oldValue);
      }
    });
  }
  /**
   * Toggle the LAME bridge
   */
  toggleRecording(newValue, oldValue) {
    if (newValue) {
      // need to start...
      const basePath = this.pathFromUrl(decodeURIComponent(import.meta.url));
      record({ wasmURL: basePath + "../../vmsg/vmsg.wasm" }).then(blob => {
        console.log("Recorded MP3", blob);
        this.dispatchEvent(
          new CustomEvent("voice-recorder-recording", {
            value: blob
          })
        );
      });
    }
    // was on now off
    if (oldValue && !newValue) {
      // need to stop
    }
  }
  pathFromUrl(url) {
    return url.substring(0, url.lastIndexOf("/") + 1);
  }
}
customElements.define(VoiceRecorder.tag, VoiceRecorder);
export { VoiceRecorder };