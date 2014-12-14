module MathEx{
    export function randRange(minNum, maxNum, fix:any = false):number {
        var result = Math.random() * (maxNum - minNum) + minNum;
        result = result.toFixed(fix)*1;
        return result;
    }

    export function numSpli(num:number):number {
        var result:any = (num + '').split(".");
        result = {
            int: result[0],
            dec: ('0.' + result[1])
        };
        return result;
    }

    export function probabilityPool(pool:number[]) {
        if(pool.length == 1){
            pool.push(1-pool[0]);
        }
        var cdf = _pdf2cdf(pool);
        var y = Math.random();
        for (var x in cdf)
            if (y < cdf[x])
                return x;
        return -1; // should never runs here, assuming last element in cdf is 1
    }
    function _pdf2cdf(pdf) {
        var cdf = pdf.slice();

        for (var i = 1; i < cdf.length - 1; i++){
            cdf[i] += cdf[i - 1];
            if(cdf[i]>1){
                console.warn('total probability in',pdf,' is > 1')
                cdf[i] = 1;
            }
        }

        // Force set last cdf to 1, preventing floating-point summing error in the loop.
        cdf[cdf.length-1] = 1;

        return cdf;
    }

}

module Art {
    export function colour(c:any, alpha:number = 1):number{
        if (typeof(c) == "string") {
            c = +_parse_colour(c);
        }
        return c;
    }

    function _parse_colour(c:string):number {
        if (/^#?([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/.exec(c)) {
            c = /^#?([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/.exec(c)[1];
            if(c.length==3){
                var c3='';
                for(var i=0; i<c.length; i++){
                    c3 += (c[i]+c[i]);
                }
                c=c3;
            }
        } else {
            console.warn('wrong colour format ', c);
            c = 'ffffff';
        }
        return <any>('0x' + c) * 1;
    }
}

