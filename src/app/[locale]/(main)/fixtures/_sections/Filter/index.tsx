"use client";

import GradientIcon from "@/components/ui/GradientIcon";
import { League } from "@/utils/types/Fixtures/Filter";
import { AnimatePresence, motion } from "framer-motion";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState, useMemo, useRef, useEffect } from "react";
import { FaFilter } from "react-icons/fa";
import { IoChevronDown } from "react-icons/io5";

export default function LeagueFilter({
  activeLeague,
  leagues,
}: {
  activeLeague: string;
  leagues: League[];
}) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const t = useTranslations("pages.main.fixtures.filter");

  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Filter leagues based on search term
  const filteredLeagues = useMemo(() => {
    return leagues.filter((league) =>
      `${league.country} - ${league.name}`
        .toLowerCase()
        .includes(searchTerm.toLowerCase()),
    );
  }, [leagues, searchTerm]);

  // Get current league display name
  const currentLeague = leagues.find((l) => String(l.id) === activeLeague);
  const displayName = currentLeague
    ? `${currentLeague.country} - ${currentLeague.name}`
    : t("all_leagues");

  const handleSelect = (id: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (id === "all") {
      params.delete("league_id");
    } else {
      params.set("league_id", id);
    }
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
    setIsOpen(false);
    setSearchTerm("");
  };

  return (
    <div
      className="px-4 mt-10 flex md:ms-4 justify-start relative z-20"
      ref={dropdownRef}
    >
      <div className="w-full max-w-md relative">
        {/* Main Button (Closed State) */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-full bg-[#1a212d] text-white py-4 px-6 rounded-xl flex items-center justify-between border border-gray-700/50 transition-all hover:bg-[#232b3a] cursor-pointer"
        >
          <IoChevronDown
            className={`text-[#ad00fc] text-2xl transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
          />
          <span className="font-bold text-lg md:text-xl truncate px-4">
            {displayName}
          </span>
          <GradientIcon icon={FaFilter} size={30} />
          {/* <FaFilter className="text-[#ad00fc] text-3xl" /> */}
        </button>
        <AnimatePresence>
          {/* Dropdown Menu (Open State) */}
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: "-100%" }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: "-100%" }}
              className="absolute top-full left-0 w-full mt-2 bg-white rounded-xl shadow-2xl overflow-hidden border border-gray-200 animate-in fade-in slide-in-from-top-2 "
            >
              {/* Search Input */}
              <div className="p-3 border-b border-gray-100">
                <input
                  type="text"
                  placeholder={t("placeholder")}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full p-3 bg-gray-50 rounded-lg border border-gray-200 text-right focus:outline-none focus:ring-2 focus:ring-[#ad00fc]/20 text-black"
                />
              </div>

              {/* Leagues List */}
              <div className="max-h-[350px] overflow-y-auto custom-scrollbar">
                {/* All Matches Option */}
                <button
                  onClick={() => handleSelect("all")}
                  className={`w-full flex items-center  p-4 hover:bg-gray-50 transition-colors border-b border-gray-50 cursor-pointer ${activeLeague === "all" ? "bg-[#f3e8ff]" : ""}`}
                >
                  <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 font-bold">
                    A
                  </div>
                  <span className={`font-bold px-4`}>{t("all_leagues")}</span>
                </button>

                {/* API Leagues */}
                {filteredLeagues.map((league) => (
                  <button
                    key={league.id}
                    onClick={() => handleSelect(String(league.id))}
                    className={`w-full flex items-center p-4 hover:bg-gray-50 transition-colors border-b border-gray-50 cursor-pointer ${activeLeague === String(league.id) ? "bg-[#f3e8ff]" : ""}`}
                  >
                    <div className="relative w-10 h-10">
                      <Image
                        src={league.logo}
                        alt={league.name}
                        fill
                        className="object-contain"
                      />
                    </div>
                    <span
                      className={`font-bold px-4 ${activeLeague === String(league.id) ? "text-[#ad00fc]" : "text-black"}`}
                    >
                      {league.country} - {league.name}
                    </span>
                  </button>
                ))}

                {filteredLeagues.length === 0 && searchTerm && (
                  <div className="p-8 text-center text-gray-400">
                    {t("no_found")}
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
