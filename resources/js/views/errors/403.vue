<template>
    <layout>
        <template slot="toolbar">
            <toolbar>
                <template slot="left">
                    <el-button type="primary"
                               size="small"
                               @click="$router.push({name : 'dashboard'})">
                        {{$t('errors.403.link_text')}}
                    </el-button>
                </template>
                <template slot="middle">

                </template>
                <template slot="right">

                </template>
            </toolbar>
        </template>
        <template slot="content">
            <div class="content">
                <el-card>
                    <h3>{{$t('errors.403.title')}}</h3>
                    <h4>{{$t('errors.403.description')}}</h4>
                </el-card>
            </div>
        </template>
    </layout>
</template>

<script>
    export default {};
</script>

<style lang="scss" scoped>
</style>
