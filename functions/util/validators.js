const { user } = require("firebase-functions/lib/providers/auth");

const isEmail = (email) => {
    const regEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (email.match(regEx)) return true;
    else return false;


}

const isEmpty = (string) => {
    if (string.trim() === '') return true;
    else return false;
}
exports.validateSignupData =(data)=>{
    let errors = {};
    if (isEmpty(data.email)) {
        errors.email = ' Must not be empty'
    }
    else if (!isEmail(data.email)) {
        errors.email = 'Must be a valid email adress';
    }
    if (isEmpty(data.password)) errors.password = 'Must not be empty';
    if (data.password !== data.confirmPassword) errors.confirmPassword = "passwords must match";
    if (isEmpty(data.nom)) errors.nom = 'Must not be empty';
    if (isEmpty(data.prenom)) errors.prenom = 'Must not be empty';
    if (isEmpty(data.prenom)) errors.prenom = 'Must not be empty';


   
    return{
        errors,
        valid:Object.keys(errors).length ===0 ?true:false
    }
}
exports.validateloginData= (data)=>{
    let errors = {};
    if (isEmpty(data.email)) errors.email = 'Must not be empty';
    if (isEmpty(data.password)) errors.password = 'Must not be empty';
     
      
    return{
        errors,
        valid:Object.keys(errors).length === 0 ?true:false
    }
}
exports.reduceUserDetails = (data) => {
    let userDetails = {};
    //if (!isEmpty(data.nom.trim())) userDetails.nom = data.nom;
    //if (!isEmpty(data.prenom.trim())) userDetails.prenom = data.prenom;
    if (!isEmpty(data.bio.trim())) userDetails.bio = data.bio;
    if (!isEmpty(data.universite.trim())) userDetails.universite=data.universite;
    if (!isEmpty(data.faculte.trim())) userDetails.faculte=data.faculte;
    if (!isEmpty(data.departement.trim())) userDetails.departement=data.departement;
   

      // https://website.com
      //if (data.universite.trim().substring(0, 4) !== 'http') {
       // userDetails.website = `http://${data.website.trim()}`;
     // } else userDetails.website = data.website;
    //}
    if (!isEmpty(data.adresse.trim())) userDetails.adresse = data.adresse;
  
    return userDetails;
  };
