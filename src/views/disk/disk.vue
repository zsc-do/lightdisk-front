<template>
  <div>

    <!-- 我的目录 -->
    <div class="custom-tree-container">
  
        <div class="block">
            <p>我的目录</p>
            <el-tree
            :data="folderTree"
            node-key="id"
            default-expand-all
            :expand-on-click-node="false"
            @node-click="handleNodeClick">
            <span class="custom-tree-node" slot-scope="{ node, data}">
                <span>{{ node.label }}</span>
                <span>
                <el-button v-if="!data.root"
                    type="text"
                    size="mini"
                    @click="() => shareMenu(data)">
                    分享
                </el-button>
                <el-button v-if="!data.root"
                    type="text"
                    size="mini"
                    @click="() => update(data)">
                    修改
                </el-button>
                
                <el-button v-if="!data.root"
                    type="text"
                    size="mini"
                    @click="() => remove(node, data)">
                    删除
                </el-button>
                <el-button
                    type="text"
                    size="mini"
                    @click="() => append(data)">
                    添加
                </el-button>
                </span>     
            </span>
            </el-tree>
        </div>
    </div>

    <el-divider></el-divider>

    <!-- 上传 -->
    <el-button type="text" @click="dialogVisible = true">点击上传</el-button>
    <el-dialog
        title="上传界面"
        :visible.sync="dialogVisible"
        width="30%">
            <el-upload
                class="uploadContent"
                :action="'http://localhost:30719/WpFile/uploadFile?pid=' + curFolder"
                :headers="header"
                :on-preview="handlePreview"
                :on-remove="handleRemove"
                :before-remove="beforeRemove"
                :on-success="onSuccess"
                :before-upload="beforeUpload"
                multiple
                :file-list="uploadedFiles">
                <el-button size="small" type="primary">点击上传</el-button>

            </el-upload>
        
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
    </el-dialog>

    

    <el-divider></el-divider>

    <!-- 我的文件 -->
    <div class="file">
        
            <div style="float:left; width:150px; height:150px"  v-for="file in curFiles" :key="file.fileId">
                <div class="chooseFile" v-if="['png','jpg'].indexOf(renderSuffix(file.fileName)) !== -1">
                    <svg t="1672557309685" class="icon fileIcon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1211" width="50" height="50"><path d="M862 902c0 16.569-13.431 30-30 30H192c-16.569 0-30-13.431-30-30V122c0-16.569 13.431-30 30-30h476l194 194v616z" fill="#FFAB4E" p-id="1212"></path><path d="M862 286H698c-16.569 0-30-13.431-30-30V92" fill="#FFFFFF" fill-opacity=".296" p-id="1213"></path><path d="M440.26 397.636l152.711 269.49c4.901 8.649 1.863 19.633-6.786 24.534a18 18 0 0 1-8.874 2.34H271.889c-9.941 0-18-8.059-18-18a18 18 0 0 1 2.34-8.874l152.71-269.49c4.902-8.649 15.886-11.687 24.535-6.786a18 18 0 0 1 6.786 6.786z" fill="#FFFFFF" p-id="1214"></path><path d="M633.04 497.15l96.32 169.976c4.9 8.649 1.863 19.633-6.786 24.534a18 18 0 0 1-8.875 2.34H521.061c-9.942 0-18-8.059-18-18a18 18 0 0 1 2.34-8.874L601.72 497.15c4.9-8.649 15.885-11.687 24.534-6.786a18 18 0 0 1 6.786 6.786z" fill="#FFFFFF" p-id="1215"></path><path d="M695 420m-50 0a50 50 0 1 0 100 0 50 50 0 1 0-100 0Z" fill="#FFFFFF" p-id="1216"></path></svg>                
                    <div class="fileName">{{ file.fileName.length > 8? file.fileName.substr(0,9) + '...': file.fileName}}</div>
                    <div class="fileOp">
                        <el-button type="text"  @click="downloadFile(file.fileId)">下载</el-button>
                        <el-button type="text" @click="filedetail(file.fileId)">查看</el-button>
                    </div>
                </div>
                <div class="chooseFile" v-else-if="['rar','zip'].indexOf(renderSuffix(file.fileName)) !== -1">
                    <svg t="1672557364754" class="icon fileIcon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1360" width="50" height="50"><path d="M862 902c0 16.569-13.431 30-30 30H192c-16.569 0-30-13.431-30-30V122c0-16.569 13.431-30 30-30h476l194 194v616z" fill="#7DB4FF" p-id="1361"></path><path d="M862 286H698c-16.569 0-30-13.431-30-30V92" fill="#FFFFFF" fill-opacity=".296" p-id="1362"></path><path d="M289 92h70v70h-70zM359 162h70v70h-70zM289 232h70v70h-70zM359 302h70v70h-70zM289 372h70v70h-70zM289 468h140v110c0 16.569-13.431 30-30 30h-80c-16.569 0-30-13.431-30-30V468z" fill="#FFFFFF" p-id="1363"></path></svg>
                    <div class="fileName">{{ file.fileName.length > 8? file.fileName.substr(0,9) + '...': file.fileName}}</div>
                    <div class="fileOp">
                        <el-button type="text"  @click="downloadFile(file.fileId)">下载</el-button>
                        <el-button type="text" @click="filedetail(file.fileId)">查看</el-button>
                    </div>
                </div>
                <div class="chooseFile" v-else-if="['doc','docx'].indexOf(renderSuffix(file.fileName)) !== -1">
                    <svg t="1672557439208" class="icon fileIcon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1505" width="50" height="50"><path d="M862 902c0 16.569-13.431 30-30 30H192c-16.569 0-30-13.431-30-30V122c0-16.569 13.431-30 30-30h476l194 194v616z" fill="#4895FF" p-id="1506"></path><path d="M862 286H698c-16.569 0-30-13.431-30-30V92" fill="#FFFFFF" fill-opacity=".296" p-id="1507"></path><path d="M361.81 703h93.1l53.41-215.6h2.94L563.69 703h93.1l77.91-340.06h-76.93l-49.98 251.37h-2.94l-49-218.54h-86.24l-51.94 218.54h-2.94l-49-251.37h-77.91z" fill="#FFFFFF" p-id="1508"></path></svg>
                    <div class="fileName">{{ file.fileName.length > 8? file.fileName.substr(0,9) + '...': file.fileName}}</div>
                    <div class="fileOp">
                        <el-button type="text"  @click="downloadFile(file.fileId)">下载</el-button>
                        <el-button type="text" @click="filedetail(file.fileId)">查看</el-button>
                    </div>
                </div>
                <div class="chooseFile" v-else-if="['pdf'].indexOf(renderSuffix(file.fileName)) !== -1">
                    <svg t="1672558959162" class="icon fileIcon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1797" width="50" height="50"><path d="M862 902c0 16.569-13.431 30-30 30H192c-16.569 0-30-13.431-30-30V122c0-16.569 13.431-30 30-30h476l194 194v616z" fill="#FF6359" p-id="1798"></path><path d="M862 286H698c-16.569 0-30-13.431-30-30V92" fill="#FFFFFF" fill-opacity=".296" p-id="1799"></path><path d="M234.64 641h48.64v-68.48h27.2c62.72 0 87.36-20.16 87.36-78.08 0-53.44-20.8-75.52-87.36-75.52h-75.84V641z m48.64-107.52v-76.16h20.8c32.64 0 44.16 9.6 44.16 38.08 0 29.44-11.2 38.08-44.16 38.08h-20.8zM437.52 418.92V641h76.16c65.28 0 108.16-25.28 108.16-111.04 0-92.48-42.88-111.04-108.16-111.04h-76.16z m48.64 180.48V459.88h24.96c40 0 60.48 12.8 60.48 70.08 0 54.08-19.52 69.44-60.48 69.44h-24.96zM801.36 461.16v-42.24H665.68V641h48.64v-86.4h80.64v-41.92h-80.64v-51.52z" fill="#FFFFFF" p-id="1800"></path></svg>                
                    <div class="fileName">{{ file.fileName.length > 8? file.fileName.substr(0,9) + '...': file.fileName}}</div>
                    <div class="fileOp">
                        <el-button type="text"  @click="downloadFile(file.fileId)">下载</el-button>
                        <el-button type="text" @click="filedetail(file.fileId)">查看</el-button>
                    </div>
                </div>
                <div class="chooseFile" v-else-if="['xlsx','xls'].indexOf(renderSuffix(file.fileName)) !== -1">
                    <svg t="1672558999957" class="icon fileIcon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1944" width="50" height="50"><path d="M862 902c0 16.569-13.431 30-30 30H192c-16.569 0-30-13.431-30-30V122c0-16.569 13.431-30 30-30h476l194 194v616z" fill="#60C267" p-id="1945"></path><path d="M862 286H698c-16.569 0-30-13.431-30-30V92" fill="#FFFFFF" fill-opacity=".296" p-id="1946"></path><path d="M495.93 707.9c93.59 0 130.83-35.77 130.83-102.41 0-63.21-17.64-88.69-98.98-108.29-49.98-11.76-57.82-19.6-57.82-41.65 0-28.91 16.17-36.26 54.88-36.26 28.42 0 67.62 6.86 84.28 12.25v-61.25c-18.13-6.37-48.51-12.25-87.22-12.25-78.89 0-124.46 27.44-124.46 99.47 0 60.76 21.07 81.34 93.59 98 51.94 12.74 61.74 22.05 61.74 48.02 0 30.38-14.7 40.67-59.78 40.67-34.3 0-74.97-5.88-96.04-13.72v65.17c21.07 5.88 59.29 12.25 98.98 12.25z" fill="#FFFFFF" p-id="1947"></path></svg>                
                    <div class="fileName">{{ file.fileName.length > 8? file.fileName.substr(0,9) + '...': file.fileName}}</div>
                    <div class="fileOp">
                        <el-button type="text"  @click="downloadFile(file.fileId)">下载</el-button>
                        <el-button type="text" @click="filedetail(file.fileId)">查看</el-button>
                    </div>
                </div>
                <div class="chooseFile" v-else-if="['mp4'].indexOf(renderSuffix(file.fileName)) !== -1">
                    <svg t="1673847678766" class="icon fileIcon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1064" width="50" height="50"><path d="M862 902c0 16.569-13.431 30-30 30H192c-16.569 0-30-13.431-30-30V122c0-16.569 13.431-30 30-30h476l194 194v616z" fill="#C076E5" p-id="1065"></path><path d="M862 286H698c-16.569 0-30-13.431-30-30V92" fill="#FFFFFF" fill-opacity=".296" p-id="1066"></path><path d="M257 92h70v70h-70zM257 232h70v70h-70zM257 372h70v70h-70zM257 512h70v70h-70zM257 652h70v70h-70zM257 792h70v70h-70z" fill="#FFFFFF" p-id="1067"></path><path d="M698 302h70v70h-70zM698 442h70v70h-70zM698 582h70v70h-70zM698 722h70v70h-70zM698 862h70v70h-70z" fill="#FFFFFF" p-id="1068"></path><path d="M593.941 544.47l-138.743 95.568c-9.096 6.266-21.55 3.971-27.816-5.125a20 20 0 0 1-3.529-11.345V432.432c0-11.045 8.954-20 20-20a20 20 0 0 1 11.345 3.53l138.743 95.567c9.097 6.266 11.392 18.72 5.126 27.816a20 20 0 0 1-5.126 5.126z" fill="#FFFFFF" p-id="1069"></path></svg>
                    <div class="fileName">{{ file.fileName.length > 8? file.fileName.substr(0,9) + '...': file.fileName}}</div>
                    <div class="fileOp">
                        <el-button type="text"  @click="downloadFile(file.fileId)">下载</el-button>
                        <el-button type="text"  @click="watchVideo(file.fileId)">播放</el-button>
                        <el-button type="text" @click="filedetail(file.fileId)">查看</el-button>
                    </div>
                </div>
                <div   class="chooseFile" v-else>
                    <svg t="1672557499344" class="icon fileIcon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1650" width="50" height="50"><path d="M862 902c0 16.569-13.431 30-30 30H192c-16.569 0-30-13.431-30-30V122c0-16.569 13.431-30 30-30h476l194 194v616z" fill="#BEBEBE" p-id="1651"></path><path d="M862 286H698c-16.569 0-30-13.431-30-30V92" fill="#FFFFFF" fill-opacity=".296" p-id="1652"></path><path d="M474.17 591.28h59.78v-11.27c0-16.66 5.88-25.97 35.77-48.02 33.32-24.99 44.1-42.63 44.1-88.2 0-68.6-33.32-86.73-113.68-86.73-29.4 0-55.86 3.43-73.99 8.82v60.76c17.15-5.39 39.69-8.33 59.78-8.33 39.69 0 51.94 6.37 51.94 35.77 0 20.58-4.41 29.89-25.97 47.04-28.91 24.99-37.73 40.18-37.73 68.11v22.05z m30.38 114.66c34.79 0 41.65-5.88 41.65-41.16 0-34.3-6.86-40.67-41.65-40.67-35.28 0-41.65 6.37-41.65 40.67 0 35.28 6.37 41.16 41.65 41.16z" fill="#FFFFFF" p-id="1653"></path></svg>
                    <div class="fileName">{{ file.fileName }}</div>
                    <div class="fileOp">
                        <el-button type="text"  @click="downloadFile(file.fileId)">下载</el-button>
                        <el-button type="text" @click="filedetail(file.fileId)">查看</el-button>
                    </div>
                </div>
            </div>
    </div>




    <el-dialog title="分享选项" :visible.sync="shareSelectVisible">
        <el-form :model="shareOption">
            <el-form-item label="提取密码" style="width: 30%;">
                <el-input placeholder="默认为无密码" v-model="shareOption.exCode"></el-input>
            </el-form-item>

            <el-form-item label="选择截止日期" style="width: 40%;">
                <div class="block">
                    <el-date-picker
                    v-model="shareOption.endTime"
                    type="date"
                    placeholder="选择日期"
                    :picker-options="shareOption.pickerOptions"
                    value-format="yyyy-MM-dd">
                    </el-date-picker>
                </div>
            </el-form-item>
            
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="shareSelectVisible = false">取 消</el-button>
            <el-button type="primary" @click="share()">确 定</el-button>
        </div>
    </el-dialog>



    <div class="video" v-if="video.hidden === false">
        <video
            width="600" height="600" controls="controls" autoplay id="videoId">
            <source :src="video.url" type="video/mp4">
        </video>
        <el-button @click="closeVideo" class="videoClose" type="info" icon="el-icon-close" circle></el-button>
    </div>
    
    
  </div>
