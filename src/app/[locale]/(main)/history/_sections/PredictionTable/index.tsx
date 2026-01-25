import { useTranslations } from "next-intl";
import { CiCalendarDate, CiDollar, CiStar } from "react-icons/ci";
import { FaLightbulb } from "react-icons/fa";
import { GiClown } from "react-icons/gi";
import {
  IoDocumentOutline,
  IoFootballOutline,
  IoTimeOutline,
} from "react-icons/io5";

export default function HistoryPredictionTable({ data }: { data: any[] }) {
  const t = useTranslations("pages.main.history.tables");
  return (
    <>
      <div className="!px-0 !pb-0 overflow-hidden flex flex-col gap-4 min-h-52 -mx-4">
        <div className="max-h-[100vh] overflow-y-auto overflow-x-auto">
          <table className="w-full">
            <thead className="text-nowrap">
              <tr className="bg-[#FFA4EB]">
                <th className="text-center p-4">
                  <div className="flex items-center justify-center gap-1 ">
                    <span>
                      <CiCalendarDate size={24} />
                    </span>
                    <span>{t("date")}</span>
                  </div>
                </th>
                <th className="text-center p-4">
                  <div className="flex items-center justify-center gap-1 ">
                    <span>
                      <IoFootballOutline size={24} />
                    </span>
                    <span>{t("match")}</span>
                  </div>
                </th>
                <th className="text-center p-4">
                  <div className="flex items-center justify-center gap-1 ">
                    <span>
                      <FaLightbulb size={24} />
                    </span>
                    <span>{t("prediction")}</span>
                  </div>
                </th>
                <th className="text-center p-4">
                  <div className="flex items-center justify-center gap-1 ">
                    <span>
                      <IoDocumentOutline size={24} />
                    </span>
                    <span>{t("result")}</span>
                  </div>
                </th>
                <th className="text-center p-4">
                  <div className="flex items-center justify-center gap-1 ">
                    <span>
                      <CiStar size={24} />
                    </span>
                    <span>{t("points")}</span>
                  </div>
                </th>
                <th className="text-center p-4">
                  <div className="flex items-center justify-center gap-1 ">
                    <span>
                      <GiClown size={24} />
                    </span>
                    <span>{t("use_joker")}</span>
                  </div>
                </th>
                <th className="text-center p-4">
                  <div className="flex items-center justify-center gap-1 ">
                    <span>
                      <CiDollar size={24} />
                    </span>
                    <span>{t("coins_spent")}</span>
                  </div>
                </th>
                <th className="text-center p-4">
                  <div className="flex items-center justify-center gap-1 ">
                    <span>
                      <IoTimeOutline size={24} />
                    </span>
                    <span>{t("time")}</span>
                  </div>
                </th>
              </tr>
            </thead>
            <tbody>
              {data.length > 0 ? (
                data.map((col, index) => (
                  <tr
                    key={index}
                    className="border-b border-white text-white last:border-0 font-medium text-center"
                  >
                    <td className="p-4">{col.date}</td>
                    <td className="p-4 ">{col?.match}</td>
                    <td className="p-4 ">{col?.prediction}</td>

                    <td
                      className={`p-4 ${
                        col.result_status === "pending"
                          ? "text-[#EFA90C]"
                          : col.result_status === "victory"
                            ? "text-statusSuccess"
                            : "text-neutral10"
                      }`}
                    >
                      {col?.result}
                    </td>
                    <td className="p-4 ">+{col?.points}</td>
                    <td className="p-4 ">{col?.use_joker_str}</td>
                    <td className="p-4 ">-{col?.coins_spent}</td>
                    <td className="p-4 ">{col?.time}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={8} className="h-24 text-center">
                    <span className="text-sm font-medium text-gray-500">
                      {t("no_data_prediction")}
                    </span>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
