import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import Icon from "../../components/common/icon/icon.component";
import CategoryCard from "../../components/tag/CategoryCard";
import AddTagModal from "../../components/tag/AddTagModal";
import AddCategoryModal from "../../components/tag/AddCategoryModal";
import { Tag, Category, TagColor, TagFormData, CategoryFormData } from "../../interfaces/tag.interface";

const TagPage: React.FC = () => {
  const { t } = useTranslation();
  const [showAddCategory, setShowAddCategory] = useState(false);

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

  const tagColors: TagColor[] = [
    { name: "primary", label: "Blue" },
    { name: "secondary", label: "Purple" },
    { name: "accent", label: "Teal" },
    { name: "neutral", label: "Gray" },
    { name: "info", label: "Sky" },
    { name: "success", label: "Green" },
    { name: "warning", label: "Yellow" },
    { name: "error", label: "Red" },
  ];

  const handleAddTag = (tagData: TagFormData) => {
    const newTag: Tag = {
      id: (tags.length + 1).toString(),
      ...tagData,
    };
    setTags([...tags, newTag]);
  };

  const handleAddCategory = (categoryData: CategoryFormData) => {
    const newCategory: Category = {
      id: (categories.length + 1).toString(),
      ...categoryData,
    };
    setCategories([...categories, newCategory]);
  };

  const handleDeleteTag = (tagId: string) => {
    setTags(tags.filter(tag => tag.id !== tagId));
  };

  const handleDeleteCategory = (categoryId: string) => {
    const categoryName = categories.find(c => c.id === categoryId)?.name;
    setCategories(categories.filter(category => category.id !== categoryId));
    if (categoryName) {
      setTags(tags.filter(tag => tag.category !== categoryName));
    }
  };

  return (
    <div className="space-y-6 p-4 bg-gradient-to-br from-base-100 to-base-200 min-h-screen">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-black bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            {t('sidebar.items.tags')}
          </h1>
          <p className="text-gray-400 mt-1 text-sm">{t('tags.overview.subtitle')}</p>
        </div>
        <div className="join gap-2">
          <button
            className="btn btn-primary gap-2 hover:scale-105 transition-transform"
            onClick={() => setShowAddCategory(true)}
          >
            <Icon name="folderAdd" className="text-lg" />
            {t('tags.actions.addCategory')}
          </button>
          <button
            className="btn btn-primary gap-2 hover:scale-105 transition-transform"
            onClick={() => (document.getElementById('add_tag_modal') as HTMLDialogElement)?.showModal()}
          >
            <Icon name="tagUser" className="text-lg" />
            {t('tags.actions.addTag')}
          </button>
        </div>
      </div>

      {/* Categories Grid */}
      <div className="grid gap-4">
        {categories.map(category => (
          <CategoryCard
            key={category.id}
            category={category}
            tags={tags}
            onDeleteCategory={handleDeleteCategory}
            onDeleteTag={handleDeleteTag}
          />
        ))}
        {categories.length === 0 && (
          <div className="text-center p-6 bg-base-200/50 rounded-lg">
            <Icon name="folder" className="text-4xl text-base-content/30 mx-auto mb-3" />
            <p className="text-base-content/60 text-sm">{t('tags.empty.noCategories')}</p>
          </div>
        )}
      </div>

      {/* Modals */}
      <AddTagModal
        categories={categories}
        tagColors={tagColors}
        onAddTag={handleAddTag}
      />
      
      <AddCategoryModal
        isOpen={showAddCategory}
        onClose={() => setShowAddCategory(false)}
        onAddCategory={handleAddCategory}
      />
    </div>
  );
};

export default TagPage;
