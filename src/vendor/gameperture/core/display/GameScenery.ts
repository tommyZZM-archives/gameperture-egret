module gamep {
    export class GameScenery extends GameContainer implements ISceneryComponent{// implements ISceneryComponent

        public constructor(name:string){
            super();
            this.name = name;
        }
        
        public clear(){this.removeChildren();}
        public hide(...arg):void{this.visible = false;}
        public show(...arg):void{this.visible = true;}

    }
}