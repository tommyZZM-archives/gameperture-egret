module gamep{
    export class GameCycler {

        public constructor() {
            GameFacade.instance['_game']=this;
        }

        /**
         * returns { notify: string; callback: Function; }[]
         */
        protected commandRoutes():{ notify: string; callback: Function; }[]{
            return null;
        }

        // @mustbeoverride
        protected onPre(){

        }

        // @mustbeoverride
        protected onReady(){

        }

        // @final
        // 看我滥用索引...
        protected get uInterface(){
            return GameFacade.instance['_display']['_uinterface'];
        }

        // @final
        protected get scenery(){
            return GameFacade.instance['_display']['_scenery'];
        }

    }
}
