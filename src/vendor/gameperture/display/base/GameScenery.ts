module gamep {
    export class GameScenery extends GameContainer implements ISceneryComponent{

        public constructor(parent:GameStage){
            super();
            parent.addChild(this);
        }

        protected dispatchCmd(notify:string, ...courier:any[]){
            this.parent.dispatchEvent(new FacadeEvent(notify,courier));
        }

    }
}