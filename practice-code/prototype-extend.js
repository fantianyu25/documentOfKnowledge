/**
 * @file practice-code/prototype-extend.js
 * @author fanty@jingoal.com
 *
 * 原型的拓展-基于已经存在的对象，克隆出新的对象
 */
function protoExtend() {
  const arg = arguments; // 获取参数
  const len = arg.length; // 获取参数的长度
  const F = function() {}; // 缓存F类
  let i = 0;
  for (; i < len; i++) {
    // 循环遍历参数数组
    for (let property in arg[i]) {
      // 将每个元素中的属性放进缓存类F的原型中
      F.prototype[property] = arg[i][property];
    }
  }
  // 返回类实例
  return new F();
}

const Pengun = protoExtend(
  {
    speed: 10,
    swim: function() {
      console.log("游泳速度" + this.speed);
    }
  },
  {
    run: function(speed) {
      console.log("奔跑速度" + speed);
    }
  },
  {
    jump: function() {
      console.log("上下跳");
    }
  }
);

Pengun.jump();
Pengun.swim();
Pengun.run(20);
