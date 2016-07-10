/**
 * @description 模拟HashMap
 * @class 模拟HashMap
 * @constructor
 */
function HashMap() {
	this.length = 0;
	this.prefix = "js_hashmap_pre_";
	this.trueObj = new Object;
	this.keyObj = new Object;
};

/**
 * @description 向HashMap中添加键值对
 * @param {String} key 键
 * @param {Object} value 值
 * @public
 */
HashMap.prototype.put = function(key, value) {
	if (this.keyObj[key] != null)
		this.trueObj[key] = value;
	else {
		this.trueObj[key] = value;
		this.keyObj[key] = 1;
		this.length++;
	}
};

/**
 * @description 从HashMap中获取value值
 * @param {String} key 键
 * @return {Object} 键对应的值
 * @public 
 */
HashMap.prototype.get = function(key) {
	return this.trueObj[key];
};

/**
 * @description 从HashMap中获取所有key的集合，以数组形式返回
 * @return {Array} HashMap中key的集合
 * @public 
 */
HashMap.prototype.keySet = function() {
	var arrKeySet = new Array();
	var index = 0;
	for ( var strKey in this.keyObj) {
		arrKeySet[index++] = strKey;
	}
	return arrKeySet;
};

/**
 * @description 从HashMap中获取value的集合，以数组形式返回
 * @return {Array} HashMap中value的集合
 * @public
 */
HashMap.prototype.values = function() {
	var arrValues = new Array();
	var index = 0;
	for ( var strKey in this.keyObj) {
		arrValues[index++] = this.trueObj[strKey];
	}
	return arrValues;
};

/**
 * @description 获取HashMap的键值对的数量
 * @return {int} HashMap中键值对的数量
 * @public 
 */
HashMap.prototype.size = function() {
	return this.length;
};

/**
 * @description 删除指定的值
 * @param {String} key 要删除的键
 * @return {Object} key对应的value，如果没找到key对应的value，返回null
 * @public
 */
HashMap.prototype.remove = function(key) {
	if (this.keyObj[key] != null) {
		var obj = this.trueObj[key];
		delete this.keyObj[key];
		delete this.trueObj[key];
		this.length--;
		return obj;
	}
	return null;
};

/**
 * @description 清空HashMap
 * @public
 */
HashMap.prototype.clear = function() {
	this.keyObj = new Object;
	this.trueObj = new Object;
	this.length = 0;
};

/**
 * @description 判断HashMap是否为空
 * @return {Boolean} 不为空返回true 否则返回false
 * @public 
 */
HashMap.prototype.isEmpty = function() {
	return this.length == 0;
};

/**
 * @description 判断HashMap是否存在某个key
 * @param {String} key 要判断的键
 * @return {Boolean}   HashMap中含有key返回true 否则返回false
 * @public 
 */
HashMap.prototype.containsKey = function(key) {
	return this.keyObj[key] != null;
};

/**
 * @description 判断HashMap是否存在某个value
 * @param {Object} value 要判断的值
 * @return {Boolean} HashMap中含有value返回true 否则返回false
 * @public
 */
HashMap.prototype.containsValue = function(value) {
	for ( var strKey in this.trueObj) {
		if (this.trueObj[strKey] == value)
			return true;
	}
	return false;
};

/**
 * @description 把一个HashMap的值加入到另一个HashMap中，参数必须是HashMap
 * @param {HashMap} map 要加入的HashMap
 * @public
 */
HashMap.prototype.putAll = function(map) {
	if (map == null)
		return;
	if (map.constructor != HashMap)
		return;
	var arrKey = map.keySet();
	var arrValue = map.values();
	for ( var i in arrKey) {
		this.put(arrKey[i], arrValue[i]);
	}
};

/**
 * @description toString()方法
 * @return {String}  HashMap的toString字符串值
 * @public 
 */
HashMap.prototype.toString = function() {
	var str = "";
	for ( var strKey in this.keyObj)

	{
		str += strKey + " : " + this.trueObj[strKey] + "\r\n";
	}
	return str;
};