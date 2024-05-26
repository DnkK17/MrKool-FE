import { Progress } from 'antd';
import { tokens } from '../theme';

const ProgressCircle = ({ progress = 75, size = 40 }) => {
  const colors = tokens('dark'); // Thay đổi 'dark' thành mode mà bạn muốn sử dụng
  const angle = (progress / 100) * 360; // Chuyển đổi progress thành phần trăm và tính góc tương ứng

  return (
    <Progress
      type="circle"
      percent={progress}
      width={size}
      strokeColor={{
        '0%': colors.primary[400],
        '100%': colors.blueAccent[500],
      }}
    />
  );
};

export default ProgressCircle;
