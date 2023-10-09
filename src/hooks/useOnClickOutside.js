import  { useEffect } from 'react'

export default function useOnClickOutside(ref, handler) {

    useEffect(()=> {
        const lisntener = (event) => {
            if(!ref.current || ref.current.contains(event.target)) {
                return;
            }
            handler(event);
        };
        document.addEventListener("mousedown", lisntener);
        document.addEventListener("touchstart", lisntener);
        return () => {
            document.removeEventListener("mousedown", lisntener);
            document.removeEventListener("touchstart", lisntener);
        };

    },[ref, handler]);
}
