import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import Icon from "../common/icon/icon.component";
import { Category, TagColor, TagFormData } from "../../interfaces/tag.interface";

interface AddTagModalProps {
  categories: Category[];
  tagColors: TagColor[];
  onAddTag: (tagData: TagFormData) => void;
}

const AddTagModal: React.FC<AddTagModalProps> = ({
  categories,
  tagColors,
  onAddTag,
}) => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState<TagFormData>({
    name: "",
    category: "",
    color: tagColors[0].name,
  });

  const handleSubmit = () => {
    if (formData.name.trim() && formData.category) {
      onAddTag(formData);
      setFormData({ ...formData, name: "", category: "" });
      const modal = document.getElementById('add_tag_modal') as HTMLDialogElement;
      modal?.close();
    }
  };

  return (
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
              {t('tags.tagModal.title')}
            </h3>
            <p className="text-xs text-base-content/60 mt-1">{t('tags.tagModal.subtitle')}</p>
          </div>

          <div className="space-y-4">
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium flex items-center gap-2">
                  <Icon name="edit" className="text-base" />
                  {t('tags.tagModal.fields.name')}
                </span>
                <span className="label-text-alt text-error">{!formData.name.trim() && t('common.required')}</span>
              </label>
              <input
                type="text"
                placeholder={t('tags.tagModal.placeholders.name')}
                className="input input-bordered w-full focus:border-primary transition-colors"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium flex items-center gap-2">
                  <Icon name="folder" className="text-base" />
                  {t('tags.tagModal.fields.category')}
                </span>
                <span className="label-text-alt text-error">{!formData.category && t('common.required')}</span>
              </label>
              <select
                className="select select-bordered w-full focus:border-primary transition-colors"
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              >
                <option value="">{t('tags.tagModal.placeholders.selectCategory')}</option>
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
                  {t('tags.tagModal.fields.color')}
                </span>
              </label>
              <div className="grid grid-cols-4 gap-2">
                {tagColors.map(color => (
                  <button
                    key={color.name}
                    type="button"
                    className={`btn btn-sm ${
                      formData.color === color.name 
                        ? 'ring-2 ring-offset-2 ring-primary scale-105' 
                        : ''
                    } btn-${color.name} hover:scale-105 transition-transform`}
                    onClick={() => setFormData({ ...formData, color: color.name })}
                  >
                    {t(`common.colors.${color.label.toLowerCase()}`)}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-2">
            <form method="dialog">
              <div className="join gap-2">
                <button className="btn join-item hover:bg-base-200 transition-colors">
                  {t('common.cancel')}
                </button>
                <button
                  type="button"
                  className="btn btn-primary join-item hover:scale-105 transition-transform"
                  onClick={handleSubmit}
                  disabled={!formData.name.trim() || !formData.category}
                >
                  {t('tags.tagModal.actions.create')}
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
  );
};

export default AddTagModal; 