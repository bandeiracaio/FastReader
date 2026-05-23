import type { ThemePreset, ThemeSettings } from "../types";
import { THEME_PRESETS, FONT_SIZE_OPTIONS, FONT_FAMILY_OPTIONS, DEFAULT_THEME } from "../data/themes";

type Props = {
  themeSettings: ThemeSettings;
  onThemePresetSelect: (preset: ThemePreset) => void;
  onThemeSettingChange: (patch: Partial<ThemeSettings>) => void;
  onReset: () => void;
};

export default function Settings({ themeSettings, onThemePresetSelect, onThemeSettingChange, onReset }: Props) {
  return (
    <div className="screen settings">
      <section className="settings__section">
        <h2 className="settings__section-title">Theme presets</h2>
        <div className="settings__presets">
          {THEME_PRESETS.map((preset) => (
            <button
              key={preset.id}
              type="button"
              className="settings__preset-card"
              onClick={() => onThemePresetSelect(preset)}
              data-testid={`theme-${preset.id}`}
              aria-label={`${preset.label}: ${preset.description}`}
            >
              <div className="settings__preset-swatches">
                {preset.swatches.map((color) => (
                  <span
                    key={color}
                    className="settings__swatch"
                    style={{ backgroundColor: color }}
                  />
                ))}
              </div>
              <div className="settings__preset-name" style={{ fontFamily: preset.theme.fontFamily }}>
                {preset.label}
              </div>
              <div className="settings__preset-desc">{preset.description}</div>
            </button>
          ))}
        </div>
      </section>

      <section className="settings__section">
        <h2 className="settings__section-title">Font &amp; colors</h2>
        <div className="settings__controls">
          <div className="settings__row">
            <label className="settings__label" htmlFor="fontSize">Font size</label>
            <select
              id="fontSize"
              className="settings__select"
              value={themeSettings.fontSize}
              onChange={(e) => onThemeSettingChange({ fontSize: e.target.value })}
              data-testid="font-size-select"
            >
              {FONT_SIZE_OPTIONS.map((size) => (
                <option key={size} value={size}>{size}px</option>
              ))}
            </select>
          </div>

          <div className="settings__row">
            <label className="settings__label" htmlFor="fontFamily">Font family</label>
            <select
              id="fontFamily"
              className="settings__select"
              value={themeSettings.fontFamily}
              onChange={(e) => onThemeSettingChange({ fontFamily: e.target.value })}
              data-testid="font-family-select"
              style={{ fontFamily: themeSettings.fontFamily }}
            >
              {FONT_FAMILY_OPTIONS.map((family) => (
                <option key={family} value={family} style={{ fontFamily: family }}>{family}</option>
              ))}
            </select>
          </div>

          <div className="settings__row">
            <label className="settings__label" htmlFor="textColor">Text color</label>
            <input
              id="textColor"
              className="settings__color-input"
              type="color"
              value={themeSettings.textColor}
              onChange={(e) => onThemeSettingChange({ textColor: e.target.value })}
              data-testid="text-color-input"
            />
          </div>

          <div className="settings__row">
            <label className="settings__label" htmlFor="backgroundColor">Background</label>
            <input
              id="backgroundColor"
              className="settings__color-input"
              type="color"
              value={themeSettings.backgroundColor}
              onChange={(e) => onThemeSettingChange({ backgroundColor: e.target.value })}
              data-testid="background-color-input"
            />
          </div>

          <div className="settings__row">
            <label className="settings__label" htmlFor="highlightColor">Highlight color</label>
            <input
              id="highlightColor"
              className="settings__color-input"
              type="color"
              value={themeSettings.highlightColor}
              onChange={(e) => onThemeSettingChange({ highlightColor: e.target.value })}
              data-testid="highlight-color-input"
            />
          </div>

          <div className="settings__row">
            <label className="settings__label" htmlFor="highlightOutlineColor">Highlight outline</label>
            <input
              id="highlightOutlineColor"
              className="settings__color-input"
              type="color"
              value={themeSettings.highlightOutlineColor}
              onChange={(e) => onThemeSettingChange({ highlightOutlineColor: e.target.value })}
              data-testid="highlight-outline-color-input"
            />
          </div>

          <div className="settings__row">
            <span className="settings__label" />
            <button
              type="button"
              className="btn btn--small"
              onClick={onReset}
              data-testid="theme-reset"
            >
              Reset to default
            </button>
          </div>
        </div>

        <div className="settings__preview">
          <span style={{ color: themeSettings.textColor }}>Preview text </span>
          <span style={{
            color: themeSettings.highlightColor,
            textShadow: `-1px -1px 0 ${themeSettings.highlightOutlineColor}, 1px 1px 0 ${themeSettings.highlightOutlineColor}`
          }}>
            E
          </span>
          <span style={{ color: themeSettings.textColor }}> xample</span>
        </div>
      </section>

      <p className="settings__hint">
        Theme and font settings are saved automatically in your browser.
        {themeSettings.textColor !== DEFAULT_THEME.textColor ||
         themeSettings.backgroundColor !== DEFAULT_THEME.backgroundColor ? (
          <> Using a custom theme.</>
        ) : null}
      </p>
    </div>
  );
}
