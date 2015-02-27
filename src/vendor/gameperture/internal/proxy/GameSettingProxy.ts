module gamep{
    export class GameSettingProxy extends GameProxyer{

        private _settingss:Dict;

        public constructor(){
            super();
            this._settingss = new Dict();
        }

        public importSetting(filename:string){
            var settingfile = RES.getRes(filename);
            if(!settingfile){
                console.error('setting file '+filename+' is '+undefined);
                return;
            }
            var settingobj = new Dict();
            for(var i in settingfile){
                settingobj.set(i+'',settingfile[i])
            }
            this._settingss.set(filename,settingobj);
        }

        public getParaFromFile(name:string,file:string):any{
            this._settingss.get(file).get(name);
        }

        public getPara(name:string,quickmode?:boolean){
            var result = [];
            var ss = this._settingss.values;
            for(var i=0;i<ss.length;i++){
                if(ss[i].has(name)){
                    result.push(ss[i].get(name));
                    if(quickmode){break;}
                }
            }
            result = result.length==1?result[0]:result;
            return result;
        }


        //@未开放
        /** @deprecated *//*
        private setPara(name:string,value:any){
            if(typeof(value) === typeof(this._setting[name])){
                this._setting[name] = value;
            }
        }*/

    }
}