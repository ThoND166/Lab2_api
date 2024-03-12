const express = require('express');
const mongoose = require('mongoose');
const app = express();
mongoose.connect('mongodb+srv://thondph16247:Tho111111@cluster0.i86tkyk.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0',{
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(()=>{
    console.log("Ket noi thanh cong voi mongodb")
}).catch((err)=>{
    console.error("Loi:",err);
});
//truy van csdl---------------------------------------------------
// chon csdl thao tac
//truy van csdl---------------------------------------------------
//chon csdl thao tac
const db1=mongoose.connection.useDb('db1');
//dinh nghia model cho bang du lieu
const SinhVienSchema=new mongoose.Schema({
    masv:String,
    tensv:String
});
//anh xa model vao bang du lieu
const SinhVien=db1.model('sinhvien',SinhVienSchema);
//tao link trieu goi tren trinh duyet (API)
app.get('/',async (req,res)=>{
    try {
        const sinhvien= await SinhVien.find();//doc du lieu tu bang sinh vien
        if(sinhvien.length>0){//neu co ton tai du lieu
            res.json(sinhvien);//api tra ve ket qua
        }
        else
        {
            res.status(404).json({error:"khong co sinh viên"});
        }
    } catch (error) {
        console.error("Loi doc du lieu: ");
        res.status(500).json({error: "Doc du lieu loi"});
    }
});
//khoi chay may chu------------------------------------------------------------
const PORT=process.env.PORT|| 5000;
app.listen(PORT,()=>{
console.log('server dang chay o cong 5000');
});
module.exports=app;