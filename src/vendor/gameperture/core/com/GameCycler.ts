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
        public _onPre(){
            trace('GameCycler#17','_onPre()');
        }

        //@protected
        public _onReady(){
            trace('GameCycler#22','_onReady()');
        }

    }
}
