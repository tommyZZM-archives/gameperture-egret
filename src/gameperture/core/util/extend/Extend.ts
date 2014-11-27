module gperture.MathEx{
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

module gperture.Art {
    export function colour(c:any, alpha:number = 1){
        if (typeof(c) == "string") {
            c = _parse_colour(c)*1;
        }
        return c;

        function _parse_colour(c:string):number {
            if (/^#?([0-9a-fA-F]{6})$/.exec(c)) {
                c = /^#?([0-9a-fA-F]{6})$/.exec(c)[1];
            } else {
                console.warn('wrong colour format ', c);
                c = 'ffffff';
            }
            return <any>('0x' + c) * 1;
        }
    }
}

