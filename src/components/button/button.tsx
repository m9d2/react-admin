import { Button as AntButton } from 'antd';

export default function Button(props: { title: string }) {
  return (
    <>
      <AntButton>{props.title}</AntButton>
    </>
  );
}
