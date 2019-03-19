## 原型模式——语言之魂
原型模式：用原型实例指向创建对象的类，使用于创建新的对象的**类**共享**原型对象**的属性以及方法。(当然JavaScript是基于原型链实现对象之间的继承，这种继承时基于一种对属性或者方法的共享，而不是对属性和方法的复制)

假设需求：页面中有很多焦点图(网页中很常见的一种图片轮播，切换效果)

最好的实现方式是通过创建对象来一一实现，于是

```
  // 图片轮播类
  var LoopImages = function(imgArr, container){
     this.imagesArray = imgArr        // 轮播图片数组
     this.container = container      // 轮播图片容器
     this.createImage = function(){}  // 创建轮播图片
     this.changeImage = function(){}  // 切换下一张图片
  }
  
```

* 如果页面中有多个这类焦点图，动画也是多样的，可能是上下切换，可能是左右切换 等等。
* 因此创建的轮播图片结构应该是多样化的，切换效果也应该是多样化的，因此我们应该抽象出一个基类，然后让不同特效类去继承这个基类，然后对于差异化的需求通过诚谢这些继承下来的属性或者方法来解决。当然不同的子类之间可能存在不同的结构样式，比如有的包含一个左右切换箭头

实例代码

```
 // 上下滑动切换类
 var SlideLoopImg = function(imgArr, container){
   // 构造函数继承图片轮播类
   LoopImages.call(this, imgArr, container);
   // 重写继承的切换下一张图片方法
   this.changeImage = function() {
      console.log('SlideLoopImg changeImage function');
   }
 }
 
 // 渐隐切换类
 var FadeLoopImg = function(imgArr, container, arrow){
   LoopImages.call(this, imgArr, container)
   // 切换箭头私有变量
   this.arrow = arrow;
   this.changeImage = function(){
      console.log('FadeLoopImg changeImage function');
   }
 }

 // 实例化一个渐隐切换图片类
 var fadeImg = new FadeLoopImg([
 		'01.jpg',
 		'02.jpg',
 		'03.jpg',
 		'04.jpg'
 ], 'slide', [
 		'left.jpg',
 		'right.jpg'
 ]);
 
 fadeImg.changeImage();  // FadeLoopImg changeImage function

```

但是，上面的代码不是最优解决方案
 
>* 将属性和方法都写在基类的构造函数里会有一些问题，比如每次子类继承都要创建一次父类，如果父类的构造函数中创建时存在很多耗时较长的逻辑，或者每次初始化都做一些重复性的东西，性能消耗太大。
>* 所以需要一种共享机制，这样每次创建基类时，对于每次创建的一些**简单而又差异的属性**我们可以放在构造函数中。**消耗资源比较大的方法**放在基类的原型中，可以避免很多不必要的消耗,这也就是原型模式中的一个雏形。
>* 所以**原型模式**就是将可复用的、可共享的、耗时大的从基类中提出来，放在原型中，子类通过组合被继承或者寄生组合式继承将方法和属性继承袭来，对于子类中需要重写的方法进行重写，这样子类创建的对象既有子类的属性和方法也共享了基类的原型方法

上面的理论请结合代码来看

```
  // 原型模式
  // 图片轮播类
  var LoopImages = function(imgArr, container){
    this.imagesArray = imgArr;    // 轮播图片数组
    this.container = container;  // 轮播图片容器
  }
  LoopImages.prototype = {
    // 创建轮播图片
    createImage: function(){
      console.log('LoopImages createImage function');
    },
    // 切换下一张图片
    changeImage: function(){
      console.log('LoopImages changeImage function');
    }
  }
  
  // 上下滑动切换类
  var SlideLoopImg = function(imgArr, container){
    // 构造函数继承图片轮播类
    LoopImages.call(this, imgArr, container);
  }
  
  SlideLoopImg.prototype = new LoopImages();
  // 重写继承的切换下一张图片方法
  SlideLoopImg.prototype.changeImage = function(){
     console.log('SlideLoopImg changeImage function');
  }
  // 渐隐切换类
  var FadeLoopImg = function(imgArr, container, arrow){
     LoopImages.call(this, imgArr, container);
     // 切换箭头私有变量
     this.arrow = arrow;
  }
  FadeLoopImg.prototype =  new LoopImages();
  FadeLoopImg.prototype.changeImage = function(){
      console.log('FadeLoopImg changeImage function');
  }
  
  // 测试用例
  // 实例化一个渐隐切换图片类
  var fadeImg = new FadeLoopImg([
 		'01.jpg',
 		'02.jpg',
 		'03.jpg',
 		'04.jpg'
  ], 'slide', [
 		'left.jpg',
 		'right.jpg'
  ]);
  
  console.log(fadeImg.container);   // slide
  fadeImg.changeImage()             // FadeLoopImg changeImage function
  
```

