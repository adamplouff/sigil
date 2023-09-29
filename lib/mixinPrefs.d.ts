declare namespace _default {
    function checkLocalPrefs(id?: any): void;
    function checkPrefsFor(id: any, type: any): any;
    function setPrefs(data: any): void;
    function getPrefs(): any;
    function setPrefsById(id: any, value: any, type: any): void;
    function deletePrefs(): void;
}
export default _default;
