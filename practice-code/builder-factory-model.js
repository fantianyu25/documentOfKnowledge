/**
 * @file practice-code/builder-factory-model.js
 * @author fanty@jingoal.com
 *
 * 建造者模式(复合对象)
 */
// 创建一位人类
const Human = function(param) {
  this.skill = (param && param.skill) || "保密";
  this.hobby = (param && param.hobby) || "保密";
};

// 人类的原型
Human.prototype = {
  getSkill: () => this.skill,
  getHobby: function() {
    return this.hobby;
  }
};

//实例化姓名类
const Named = function(name) {
  let that = this;
  (function(name, that) {
    that.wholeName = name;
    if (that.wholeName.indexOf(" ") > -1) {
      that.firstName = that.wholeName.slice(0, that.wholeName.indexOf(" "));
      that.secondName = that.wholeName.slice(that.wholeName.indexOf(" "));
    }
  })(name, that);
};

// 实例化工作类
const Work = function(work) {
  let that = this;
  (function(work, that) {
    switch (work) {
      case "code":
        that.work = "工程师";
        that.workDescript = "每天沉醉于代码";
        break;
      case "UI":
      case "UE":
        that.work = "设计师";
        that.workDescript = "艺术源于生活，超越生活";
        break;
      case "teach":
        that.work = "教师";
        that.workDescript = "分享也是一种快乐";
        break;
      default:
        that.work = work;
        that.workDescript = "还暂时没有该工作的描述";
    }
  })(work, that);
};

Work.prototype.changeWork = work => {
  this.work = work;
};

Work.prototype.changeDescript = sentence => {
  this.workDescript = sentence;
};

/**
 * 建造者工厂
 * @param name
 * @param work
 * @constructor
 */
const Person = (name, work) => {
  let _person = new Human();
  _person.name = new Named(name);
  _person.work = new Work(work);
  return _person;
};

let people = new Person('cdfdf', 'dfdf')

people.skill
people.work.work
