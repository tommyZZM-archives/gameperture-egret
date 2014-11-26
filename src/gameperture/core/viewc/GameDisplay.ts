class GameDisplay extends egret.DisplayObjectContainer{

    private _runevent = new GameEvents(GameEvents.GAME_RUN);

    public _background=new GameScenery();
    public _mainground=new GameScenery();
    public _foreground=new GameScenery();

    public constructor() {
        super();
        this.addChild(this._background);
        this.addChild(this._mainground);
        this.addChild(this._foreground);
    }

    public loadingBoard(){

    }

    public startBoard(){

    }

    public playingBoard(){

    }

    public overBoard(){

    }

    /**
     * Getter
     */
    public get runevent(){return this._runevent}
}