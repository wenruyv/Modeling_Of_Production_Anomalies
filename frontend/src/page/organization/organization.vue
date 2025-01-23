<template>
    <div class="ordering">
        <div class="heading">生产组织</div>
        <div>
            <el-table :data="org_array" style="width: 100%">
                <el-table-column prop="org" label="组织" min-width="100" />
                <el-table-column prop="job" label="职位" min-width="100" />
                <el-table-column prop="name" label="姓名" min-width="100"/>
            </el-table>
            <el-pagination background layout="prev, pager, next" :total="total" :current-page="1"
            @current-change="currentchange"
            :hide-on-single-page="true" />
        </div>
        
    </div>
</template>

<script>
import { reactive,onMounted,getCurrentInstance, toRefs } from 'vue';
export default{
    setup(){
        const {proxy} = getCurrentInstance()
        //请求数据
        onMounted(()=>{
            orglist()
        })

        const org_data = reactive({
            org_array: [],//数据
            total: 0,//总条数
            page: 0,
        })
        async function orglist(){
            try {
                const res = await new proxy.$request(proxy.$urls.m().organization + '?page=' + org_data.page).modeget()
                console.log(res)
                org_data.org_array = 数据
            } catch (error) {
                console.log(error)
                new proxy.$tips('服务器发生错误','error').message_()
            }
        }

/*         const res = reactive([
            {
                org:'研发公司',
                job:'销售经理',
                name:'张三'
            },
            {
                org:'研发公司',
                job:'销售经理',
                name:'张三'
            },
            {
                org:'研发公司',
                job:'销售经理',
                name:'张三'
            },
            {
                org:'研发公司',
                job:'销售经理',
                name:'张三'
            },
            {
                org:'研发公司',
                job:'销售经理',
                name:'张三'
            },
            {
                org:'研发公司',
                job:'销售经理',
                name:'张三'
            },
            {
                org:'研发公司',
                job:'销售经理',
                name:'张三'
            },
            {
                org:'研发公司',
                job:'销售经理',
                name:'张三'
            },
            {
                org:'研发公司',
                job:'销售经理',
                name:'张三'
            },
            {
                org:'研发公司',
                job:'销售经理',
                name:'张三'
            },
            {
                org:'研发公司',
                job:'销售经理',
                name:'张三'
            }

        ]) */
        //分页出发事件
        function currentchange(e){
            console.log(e - 1)
            org_data.page = e-1
        }
        return {...toRefs(org_data),currentchange}
    }

}
</script>

<style>
</style>