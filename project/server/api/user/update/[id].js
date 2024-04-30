export default defineEventHandler((event)=>{
    if(event.method=='PATCH'){

    }else{
        return "Hello from user server, api supports updates only"
    }
})