/**
 * @file practice-code/single-model.js
 * @author fanty@jingoal.com
 *
 * 单例模式
 */

// 只读的单例模式
const Conf = (function() {
  // 私有变量
  const conf = {
    COUNT: 10000,
    MAX_LENGTH: 50,
    MAX_NUM: 500
  };
  // 返回取值器对象
  return {
    get: function(name) {
      return conf[name] ? conf[name] : null;
    }
  };
})(name);

let count = Conf.get("COUNT");

// 惰性单例
const LazySingle = (function() {
  // 缓存单例实例
  let _instance = null;
  // 单例
  function Single() {
    // 定义私有变量和私有方法
    return {
      publicProperty: "1.0",
      publicMethod: function() {}
    };
  }

  // 返回单例接口
  return function() {
    // 未创建单例将创建单例
    if (!_instance) {
      _instance = Single();
    }
    return _instance;
  };
})();

LazySingle().publicProperty
LazySingle().publicMethod()
