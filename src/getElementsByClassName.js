// If life was easy, we could just do things the easy way:
// var getElementsByClassName = function (className) {
//   return document.getElementsByClassName(className);
// };

// You should use document.body, element.childNodes, and element.classList
//classList returns arraylike of classes
//chidlNodes returns arraylike of childs
// But instead we're going to implement it from scratch:

//I:string or array of strings
//0: an array of elements containing className
//C: cannot use native function getElementsByClassName
//E:

var getElementsByClassName = function(className, curElement
) {

  if (!curElement) {
    curElement = document.body;
  }
  var result = [];
  var classes = className.split(' ');

  _.each(classes, function (curClass) {
    if (curElement.classList.contains(curClass)) {
      result.push(curElement);
    }
  });

  if (curElement.children.length !== 0) {
    _.each(curElement.children, function (child) {
      result = result.concat(getElementsByClassName(className, child));
    });
  }
  return result;
};
