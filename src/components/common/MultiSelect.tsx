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
      <button 
        onClick={() => setIsOpen(!isOpen)} 
        className="btn btn-circle btn-ghost hover:bg-primary/10 transition-all duration-300"
      >
        <Icon name={"tag"} className="text-2xl text-primary" />
      </button>

      {isOpen && (
        <ul className="absolute mt-3 bg-gradient-to-b from-base-200 to-base-100 border border-accent/20   rounded-box p-3 z-10 w-auto min-w-[180px] left-0 right-auto backdrop-blur-sm animate-fade-in">
          {users.map((user) => (
            <label
              key={user.id}
              className="flex items-center gap-3 p-2 cursor-pointer hover:bg-primary/10 rounded-lg whitespace-nowrap transition-all duration-300"
            >
              <input
                type="checkbox"
                checked={selectedUsers.includes(user.id)}
                onChange={() => toggleUser(user.id)}
                className="checkbox checkbox-sm checkbox-primary"
              />
              <span className="text-base-content/80 hover:text-primary transition-colors duration-300">{user.name}</span>
            </label>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MultiSelect;
