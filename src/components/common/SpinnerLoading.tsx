import { SpinnerLoadingProps } from "../../interfaces/SpinnerLadingProps";

const SpinnerLoading: React.FC<SpinnerLoadingProps> = ({
  type = "infinity",
}) => {
  return (
    <span className={`loading loading-${type ?? "infinity"} loading-xl`}></span>
  );
};

export default SpinnerLoading;
