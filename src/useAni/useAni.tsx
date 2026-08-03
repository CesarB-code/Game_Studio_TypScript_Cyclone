import { useEffect } from "react"

declare global {
    interface Window {
        createUnityInstance?: (canvas: HTMLCanvasElement, config: Record<string, string>) => Promise<any>;
    }
}

export default function useAni(Ref, State, message) {
    useEffect(() => {
        const script = document.createElement("script");

        script.src = "/WebGLBuild/Build/WebGLBuild.loader.js";

        script.onload = () => {
            console.log("Loader script loaded");

            console.log(
                "createUnityInstance:",
                window.createUnityInstance
            ); if (!window.createUnityInstance) {
                console.error("Unity loader not found");
                return;
            }

            window.createUnityInstance(Ref.current, {
                frameworkUrl: "/WebGLBuild/Build/WebGLBuild.framework.js",
                dataUrl: "/WebGLBuild/Build/WebGLBuild.data",
                codeUrl: "/WebGLBuild/Build/WebGLBuild.wasm",
            })
                .then((instance) => {
                    State[1](instance);
                    console.log("Unity Loaded");
                })
                .catch((err) => {
                    console.error(err);
                });
        };

        document.body.appendChild(script);




        return () => {
            document.body.removeChild(script);
        };
    }, [message]);

}