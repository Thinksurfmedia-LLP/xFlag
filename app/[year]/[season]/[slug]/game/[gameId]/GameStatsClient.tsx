'use client';

import { useState, useMemo } from 'react';

const FLAGMAG_URL = (process.env.NEXT_PUBLIC_FLAGMAG_API_URL || 'https://flagmag.com').replace(/\/$/, '');

type SortDir = 'asc' | 'desc';
interface SortState { key: string; dir: SortDir; }

function SortIcon({ active, dir }: { active: boolean; dir: SortDir }) {
  return (
    <span style={{ marginLeft: 4, opacity: active ? 1 : 0.35, fontSize: 10, userSelect: 'none' }}>
      {active ? (dir === 'desc' ? '▼' : '▲') : '⇅'}
    </span>
  );
}

function useSorted(rows: any[], defaultKey: string) {
  const [sort, setSort] = useState<SortState>({ key: defaultKey, dir: 'desc' });
  const toggle = (key: string) => {
    setSort(prev =>
      prev.key === key
        ? { key, dir: prev.dir === 'desc' ? 'asc' : 'desc' }
        : { key, dir: 'desc' }
    );
  };
  const sorted = useMemo(() => {
    return [...rows].sort((a, b) => {
      const av = a[sort.key] ?? -Infinity;
      const bv = b[sort.key] ?? -Infinity;
      const cmp = typeof av === 'number' && typeof bv === 'number'
        ? av - bv
        : String(av).localeCompare(String(bv));
      return sort.dir === 'desc' ? -cmp : cmp;
    });
  }, [rows, sort]);
  return { sorted, sort, toggle };
}

function Th({ label, sortKey, sort, toggle }: { label: string; sortKey: string; sort: SortState; toggle: (k: string) => void }) {
  return (
    <th onClick={() => toggle(sortKey)} style={{ cursor: 'pointer', whiteSpace: 'nowrap', userSelect: 'none' }}>
      {label}<SortIcon active={sort.key === sortKey} dir={sort.dir} />
    </th>
  );
}

function PlayerCell({ p }: { p: any }) {
  const photo = !p.playerPhoto
    ? '/assets/images/player-placeholder.svg'
    : p.playerPhoto.startsWith('/api/')
      ? `${FLAGMAG_URL}${p.playerPhoto}`
      : p.playerPhoto;
  return (
    <td>
      <img src={photo} alt={p.playerName} style={{ width: 30, height: 30, borderRadius: '50%', objectFit: 'cover', marginRight: 6, verticalAlign: 'middle' }} />
      {p.playerName}{p.jerseyNumber ? ` (#${p.jerseyNumber})` : ''}
    </td>
  );
}

function PassingTable({ rows }: { rows: any[] }) {
  const { sorted, sort, toggle } = useSorted(rows, 'yards');
  const T = (label: string, key: string) => <Th label={label} sortKey={key} sort={sort} toggle={toggle} />;
  return (
    <div className="table-wrap">
      <h4>Passing</h4>
      <table className="table states-table">
        <thead>
          <tr>
            <th>#</th>
            {T('NAME', 'playerName')}
            {T('TEAM', 'teamName')}
            {T('ATT', 'atts')}
            {T('COMP', 'comp')}
            {T('%', 'pct')}
            {T('YDS', 'yards')}
            {T('TD', 'tds')}
            {T('PAT', 'pat')}
            {T('INT', 'ints')}
            {T('SACKS', 'sacks')}
            {T('RATING', 'rate')}
          </tr>
        </thead>
        <tbody>
          {sorted.length > 0 ? sorted.map((p, i) => (
            <tr key={`${p.playerId || ''}_${p.teamName || ''}_${i}`}>
              <td>{i + 1}</td>
              <PlayerCell p={p} />
              <td>{p.teamName}</td>
              <td>{p.atts}</td>
              <td>{p.comp}</td>
              <td>{p.pct}</td>
              <td>{p.yards}</td>
              <td>{p.tds}</td>
              <td>{p.pat}</td>
              <td>{p.ints}</td>
              <td>{p.sacks}</td>
              <td>{p.rate}</td>
            </tr>
          )) : <tr><td colSpan={12} className="text-center">No passing stats available</td></tr>}
        </tbody>
      </table>
    </div>
  );
}

