module gamep {
    export class SimpleFeedbackEvent extends ProxyEvent{
        public constructor(type:string, courier?:any) {
            super(type,courier);
        }
    }
}