##### 原型的拓展

* 原型对象是一个共享的对象，那么不论是父类的实例对象或者是子类的继承，都是对它的一个指向引用，所以原型对象才会被共享，
* 既然被共享，那么对原型对象的拓展，不论是子类或者父类的实例对象都会继承下来

```
 LoopImages.prototype.getImageLength = function(){
    return this.imagesArray.length;
 }
 
 FadeLoopImg.prototype.getContainer = function(){
     return this.container;
 }
 
 console.log(fadeImg.getImageLength())   // 4
 console.log(fadeImg.getContainer())      // slide

```

##### 原型继承
* 原型模式更多的是用在堆对象的创建上。
* 比如创建一个实例对象的构造函数比较复杂，或者耗时比较长，或者通过创建多个对象来实现。
* 此时我们最好不要用new关键字去复制这些**基类**，但可以通过对这些**对象属性或者方法**进行复制来实现创建,这是原型模式的最初思想。 
* 如果涉及多个对象，我们可以通过原型模式来实现对新对象的创建，需要一个**原型模式的对象复制方法**

```
 // 原型模式对象复制方法
 /********
  * 基于已经存在的模板对象克隆出新对象的模式
  * arguments[0],arguments[1],arguments[2]: 参数1，参数2，参数3表示模板对象
  * 注意，这里对模板引用类型的属性实质上进行了浅复制(引用类型属性共享)，当然根据需求
  * 可以自行进行深复制(引用类型复制)（深拷贝参考不常见的面试题 递归）
  *******/
  function prototypeExtend(){
     let F = function(){};     // 缓存类，为实例化返回对象临时创建
     let args = argumengts;    // 模板对象参数序列
     let len = args.length;
     let i = 0
     for(;i< len; i++) {
       // 遍历每个模板对象中的属性
       for(let property in args[i]){
         // 将这些属性复制到缓存类原型中
         F.prototype[property] = args[i][property]
       }
     }
     return new F()
  }
  
  
  var penguin = prototypeExtend({
     	speed: 20,
     	swim: function(){
       	console.log('游泳速度'+ this.speed)
     	}
     },{
       run: function(speed){
         console.log('奔跑速度'+ speed)
       }
     },
     {
       jump: function(){
         console.log('跳跃动作')
       }
  	 }
  )
```
因为是通过prototypeExtend 创建的是一个对象，所以无需再用new去创建新的实例对象，直接使用

```
  penguin.swim();     // 游泳速度 20
  penguin.run(10);    // 奔跑速度 10
  penguin.jump();     // 跳跃动作

```

原型模式实质上是一种继承，也是一种创建型模式。

* 原型模式可以让多个对象分享同一个原型对象的属性与方法，这也是一种继承方式
* 不过这种继承的实现是不需要创建的，而是将原型对象分享给那些继承的对象
* 有时候需要让每个继承对象独立拥有一份原型对象，此时我们就需要对原型对象进行复制(prototypeExtend)
* 所以，原型对象更适合在创建复杂的对象时，对于那些需求一直在变化而导致对象结构不停地改变时，将那些**比较稳定的属性与方法**共用而提取的**继承**的实现(初始化对象时将固定的属性和方法放在prototype原型上)
