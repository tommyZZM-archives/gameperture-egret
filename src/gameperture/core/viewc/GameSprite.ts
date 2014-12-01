module gp.viewc{
    export class GameSprite extends egret.Sprite{

        public key:string;

        public _width:number;
        public _height:number;

        public _skin:any;
        public _texture:egret.Texture;

        private _tween:egret.Tween;

        private _temp_size:any = {scaleX:1,scaleY:1};

        public constructor(x:number=0,y:number=0,parent:egret.DisplayObjectContainer = null,gravity:string='default',
                           pivotX?:number,pivotY?:number) {
            super();
            if(!this.key){this.key = "undefined";/*console.warn('a GameSprite should define a key');*/}
            this._width?this.width = this._width:this.width = 0;
            this._height?this.height = this._height:this.height = 0;
            //TODO:your code here
            this._position_fix(gravity,pivotX,pivotY);
            this.x = x;
            this.y = y;
            this._display();
            if(parent){
                this.transParent(parent);
            }
        }

        //@overwrite
        public _display(){
            if(this._skin){
                this.addChild(this._skin);
                this.width = this._skin.width;
                this.height = this._skin.height;
            }
        }

        private _position_fix(gravity:string,pivotX:number,pivotY:number):void{
            switch(gravity){
                case 'center':
                {
                    this.anchorX = this.anchorY = 0.5;
                    break;
                }
                case 'bottom_center':
                {
                    this.anchorX = 0.5;
                    this.anchorY =  1;
                    break;
                }
                case 'custom':{
                    this.anchorX = pivotX*1;
                    this.anchorY =  pivotY*1;
                    break;
                }
                default:{
                    break;
                }
            }
        }

        public scale(i:number,j:any=false):void{
            if(!j){
                this.scaleX = this.scaleY = i;
            }else{
                if(i!=1){
                    this.scaleX = i;
                }
                this.scaleY = j;
            }
            this._temp_size.scaleX = this.scaleX;
            this._temp_size.scaleY = this.scaleY;
        }

        public get tempScaleX():number{return this._temp_size.scaleX}
        public get tempScaleY():number{return this._temp_size.scaleY}

        public show():void{
            this.visible = true;
        }

        public hide():void{
            this.visible = false;
        }

        public get tween(){
            return egret.Tween.get(this);
        }

        public fade(is_in:any = true,duration:number=200){
            if(is_in){
                this.show();
                this.alpha = 0;
                this.tween.to({alpha:1},duration);
            }else{
                this.alpha = 1;
                this.tween.to({alpha:0},duration).call(this.hide,this);
            }
        }

        public removetween(){
            egret.Tween.removeTweens(this);
        }

        /**
         * 显示列表
         */

        public transParent(target:egret.DisplayObjectContainer){
            if(this.parent){
                this.parent.removeChild(this);
            }
            target.addChild(this);
        }

        public removeFromParent(){
            if(this.parent){
                this.parent.removeChild(this);
            }
        }

        public onCreate():void {}
        public onDestroy():void {}
    }
}
