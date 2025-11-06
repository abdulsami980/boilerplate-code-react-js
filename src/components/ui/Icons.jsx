import { GREEN_COLOR } from "@/config";
import {
  LayoutDashboard,
  Settings,
  User,
  HelpCircle,
  Bell,
  LogOut,
  DollarSign,
  Building2,
  Headset,
  File,
  BriefcaseBusiness,
} from "lucide-react";
import PropTypes from "prop-types";

const ICONS = {
  person: User,
  settings: Settings,
  dashboard: LayoutDashboard,
  fallback: HelpCircle,
  bell: Bell,
  logout: LogOut,
  dollarSign: DollarSign,
  building: Building2,
  headset: Headset,
  file: File,
  briefcase: BriefcaseBusiness
};

function Icons({ name, cursor, color, ...rest }) {
  const IconComp = ICONS[name] ?? ICONS.fallback;
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
