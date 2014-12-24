module gamep{
    export class GameDisplay extends egret.DisplayObjectContainer {

        private _scenery = new GameContainer();
        /** 舞台 **/

        private _interface = new GameContainer();
        /** 界面 **/

        public constructor(root:egret.DisplayObjectContainer) {
            super();
            rootscene = root;
            rootscene.addChild(this);
            this.addChild(this._scenery);
            this.addChild(this._interface);
            GameFacade.instance['_display']=this;
        }

        //@public @final
        protected dispatchNotify(notify:string, ...courier:any[]){
            this.dispatchEvent(new FacadeEvent(notify,courier));
        }

    }
}
