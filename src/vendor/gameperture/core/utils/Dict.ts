class Dict{
    private _map:any;

    public constructor() {
        this._map = {};
        //var a:Map = new Map()
    }

    public set(value:any,key){
        this._map[value] = key;
    }

    public get(value):any{
        return this._map[value]
    }

    public delete(value){
        if(this.has(value))delete this._map[value];
    }

    public has(value):boolean{
        return this._map[value]?true:false;
    }

    public clear(){
        for(var value in this._map){
            delete this._map[value];
        }
    }

    /** @deprecated */
    public forEach(callbackfn: (value, key)=>void, thisArg?: any): void{

    }

    public get size():number{
        var size:number = 0;
        for(var value in this._map){
            size++;
        }
        return size;
    }

}
