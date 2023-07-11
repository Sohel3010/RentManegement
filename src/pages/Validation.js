export default function Validation(user){
    const errors={}

    const email_pattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,6}$/;
    
    if(user.firstName === ""){
        errors.firstName="First Name  is required!";
    }
    if(user.middleName===""){
        errors.middleName="Middle Name is required!";
    }
    if(user.lastName===""){
        errors.lastName="Last Name is required!";
    
    }
    if(user.empPosition===""){
        errors.empPosition="Emplyee Position is required!";
    }
    if(user.email === ""){
        errors.email="Email is required!"
    }else if(!email_pattern.test(user.email)){
        errors.email="Email is did'nt match";
    }
    if(user.password===""){
        errors.password="Password is required!";
    }
    if(user.mobileNo===""){
        errors.mobileNo="Mobile Number is required!";
    }
    if(user.salary===""){
        errors.salary="Salary is required!";
    }

    

    return errors;
}