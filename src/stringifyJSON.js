// this is what you would do if you liked things to be easy:
// var stringifyJSON = JSON.stringify;

// but you don't so you're going to write it from scratch:
//I: object, number, array, null
//O: string
//C: undefined, functions
//E:

var stringifyJSON = function(obj) {
  // your code goes here
  var result = '';
  var isObject = typeof obj === 'object' && obj !== null;

  var stringValue = function(value) {
    if (typeof value === 'string') {
      result += '"' + value + '"';
    }
    if (typeof value === 'number' && !isNaN(value)) {
      result += value.toString();
    }
    if (typeof value === 'boolean') {
      value ? result += 'true' : result += 'false';
    }
    if (typeof value === 'object' && value === null) {
      result += 'null';
    }
    if (typeof value === 'function' || typeof value === 'undefined') {
      result += '';
    }
  };

  stringValue(obj);

  if (isObject) {
    if (Array.isArray(obj)) {
      result += '[';
      _.each(obj, function (curValue, index) {
        if (typeof curValue === 'object' && curValue !== null) {
          result += stringifyJSON(curValue);
        } else {
          stringValue(curValue);
        }
        if (obj.length - 1 !== index) {
          result += ',';
        }
      });
      result += ']';
    } else {
      result += '{';
      var keys = Object.keys(obj);
      _.each(keys, function(key, index) {
        if (typeof obj[key] !== 'undefined' && typeof obj[key] !== 'function') {
          stringValue(key);
          result += ':';
          if (typeof obj[key] === 'object' && obj[key] !== null) {
            result += stringifyJSON(obj[key]);
          }
          stringValue(obj[key]);
          if (keys[keys.length - 1] !== key) {
            result += ',';
          }
        }
        /*stringValue(key);
        result += ':';
        if (typeof obj[key] === 'object' && obj[key] !== null) {
          result += stringifyJSON(obj[key]);
        }
        stringValue(obj[key]);
        if (keys[keys.length - 1] !== key) {
          result += ',';
        }
        */
      });
      /*for (key in obj) {
        stringValue(key);
        result += ':';
        if (typeof obj[key] === 'object' && obj[key] !== null) {
          result += stringifyJSON(obj[key]);
        }
        stringValue(obj[key]);
        if (key !== _.keys(obj)[obj.length - 1]) {
          result += ',';
        }
      }*/
      result += '}';
    }
  }
  return result;
};
