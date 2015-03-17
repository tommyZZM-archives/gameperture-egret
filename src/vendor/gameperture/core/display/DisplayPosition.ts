module gamep {
    //游戏元素定位系统
    export module canvasele {
        export class GamePosition {
            private _displayobjpool:Dict;
            public constructor(){
                this._displayobjpool = new Dict();
                stage().addEventListener(egret.Event.RESIZE,this.onResize,this);
            }

            public onResize(){
                this._displayobjpool.forEach((value)=>{
                    value.obj.x = stageWidth(value.posx);
                    value.obj.y = stageHeight(value.posy);
                });
                //console.log(this._displayobjpool);
            }

            public lockPosition(target:egret.DisplayObject,posx:number,posy:number){
                this._displayobjpool.set(target.hashCode,{obj:target,posx:posx,posy:posy});
                target.x = stageWidth(posx);
                target.y = stageHeight(posy);
            }

            public unlockPosition(target:egret.DisplayObject){
                this._displayobjpool.delete(target.hashCode)
            }

            private static _instance:GamePosition;
            public static get instance():GamePosition{
                if (GamePosition._instance == null) {
                    GamePosition._instance = new GamePosition();
                }
                return GamePosition._instance;
            }
        }

    }
}