import Icon from "../../components/common/icon/icon.component";

const NotFoundPage = () => {
  return (
    <div className="flex h-full w-full items-center justify-center">
      <div className="text-center space-y-5">
        <Icon name={"stellarxlm"} className="text-6xl" />
        <div>
          <p className="text-2xl font-black">404 - Page Not Found</p>
          <p className=" font-light text-gray-500">
            Pariatur pariatur id velit aliquip minim cupidatat nulla commodo
            nisi dolor.
          </p>
        </div>
        <div className="flex items-center justify-center gap-3">
          <button className="btn btn-soft btn-circle ">
            <Icon name={"repeatCircle"} className="text-2xl" />
          </button>
          <button className="btn btn-soft btn-circle ">
            <Icon name={"backSquare"} className="text-2xl" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
