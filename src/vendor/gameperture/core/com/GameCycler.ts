module gamep{
    export class GameCycler {

        public constructor() {
            GameFacade.instance.registGame(this);
        }

        /**
         * returns { notify: string; callback: Function; }[]
         */
        protected commandRoutes():{ notify: string; callback: Function; }[]{
            return [];
        }

        //@protected
        protected _onPre(){

        }

        //@protected
        protected _onReady(){

        }

    }
}
