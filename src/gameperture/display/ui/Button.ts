class Button extends GameObject{

    public constructor(texture:string,x:number=0,y:number=0,parent:egret.DisplayObjectContainer = null) {
        this._texture = RES.getRes(texture);
        super(x,y,parent,'center');
        //TODO:your code here
    }

    public _display(){
        this._skin = new egret.Bitmap();
        this._skin.texture = this._texture;
        super._display();
        this.touchEnabled = true;
        this.addEventListener(egret.TouchEvent.TOUCH_BEGIN,this._ontouchbegin,this);
    }

    private _ontouchbegin(){
        this.tween.to({scaleX:0.9,scaleY:0.9},200);
        this.addEventListener(egret.TouchEvent.TOUCH_END,this._ontouchend,this);
    }

    private _ontouchend(){
        this.tween.to({scaleX:1,scaleY:1},200);
        this.removeEventListener(egret.TouchEvent.TOUCH_END,this._ontouchbegin,this);
    }
}