interface IDictionary {

    add(key: string, value: any): void;
    remove(key: string): void;
    containsKey(key: string): boolean;
    keys: string[];
    values: any[];
}

class Dictionary implements IDictionary{

    _keys: string[] = [];
    _values: any[] = [];

    constructor(dic?: { key: any; value: any; }[]) {
        if(dic){
            this.init(dic);
        }
    }

    init(dic: { key: any; value: any; }[]){
        for (var x = 0; x < dic.length; x++) {
            this[dic[x].key+''] = dic[x].value;
            this._keys.push(dic[x].key);
            this._values.push(dic[x].value);
        }
    }

    public add(key: string, value: any) {
        this[key] = value;
        this._keys.push(key);
        this._values.push(value);
    }

    public remove(key: string) {
        var index = this._keys.indexOf(key, 0);
        this._keys.splice(index, 1);
        this._values.splice(index, 1);

        delete this[key];
    }

    public get keys(): string[] {
        return this._keys;
    }

    public get numkeys():number{
        return this._keys.length;
    }

    public get values(): any[] {
        return this._values;
    }

    containsKey(key: string) {
        if (typeof this[key] === "undefined") {
            return false;
        }

        return true;
    }

    public get toLookup(): IDictionary {
        return this;
    }
}