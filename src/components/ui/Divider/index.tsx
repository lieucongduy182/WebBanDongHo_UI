import classNames from "classnames";

interface DividerProps {
  className?: string;
}

const Divider = ({ className = "my-4" }: DividerProps) => {
  return <div className={classNames("h-px bg-gray-20", className)} />;
};

export default Divider;
