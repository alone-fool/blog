const express = require('express');
const fs = require('fs');
const http =require('http');
const path = require('path');
const mysql = require('mysql');
const multer = require('multer');
const bodyParser = require('body-parser');
// 创建application/x-www-form-urlencoded编码解析
const urlencodedParser = bodyParser.urlencoded({extended:false});


// const {minify} = require('html-minifier');
const server = express();
var role = 1;
// const createApp = require('../src/main');
const resolve = file => path.resolve(__dirname,file);

const port= 3000;

// 托管静态文件
server.use('/images',express.static('../public/imgFile'));
// 数据库配置
const mysqlConfig = {
    host: 'localhost',
    user: 'root',
    password: '123456',
    database: 'graduation',
    port: '3306'
}
// 创建连接池
const pool = mysql.createPool({
    host: mysqlConfig.host,
    user: mysqlConfig.user,
    password: mysqlConfig.password,
    database: mysqlConfig.database,
    port: mysqlConfig.port,
    multipleStatements: true    //多语句查询
});

//首页路由
let indexRouter = express.Router();
server.use('/api',indexRouter)
//文章管理页路由
let postRouter = express.Router();
server.use('/api/posts',postRouter)


var storage = multer.diskStorage({
    destination: function (req, file, cb){
      cb(null, path.join(__dirname , '../public/imgFile'));
    },
    filename: function (req, file, cb){
      cb(null, file.originalname);
    }
});
var upload = multer({
storage: storage
}).single('imgFile');


// 注册
indexRouter.use('/signUp',urlencodedParser,(req,res) => {
    var {name,password,email} = req.body;
    console.log(req.body,req.file);
    pool.getConnection((err,c) => {
        if(err){
            res.send({ok:0,msg:'数据库连接失败'});
        }else{
            var adddate = new Date().toLocaleDateString()+ ' ' + new Date().toLocaleTimeString();
            c.query('select name,email from `usertab` where name = "'+name+'" or email = "'+email+'";',(err,data) => {
                if(err) throw err;
                if(data.length > 0){
                    res.send({ok:0,msg:'用户名已存在或者邮箱已经被注册'});
                }else{
                    if(name == 'xiang' && email == '1606845644@qq.com'){
                        role = 2;//管理员权限
                    }else{
                        role = 1;
                    }
                    c.query('insert into `usertab` (`name`,`password`,`email`,`role`,`adddate`) values("'+name+'","'+password+'","'+email+'","'+role+'","'+adddate+'");',(err) => {
                        if(err) throw err;
                        res.send({ok:1,msg:'注册成功'});
                    })
                }
            })
        }
        c.release();
    })
})
// 登陆
indexRouter.use('/signIn',urlencodedParser,(req,res) =>{
    const {name,password} = req.body;
    pool.getConnection((err,c) => {
        if(err){
            res.send({ok:0,msg:'数据库连接失败'});
        }else{
            c.query('select * from `usertab` where name="'+name+'" and password="'+password+'";',(err,data) =>{
                if(err){
                    throw err;
                }else{
                    console.log(data);
                    if(data.length > 0){
                        res.send({ok:1,msg:'登陆成功',role:data[0].role,id:data[0].id});
                    }else{
                        res.send({ok:0,msg:'用户名或密码错误'});
                    }
                }
            })
        }
        c.release();
    })
})

