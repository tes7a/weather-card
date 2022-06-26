import {MutableRefObject, useEffect} from "react";

export function useOnClickOutside(ref: MutableRefObject<HTMLDivElement | null>, handler: (value: boolean) => void) {
    useEffect(() => {
            const listener = (event: any) => {
                if (!ref || ref.current?.contains(event.target)) {
                    return;
                }
                handler(event);
            };
            document.addEventListener("mousedown", listener);
            document.addEventListener("touchstart", listener);
            return () => {
                document.removeEventListener("mousedown", listener);
                document.removeEventListener("touchstart", listener);
            };
        }, [ref, handler]
    );
}