class Envirs extends GameObject{

    public constructor(texture:string,x:number=0,y:number=0,parent:egret.DisplayObjectContainer = null,gravity:string='default',
                       pivotX?:number,pivotY?:number) {
        this._texture = RES.getRes(texture);

        super(x,y,parent,gravity,pivotX,pivotY);
        //TODO:your code here
    }

    public _display(){
        this._skin = new egret.Bitmap();
        this._skin.texture = this._texture;
        super._display();
    }

}