const express= require("express");
const bodyparser=require("body-parser");
let ejs = require('ejs');
const app= express();
app.use(bodyparser.urlencoded({extended:true}));
app.set('view engine', 'ejs');
app.use(express.static("static"));
const collect = require('collect.js'); 
const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://tanmay631:tanmay631@cluster0.y2nmtm5.mongodb.net/testdb', {
useNewUrlParser: true});



// console.log(a.note);





let arr=[];

let items=[];
let workitems=[];






const schema ={
    note: String
}

const todoList= mongoose.model("todoList",schema);
// const a =todoList.find(function(err,result){
//         if(err) console.log("Error");
//         else{
//             console.log(result);
//         }
// });

// const listSchema={
//     name: String,
//     item: [schema]
// };

// const newtodo=mongoose.model("randomtodo, listSchema");


    





// todoList.insertMany(def);

// let result = todoList.find({note: true});
// console.log(result);


// console.log(result);




// Creating Database using mongodbdriver






app.get("/",(req,res)=>{

    // const user = todoList.find({})
        // res.render('list',{newListItem: items, 
        //     kindOfDay: "Personal List",linked:'/'
       
            
            todoList.find().then(function(foundItems){
                let arr=[]
                foundItems.forEach(element => {
                    arr.push(element.note);
                });

                res.render("list", { kindOfDay: "Today", newListItem: arr, linked: "/"});
              })

              .catch(function(err){
                console.log(err);
              });
           
    //    });
    
    

});


app.get('/about',(req,res)=>{
    res.render('about');
});





app.get("/work",(req,res)=>{
    
    res.render('list',{newListItem:workitems, 
        kindOfDay: "Work To Do List", linked: "/work"
    });
    
});

app.post("/work",(req,res)=>{
    
    let workitem= req.body.newItem;
      workitems.push(workitem);
      console.log(req.body.newItem );
     
      res.redirect("/work");
  });

  app.post("/",(req,res)=>{
    var item1= req.body.newItem;
    const id= req.body.checkbox;
    console.log(id);
    let newNote= new todoList({
        note: item1
        
    });

    newNote.save()
    
    items.push(item1);
    console.log(req.body.newItem );
    res.redirect("/");
  })

  app.get("/:x" ,function(req,res){
    console.log(req.params.x);
   

  });

//   app.post("/",(req,res)=>{
    
    
//   });
  




app.listen(3000,()=>{
    console.log("Server started");
})