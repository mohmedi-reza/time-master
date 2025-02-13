import { useState } from "react";
import Icon from "./icon/icon.component";

const users = [
  { id: 1, name: "Debug" },
  { id: 2, name: "Feature" },
  { id: 3, name: "QA" },
];

const MultiSelect = () => {
  const [selectedUsers, setSelectedUsers] = useState<number[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  const toggleUser = (id: number) => {
    setSelectedUsers((prev) =>
      prev.includes(id) ? prev.filter((uid) => uid !== id) : [...prev, id]
    );
  };

  return (
    <div className="relative inline-block">
      <button onClick={() => setIsOpen(!isOpen)} className="btn btn-circle bg-gray-700 border-0 hover:text-accent hover:bg-accent/5">
        <Icon name={"tag"} className="text-2xl" />
      </button>

      {isOpen && (
        <ul className="absolute mt-2 bg-gray-800 border-gray-300 shadow-lg rounded-lg p-2 z-10 w-auto min-w-max left-0 right-auto">
          {users.map((user) => (
            <label
              key={user.id}
              className="flex items-center gap-2 p-2 cursor-pointer hover:bg-gray-700 rounded-lg whitespace-nowrap"
            >
              <input
                type="checkbox"
                checked={selectedUsers.includes(user.id)}
                onChange={() => toggleUser(user.id)}
                className="checkbox"
              />
              <span>{user.name}</span>
            </label>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MultiSelect;
