!function(e){var t={};function n(r){if(t[r])return t[r].exports;var i=t[r]={i:r,l:!1,exports:{}};return e[r].call(i.exports,i,i.exports,n),i.l=!0,i.exports}n.m=e,n.c=t,n.d=function(e,t,r){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var i in e)n.d(r,i,function(t){return e[t]}.bind(null,i));return r},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=0)}([function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=n(1),i=n(2);setTimeout((function(){var e=new r.Canvas;new i.Snake(10,e).create()}),5e3)},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.Canvas=void 0;var r=function(){function e(){this.width=300,this.height=300,this.canvas=document.getElementById("canvas")}return e.prototype.drawSnake=function(e,t){if(this.canvas.getContext){var n=this.canvas.getContext("2d");n&&(n.fillStyle="rgb(200, 0, 0)",n.fillRect(t.x*e,t.y*e,e,e))}},e}();t.Canvas=r},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.Snake=void 0;var r=function(){function e(e,t){this.width=e,this.canvas=t,this.length=4,this.snake=[],this.direction="right",this.snakeHeadPosition={x:0,y:0}}return e.prototype.create=function(){this.canvas.drawSnake(this.width,this.snakeHeadPosition)},e}();t.Snake=r}]);