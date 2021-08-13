'use strict';

function _slicedToArray(arr, i) {
  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
}

function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}

function _iterableToArrayLimit(arr, i) {
  var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"];

  if (_i == null) return;
  var _arr = [];
  var _n = true;
  var _d = false;

  var _s, _e;

  try {
    for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) {
      _arr.push(_s.value);

      if (i && _arr.length === i) break;
    }
  } catch (err) {
    _d = true;
    _e = err;
  } finally {
    try {
      if (!_n && _i["return"] != null) _i["return"]();
    } finally {
      if (_d) throw _e;
    }
  }

  return _arr;
}

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;

  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];

  return arr2;
}

function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

module.exports = function () {
  return {
    name: 'babel-plugin-replace',
    visitor: {
      MemberExpression: function MemberExpression(path, state) {
        var _state$opts$objNameMa = state.opts.objNameMap,
            objNameMap = _state$opts$objNameMa === void 0 ? {} : _state$opts$objNameMa;
        var ASTobject = path.get('object');
        Object.entries(objNameMap).forEach(function (_ref) {
          var _ref2 = _slicedToArray(_ref, 2),
              key = _ref2[0],
              value = _ref2[1];

          if (ASTobject.isIdentifier({
            name: key
          })) {
            ASTobject.node.name = value;
          }
        });
      },
      // 变量替换
      StringLiteral: function StringLiteral(path, state) {
        var _state$opts = state.opts,
            _state$opts$variable = _state$opts.variable,
            variable = _state$opts$variable === void 0 ? {} : _state$opts$variable,
            _state$opts$variableS = _state$opts.variableStartsWith,
            variableStartsWith = _state$opts$variableS === void 0 ? '' : _state$opts$variableS;

        if (path.node.value.startsWith(variableStartsWith)) {
          var key = path.node.value.slice(variableStartsWith.length);
          path.node.value = variable[key];
        }
      }
    }
  };
};
