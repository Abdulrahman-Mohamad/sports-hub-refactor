import * as motion from "motion/react-client";

export default function TermsSection({ data }: { data: any }) {
  return (
    <>
      <div className="flex flex-col gap-8 text-white my-20 px-8">
        {data?.map((term: any, i: number) => {
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: "-100%" }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4 }}
              viewport={{ once: true }}
            >
              <p dangerouslySetInnerHTML={{ __html: term.content }} />
            </motion.div>
          );
        })}
      </div>
    </>
  );
}
