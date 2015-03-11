module gamep {
    export class CameraProxy extends GameProxyer {

        private _viewport:egret.Rectangle;
        private _bufferport:egret.Rectangle;
        private _buffer:number;

        private _lens:egret.Tween;
        private _distance:number;

        public constructor(){
            super();
            this.init();
        }

        public init(buffer:number = 1.2){
            if(buffer<1){warn("buffer must larger than 1");buffer=1}
            this._viewport = new egret.Rectangle(0,0,stageWidth(),stageHeight());
            this._bufferport = new egret.Rectangle(0,0,stageWidth(),stageHeight());
            this._buffer = buffer;
            this._lens = display.tween(root);
        }

        public lookat(target:egret.Point,distance:number=0.2){
            distance<0?distance=1:distance++;
            //distance++;
            this._distance = distance;
            this.steady.anchorOffsetX = target.x;
            this.steady.anchorOffsetY = target.y;
            this.steady.x = this.steady.anchorOffsetX;
            this.steady.y = this.steady.anchorOffsetY;

            this.camera.to({scaleX:distance,scaleY:distance},1000).call(()=>{this.update_bufferport()});
        }

        private update_viewport(x:number,y:number,width:number,height:number){
            this._viewport.x = x;
            this._viewport.y = y;
            this._viewport.width = width;
            this._viewport.height = height;
            this.update_bufferport();
        }

        private update_bufferport(){
            this._bufferport.x = this._viewport.width*(this._buffer-1)/2;
            this._bufferport.y = this._viewport.height*(this._buffer-1)/2;

            this._bufferport.width = this._viewport.width*this._buffer;
            this._bufferport.height = this._viewport.height*this._buffer;
        }

        public get bufferport():egret.Rectangle{
            this.update_bufferport();
            var b:egret.Rectangle
                = new egret.Rectangle(this._bufferport.x,this._bufferport.y,this._bufferport.width,this._bufferport.height);
            return  b;
        }

        private get steady():egret.DisplayObjectContainer{
            return root;
        }

        private get camera():egret.Tween{
            this._lens.setPaused(false);
            return this._lens;
        }
    }
}