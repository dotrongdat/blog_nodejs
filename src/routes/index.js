const homeRouter=require('./home')
const apiRouter=require('./api/index')

function route(app){
    app.use('/api', apiRouter)
}

module.exports=route