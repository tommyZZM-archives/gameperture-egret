class Art {

    public static colour(c:any, alpha:number = 1){
        if (typeof(c) == "string") {
            c = this._parse_colour(c)*1;
        }
        return c;
    }

    private static _parse_colour(c:string):number {
        if (/^#?([0-9a-fA-F]{6})$/.exec(c)) {
            c = /^#?([0-9a-fA-F]{6})$/.exec(c)[1];
        } else {
            console.warn('wrong colour format ', c);
            c = 'ffffff';
        }
        return <any>('0x' + c) * 1;
    }
}