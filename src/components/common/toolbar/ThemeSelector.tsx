import React from 'react';
import Icon from '../icon/icon.component';
import { useTranslation } from 'react-i18next';

// Theme categories for better organization
const themeCategories = {
  Light: ['light', 'cupcake', 'bumblebee', 'emerald', 'corporate', 'lemonade', 'winter', 'garden', 'silk'],
  Dark: ['dark', 'synthwave', 'halloween', 'forest', 'black', 'dracula', 'night', 'coffee', 'dim', 'sunset', 'abyss'],
  Colorful: ['retro', 'cyberpunk', 'valentine', 'aqua', 'lofi', 'pastel', 'fantasy', 'wireframe', 'luxury', 'cmyk', 'autumn', 'caramellatte'],
  Professional: ['business', 'corporate', 'nord', 'winter'],
  Creative: ['acid', 'fantasy', 'wireframe']
};

interface ThemeSelectorProps {
  currentTheme: string;
  onThemeChange: (theme: string) => void;
}

const ThemeSelector: React.FC<ThemeSelectorProps> = ({
  currentTheme,
  onThemeChange,
}) => {
  const { t } = useTranslation();
  // Determine if current theme is considered dark
  const isDarkTheme = ['dark', 'synthwave', 'halloween', 'forest', 'black', 'dracula', 'night', 'coffee', 'dim', 'sunset', 'abyss'].includes(currentTheme);

  return (
    <div className="dropdown dropdown-end">
      <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
        <Icon name={isDarkTheme ? 'moon' : 'sun1'} className="text-xl" />
      </div>
      <div className="dropdown-content z-[1] menu p-3 shadow-lg bg-base-200 rounded-box w-72">
        <div className="mb-4 px-2">
          <div className="font-semibold mb-2 text-base-content/70 text-sm uppercase tracking-wider">{t('currentTheme')}</div>
          <button
            className="btn btn-sm w-full justify-start capitalize bg-base-100"
            data-theme={currentTheme}
          >
            <div className="flex items-center gap-2 w-full">
              <Icon name={isDarkTheme ? 'moon' : 'sun1'} className="w-4 h-4" />
              <span>{currentTheme}</span>
            </div>
          </button>
        </div>
        
        <div className="overflow-y-auto max-h-[400px] pr-1">
          {Object.entries(themeCategories).map(([category, themes]) => (
            <div key={category} className="mb-4 px-2">
              <div className="font-semibold mb-2 text-base-content/70 text-sm uppercase tracking-wider">{t(`themes.${category.toLowerCase()}`)}</div>
              <div className="grid grid-cols-1 gap-1.5">
                {themes.map((theme) => (
                  <button
                    key={theme}
                    className={`relative btn btn-sm h-auto py-2 px-3 justify-start capitalize w-full ${
                      currentTheme === theme 
                        ? 'bg-primary text-primary-content hover:bg-primary/90' 
                        : 'bg-base-100 hover:bg-base-100/90'
                    }`}
                    onClick={() => onThemeChange(theme)}
                    data-theme={theme}
                  >
                    <div className="flex items-center gap-2 w-full">
                      <div className="flex gap-1.5">
                        <div className="w-2 h-2 rounded-full bg-primary" />
                        <div className="w-2 h-2 rounded-full bg-secondary" />
                        <div className="w-2 h-2 rounded-full bg-accent" />
                      </div>
                      <span className="flex-1">{theme}</span>
                      {currentTheme === theme && (
                        <Icon name="check" className="w-4 h-4 shrink-0" />
                      )}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ThemeSelector; 