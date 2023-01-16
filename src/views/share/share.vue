<template>
  <div>
    <div v-if="shareOption.exFlag">

        <!-- 分享文件目录 -->
        <div class="custom-tree-container">
            <div class="block">
            <p>分享文件目录</p>
            <el-tree
            :data="folderTree"
            node-key="id"
            default-expand-all
            :expand-on-click-node="false"
            @node-click="handleNodeClick">

            </el-tree>
            </div>

            <el-divider></el-divider>

            <el-button type="success" plain @click="saveShareFile()">保存</el-button>
            <el-dialog
                    title="选择保存到该目录"
                    :visible.sync="dialogVisible"
                    width="30%">
                        <el-tree
                        :data="selectFolderTree"
                        node-key="id"
                        default-expand-all
                        :expand-on-click-node="false"
                        @node-click="chooseFolder">

                        </el-tree>
                            
                        <el-button @click="dialogVisible = false">取 消</el-button>
                        <el-button type="primary" @click="saveShareFile2()">确 定</el-button>
                </el-dialog>

            <el-divider></el-divider>

            <!-- 我的文件 -->
            <div class="file">
                
                <div style="float:left; width:150px; height:150px"  v-for="file in curFiles" :key="file.shareFileId">
                    <div class="chooseFile" v-if="['png','jpg'].indexOf(renderSuffix(file.wpFileName)) !== -1">
                        <svg t="1672557309685" class="icon fileIcon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1211" width="50" height="50"><path d="M862 902c0 16.569-13.431 30-30 30H192c-16.569 0-30-13.431-30-30V122c0-16.569 13.431-30 30-30h476l194 194v616z" fill="#FFAB4E" p-id="1212"></path><path d="M862 286H698c-16.569 0-30-13.431-30-30V92" fill="#FFFFFF" fill-opacity=".296" p-id="1213"></path><path d="M440.26 397.636l152.711 269.49c4.901 8.649 1.863 19.633-6.786 24.534a18 18 0 0 1-8.874 2.34H271.889c-9.941 0-18-8.059-18-18a18 18 0 0 1 2.34-8.874l152.71-269.49c4.902-8.649 15.886-11.687 24.535-6.786a18 18 0 0 1 6.786 6.786z" fill="#FFFFFF" p-id="1214"></path><path d="M633.04 497.15l96.32 169.976c4.9 8.649 1.863 19.633-6.786 24.534a18 18 0 0 1-8.875 2.34H521.061c-9.942 0-18-8.059-18-18a18 18 0 0 1 2.34-8.874L601.72 497.15c4.9-8.649 15.885-11.687 24.534-6.786a18 18 0 0 1 6.786 6.786z" fill="#FFFFFF" p-id="1215"></path><path d="M695 420m-50 0a50 50 0 1 0 100 0 50 50 0 1 0-100 0Z" fill="#FFFFFF" p-id="1216"></path></svg>                
                        <div class="fileName">{{ file.wpFileName.length > 8? file.wpFileName.substr(0,9) + '...': file.wpFileName}}</div>
                        <div class="fileOp">
                            <el-button type="text">查看</el-button>
                        </div>
                    </div>
                    <div class="chooseFile" v-else-if="['rar','zip'].indexOf(renderSuffix(file.wpFileName)) !== -1">
                        <svg t="1672557364754" class="icon fileIcon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1360" width="50" height="50"><path d="M862 902c0 16.569-13.431 30-30 30H192c-16.569 0-30-13.431-30-30V122c0-16.569 13.431-30 30-30h476l194 194v616z" fill="#7DB4FF" p-id="1361"></path><path d="M862 286H698c-16.569 0-30-13.431-30-30V92" fill="#FFFFFF" fill-opacity=".296" p-id="1362"></path><path d="M289 92h70v70h-70zM359 162h70v70h-70zM289 232h70v70h-70zM359 302h70v70h-70zM289 372h70v70h-70zM289 468h140v110c0 16.569-13.431 30-30 30h-80c-16.569 0-30-13.431-30-30V468z" fill="#FFFFFF" p-id="1363"></path></svg>
                        <div class="fileName">{{ file.wpFileName.length > 8? file.wpFileName.substr(0,9) + '...': file.wpFileName}}</div>
                        <div class="fileOp">
                            <el-button type="text">查看</el-button>
                        </div>
                    </div>
                    <div class="chooseFile" v-else-if="['doc','docx'].indexOf(renderSuffix(file.wpFileName)) !== -1">
                        <svg t="1672557439208" class="icon fileIcon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1505" width="50" height="50"><path d="M862 902c0 16.569-13.431 30-30 30H192c-16.569 0-30-13.431-30-30V122c0-16.569 13.431-30 30-30h476l194 194v616z" fill="#4895FF" p-id="1506"></path><path d="M862 286H698c-16.569 0-30-13.431-30-30V92" fill="#FFFFFF" fill-opacity=".296" p-id="1507"></path><path d="M361.81 703h93.1l53.41-215.6h2.94L563.69 703h93.1l77.91-340.06h-76.93l-49.98 251.37h-2.94l-49-218.54h-86.24l-51.94 218.54h-2.94l-49-251.37h-77.91z" fill="#FFFFFF" p-id="1508"></path></svg>
                        <div class="fileName">{{ file.wpFileName.length > 8? file.wpFileName.substr(0,9) + '...': file.wpFileName}}</div>
                        <div class="fileOp">
                            <el-button type="text">查看</el-button>
                        </div>
                    </div>
                    <div class="chooseFile" v-else-if="['pdf'].indexOf(renderSuffix(file.wpFileName)) !== -1">
                        <svg t="1672558959162" class="icon fileIcon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1797" width="50" height="50"><path d="M862 902c0 16.569-13.431 30-30 30H192c-16.569 0-30-13.431-30-30V122c0-16.569 13.431-30 30-30h476l194 194v616z" fill="#FF6359" p-id="1798"></path><path d="M862 286H698c-16.569 0-30-13.431-30-30V92" fill="#FFFFFF" fill-opacity=".296" p-id="1799"></path><path d="M234.64 641h48.64v-68.48h27.2c62.72 0 87.36-20.16 87.36-78.08 0-53.44-20.8-75.52-87.36-75.52h-75.84V641z m48.64-107.52v-76.16h20.8c32.64 0 44.16 9.6 44.16 38.08 0 29.44-11.2 38.08-44.16 38.08h-20.8zM437.52 418.92V641h76.16c65.28 0 108.16-25.28 108.16-111.04 0-92.48-42.88-111.04-108.16-111.04h-76.16z m48.64 180.48V459.88h24.96c40 0 60.48 12.8 60.48 70.08 0 54.08-19.52 69.44-60.48 69.44h-24.96zM801.36 461.16v-42.24H665.68V641h48.64v-86.4h80.64v-41.92h-80.64v-51.52z" fill="#FFFFFF" p-id="1800"></path></svg>                
                        <div class="fileName">{{ file.wpFileName.length > 8? file.wpFileName.substr(0,9) + '...': file.wpFileName}}</div>
                        <div class="fileOp">
                            <el-button type="text">查看</el-button>
                        </div>
                    </div>
                    <div class="chooseFile" v-else-if="['xlsx','xls'].indexOf(renderSuffix(file.wpFileName)) !== -1">
                        <svg t="1672558999957" class="icon fileIcon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1944" width="50" height="50"><path d="M862 902c0 16.569-13.431 30-30 30H192c-16.569 0-30-13.431-30-30V122c0-16.569 13.431-30 30-30h476l194 194v616z" fill="#60C267" p-id="1945"></path><path d="M862 286H698c-16.569 0-30-13.431-30-30V92" fill="#FFFFFF" fill-opacity=".296" p-id="1946"></path><path d="M495.93 707.9c93.59 0 130.83-35.77 130.83-102.41 0-63.21-17.64-88.69-98.98-108.29-49.98-11.76-57.82-19.6-57.82-41.65 0-28.91 16.17-36.26 54.88-36.26 28.42 0 67.62 6.86 84.28 12.25v-61.25c-18.13-6.37-48.51-12.25-87.22-12.25-78.89 0-124.46 27.44-124.46 99.47 0 60.76 21.07 81.34 93.59 98 51.94 12.74 61.74 22.05 61.74 48.02 0 30.38-14.7 40.67-59.78 40.67-34.3 0-74.97-5.88-96.04-13.72v65.17c21.07 5.88 59.29 12.25 98.98 12.25z" fill="#FFFFFF" p-id="1947"></path></svg>                
                        <div class="fileName">{{ file.wpFileName.length > 8? file.wpFileName.substr(0,9) + '...': file.wpFileName}}</div>
                        <div class="fileOp">
                            <el-button type="text">查看</el-button>
                        </div>
                    </div>
                    <div   class="chooseFile" v-else>
                        <svg t="1672557499344" class="icon fileIcon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1650" width="50" height="50"><path d="M862 902c0 16.569-13.431 30-30 30H192c-16.569 0-30-13.431-30-30V122c0-16.569 13.431-30 30-30h476l194 194v616z" fill="#BEBEBE" p-id="1651"></path><path d="M862 286H698c-16.569 0-30-13.431-30-30V92" fill="#FFFFFF" fill-opacity=".296" p-id="1652"></path><path d="M474.17 591.28h59.78v-11.27c0-16.66 5.88-25.97 35.77-48.02 33.32-24.99 44.1-42.63 44.1-88.2 0-68.6-33.32-86.73-113.68-86.73-29.4 0-55.86 3.43-73.99 8.82v60.76c17.15-5.39 39.69-8.33 59.78-8.33 39.69 0 51.94 6.37 51.94 35.77 0 20.58-4.41 29.89-25.97 47.04-28.91 24.99-37.73 40.18-37.73 68.11v22.05z m30.38 114.66c34.79 0 41.65-5.88 41.65-41.16 0-34.3-6.86-40.67-41.65-40.67-35.28 0-41.65 6.37-41.65 40.67 0 35.28 6.37 41.16 41.65 41.16z" fill="#FFFFFF" p-id="1653"></path></svg>
                        <div class="fileName">{{ file.wpFileName }}</div>
                        <div class="fileOp">
                            <el-button type="text" @click="showFiledetail(file.shareFileId)">查看</el-button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>


    <div class="lockform">
            <el-form  :inline="true" v-if="!shareOption.exFlag" :model="shareOption">
                <el-form-item label="提取码">
                    <el-input v-model="shareOption.exCode"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="exFile()">提取</el-button>
                </el-form-item> 
            </el-form>   
    </div>

  </div>
