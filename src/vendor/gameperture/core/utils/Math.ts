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
}