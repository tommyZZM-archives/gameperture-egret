module gamep{
    export class GameContainer extends egret.DisplayObjectContainer{

        private _componentpool:utils.Dictionary;

        public constructor() {
            this._componentpool = new utils.Dictionary();
            super();
            //TODO:your code here
        }

        public addChild(child: egret.DisplayObject):egret.DisplayObject{
            if(child.name){
                super.addChild(child);
                this._componentpool.set(child.name,child);
                return child
            }else{
                console.warn('child must have a name!')
                return null;
            }
        }

        public selectChild(name):egret.DisplayObject{
            return this._componentpool[name];
        }
    }
}
