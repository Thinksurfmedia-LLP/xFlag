'use client';

import { useState, useEffect, useRef } from 'react';
import type { CmsData, HomepageBanner, SuccessStat, StripBanner, MatchHighlight, FeaturedLocation, DifferenceItem, Sponsor, Testimonial } from '@/lib/types';

export default function HomepageAdminPage() {
  const [data, setData] = useState<CmsData['homepage'] | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ text: string; type: 'success' | 'error' } | null>(null);
  const [activeTab, setActiveTab] = useState('hero');
  const [uploadStatus, setUploadStatus] = useState<Record<string, string>>({});
  const [liveLocations, setLiveLocations] = useState<{ locationName: string; cityName: string; stateAbbr: string; countyName: string }[]>([]);

  useEffect(() => {
    Promise.all([
      fetch('/api/cms/homepage').then(r => r.json()),
      fetch('/api/cms/locations-live').then(r => r.json()),
    ]).then(([cmsResult, liveResult]) => {
      if (cmsResult.success && cmsResult.data) setData(cmsResult.data);
      if (liveResult.success) setLiveLocations(liveResult.data);
      setLoading(false);
    });
  }, []);

  async function handleSave() {
    setSaving(true);
    setMessage(null);
    try {
      const res = await fetch('/api/cms/homepage', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      const result = await res.json();
      if (result.success) {
        setMessage({ text: 'Homepage changes saved successfully!', type: 'success' });
      } else {
        setMessage({ text: result.error || 'Failed to save changes.', type: 'error' });
      }
    } catch {
      setMessage({ text: 'Network error.', type: 'error' });
    }
    setSaving(false);
  }

  async function handleUpload(field: string, file: File, callback: (path: string) => void) {
    setUploadStatus(prev => ({ ...prev, [field]: 'uploading' }));
    const formData = new FormData();
    formData.append('file', file);
    formData.append('field', field); // Can be any generic name now

    try {
      const res = await fetch('/api/cms/logos', { method: 'POST', body: formData });
      const result = await res.json();
      if (result.success && result.data) {
        callback(result.data.path);
        setUploadStatus(prev => ({ ...prev, [field]: 'success' }));
        setTimeout(() => setUploadStatus(prev => ({ ...prev, [field]: '' })), 3000);
      } else {
        setUploadStatus(prev => ({ ...prev, [field]: `error:${result.error}` }));
      }
    } catch {
      setUploadStatus(prev => ({ ...prev, [field]: 'error:Network error' }));
    }
  }

  if (loading) return <div className="cms-page-loading">Loading…</div>;
  if (!data) return <div className="cms-alert cms-alert-error">Failed to load data.</div>;

  const tabs = [
    { id: 'hero', label: 'Hero Banners' },
    { id: 'success', label: 'Success Stats' },
    { id: 'strip', label: 'Strip Banner' },
    { id: 'highlights', label: 'Highlights' },
    { id: 'locations', label: 'Locations' },
    { id: 'difference', label: 'Difference' },
    { id: 'sponsors', label: 'Sponsors' },
    { id: 'testimonials', label: 'Testimonials' },
    { id: 'titles', label: 'Section Titles' },
  ];

  return (
    <div>
      <div className="cms-page-header">
        <div>
          <h1 className="cms-page-title">Homepage Content</h1>
          <p className="cms-page-desc">Manage all dynamic sections of the homepage.</p>
        </div>
        <button className="cms-btn cms-btn-primary" onClick={handleSave} disabled={saving}>
          {saving ? 'Saving…' : 'Save Changes'}
        </button>
      </div>

      {message && (
        <div className={`cms-alert cms-alert-${message.type}`}>
          <span className="cms-alert-icon">{message.type === 'success' ? '✓' : '⚠'}</span>
          {message.text}
        </div>
      )}

      <div className="cms-tabs">
        {tabs.map(t => (
          <button 
            key={t.id} 
            className={`cms-tab-btn ${activeTab === t.id ? 'active' : ''}`}
            onClick={() => setActiveTab(t.id)}
          >
            {t.label}
          </button>
        ))}
      </div>

      <div className="cms-tab-content">
        {/* HERO BANNERS */}
        {activeTab === 'hero' && (
          <div className="cms-section">
            <h2 className="cms-section-title">Hero Banner Slider</h2>
            <div className="cms-grid">
              {data.banners.map((b, idx) => (
                <div key={b.id} className="cms-card">
                  <div className="cms-card-header">
                    <h6>Slide {idx + 1}</h6>
                    <button className="cms-btn-icon cms-btn-danger" onClick={() => {
                      const newBanners = [...data.banners];
                      newBanners.splice(idx, 1);
                      setData({...data, banners: newBanners});
                    }}>✕</button>
                  </div>
                  <div className="cms-card-body">
                    <ImageUpload 
                      src={b.image} 
                      status={uploadStatus[`banner-${b.id}`]}
                      onUpload={(f) => handleUpload(`banner-${b.id}`, f, (path) => {
                        const nb = [...data.banners]; nb[idx].image = path; setData({...data, banners: nb});
                      })}
                    />
                    <div className="cms-form-group mt-3">
                      <label>Title</label>
                      <input type="text" className="cms-input" value={b.title} onChange={e => {
                        const nb = [...data.banners]; nb[idx].title = e.target.value; setData({...data, banners: nb});
                      }} />
                    </div>
                    <div className="cms-form-group">
                      <label>Subtitle</label>
                      <input type="text" className="cms-input" value={b.subtitle} onChange={e => {
                        const nb = [...data.banners]; nb[idx].subtitle = e.target.value; setData({...data, banners: nb});
                      }} />
                    </div>
                    <div className="cms-form-group">
                      <label>CTA Text</label>
                      <input type="text" className="cms-input" value={b.ctaText} onChange={e => {
                        const nb = [...data.banners]; nb[idx].ctaText = e.target.value; setData({...data, banners: nb});
                      }} />
                    </div>
                    <div className="cms-form-group">
                      <label>CTA Link</label>
                      <input type="text" className="cms-input" value={b.ctaLink} onChange={e => {
                        const nb = [...data.banners]; nb[idx].ctaLink = e.target.value; setData({...data, banners: nb});
                      }} />
                    </div>
                  </div>
                </div>
              ))}
              <div className="cms-card cms-add-card" onClick={() => {
                setData({...data, banners: [...data.banners, { id: 'banner-'+Date.now(), image: '', title: 'New Banner', subtitle: '', ctaText: '', ctaLink: '' }]});
              }}>
                <span>+ Add Slide</span>
              </div>
            </div>
          </div>
        )}

        {/* SUCCESS STATS */}
        {activeTab === 'success' && (
          <div className="cms-section">
            <div className="cms-form-group mb-4" style={{maxWidth: 400}}>
              <label>Section Title</label>
              <input type="text" className="cms-input" value={data.successSection.title} onChange={e => setData({...data, successSection: {...data.successSection, title: e.target.value}})} />
            </div>
            <div className="cms-grid">
              {data.successSection.stats.map((s, idx) => (
                <div key={s.id} className="cms-card p-3">
                   <div className="cms-form-group">
                    <label>Number (e.g. 18+)</label>
                    <input type="text" className="cms-input" value={s.number} onChange={e => {
                      const ns = [...data.successSection.stats]; ns[idx].number = e.target.value; setData({...data, successSection: {...data.successSection, stats: ns}});
                    }} />
                  </div>
                  <div className="cms-form-group">
                    <label>Label</label>
                    <input type="text" className="cms-input" value={s.label} onChange={e => {
                      const ns = [...data.successSection.stats]; ns[idx].label = e.target.value; setData({...data, successSection: {...data.successSection, stats: ns}});
                    }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* STRIP BANNER */}
        {activeTab === 'strip' && (
          <div className="cms-section">
            <div className="cms-card p-4" style={{maxWidth: 600}}>
              <ImageUpload 
                src={data.stripBanner.image} 
                status={uploadStatus['strip-banner']}
                onUpload={(f) => handleUpload('strip-banner', f, (path) => setData({...data, stripBanner: {...data.stripBanner, image: path}}))}
              />
              <div className="cms-form-group mt-3">
                <label>CTA Text</label>
                <input type="text" className="cms-input" value={data.stripBanner.ctaText} onChange={e => setData({...data, stripBanner: {...data.stripBanner, ctaText: e.target.value}})} />
              </div>
              <div className="cms-form-group">
                <label>CTA Link</label>
                <input type="text" className="cms-input" value={data.stripBanner.ctaLink} onChange={e => setData({...data, stripBanner: {...data.stripBanner, ctaLink: e.target.value}})} />
              </div>
            </div>
          </div>
        )}

        {/* SECTION TITLES */}
        {activeTab === 'titles' && (
          <div className="cms-section">
            <h2 className="cms-section-title">Other Section Texts</h2>
            <div className="cms-card p-4 mb-4">
              <h5>Scoreboard Section</h5>
              <div className="cms-form-group mt-2">
                <label>Title</label>
                <input type="text" className="cms-input" value={data.scoreboardSection.title} onChange={e => setData({...data, scoreboardSection: {...data.scoreboardSection, title: e.target.value}})} />
              </div>
              <div className="cms-form-group">
                <label>Description</label>
                <textarea className="cms-input" value={data.scoreboardSection.description} onChange={e => setData({...data, scoreboardSection: {...data.scoreboardSection, description: e.target.value}})} />
              </div>
              <div className="cms-form-group">
                <label>CTA Text</label>
                <input type="text" className="cms-input" value={data.scoreboardSection.ctaText} onChange={e => setData({...data, scoreboardSection: {...data.scoreboardSection, ctaText: e.target.value}})} />
              </div>
            </div>

            <div className="cms-card p-4 mb-4">
              <h5>News Section</h5>
              <div className="cms-form-group mt-2">
                <label>Title</label>
                <input type="text" className="cms-input" value={data.newsSection.title} onChange={e => setData({...data, newsSection: {...data.newsSection, title: e.target.value}})} />
              </div>
            </div>
          </div>
        )}

        {/* MATCH HIGHLIGHTS */}
        {activeTab === 'highlights' && (
          <div className="cms-section">
            <h2 className="cms-section-title">Match Highlights</h2>
            <div className="cms-grid">
              {data.matchHighlights.images.map((img, idx) => (
                <div key={img.id} className="cms-card">
                  <div className="cms-card-header">
                    <h6>Image {idx + 1}</h6>
                    <button className="cms-btn-icon cms-btn-danger" onClick={() => {
                      const n = [...data.matchHighlights.images]; n.splice(idx, 1);
                      setData({...data, matchHighlights: {...data.matchHighlights, images: n}});
                    }}>✕</button>
                  </div>
                  <div className="cms-card-body">
                    <ImageUpload
                      src={img.image}
                      status={uploadStatus[`highlight-${img.id}`]}
                      onUpload={(f) => handleUpload(`highlight-${img.id}`, f, (path) => {
                        const n = [...data.matchHighlights.images]; n[idx].image = path;
                        setData({...data, matchHighlights: {...data.matchHighlights, images: n}});
                      })}
                    />
                  </div>
                </div>
              ))}
              <div className="cms-card cms-add-card" onClick={() => {
                const n = [...data.matchHighlights.images, { id: 'mh-'+Date.now(), image: '' }];
                setData({...data, matchHighlights: {...data.matchHighlights, images: n}});
              }}><span>+ Add Image</span></div>
            </div>
          </div>
        )}

        {/* LOCATIONS */}
        {activeTab === 'locations' && (() => {
          // Merge live API locations with CMS entries so we always show all org locations
          const cmsMap = new Map(
            data.featuredLocations.locations
              .filter(l => l.locationName)
              .map(l => [l.locationName.toLowerCase().trim(), l])
          );
          const featuredCount = data.featuredLocations.locations.filter(l => l.featured).length;

          // Build merged list: one entry per live location
          const merged = liveLocations.map(live => {
            const key = (live.locationName || live.cityName || '').toLowerCase().trim();
            const existing = cmsMap.get(key);
            return {
              id: existing?.id || 'loc-' + key.replace(/\W+/g, '-'),
              locationName: live.locationName || live.cityName || '',
              cityName: live.cityName,
              stateAbbr: live.stateAbbr,
              countyName: live.countyName,
              image: existing?.image || '',
              title: existing?.title || (live.locationName || live.cityName || ''),
              address: existing?.address || `${live.cityName}, ${live.stateAbbr}`,
              link: existing?.link || '/location-details',
              featured: existing?.featured ?? false,
            };
          });

          const updateMerged = (updated: typeof merged) => {
            setData({...data, featuredLocations: {...data.featuredLocations, locations: updated}});
          };

          return (
            <div className="cms-section">
              <h2 className="cms-section-title">Featured Locations</h2>
              <div className="cms-alert cms-alert-info">
                <span className="cms-alert-icon">ℹ</span>
                Toggle <strong>Show on Homepage</strong> for up to 4 locations. Upload a photo for each. All locations are pulled live from flagmagMVP.
              </div>

              <div style={{display:'flex', gap:16, alignItems:'center', marginBottom:24, flexWrap:'wrap'}}>
                <div className="cms-form-group mb-0" style={{maxWidth:360, flex:1}}>
                  <label>Section Title</label>
                  <input type="text" className="cms-input" value={data.featuredLocations.title}
                    onChange={e => setData({...data, featuredLocations: {...data.featuredLocations, title: e.target.value}})} />
                </div>
                <div style={{background: featuredCount > 4 ? '#fef2f2' : '#ecfdf5', color: featuredCount > 4 ? '#dc2626' : '#059669', padding:'8px 16px', borderRadius:8, fontWeight:600, fontSize:'0.9rem', border: `1px solid ${featuredCount > 4 ? '#fecaca' : '#a7f3d0'}`}}>
                  {featuredCount} / 4 featured
                </div>
              </div>

              {liveLocations.length === 0 && (
                <div className="cms-alert cms-alert-info"><span className="cms-alert-icon">⏳</span>Loading locations from flagmagMVP…</div>
              )}

              <div className="cms-locations-list">
                {merged.map((loc, idx) => (
                  <div key={loc.id} className={`cms-location-row ${loc.featured ? 'is-featured' : ''}`}>
                    <div className="cms-location-img">
                      <ImageUpload
                        src={loc.image}
                        status={uploadStatus[`location-${loc.id}`]}
                        onUpload={(f) => handleUpload(`location-${loc.id}`, f, (path) => {
                          const n = [...merged]; n[idx] = {...n[idx], image: path};
                          updateMerged(n);
                        })}
                      />
                    </div>
                    <div className="cms-location-info">
                      <div style={{fontWeight:700, fontSize:'1rem', marginBottom:4}}>{loc.locationName || loc.cityName}</div>
                      <div style={{color:'#64748b', fontSize:'0.85rem'}}>{loc.cityName}, {loc.countyName}, {loc.stateAbbr}</div>
                      <div className="cms-form-group mt-2 mb-0">
                        <label>Address label</label>
                        <input type="text" className="cms-input" value={loc.address} onChange={e => {
                          const n = [...merged]; n[idx] = {...n[idx], address: e.target.value};
                          updateMerged(n);
                        }} />
                      </div>
                    </div>
                    <div className="cms-location-toggle">
                      <label className="cms-toggle-label">
                        <input type="checkbox" checked={loc.featured} onChange={e => {
                          const n = [...merged]; n[idx] = {...n[idx], featured: e.target.checked};
                          updateMerged(n);
                        }} />
                        <span className="cms-toggle-track"></span>
                      </label>
                      <div style={{fontSize:'0.78rem', color: loc.featured ? '#059669' : '#94a3b8', fontWeight:600, marginTop:6}}>
                        {loc.featured ? 'On homepage' : 'Hidden'}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="cms-card p-4 mt-4" style={{maxWidth:400}}>
                <h5 style={{marginBottom:16}}>Section CTA Button</h5>
                <div className="cms-form-group">
                  <label>Button Text</label>
                  <input type="text" className="cms-input" value={data.featuredLocations.ctaText}
                    onChange={e => setData({...data, featuredLocations: {...data.featuredLocations, ctaText: e.target.value}})} />
                </div>
                <div className="cms-form-group">
                  <label>Button Link</label>
                  <input type="text" className="cms-input" value={data.featuredLocations.ctaLink}
                    onChange={e => setData({...data, featuredLocations: {...data.featuredLocations, ctaLink: e.target.value}})} />
                </div>
              </div>
            </div>
          );
        })()}

        {/* DIFFERENCE SECTION */}
        {activeTab === 'difference' && (
          <div className="cms-section">
            <h2 className="cms-section-title">The Difference We Deliver</h2>
            <div className="cms-grid">
              {data.differenceSection.items.map((item, idx) => (
                <div key={item.id} className="cms-card">
                  <div className="cms-card-header">
                    <h6>Item {idx + 1}</h6>
                    <button className="cms-btn-icon cms-btn-danger" onClick={() => {
                      const n = [...data.differenceSection.items]; n.splice(idx, 1);
                      setData({...data, differenceSection: {...data.differenceSection, items: n}});
                    }}>✕</button>
                  </div>
                  <div className="cms-card-body">
                    <ImageUpload
                      src={item.icon}
                      status={uploadStatus[`diff-${item.id}`]}
                      onUpload={(f) => handleUpload(`diff-${item.id}`, f, (path) => {
                        const n = [...data.differenceSection.items]; n[idx] = {...n[idx], icon: path};
                        setData({...data, differenceSection: {...data.differenceSection, items: n}});
                      })}
                    />
                    <div className="cms-form-group mt-3">
                      <label>Title</label>
                      <input type="text" className="cms-input" value={item.title} onChange={e => {
                        const n = [...data.differenceSection.items]; n[idx].title = e.target.value;
                        setData({...data, differenceSection: {...data.differenceSection, items: n}});
                      }} />
                    </div>
                    <div className="cms-form-group">
                      <label>Description</label>
                      <textarea className="cms-input" value={item.description} onChange={e => {
                        const n = [...data.differenceSection.items]; n[idx].description = e.target.value;
                        setData({...data, differenceSection: {...data.differenceSection, items: n}});
                      }} />
                    </div>
                  </div>
                </div>
              ))}
              <div className="cms-card cms-add-card" onClick={() => {
                const n = [...data.differenceSection.items, { id: 'diff-'+Date.now(), icon: '', title: 'New Item', description: '' }];
                setData({...data, differenceSection: {...data.differenceSection, items: n}});
              }}><span>+ Add Item</span></div>
            </div>
          </div>
        )}

        {/* SPONSORS */}
        {activeTab === 'sponsors' && (
          <div className="cms-section">
            <h2 className="cms-section-title">Sponsors</h2>
            <div className="cms-grid">
              {data.sponsorsSection.sponsors.map((s, idx) => (
                <div key={s.id} className="cms-card">
                  <div className="cms-card-header">
                    <h6>Sponsor {idx + 1}</h6>
                    <button className="cms-btn-icon cms-btn-danger" onClick={() => {
                      const n = [...data.sponsorsSection.sponsors]; n.splice(idx, 1);
                      setData({...data, sponsorsSection: {...data.sponsorsSection, sponsors: n}});
                    }}>✕</button>
                  </div>
                  <div className="cms-card-body">
                    <ImageUpload
                      src={s.image}
                      status={uploadStatus[`sponsor-${s.id}`]}
                      onUpload={(f) => handleUpload(`sponsor-${s.id}`, f, (path) => {
                        const n = [...data.sponsorsSection.sponsors]; n[idx].image = path;
                        setData({...data, sponsorsSection: {...data.sponsorsSection, sponsors: n}});
                      })}
                    />
                  </div>
                </div>
              ))}
              <div className="cms-card cms-add-card" onClick={() => {
                const n = [...data.sponsorsSection.sponsors, { id: 'sponsor-'+Date.now(), image: '' }];
                setData({...data, sponsorsSection: {...data.sponsorsSection, sponsors: n}});
              }}><span>+ Add Sponsor</span></div>
            </div>
          </div>
        )}

        {/* TESTIMONIALS */}
        {activeTab === 'testimonials' && (
          <div className="cms-section">
            <h2 className="cms-section-title">Player Testimonials</h2>
            <div className="cms-grid">
              {data.testimonialsSection.testimonials.map((t, idx) => (
                <div key={t.id} className="cms-card">
                  <div className="cms-card-header">
                    <h6>{t.authorName || `Testimonial ${idx + 1}`}</h6>
                    <button className="cms-btn-icon cms-btn-danger" onClick={() => {
                      const n = [...data.testimonialsSection.testimonials]; n.splice(idx, 1);
                      setData({...data, testimonialsSection: {...data.testimonialsSection, testimonials: n}});
                    }}>✕</button>
                  </div>
                  <div className="cms-card-body">
                    <ImageUpload
                      src={t.authorImage}
                      status={uploadStatus[`test-${t.id}`]}
                      onUpload={(f) => handleUpload(`test-${t.id}`, f, (path) => {
                        const n = [...data.testimonialsSection.testimonials]; n[idx] = {...n[idx], authorImage: path};
                        setData({...data, testimonialsSection: {...data.testimonialsSection, testimonials: n}});
                      })}
                    />
                    <div className="cms-form-group mt-3">
                      <label>Author Name</label>
                      <input type="text" className="cms-input" value={t.authorName} onChange={e => {
                        const n = [...data.testimonialsSection.testimonials]; n[idx].authorName = e.target.value;
                        setData({...data, testimonialsSection: {...data.testimonialsSection, testimonials: n}});
                      }} />
                    </div>
                    <div className="cms-form-group">
                      <label>Date</label>
                      <input type="text" className="cms-input" value={t.date} onChange={e => {
                        const n = [...data.testimonialsSection.testimonials]; n[idx].date = e.target.value;
                        setData({...data, testimonialsSection: {...data.testimonialsSection, testimonials: n}});
                      }} />
                    </div>
                    <div className="cms-form-group">
                      <label>Rating (1–5)</label>
                      <input type="number" min={1} max={5} className="cms-input" value={t.rating} onChange={e => {
                        const n = [...data.testimonialsSection.testimonials]; n[idx].rating = Number(e.target.value);
                        setData({...data, testimonialsSection: {...data.testimonialsSection, testimonials: n}});
                      }} />
                    </div>
                    <div className="cms-form-group">
                      <label>Quote</label>
                      <textarea className="cms-input" rows={3} value={t.text} onChange={e => {
                        const n = [...data.testimonialsSection.testimonials]; n[idx].text = e.target.value;
                        setData({...data, testimonialsSection: {...data.testimonialsSection, testimonials: n}});
                      }} />
                    </div>
                  </div>
                </div>
              ))}
              <div className="cms-card cms-add-card" onClick={() => {
                const n = [...data.testimonialsSection.testimonials, { id: 'test-'+Date.now(), rating: 5, text: '', authorImage: '', authorName: '', date: '' }];
                setData({...data, testimonialsSection: {...data.testimonialsSection, testimonials: n}});
              }}><span>+ Add Testimonial</span></div>
            </div>
          </div>
        )}

      </div>

      <style>{`
        .cms-page-loading { padding: 40px; color: #64748b; font-weight: 500; }
        .cms-page-header {
          display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 24px;
        }
        .cms-page-title { font-size: 1.75rem; font-weight: 700; color: #0f172a; margin: 0 0 8px; letter-spacing: -0.5px; }
        .cms-page-desc { color: #64748b; font-size: 0.95rem; margin: 0; }
        
        .cms-alert { display: flex; align-items: center; gap: 12px; padding: 16px; border-radius: 12px; margin-bottom: 24px; font-weight: 500; font-size: 0.95rem; }
        .cms-alert-icon { font-size: 1.2rem; }
        .cms-alert-success { background: #ecfdf5; color: #059669; border: 1px solid #a7f3d0; }
        .cms-alert-error { background: #fef2f2; color: #dc2626; border: 1px solid #fecaca; }
        .cms-alert-info { background: #eff6ff; color: #2563eb; border: 1px solid #bfdbfe; }

        .cms-tabs {
          display: flex; gap: 8px; border-bottom: 1px solid #e2e8f0; margin-bottom: 24px; flex-wrap: wrap;
        }
        .cms-tab-btn {
          padding: 10px 16px; background: transparent; border: none; border-bottom: 2px solid transparent;
          font-weight: 600; color: #64748b; cursor: pointer; transition: all 0.2s; margin-bottom: -1px;
        }
        .cms-tab-btn:hover { color: #334155; }
        .cms-tab-btn.active { color: #3b82f6; border-bottom-color: #3b82f6; }

        .cms-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(320px, 1fr)); gap: 24px; }
        .cms-card { background: #ffffff; border-radius: 16px; border: 1px solid #e2e8f0; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.05); overflow: hidden; }
        .cms-card-header { display: flex; justify-content: space-between; align-items: center; padding: 16px 20px; border-bottom: 1px solid #f1f5f9; background: #fafafa; }
        .cms-card-header h6 { margin: 0; font-weight: 600; }
        .cms-card-body { padding: 20px; }
        
        .cms-add-card { display: flex; align-items: center; justify-content: center; min-height: 200px; border: 2px dashed #cbd5e1; background: #f8fafc; cursor: pointer; color: #64748b; font-weight: 600; transition: all 0.2s; }
        .cms-add-card:hover { border-color: #3b82f6; color: #3b82f6; background: #eff6ff; }

        .cms-form-group { margin-bottom: 16px; }
        .cms-form-group label { display: block; margin-bottom: 6px; font-size: 0.85rem; font-weight: 600; color: #475569; }
        .cms-input { width: 100%; padding: 10px 14px; border: 1px solid #cbd5e1; border-radius: 8px; font-size: 0.95rem; outline: none; transition: all 0.2s; }
        .cms-input:focus { border-color: #3b82f6; box-shadow: 0 0 0 3px rgba(59,130,246,0.15); }

        .cms-btn { padding: 10px 18px; border-radius: 8px; font-weight: 600; font-size: 0.9rem; cursor: pointer; transition: all 0.2s; border: none; }
        .cms-btn-primary { background: #3b82f6; color: white; }
        .cms-btn-primary:hover:not(:disabled) { background: #2563eb; }
        .cms-btn-icon { width: 32px; height: 32px; border-radius: 6px; border: none; display: flex; align-items: center; justify-content: center; cursor: pointer; background: transparent; color: #94a3b8; }
        .cms-btn-icon:hover { background: #fee2e2; color: #ef4444; }
        .cms-section-title { font-size: 1.2rem; font-weight: 700; margin-bottom: 20px; }
        .mt-3 { margin-top: 16px; } .mb-4 { margin-bottom: 24px; } .p-3 { padding: 16px; } .p-4 { padding: 24px; }
        
        .cms-img-upload { border: 2px dashed #cbd5e1; border-radius: 8px; overflow: hidden; position: relative; cursor: pointer; background: #f8fafc; display: flex; align-items: center; justify-content: center; min-height: 120px; }
        .cms-img-upload img { max-width: 100%; max-height: 200px; object-fit: contain; }
        .cms-img-upload:hover { border-color: #3b82f6; }
        .cms-img-upload-overlay { position: absolute; inset: 0; background: rgba(0,0,0,0.5); display: flex; align-items: center; justify-content: center; color: white; font-weight: 600; opacity: 0; transition: opacity 0.2s; }
        .cms-img-upload:hover .cms-img-upload-overlay { opacity: 1; }

        /* Location list */
        .cms-locations-list { display: flex; flex-direction: column; gap: 12px; }
        .cms-location-row { display: grid; grid-template-columns: 140px 1fr auto; gap: 20px; align-items: center; background: #fff; border: 1px solid #e2e8f0; border-radius: 12px; padding: 16px; transition: border-color 0.2s; }
        .cms-location-row.is-featured { border-color: #059669; background: #f0fdf4; }
        .cms-location-img .cms-img-upload { min-height: 90px; }
        .cms-location-toggle { display: flex; flex-direction: column; align-items: center; gap: 4px; }
        .cms-toggle-label { display: flex; align-items: center; cursor: pointer; }
        .cms-toggle-label input { display: none; }
        .cms-toggle-track { width: 44px; height: 24px; background: #cbd5e1; border-radius: 12px; position: relative; transition: background 0.2s; }
        .cms-toggle-label input:checked + .cms-toggle-track { background: #059669; }
        .cms-toggle-track::after { content: ''; position: absolute; top: 3px; left: 3px; width: 18px; height: 18px; background: #fff; border-radius: 50%; transition: transform 0.2s; box-shadow: 0 1px 3px rgba(0,0,0,0.2); }
        .cms-toggle-label input:checked + .cms-toggle-track::after { transform: translateX(20px); }
      `}</style>
    </div>
  );
}

function ImageUpload({ src, status, onUpload }: { src: string, status?: string, onUpload: (f: File) => void }) {
  const ref = useRef<HTMLInputElement>(null);
  return (
    <>
      <div className="cms-img-upload" onClick={() => ref.current?.click()}>
        {src ? <img src={src} alt="Upload" /> : <span style={{color: '#94a3b8'}}>Click to upload</span>}
        <div className="cms-img-upload-overlay">Change Image</div>
      </div>
      {status === 'uploading' && <div style={{fontSize:'0.8rem', color:'#3b82f6', marginTop: 4}}>Uploading...</div>}
      <input type="file" ref={ref} style={{display:'none'}} accept="image/*" onChange={e => {
        if(e.target.files?.[0]) onUpload(e.target.files[0]);
      }} />
    </>
  );
}
