module gamep.display.ui{
    export class TouchAbleObject extends GameUiObject{

        private _callbak:any;

        public constructor(name:string,x:number=0,y:number=0,gravity:string='default',
                           pivotX?:number,pivotY?:number) {
            super(name,x,y,gravity,pivotX,pivotY);
            //TODO:your code here
        }

        public _display(){
            super._display();
            this.touchEnabled = true;
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

        //@protected @final
        public _ontouchtab(){
            if(this._callbak){
                this._callbak['callback'].apply(this._callbak['thisObject'],this._callbak['argArray']);
            }
        }

    }
}