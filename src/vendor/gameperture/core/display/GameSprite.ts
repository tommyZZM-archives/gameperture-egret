module gamep{
    export class GameSprite extends egret.Sprite{

        protected _key:string;
        protected _size:any;

        public constructor(x:number=0,y:number=0,parent:egret.DisplayObjectContainer = null,
                           pivotX:number=0,pivotY:number=0) {
            super();
            if(!this._key){this._key = undefined;/*console.warn('a GameSprite should define a key');*/}
            //TODO:your code here
            this.pivotFix(pivotX,pivotY);
            this.x = x;this.y = y;
            this._size = {scaleX:1,scaleY:1,height:this.height,width:this.width};
            this.display();
        }

        //@overwrite
        protected display(){
        }

        public pivotFix(pivotX:number,pivotY:number):void{
            this.anchorX = pivotX;
            this.anchorY = pivotY;
        }

        public scale(xi:number,y:number=null):void{
            if(!y){
                this.scaleX = this.scaleY = xi;
            }else{
                this.scaleX = xi;
                this.scaleY = y;
            }
        }

        public scaleTo(width:number,height:number){
            var scale = width?width/this.width:height/this.height;
            this.scaleX = this.scaleY = scale;
            this._size.scaleX = this.scaleX;
            this._size.scaleY = this.scaleY;
            this._size.height = this.height*this.scaleY;
            this._size.width = this.width*this.scaleY;
        }

        public get size(){
            return this._size;
        }

        public resetSize(){
            this._size.scaleX = 1;
            this._size.scaleY = 1;
            this._size = {scaleX:1,scaleY:1,height:this.height,width:this.width};
        }
        /**
         * 显示动作/动画
         */

        public show(...arg):void{
            this.visible = true;
        }

        public hide(...arg):void{
            this.visible = false;
        }

        public get tween(){
            return egret.Tween.get(this);
        }

        public fadeIn(duration:number=200){
            this.show();
            this.alpha = 0;
            this.tween.to({alpha:1},duration);
        }

        public fadeOut(duration:number=200){
            this.tween.to({alpha:0},duration).call(this.hide,this);
        }

        public removeTween(){
            egret.Tween.removeTweens(this);
        }

        /**
         * 显示列表
         */

        public transParent(target:egret.DisplayObjectContainer):egret.Point{
            var gpos:egret.Point;
            var npos:egret.Point;
            if(this.parent){
                gpos = this.parent.localToGlobal(this.x,this.y);
                this.parent.removeChild(this);
            }
            target.addChild(this);
            if(gpos){
                npos = target.globalToLocal(gpos.x,gpos.y);
                this.x = npos.x;
                this.y = npos.y;
            }
            return npos;
        }

        public removeFromParent(){
            if(this.parent){
                this.parent.removeChild(this);
            }
        }

        /**
         * 创建和销毁对象
         */
        public onCreate():void {}
        public onDestroy():void {}
        public get key():string{
            return this._key;
        }

    }
}
