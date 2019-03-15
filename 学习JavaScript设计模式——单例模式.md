##单例模式——一个人的寂寞
单例模式：又称为单体模式，是只允许实例化一次的对象类。有时我们也用一个对象来规划一个命名空间，井井有条地管理对象上的属性和方法。

* 单例模式是JavaScript中最常见的一种模式，这种模式经常为我们提供一个命名空间。如我们使用过的jQuery库，单例模式就为它提供了一个命名空间jQuery。
* 命名空间就是人们所说的namespace，有人也叫它名称空间。
* 它解决这么一类问题：为了让代码更易懂，不同的人定义的变量使用的单词名称很有可能重复，此时就需要用命名空间来约束每个人定义的变量来解决这类问题。

例如

```
  var Ming = {
    g: function(id){
      return document.getElementById(id)
    },
    css: function(id, key, value){
      // 简单样式属性设置
      this.g(id).style[key] = value;
    }
    // ...
  }
```

单例模式还有一个作用：就是通过单例模式来管理代码库的各个模块

创建一个小型代码库

```
  var A = {
     Util: {
       util_method1: function(){},
       util_method2: function(){}
     },
     Tool: {
       tool_method1: function(){},
       tool_method2: function(){}
     },
     Ajax: {
       get: function(){},
       post: function(){}
     },
     others: {
       // ...
     }
     
     // ...
  }
  
  // 使用的时候
  A.Util.util_method2()
  A.Tool.tool_method1()
  A.Ajax.get()
```

通过单例模式创建无法修改的静态变量

* 本身JavaScript里是没有static这类关键字的，所以如果要定义，就需要将变量放在一个函数内部
* 通过特权方法访问，并且不提供复制变量的方法，只提供获取变量的方法
* 让创建的函数执行一次,此时我们创建的对象内保存静态变量通过取值器访问，最后将这个对象作为一个单例放在全局空间里作为静态变量单例对象供他人使用

```
  var Conf = (function(){
    // 私有变量
    var conf = {
        MAX_NUM: 100,
        MIN_NUM: 1,
        COUNT: 1000
    }
    // 返回取值器对象
    return {
      // 取值器方法
      get: function(name){
        return conf[name] ? conf[name] : null
      }
    }
  })()

 var count = Conf.get('COUNT')
 console.log(count)    // 1000
```

#### 惰性单例————延迟创建的形式(惰性创建)

```
// 惰性载入单例
var LazySingle = (function(){
   // 单例实例引用
   var _instance = null;
   // 单例
   function Single(){
    /*这里定义私有属性和方法*/
    return {
     puiblicMethod: function(){},
     publicProperty: '1.0'
    }
   }
   // 获取单例对象接口
   return function(){
      // 如果未创建单例 将 创建单例
      if(!_instance){
         _instance = Single()
      }
      // 返回单例
      return _instance;
   }
})()

console.log(LazySingle().publicProperty)  // 1.0
```

总结

* 单例模式有时也被称为单体模式,它是一个只允许实例化一次的对象类,有时候这么做也是为了节省系统资源
* 当然JavaScript中单例模式经常作为**命名空间对象**来实现
* 通过单例对象，我们可以将各个模块的代码井井有条地梳理在一起
* 所以如果你想让系统中只存在一个对象，那么单例模式则是最佳解决方案

之前的工厂模式， 创建者模式，原型模式，和今天的单例模式，都是创建型设计模式。后面开始就是 结构型设计模式了。