<template>
  <div>
    <p class="page-title">文本录入</p>
    <div class="page-box">
      <el-form :model="dynamicValidateForm"  :inline="true" ref="dynamicValidateForm" label-width="120px" class="demo-dynamic">
        <div class="form-upload">
          <p class="form-upload-p">1、背景图片上传</p>
          <el-upload
            class="form-upload-cell"
            action=""
            :limit="1"
            :before-upload="beforeUpload"
            :on-change="handleChange"
            :on-success="handleSuccess"
            :file-list="fileList"
            :auto-upload="false"
            list-type="picture-card"
          >
            <i class="el-icon-plus"></i>
          </el-upload>
        </div>
        <p class="form-content-p">2、内容录入</p>
        <div v-show="!showGenerate" v-for="(item, index) in dynamicValidateForm.formList"  :key="item.key" class="form-item">
          <el-form-item
           class="form-title"
            :label="index=== 0 ? '首屏(主标题)' : `标题${index}`"
            :prop="'formList.' + index + '.title'"
            :rules="{
              required: true, message: '标题不能为空', trigger: 'blur'
            }"
          >
            <el-input v-model="item.title"></el-input>
          </el-form-item>
          <el-form-item
            class="form-content"
            :label="index=== 0 ? '首屏(子标题)' : `内容${index}`"
            :prop="'formList.' + index + '.content'"
            :rules="{
              required: true, message: '内容不能为空', trigger: 'blur'
            }"
          >
            <el-input v-model="item.content" v-if="index===0"></el-input>
            <vue-editor v-model="item.content" v-else></vue-editor>
          </el-form-item>
          <el-form-item>
            <el-button @click.prevent="removecontent(index)" v-show="dynamicValidateForm.formList.length !== 1">删除</el-button>
            <el-button @click="addcontent" v-show="dynamicValidateForm.formList.length - 1 === index">新增</el-button>
          </el-form-item>
        </div>
       
        <div class="btn-group">
          <el-button v-show="!showGenerate" @click="resetForm('dynamicValidateForm')">重置</el-button>
          <el-button v-show="!showGenerate" type="primary" @click="submitForm('dynamicValidateForm')">一键生成</el-button>
          <el-button v-show="showGenerate" @click="showGenerate=false">返回</el-button>
          <el-button v-show="showGenerate" type="primary" @click="generateAndDownloadZip">一键导出</el-button>
        </div>
      </el-form>
    </div>
    <br/>
    <div class="img-box" v-show="showGenerate">
      <div v-for="(item, index) in list" :key="index" class="item" ref="items">
        <div class="item-content">
          <div class="cell-p">
            <p :class="index === 0 ? 'title-0' : 'title'">{{item.title}}</p>
            <p :class="index === 0 ? 'info-0' : 'info'" v-html="item.content"></p>
          </div>
        </div>
      </div>
    </div>
    <div style="text-align:center">
      <a href="https://beian.miit.gov.cn/#/Integrated/index" style="color: #98a3b7;position:fixed;bottom:0;padding:10px 0">湘ICP备2024078658号-1</a>
    </div>
  </div>
</template>

<script>
import html2canvas from 'html2canvas';
import JSZip from 'jszip';
import { saveAs } from 'file-saver';
import { VueEditor } from "vue2-editor";

