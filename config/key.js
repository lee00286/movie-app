if(process.env.NODE_ENV === 'production') {
    module.exports = require('./prod')  // Deploy된 production 모드에서 사용
} else {
    module.exports = require('./dev')   // Development 모드에서 사용
}