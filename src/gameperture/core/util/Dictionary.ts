module gp.util{
    interface IDictionary {

        add(key: string, value: any): void;
        remove(key: string): void;
        containsKey(key: string): boolean;
        keys: string[];
        values: any[];
    }

    export class Dictionary implements IDictionary{

        _keys: string[] = [];
        _values: any[] = [];

        constructor(dic?: { key: any; value: any; }[]) {
            this.addgroup(dic);
        }

        addgroup(dic: { key: any; value: any; }[]){
            if(dic){
                for (var x = 0; x < dic.length; x++) {
                    this[dic[x].key+''] = dic[x].value;
                    this._keys.push(dic[x].key);
                    this._values.push(dic[x].value);
                }
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
            return typeof this[key] !== "undefined";
        }

        public get toLookup(): IDictionary {
            return this;
        }
    }
}
