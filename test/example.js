require('../index');
var _ = require('underscore');

var test = require('tape');			

// Documentation: https://npmjs.org/package/tape
test('date-utils', function (t) {
	
	t.plan(22);
	t.equal(_.difference(_.date().key(), _.date().key()).length, 0);

	t.equal(_.difference(_.date({
		'format': 'mm yyyy', 
		'dateIn': 'January 2000'}).key('yyyy'), [2000]).length, 0);
				

	t.equal(_.date({'format': 'mm yyyy', 'dateIn': 'January 2000'}).key()[1], 2000);
	t.equal(_.date({'format': 'mm dd yyyy', 'dateIn': 'February 28, 2011'}).key()[1], 28);

	// smoke test
	var tmp = true;
	_.date().key().forEach(function(item) {
		if (typeof item==='undefined') { tmp = false; } 
	});
	t.equal(tmp, true);

	// month to number, number to month
	t.equal(_.date().n2m(7), 'aug');
	t.equal(_.date().m2n('August'), 7);
	t.equal( 
		_.date().m2n(_.date().n2m()),
		_.date().key()[2]);
	t.equal(_.date().m2n('DEC'), 11);	
	
	
	tmp = 0;
	[
	'January 1970',
	'February 2000',
	'March 2000',
	'April 2000',
	'May 2000',
	'June 2000',
	'July 2000',
	'August 2000',
	'September 2000',
	'October 2000',
	'November 2000',
	'December 2000'
	].forEach(function(dat) {
		var d = _.date({'format': 'mm yyyy', 'dateIn': dat });		
		tmp = d.m2n(d.n2m()) - d.getPart('mm');			
	});
	t.equal(tmp, 0);
	
	// formatting dates
	t.equal(_.date({'format': 'mm yyyy', 'dateIn': 'December 2012'}).print(), '11 2012');
	t.equal(_.date({'format': 'mm dd yyyy', 'dateIn': 'December 25, 2012'}).print('yyyy/dd/mm'), '2012/25/11');
	t.equal(_.date({'format': 'mm dd yyyy', 'dateIn': 'dec 7, 2012'}).print('mm/dd/yyyy'), '11/7/2012');
	t.equal(_.date({'format': 'mm-dd-yyyy', 'dateIn': '2-15-2012'}).print('mm yyyy'), '1 2012');

	// docId
	t.equal(_.identical(_.date({
		'format': 'mm dd yyyy', 
		'dateIn': 'december 25, 2012' }).docId().split('-').slice(1), [ '2012', '11', '25']), true);

	var today = _.date({'dateIn': [2012, 6]})
		.setYear(2010)
		.setMonth(10)
		.setDate(15);
	t.equal(_.difference([ today.getYear(), today.getMonth(), today.getDate(), today.print('mm-dd-yyyy') ], 
			[2010, 10, 15, '10-15-2010']).length, 0);
			
	
	today.setYear(2011)
		.setTime(today.valueOf());
	t.equal(today.print('mm-yyyy'), '10-2011');
	t.equal(_.date({ 'dateIn': 'september 18, 2012'})
			.gt(_.date({'dateIn': 'december 19, 2011'})), true);

	t.equal(_.date({ 'dateIn': 'september 18, 2012'})
			.lt(_.date({'dateIn': 'december 19, 2011'})), false);

	t.equal(_.date({ 'dateIn': 'september 18, 2012'})
			.eq(_.date({'dateIn': 'december 19, 2011'})), false);

	t.equal(today.inRange(_.date({'dateIn': [2010]}), _.date({'dateIn': [ 2013 ]})), true);

	t.equal(today.inRange(_.date({'dateIn': [2012]}), _.date({'dateIn': [ 2013 ]})), false);					

});


/*
						





*/
