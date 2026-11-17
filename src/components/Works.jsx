import { useEffect, useMemo, useState } from "react";
import {
  AnimatePresence,
  motion,
  useMotionTemplate,
  useMotionValue,
} from "framer-motion";
import {
  ArrowRight,
  ArrowUpRight,
  Code2,
  FolderGit2,
  Layers,
  Smartphone,
  X,
} from "lucide-react";
import { styles } from "../styles";
import { github } from "../assets";
import { SectionWrapper } from "../hoc";
import { projects, projectsId } from "../constants";
import { fadeIn, textVariant } from "../utils/motion";
import { useLanguage } from "../context/LanguageContext";

const CATEGORY_ICONS = {
  web: Layers,
  backend: Code2,
  mobile: Smartphone,
};

const ProjectCard = ({ project, index, categoryLabel, t, onSelect }) => {
  const mouseX = useMotionValue(-200);
  const mouseY = useMotionValue(-200);

  const spotlight = useMotionTemplate`radial-gradient(320px circle at ${mouseX}px ${mouseY}px, rgba(56, 189, 248, 0.14), transparent 75%)`;

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  };

  const handleMouseLeave = () => {
    mouseX.set(-200);
    mouseY.set(-200);
  };

  const CategoryIcon = CATEGORY_ICONS[project.category] || Layers;
  const visibleTags = project.tags.slice(0, 4);
  const remainingTags = Math.max(0, project.tags.length - visibleTags.length);

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 24, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{
        duration: 0.45,
        delay: Math.min(index * 0.06, 0.3),
        ease: [0.22, 1, 0.36, 1],
      }}
      whileHover={{ y: -6 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="group relative h-full rounded-2xl p-[1px] bg-gradient-to-b from-sky-400/30 via-blue-500/15 to-white/5 hover:from-sky-400/70 hover:via-blue-500/40 transition-colors duration-300"
    >
      <div className="relative h-full rounded-[15px] bg-[#0b132b]/90 backdrop-blur-md overflow-hidden flex flex-col justify-between group-hover:shadow-[0_18px_42px_-12px_rgba(37,99,235,0.42)] transition-shadow duration-300">
        {/* Cursor-tracking blue spotlight */}
        <motion.div
          aria-hidden="true"
          style={{ background: spotlight }}
          className="pointer-events-none absolute inset-0 z-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        />

        {/* Framed 16:9 Screenshot Stage */}
        <div className="relative z-10 p-3.5 pb-0">
          <div className="relative aspect-video w-full overflow-hidden rounded-xl border border-white/10 bg-[#050816]">
            <button
              type="button"
              onClick={() => onSelect(project)}
              aria-label={`${project.name} - ${t.works.viewDetails}`}
              className="block w-full h-full text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 cursor-pointer"
            >
              <img
                src={project.image}
                alt={project.name}
                loading="lazy"
                className="w-full h-full object-cover object-top transition-transform duration-500 ease-out group-hover:scale-[1.05]"
              />
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#050816]/80 via-[#050816]/15 to-transparent"
              />
            </button>

            {/* Category Pill (Top-Left) */}
            <span className="pointer-events-none absolute top-2.5 left-2.5 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#050816]/80 backdrop-blur-md border border-white/15 text-[11px] font-medium text-sky-300">
              <CategoryIcon className="w-3 h-3 text-sky-400" />
              {categoryLabel}
            </span>

            {/* Quick GitHub Link (Top-Right, sibling not nested) */}
            <a
              href={project.source_code_link}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${project.name} ${t.works.openRepo}`}
              className="absolute top-2.5 right-2.5 w-9 h-9 rounded-full bg-[#050816]/85 backdrop-blur-md border border-white/15 hover:border-sky-400/60 hover:bg-blue-600/80 flex items-center justify-center transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400"
            >
              <img
                src={github}
                alt="GitHub"
                className="w-4 h-4 object-contain"
              />
            </a>
          </div>
        </div>

        {/* Content Body */}
        <div className="relative z-10 p-5 flex flex-col flex-1 justify-between gap-4">
          <div>
            <button
              type="button"
              onClick={() => onSelect(project)}
              className="text-left w-full focus:outline-none focus-visible:text-sky-300 cursor-pointer"
            >
              <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight group-hover:text-sky-300 transition-colors">
                {project.name}
              </h3>
            </button>
            <p className="mt-2 text-xs sm:text-[13px] text-slate-300/85 leading-relaxed line-clamp-3">
              {project.description}
            </p>
          </div>

          {/* Tech Stack Pills & Action Footer */}
          <div className="flex flex-col gap-4">
            <div className="flex flex-wrap gap-1.5">
              {visibleTags.map((tag) => (
                <span
                  key={`${project.name}-${tag.name}`}
                  className="px-2.5 py-0.5 rounded-full bg-blue-500/10 border border-blue-400/20 text-[11px] font-medium text-sky-300/95"
                >
                  {tag.name}
                </span>
              ))}
              {remainingTags > 0 && (
                <span className="px-2 py-0.5 rounded-full bg-white/[0.04] border border-white/10 text-[11px] font-medium text-slate-400">
                  +{remainingTags}
                </span>
              )}
            </div>

            <div className="pt-3 border-t border-white/10 flex items-center justify-between gap-3">
              <button
                type="button"
                onClick={() => onSelect(project)}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-sky-400 hover:text-sky-300 transition-colors cursor-pointer focus:outline-none focus-visible:underline"
              >
                <span>{t.works.viewDetails}</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform duration-200" />
              </button>

              <a
                href={project.source_code_link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-xs font-medium text-slate-400 hover:text-white transition-colors"
              >
                <span>{t.works.sourceCode}</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </motion.article>
  );
};

const ProjectModal = ({ project, categoryLabel, t, onClose }) => {
  useEffect(() => {
    if (!project) return;
    const onKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [project, onClose]);

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          key="project-modal-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={onClose}
          role="dialog"
          aria-modal="true"
          aria-labelledby="project-modal-title"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-[#050816]/80 backdrop-blur-md"
        >
          <motion.div
            key="project-modal-panel"
            initial={{ opacity: 0, scale: 0.95, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 12 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl p-[1px] bg-gradient-to-b from-sky-400/50 via-blue-500/25 to-white/10 shadow-[0_28px_80px_-15px_rgba(37,99,235,0.55)]"
          >
            <div className="rounded-[23px] bg-[#0b132b] p-5 sm:p-7">
              {/* Top Bar */}
              <div className="flex items-start justify-between gap-4 mb-4">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/15 border border-sky-400/30 text-xs font-semibold text-sky-300">
                  <FolderGit2 className="w-3.5 h-3.5 text-sky-400" />
                  {categoryLabel}
                </span>

                <button
                  type="button"
                  onClick={onClose}
                  aria-label={t.works.close}
                  className="w-9 h-9 rounded-full bg-white/[0.06] hover:bg-white/15 border border-white/10 text-slate-300 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Full Screenshot Preview */}
              <div className="aspect-video w-full overflow-hidden rounded-2xl border border-white/10 bg-[#050816]">
                <img
                  src={project.image}
                  alt={project.name}
                  className="w-full h-full object-cover object-top"
                />
              </div>

              {/* Title & Description */}
              <div className="mt-5">
                <h3
                  id="project-modal-title"
                  className="text-xl sm:text-2xl font-bold text-white tracking-tight"
                >
                  {project.name}
                </h3>
                <p className="mt-3 text-sm sm:text-[15px] text-slate-300/90 leading-relaxed">
                  {project.description}
                </p>
              </div>

              {/* Full Tech Stack */}
              <div className="mt-5">
                <p className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2.5">
                  {t.works.techStack}
                </p>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={`modal-${project.name}-${tag.name}`}
                      className="px-3 py-1 rounded-full bg-blue-500/10 border border-blue-400/25 text-xs font-medium text-sky-300"
                    >
                      {tag.name}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-7 pt-5 border-t border-white/10 flex flex-wrap items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2.5 rounded-xl border border-white/15 bg-white/[0.04] hover:bg-white/10 text-xs sm:text-sm font-medium text-slate-200 transition-colors cursor-pointer"
                >
                  {t.works.close}
                </button>
                <a
                  href={project.source_code_link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-sky-500 hover:from-blue-500 hover:to-sky-400 text-xs sm:text-sm font-semibold text-white shadow-[0_8px_24px_-6px_rgba(37,99,235,0.65)] transition-all"
                >
                  <img
                    src={github}
                    alt="GitHub"
                    className="w-4 h-4 object-contain"
                  />
                  <span>{t.works.openRepo}</span>
                  <ArrowUpRight className="w-4 h-4" />
                </a>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const Works = () => {
  const { lang, t } = useLanguage();
  const activeProjects = lang === "id" ? projectsId : projects;
  const [activeFilter, setActiveFilter] = useState("all");
  const [selectedProjectName, setSelectedProjectName] = useState(null);

  const selectedProject = useMemo(
    () =>
      selectedProjectName
        ? activeProjects.find((p) => p.name === selectedProjectName) || null
        : null,
    [activeProjects, selectedProjectName]
  );

  const filterTabs = useMemo(
    () => [
      { id: "all", label: t.works.filters.all, count: activeProjects.length },
      {
        id: "web",
        label: t.works.filters.web,
        count: activeProjects.filter((p) => p.category === "web").length,
      },
      {
        id: "backendMobile",
        label: t.works.filters.backendMobile,
        count: activeProjects.filter(
          (p) => p.category === "backend" || p.category === "mobile"
        ).length,
      },
    ],
    [activeProjects, t]
  );

  const filteredProjects = useMemo(() => {
    if (activeFilter === "all") return activeProjects;
    if (activeFilter === "web") {
      return activeProjects.filter((p) => p.category === "web");
    }
    return activeProjects.filter(
      (p) => p.category === "backend" || p.category === "mobile"
    );
  }, [activeProjects, activeFilter]);

  const getCategoryLabel = (category) =>
    t.works.categories[category] || t.works.categories.web;

  return (
    <>
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
        <div className="max-w-2xl">
          <motion.div variants={textVariant()}>
            <p className={styles.sectionSubText}>{t.works.sub}</p>
            <h2 className={styles.sectionHeadText}>{t.works.head}</h2>
          </motion.div>

          <motion.p
            variants={fadeIn("", "", 0.1, 0.8)}
            className="mt-4 text-slate-300/90 text-base sm:text-[17px] leading-[30px]"
          >
            {t.works.body}
          </motion.p>
        </div>

        {/* Interactive Category Filter Tabs */}
        <div
          role="tablist"
          aria-label="Project categories"
          className="inline-flex flex-wrap items-center gap-1 p-1.5 rounded-full bg-[#0b132b]/85 border border-white/10 backdrop-blur-md self-start lg:self-end"
        >
          {filterTabs.map((tab) => {
            const isActive = activeFilter === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => setActiveFilter(tab.id)}
                className={`relative px-3.5 sm:px-4 py-1.5 rounded-full text-xs sm:text-[13px] font-medium transition-colors duration-200 cursor-pointer flex items-center gap-1.5 ${
                  isActive ? "text-white" : "text-slate-400 hover:text-slate-200"
                }`}
              >
                {isActive && (
                  <motion.span
                    layoutId="activeProjectFilterPill"
                    transition={{ type: "spring", stiffness: 320, damping: 28 }}
                    className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-600 to-sky-500 shadow-[0_0_18px_rgba(37,99,235,0.5)]"
                  />
                )}
                <span className="relative z-10">{tab.label}</span>
                <span
                  className={`relative z-10 text-[10px] px-1.5 py-0.5 rounded-full ${
                    isActive
                      ? "bg-white/20 text-white"
                      : "bg-white/[0.06] text-slate-400"
                  }`}
                >
                  {tab.count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Responsive Project Showcase Grid */}
      <motion.div
        layout
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12"
      >
        <AnimatePresence mode="popLayout">
          {filteredProjects.map((project, index) => (
            <ProjectCard
              key={project.name}
              project={project}
              index={index}
              categoryLabel={getCategoryLabel(project.category)}
              t={t}
              onSelect={(proj) => setSelectedProjectName(proj.name)}
            />
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Project Detail Modal */}
      <ProjectModal
        project={selectedProject}
        categoryLabel={
          selectedProject ? getCategoryLabel(selectedProject.category) : ""
        }
        t={t}
        onClose={() => setSelectedProjectName(null)}
      />
    </>
  );
};

export default SectionWrapper(Works, "projects");
