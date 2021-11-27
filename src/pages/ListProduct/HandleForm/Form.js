import React, { useEffect } from "react";
import { Form, Input, Button, Card } from "antd";
import { fromEventPattern } from "rxjs";

const HandleForm = (props) => {
  const [form] = Form.useForm();
  const onChangePrice = (e) => {
    const value = e.target.value.replace(/,/g, "");
    let num = value.replace(/[^0-9]/g, "");
    if (num.length > 13) {
      num = num.slice(0, 13);
    }
    form.setFieldsValue({ price: num ? num : "" });
  };
  const { onHandleFinish, initialValues } = props;
  useEffect(() => {
    if (initialValues) {
      form.setFieldsValue({
        name: initialValues.name,
        price: initialValues.price,
        about: initialValues.detail,
      });
    }
  }, []);
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <Card
      style={{
        marginTop: "40px",
        marginLeft: "20%",
        width: "600px",
      }}
    >
      <Form
        form={form}
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        onFinish={onHandleFinish}
        onFinishFailed={onFinishFailed}
      >
        <Form.Item
          label="Tên sản phẩm"
          name="name"
          rules={[{ required: true, message: "Trường này là bắt buộc" }]}
        >
          <Input placeholder="Nhập tên sản phẩm" />
        </Form.Item>
        <Form.Item
          label="Giá sản phẩm"
          name="price"
          rules={[{ required: true, message: "Trường này là bắt buộc" }]}
        >
          <Input
            placeholder="Nhập giá sản phẩm"
            onChange={onChangePrice}
            addonAfter="VND"
          />
        </Form.Item>
        <Form.Item label="Mô tả" name="about" size="large">
          <Input.TextArea rows={4} />
        </Form.Item>
        <Form.Item style={{ float: "right" }}>
          <Button type="primary" htmlType="submit">
            Xác nhận
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default HandleForm;