export default {
  name: 'HomePage',
  components: {
    VueEditor,
  },
  data() {
    return {
      list: [{
        title: '主标题',
        content: '我是子标题'
      },
      {
        title: '主标题',
        content: '我是子标题'
      }],
      showGenerate: false,
      dynamicValidateForm: {
        formList: [
          {
            title: '',
            content: ''
          }
        ],
      },
      fileList: [], // 存储上传的文件列表
    }
  },
  created() {
  },
  mounted() {
  },
  methods: {
    beforeUpload(file) {
      const isImage = file.type.startsWith('image/');
      if (!isImage) {
        this.$message.error('只能上传图片文件');
        return false;
      }
      return true;
    },
    handleChange(file) {
      // 每次上传新图片时，覆盖之前的图片
      this.fileList = [file];
    },
    handleSuccess(response) {
      // 假设 response 中包含了图片的 URL
      this.imageUrl = `${response.url}?t=${new Date().getTime()}`;
    },
    submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.showGenerate = true
            this.list = this.dynamicValidateForm.formList
            console.log(this.dynamicValidateForm.formList);
          } else {
            console.log('error submit!!');
            return false;
          }
        });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
      this.dynamicValidateForm.formList = 
      [
          {
            title: '',
            content: ''
          }
      ]
    },
    removecontent(index) {
      this.dynamicValidateForm.formList.splice(index, 1)
    },
    addcontent() {
      this.dynamicValidateForm.formList.push({
        title: '',
        content: '',
        key: `content-${Date.now()}`
      });
    },
    async generateAndDownloadZip() {
      const items = this.$refs.items;
      const zip = new JSZip();
      const folder = zip.folder("素材");

      for (let i = 0; i < items.length; i++) {
        const item = items[i];
        try {
          const canvas = await html2canvas(item, {
            scale: 2, // 提高缩放比例
            useCORS: true, // 确保跨域图片可以被渲染
            logging: true
          });
          const dataUrl = canvas.toDataURL('image/png');
          const base64Data = dataUrl.split(',')[1]; // 去掉URL前缀部分
          folder.file(`素材-${i + 1}.png`, base64Data, {base64: true});
        } catch (error) {
          console.error('oops, something went wrong!', error);
        }
      }

      zip.generateAsync({type: "blob"})
        .then(content => {
          saveAs(content, "素材.zip");
        });
    },
  }
}
</script>
<style  scoped>
.page-title {
  position: fixed;
  background: #8b3dff;
  width: 100%;
  height: 60px;
  font-weight: bold;
  font-size: 22px;
  line-height: 60px;
  padding-left: 20px;
  color: #fff;
  z-index: 2;
}
.page-box {
  width: 1200px;
  padding-top: 100px;
}
.form-item {
  border-top: 1px solid #eee;
  margin-top: 10px;
  padding-top: 30px;
}
.form-upload {
  margin: 0 0 10px 25px;
}
.form-upload-p {
  font-weight: bold;
  margin-bottom: 10px;
  font-size: 19px;
}
.form-content-p {
  font-weight: bold;
  margin: 25px 0 0 22px;
  font-size: 19px;
}
.form-title {
  width: 450px;
}
.form-title .el-input {
  width: 300px;
}
.form-content {
  width: 1000px;
}
.form-content .el-input {
  width: 500px;
}
.btn-group {
  position: fixed;
  right: 20px;
  top: 70px;
}


/* 图片样式 */
.img-box {
  display: flex;
  flex-wrap: wrap;
}
.item {
  margin-left: 10px;
  margin-top: 10px;
}
.item-content {
  width: 380px;
  height: 450px;
  background-image: url('../assets/bg2.png');
  background-size: contain; /* 背景图片等比例缩放，完全显示在盒子内 */
  background-position: center; /* 图片居中显示 */
  background-repeat: no-repeat; /* 防止背景图片重复 */
  background-color: #fff;
  position: relative;
  text-align: center;
  padding: 0px 110px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.title-0 {
  font-weight: bold;
  font-size: 45px;
}
.info-0 {
  font-size: 24px;
  font-weight: bold;
  text-align: center;
}

.title {
  font-weight: bold;
  font-size: 22px;
  margin-top: -60%;
}
.info {
  padding-top: 10px;
  text-align: left;
}

/* 自定义样式 */
#editor1 {
  height: 350px;
  width: 400px;
}
.quillWrapper {
  padding-top: 15px;
  width: 800px;
}
.el-button {
  background: #8b3dff;
  color: #fff;
}
</style>


