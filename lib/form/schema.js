function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

import Shorttext from './widget/shorttext';
import Longtext from './widget/longtext';
import Single from './widget/single';
import Multiple from './widget/multiple';
import Image from './widget/image';

var Schema =
/*#__PURE__*/
function () {
  function Schema() {
    _classCallCheck(this, Schema);
  }

  _createClass(Schema, [{
    key: "component",
    get: function get() {
      return {
        props: {
          data: {
            type: Object
          },
          schema: {
            type: Object
          },
          readonly: {
            type: Boolean,
            default: false
          }
        },
        render: function render(h) {
          if (_typeof(this.schema) !== 'object' || typeof this.schema.type !== 'string') return h('div', {
            class: 'tms-form-schema'
          });
          var widget, comp;

          switch (this.schema.type) {
            case 'shorttext':
              widget = new Shorttext(this.schema);
              break;

            case 'longtext':
              widget = new Longtext(this.schema);
              break;

            case 'single':
              widget = new Single(this.schema, {
                style: {
                  'margin-bottom': '8px'
                }
              });
              break;

            case 'multiple':
              widget = new Multiple(this.schema, {
                style: {
                  'margin-bottom': '8px'
                }
              });
              break;

            case 'image':
              widget = new Image(this.schema);
              break;
          }

          if (widget) comp = h(this.readonly ? widget.viewer : widget.editor, {
            props: {
              formData: this.data
            }
          });else comp = "unknown schema: ".concat(this.schema.type);
          return h('div', {
            class: 'tms-form-schema'
          }, [comp]);
        }
      };
    }
  }]);

  return Schema;
}();

export { Schema };
export default Schema;