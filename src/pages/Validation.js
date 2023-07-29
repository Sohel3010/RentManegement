export default function Validation(owner){
    const errors={}
    // const email_pattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,6}$/;
    
    if(owner.ownerName === ""){
        errors.ownerName="Owner Name  is required!";
    }
    if(owner.mobileNo===""){
        errors.mobileNo="Mobile Number is required!";
    }
    if(owner.address===""){
        errors.address="Address is required!";
    
    }
    if(owner.forWork===""){
        errors.forWork="Work is required!";
    }
    if(owner.shopId===0){
        errors.shopId="Work is required!";
    }
    if(owner.date==null){
        errors.date="Work is required!";
    }
   
    

    return errors;
}



  
