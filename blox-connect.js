import {html, PolymerElement} from '@polymer/polymer/polymer-element.js';
import {} from './eos.js';

/**
 * `blox-connect`
 * A webcomponent that connects to the EOS blockchain
 *
 * @customElement
 * @polymer
 * @demo demo/index.html
 */
class BloxConnect extends PolymerElement {
  static get template() {
    return html`
      <style>
        :host {
          display: block;
        }
        .selector {
          width: 100%;
          border-color: #d1d5d7;
          -webkit-appearance: none;
          appearance: none;
          -moz-appearance: none;
          -moz-appearance: none;
          line-height: 15px;
          padding: 5px 5px 5px 7px;
          -webkit-padding-end: 25px;
          height: 47px;
          font-size: 15px;
          border: 1px solid #D0D3D7;
          border-radius: 4px;
          background: url(data:image/gif;base64,R0lGODlhEgAWALMAAI2UoJKapXqAiH6DjHyCioyTno+WodHT1X+EjdDR07/BxP///////wAAAAAAAAAAACH5BAEAAAwALAAAAAASABYAAARWMKlJ60wsM7W6/52ibWC5iBpnfmimruH4wi35EQRYz0MQDCyZRwAwGAACzw6mFDJPTuayIxggEINkLPUB+ABB7qdQ0EVp59VUmjat0ZqDZa44jO74fAQAOw==) no-repeat;
          background-position: 99% 50%;
          background-size: 18px 22px;
          outline:0;
          background-color: #F0F1F3;
          text-indent: 15px;
        }
      </style>
      <template is="dom-if" if="{{selector}}">
        <select on-change="_selected" id="select" class="selector">
          <option value="eosNewYork-mainNet">EOS New York - Main Net</option>
          <option value="cryptoLions-testNet">Crypto Lions - Test Net</option>
        </select>
      </template>
    `;
  }
  static get properties() {
    return {
      eos: {
        type: Object,
        notify: true,
        reflectToAttribute: true
      },
      keyProvider: {
        type: String,
        observer: "_connect"
      },
      httpEndpoint: {
        type: String,
        value: "https://api.eosnewyork.io",
      },
      chainId: {
        type: String,
        value: "aca376f206b8fc25a6ed44dbdc66547c36c6c33e3a119ffbeaef943642f0e906"
      },
      selector: {
        type: Boolean,
        value: false,
      },
      expireInSeconds: {
        type: Number,
        value: 480,
      }
    };
  }

  ready() {
    super.ready();
    this._connect();
  }

  _connect(){
    return new Promise((resolve, reject) => {
      const config = {
        keyProvider: this.keyProvider, 
        httpEndpoint: this.httpEndpoint,
        broadcast: true,
        sign: true,
        chainId: this.chainId,
        expireInSeconds: this.expireInSeconds
      }
      this.eos = Eos.Localnet(config)
      resolve(this.eos);
      if(this.keyProvider) {
        console.log('---- CONNECTING ----')
        console.log("key provider:" + this.keyProvider)
        console.log("http Endpoint:" + this.httpEndpoint)
        console.log("broadcast: true")
        console.log("sign: true")
        console.log("chain Id:" + this.chainId)
        console.log("expire In Seconds:" + this.expireInSeconds)
      }
    })
  }

  _selected(){
  this.selected = this.shadowRoot.querySelector('#select').value
    if (this.selected === "eosNewYork-mainNet") {
      this.httpEndpoint = "https://api.eosnewyork.io";
      this.chainId = "aca376f206b8fc25a6ed44dbdc66547c36c6c33e3a119ffbeaef943642f0e906";
    } else if (this.selected === "cryptoLions-testNet") {
      this.httpEndpoint = "https://dev.cryptolions.io:38888";
      this.chainId = "038f4b0fc8ff18a4f0842a8f0564611f6e96e8535901dd45e43ac8691a1c4dca";
    }
    this._connect()
  }

} window.customElements.define('blox-connect', BloxConnect);
