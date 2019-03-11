/**
 * @file
 * @author fanty@jingoal.com
 *
 * 写文件功能
 */
function add() {
	// 第一次执行时获取所有参数
	let _args = Array.prototype.slice.apply(arguments) || Array.from(arguments);

	// 根据闭包的特性，数据可以在闭包里存储在js内存中, 收集后面所有参数
	let _add = function() {
		_args.push(...arguments);

		return _add;
	};

	// 最后通过toString或者valueOf的隐式转换获取最终结果
	_add.toString = function() {
		return _args.reduce((p, n) => p + n);
	};

	_add.valueOf = function() {
		return _args.reduce((p, n) => p + n);
	};

	return _add
}
