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
        //生产组织改
        const orgAll = `${url}orgAll/list`
        const orgUpdate = `${url}orgAll/update`
        const addOrgAll = `${url}orgAll/addOrgAll`
        //公司列表
        const company_list = `${url}organization/list`
        const add_company = `${url}organization/addCompany`
        const company_types = `${url}orgAll/findType`
        //生产资源
        const resourceTree = `${url}resource/tree`
        //生产信息
        const informationTree = `${url}information/tree`
        const proList = `${url}proInfo/proList`
        const saveTree = `${url}information/saveTree`

        //异常分类列表
        const ab_class = `${url}abnormal/list`
        //根据企业管理员获得相应公司信息
        const findInfo = `${url}orgAll/findInfo`
        const companyIndex = `${url}organization/index1`
        const loadCompany = `${url}organization/companyInfo`
        const updateCompany = `${url}organization/updateCompany`
        const updateC_org = `${url}organization/updateC_org`
        const isEmptyOrg = `${url}organization/isEmptyOrg`
        const proInfo = `${url}proInfo/list`
        const getProInfoById = `${url}proInfo/findById`
        const deleteProInfo = `${url}proInfo/delete`
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
        const group1List = `${url}group1/list`
        const addGroup1 = `${url}group1/addGroup1`
        const equipmentList = `${url}equipment/list`
        const equipmentByDepId = `${url}equipment/depList`
        const addEquipment = `${url}equipment/addEquipment`
        const materialList = `${url}material/list`
        const materialByDepId = `${url}material/depList`
        const addMaterial = `${url}material/addMaterial`

        return {
             login,proList,
            user, company_list, add_company, ab_class,orgTree,resourceTree,informationTree,saveTree,updateTree,addTree,deleteTree,
            companyIndex,loadCompany,updateCompany,updateC_org,isEmptyOrg,addDepartment,departmentList,staffList,addStaff,
            loadDep,updateDep,proInfo,addProInfo,updateProInfo,depStaffList,orgById,deleteProInfo,getProInfoById,
            group1List,addGroup1,
            equipmentList,equipmentByDepId,addEquipment,
            materialList,materialByDepId,addMaterial,
            orgAll,orgUpdate,addOrgAll,
            company_types,findInfo
        }
    }

}

export default urls