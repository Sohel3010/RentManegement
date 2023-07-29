// Admin Validation
export default function ValidationAdmin(admin){
    const errorsAdmin={}
    const email_pattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,6}$/;
    
    if(admin.firstName === ""){
        errorsAdmin.firstName="Owner Name  is required!";
    }
    if(admin.middleName===""){
        errorsAdmin.middleName="Mobile Number is required!";
    }
    if(admin.lastName===""){
        errorsAdmin.lastName="Address is required!";
    
    }
    if(admin.empPosition===""){
        errorsAdmin.empPosition="Work is required!";
    }
    if(admin.email===""){
        errorsAdmin.email="Work is required!";
    }
    if(admin.password===""){
        errorsAdmin.password="Work is required!";
    }
    if(admin.mobileNo===""){
        errorsAdmin.mobileNo="Work is required!";
    }
    if(admin.salary===""){
        errorsAdmin.salary="Work is required!";
    }
   
    

    return errorsAdmin;
}