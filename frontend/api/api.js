//接口文档
const url = 'http://localhost:8081/'
const urls = class{
    static m(){//静态方法
        //登录接口
        const login = `${url}user/login`
        //用户列表
        const user = `${url}user/list`
        //生产组织
        const orgTree = `${url}organization/tree`
        const updateTree = `${url}organization/updateTree`
        const addTree = `${url}organization/addTree`
        const deleteTree = `${url}organization/deleteTree`
        //公司列表
        const company_list = `${url}organization/list`
        const add_company = `${url}organization/addCompany`
        //生产资源
        const resourceTree = `${url}resource/tree`
        //生产信息
        const informationTree = `${url}information/tree`
        //异常分类列表
        const ab_class = `${url}abnormal/list`
        //根据企业管理员获得相应公司信息
        const companyIndex = `${url}organization/index1`
        const loadCompany = `${url}organization/companyInfo`
        const updateCompany = `${url}organization/updateCompany`
        const addDepartment = `${url}depart/addDepartment`
        const departmentList = `${url}depart/list`

        return {
             login,
            user, company_list, add_company, ab_class,orgTree,resourceTree,informationTree,updateTree,addTree,deleteTree,
            companyIndex,loadCompany,updateCompany,addDepartment,departmentList,
        }
    }

}

export default urls