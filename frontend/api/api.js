//接口文档
const url = 'http://localhost:8081/'

const urls = class{
    static m(){//静态方法
        //注册接口
        const register = `${url}register`
        //登录接口
        const login = `${url}user/login`
        //用户列表
        const user = `${url}user/list`
        //生产组织
        const organization = `${url}organization/list`
        //添加公司
        const add_company = `${url}organization/addCompany`
        //异常分类列表
        const ab_class = `${url}abnormal/list`

        //根据企业管理员获得相应公司信息
        const loadCompany = `${url}companyInfo`


        return {
            register,
            login,
            user,
            organization,
            add_company,
            ab_class
        }
    }

}

export default urls