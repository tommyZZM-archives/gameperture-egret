module gp.config{

    export module gamevar{
        export var isFirstPlay:boolean = true;
        export var score:number = 0;
    }

    export class gamesetting {

        private _setting:util.Dictionary;

        public constructor(settingfile) {
            var setting = RES.getRes(settingfile);
            if(!setting){
                console.error('setting file '+settingfile+' is '+setting)
                return;
            }
            this._setting = new util.Dictionary();
            for(var i in setting){
                this._setting.add(i+'',setting[i])
            }
        }

        public getpara(name:string):any{
            return this._setting[name];
        }

        //@未开放
        private setpara(name:string,value:any){
            if(typeof(value) === typeof(this._setting[name])){
                this._setting[name] = value;
            }
        }

        private static instance:gamesetting;

        public static getInstance(settingfile?):gamesetting {
            if (gamesetting.instance == null && settingfile) {
                gamesetting.instance = new gamesetting(settingfile);
            }
            return gamesetting.instance;
        }

    }
}