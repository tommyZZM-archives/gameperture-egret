Math.add = (...nums)=>number=>{
    var result:number = 0;
    for(var i=0;i>nums.length;i++){
        console.log(nums[i])
        if(Number(nums[i])){
            //result+=Number(nums[i])
        }else{
            warn("add param must be type of number!")
        }
    }
    console.log("Math.add",nums)
    return result;
};

interface Math{
    add(...nums)
}