module gamep{
    /**
     * 游戏舞台
     */
    export class GameStage extends GameContainer{

        private _scenerypool:Dict;
        private _currscenery:GameScenery;

        private _sceneryroot;
        /** 舞台 **/

        private _uinterface;
        /** 界面 **/

        public static SCENERY_ROOT:string = 'sceneryroot0112';
        public static UI_INTERFACE:string = 'uinterface0112';

        public constructor(root:egret.DisplayObjectContainer) {
            super();
            gamep.root = root;
            gamep.rootscene = this;
            root.addChild(this);
            this._sceneryroot   = new GameScenery(GameStage.SCENERY_ROOT);
            this._uinterface= new GameScenery(GameStage.UI_INTERFACE);
            super.addChild(this._sceneryroot);
            super.addChild(this._uinterface);
            GameFacade.instance['_display']=this;

            this.name = this['__proto__']['__class__'];
            this.name = /\.?(\w+)$/.exec(this.name)[1];

            this._scenerypool = new Dict();
        }

        private startup(){this.onStartup();this.dispatchCmd(GameFacade.instance['_game'],Notify.Cmd.GameReady)}

        protected onStartup(){

        }

        protected addScenery(scene:GameScenery){
            this._scenerypool.set(scene.name,scene);
        }

        protected toggleToScenery(name:string,mail:any,transitions?){
            if(!this._scenerypool.get(name)){return;}
            if(this._currscenery){
                //TODO:换场动画
                this._currscenery.removeFromParent();
            }
            this._currscenery = this._scenerypool.get(name);
            this._currscenery.onAddToggle(mail);
            this._sceneryroot.addChild(this._currscenery);
        }

        //TO/DO:实现场景切换的功能~

        /** @deprecated */public addChild(child: egret.DisplayObject): egret.DisplayObject{return null}
        /** @deprecated */public addChildAt(child: egret.DisplayObject, index: number): egret.DisplayObject{return null}
        /** @deprecated */public removeChild(child: egret.DisplayObject): egret.DisplayObject{return null}
        /** @deprecated */public removeChildAt(index: number): egret.DisplayObject{return null}
        /** @deprecated */public setChildIndex(child: egret.DisplayObject, index: number){}
        /** @deprecated */public removeChildren(){}
    }
}
