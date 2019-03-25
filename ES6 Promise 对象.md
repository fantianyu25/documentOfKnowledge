## ES6 Promise 对象

1. Promise 是异步编程的一种解决方案，比传统的解决方案**回调函数和事件**更合理强大。
2. Promise简单说是一个容器，里面保存着某个未来才会结束的事件（通常是一个异步操作）的结果。
3. 从语法上说，Promise是一个对象，从它可以获取异步操作的消息。

### Pomise的特点
* 对象的状态不受外界影响。
  * Promise 对象代表一个异步操作，有三种状态：pending(进行中)、fulfilled(已成功)、rejected(已失败)
  * 只有异步操作的结果，可以决定当前是哪一种状态，任何其他操作都无法改变这个状态。

* 一旦状态改变，就不会再变，任何时候都可以得到这个结果。
  * Promise对象的状态改变，只有两种可能，从pending变为fulfilled 和 从pending 变为rejected.
  * 只要这两种情况发生，状态就凝固了，不会再变了，会一直保持这个结果，这是就称为resolved(已定型)。
  * 如果改变已经发生了，你再对Promise对象添加回调函数，也会立即得到这个结果。这与事件(Event)完全不同，事件的特点是，如果你错过它，再去监听，是得不到结果的。

  后面resolved 统一只指fulfilled状态，不包含rejected状态
  
  
  * 有了Promise对象，就可以将异步操作以同步操作的流程表达出来，避免了层层嵌套的回调函数。此外，Promise对象提供统一的接口，使得控制异步操作更加容易。
  * Promise的缺点 , 1. 无法取消Promise  2. 如果不设置回调函数,Promise内部抛出的错误，不会反应到外部 3. 当处于pending状态时，无法得知目前进展到哪一个阶段
  
  

### Promise基本用法
  
* Promise对象是一个构造函数，用来生成Promise实例。
  
  ```
    // 创造了一个promise实例
    
    const promise = new Promise(function(resolve,reject){
      // Todo: 异步操作
      ...
      if(/* 异步操作成功 */) {
         resolve(value)
      } else {
         reject(error)
      }
    })
  
  ```
  
* Promise构造函数接受一个函数作为参数，该函数的两个参数分别是resolve和reject.
  * resolve函数 将 Promise对象的状态从pending(未完成)变为resolved(成功),在异步操作成功时调用，并将异步操作的结果，作为参数传递出去
  * reject函数, 将 Promise对象的状态从pending(未完成)变为reject(失败),在异步操作失败时调用，并将异步操作报出的错误作为参数传递出去


* Promise实例生成以后，可以用then方法分别指定resolved和rejected状态的回调函数
*   