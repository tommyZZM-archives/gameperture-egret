module gamep {
    export class BroadcastEvent extends ProxyEvent{
        public constructor(type:string, courier?:any) {
            super(type,courier);
        }
    }
}