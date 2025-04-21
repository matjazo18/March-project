import { motion, useScroll } from "framer-motion";

export default function Animation() {
  const ContainerVariants = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.25 } },
  };
  const { scrollYProgress, completionProgress } = useScroll();

  const gridVairiants = { hidden: { opacity: 0 }, show: { opacity: 1 } };
  const svgIcons = {
    hidden: { opacity: 0, pathLength: 0, fill: "rgba(252,211,77,0)" },
    visible: { opacity: 1, pathLength: 1, fill: "rgba(252,211,77,1)" },
  };
  return (
    <div className="flex flex-col gap-10 overflow-x-hidden">
      <motion.section
        variants={ContainerVariants}
        initial="hidden"
        animate="show"
        className="grid grid-cols-3 p-10 gap-10"
      >
        <motion.div
          variants={gridVairiants}
          className="bg-slate-800 aspect-square rounded-lg justify-center flex items-center gap-10"
        >
          <div className=" flex space-x-4">
            <motion.div
              className="text-rose-400 text-7xl font-extrabold rounded-full"
              initial={{ opacity: 0, x: -100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, ease: "easeIn", delay: 0.5 }}
            >
              L
            </motion.div>
            <motion.div
              className="text-rose-400 text-7xl font-extrabold rounded-full"
              initial={{ opacity: 0, y: -100 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: "linear", delay: 0.5 }}
            >
              O
            </motion.div>
            <motion.div
              className="text-rose-400 text-7xl font-extrabold rounded-full"
              initial={{ opacity: 0, y: 100 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: "easeInOut", delay: 0.5 }}
            >
              V
            </motion.div>
            <motion.div
              className="text-rose-400 text-7xl font-extrabold rounded-full"
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, ease: "easeOut", delay: 0.5 }}
            >
              E
            </motion.div>
          </div>
        </motion.div>
        <motion.div
          variants={gridVairiants}
          className="bg-slate-800 aspect-square rounded-lg justify-center flex items-center gap-10"
        >
          <motion.div
            className="w-1/3 h-1/3 shadow-md bg-rose-400 "
            animate={{
              opacity: 1,
              scale: [1, 2, 2, 1],
              rotate: [0, 90, 90, 0],
              borderRadius: ["10%", "10%", "50%", "10%"],
            }}
            transition={{
              duration: 5,
              ease: "easeInOut",

              repeat: Infinity,
              repeatDelay: 1,
            }}
          ></motion.div>
        </motion.div>{" "}
        <motion.div
          variants={gridVairiants}
          className="bg-slate-800 aspect-square rounded-lg justify-center flex items-center gap-10"
        >
          <motion.div
            className="w-1/3 h-1/3 shadow-md bg-orange-400"
            drag
            dragConstraints={{ top: -100, left: -100, right: 100, bottom: 100 }}
            dragTransition={{ bounceStiffness: 600, bounceDamping: 10 }}
          ></motion.div>
        </motion.div>
        <motion.div
          variants={gridVairiants}
          className="bg-slate-800 aspect-square rounded-lg justify-center flex items-center gap-10"
        >
          <motion.div className="w-40 aspect-square bg-green-100 rounded-xl">
            <motion.div
              className="w-full bg-green-500 h-full rounded-xl origin-bottom"
              style={{ scaleY: scrollYProgress }}
            ></motion.div>
          </motion.div>
        </motion.div>
        <motion.div
          variants={gridVairiants}
          className="bg-slate-800 aspect-square rounded-lg justify-center flex items-center gap-10"
        ></motion.div>{" "}
        <motion.div
          variants={gridVairiants}
          className="bg-slate-800 aspect-square rounded-lg justify-center flex items-center gap-10"
        >
          <motion.svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            className="w-1/2 stroke-amber-500 stroke-[0.5]"
          >
            <motion.path
              d="m3.75 13.5 10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75Z"
              variants={svgIcons}
              initial="hidden"
              animate="visible"
              transition={{
                default: {
                  duration: 2,
                  ease: "easeInOut",
                  delay: 1,
                  repeat: Infinity,
                  repeatType: "reverse",
                  repeatDelay: 1,
                },
                fill: {
                  duration: 2,
                  ease: "easeIn",
                  delay: 2,
                  repeat: Infinity,
                  repeatType: "reverse",
                  repeatDelay: 1,
                },
              }}
            />
          </motion.svg>
        </motion.div>
      </motion.section>
    </div>
  );
}
