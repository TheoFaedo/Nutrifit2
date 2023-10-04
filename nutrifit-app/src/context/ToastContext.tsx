import { ComponentProps, PropsWithChildren, createContext, useCallback, useContext, useRef, useState } from "react"
import Toast from "../components/Toast";
import { AnimatePresence, motion } from "framer-motion";

type ToastContextType = {
    pushToastRef: {current: Function},
}

type Params = ComponentProps<typeof Toast> & { duration?: number};
type ToastItem = ComponentProps<typeof Toast> & { id: number};

const defaultPush = (toast: Params) => {};

const defaultValue = {
    pushToastRef: {current: (toast: Params) => {}}
}

const ToastContext = createContext<ToastContextType>(defaultValue);

export function ToastContextProvider ({children} : PropsWithChildren) {
    const pushToastRef = useRef(defaultPush);
    return <ToastContext.Provider value={{ pushToastRef }}>
        {children}
        <Toasts/>
    </ToastContext.Provider>
}

export function useToasts(){
    const { pushToastRef } = useContext(ToastContext);
    return {
        pushToast: useCallback((toast: Params) => {
            pushToastRef.current(toast);
        }, [pushToastRef])
    }
}

function Toasts(){
    const [toasts, setToasts] = useState([] as ToastItem[]);
    const { pushToastRef } = useContext(ToastContext);
    
    pushToastRef.current = ({duration, ...props}: Params) => {
        const toast = {...props, id: Date.now()};
        setToasts([...toasts, toast]);
        setTimeout(() => {
            setToasts((v) => v.filter((t) => t !== toast));
        }, (duration ?? 2)*1000);
    }

    

    return <div className="toasts">
        <AnimatePresence>
            {toasts.slice().reverse().map(
                (toast) => <motion.div key={toast.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1}}
                    exit={{ opacity: 0 }}
                >
                    <Toast {...toast}/>
                </motion.div>
            )}
        </AnimatePresence>
    </div>
}