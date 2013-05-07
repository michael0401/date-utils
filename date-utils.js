/* ===================================================
 * date-utils.js v0.01
 * https://github.com/rranauro/boxspringjs
 * ===================================================
 * Copyright 2013 Incite Advisors, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ========================================================== */

/*jslint newcap: false, node: true, vars: true, white: true, nomen: true  */
/*global _: true */

(function(global) {
	"use strict";
	var dateUtils;
	
	if (typeof exports !== 'undefined') {
		dateUtils = exports;
	} else {
		dateUtils = global.dateUtils = {};
	}

	var date = function(o) {
		var that = o || {}
		, map = {
			'jan': 0, 'feb': 1, 'mar': 2, 'apr': 3, 'may': 4, 'jun': 5,
			'jul': 6, 'aug': 7, 'sep': 8, 'oct': 9, 'nov': 10, 'dec': 11
		}
		, formats = [
			'dd/mm/yyyy', 'mm/dd/yyyy', 'yyyy/mm/dd', 'yyyy/dd/mm',
			'dd-mm-yyyy', 'mm-dd-yyyy', 'yyyy-mm-dd', 'yyyy-dd-mm',
			'mm-yyyy', 'mm yyyy', 'mm/yyyy', 'mm dd yyyy', 'yyyy mm dd', 'day yyyy mm dd' ]
		, separator
		, template = function (v) {
			var obj = v || this.dateValue;

			return({
				'yyyy': obj.getFullYear(),
				'mm': obj.getMonth(),
				'dd': obj.getDate(),
				'day': obj.getDay(),
				'time': obj.toTimeString().split(' ')[0]				
			});
		};
		that.template = template;

//console.log('making date for', that.dateIn);
		// if no dateIn supplied, use the system date and proper format;
		if (!that.dateIn)  {
			that.format = 'day yyyy mm dd';
			that.dateValue = new Date();
			that.dateIn = that.dateValue.toString();
		} else if (_.isArray(that.dateIn)) {
			that.format = (o && o.format) || 'yyyy mm dd';
			that.dateValue = new Date(_.map(that.dateIn, function(x) { return _.toInt(x); }));
			that.dateValue.setMonth(that.dateValue.getMonth()+1);
		} else if (_.isObject(that.dateIn)) {
			that.dateValue = that.dateIn;
			that.format = 'yyyy mm dd';
		} else {
			that.dateValue = new Date(that.dateIn);
			// if no format provided, then date object will think month is zero-based and decrement
			// application must adapt
			if (!that.format) {
				that.dateValue.setMonth(that.dateValue.getMonth()+1);				
			}
			that.format = (o && o.format) || 'yyyy mm dd';
		}
		// check that application supplied a valid date
		if (_.fetch(formats, that.format) === -1) {
			throw '[ date ] - unrecognized date format ' + that.format;
		}

		// get the separator for the date format
		var getSeparator = function (f) {
			var separator
				, temp = [];
			[ '/', '-', ' '].forEach(function(sep) {
				if (temp.length < 2) {
					separator = sep;
					temp = f.split(separator);
				}
			});
			return separator;				
		};
		// get the format separator character
		separator = getSeparator(that.format);

		// What it does: method to return a date as an array [yyyy, mm, dd ] .concat([ time ])
		var key = function (f) {
			var fmt = f || this.format
			, sepchar = getSeparator(fmt)
			, local = this;

			return _.map((fmt || 'yyyy mm dd').split(sepchar), function(part) {
				return local.template()[part];
			});
		};
		that.key = key;

		// What it does: Joins the value of 'today' using deciphered 'separator' to form
		// the date format string. And, reformats numeric 'mm' to string
		var print = function (format) {
			return(this.key(format).join(getSeparator((format || this.format))));
		};
		that.print = print;

		var docId = function () {
			return(this.print('time-yyyy-mm-dd'));
		};
		that.docId = docId;

		// What it does: takes month string and returns an ordinal integer value. If none provided,
		// returns the value of the month for this object
		var m2n = function (monthStr) {
			var mon = (monthStr && monthStr.toLowerCase());
			return _.isString(mon) && (map[mon] || map[mon.substr(0,3)]);
		};
		that.m2n = m2n;

		// What it does: takes a number and returns a string month
		var n2m = function (monthNo) {
			var month
				, targetMonth = (monthNo || this.template().mm);

			for (month in map) {
			//	console.log('finding month in map', map[month], month, typeof month);
				if (map.hasOwnProperty(month) && (map[month]=== targetMonth)) {
					//console.log('returning month', month, typeof month);
					return month;					
				}
			}
			return targetMonth;
		};
		that.n2m = n2m;

		var valueOf = function () {
			return this.dateValue.valueOf();
		};
		that.valueOf = valueOf;

		var setTime = function(v) {
			this.dateValue = new Date();
			this.dateValue.setTime(v);
			return this;
		};
		that.setTime = setTime;

		// what it does: returns the 'today' value using the place in template for date 'part' 
		var getPart = function (part) {
			return this.template()[part];
		};
		that.getPart = getPart;

		var getYear = function () {
			return this.getPart('yyyy');
		};
		that.getYear = getYear;

		var getMonth = function () {
			return this.getPart('mm');
		};
		that.getMonth = getMonth;

		var getDate = function () {
			return this.getPart('dd');
		};
		that.getDate = getDate;

		var setYear = function (val) {
			this.dateValue.setFullYear(_.toInt(val));
			return this;
		};
		that.setYear = setYear;

		var setMonth = function (val) {
			this.dateValue.setMonth(_.toInt(val));
			return this;
		};
		that.setMonth = setMonth;

		var setDate = function (val) {
			this.dateValue.setDate(_.toInt(val));
			return this;
		};
		that.setDate = setDate;

		var gt = function (d2) {
			return this.valueOf() > d2.valueOf();
		};
		that.gt = gt;

		var lt = function (d2) {
			return !this.gt(d2);		
		};
		that.lt = lt;

		var le = function (d2) {
			return ((!this.gt(d2)) || this.eq(d2));		
		};
		that.le = le;

		var ge = function (d2) {
			return ((this.gt(d2)) || this.eq(d2));		
		};
		that.ge = ge;

		var eq = function (d2) {
			return this.valueOf() === d2.valueOf();
		};
		that.eq = eq;

		var inRange = function (start, end) {
			return (this.ge(start) && this.le(end));
		};
		that.inRange = inRange;
		return that;		
	};
	dateUtils.date = date;
	
	// returns a boxspring.js date object from an array [yyyy, mm, dd]
	var toDate = function(d) {
		return _.date({'dateIn': d });
	};
	dateUtils.toDate = toDate;
	
}(this));




