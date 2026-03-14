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
                ? 'bg-[#1E3D5F] text-white'
                : 'bg-[#F7F5F0] text-[#3D4F5F] hover:bg-[#E5E0D8]'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((project) => (
          <div key={project.id} className="group rounded-2xl overflow-hidden bg-white shadow-[0_1px_3px_rgba(0,0,0,0.05)] hover:shadow-[0_20px_40px_rgba(0,0,0,0.08)] hover:-translate-y-1 transition-all duration-300">
            <div className="aspect-[4/3] relative overflow-hidden">
              {project.image ? (
                <img src={project.image} alt={project.title} loading="lazy" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              ) : (
                <div className="w-full h-full bg-[#E5E0D8]" />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-5">
                <div>
                  <p className="text-white font-bold text-[17px]" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>{project.title}</p>
                  <p className="text-white/70 text-[13px]">{project.location}</p>
                </div>
              </div>
            </div>
            <div className="p-5">
              <h3 className="font-semibold text-[17px] text-[#1B2B3D]" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>{project.title}</h3>
              <p className="text-[13px] text-[#6B7C8D] mt-1">{project.category} &middot; {project.location}</p>
            </div>
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="text-center text-[#6B7C8D] py-12">No projects in this category yet.</p>
      )}
    </div>
  );
}
