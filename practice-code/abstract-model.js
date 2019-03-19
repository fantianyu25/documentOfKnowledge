/**
 * @file practice-code/abstract-factory-model.js
 * @author fanty@jingoal.com
 *
 *  抽象工厂模式
 */
const VehicleFactory = (subType, superType) => {
  // 判断是否创建这个抽象类
  if (typeof VehicleFactory[superType] === "function") {
    // 缓存类
    function F() {}
    // 原型继承父类的属性和方法
    F.prototype = new VehicleFactory[superType]();
    // 子类的构造函数指向子类
    subType.constructor = subType;
    // 子类原型继承父类
    subType.prototype = new F();
  } else {
    throw new Error("未创建该抽象类");
  }
};

// 创建抽象类
VehicleFactory.Car = function() {
  this.type = "car";
};

VehicleFactory.Car.prototype = {
  getSpeed: () => {
    return new Error("抽象方法不能调用");
  },
  getPrice: () => {
    return new Error("抽象方法不能调用");
  }
};

const BMW = function(speed, price) {
  this.speed = speed;
  this.price = price;
};

VehicleFactory(BMW, "Car");

BMW.prototype.getSpeed = function() {
  return this.speed;
};

BMW.prototype.getPrice = function() {
  return this.price;
};

let car = new BMW(10000, 10);

car.getSpeed();
