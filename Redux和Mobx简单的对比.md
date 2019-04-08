## Redux和Mobx简单的对比
1. Redux的编程方式是函数式，Mobx是面向对象的
2. 数据上来说Redux理想的是immutable，每次都返回一个新的数据，所以Redux是支持数据回溯的; Mobx从始至中都是一份引用；
3. 和Redux相比，使用Mobx的组件可以做到精确更新，这一点得益于Mobx的observable；
 * 相应的Redux是用dispatch进行广播，通过Provider和connect来比对前后差别控制更新力度，有时需要自己写SCU(shouldComponentUdate)；
 * Mobx更加精细一点 