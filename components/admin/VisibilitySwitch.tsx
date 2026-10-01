'use client';

interface VisibilitySwitchProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  onLabel?: string;
  offLabel?: string;
}

export default function VisibilitySwitch({ checked, onChange, onLabel = 'Visible on site', offLabel = 'Hidden' }: VisibilitySwitchProps) {
  return (
    <label className={`cms-switch${checked ? ' is-on' : ''}`}>
      <input type="checkbox" checked={checked} onChange={e => onChange(e.target.checked)} />
      <span className="cms-switch-track" />
      <span className="cms-switch-label">{checked ? onLabel : offLabel}</span>
    </label>
  );
}
