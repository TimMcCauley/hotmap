(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{794:function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,"default",(function(){return Tree}));__webpack_require__(2);var phylocanvas__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__(792),phylocanvas__WEBPACK_IMPORTED_MODULE_1___default=__webpack_require__.n(phylocanvas__WEBPACK_IMPORTED_MODULE_1__);__webpack_require__(793);function _defineProperties(target,props){for(var descriptor,i=0;i<props.length;i++)(descriptor=props[i]).enumerable=descriptor.enumerable||!1,descriptor.configurable=!0,"value"in descriptor&&(descriptor.writable=!0),Object.defineProperty(target,descriptor.key,descriptor)}var Tree=function(){function Tree(params){return function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor))throw new TypeError("Cannot call a class as a function")}(this,Tree),this.ele=params.ele,this.margin=params.margin,this.newick=params.newick,this.width=params.width,this.height=params.height,this.tree=this.init(),this}return function _createClass(Constructor,protoProps,staticProps){return protoProps&&_defineProperties(Constructor.prototype,protoProps),staticProps&&_defineProperties(Constructor,staticProps),Constructor}(Tree,[{key:"init",value:function init(){var container=this.container=this.ele.querySelector(".tree");container.style.top=this.margin.top-10+"px",container.style.marginLeft="30px";var tree=phylocanvas__WEBPACK_IMPORTED_MODULE_1___default.a.createTree(container);return tree.load(this.newick),tree.padding=0,tree.setNodeSize(0),tree.alignLabels=!0,tree.lineWidth=3,tree.shiftKeyDrag=!0,tree.disableZoom=!0,tree.setTreeType("rectangular"),tree}},{key:"setWidth",value:function setWidth(width){this.container.style.width="".concat(width,"px"),this.tree.canvas.width=width,this.tree.resizeToContainer(),this.tree.draw(!0)}},{key:"setHeight",value:function setHeight(height){height+=40,this.container.style.height="".concat(height,"px"),this.tree.canvas.height=height,this.tree.resizeToContainer(),this.tree.draw(!0)}}]),Tree}()}}]);
//# sourceMappingURL=hotmap-tree.f5717359bc9e5437d858.bundle.js.map