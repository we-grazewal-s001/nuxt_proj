export const Props={
    url:{
         required:false,
         type:String,
     },
     multiple:{
         required:false,
         type:Boolean,
         default:true
     },
    mode:{
        required:false,
        type:String,
        default:'advanced'
    },
    accept:{

    },
    maxFileSize:{

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
    }
}