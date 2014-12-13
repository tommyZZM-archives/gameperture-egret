module gamep{
    export class GameCycler {

        public constructor() {
            GameFacade.instance.registGame(this);
        }

    }
}
