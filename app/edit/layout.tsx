import EditMyInfoNav from '@/app/components/my-page/EditMyInfo/EditMyInfoNav';

interface Props {
  children: React.ReactNode;
}

const EditMyPageLayout: React.FC<Props> = ({ children }) => {
  return (
    <div className="relative flex">
      <EditMyInfoNav />
      {children}
    </div>
  );
};

export default EditMyPageLayout;
