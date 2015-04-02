//相加
Math.add = function(...nums){
    var result:number = 0;
    for(var i=0;i<nums.length;i++){
        if(Number(nums[i])){
            result+=Number(nums[i])
        }else{
            //warn("add param must be type of number!",nums[i])
        }
    }
    return result;
};

//可能性分布概率池
Math.probabilityPool = function probabilityPool(pool:number[]) {
    if(pool.length == 1){
        pool.push(1-pool[0]);
    }
    var cdf = (<any>Math.probabilityPool)._pdf2cdf(pool);
    var y = Math.random();
    for (var x in cdf)
        if (y < cdf[x])
            return x;
    return -1; // should never runs here, assuming last element in cdf is 1
};
(<any>Math.probabilityPool)._pdf2cdf = function(pdf) {
    var cdf = pdf.slice();

    for (var i = 1; i < cdf.length - 1; i++){
        cdf[i] += cdf[i - 1];
        if(cdf[i]>1){
            warn('total probability in',pdf,' is > 1')
            cdf[i] = 1;
        }
    }

    // Force set last cdf to 1, preventing floating-point summing error in the loop.
    cdf[cdf.length-1] = 1;

    return cdf;
};

//获取带单位数值的值和单位 //todo:别放在这..
Math.value = function(value:string,unit?:boolean):any{
    var prase = /^(\d+)(\w*)$/i.exec(value)
    var result;
    if(prase){
        result=()=>{return Number(prase[1])}
        result["value"] = prase[1];
        if(prase[2])result["unit"] = prase[2];
    }else{
        result=()=>{return 0}
    }

    return unit?result["unit"]:result();
};

interface Math{
    add(...nums);
    value(value:string,unit?:boolean)
    probabilityPool(pool:number[]);
}