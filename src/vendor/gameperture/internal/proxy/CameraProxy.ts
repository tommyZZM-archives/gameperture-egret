module gamep {
    export class CameraProxy extends GameProxyer {

        private _viewport:egret.Rectangle;
        private _bufferport:egret.Rectangle;
        private _buffer:number;

        public constructor(){
            super();
            this.init();
        }

        public init(buffer:number = 1.2){
            if(buffer<1){warn("buffer must larger than 1");buffer=1}
            this._viewport = new egret.Rectangle(0,0,stageWidth(),stageHeight());
            this._bufferport = new egret.Rectangle(0,0,stageWidth(),stageHeight());
            this._buffer = buffer;
        }

        public lookat(target:egret.Point,distance:number=0.2){
            distance<0?distance=1:distance++;
            //distance++;
            var tween = display.tween(this.stage);

            this.stage.anchorOffsetX = target.x;
            this.stage.anchorOffsetY = target.y;
            this.stage.x = this.stage.anchorOffsetX;
            this.stage.y = this.stage.anchorOffsetY;

            tween.to({scaleX:distance,scaleY:distance},1000);
        }

        private update_viewport(x:number,y:number,width:number,height:number){
            this._viewport.x = x;
            this._viewport.y = y;
            this._viewport.width = width;
            this._viewport.height = height;
            this.update_bufferport(this._buffer);
        }

        private update_bufferport(buffer:number){
            this._bufferport.x = this._viewport.width*(buffer-1)/2;
            this._bufferport.y = this._viewport.height*(buffer-1)/2;

            this._bufferport.width = this._viewport.width*buffer;
            this._bufferport.height = this._viewport.height*buffer;
        }

        public get bufferport():egret.Rectangle{
            this.update_bufferport(this._buffer);
            var b:egret.Rectangle
                = new egret.Rectangle(this._bufferport.x,this._bufferport.y,this._bufferport.width,this._bufferport.height);
            return  b;
        }

        private get stage():egret.DisplayObjectContainer{
            return root;
        }
    }
}