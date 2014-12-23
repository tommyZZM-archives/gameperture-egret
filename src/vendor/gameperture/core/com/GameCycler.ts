module gamep{
    export class GameCycler {

        public constructor() {
            GameFacade.instance['registGame'](this);
        }

        /**
         * returns { notify: string; callback: Function; }[]
         */
        protected commandRoutes():{ notify: string; callback: Function; }[]{
            return null;
        }

        //@protected
        protected onPre(){

        }

        //@protected
        protected onReady(){

        }

    }
}
