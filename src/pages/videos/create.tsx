import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { Button, Form, Input } from "antd";
import gql from "graphql-tag";
import FullScreenLayout from "@/components/FullScreenLayout";
import { withUniversalProvider } from "@/lib/universal-provider/with-universal-provider";
import { GetServerSideProps } from "next";
import { UniversalGetServerSideProps } from "@/lib/universal-provider/universal-server-props";

const CREATE_VIDEO = gql`
  mutation CreateVideo($title: String!, $prompt: String) {
    createVideo(input: { title: $title, prompt: $prompt }) {
      id
      title
      prompt
    }
  }
`;

const CreateVideoCanvas: React.FC = () => {
  const [form] = Form.useForm();
  const [createVideo, { loading }] = useMutation(CREATE_VIDEO);

  const onFinish = async (values: any) => {
    try {
      await createVideo({
        variables: { title: values.title, prompt: values.prompt },
      });
      form.resetFields();
    } catch (error) {
      console.error("Error creating video:", error);
    }
  };

  return (
    <FullScreenLayout>
      <div style={{ padding: "20px", width: "100%" }}>
        <h1>Create Video</h1>
        <Form layout="vertical" form={form} onFinish={onFinish}>
          <Form.Item
            label="Title"
            name="title"
            rules={[{ required: true, message: "Please enter a title!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item label="Prompt" name="prompt">
            <Input.TextArea />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" loading={loading}>
              Create Video
            </Button>
          </Form.Item>
        </Form>
      </div>
    </FullScreenLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  const universalServerProps = await UniversalGetServerSideProps();

  return {
    props: {
      ...universalServerProps.props,
    },
  };
};

export default withUniversalProvider(CreateVideoCanvas);
