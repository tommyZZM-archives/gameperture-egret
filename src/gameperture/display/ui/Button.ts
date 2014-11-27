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
        this.tween.to({scaleX:this._temp_size.sx*0.9,scaleY:this._temp_size.sx*0.9},200);
        this.addEventListener(egret.TouchEvent.TOUCH_END,this._ontouchend,this);
        this.addEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE,this._ontouchend,this);
    }

    private _ontouchend(){
        this.tween.to({scaleX:this._temp_size.sx,scaleY:this._temp_size.sx},200);
        this.removeEventListener(egret.TouchEvent.TOUCH_END,this._ontouchend,this);
        this.removeEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE,this._ontouchend,this);
    }
}