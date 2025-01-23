//接口文档

const url = 'http://element.thexxdd.cn/api/'

const urls = class{
    static m(){//静态方法
        //注册接口
        const register = `${url}register`
        //登录接口
        const login = `${url}login`
        //生产组织列表
        const organization = `${url}pulluserlist`

        return {
            register,
            login,
            organization
        }
    }

}

export default urls