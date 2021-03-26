import React,{useState} from "react";
import { Form, Input, Button, Checkbox } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import {useDispatch}  from "react-redux";
import {loginUser} from "../../../_actions/user_action";

function LoginPage(props) {

  const dispatch = useDispatch();
  const rememberMeChecked = localStorage.getItem("rememberMe") ? false : true;
  const [rememberMe, setRememberMe] = useState(rememberMeChecked)

  const handleRememberMe = () => {
    setRememberMe(!rememberMe)
    console.log(rememberMe);
  };

  const initialEmail = localStorage.getItem("rememberMe") ? localStorage.getItem("rememberMe") : '';

  const onSubmitHandler = (values: any) => {
    //console.log("Received values of form: ", values)
    /* console.log("Eamil",values.email)
    console.log("password",values.password) */
    let body = {
      email: values.email,
      password: values.password
    }

    // Dispatch user-login Body
    // loginUser: redux-action
    dispatch(loginUser(body))
          .then(response => {
            if(response.payload.loginSuccess) {
              window.localStorage.setItem("userId", response.payload.userId);
              if(rememberMeChecked === true) {
                window.localStorage.setItem('rememberMe', values.email);
              } else {
                localStorage.removeItem('rememberMe');
              }
              props.history.push("/");
            } else {
              alert(response.payload.message)
            }
          })

  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "100vh",
      }}
    >
      <Form
        name="normal_login"
        className="login-form"
        initialValues={{ remember: true}}
        onFinish={onSubmitHandler}
      >
        <Form.Item
          name="email"
          rules={[
            {
              type: "email",
              message: "The input is not valid E-mail!",
            },
            {
              required: true,
              message: "Please input your E-mail!",
            },
          ]}
        >
          <Input
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="email" 
          />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{ required: true, message: "Please input your Password!" }]}
        >
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Password"
          />
        </Form.Item>
        <Form.Item>
          <Form.Item name="remember" valuePropName="checked" noStyle>
            <Checkbox onChange={handleRememberMe} checked={rememberMe}>Remember me</Checkbox>
          </Form.Item>

          <a className="login-form-forgot" href="">
            Forgot password?
          </a>
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button"
          >
            Log in
          </Button>
          Or <a href="/register">register now!</a>
        </Form.Item>
      </Form>
    </div>
  );
}

export default LoginPage;
