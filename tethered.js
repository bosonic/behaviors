'use strict';

function tethered(element, target, position, options) {
  var o = options || {},
      positionHoriz,
      positionVert;

  position = position || 'bottom center';
  var pos = position.split(' ');
  console.log(pos);


  var spacing = o.spacing || 0;

  element.style.position = 'absolute';
  update();

  //target.parentElement.parentElement.addEventListener('scroll', update);

  function update() {
    move(newPos());
  }

  function move(pos) {
    element.style.top = pos.y + 'px';
    element.style.left = pos.x + 'px';
  }

  function newPos() {
    var targetOffset = getOffset(target),
        targetRect = target.getBoundingClientRect(),
        eltRect = element.getBoundingClientRect();

    var centeringOffset = {
      width: (targetRect.width - eltRect.width) / 2,
      height: (targetRect.height - eltRect.height) / 2
    };

    switch(position) {
      // rounding some of the values are necessary for some browsers (FF, IE) so that there is no spacing between the
      // arrow and the inner div
      case 'left':
        return {
          x: Math.round(targetOffset.left - element.offsetWidth - spacing),
          y: targetOffset.top + centeringOffset.height
        };
      case 'right':
        return {
          x: Math.round(targetOffset.left + target.offsetWidth + spacing),
          y: targetOffset.top + centeringOffset.height
        };
      case 'top':
        return {
          x: targetOffset.left + centeringOffset.width,
          y: Math.ceil(targetOffset.top - element.offsetHeight - spacing)
        };
      default:
        return {
          x: targetOffset.left + centeringOffset.width,
          y: Math.round(targetOffset.top + target.offsetHeight + spacing) // yes, the -1 is a magic value... for FF
        };
    }
  }

  // get the coordinates of the element relative to the document
  function getOffset(elt) {
    var rect = elt.getBoundingClientRect();
    return {
      top: rect.top + window.pageYOffset - document.documentElement.clientTop,
      left: rect.left + window.pageXOffset - document.documentElement.clientLeft
    };
  }

  // get the coordinates of the element relative to the parent element
  function getPosition(elt) {
    throw "Not implemented yet.";
  }
}

//module.exports = tethered;