function ReceivingTable({ rows }: { rows: any[] }) {
  const withPts = useMemo(() => rows.map(p => ({ ...p, pts: (p.tds * 6) + p.pat })), [rows]);
  const { sorted, sort, toggle } = useSorted(withPts, 'yards');
  const T = (label: string, key: string) => <Th label={label} sortKey={key} sort={sort} toggle={toggle} />;
  return (
    <div className="table-wrap">
      <h4>Receiving</h4>
      <table className="table states-table">
        <thead>
          <tr>
            <th>#</th>
            {T('NAME', 'playerName')}
            {T('TEAM', 'teamName')}
            {T('REC', 'receptions')}
            {T('YDS', 'yards')}
            {T('TD', 'tds')}
            {T('PAT', 'pat')}
            {T('PTS', 'pts')}
            {T('Y/R', 'ypr')}
          </tr>
        </thead>
        <tbody>
          {sorted.length > 0 ? sorted.map((p, i) => (
            <tr key={`${p.playerId || ''}_${p.teamName || ''}_${i}`}>
              <td>{i + 1}</td>
              <PlayerCell p={p} />
              <td>{p.teamName}</td>
              <td>{p.receptions}</td>
              <td>{p.yards}</td>
              <td>{p.tds}</td>
              <td>{p.pat}</td>
              <td>{p.pts}</td>
              <td>{p.ypr}</td>
            </tr>
          )) : <tr><td colSpan={9} className="text-center">No receiving stats available</td></tr>}
        </tbody>
      </table>
    </div>
  );
}

function RushingTable({ rows }: { rows: any[] }) {
  const { sorted, sort, toggle } = useSorted(rows, 'yards');
  const T = (label: string, key: string) => <Th label={label} sortKey={key} sort={sort} toggle={toggle} />;
  return (
    <div className="table-wrap">
      <h4>Rushing</h4>
      <table className="table states-table">
        <thead>
          <tr>
            <th>#</th>
            {T('NAME', 'playerName')}
            {T('TEAM', 'teamName')}
            {T('ATT', 'atts')}
            {T('YDS', 'yards')}
            {T('TD', 'tds')}
            {T('PAT', 'pat')}
            {T('Y/C', 'ypc')}
          </tr>
        </thead>
        <tbody>
          {sorted.length > 0 ? sorted.map((p, i) => (
            <tr key={`${p.playerId || ''}_${p.teamName || ''}_${i}`}>
              <td>{i + 1}</td>
              <PlayerCell p={p} />
              <td>{p.teamName}</td>
              <td>{p.atts}</td>
              <td>{p.yards}</td>
              <td>{p.tds}</td>
              <td>{p.pat}</td>
              <td>{p.ypc}</td>
            </tr>
          )) : <tr><td colSpan={8} className="text-center">No rushing stats available</td></tr>}
        </tbody>
      </table>
    </div>
  );
}

function DefenseTable({ rows }: { rows: any[] }) {
  const { sorted, sort, toggle } = useSorted(rows, 'flagPulls');
  const T = (label: string, key: string) => <Th label={label} sortKey={key} sort={sort} toggle={toggle} />;
  return (
    <div className="table-wrap">
      <h4>Defense</h4>
      <table className="table states-table">
        <thead>
          <tr>
            <th>#</th>
            {T('NAME', 'playerName')}
            {T('TEAM', 'teamName')}
            {T('INT', 'dint')}
            {T('FMBL', 'fumbles')}
            {T('DTD', 'dtd')}
            {T('DPAT', 'dpat')}
            {T('SCK', 'dsacks')}
            {T('SAF', 'dsafety')}
            {T('FP', 'flagPulls')}
          </tr>
        </thead>
        <tbody>
          {sorted.length > 0 ? sorted.map((p, i) => (
            <tr key={`${p.playerId || ''}_${p.teamName || ''}_${i}`}>
              <td>{i + 1}</td>
              <PlayerCell p={p} />
              <td>{p.teamName}</td>
              <td>{p.dint}</td>
              <td>{p.fumbles}</td>
              <td>{p.dtd}</td>
              <td>{p.dpat}</td>
              <td>{p.dsacks}</td>
              <td>{p.dsafety}</td>
              <td>{p.flagPulls}</td>
            </tr>
          )) : <tr><td colSpan={10} className="text-center">No defensive stats available</td></tr>}
        </tbody>
      </table>
    </div>
  );
}

interface Props {
  passing: any[];
  receiving: any[];
  rushing: any[];
  defensive: any[];
}

export default function GameStatsClient({ passing, receiving, rushing, defensive }: Props) {
  return (
    <div className="states-table-main">
      {passing.length > 0 && <PassingTable rows={passing} />}
      {receiving.length > 0 && <ReceivingTable rows={receiving} />}
      {rushing.length > 0 && <RushingTable rows={rushing} />}
      {defensive.length > 0 && <DefenseTable rows={defensive} />}
    </div>
  );
}
