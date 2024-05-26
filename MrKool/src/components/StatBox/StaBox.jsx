import { Box, Typography } from "antd";
import ProgressCircle from "./ProgressCircle";

const { Text } = Typography;

const StatBox = ({ title, subtitle, icon, progress, increase }) => {
  return (
    <Box width="100%" m="0 30px">
      <Box display="flex" justifyContent="space-between">
        <Box>
          {icon}
          <Typography.Title level={4} style={{ fontWeight: "bold", color: "#fff" }}>
            {title}
          </Typography.Title>
        </Box>
        <Box>
          <ProgressCircle progress={progress} />
        </Box>
      </Box>
      <Box display="flex" justifyContent="space-between" mt="2px">
        <Typography.Text style={{ color: "#52c41a", fontSize: "16px" }}>
          {subtitle}
        </Typography.Text>
        <Typography.Text style={{ color: "#52c41a", fontStyle: "italic", fontSize: "16px" }}>
          {increase}
        </Typography.Text>
      </Box>
    </Box>
  );
};

export default StatBox;
