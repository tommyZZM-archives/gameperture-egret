module gamep.Proxy{
    export class AssetsLoaderProxy extends GameProxyer{

        private _assets_groups:any;
        private _loadcount:number;

        public loadAssets(preload:string = null,...groups){
            this._loadcount = 0;
            this._assets_groups = groups;
            if(preload && groups.length>=1){
                this._assets_groups.unshift(preload);
                this._loadcount = -1;
            }else if(preload){
                this._assets_groups = [preload];
            }

            RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE,this.loadcomplete,this);
            RES.addEventListener(RES.ResourceEvent.GROUP_PROGRESS,this.loadprogress,this);

            RES.loadConfig('resource/resource.json','resource/');
            RES.loadGroup(this._assets_groups[this._loadcount]);
        }

        private loadcomplete(e:RES.ResourceEvent){
            trace(e.groupName + ' Load Complete!');
            this._loadcount++;
            if(this._loadcount==0){
                trace('Pre Load Complete!');
                delete this._assets_groups[-1];
                RES.loadGroup(this._assets_groups[this._loadcount]);
                this.dispatchEvent(new gamep.Event.AssetsEvent(Event.AssetsEvent.PRELOAD_READY));
            }else{
                if(this._loadcount < this._assets_groups.length){
                    RES.loadGroup(this._assets_groups[this._loadcount]);
                }else{
                    trace('All Load Complete!');
                    RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE,this.loadcomplete,this);
                    RES.removeEventListener(RES.ResourceEvent.GROUP_PROGRESS,this.loadprogress,this);
                    this.dispatchEvent(new gamep.Event.AssetsEvent(Event.AssetsEvent.ASSET_READY));
                }
            }

        }

        private loadprogress(e:RES.ResourceEvent){
            if(e.groupName!='RES__CONFIG'){
                var pct = e.itemsLoaded / e.itemsTotal;
                trace('Loading '+e.resItem.url+' in '+e.groupName+' '+pct*100+'%');
                if(this._loadcount!=0){
                    var eve = new Event.AssetsEvent(Event.AssetsEvent.ASSET_PROGRESS);
                    eve.percent = pct;
                    this.dispatchEvent(eve);
                }
            }
        }
    }
}