import { GREEN_COLOR } from "@/config";
import { LayoutDashboard, Settings, User } from "lucide-react";
import PropTypes from "prop-types";

const ICONS = {
  perosn: User,
  settings: Settings,
  dashboard: LayoutDashboard,
};

function Icons({ name, cursor, color, ...rest }) {
  const IconComp = ICONS[name] ?? ICONS.xInSquare;

  return <IconComp {...rest} style={{ color, cursor }} />;
}

export default Icons;

Icons.propTypes = {
  rest: PropTypes.object,
  name: PropTypes.string.isRequired,
  color: PropTypes.any,
  cursor: PropTypes.string,
};

Icons.defaultProps = {
  rest: {},
  cursor: "pointer",
  color: GREEN_COLOR,
};