</template>

<script> 

let id = 100;
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
            uploadedFiles: [],
            dialogVisible: false,
            header:{authorization: window.localStorage.getItem("token"),},

            shareSelectVisible:false,

            shareOption:{
                shareFolderId:'',
                exCode:'',
                endTime:'',
                pickerOptions: {
                    disabledDate(time) {
                        return time.getTime() <= Date.now();
                    },
                }
            },

            video:{
                hidden:true,
                url:''
            }
        }
    },

    methods:{

        //递归渲染目录树
        renderFolderTree(curNode, newCurNode) {

            // debugger;
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


            this.$http.apiGet("/WpFile/showFile?pid=" + data.id,{ headers: {'Authorization':  localStorage.getItem('token')}}).then((res)=>{
                console.log(res);

                this.curFiles = res;

                this.curFolder = data.id
            })


        },


        shareMenu(data){
            this.shareSelectVisible = true;

            this.shareOption.shareFolderId = data.id;
        },

        share(){        


            this.$http.apiGet(`/ShareFile/shareFile?fileId=${this.shareOption.shareFolderId}&exCode=${this.shareOption.exCode}&endTime=${this.shareOption.endTime}`
            ,{ headers: {'Authorization':  localStorage.getItem('token')}}).then((res)=>{

                this.shareSelectVisible = false;
                
                this.$alert(`你的分享链接:
                            http://localhost:8080/share?shareCode=${res}`, '可以分享了', {
                    confirmButtonText: '确定'
                });
            })
        },

        append(data) {


            this.$prompt('请输入新创建的目录名', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            }).then(({ value }) => {

                let pid = data.id;
                this.$http.apiGet(`/WpFile/addFolder?pid=${pid}&folderName=${value}`,{ headers: {'Authorization':  localStorage.getItem('token')}}).then((res)=>{

                    if(res === '文件夹名已存在'){
                        this.$message({
                            type: 'error',
                            message: '文件夹名已存在'
                        }); 

                        return;
                    }

                    const newChild = { id: res.fileId, label: res.fileName, children: [] };
                    if (!data.children) {
                        this.$set(data, 'children', []);
                    }
                    data.children.push(newChild);
                })
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '取消输入'
                });       
            });

        },

        remove(node, data) {

            this.$http.apiGet("/WpFile/deleteFolder?id=" + node.data.id).then((res)=>{

                const parent = node.parent;
                const children = parent.data.children || parent.data;
                const index = children.findIndex(d => d.id === data.id);
                children.splice(index, 1);

                console.log(node)
            })
            
        },

        update(node){
            this.$prompt('请输入新的目录名', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            inputValue:node.label
            }).then(({ value }) => {

                console.log(node)
                this.$http.apiGet("/WpFile/updateFolder?newName=" + value + '&id=' + node.id).then((res)=>{
                    node.label = value;
                })
                
            }).catch(() => {
            this.$message({
                type: 'info',
                message: '取消输入'
            });       
            });
        },

        downloadFile(fileId){
            window.location.href = "http://localhost:30719/WpFile/downloadFile?id=" + fileId

        },

        filedetail(fileId){
            this.$http.apiGet(`/WpFile/fileDetail?fileId=${fileId}`,{ headers: {'Authorization':  localStorage.getItem('token')}})
            .then((res)=>{


                let sizeMB = res.fileSize / 1024 / 1024

                if(sizeMB >= 1024){
                    sizeMB =  Math.trunc(sizeMB / 1024)  + "GB";
                }else{
                    sizeMB = Math.trunc(sizeMB)  + "MB";
                }



                this.$notify({
                    title: '文件信息',
                    message: `文件名:${res.fileName}
                              文件大小:${sizeMB}`,
                    offset: 100
                });
                
            });

        },


        handleRemove(file, fileList) {
            console.log(file, fileList);
        },
        handlePreview(file) {
            console.log(file);
        },
       
        beforeRemove(file, fileList) {
            return this.$confirm(`确定移除 ${ file.name }？`);
        },

        //上传前判断空间是否充足
        beforeUpload(file){
            this.$http.apiGet(`/WpFile/judgeUserStorage?size=${file.size}`,{ headers: {'Authorization':  localStorage.getItem('token')}}).then((res)=>{

                console.log(res)
                if(res === 'true'){
                    return true;
                }else{
                    this.$message({
                    type: 'warning',
                    message: '空间不足'
                    });    
                    
                    return false;
                }
            })
        },

        onSuccess(response, file, fileList){

            console.log(response, file, fileList)
            this.curFiles.push(response)

        },

        renderSuffix(name){
            let suffix = name.substr(name.lastIndexOf(".")+1).toLowerCase();//txt
            return suffix;
        },

        watchVideo(fileId){

            this.video.hidden = false;
            this.video.url = `http://localhost:30719/WpFile/downloadFile?id=${fileId}`
        
        },

        closeVideo(){
            this.video.hidden = true;
            this.video.url = ''
        },


        
       
        
        
    },

    mounted(){
        this.$http.apiGet("/WpFile/showFolder",{ headers: {'Authorization':  localStorage.getItem('token')}})
        .then((res)=>{

                let rootNode = [{
                    label: '我的网盘',
                    id: res.childFolder[0].fileId,
                    children: [],
                    root:true
                }]

                let finalFolderTree = this.renderFolderTree(res.childFolder[0], rootNode[0]);

                this.folderTree = [finalFolderTree]
               
        });

    
    }
}
</script>


<style scoped>
    

  .custom-tree-node {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 14px;
    padding-right: 8px;
  }

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

  .video{
    position: absolute;
    left:30%;
    top:0%;
  }

  .videoClose{
    position: absolute;
    top:15%;
  }
  
  
</style>