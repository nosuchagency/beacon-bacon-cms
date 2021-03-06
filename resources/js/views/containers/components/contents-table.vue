<template>
    <drag-table :items="contents"
                @reorder="reorder">
        <template slot="header">
            <div class="title-icon-wrapper">
                <i class="fa fa-file-invoice title-icon"></i>
                <label>Contents</label>
            </div>
            <div style="margin-left: auto;">
                <template v-for="(element, index) in types">
                    <el-tooltip :key="index"
                                effect="dark"
                                :content="'Add ' + element.type"
                                placement="top-start">
                        <el-button type="primary"
                                   size="mini"
                                   style="margin-left: 10px;"
                                   @click="openContentModal(element.type)">
                            <i :class="'fa-' + element.icon"
                               class="fa">
                            </i>
                        </el-button>
                    </el-tooltip>
                </template>
            </div>
        </template>
        <template slot="table-columns">
            <el-table-column label="Title">
                <template slot-scope="scope">
                    <span>{{scope.row.name}}</span>
                </template>
            </el-table-column>
            <el-table-column label="Type"
                             align="center">
                <template slot-scope="scope">
                    <el-tag size="small">{{scope.row.type}}</el-tag>
                </template>
            </el-table-column>
            <el-table-column :label="$t('beacons.attributes.category')"
                             align="center">
                <template slot-scope="scope">
                    <el-tag v-if="scope.row.category"
                            type="primary"
                            size="small"
                            disable-transitions>
                        {{scope.row.category.name}}
                    </el-tag>
                    <template v-else>
                        -
                    </template>
                </template>
            </el-table-column>
            <el-table-column width="100"
                             align="center">
                <template slot-scope="scope">
                    <el-tooltip effect="dark"
                                content="Edit content"
                                placement="top-start">
                        <el-button type="primary"
                                   size="small"
                                   circle
                                   v-if="$auth.user().hasPermissionTo('content:update')"
                                   @click="openContentModal(scope.row.type, scope.row.id)">
                            <i class="fa fa-edit"></i>
                        </el-button>
                    </el-tooltip>
                </template>
            </el-table-column>
        </template>
        <template slot="footer">
            <content-upsert-modal :visible="contentModalActive"
                                  :type="contentType"
                                  :item="selectedContent"
                                  @modal:add="addContent"
                                  @modal:remove="removeContent"
                                  @modal:update="updateContent"
                                  @modal:close="closeContentModal"
                                  :folder="folder">
            </content-upsert-modal>
        </template>
    </drag-table>
</template>

<script>
    import dragTable from 'js/components/drag-table';
    import contentUpsertModal from '../../contents/upsert-modal';

    export default {
        props: {
            folder: Object
        },
        data() {
            return {
                reordering: false,
                types: [
                    {type: 'text', icon: 'quote-left'},
                    {type: 'gallery', icon: 'image'},
                    {type: 'file', icon: 'file'},
                    {type: 'video', icon: 'video'},
                    {type: 'image', icon: 'image'},
                    {type: 'web', icon: 'link'},
                ],
                contents: this.folder.contents.slice(),
                contentType: null,
                selectedContent: null,
                contentModalActive: false
            };
        },
        components: {
            dragTable,
            contentUpsertModal
        },
        watch: {
            contents(val) {
                this.$emit('content-change', val)
            }
        },
        methods: {
            addContent(content) {
                this.contents.push(content);
                this.closeContentModal();
            },
            updateContent(content) {
                let index = this.contents.findIndex(item => item.id === content.id);
                this.contents.splice(index, 1, content);
                this.closeContentModal();
            },
            removeContent(content) {
                let index = this.contents.findIndex(item => item.id === content.id);
                this.contents.splice(index, 1);
                this.closeContentModal();
            },
            openContentModal(contentType, id = null) {
                this.contentType = contentType;
                this.selectedContent = id ? this.contents.find(item => item.id === id) : null;
                this.contentModalActive = true;
            },
            closeContentModal() {
                this.contentType = null;
                this.contentModalActive = false;
            },
            async reorder(items) {
                this.reordering = true;

                try {
                    await this.$axios.put('/contents/reorder', {items});
                } catch (error) {
                    console.log(error);
                } finally {
                    this.reordering = false;
                }
            }
        }
    };
</script>

<style lang="scss" scoped>
</style>
