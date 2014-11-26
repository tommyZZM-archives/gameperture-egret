class Wisp extends GameObject{

    private _data:any;

    public constructor(data:any,texture:string,x:number=0,y:number=0,parent:egret.DisplayObjectContainer = null,gravity:string='default',
                       pivotX?:number,pivotY?:number) {
        this._data = data;
        this._texture = RES.getRes(texture);
        super(x,y,parent,gravity,pivotX,pivotY);
        //TODO:your code here
    }

    public _display(){
        this._skin = new egret.MovieClip(this._data,this._texture);
        super._display();
    }

    public get body(){
        return this._skin;
    }

}