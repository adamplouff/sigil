import CSInterface from "../lib/csinterface";
export declare const csi: CSInterface;
export declare const openLinkInBrowser: (url: string) => void;
export declare const evalES: (script: string, isGlobal?: boolean) => Promise<string>;
