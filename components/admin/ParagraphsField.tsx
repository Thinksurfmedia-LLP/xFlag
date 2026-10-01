'use client';

import { moveItem, removeAt, replaceAt } from './arrayUtils';

interface ParagraphsFieldProps {
  value: string[];
  onChange: (value: string[]) => void;
  addLabel?: string;
  rows?: number;
}

export default function ParagraphsField({ value, onChange, addLabel = '+ Add paragraph', rows = 4 }: ParagraphsFieldProps) {
  return (
    <div className="cms-repeat-list">
      {value.length === 0 && <div className="cms-empty-note">Nothing here yet.</div>}
      {value.map((text, i) => (
        <div key={i} className="cms-repeat-row">
          <span className="cms-row-index">{i + 1}</span>
          <textarea
            className="cms-input"
            rows={rows}
            value={text}
            onChange={e => onChange(replaceAt(value, i, e.target.value))}
          />
          <div className="cms-repeat-controls">
            <button type="button" className="cms-btn-icon" title="Move up" aria-label="Move up" disabled={i === 0} onClick={() => onChange(moveItem(value, i, -1))}>↑</button>
            <button type="button" className="cms-btn-icon" title="Move down" aria-label="Move down" disabled={i === value.length - 1} onClick={() => onChange(moveItem(value, i, 1))}>↓</button>
            <button type="button" className="cms-btn-icon cms-btn-danger" title="Remove" aria-label="Remove" onClick={() => onChange(removeAt(value, i))}>✕</button>
          </div>
        </div>
      ))}
      <div>
        <button type="button" className="cms-btn-text" onClick={() => onChange([...value, ''])}>{addLabel}</button>
      </div>
    </div>
  );
}