</template>

<script>
export default {


    data(){
        return {
            folderTree:[],
            defaultProps: {
                children: 'children',
                label: 'label'
            },

            curFiles:[],

            curFolder:0,
            
            header:{authorization: window.localStorage.getItem("token"),},

            shareCode:"",

            dialogVisible: false,

            selectFolderTree:[],

            chooseFolderId:"",

            shareOption:{
                exFileVisible:false,
                exCode:'',
                exFlag:false
            }
        }
    },


    methods:{
        //递归渲染目录树
        renderFolderTree(curNode, newCurNode) {

            if (curNode.childFolder.length === 0) {
                return newCurNode;
            }

            for (let i = 0; i < curNode.childFolder.length; i++) {

                let node = {};
                node.label = curNode.childFolder[i].wpFileName;
                node.id = curNode.childFolder[i].shareFileId;
                node.children = []


                this.renderFolderTree(curNode.childFolder[i], node)


                newCurNode.children.push(node);


            }

            return newCurNode;
        },


        //递归渲染目录树
        renderFolderTree2(curNode, newCurNode) {

            if (curNode.childFolder.length === 0) {
                return newCurNode;
            }

            for (let i = 0; i < curNode.childFolder.length; i++) {

                let node = {};
                node.label = curNode.childFolder[i].fileName;
                node.id = curNode.childFolder[i].fileId;
                node.children = []


                this.renderFolderTree(curNode.childFolder[i], node)


                newCurNode.children.push(node);


            }

            return newCurNode;
        },
        
        
        handleNodeClick(data) {
            this.$http.apiGet(`/ShareFile/showShareFile?pid=${data.id}&shareCode=${this.shareCode}`).then((res)=>{
                console.log(res);

                this.curFiles = res;

                this.curFolder = data.id
            })
        },


        renderSuffix(name){
            let suffix = name.substr(name.lastIndexOf(".")+1).toLowerCase();//txt
            return suffix;
        },

        saveShareFile(){

            console.log(this.header.authorization)
            if(!this.header.authorization){

                this.$message('你还没有登录，请先登录');

                this.$router.push('/login?shareCode='+ this.shareCode)
            }else{

                this.dialogVisible = true;


                this.$http.apiGet("/WpFile/showFolder",{ headers: {'Authorization':  localStorage.getItem('token')}})
                .then((res)=>{

                        let rootNode = [{
                            label: '你的网盘',
                            id: res.childFolder[0].fileId,
                            children: []
                        }]

                        let finalFolderTree = this.renderFolderTree2(res.childFolder[0], rootNode[0]);

                        this.selectFolderTree = [finalFolderTree]
                    
                })

            }
        },


        chooseFolder(data){
            this.chooseFolderId = data.id;
        },

        saveShareFile2(){
            this.$http.apiGet("/ShareFile/saveShareFile?pid=" + this.chooseFolderId + "&shareCode=" +this.shareCode,
            { headers: {'Authorization':  localStorage.getItem('token')}}).then((res)=>{
                
                this.dialogVisible = false;

                this.$message({
                    message: '恭喜你，保存成功',
                    type: 'success'
                })
            })
        },


        exFile(){
            this.$http.apiGet(`/ShareFile/showShareFolder?shareCode=${this.shareCode}&exCode=${this.shareOption.exCode}`)
            .then((res)=>{

            if(res ==='过期了'){
                this.$message.error('文件已过期了')
                return;
            }


            if(res ==='提取码错误'){
                this.$message.warning('请输入正确的提取码')
                return;
            }


            this.$message.success('提取码正确')
            this.shareOption.exFlag = true;

            let rootNode = [{
                label: '网盘分享',
                id: 0,
                children: []
            }]

            let finalFolderTree = this.renderFolderTree(res, rootNode[0]);

            this.folderTree = [finalFolderTree]
               
        })
        }
        
    },


    mounted(){

        this.shareCode = this.$route.query.shareCode

        this.exFile();
    }

}
</script>

<style>
.fileName{
    margin-left:40px;
  }

  .fileIcon{
    margin-left:51px;
  }

  .chooseFile:hover .fileOp{
    display: inline;
  }

  .fileOp{
    margin-left:40px;
    display:none;
  }

  .lockform{
	text-align: center; /*让div内部文字居中*/
	background-color: #fff;
	border-radius: 20px;
	width: 300px;
	height: 350px;
	margin: auto;
	position: absolute;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
  }
</style>