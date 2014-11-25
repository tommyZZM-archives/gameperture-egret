/**
 * Created by 2014-11-06 on 2014/11/25.
 */
//
var Colour = {};
Colour.prototype.parse = function(colour){
    return ('0x'+(/[0-9a-fA-F]{3,6}$/.exec(colour)[0]))*1;
};


//Math的扩展
Math.prototype.randRange = function(minNum, maxNum ,fix){
    var result = Math.random() * (maxNum - minNum) + minNum;
    result.toFixed(fix);
    return result;
};

Math.prototype.numSplit = function(num){
    num = num + '';
    var result = num.split(".");
    result = {
        int:result[0],
        dec:('0.' + result[1])
    };
    return result;
};