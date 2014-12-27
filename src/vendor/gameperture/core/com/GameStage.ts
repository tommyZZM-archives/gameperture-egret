module gamep{
    /**
     * 游戏舞台
     */
    export class GameStage extends egret.DisplayObjectContainer implements ISceneryComponent{

        private _scenery;
        /** 舞台 **/

        private _uinterface;
        /** 界面 **/

        public constructor(root:egret.DisplayObjectContainer) {
            super();
            rootscene = root;
            rootscene.addChild(this);
            this._scenery   = new GameScenery(this);
            this._uinterface= new GameScenery(this);
            GameFacade.instance['_display']=this;
        }

        private startup(){
            this.hello();
            this.dispatchCmd(notify.CMD.GameReady)
        }

        public hello(){

        }

        //@public @final
        protected dispatchCmd(cmd:string, ...courier:any[]){
            rootscene.dispatchEvent(new FacadeEvent(notify.cmd,cmd,courier));
        }

        //禁用方法
        /** @deprecated */
        public addEventListener(type: string, listener: Function, thisObject: any, useCapture?: boolean, priority?: number):void{
            //super.addEventListener(type,listener,thisObject,useCapture,priority);
        }

        /** @deprecated */
        public dispatchEvent(event: egret.Event):boolean{
            return null;
            //return super.dispatchEvent(event);
        }

    }
}
