module gamep.display.ui{
    export class Button extends TouchAbleObject{

        public constructor(name:string,texture:string,x:number,y:number,gravity:string='center',
                           pivotX?:number,pivotY?:number) {
            this._texture = RES.getRes(texture);
            super(name,x,y,gravity,pivotX,pivotY);
            //TODO:your code here
        }

        public _display(){
            this._skin = new egret.Bitmap();
            this._skin.texture = this._texture;
            super._display();
            this.addEventListener(egret.TouchEvent.TOUCH_BEGIN,this._ontouchbegin,this);
        }

        //@protected @final
        public _ontouchbegin(){
            this.tween.to({scaleX:this.tempScaleX*0.9,scaleY:this.tempScaleY*0.9},100);
            this.addEventListener(egret.TouchEvent.TOUCH_END,this._ontouchend,this);
            this.addEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE,this._ontouchend,this);
        }

        //@protected @final
        public _ontouchend(){
            this.tween.to({scaleX:this.tempScaleX,scaleY:this.tempScaleY},100);
            this.removeEventListener(egret.TouchEvent.TOUCH_END,this._ontouchend,this);
            this.removeEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE,this._ontouchend,this);
        }
    }
}
