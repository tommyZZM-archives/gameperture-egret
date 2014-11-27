/**
 * Created by 2014-11-06 on 2014/11/27.
 */
class RouteDictionary extends Dictionary{
    constructor(dic: { key: number; value: Function; }[]) {
        super(dic);
    }

    public get callback(): Function[]{
        return this.values;
    }
}