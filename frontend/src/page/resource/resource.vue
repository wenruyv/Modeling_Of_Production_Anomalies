<template>
    <div class="ordering">
        <div class="heading">生产资源</div>
        <div>
            <el-table :data="res" style="width: 100%">
                <el-table-column prop="org" label="组织" width="180" />
                <el-table-column prop="job" label="职位" width="180" />
                <el-table-column prop="name" label="姓名" />
            </el-table>
        </div>
    </div>
</template>

<script>
import { reactive } from 'vue';
export default{
    setup(){
        const res = reactive([
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

        ])
        return {res}
    }

}
</script>

<style>
</style>