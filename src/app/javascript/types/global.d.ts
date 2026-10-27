import Alpine from "alpinejs";
import { App } from "@/services/application/window";

declare global {
    interface Window {
        Alpine: typeof Alpine;
        App: typeof App;
    }
}
