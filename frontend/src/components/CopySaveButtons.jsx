import { Button } from "@/components/ui/button";
import { ArrowDownToLine, Copy } from "lucide-react";
import { toast } from "sonner";

export function CopySaveButtons({ data, filename = "data.txt" }) {
    async function onCopy() {
        try {
            await navigator.clipboard.writeText(data);
        } catch (err) {
        }

        toast("Copy successfully", {
            description: "Check Clipboard",
        });
    };

    async function onDownload() {
        const blob = new Blob([data], { type: "text/plain" });
        const url = URL.createObjectURL(blob);

        const a = document.createElement("a");
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        a.remove();

        URL.revokeObjectURL(url);
    };

    return (
        <div className="flex flex-row gap-4">
            <Button
                className="bg-white py-0 h-8 text-black hover:bg-neutral-300 cursor-pointer"
                onClick={onCopy}
            >
                <Copy size={16} />
            </Button>

            <Button
                className="bg-white py-0 h-8 text-black hover:bg-neutral-300 cursor-pointer"
                onClick={onDownload}
            >
                <ArrowDownToLine size={16} />
            </Button>
        </div>
    );
}
