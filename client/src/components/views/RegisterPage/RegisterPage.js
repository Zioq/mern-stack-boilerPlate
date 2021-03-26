import React from "react";
import {useDispatch} from "react-redux"
import {registerUser} from "../../../_actions/user_action";
/*  Check this website for more detail */
// https://ant.design/components/form/
import { Form, Input, Button } from "antd";


const formItemLayout = {
  labelCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 10,
    },
  },
  wrapperCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 15,
    },
  },
};
const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 10,
    },
    sm: {
      span: 16,
      offset: 8,
    },
  },
};

function RegisterPage(props) {
  const dispatch = useDispatch();
  const [form] = Form.useForm();

  const registerHandler = (values) => {
    // Set the body to request
    let body = {
      firstname: values.FirstName,
      lastname: values.LastName,
      email: values.email,
      password: values.password,
    };

    //dispatch
    dispatch(registerUser(body)).then(response=>{
        if(response.payload.success) {
            props.history.push("/login")
        } else {
            alert("Failed to register")
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
        {...formItemLayout}
        form={form}
        name="register"
        onFinish={registerHandler}
        scrollToFirstError
      >
        <Form.Item
          name="email"
          label="E-mail"
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
          <Input />
        </Form.Item>

        <Form.Item
          name="password"
          label="Password"
          rules={[
            {
              required: true,
              message: "Please input your password!",
            },
          ]}
          hasFeedback
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          name="confirm"
          label="Confirm Password"
          dependencies={["password"]}
          hasFeedback
          rules={[
            {
              required: true,
              message: "Please confirm your password!",
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("password") === value) {
                  return Promise.resolve();
                }

                return Promise.reject(
                  new Error("The two passwords that you entered do not match!")
                );
              },
            }),
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          name="FirstName"
          label="First Name"
          tooltip="What do you want others to call you?"
          rules={[
            {
              required: true,
              message: "Please Enter Your First Name",
              whitespace: true,
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="LastName"
          label="Last Name"
          tooltip="Please Enter Your last Name"
          rules={[
            {
              required: true,
              message: "Please Enter Your last Name!",
              whitespace: true,
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item {...tailFormItemLayout}>
          <Button type="primary" htmlType="submit">
            Register
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default RegisterPage;
