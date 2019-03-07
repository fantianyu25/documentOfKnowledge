## 工厂模式(一)
### 神奇的魔术师——简单工厂模式

* 简单工厂模式 又叫 静态工厂方法
* 由一个 工厂对象 决定创建某一种 产品对象类 的实例
* 主要用来创建 同一类 对象

好处

* 通过一个函数创建需要的对象，不用关注这些对象到底依赖于哪个基类

举个例子

```
  // 篮球基类
  var Baskethall = function() {
    this.intro = '篮球盛行于美国'
  }
  
  Basketball.prototype = {
     getMember: function() {
       console.log('每个队伍需要5名队员')
     },
     getBallSize: function(){
       console.log('篮球很大')
     }
  }  
  
  // 足球基类
  var Football = function() {
    this.intro = '足球在世界范围内很流行';
  }
  
  Football.prototype = {
    getMember: function() {
       console.log('每个队伍需要11名队员-')
    },
    getBallSzie: function() {
       console.log('足球很大')
    }
  }
  
  // 网球基类
  var Tennis = function() {
      this.intro = '每年有很多网球系列赛'
  }
  
  Tennis.prototype = {
    getMember: function() {
       console.log('每个队伍需要1名队员')
    },
    getBallSzie: function() {
       console.log('网球很小')
    }
  }
  
  // 运动工厂
  var SportFactory = function(name) {
    switch(name) {
       case 'NBA':
          return new Baseketball();
       case 'wordCup':
          return new Football();
       case 'FrenchOpen':
          return new Tennis();   
    }
  }
```

使用的时候

```
 var football = new SportFactor('wordCup');
 console.log(football)
 console.log(football.intro)
 football.getMember()

```

例子2

```
 var PopFactory = function(name) {
   switch(name) {
     case 'alert':
        return new LoginAlert();
     case 'confirm':
        return new LoginConfirm();
     case 'prompt':
        return new LoginPrompt();     
   }
 }
```

* 这种工厂模式不是很完善，有公共的部分是可以抽象提取出来共用的

* 简单工厂模式的理念就是创建对象，对不同的类实例化，也可以用来创建相似对象

例

  * 创建一些书，书与相似的地方，如目录，页码
  * 也有一些不相似的地方， 如书名、出版时间、书的类型等
  * 对于创建的对象相似的地方好处理，不同的属性就要针对性地处理，通过参数传递来处理
 
实例代码

  ```
    // 工厂模式
    function createBook(name, time, type) {
      // 创建一个对象，并对对象拓展属性和方法
      var o = new Object()
      o.name = name
      o.time = time 
      o.type = type
      o.getName = function(){
        console.log(this.name)
      }
      // 将对象返回
      return o
    }
    
    var book1 = createBook('js book', 2014, 'js')
    var book2 = createBook('css book', 2013, 'css')
    
    book1.getName()
    book2.getName()
    
  ```
  
  提示框例子
  
  ```
    // 提示框实例代码
    function createPop(type, text){
     // 创建一个对象，并对对象拓展属性和方法
     var o = new Object()
     o.content = text
     o.show = function() {
       // Todo 显示方法
     }
     
     if(type === 'alert') {
       // 警示框差异部分
     }
     
     if(type === 'prompt') {
       // 提示框差异部分
     }
     
     if(type === 'confirm') {
       // 确认框差异部分
     }
     
     // 将对象返回
     return o
    }
    
    // 创建警示框
    var userNameAlert = createPop('alert', '用户名只能是26个字母和数字')
   
  ```
  
  上面两种简单工厂模式
  
  * 第一种是通过 类实例化对象 建的
  * 第二种是通过 创建一个新的对象，然后包装增强其属性和功能 来实现的
  * 第一种 是通过类创建的对象，如果这些类继承同一个父类，那么父类原型上的方法是可以共用的
  * 第二种 是计生方式创建的对象 都是一个新的个体 所以他们的方法是不能共用的
  * 具体使用哪一种  看需求分析