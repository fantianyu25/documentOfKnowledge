## 工厂方法模式——给我一张名片
工厂方法模式: 

* 通过对**产品类**的**抽象**使其创建业务，主要负责用于**创建多类产品**的实例。  
* 本意是说将实际创建对象工作推迟到子类当中.（在子类当中写具体逻辑代码，Java abstract 抽象类）
* JavaScript中将**工厂方法**看做一个**实例化对象的**工厂类
* 最好使用安全模式类，即给个类型的判断**(this instanceof 类)**

安全模式

```
  var Demo = function(){
    if(!this instanceof Demo){
      return new Demo()
    }
  }
  
  Demo.prototype = {
    show: function(){
      console.log('获取成功')
    }
  }
  
  var d = Demo()
  
  d.show()
  
```

安全的工厂方法

```
  // 安全模式创建的工厂类
  var Factory = fucntion(type, content) {
     if(this instanceof Factory) {
        var s = new this[type](content)
        return s
     } else {
        return new Factory(type, content)
     }
  }
  
  // 工厂原型中设置 创建所有类型数据对象 的基类
  Factory.prototype = {
   Java: function(content) {
     // ......
   },
   JavaScript: function(content) {
    // ......
   },
   UI: function(content) {
     this.content = content;
     (function(content){
        var div = document.createElement('div');
        div.innerHTML = content
        div.style.border = '1px solid red'
        document.getElementById('container').applendChild(div)
     })(content)
   },
   php: function(content) {
     // ......
   }
  }

```
工厂方法模式的好处

1. 如果想添加其他类，不需要修改工厂类，而只需要在工厂类的原型里进行添加所需要的基类即可
2. 好比你在Facroty类的原型里面注册了一张名片，以后需要哪类直接拿着这张名片，查找这上面的信息就能找到这个类了(可以根据参数查找工厂的所需要的类)，不用担心使用时找不到基类
3. 可以轻松创建多个类的实例对象，避免使用者与对象类之间的耦合，用户不必关心创建该对象的具体类，只需要调用工厂方法即可

## 抽象工厂模式——出现的都是幻觉

* 通过对**类的工厂抽象**使其业务用于对**产品类簇**的创建，而不负责创建某一类产品的实例
* 一般用**抽象工厂模式**作为父类来创建一些子类

示例代码

```
 var VehicleFactory = function(subType, superType){
   if(typeof VehicleFactory[superType] === 'function'){
      // 缓存类
      function F(){}
      // 继承父类的属性和方法
      F.prototype = new VehicleFactory[superType]()
      // 将子类的constructor指向子类
      subType.constuctor = subType
      // 子类原型继承"父类"(父类的一个实例)
      subType.prototype = new F()
   } else {
      // 抛出未创建抽象类的错误
      throw new Error('为创建该抽象类')
   }
 }
 
 // 小汽车抽象类
 VehicleFactory.Car = function(){
   this.type = 'car' 
 }
 
 VehicleFactory.Car.prototype = {
   getPrice: function(){
     return new Error('抽象方法不能调用')
   },
   getSpeed: function(){
     return new Error('抽象方法不能调用')
   }
 }
 
 // 公共汽车抽象类
 VehicleFactory.Bus = function(){
   this.type = 'bus'
 }
 
 VehicleFactory.Bus.prototype = {
   getPrice: function(){
     return new Error('抽象方法不能调用，只能重写')
   },
   getPassengerNum: function(){
     return new Error('抽象方法不能调用，只能重写')
   }
 }
 
 // 卡车抽象类
 VehicleFactory.Truck = function(){
   this.type = 'truck'
 }
 
 VehicleFactory.Truck.prototype = {
   getPrice: function(){
     return new Error('抽象方法不能调用，只能重写')
   },
   getTrainload: function(){
     return new Error('抽象方法不能调用，只能重写')
   }
 }
  
```

从上面代码可以看出

* 抽象工厂其实是一个实现子类继承父类的方法
* 在这个方法中我们需要通过传递子类以及要继承父类(抽象类)的名称
* 并且在抽象工厂方法中又增加了一次对抽象类存在性的一次判断，如果存在，则将子类继承父类的方法
* 然后子类通过寄生式继承，不过不是继承父类的原型，而是通过new关键字复制父类的一个实例（这么做的原因是因为过渡类不应仅仅继承父类的原型方法，还要继承父类的**对象属性**，所以要通过new关键字将父类的构造函数执行一遍来复制构造函数中的属性和方法）
* 对抽象工厂添加抽象类也很特殊，因为抽象工厂是个方法不需要实例化对象，所以只需要一份，因此直接为抽象工厂添加类的属性即可

使用方法

```
 // 宝马汽车类
 let BMW = function(price, speed){
   this.price = price;
   this.speed = speed;
 }
 
 // 使用抽象工厂方法继承抽象类‘Car’
 VehicleFactory(BMW,'Car')
 // 重写抽象类的方法
 BMW.prototype.getPrice = function(){
    return this.price
 }
 
 BMW.prototype.getSpeed = function(){
    return this.speed
 }
 
 // 宇通汽车类
 let YUTONG = function(price, passenger) {
   this.price = price;
   this.speed = passenger;
 }
 // 抽象工厂实现对Bus抽象类的继承
 VehicleFactory(YUTONG, 'Bus')
 // 重写抽象类的方法
 YUTONG.prototype.getPrice = function(){
   return this.price
 }
 
 YUTONG.prototype.getPassengerNum = function(){
   return this.passenger
 }
 
 // 奔驰卡车类
 let BenzTruck = function(price, trainload){
   this.price = price;
   this.trainload = trainload;
 }
 
 // 抽象工厂实现对Truck抽象类的继承
 VehicleFactory(BenzTruck, 'Truck')
 // 重写抽象类的方法
 BenzTruck.prototype.getSpeed = function(){
   return this.speed
 }
 
 BenzTruck.prototype.getTrainload = function(){
   return this.trainload
 }
 
 // 实例化
 let car = new BMW(200000, 100)
 console.log(car.getPrice())    // 200000
 console.log(car.type)          // car
```

自己这些代码的过程中

* 抽象工厂方法的意义在于，实现子类对父类（抽象类）的继承，从而继承**抽象类**的属性和方法，对抽象类的方法进行重写，达到复用的目的
* 可以对多个抽象类进行封装，能够方便管理
* 和Java的抽象类达到比较相似的程度

由于更熟悉这个抽象工厂模式，从而自己写了几次，所以更新的比较慢，见谅，主要是想要彻底熟悉了解这个抽象工厂方法

收获：

* 抽象工厂模式是设计模式中最抽象的一种，也是创建模式中唯一一种抽象化创建模式。
* 该模式创建出的结果不是一个真实的对象实例，而是一个类簇(管理多个抽象类)，它制定了类的结构
* 区别于 简单工厂模式 创建单一对象， 工厂方式模式创建多累对象
* 由于JavaScript中不支持抽象化创建与虚拟方法，所以导致这种模式不能像其他面向对象语言中应用得那么广泛

#### 工厂模式主要是为了创建对象实例或者类簇(抽象工厂),关心的是最终产出(创建)的是什么。不关心创建的整个过程，仅仅需要知道最终创建的结果。得到的都是对象实例或者类簇。