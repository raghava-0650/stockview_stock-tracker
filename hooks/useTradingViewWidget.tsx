'use client';
import {
  useEffect,
  useRef,
} from 'react';

//it is a hook so it starts with lower case letter and it returns a reusable hook
const useTradingViewWidget = (scriptUrl: string, config: Record<string, unknown>, height = 600) => {
    //no matter which reference we pass through it, we can render it properly
    const containerRef = useRef<HTMLDivElement | null>(null);
    //at the end we will apply all the additional settings to that specific chart and we will return modified conteinerRef


        useEffect(
        //we are going to make this useEffect hook a reusable hook so that we can call this hook whenever we try to render a new chart
        () => {

            if(!containerRef.current)return;
            if(containerRef.current.dataset.loaded)return;
            containerRef.current.innerHTML = `<div class = "tradingview-widget-container__widget" style="width: 100%; height: ${height}px;"></div>`;

            const script = document.createElement("script");
            script.src = scriptUrl;
            script.async = true;
            script.innerHTML = JSON.stringify(config);

            //here we are appending all these properties to containerref
            containerRef.current.appendChild(script);
            containerRef.current.dataset.loaded = 'true';

            //now we want to clean it up on the unmount of the function
            return ()=>{
                if(containerRef.current){
                    containerRef.current.innerHTML = '';
                    delete containerRef.current.dataset.loaded;
                }
            }
        },[scriptUrl, config, height]);

        return containerRef;
}

export default useTradingViewWidget