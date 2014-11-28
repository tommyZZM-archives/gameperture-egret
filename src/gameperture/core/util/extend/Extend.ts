module toolkit.MathEx{
    export function randRange(minNum, maxNum, fix:boolean = false) {
        var result = Math.random() * (maxNum - minNum) + minNum;
        if (fix) {
            result.toFixed(fix);
        }
        return result;
    }

    export function numSpli(num:number) {
        var result:any = (num + '').split(".");
        result = {
            int: result[0],
            dec: ('0.' + result[1])
        };
        return result;
    }
}

module toolkit.Art {
    export function colour(c:any, alpha:number = 1){
        if (typeof(c) == "string") {
            c = _parse_colour(c)*1;
        }
        return c;

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
}

