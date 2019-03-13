## 建造者模式——分即是合
建造者模式: 将一个复杂对象的**构建层**与其**表示层**相互分离，同样的构造过程可采用不同的表示。

对比

 * 工厂模式主要是为了创建对象实例或者类簇(抽象工厂),关心的是最终产出(创建)的是什么
 * 工厂模式不关心创建的整个过程，仅仅需要知道最终的创建结果，通过工厂模式得到的都是对象实例或者类簇

 * 建造者模式在创建对象时更为复杂，虽然目的也是为了创建对象，但是这个模式更多关心的是创建这个对象的整个过程(比如创建一个人，我们创建的结果不仅仅是要得到人的实例，还要关注创建人的时候，这个人应该穿什么衣服，男的还是女的，兴趣爱好都是什么), 所以建造者模式更注重的是创建的的细节。

 * 比如在发布简历的需求中，我们需要的不仅仅是应聘者的一个实例，还要在创建过程中注意一下这位应聘者都有哪些兴趣爱好、他的姓名等信息，他所期望的职位是什么，等等，这些细节关注点都需要我们创建。

 首先，需要的人类的类，和人类的姓名类、职位类等(在类里使用闭包，可以让这个闭包既是闭包，又是这个类的构造函数)
 
 ```
   // 创建一位人类
   var Human = function(param){
      // 技能
      this.skill = param && param.skill || '保密'；
      // 兴趣爱好
      this.hobby = param && param.hobby || '保密'
   }
   
   // 人类类的原型
   Human.prototype = {
     getSkill: function(){
        return this.skill
     },
     getHobby: function(){
        return this.hobby
     }
   }
   
   // 实例化姓名类
   var Named = function(name){
       var that = this;
       // 构造器
       // 构造函数解析姓名的姓与名
       (function(name, that){
          that.wholeName = name  // 缓存这个name
          if(name.indexOf(' ')> -1){
            that.firstName = that.wholeName.slice(0, that.wholeName.indexOf(' '));
            that.secondName = that.wholeName.slice(that.wholeName.indexOf(' '))
          }
       })(name, that)
   }
   
   // 实例化职位类
   var Work = function(work){
     var that = this
     // 构造器
     // 构造函数中通过传入的职位特征来设置相应职位以及描述
     (function(work,that){
       switch(work){
         case 'code':
           that.work = '工程师';
           that.workDescript = '每天沉醉于编程';
           break;
         case 'UI':
         case 'UE':
           that.work = '设计师';
           that.workDescript = '设计更似一种艺术';
           break;
         case 'teach':
           that.work = '教师';
           that.workDescript = '分享也是一种快乐';
           break;
         default:
           that.work = work;
           that.workDescript = '对不起，我们还不清楚您所选择职位的相关描述'；  
       } 
     })(work, that)
   }
   
   // 更换期望的职位
   Work.prototype.changeWork = function(work){
     this.work = work
   }
   
   // 添加更换职位的描述
   Work.prototype.changeDescript = function(setence){
     this.workDescript = setence
   }
   
 ```
 * 我们就创建了抽象出来的三个类——应聘者类、姓名解析类与期望职位类
 
 * 接着就使用**创建者模式**创建一位应聘者，使用建造者类，通过对这3个类组合调用，就可以创建出一个完整的应聘者对象。
  实例代码

 ```
  /****
   * 应聘者建造者
   * 参数 name: 姓名(全名) 空格分隔姓名
   * 参数 work: 期望职位
   **/
   var Person = function(name, work){
     // 创建应聘者缓存对象
     var _person = new Human();
     // 创建应聘者姓名解析对象
     _person.name = new Named(name);
     // 创建应聘者期望职位
     _person.work = new Work(work);
     // 将创建的应聘者对象返回
     return _person;
   }
 ```
 
 * 在上面代码中 我们分成了三个部分来创建一位应聘者对象
 * 首先创建一位应聘者缓存对象，缓存对象需要修饰(添加属性和方法)
 * 然后我们向缓存对象添加姓名
 * 最后添加一个职位，最终我们就可得到一位完整的应聘者

测试代码

```
 var person = new Person('Sun Wukong', 'code');
 
 console.log(person.skill)              // 保密
 console.log(person.name.firstName)     // Sun
 console.log(person.work.work)          // 工程师
 console.log(person.work.workDescript)  // 每一天在编程中度过
 person.work.changeDescript('更改一下职位描述！')
 console.log(person.work.workDescript)  // 更改一下职位描述！
 
```
总结

* 工厂模式创建出来的是一个对象，追求的是创建的结果，是一个实实在在的创建结果(实例化始终是一个类的对象或者单一的继承(抽象工厂方法))
* 创建者模式有所不同，不仅可以得到创建的结果，也参与了创建的具体过程，对于创建的具体实现的细节也参阅了干涉，创建的对象更复杂，这种模式创建的对象是一个复合对象(很像Java中一些复合类的实现)

注意

* 工厂模式创建的结果都是一个完整的个体，过程我们并不关心，只得到创建结果对象。
* 创建者模式中我们要关系对象创建的过程，通常会把创建对象的类模块化，好处是，使被创建的类的每一个模块都可以得到灵活的运用与高质量的复用，
* 但是最终需求是要得到一个完整的个体，所以在拆分创建的整个过程，我们还是会得到一个统一的结果
* 这种方式对于整体对象类的拆分无形中增加了结构的复杂性，因此如果对象粒度很小，或者模块间的复用率很低并且变动不大，我们最好还是要创建整体对象

这篇文字有点多，需要尽力去理解，还要对照前面的工厂模式来看
 