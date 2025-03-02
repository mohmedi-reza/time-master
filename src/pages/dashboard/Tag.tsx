import React, { useState } from "react";
import Icon from "../../components/common/icon/icon.component";

interface Tag {
  id: string;
  name: string;
  category: string;
  color: string;
}

interface Category {
  id: string;
  name: string;
  description: string;
}

const TagPage: React.FC = () => {
  const [newTagName, setNewTagName] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [showAddCategory, setShowAddCategory] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState("");
  const [newCategoryDescription, setNewCategoryDescription] = useState("");

  // Mock categories for demonstration
  const [categories, setCategories] = useState<Category[]>([
    { id: "1", name: "Work", description: "Work-related tasks and projects" },
    { id: "2", name: "Personal", description: "Personal tasks and activities" },
    { id: "3", name: "Study", description: "Learning and educational activities" },
    { id: "4", name: "Health", description: "Health and wellness activities" },
  ]);

  // Mock tags for demonstration
  const [tags, setTags] = useState<Tag[]>([
    { id: "1", name: "Urgent", category: "Work", color: "error" },
    { id: "2", name: "Meeting", category: "Work", color: "info" },
    { id: "3", name: "Exercise", category: "Health", color: "success" },
    { id: "4", name: "Reading", category: "Study", color: "warning" },
    { id: "5", name: "Shopping", category: "Personal", color: "neutral" },
    { id: "6", name: "Project", category: "Work", color: "primary" },
  ]);

  const tagColors = [
    { name: "primary", label: "Blue" },
    { name: "secondary", label: "Purple" },
    { name: "accent", label: "Teal" },
    { name: "neutral", label: "Gray" },
    { name: "info", label: "Sky" },
    { name: "success", label: "Green" },
    { name: "warning", label: "Yellow" },
    { name: "error", label: "Red" },
  ];

  const [selectedColor, setSelectedColor] = useState(tagColors[0].name);

  const handleAddTag = () => {
    if (newTagName.trim() && selectedCategory) {
      const newTag: Tag = {
        id: (tags.length + 1).toString(),
        name: newTagName.trim(),
        category: selectedCategory,
        color: selectedColor,
      };
      setTags([...tags, newTag]);
      setNewTagName("");
    }
  };

  const handleAddCategory = () => {
    if (newCategoryName.trim()) {
      const newCategory: Category = {
        id: (categories.length + 1).toString(),
        name: newCategoryName.trim(),
        description: newCategoryDescription.trim(),
      };
      setCategories([...categories, newCategory]);
      setNewCategoryName("");
      setNewCategoryDescription("");
      setShowAddCategory(false);
    }
  };

  const handleDeleteTag = (tagId: string) => {
    setTags(tags.filter(tag => tag.id !== tagId));
  };

  const handleDeleteCategory = (categoryId: string) => {
    setCategories(categories.filter(category => category.id !== categoryId));
    setTags(tags.filter(tag => tag.category !== categories.find(c => c.id === categoryId)?.name));
  };

  return (
    <div className="space-y-6 p-4 bg-gradient-to-br from-base-100 to-base-200 min-h-screen">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-black bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Tags</h1>
          <p className="text-gray-400 mt-1 text-sm">Manage tags and categorization</p>
        </div>
        <div className="join gap-2">
          <button
            className="btn btn-primary gap-2 hover:scale-105 transition-transform"
            onClick={() => setShowAddCategory(true)}
          >
            <Icon name="folderAdd" className="text-lg" />
            Add Category
          </button>
          <button
            className="btn btn-primary gap-2 hover:scale-105 transition-transform"
            onClick={() => (document.getElementById('add_tag_modal') as HTMLDialogElement)?.showModal()}
          >
            <Icon name="tagUser" className="text-lg" />
            Add Tag
          </button>
        </div>
      </div>

      {/* Categories and Tags Grid */}
      <div className="grid gap-4">
        {categories.map(category => (
          <div key={category.id} className="card bg-base-100 border border-accent/20   hover:   transition-all duration-300 backdrop-blur-sm bg-opacity-80">
            <div className="card-body p-4">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h2 className="text-lg font-bold flex items-center gap-2">
                    <Icon name="folder" className="text-primary text-lg" />
                    {category.name}
                  </h2>
                  <p className="text-base-content/60 text-xs mt-0.5">{category.description}</p>
                </div>
                <button
                  className="btn btn-ghost btn-xs text-error hover:bg-error/10 hover:text-error transition-colors"
                  onClick={() => handleDeleteCategory(category.id)}
                >
                  <Icon name="trash" className="text-base" />
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {tags
                  .filter(tag => tag.category === category.name)
                  .map(tag => (
                    <div
                      key={tag.id}
                      className={`badge gap-1 badge-${tag.color} py-2 px-3 hover:shadow-md transition-all duration-200`}
                    >
                      <Icon name="tag" className="text-sm" />
                      {tag.name}
                      <button
                        className="btn btn-ghost btn-xs px-0 hover:scale-110 transition-transform"
                        onClick={() => handleDeleteTag(tag.id)}
                      >
                        <Icon name="closeCircle" className="text-sm" />
                      </button>
                    </div>
                  ))}
                {tags.filter(tag => tag.category === category.name).length === 0 && (
                  <p className="text-base-content/60 p-3 bg-base-200/50 rounded-lg text-center w-full text-sm">No tags in this category</p>
                )}
              </div>
            </div>
          </div>
        ))}
        {categories.length === 0 && (
          <div className="text-center p-6 bg-base-200/50 rounded-lg">
            <Icon name="folder" className="text-4xl text-base-content/30 mx-auto mb-3" />
            <p className="text-base-content/60 text-sm">No categories yet. Create one to get started!</p>
          </div>
        )}
      </div>

      {/* Add Tag Modal */}
      <dialog id="add_tag_modal" className="modal">
        <div className="modal-box max-w-md backdrop-blur-sm bg-base-100/95">
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 hover:rotate-90 transition-transform">
              <Icon name="closeCircle" className="text-base" />
            </button>
          </form>
          <div className="space-y-4">
            <div>
              <h3 className="text-xl font-bold flex items-center gap-2">
                <Icon name="tagUser" className="text-primary text-lg" />
                Add New Tag
              </h3>
              <p className="text-xs text-base-content/60 mt-1">Create a new tag to organize your tasks</p>
            </div>

            <div className="space-y-4">
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-medium flex items-center gap-2">
                    <Icon name="edit" className="text-base" />
                    Tag Name
                  </span>
                  <span className="label-text-alt text-error">{!newTagName.trim() && '*Required'}</span>
                </label>
                <input
                  type="text"
                  placeholder="e.g., Important, Urgent, Follow-up"
                  className="input input-bordered w-full focus:border-primary transition-colors"
                  value={newTagName}
                  onChange={(e) => setNewTagName(e.target.value)}
                />
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text font-medium flex items-center gap-2">
                    <Icon name="folder" className="text-base" />
                    Category
                  </span>
                  <span className="label-text-alt text-error">{!selectedCategory && '*Required'}</span>
                </label>
                <select
                  className="select select-bordered w-full focus:border-primary transition-colors"
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                >
                  <option value="">Select a category</option>
                  {categories.map(category => (
                    <option key={category.id} value={category.name}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text font-medium flex items-center gap-2">
                    <Icon name="colorSwatch" className="text-base" />
                    Color
                  </span>
                </label>
                <div className="grid grid-cols-4 gap-2">
                  {tagColors.map(color => (
                    <button
                      key={color.name}
                      type="button"
                      className={`btn btn-sm ${
                        selectedColor === color.name 
                          ? 'ring-2 ring-offset-2 ring-primary scale-105' 
                          : ''
                      } btn-${color.name} hover:scale-105 transition-transform`}
                      onClick={() => setSelectedColor(color.name)}
                    >
                      {color.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-2">
              <form method="dialog">
                <div className="join gap-2">
                  <button className="btn join-item hover:bg-base-200 transition-colors">Cancel</button>
                  <button
                    type="button"
                    className="btn btn-primary join-item hover:scale-105 transition-transform"
                    onClick={() => {
                      handleAddTag();
                      if (newTagName.trim() && selectedCategory) {
                        const modal = document.getElementById('add_tag_modal') as HTMLDialogElement;
                        modal?.close();
                      }
                    }}
                    disabled={!newTagName.trim() || !selectedCategory}
                  >
                    Create Tag
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>

      {/* Add Category Modal */}
      <dialog id="add_category_modal" className={`modal ${showAddCategory ? 'modal-open' : ''}`}>
        <div className="modal-box max-w-md backdrop-blur-sm bg-base-100/95">
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 hover:rotate-90 transition-transform">
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
                  <span className="label-text-alt text-error">{!newCategoryName.trim() && '*Required'}</span>
                </label>
                <input
                  type="text"
                  placeholder="e.g., Work, Personal, Study"
                  className="input input-bordered w-full focus:border-primary transition-colors"
                  value={newCategoryName}
                  onChange={(e) => setNewCategoryName(e.target.value)}
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
                  value={newCategoryDescription}
                  onChange={(e) => setNewCategoryDescription(e.target.value)}
                />
              </div>
            </div>

            <div className="flex justify-end gap-2">
              <form method="dialog">
                <div className="join gap-2">
                  <button
                    className="btn join-item hover:bg-base-200 transition-colors"
                    onClick={() => setShowAddCategory(false)}
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    className="btn btn-primary join-item hover:scale-105 transition-transform"
                    onClick={() => {
                      handleAddCategory();
                      if (newCategoryName.trim()) {
                        const modal = document.getElementById('add_category_modal') as HTMLDialogElement;
                        modal?.close();
                      }
                    }}
                    disabled={!newCategoryName.trim()}
                  >
                    Create Category
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </div>
  );
};

export default TagPage;
