#date-utils.js

date-utils.js is a utility module which provide functions for operating with linked list. It can be used both in the [node.js](http://nodejs.org) and browser.

##Download

The source code is available for download from [GitHub](https://github.com/rranauro/date-utils). Besides that, you can also install using Node Package Manager ([npm](https://npmjs.org)):

    npm install date-utils

##Documentation

* [date](#date)
* [print](#print)
* [n2m](#n2m)
* [m2n](#m2n)
* [setYear](#setYear)
* [setMonth](#setMonth)
* [setDate](#setDate)
* [getYear](#getYear)
* [getMonth](#getMonth)
* [getDate](#getDate)
* [gt](#gt)
* [lt](#lt)
* [eq](#eq)
* [ge](#ge)
* [le](#le)
* [inRange](#inRange)

<a name="date" />
### date(argument)

Initialize a date object. There are two situations based on the argument. 0 stands for January, 1 stands for February and so on.

*   When the argument is empty, it will return the date object with current system time (for example today is May 9, 2013).

__Example:__

    dateUtils.date().print('yyyy-mm-dd-day');
  
__Result:__

    2013-4-9-4
    
*   When the argument is not empty, it will return the data object with the time and format getting from the object. The data can come as any format as you like, as long as the month comes as an English Word(or first three letters) and it uses the same separator. If the format is not specified, the system will set the format to default (yyyy mm dd).

__Example:__

    dateUtils.date({'format': 'mm dd yyyy', 'dateIn': 'May 13, 2013'}).print('');
    dateUtils.date({'format': 'mm-yyyy', 'dateIn': 'May-2013'}).print('');
    dateUtils.date({'format': 'dd/mm/yyyy', 'dateIn': '13/January/2013'}).print('');
    dateUtils.date({'dateIn': '13/jan/2013'}).print('');
    
__Result:__

    4 13 2013
    4-2013
    13/0/2013
    2013 1 13
    
<a name="print" />
### print(argument)

If the argument is empty, return the time string based on its original format. If the argument is not empty, return the time string based on the argument as the new format.

__Example:__

    dateUtils.date({'format': 'mm yyyy', 'dateIn': 'December 2012'}).print();
    dateUtils.date({'format': 'mm dd yyyy', 'dateIn': 'December 25, 2012'}).print('yyyy/dd/mm');
    
__Result:__

    11 2012
    2012/25/11
    

<a name="n2m" />
### n2m(number)

Take a integer number and return a string month.

__Example:__

    dateUtils.date().n2m();   //return the month of current system time
    dateUtils.date().n2m(7);
  
__Result:__

    may
    aug
    
<a name="m2n" />
### m2n(string)

Take a month string and return an integer value. 

__Example:__

    dateUtils.date().m2n('DEC')
  
__Result:__

    11
    
<a name="setYear" />
### setYear(number)

Set the number as the new year of the date object.

__Example:__

    var today = dateUtils.date();
    today.setYear(2010).print();
  
__Result:__

    2010-4-9
    
<a name="setMonth" />
### setMonth(number)

Set the number as the new month of the date object.

__Example:__

    today.setMonth(10).print();
  
__Result:__

    2010-10-9
    
    
<a name="setDate" />
### setMonth(number)

Set the number as the new day of the date object.

__Example:__

    today.setDate(23).print();
  
__Result:__

    2010-10-23
    
<a name="getYear" />
### getYear()

Return the year of the date object.

__Example:__

    today.getYear();
  
__Result:__

    2010
    
<a name="getMonth" />
### getMonth()

Return the month of the date object.

__Example:__

    today.getMonth();
  
__Result:__

    10
    
<a name="getDate" />
### getDate()

Return the day of the date object.

__Example:__

    today.getDate();
  
__Result:__

    23
    
<a name="gt" />
### gt(newDateObject)

If the given date is greater than the new date, return true; otherwise return false.

__Example:__

    dateUtils.date({ 'dateIn': 'september 18, 2012'}).gt(dateUtils.date({'dateIn': 'december 19, 2011'}))
  
__Result:__

    true
  
<a name="lt" />
### lt(newDateObject)

If the given date is greater than the new date, return true; otherwise return false.

__Example:__

    t.equal(dateUtils.date({ 'dateIn': 'september 18, 2012'}).lt(dateUtils.date({'dateIn': 'december 19, 2011'}))
  
__Result:__

    false
    
<a name="eq" />
### eq(newDateObject)

If the given date is greater than the new date, return true; otherwise return false.

__Example:__

    dateUtils.date({ 'dateIn': 'september 18, 2012'}).eq(dateUtils.date({'dateIn': 'september 18, 2012'}))
  
__Result:__

    true
    
<a name="ge" />
### ge(newDateObject)

If the given date is greater than or equal to the new date, return true; otherwise return false.  

<a name="le" />
### ge(newDateObject)

If the given date is lower than or equal to the new date, return true; otherwise return false. 

<a name="inRange" />
### inRange(startDateObject, endDateObject)

If the given date is in the range between the start date and the end date, return true; otherwise return false.

__Example:__

    dateUtils.date({'dateIn': [2011]}).inRange(dateUtils.date({'dateIn': [2010]}), dateUtils.date({'dateIn': [ 2013 ]}))
  
__Result:__

    true
    
