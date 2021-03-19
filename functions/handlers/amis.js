   
   const { db } = require('../util/admin');
   
   exports.addFollow=(req,res)=>{
    const newdata={
        uid:req.body.uid,
    id_ami:req.body.id_ami,
    confirm:"false"
    }

    return db.collection('amis').doc()
.set({newdata})
.then(()=>{
return res.json(newdata);}



)
}
exports.getFollow=(req,res)=>{
    
    let userinformation = {};
    db.doc(`/amis/${req.params.uid}`).get().then((doc)=>
    {
        userinformation = doc.data();
        userinformation.uid=doc.id
        
        return db
        .collection('amis')
       
       .where('newdata.uid', '==', req.params.uid )
       .get();
    })
    .then((data) => {
        userinformation.amis= [];
        data.forEach((doc) => {

          userinformation.amis.push(doc.data().newdata.id_ami);
        });
        return res.json(userinformation);
    
    })
    .catch((err)=>{
        res.json([])
    })
}  
exports.updateFollow=(req,res)=>{
let amisinformation={}
    db.doc(`/amis/${req.params.uid}`).get().then((doc)=>
    {
        amisinformation = doc.data();
        
        return db
        .collection('amis')
       
       .where(amisinformation.uid, '==', req.params.uid && amisinformation.id_ami, '==', req.body.id_ami )
       .update({confirm:true});
    }) 
    .then((data)=>{
        data.forEach((doc) => {

            userinformation.push(doc.data());
          });
        
        })

    return res.json(amisinformation);
}
    
    









    
