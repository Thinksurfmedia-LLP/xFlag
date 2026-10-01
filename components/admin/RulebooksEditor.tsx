'use client';

import { useState } from 'react';
import type { RuleItem, RuleSection, Rulebook } from '@/lib/cms/pageTypes';
import ParagraphsField from './ParagraphsField';
import { moveItem, removeAt, replaceAt } from './arrayUtils';

interface RulebooksEditorProps {
  value: Rulebook[];
  onChange: (value: Rulebook[]) => void;
}

interface MoveControlsProps {
  index: number;
  count: number;
  onMove: (delta: -1 | 1) => void;
  onRemove: () => void;
  removeLabel: string;
}

function MoveControls({ index, count, onMove, onRemove, removeLabel }: MoveControlsProps) {
  return (
    <div className="cms-block-controls">
      <button type="button" className="cms-btn-icon" title="Move up" aria-label="Move up" disabled={index === 0} onClick={() => onMove(-1)}>↑</button>
      <button type="button" className="cms-btn-icon" title="Move down" aria-label="Move down" disabled={index === count - 1} onClick={() => onMove(1)}>↓</button>
      <button type="button" className="cms-btn-icon cms-btn-danger" title={removeLabel} aria-label={removeLabel} onClick={onRemove}>✕</button>
    </div>
  );
}

function BlockBody({ block, onChange }: { block: RuleItem; onChange: (block: RuleItem) => void }) {
  if (block.type === 'text') {
    return <textarea className="cms-input" rows={4} value={block.value} onChange={e => onChange({ ...block, value: e.target.value })} />;
  }

  if (block.type === 'list') {
    return (
      <>
        <ParagraphsField value={block.items} rows={2} addLabel="+ Add list item" onChange={items => onChange({ ...block, items })} />
        <div className="cms-inline-checks">
          <label><input type="checkbox" checked={!!block.ordered} onChange={e => onChange({ ...block, ordered: e.target.checked })} /> Numbered</label>
          <label><input type="checkbox" checked={!!block.indent} onChange={e => onChange({ ...block, indent: e.target.checked })} /> Indented</label>
        </div>
      </>
    );
  }

  const setRow = (i: number, col: 0 | 1, text: string) => {
    const row = block.rows[i];
    const next: [string, string] = col === 0 ? [text, row[1]] : [row[0], text];
    onChange({ ...block, rows: replaceAt(block.rows, i, next) });
  };
  return (
    <div className="cms-repeat-list">
      <div className="cms-grid-2" style={{ marginRight: 40 }}>
        <span className="cms-label">Foul</span>
        <span className="cms-label">Penalty</span>
      </div>
      {block.rows.map((row, i) => (
        <div key={i} className="cms-repeat-row">
          <div className="cms-grid-2 cms-repeat-grow">
            <input className="cms-input" value={row[0]} onChange={e => setRow(i, 0, e.target.value)} aria-label={`Row ${i + 1} foul`} />
            <input className="cms-input" value={row[1]} onChange={e => setRow(i, 1, e.target.value)} aria-label={`Row ${i + 1} penalty`} />
          </div>
          <button type="button" className="cms-btn-icon cms-btn-danger" title="Remove row" aria-label="Remove row" onClick={() => onChange({ ...block, rows: removeAt(block.rows, i) })}>✕</button>
        </div>
      ))}
      <div>
        <button type="button" className="cms-btn-text" onClick={() => onChange({ ...block, rows: [...block.rows, ['', '']] })}>+ Add row</button>
      </div>
    </div>
  );
}

const BLOCK_LABELS: Record<RuleItem['type'], string> = { text: 'Paragraph', list: 'List', table: 'Penalty table' };

const NEW_BLOCKS: Record<RuleItem['type'], () => RuleItem> = {
  text: () => ({ type: 'text', value: '' }),
  list: () => ({ type: 'list', items: [''] }),
  table: () => ({ type: 'table', rows: [['', '']] }),
};

function SectionEditor({ section, onChange }: { section: RuleSection; onChange: (s: RuleSection) => void }) {
  const setContent = (content: RuleItem[]) => onChange({ ...section, content });
  return (
    <>
      {section.content.map((block, i) => (
        <div key={i} className="cms-rule-block">
          <div className="cms-rule-block-head">
            <span className="cms-block-type">{BLOCK_LABELS[block.type]}</span>
            <MoveControls
              index={i}
              count={section.content.length}
              onMove={d => setContent(moveItem(section.content, i, d))}
              onRemove={() => setContent(removeAt(section.content, i))}
              removeLabel="Remove block"
            />
          </div>
          <BlockBody block={block} onChange={b => setContent(replaceAt(section.content, i, b))} />
        </div>
      ))}
      <div className="cms-add-row">
        {(Object.keys(NEW_BLOCKS) as RuleItem['type'][]).map(type => (
          <button key={type} type="button" className="cms-btn-text" onClick={() => setContent([...section.content, NEW_BLOCKS[type]()])}>
            + {BLOCK_LABELS[type]}
          </button>
        ))}
      </div>
    </>
  );
}

