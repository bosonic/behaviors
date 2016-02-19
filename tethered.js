'use strict';

function tethered(element, target, attachment, options) {
  var o = options || {},
      attachHoriz,
      attachVert;

  attachment = attachment || 'bottom center';
  var att = attachment.split(' ');
  attachVert = ['top', 'middle', 'bottom'].indexOf(att[0]) !== -1 ? att[0] : 'bottom';
  attachHoriz = att[1] && ['left', 'center', 'right'].indexOf(att[1]) !== -1 ? att[1] : 'center';

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
    var targetRect = target.getBoundingClientRect(),
        eltRect = element.getBoundingClientRect();
    return {
      x: horizontalPos(eltRect, targetRect),
      y: verticalPos(eltRect, targetRect)
    };
  }

  function horizontalPos(eltRect, targetRect) {
    var targetLeftOffset = targetRect.left + window.pageXOffset - document.documentElement.clientLeft; // offset relative to the document
    switch(attachHoriz) {
      case 'left':
        return attachVert === 'middle' ? Math.round(targetLeftOffset - element.offsetWidth - spacing)
                                       : Math.round(targetLeftOffset - spacing);
      case 'right':
        return attachVert === 'middle' ? Math.round(targetLeftOffset + target.offsetWidth + spacing)
                                       : Math.round(targetLeftOffset + target.offsetWidth - element.offsetWidth + spacing);
      default:
        return targetLeftOffset + (targetRect.width - eltRect.width) / 2;
    }
  }

  function verticalPos(eltRect, targetRect) {
    var targetTopOffset = targetRect.top + window.pageYOffset - document.documentElement.clientTop; // offset relative to the document
    switch(attachVert) {
      case 'top':
        return Math.ceil(targetTopOffset - element.offsetHeight - spacing);
      case 'bottom':
        return Math.round(targetTopOffset + target.offsetHeight + spacing);
      default:
        return targetTopOffset + (targetRect.height - eltRect.height) / 2;
    }
  }

  // get the coordinates of the element relative to the parent element
  function getPosition(elt) {
    throw "Not implemented yet.";
  }
}

//module.exports = tethered;