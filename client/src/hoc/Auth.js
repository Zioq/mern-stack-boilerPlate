import React,{useEffect} from 'react';
import {useDispatch} from  'react-redux';
import {auth} from "../_actions/user_action";

export default function (SpecificComponent, option, adminRoute = null) {
    
    /* 
    [option]
    null  : All people access allowed
    true  : Only logged in user access allowed
    false : Deny logged in user access 
    */
     
    function AuthenticationCheck(props) {

        const dispatch = useDispatch();

        useEffect(() => {

            dispatch(auth()).then(response=>{
                //console.log(response)
                // Based on the `response.isAuth`, allow/deny user access to pages
                 if(!response.payload.isAuth) {
                     //Didn't log-in
                     if(option === true) {
                         props.history.push('/login')
                     } 
                 } else {
                     //Login 
                     if(adminRoute && !response.payload.isAdmin) {
                         //If user is not a Admin
                         props.history.push('/')
                     } else {
                         if(option === false) {
                             //If logged in user access to page where login user access deniend such as `login page`
                             props.history.push('/')
                         }
                     }
                 }
            }) 

        }, [])

        return (
            <SpecificComponent {...props}/>
        )
    }

    return AuthenticationCheck
}


