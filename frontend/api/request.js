//axios请求
import axios from 'axios'
import instance from './header.js'


const request = class{
    constructor(url,arg){
        this.url = url
        this.arg = arg
    }
    //post
    modepost(){
        return new  Promise((resolve,reject)=>{
            instance.post((this.url),this.arg)
            .then(res=>{
				resolve(res)
			})
			.catch(err=>{
				reject(err)
			})
        })
    }

    //get
    modeget(){
        return new  Promise((resolve,reject)=>{
			instance.get((this.url))
			.then(res=>{
				resolve(res)
			})
			.catch(err=>{
				reject(err)
			})
        })
    }
    // delete (新增)
    modedelete() {
        return new Promise((resolve, reject) => {
            instance.delete(this.url)
                .then(res => {
                    resolve(res)
                })
                .catch(err => {
                    reject(err)
                })
        })
    }
}

export default request