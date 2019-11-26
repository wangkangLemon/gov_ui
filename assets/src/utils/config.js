/**
 * Created by huanghuixin on 2017/3/20.
 */

let debug = process.env.NODE_ENV == 'development'
const config = {
    isMobile () {
        return window.innerWidth < 767
    },
    
    apiHost: process.apiHost,
    debug
    
}
console.log(process.apiHost)  //本地接口 http://govapi.yxt.vodjk.demo
console.log(debug)   //true
export default config
