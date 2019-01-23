import Vue from 'vue'
import XLSX from 'xlsx'
 
/**
 * 导入ex表格 得到json数据
 * 已注入所有Vue实例，
 * template模板里调用 $importf
 * 组件方法里调用 this.$importf
 * 例：<input type="file" id="file22" @change="importf('file22')" />
 * this.$importf(id) 得到 json数据
 */
const importf = (id) => {
  let promise = new Promise((resolve, reject) => {
    // 导入
    // FileReader共有4种读取方法：
    // 1.readAsArrayBuffer(file) ：将文件读取为ArrayBuffer。
    // 2.readAsBinaryString(file) ：将文件读取为二进制字符串
    // 3.readAsDataURL(file) ：将文件读取为Data URL
    // 4.readAsText(file, [encoding]) ：将文件读取为文本，encoding缺省值为'UTF-8'
    var wb // 读取完成的数据
    var rABS = false // 是否将文件读取为二进制字符串
    let obj = document.getElementById(id)
    if (!obj.files) {
      return
    }
    var f = obj.files[0]
    var reader = new FileReader()
    if (rABS) {
      reader.readAsArrayBuffer(f)
    } else {
      reader.readAsBinaryString(f)
    }
    var arr = []
    reader.onload = function (e) {
      var data = e.target.result
      if (rABS) {
        wb = XLSX.read(btoa(fixdata(data)), { // 手动转化
          type: 'base64'
        })
      } else {
        wb = XLSX.read(data, {
          type: 'binary'
        })
      }
      // wb.SheetNames[0]是获取Sheets中第一个Sheet的名字
      // wb.Sheets[Sheet名]获取第一个Sheet的数据
      arr = XLSX.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]])
       //console.log(JSON.stringify(XLSX.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]])))
       //console.log(arr)
      // console.log(XLSX.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]]))
      // return XLSX.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]])
      resolve(arr)
    }
    reader.onerror = function (e) {
      reject(arr)
    }
  })
  return promise
}
const fixdata = (data) => { // 文件流转BinaryString
  var o = ''
  var l = 0
  var w = 10240
  for (; l < data.byteLength / w; ++l) o += String.fromCharCode.apply(null, new Uint8Array(data.slice(l * w, l * w + w)))
  o += String.fromCharCode.apply(null, new Uint8Array(data.slice(l * w)))
  return o
}
 
Vue.prototype.$importf = importf