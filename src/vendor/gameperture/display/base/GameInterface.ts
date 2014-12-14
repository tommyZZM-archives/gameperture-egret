module gamep{
    export class GameInterface extends egret.DisplayObjectContainer{

        private components:utils.Dictionary;

        public constructor() {
            this.components = new utils.Dictionary();
            super();
            //TODO:your code here
        }

        public addChild(child: GameUiObject):egret.DisplayObject{
            this.components.set(child.name,child);
            super.addChild(child);
            return child;
        }

        /*public get debug(){
            return this.components;
        }*/

        public select(name):gp.GameUiObject{
            return this.components[name];
        }
    }
}
