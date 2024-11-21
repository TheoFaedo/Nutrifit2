import { useState } from "react";
import CrossSVG from "../svg/CrossSVG";
import { AnimatePresence, motion } from "framer-motion";

type PropsWithChildren = {
    isWarning?: boolean,
    children: React.ReactNode
}

export function Banner({ isWarning, children }: PropsWithChildren) {

    const [hidded, setHidded] = useState(false);

    return (
        <AnimatePresence>
            { 
            !hidded && <motion.div className={`text-white text-sm pl-4 py-1 flex items-center justify-center ${isWarning ? "bg-red-600" : "bg-neutral-900"}`} 
            initial = {{ opacity: 0 }} 
            animate={{ opacity: 1 }}
            exit = {{ opacity: 0 }}
            > 
                <span className="text-justify">{children}</span>
                <button className="text-xl px-4" onClick={() => setHidded(true)}><CrossSVG/></button>
            </motion.div>
            }
        </AnimatePresence>
    );
}