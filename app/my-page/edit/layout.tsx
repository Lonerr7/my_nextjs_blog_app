import EditMyInfoNav from '@/app/components/my-page/EditMyInfoNav';

interface Props {
  children: React.ReactNode;
}

const EditMyPageLayout: React.FC<Props> = ({ children }) => {
  return (
    <div className="relative">
      <EditMyInfoNav />
      {children}
    </div>
  );
};

export default EditMyPageLayout;
