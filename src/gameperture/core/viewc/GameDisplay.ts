class GameDisplay extends egret.DisplayObjectContainer{

    private _rune = new GameEvents(GameEvents.GAME_RUN);

    public _background=new GameScenery();
    public _mainground=new GameScenery();
    public _foreground=new GameScenery();
    public _interface= new egret.DisplayObjectContainer;

    public constructor() {
        super();
        this.addChild(this._background);
        this.addChild(this._mainground);
        this.addChild(this._foreground);
        this.addChild(this._interface);
    }

    public loadingBoard(){

    }

    public launch(){
        this._rune.status = GameStatus.READY;
        this.dispatchEvent(this._rune)
    }

    public readyBoard(){

    }

    public playingBoard(){

    }

    public overBoard(){

    }

    /**
     * Getter
     */
    public get runevent(){return this._rune}
}