function RulebookEditor({ book, onChange }: { book: Rulebook; onChange: (b: Rulebook) => void }) {
  const setSections = (sections: RuleSection[]) => onChange({ ...book, sections });
  return (
    <>
      <div className="cms-grid-2" style={{ marginTop: 16 }}>
        <div className="cms-form-group">
          <label>Rulebook title</label>
          <input className="cms-input" value={book.title} onChange={e => onChange({ ...book, title: e.target.value })} />
        </div>
        <div className="cms-form-group">
          <label>PDF file name</label>
          <input className="cms-input" value={book.filename} onChange={e => onChange({ ...book, filename: e.target.value })} />
          <p className="cms-help" style={{ marginTop: 6 }}>Lowercase letters, numbers and dashes. Download URL: /api/rules/pdf/{book.filename || '…'} — changing it breaks old download links.</p>
        </div>
      </div>

      {book.sections.map((section, i) => (
        <div key={i} className="cms-rule-section">
          <div className="cms-rule-section-head">
            <input
              className="cms-input"
              placeholder="Section heading (optional)"
              value={section.heading ?? ''}
              onChange={e => setSections(replaceAt(book.sections, i, { ...section, heading: e.target.value }))}
              aria-label={`Section ${i + 1} heading`}
            />
            <MoveControls
              index={i}
              count={book.sections.length}
              onMove={d => setSections(moveItem(book.sections, i, d))}
              onRemove={() => {
                if (confirm(`Remove section "${section.heading || `#${i + 1}`}" and all its content?`)) {
                  setSections(removeAt(book.sections, i));
                }
              }}
              removeLabel="Remove section"
            />
          </div>
          <SectionEditor section={section} onChange={s => setSections(replaceAt(book.sections, i, s))} />
        </div>
      ))}
      <button type="button" className="cms-btn cms-btn-outline" onClick={() => setSections([...book.sections, { heading: '', content: [] }])}>
        + Add section
      </button>
    </>
  );
}

// Index of the expanded rulebook after moving/removing item `index`, so the
// same book stays open rather than whichever one shifts into its slot.
function openAfterMove(open: number | null, index: number, delta: -1 | 1): number | null {
  if (open === index) return index + delta;
  if (open === index + delta) return index;
  return open;
}

function openAfterRemove(open: number | null, index: number): number | null {
  if (open === null || open === index) return null;
  return open > index ? open - 1 : open;
}

export default function RulebooksEditor({ value, onChange }: RulebooksEditorProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div>
      {value.map((book, i) => (
        <details
          key={i}
          className="cms-rulebook"
          open={openIndex === i}
          onToggle={e => {
            const isOpen = e.currentTarget.open;
            setOpenIndex(prev => (isOpen ? i : prev === i ? null : prev));
          }}
        >
          <summary>
            <span className="cms-rulebook-summary-title">{book.title || 'Untitled rulebook'}</span>
            <span className="cms-rulebook-meta">{book.sections.length} sections</span>
            <span onClick={e => e.preventDefault()}>
              <MoveControls
                index={i}
                count={value.length}
                onMove={d => {
                  setOpenIndex(prev => openAfterMove(prev, i, d));
                  onChange(moveItem(value, i, d));
                }}
                onRemove={() => {
                  if (confirm(`Delete the rulebook "${book.title}"? Its PDF download will stop working.`)) {
                    setOpenIndex(prev => openAfterRemove(prev, i));
                    onChange(removeAt(value, i));
                  }
                }}
                removeLabel="Delete rulebook"
              />
            </span>
          </summary>
          <div className="cms-rulebook-body">
            <RulebookEditor book={book} onChange={b => onChange(replaceAt(value, i, b))} />
          </div>
        </details>
      ))}
      <button
        type="button"
        className="cms-btn cms-btn-outline"
        onClick={() => {
          setOpenIndex(value.length);
          onChange([...value, { title: 'New Rulebook', filename: `rulebook-${Date.now()}`, sections: [] }]);
        }}
      >
        + Add rulebook
      </button>
    </div>
  );
}
