class MathEx {

    public static randRange(minNum, maxNum ,fix:boolean=false){
        var result = Math.random() * (maxNum - minNum) + minNum;
        if(fix){
            result.toFixed(fix);
        }
        return result;
    }

    public static numSpli(num:number){
    var result:any = (num+'').split(".");
    result = {
        int:result[0],
        dec:('0.' + result[1])
    };
    return result;
}
}