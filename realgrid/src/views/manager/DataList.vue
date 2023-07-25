<template>
    <div class="main-body">
        <div class="toolbar">
            <el-button @click="deleteRow" type="danger" round>삭제</el-button>
        </div>

        <div id="realgrid" style="width: 100%; height: 90vh"></div>
    </div>
</template>
<script>
/* eslint-disable */
import apiManagers from '@/api/manager'
//md5를 이용해서 비번 감추기
import md5 from 'md5'

export default {
    mounted() {
        this.provider = new RealGrid.LocalDataProvider();
        this.gridView = new RealGrid.GridView("realgrid");
        this.gridView.setDataSource(this.provider);
        //그리드에서 데이터를 추가할 수 있도록 하고, 직접 삭제는 할 수 없도록 옵션을 조절
        this.gridView.editOptions.insertable = true;
        this.gridView.editOptions.appendable = true;
        this.gridView.editOptions.deletable = true;

        // this.gridView.setEditOptions({
        //     insertable: true,
        //     appendable: true,
        //     deletable: false
        // });

        this.provider.setFields([
            { fieldName: "email" },
            { fieldName: "pw" },
            { fieldName: "name" },
            { fieldName: "rule" },
            { fieldName: "phoneNumber" },
        ]);

        this.gridView.setColumns([
            { name: "email",       fieldName: "email",       width: 120 },
            { name: "pw",          fieldName: "pw" },
            { name: "name",        fieldName: "name"},
            { name: "rule",        fieldName: "rule"},
            { name: "phoneNumber", fieldName: "phoneNumber", width: 120 },
        ]);

        //md5를 이용해서 비번 감추기
        this.gridView.onCellEdited = function (gridView, itemIndex, row, field) {
            if (field === 1) {
                let data = gridView.getValue(itemIndex, 'pw');
                gridView.setValue(itemIndex, 'pw', md5(data));
            }
        }

        //onRowUpdated 이벤트를 이용해서 변경사항을 API에 전달하기
        this.provider.onRowUpdated = (provider, row) => {
            apiManagers
                .update(provider.getJsonRow(row))
                .then((response) => {
                    console.log(response);
                })
                .catch((e) => {
                    console.log(e);
                    this.$router.go();
                });
        };

        //onRowInserted 이벤트를 이용해서 변경사항을 API에 전달하기
        this.provider.onRowInserted = (provider, row) => {
            apiManagers
                .create(provider.getJsonRow(row))
                .then((response) => {
                    console.log(response);
                })
                .catch((e) => {
                    console.log(e);
                    this.$router.go();
                });
        };

        apiManagers
            .list()
            .then((response) => {
                console.log(response);
                this.provider.fillJsonData(response.data.rows.rows, { fillMode: "set" });
            })
            .catch((e) => {
                console.log(e);
            });

    },
    //deleteRow 메소드 추가
    methods: { 
        deleteRow: async function () {
            let itemIndex = this.gridView.getCurrent().itemIndex;
            if (itemIndex === -1) {
                this.$message.error("편집할 데이터를 선택해주세요.");
                return;
            }

            try {
                await this.$confirm("삭제 하시겠습니까?");
            } catch (e) {
                return;
            }

            apiManagers
                .delete(this.provider.getValue(itemIndex, "email"))
                .then((response) => {
                    console.log(response);
                    this.provider.removeRow(itemIndex);
                })
                .catch((e) => {
                    console.log(e);
                });
        }
    },
};
</script>