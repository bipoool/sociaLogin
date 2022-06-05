import React, {useState, useEffect, useRef, useCallback} from "react";
import Style from "./css/style";
import NavBar from "./navBar";
import cssStyle from "./css/style.css";

function FormPage(props) {

    const [type, setType] = useState('login');
    const [inputVal, setInputVal] = useState({});
    let heading = "Login Here!"

    const displays = {
        name:"",
        email:"",
        password:"",
        oldPassword:"",
        newPassword:"",
    }
    
    if(type==='login'){
        displays.name= Style.dNone
        displays.email= ""
        displays.password= ""
        displays.oldPassword= Style.dNone
        displays.newPassword= Style.dNone
        heading="Login Here!"
    }
    else if(type==='signUp'){
        displays.name= ""
        displays.email= ""
        displays.password= ""
        displays.oldPassword= Style.dNone
        displays.newPassword= Style.dNone
        heading="SignUp Here!"
    }
    else if(type==='resetPass'){
        displays.name= Style.dNone
        displays.email= ""
        displays.password= Style.dNone
        displays.oldPassword= ""
        displays.newPassword= ""
        heading="Reset Password"
    }
    else if(type==='forgetPass'){
        displays.name= ""
        displays.email= ""
        displays.password= Style.dNone
        displays.oldPassword= Style.dNone
        displays.newPassword= ""
        heading="Forgot Password"
    }

    const changeType = useCallback((changeVal) => {
        setType(changeVal)
    })

    const inputValChange = (e) =>{
        let name = e.target.name
        inputVal[name] = e.target.value;
    }

    const submit = (e) => {

        e.preventDefault();

        if(type==='login'){
            const data = {
                email:inputVal['email'],
                password:inputVal['password']
            }

            fetch('http://127.0.0.1:8000/api/check/', {
                method:"POST",headers: {
                    'Content-Type': 'application/json'
                },
                body:JSON.stringify(data)
            }).then(res => {
                if(res.status === 200){
                    alert("Login successfully!!")
                }else{
                    alert("UnsuccessFull!! Maybe Wrong password")
                }
            }).catch(err => {
                alert("Something Went Wrong")
            })
        }
        else if(type==='signUp'){
            
            const data = {
                name:inputVal['name'],
                email:inputVal['email'],
                password:inputVal['password']
            }

            fetch('http://127.0.0.1:8000/api/create/', {
                method:"POST",headers: {
                    'Content-Type': 'application/json'
                },
                body:JSON.stringify(data)
            }).then(res => {
                if(res.status === 200){
                    alert("Saved successfully!!")
                }else{
                    alert("Not Saved!! Maybe Already Registered")
                }
            }).catch(err => {
                alert("Something Went Wrong")
            })

        }
        else if(type==='resetPass' || type==='forgetPass'){
            let fn = ""
            if(type==='resetPass')
                fn='reset'
            else fn = 'forgot'

            const data = {
                fn:fn,
                email:inputVal['email'],
                password:inputVal['oldPass'],
                newPass:inputVal['newPass'],
                name:inputVal['name']
            }

            fetch('http://127.0.0.1:8000/api/update/', {
                method:"POST",headers: {
                    'Content-Type': 'application/json'
                },
                body:JSON.stringify(data)
            }).then(res => {
                if(res.status === 200){
                    alert("Changed successfully!!")
                }else{
                    alert("Not Changed!! Maybe Credentials Are Wrong")
                }
            }).catch(err => {
                alert("Something Went Wrong")
            })
        }


    }

    return (
        <div style={{...Style.bgGray, ...Style.fullSize}}>
            <NavBar></NavBar>
            <div style={{...Style.w100, ...Style.h90, ...Style.center}}>
                <div style={{...Style.bgLightGray, ...Style.p10,borderRadius:10}}>
                    <div style={{...Style.textWhite}}>{heading}</div>
                    <form style={{...Style.pTB3, ...Style.center, ...Style.flexRow}} onSubmit={submit}>
                        <input style={{...Style.inputField, ...Style.displayBlock, ...Style.mt20, ...displays.name}} type="text" placeholder="Name" name="name" onChange={inputValChange}/>
                        <input style={{...Style.inputField, ...Style.displayBlock, ...Style.mt20, ...displays.email}} type="email" placeholder="Email" name="email" onChange={inputValChange}/>
                        <input style={{...Style.inputField, ...Style.displayBlock, ...Style.mt20, ...displays.password}} type="password" placeholder="Password" name="password" onChange={inputValChange}/>
                        <input style={{...Style.inputField, ...Style.displayBlock, ...Style.mt20, ...displays.oldPassword}} type="password" placeholder="Old Password" name="oldPass" onChange={inputValChange}/>
                        <input style={{...Style.inputField, ...Style.displayBlock, ...Style.mt20, ...displays.newPassword}} type="password" placeholder="New Password" name="newPass" onChange={inputValChange}/>
                        <input style={{...Style.submitButton, ...Style.displayBlock, ...Style.mt20, ...Style.textWhite}} type="submit" role="button"/>
                    </form>
                </div>
            </div>

            {/* Footer */}
            <div style={{...Style.footer, ...Style.bgDarkGray, ...Style.pTB3, ...Style.dFlex, ...Style.justifyContentEvenly}}>
                <div role="button" style={{...Style.textWhite}} onClick={()=>changeType('login')}>   
                    Login
                </div>
                <div role="button" style={{...Style.textWhite}}  onClick={()=>changeType('signUp')}>   
                    SignUp
                </div>
                <div role="button" style={{...Style.textWhite}}  onClick={()=>changeType('resetPass')}>   
                    Reset Password
                </div>
                <div role="button" style={{...Style.textWhite}} onClick={()=>changeType('forgetPass')}>   
                    Forgot Pasword
                </div>

            </div>

        </div>
    );
}

export default FormPage;    