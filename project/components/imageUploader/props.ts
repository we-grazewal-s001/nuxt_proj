export type AcceptedMimeTypes = 'image/jpeg' | 'image/png' | 'application/pdf';

export const Props={
    url:{
         required:false,
         type:String,
     },
    multiple:{
         required:false,
         type:Boolean,
         default:false
     },
    mode:{
        type:String as ()=>'basic'|'advanced',
        required:false,
        default:'advanced'
    },

    accept: {
        type: Array as () => AcceptedMimeTypes[],
        required: false,
        default: () => ['image/jpeg', 'image/png', 'application/pdf'],
    },
    maxFileSize:{
        required:false,
        type:Number,
        default:1020000,
    },
    auto:{
        type:Boolean,
        required:false,
         default:false,
    },
    chooseLabel:{
        type:String,
        required:false,
        default:'Choose'
    },
    name:{
        type:String
    },error:{
        type:String
    },

}