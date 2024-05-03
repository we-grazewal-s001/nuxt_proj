export const props={
    severity:{
        type:String as ()=> 'info'|'error',
        default: 'info'
    },
    message:{
        type:String,
        default:'add message here'
    },
    show:{
        type:Boolean,
    }
}