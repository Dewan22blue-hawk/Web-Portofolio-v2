import React from "react";
import { X, Building2, Hash, Calendar, ExternalLink } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";

const ModalBox = ({ modalData }) => {
  const { t } = useLanguage();

  return (
    <dialog
      id="my_modal"
      className="modal bg-black/70 backdrop-blur-sm p-3 sm:p-4"
    >
      <div className="modal-box w-full max-w-2xl rounded-2xl border border-white/15 bg-[#0b132b]/95 text-white shadow-[0_24px_70px_-15px_rgba(0,0,0,0.9),0_0_30px_-10px_rgba(37,99,235,0.4)] p-5 sm:p-7">
        {/* Modal Header */}
        <div className="flex items-start justify-between gap-4 border-b border-white/10 pb-4">
          <div className="flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-xl bg-blue-500/15 border border-sky-400/30 flex items-center justify-center text-sky-400 text-2xl shrink-0">
              <i className={modalData?.icon} />
            </div>
            <div>
              <h3 className="text-lg sm:text-2xl font-bold tracking-tight text-white">
                {modalData?.name}
              </h3>
              <p className="text-xs text-sky-400 font-medium mt-0.5">
                {modalData?.items?.length ?? 0} {t.certificate.countSuffix}
              </p>
            </div>
          </div>

          <form method="dialog">
            <button
              aria-label={t.certificate.close}
              className="w-9 h-9 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center text-slate-400 hover:text-white transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </form>
        </div>

        {/* Scrollable Certificates List */}
        <ul className="mt-5 max-h-[58vh] overflow-y-auto pr-1 space-y-3">
          {modalData?.items?.map((item, idx) => (
            <li
              key={`${item.name}-${idx}`}
              className="rounded-xl border border-white/10 bg-slate-900/75 hover:border-sky-400/35 p-4 transition-colors"
            >
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                <div className="space-y-2 flex-1">
                  <h4 className="text-sm sm:text-base font-semibold text-white leading-snug">
                    {item.name}
                  </h4>

                  <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs text-slate-400">
                    {item.publisher && (
                      <span className="inline-flex items-center gap-1.5 text-sky-300 font-medium">
                        <Building2 className="w-3.5 h-3.5 text-sky-400 shrink-0" />
                        {item.publisher}
                      </span>
                    )}

                    {item.credential && (
                      <span className="inline-flex items-center gap-1.5">
                        <Hash className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                        {item.credential}
                      </span>
                    )}

                    {item.year && (
                      <span className="inline-flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                        {item.year}
                      </span>
                    )}
                  </div>
                </div>

                {item?.ref && (
                  <a
                    href={item.ref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-600/20 hover:bg-blue-600/35 border border-sky-400/30 text-xs font-medium text-sky-300 hover:text-white transition-all shrink-0 self-start"
                  >
                    <span>{t.certificate.verify}</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                )}
              </div>
            </li>
          ))}
        </ul>

        {/* Footer Action */}
        <div className="modal-action mt-5 pt-4 border-t border-white/10">
          <form method="dialog">
            <button className="px-5 py-2 rounded-xl bg-white/10 hover:bg-white/15 border border-white/10 text-sm font-medium text-white transition-colors">
              {t.certificate.close}
            </button>
          </form>
        </div>
      </div>

      {/* Click outside to close */}
      <form method="dialog" className="modal-backdrop">
        <button aria-label={t.certificate.close}>close</button>
      </form>
    </dialog>
  );
};

export default ModalBox;
