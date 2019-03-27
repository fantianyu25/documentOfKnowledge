## ES6 Promise 对象

1. Promise 是异步编程的一种解决方案，比传统的解决方案**回调函数和事件**更合理强大。
2. Promise简单说是一个容器，里面保存着某个未来才会结束的事件（通常是一个异步操作）的结果。
3. 从语法上说，Promise是一个对象，从它可以获取异步操作的消息。

### Promise的特点
* **对象的状态不受外界影响**
  * Promise 对象代表一个异步操作，有三种状态：pending(进行中)、fulfilled(已成功)、rejected(已失败)
  * 只有异步操作的结果，可以决定当前是哪一种状态，任何其他操作都无法改变这个状态。

* **一旦状态改变，就不会再变，任何时候都可以得到这个结果**
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

```
 promise.then(function(value){
   // 请求完成 处理 success
 }, function(error){
   // failure 错误处理
 })
```  

* then方法可以接受两个回调函数作为参数。
* 第一个回调函数是Promise的 resolved时调用，
* 第二个是Promise的 rejected时调用. 
* 第二个参数是可以选的，不一定要提供
* 这两个函数都接受Promise对象传出的值作为参数

```
  // Promse对象的简单例子
  function timeout(ms){
     return new Promise(function(resolve, reject){
        setTimeout(resolve, ms, 'done')
     })
  }
  
  timeout(100).then(value=>{
     console.log(value)
  })

```
* timeout 方法返回一个Promise实例，表示一段时间以后才会发生的结果
* 过了指定时间(ms参数)以后
* Promise实例的状态变为resolved就会触发then方法绑定的回调函数

```
  // Promise 新建后会立即执行
  let promise = new Promise((resolve, reject)=>{
     console.log('Promise');
     resolve();
  })
  
  promise.then(function(){
     console.log('resolved');
  })
  
  console.log('Hi!')
  
  // Promise
  // Hi!
  // resolved
  
```

* Promise实例新建后会立即执行，所以首先输出Promise
* then方法指定的回调函数，将在当前脚本所有同步任务执行完之后才会执行，所以会resolved最后输出

```
  // 异步加载图片的例子
  function loadImageAsync(url){
    return new Promise((resolve,reject)=>{
       const image = new Image();
       
       image.onload = function(){
         resolve(image)
       }
       
       image.onerror = function(){
         reject(new Error('Could not load image at '+ url))
       }
    }) 
  }
 
```

```
  // ajax操作
  const getJSON = function(url){
     const promise = new Promise((resolve, reject)=>{
        const handler = function() {
           if(this.readyState !== 4) {
              return;
           }
           if(this.status === 200) {
             resolve(this.response);
           } else {
             reject(new Error(this.statusText))
           }
        };
        
        const client = new XMLHttpRequest();
        client.open("GET", url)l
        client.onreadystatechange = handler
        client.responseType = "json";
        client.setRequestHeader('Accept', "application/json");
        client.send();
     });
     return promise;
  }
  
  getJSON("/posts.json").then(function(json){
    console.log('Contents' + json)
  }, function(error){
    console.error('出错了', error)
  })
  
```

上面代码中

* getJSON 是对XMLHttpRequest对象的封装，用于发出一个针对JSON数据的HTTP请求
* 并返回一个Promise对象
* 在getJSON内部，resolve函数和reject函数调用时，都带有参数


* 如果调用resolve函数和reject函数时带有参数，那么它们的参数会被传递给回调函数。
* reject函数的参数通常是Error对象的实例，表示抛出错误
* resolve函数的参数除了正常的值以外，还可能是另一个Promise实例

```
 const p1 = new Promise(function(resolve, reject){
   // ...
 })
 
 const p2 = new Promise(function(resolve, reject){
   // ...
    resolve(p1)
 })
```

* 这里p1和p2都是Promise的实例
* 但是p2的resolve方法将p1作为参数,即一个异步操作的结果返回是另一个异步操作。

* 这个时候，p1的状态就会传递给p2，p1的状态决定了p2的状态。
* p1的状态如果是pending，那么p2的回调函数就会等待p1的状态改变
* 如果p1的状态已经是resolved或者rejected，那么p2的回调函数会马上执行

```
  const p1 = new Promise(function(resolve, reject){
    setTimeout(()=>reject(new Error('fail')), 3000)
  })
  
  const p2 = new Promise(function(resolve, reject){
    setTimeout(()=>resolve(p1), 1000)
  })
  
  p2.then(result => console.log(result)).catch(error=> console.log(error))
  // Error: fail

```

* 上面 p1 是一个Promise，3秒之后变为rejected。
* p2的状态在1秒之后改变,resolve方法返回的是p1。
* 由于p2返回的是另一个Promise，导致p2自己的状态无效，由p1的状态决定p2的状态
* 所以后面then语句变成针对后者(p1)
* 又过了2秒，p1变为rejected，导致出发catch方法指定的毁掉函数

**注意， 调用resolve或reject并不会终结Promise的参数函数的执行**

```
 new Promise((resolve, reject)=>{
    resolve(1);
    console.log(2)
 }).then(r=>{
    console.log(r)
 })
 
 // 2
 // 1
```

* 上面代码中 调用resolve(1)以后，后面的console.log(2) 还是会执行,并且首先打印出来
* 这是因为立即resolved的Promise是本轮事件循环的末尾执行，总是**晚于**本轮循环的同步任务


* 一般来说，调用resolve或reject以后，Promise的使命就完成了，后继操作应该放到then方法里面，而不应该直接写在resolve或reject后面，所以最好在它们前面加上return语句，这样就不会有意外

```
  new Promise((resolve, reject)=>{
    return resolve(1);
    // 后面的语句不会执行
    console.log(2);
  })

```