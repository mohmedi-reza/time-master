import React from "react";
import { useTranslation } from "react-i18next";
import Icon from "../common/icon/icon.component";
import { Category, Tag } from "../../interfaces/tag.interface";
import TagBadge from "./TagBadge";

interface CategoryCardProps {
  category: Category;
  tags: Tag[];
  onDeleteCategory: (id: string) => void;
  onDeleteTag: (id: string) => void;
}

const CategoryCard: React.FC<CategoryCardProps> = ({
  category,
  tags,
  onDeleteCategory,
  onDeleteTag,
}) => {
  const { t } = useTranslation();
  const categoryTags = tags.filter(tag => tag.category === category.name);

  return (
    <div className="card bg-base-100 border border-accent/20 hover:border-accent/40 transition-all duration-300 backdrop-blur-sm bg-opacity-80">
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
            onClick={() => onDeleteCategory(category.id)}
          >
            <Icon name="trash" className="text-base" />
          </button>
        </div>
        <div className="flex flex-wrap gap-2">
          {categoryTags.map(tag => (
            <TagBadge
              key={tag.id}
              tag={tag}
              onDelete={() => onDeleteTag(tag.id)}
            />
          ))}
          {categoryTags.length === 0 && (
            <p className="text-base-content/60 p-3 bg-base-200/50 rounded-lg text-center w-full text-sm">
              {t('tags.category.noTags')}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default CategoryCard; 