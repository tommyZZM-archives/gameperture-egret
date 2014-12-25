module gamep{
    /**
     * 游戏舞台
     */
    export class GameStage extends egret.DisplayObjectContainer {

        private _scenery = new GameContainer();
        /** 舞台 **/

        private _uinterface = new GameContainer();
        /** 界面 **/

        public constructor(root:egret.DisplayObjectContainer) {
            super();
            rootscene = root;
            rootscene.addChild(this);
            this.addChild(this._scenery);
            this.addChild(this._uinterface);
            GameFacade.instance['_display']=this;
        }

        //@public @final
        protected dispatchNotify(notify:string, ...courier:any[]){
            this.dispatchEvent(new FacadeEvent(notify,courier));
        }

        //禁用方法
        /** @deprecated */
        public addEventListener(type: string, listener: Function, thisObject: any, useCapture?: boolean, priority?: number):void{
            super.addEventListener(type,listener,thisObject,useCapture,priority);
        }

        /** @deprecated */
        public dispatchEvent(event: egret.Event):boolean{
            return super.dispatchEvent(event);
        }

    }
}
