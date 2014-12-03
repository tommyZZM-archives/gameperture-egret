module gp.display.ui{
    export class Button extends gp.viewc.GameUiObject{

        private _callbak:any;

        public constructor(name:string,texture:string,x:number=0,y:number=0) {
            this._texture = RES.getRes(texture);
            super(name,x,y,'center');
            //TODO:your code here
            this.key = 'Button_'+texture;
        }

        public _display(){
            this._skin = new egret.Bitmap();
            this._skin.texture = this._texture;
            super._display();
            this.touchEnabled = true;
            this.addEventListener(egret.TouchEvent.TOUCH_BEGIN,this._ontouchbegin,this);
            this.addEventListener(egret.TouchEvent.TOUCH_TAP,this._ontouchtab,this);
        }

        public touchcallback(callback:Function,thisObject: any, argArray?: any[]){
            this._callbak = {};
            this._callbak['callback'] = callback;
            this._callbak['thisObject'] = thisObject;
            this._callbak['argArray'] = argArray;
        }

        private removetouchcallback(){
            this._callbak = null;
        }

        private _ontouchtab(){
            if(this._callbak){
                this._callbak['callback'].apply(this._callbak['thisObject'],this._callbak['argArray']);
            }
        }

        private _ontouchbegin(){
            this.tween.to({scaleX:this.tempScaleX*0.9,scaleY:this.tempScaleY*0.9},100);
            this.addEventListener(egret.TouchEvent.TOUCH_END,this._ontouchend,this);
            this.addEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE,this._ontouchend,this);
        }

        private _ontouchend(){
            this.tween.to({scaleX:this.tempScaleX,scaleY:this.tempScaleY},100);
            this.removeEventListener(egret.TouchEvent.TOUCH_END,this._ontouchend,this);
            this.removeEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE,this._ontouchend,this);
        }
    }
}
