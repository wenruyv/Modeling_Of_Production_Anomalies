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
        const proList = `${url}proInfo/proList`
        const saveTree = `${url}information/saveTree`
        //异常分类列表
        const ab_class = `${url}abnormal/list`
        //根据企业管理员获得相应公司信息
        const companyIndex = `${url}organization/index1`
        const loadCompany = `${url}organization/companyInfo`
        const updateCompany = `${url}organization/updateCompany`
        const updateC_org = `${url}organization/updateC_org`
        const isEmptyOrg = `${url}organization/isEmptyOrg`
        const proInfo = `${url}proInfo/list`
        const updateProInfo = `${url}proInfo/update`
        const addProInfo = `${url}proInfo/add`
        const addDepartment = `${url}depart/addDepartment`
        const departmentList = `${url}depart/list`
        const staffList = `${url}staff/list`
        const addStaff = `${url}staff/addStaff`

        //部门管理员获取部门信息
        const loadDep = `${url}depart/depInfo`
        const updateDep = `${url}depart/updateDep`
        const depStaffList = `${url}staff/depList`
        const orgById = `${url}organization/orgById`

        return {
             login,proList,
            user, company_list, add_company, ab_class,orgTree,resourceTree,informationTree,saveTree,updateTree,addTree,deleteTree,
            companyIndex,loadCompany,updateCompany,updateC_org,isEmptyOrg,addDepartment,departmentList,staffList,addStaff,
            loadDep,updateDep,proInfo,addProInfo,updateProInfo,depStaffList,orgById
        }
    }

}

export default urls