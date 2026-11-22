"use client";

import { useState } from "react";

export type Job = { id: string; company: string; role: string; period: string; place: string; points: string[]; link?: { href: string; label: string } };

/** Vertical company tabs (horizontal on small screens), keyboard accessible. */
export function ExperienceTabs({ jobs, label }: { jobs: Job[]; label: string }) {
  const [active, setActive] = useState(0);
  const job = jobs[active];
  const focusTab = (index: number) => {
    const next = (index + jobs.length) % jobs.length;
    setActive(next);
    document.getElementById(`job-tab-${jobs[next].id}`)?.focus();
  };
  return <div className="jobs">
    <div className="jobs__tabs" role="tablist" aria-label={label} aria-orientation="vertical"
      onKeyDown={event => {
        if (["ArrowDown", "ArrowRight"].includes(event.key)) { event.preventDefault(); focusTab(active + 1); }
        if (["ArrowUp", "ArrowLeft"].includes(event.key)) { event.preventDefault(); focusTab(active - 1); }
      }}>
      {jobs.map((item, index) => <button key={item.id} id={`job-tab-${item.id}`} type="button" role="tab" aria-selected={index === active} aria-controls="job-panel" tabIndex={index === active ? 0 : -1} onClick={() => setActive(index)}>{item.company}</button>)}
    </div>
    <div id="job-panel" role="tabpanel" aria-labelledby={`job-tab-${job.id}`} className="jobs__panel" key={job.id}>
      <h3>{job.role} <span>@ {job.company}</span></h3>
      <p className="jobs__meta">{job.period} · {job.place}</p>
      <ul>{job.points.map(point => <li key={point}>{point}</li>)}</ul>
      {job.link && <a className="link link--accent" href={job.link.href}>{job.link.label} <span className="arrow" aria-hidden="true">→</span></a>}
    </div>
  </div>;
}
