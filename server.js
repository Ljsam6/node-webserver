const express=require('express');
const hbs=require('hbs');
const fs=require('fs');

const port=process.env.PORT || 3000;
var app= express();


hbs.registerPartials(__dirname+'/views/partials');

app.set('view-engine','hbs');



//middleware
app.use((req,res,next)=>{
  var now= new Date().toString();
  var log=`${now}:${req.method} ${req.url}`;
  console.log(log);
  fs.appendFile('server.log',log+'\n',(err)=>{
    if(err)
    console.log('cant append a file');
  });
  next();
});

// app.use((req,res,next)=>{
//    res.render('maintenance.hbs');
// });
app.use(express.static(__dirname+'/public'));

hbs.registerHelper('year',()=>{
  return new  Date().getFullYear();
});

hbs.registerHelper('capitals',(text)=>{
  return text.toUpperCase();
});

app.get('/',(req,res)=>{
     res.render('home.hbs',{
     pageTitle: 'Home',

     welcome:'welcome to the page',
     })
});

app.get('/about',(req,res)=>{
   //res.send(`about page`);
   res.render('about.hbs',{
     pageTitle: 'About Page',

   });
});

app.get('/bad',(req,res)=>{
  res.send({
    errorMessage:'unable to handle    '
  });
});
app.listen(port,()=>{
  console.log(`server is started on port ${port}`);
});
