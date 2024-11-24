import { useState } from "react";
import CrossSVG from "../svg/CrossSVG";
import { AnimatePresence, motion } from "framer-motion";

type PropsWithChildren = {
    isWarning?: boolean,
    hiddedProp?: boolean,
    quitHandler?: () => void
    children: React.ReactNode
}

export function Banner({ isWarning, hiddedProp, quitHandler, children }: PropsWithChildren) {

    const [hidded, setHidded] = useState<boolean>(hiddedProp ?? false);
    
    const onClick = () => {
        setHidded(true);
        quitHandler?.();
    }

    return (
        <AnimatePresence>
            { 
            !hidded && <motion.div className={`text-white text-sm pl-4 py-1 z-50 flex items-center justify-center absolute top-0 ${isWarning ? "bg-red-700" : "bg-neutral-900"}`} 
            initial = {{ opacity: 0 }} 
            animate={{ opacity: 1 }}
            exit = {{ opacity: 0 }}
            > 
                <span className="text-center">{children}</span>
                <button className="text-xl px-4" onClick={() => onClick()}><CrossSVG/></button>
            </motion.div>
            }
        </AnimatePresence>
    );
}