// 获取所有文章
postRouter.get('/getAllArticle',(req,res) => {
    pool.getConnection((err,c) => {
        if(err){
            res.send({ok:0,msg:'数据库连接失败'});
        }else{
            c.query('select * from `articletab`;',(err,data) => {
                if(err) throw err;
                res.send(data);
            })
        }
        c.release();
    });
})
// 删除文章
postRouter.post('/delArticle',urlencodedParser,(req,res) => {
    // console.log(req.body);
    let {id} = req.body;
    pool.getConnection((err,c) => {
        if(err){
            res.send({ok:0,msg:'数据库连接失败'});
        }else{
            c.query('delete from `articletab` where id = "'+id+'";', (err) =>{
                if(err) throw err;
                res.send({msg:'删除成功'});
            })
        }
        c.release();
    });
})
// 根据id获取文章
postRouter.post('/getArticle',urlencodedParser,(req,res) => {
    const {id} = req.body;
    pool.getConnection((err,c) => {
        if(err){
            res.send({ok:0,msg:'数据库连接失败'});
        }else{
            c.query('select * from `articletab` where id = "'+id+'";',(err,data) => {
                if(err) throw err;
                res.send(data[0]);
            });
        }
        c.release();
    })
})
// 发布/编辑文章
postRouter.post('/',urlencodedParser,(req,res) => {
    var { id, title, content} = req.body;
    var timer = new Date().toLocaleDateString()+ ' ' + new Date().toLocaleTimeString();
    pool.getConnection((err,c) => {
        if(err){
            res.send({ok:0,msg:'连接数据库失败'});
        }else{
            c.query('select `id` from `articletab` where id = "'+id+'";',(err,data) =>{
                if(err) throw err;
                if(data){
                    c.query('update `articletab` set title = "'+title+'",content = "'+content+'",timer = "'+timer+'" where id = "'+id+'";',(err) =>{
                        if(err) throw err;
                        res.send({ok:1,msg:'修改成功'});
                    })
                }else{
                    c.query('insert into `articletab` (`title`,`content`,`timer`,`view`) values("'+title+'","'+content+'","'+timer+'",0);',(err) => {
                        if(err) throw err;
                        res.send({ok:1,msg:'发布成功'});
                    })
                }
            })
        }
        c.release();
    })
})
// 处理markdown的图片路径
postRouter.post('/upload_img',(req,res) => {  
    upload(req,res,(err) =>{
        console.log('start upload')
        if(err){
            res.writeHead(404);
            res.end(err.message);
            return
        }
        let url = 'http://' + req.headers.host + '/images/' + req.file.originalname;
        // console.log(url);
        res.writeHead(200);
        res.end(JSON.stringify({'url': url}));
        console.log('upload end');
        // console.log(req.file ? req.file : 'err file');
    });

})
// 根据id显示相应的文章
server.post('/api/show/:id',urlencodedParser,(req,res) => {
    const {id} = req.body;
    pool.getConnection((err,c) => {
        if(err){
            res.send({ok:0,msg:'数据库连接失败'});
        }else{
            c.query('select * from `articletab` where id = "'+id+'";',(err,data) => {
                if(err) throw err;
                res.send(data[0]);
                let view = data[0].view + 1;
                c.query('update `articletab` set view = "'+view+'" where id = "'+id+'";',(err) => {
                    if(err) throw err;
                })
            })
        }
        c.release();
    })
})
// 发布留言
server.post('/api/messageBoard',urlencodedParser,(req,res) => {
    let timer = new Date().toLocaleDateString()+ ' ' + new Date().toLocaleTimeString();
    let {username, message} = req.body;
    pool.getConnection((err,c) => {
        if(err){
            res.send({ok:0,msg:'数据库连接失败'});
        }else{
            c.query('insert into `leavewords` (`username`,`message`,`timer`) value("'+username+'","'+message+'","'+timer+'");',(err) => {
                if(err) throw err;
                res.send({ok:1,msg:'留言发布成功'});
            })
        }
        c.release();
    })
})
// 获取留言
server.get('/api/allMessage',(req,res) => {
    pool.getConnection((err,c) => {
        if(err){
            res.send({ok:0,msg:'数据库连接失败'});
        }else{
            c.query('select * from `leavewords`;',(err,data) => {
                if(err) throw err;
                res.send(data);
            })
        }
    })
})
// 获取用户信息
server.post('/api/getUser',urlencodedParser,(req,res) => {
    let {id} = req.body;
    pool.getConnection((err,c) => {
        if(err){
            res.send({ok:0,msg:'数据库连接失败'});
        }else{
            c.query('select * from `usertab` where id = "'+id+'";',(err,data) => {
                if(err) throw err;
                res.send(data);
            })
        }
        c.release();
    })
})
// 更新用户信息
server.post('/api/updateUser',urlencodedParser,(req,res) => {
    let {id,name,email,truename,sex,phone,job} = req.body;
    pool.getConnection((err,c) => {
        if(err){
            res.send({ok:0,msg:'数据库连接失败'});
        }else{
            c.query('select name,email from `usertab` where name="'+name+'",email="'+email+'";',(err,data) => {
                if(data){
                    res.send({ok:0,msg:'该用户名已存在或者邮箱已被注册'});
                }else{
                    c.query('update `usertab` set name="'+name+'",email="'+email+'",truename="'+truename+'",sex="'+sex+'",phone="'+phone+'",job="'+job+'" where id="'+id+'";',(err) => {
                        if(err) throw err;
                    })
                }
            })
        }
        c.release();
    })
})
server.listen(port,function(){
    console.log('The server is running');
});