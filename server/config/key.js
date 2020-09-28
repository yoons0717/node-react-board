if(process.env.NODE_ENV === 'production'){ 
     // 환경변수가 로컬환경이면 development, 배포 한 후면 production
    module.exports=require('./prod')
}
else{
    module.exports=require('./dev')
}