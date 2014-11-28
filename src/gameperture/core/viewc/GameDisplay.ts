class GameDisplay extends egret.DisplayObjectContainer{

    private _rune = new GameEvents(GameEvents.GAME_RUN);

    public _background=new GameScenery();/** 背景 **/
    public _mainground=new GameScenery();/** 主要逻辑层 **/
    public _foreground=new GameScenery();/** 前景 **/
    public _interface= new GameInterface();/** 界面 **/

    public constructor() {
        super();
        this.addChild(this._background);
        this.addChild(this._mainground);
        this.addChild(this._foreground);
        this.addChild(this._interface);
    }

    public loadingBoard(){

    }

    public lever(statu:any = GameStatus.READY){
        this._rune.updatestatu(statu);
        this.dispatchEvent(this._rune)
    }

    public readyBoard(){

    }

    public playingBoard(){

    }

    public overBoard(){

    }

    public restarBoard(){

    }

    public _onrun(e){
        this._rune.updatestatu();
        this.dispatchEvent(this._rune);
    }

    /*public addChild(child: egret.DisplayObject){
        this._mainground.addChild(child);
        return child;
    }*/

    /**
     * Getter
     */
    public get runevent(){return this._rune}
}