module gamep {
    //镜头功能
    export class CameraProxy extends GameProxyer {

        private _viewport:egret.Rectangle;
        private _bufferport:egret.Rectangle;
        private _buffer:number;

        private _target:egret.Point;
        private _lens:egret.Tween;
        private _focal:number;
        private _aperture:egret.Shape;

        public constructor(){
            super();
            this.init();
        }

        public init(buffer:number = 1.2){
            if(buffer<1){warn("buffer must larger than 1");buffer=1}
            this._viewport = new egret.Rectangle(0,0,stageWidth(),stageHeight());
            this._bufferport = new egret.Rectangle(0,0,stageWidth(),stageHeight());
            this._buffer = buffer;

            //this._aperture = new egret.Shape();
            //this._aperture.graphics.beginFill()
        }

        public lookat(target:egret.Point,focal:number=0.2,duration?:number,callback?:Function,thisArg?,...param):void{
            focal<=0?focal=1:focal++;
            //distance++;
            this._focal = focal;
            this.camera.anchorOffsetX = target.x;
            this.camera.anchorOffsetY = target.y;
            this.camera.x = this.camera.anchorOffsetX;
            this.camera.y = this.camera.anchorOffsetY;

            this._target = target;

            this.lens.to({scaleX:focal,scaleY:focal},duration).call(()=>{
                this.update_bufferport();
                if(callback&&thisArg)callback.apply(thisArg,param)
            });
        }

        public reset(){
            this.lookat(new egret.Point(stageWidth(0.5),stageHeight(0.5)),0);
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

        private get camera():egret.DisplayObjectContainer{
            return root;
        }

        private get lens():egret.Tween{
            if(!this._lens)this._lens = c$.tween(root);
            this._lens.setPaused(false);
            return this._lens;
        }

        private get FilterP(){
            return this.proxy(FilterProxy);
        }
    }
}