module gamep{
    export class GameCycler {

        public constructor() {
            GameFacade.instance.registGame(this);
        }

        /**
         * returns { notify: string; callback: Function; }[]
         */
        public commandRoutes():{ notify: string; callback: Function; }[]{
            return [];
        }

        //@protected
        public _onReady(arg?){

        }

    }
}
