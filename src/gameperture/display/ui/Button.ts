class Button extends UiComponentBase{

    public constructor(name:string,texture:string,x:number=0,y:number=0) {
        this._texture = RES.getRes(texture);
        super(name,x,y,'center');
        //TODO:your code here
    }

    public _display(){
        this._skin = new egret.Bitmap();
        this._skin.texture = this._texture;
        super._display();
        this.touchEnabled = true;
        this.addEventListener(egret.TouchEvent.TOUCH_BEGIN,this._ontouchbegin,this);
    }

    public touchcallback(callback:Function,thisObject: any){
        this.addEventListener(egret.TouchEvent.TOUCH_TAP,callback,thisObject);
    }

    private _ontouchbegin(){
        this.tween.to({scaleX:this._temp_size.sx*0.9,scaleY:this._temp_size.sx*0.9},100);
        this.addEventListener(egret.TouchEvent.TOUCH_END,this._ontouchend,this);
        this.addEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE,this._ontouchend,this);
    }

    private _ontouchend(){
        this.tween.to({scaleX:this._temp_size.sx,scaleY:this._temp_size.sx},100);
        this.removeEventListener(egret.TouchEvent.TOUCH_END,this._ontouchend,this);
        this.removeEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE,this._ontouchend,this);
    }
}