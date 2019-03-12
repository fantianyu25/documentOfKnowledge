/**
 * @file
 * @author fanty@jingoal.com
 *
 * 写文件功能
 */
var VehicleFactory = function(subType, superType){
	if(typeof VehicleFactory[superType] === 'function'){
		// 缓存类
		function F(){}
		// 继承父类的属性和方法
		F.prototype = new VehicleFactory[superType]()
		// 将子类的constructor指向子类
		subType.constuctor = subType
		// 子类原型继承"父类"(父类的一个实例)
		subType.prototype = new F()
	} else {
		// 抛出未创建抽象类的错误
		throw new Error('为创建该抽象类')
	}
}

// 小汽车抽象类
VehicleFactory.Car = function(){
	this.type = 'car'
}

VehicleFactory.Car.prototype = {
	getPrice: function(){
		return new Error('抽象方法不能调用')
	},
	getSpeed: function(){
		return new Error('抽象方法不能调用')
	}
}

// 公共汽车抽象类
VehicleFactory.Bus = function(){
	this.type = 'bus'
}

VehicleFactory.Bus.prototype = {
	getPrice: function(){
		return new Error('抽象方法不能调用，只能重写')
	},
	getPassengerNum: function(){
		return new Error('抽象方法不能调用，只能重写')
	}
}

// 卡车抽象类
VehicleFactory.Truck = function(){
	this.type = 'truck'
}

VehicleFactory.Truck.prototype = {
	getPrice: function(){
		return new Error('抽象方法不能调用，只能重写')
	},
	getTrainload: function(){
		return new Error('抽象方法不能调用，只能重写')
	}
}
