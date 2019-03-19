/**
 * @file practice-code/prototype-model.js
 * @author fanty@jingoal.com
 *
 * 原型模式-轮播类需求
 */

const LoopImages = function(imgArr, container) {
  this.imgArr = imgArr;
  this.container = container;
};

LoopImages.prototype = {
  createImage: function() {
    console.log("LoopImages createImage function");
  },
  changeImage: function() {
    console.log("LoopImages changeImage function");
  }
};

// 上下滑动切换类
const SlideLoopImg = function(imgArr, container) {
  // 构造函数继承图片轮播类
  LoopImages.call(this, imgArr, container);
};

SlideLoopImg.prototype = new LoopImages();

SlideLoopImg.prototype.changeImage = function() {
  console.log("FadeLoopImg changeImage function");
};

// 渐隐切换类
const FadeLoopImg = function(imgArr, container, arrow) {
  LoopImages.call(this, imgArr, container);
  // 切换箭头私有变量
  this.arrow = arrow;
};

FadeLoopImg.prototype = new LoopImages();
FadeLoopImg.prototype.changeImage = function() {
  console.log("FadeLoopImg changeImage function");
};

const fadeImg = new FadeLoopImg(
  ["01.jpg", "02.jpg", "03.jpg", "04.jpg"],
  "slide",
  ["left.jpg", "right.jpg"]
);

fadeImg.container;
fadeImg.changeImage();
