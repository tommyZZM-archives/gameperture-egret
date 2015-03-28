module gamep{
    export class AssetsLoaderProxy extends GameProxyer{

        private _assets_groups:any;
        private _loadcount:number;

        private _resourceConfig:string;
        private _resourceConfigReference:string;

        public set resourceConfig(path:string){this._resourceConfig = path}
        public set resourceConfigReference(path:string){this._resourceConfigReference = path}

        public loadAssets(preload:string = null,...groups){
            this._loadcount = 0;
            this._assets_groups = groups;
            if(preload && groups.length>=1){
                //this._assets_groups.unshift(preload);
                this._loadcount = -1;
                this._assets_groups[this._loadcount] = preload
            }else if(preload){
                this._assets_groups = [preload];
            }

            RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE,this.loadcomplete,this);
            RES.addEventListener(RES.ResourceEvent.GROUP_PROGRESS,this.loadprogress,this);

            RES.loadConfig(this._resourceConfig?this._resourceConfig:'resource/resource.json'
                ,this._resourceConfigReference?this._resourceConfigReference:'resource/');
            RES.loadGroup(this._assets_groups[this._loadcount]);
        }

        private loadcomplete(e:RES.ResourceEvent){
            if(this._debug)trace(e.groupName + ' Load Complete!');
            this._loadcount++;
            if(this._loadcount==0){
                if(this._debug)trace('Pre Load Complete!');
                delete this._assets_groups[-1];
                RES.loadGroup(this._assets_groups[this._loadcount]);
                this.dispatchEvent(new gamep.AssetsEvent(AssetsEvent.PRELOAD_READY));
            }else{
                if(this._loadcount < this._assets_groups.length){
                    RES.loadGroup(this._assets_groups[this._loadcount]);
                }else{
                    if(this._debug)trace('All Load Complete!');
                    RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE,this.loadcomplete,this);
                    RES.removeEventListener(RES.ResourceEvent.GROUP_PROGRESS,this.loadprogress,this);
                    this.dispatchEvent(new gamep.AssetsEvent(AssetsEvent.ASSET_READY));
                }
            }

        }

        private loadprogress(e:RES.ResourceEvent){
            if(e.groupName!='RES__CONFIG'){
                var pct = e.itemsLoaded / e.itemsTotal;
                if(this._debug)trace('Loading '+e.resItem.url+' in '+e.groupName+' '+(pct*100).toFixed(0)+'%');
                if(this._loadcount!=0){
                    var eve = new AssetsEvent(AssetsEvent.ASSET_PROGRESS);
                    eve.percent = pct;
                    this.dispatchEvent(eve);
                }
            }
        }
    }
}