/**
 * @file  practice-code/factory-function-model.js
 * @author fanty@jingoal.com
 *
 * 写文件功能 工厂方法模式(安全模式)
 */
const Factory = (type, content) => {
  if (this instanceof Factory) {
    let object = new this[type](content);
    return object;
  } else {
    return new Factory(type, content);
  }
};

Factory.prototype = {
  Java: content => {},
  JavaScript: cotent => {},
  UI: content => {
    this.content = content;
    (content => {
      let div = document.createElement("div");
      div.innerHTML = content;
      div.style.border = "1px solid red";
      document.getElementById("container").appendChild(div);
    })(this.content);
  },
  php: content => {}
};
