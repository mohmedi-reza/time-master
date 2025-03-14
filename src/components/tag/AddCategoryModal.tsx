import React, { useState } from "react";
import Icon from "../common/icon/icon.component";
import { CategoryFormData } from "../../interfaces/tag.interface";

interface AddCategoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddCategory: (categoryData: CategoryFormData) => void;
}

const AddCategoryModal: React.FC<AddCategoryModalProps> = ({
  isOpen,
  onClose,
  onAddCategory,
}) => {
  const [formData, setFormData] = useState<CategoryFormData>({
    name: "",
    description: "",
  });

  const handleSubmit = () => {
    if (formData.name.trim()) {
      onAddCategory(formData);
      setFormData({ name: "", description: "" });
      const modal = document.getElementById('add_category_modal') as HTMLDialogElement;
      modal?.close();
      onClose();
    }
  };

  return (
    <dialog id="add_category_modal" className={`modal ${isOpen ? 'modal-open' : ''}`}>
      <div className="modal-box max-w-md backdrop-blur-sm bg-base-100/95">
        <form method="dialog">
          <button 
            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 hover:rotate-90 transition-transform"
            onClick={onClose}
          >
            <Icon name="closeCircle" className="text-base" />
          </button>
        </form>
        <div className="space-y-4">
          <div>
            <h3 className="text-xl font-bold flex items-center gap-2">
              <Icon name="folderAdd" className="text-primary text-lg" />
              Add New Category
            </h3>
            <p className="text-xs text-base-content/60 mt-1">Create a category to group related tags</p>
          </div>

          <div className="space-y-4">
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium flex items-center gap-2">
                  <Icon name="edit" className="text-base" />
                  Category Name
                </span>
                <span className="label-text-alt text-error">{!formData.name.trim() && '*Required'}</span>
              </label>
              <input
                type="text"
                placeholder="e.g., Work, Personal, Study"
                className="input input-bordered w-full focus:border-primary transition-colors"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium flex items-center gap-2">
                  <Icon name="document" className="text-base" />
                  Description
                </span>
                <span className="label-text-alt text-base-content/60">Optional</span>
              </label>
              <textarea
                className="textarea textarea-bordered w-full min-h-[100px] focus:border-primary transition-colors"
                placeholder="Describe the purpose of this category..."
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              />
            </div>
          </div>

          <div className="flex justify-end gap-2">
            <form method="dialog">
              <div className="join gap-2">
                <button
                  className="btn join-item hover:bg-base-200 transition-colors"
                  onClick={onClose}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="btn btn-primary join-item hover:scale-105 transition-transform"
                  onClick={handleSubmit}
                  disabled={!formData.name.trim()}
                >
                  Create Category
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <form method="dialog" className="modal-backdrop">
        <button onClick={onClose}>close</button>
      </form>
    </dialog>
  );
};

export default AddCategoryModal; 