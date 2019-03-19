/**
 * @file practice-code/simple-factory-model/js
 * @author fanty@jingoal.com
 *
 * 简单工厂模式
 */

const Basketball = () => {
  this.intro = "篮球盛行于美国";
};

Basketball.prototype = {
  getMember: () => {
    console.log("每个队伍需要5名球员");
  },
  getBallSize: () => {
    console.log("篮球很大");
  }
};

const Football = () => {
  this.instro = "足球在世界范围内盛行";
};

Football.prototype = {
  getMember: () => {
    console.log("每个队伍需要11名队员");
  },
  getBallSize: () => {
    console.log("足球很大");
  }
};

const Tennis = () => {
  this.intro = "每年有很多网球系列赛";
};

Tennis.prototype = {
  getMember: () => {
    console.log("每个队伍需要1名队员");
  },
  getBallSize: () => {
    console.log("网球很小");
  }
};

/**
 * 第一种工厂模式
 * @param name
 * @return {*}
 * @constructor
 */
const SportsFactory = name => {
  switch (name) {
    case "NBA":
      return new Basketball();
    case "worldCup":
      return new Football();
    case "FrenchOpen":
      return new Tennis();
  }
};

const SportsFactory = (name, intro, member, ballSize) => {
  let object = new Object();
  object.name = name;
  object.intro = intro;
  object.getMember = () => {
    console.log(member);
  };
  object.getBallSize = () => {
    console.log(ballSize);
  };
  return object;
};
