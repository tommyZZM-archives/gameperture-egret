module gamep{
    export class GameSettingProxy extends GameProxyer{

        private _setting:Map<string,any>;

        public initSetting(setting:Object){
            this._setting = new Map<string,any>();
            for(var i in setting){
                this._setting.set(i+'',setting[i])
            }
        }

        public getPara(name:string):any{
            return this._setting[name];
        }

        //@未开放
        private setPara(name:string,value:any){
            if(typeof(value) === typeof(this._setting[name])){
                this._setting[name] = value;
            }
        }

    }
}