import { useState } from 'react';

interface Project {
  id: number;
  title: string;
  category: string;
  location: string;
  image?: string;
}

interface Props {
  projects: Project[];
}

export default function GalleryGrid({ projects }: Props) {
  const categories = ['All', ...Array.from(new Set(projects.map(p => p.category)))];
  const [active, setActive] = useState('All');

  const filtered = active === 'All' ? projects : projects.filter(p => p.category === active);

  return (
    <div>
      <div className="flex flex-wrap gap-2 justify-center mb-10">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActive(cat)}
            className={`px-5 py-2.5 rounded-full text-[15px] font-medium transition-all ${
              active === cat
                ? 'bg-[#E87C3E] text-white'
                : 'bg-white/10 text-white/60 hover:bg-white/20'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((project) => (
          <div key={project.id} className="group rounded-2xl overflow-hidden bg-white/5 border border-white/10 hover:bg-white/10 hover:-translate-y-1 transition-all duration-300">
            <div className="aspect-[4/3] relative overflow-hidden">
              {project.image ? (
                <img src={project.image} alt={project.title} loading="lazy" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              ) : (
                <div className="w-full h-full bg-white/5" />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-5">
                <div>
                  <p className="text-white font-bold text-[17px]" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>{project.title}</p>
                  <p className="text-white/70 text-[13px]">{project.location}</p>
                </div>
              </div>
            </div>
            <div className="p-5">
              <h3 className="font-semibold text-[17px] text-white" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>{project.title}</h3>
              <p className="text-[13px] text-white/40 mt-1">{project.category} &middot; {project.location}</p>
            </div>
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="text-center text-white/40 py-12">No projects in this category yet.</p>
      )}
    </div>
  );
}
