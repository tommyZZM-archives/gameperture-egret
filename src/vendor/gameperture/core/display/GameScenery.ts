module gamep {
    export class GameScenery extends egret.DisplayObjectContainer{// implements ISceneryComponent

        public constructor(name:string){
            super();
            this.name = name;
            this.display();
        }

        public onShow(...courier){}
        public onHide(...courier){}

        protected display(){

        }
    }
}