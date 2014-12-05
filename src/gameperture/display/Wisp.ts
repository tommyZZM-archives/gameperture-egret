module gp.display{
    export class Wisp extends gp.viewc.GameSprite{

        private _moiveGroupList;
        private _currframeflag:any;

        private _data:any;
        private _is_stop:boolean;

        public constructor(data:string,texture:string,x:number=0,y:number=0,parent:egret.DisplayObjectContainer = null,gravity:string='default',
                           pivotX?:number,pivotY?:number) {
            this._data = RES.getRes(data);
            this._texture = RES.getRes(texture);
            this._moiveGroupList = [];
            super(x,y,parent,gravity,pivotX,pivotY);
            //TODO:your code here
        }

        public _display(){
            for(var f in this._data.frames){
                this._data.frames[f]['name'] = f;
                this._moiveGroupList.push(this._data.frames[f]);
            }

            this._skin = new egret.MovieClip(this._data,this._texture);
            this._skin.addEventListener('stop',this.stop,this);
            this.gotoAndPlay(this._moiveGroupList[0].name);
            super._display();
        }

        public stop(){
            this._is_stop = true;
            this._skin.stop();
        }

        public play(){
            this._is_stop = false;
            this._skin.play();
        }

        public gotoAndPlay(flag:string){
            this._is_stop = false;
            this._skin.gotoAndPlay(flag);
            this._currframeflag = flag;
        }

        public get currFrameFlag(){
            return this._currframeflag;
        }

    }
}
