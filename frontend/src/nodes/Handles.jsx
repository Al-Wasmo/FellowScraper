import { Handle } from "reactflow";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Plus } from "lucide-react";



export function AddHandle({ dir, onSelect }) {

    function onSelectItem(type) {
        onSelect(type, dir);
    }

    dir = dir ?? "bottom";
    let size = 14;
    let style = { width: size, height: size };

    switch (dir) {
        case "bottom":
            style = { ...style, bottom: -size / 2, left: "50%", transform: `translateX(-${size / 2}px)` };
            break;
        case "top":
            style = { ...style, top: -size / 2, left: "50%", transform: `translateX(-${size / 2}px)` };
            break;
        case "left":
            style = { ...style, left: -size / 2, top: "50%", transform: `translateY(-${size / 2}px)` };
            break;
        case "right":
            style = { ...style, right: -size / 2, top: "50%", transform: `translateY(-${size / 2}px)` };
            break;
    }


    return <div style={style} role="button" className={`absolute hover:opacity-100 opacity-10  flex items-center justify-center cursor-pointer nodrag  border-white border-1 bg-[#181818] rounded-full`}>
        <Plus className="pointer-events-none absolute" size={10} stroke="white" />
        <DropdownMenu>
            <DropdownMenuTrigger className="w-full h-full rounded-full"></DropdownMenuTrigger>
            <DropdownMenuContent className={"-translate-y-8"}>
                <DropdownMenuLabel>Options</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => { onSelectItem("source") }} className={"cursor-pointer"}>Make source</DropdownMenuItem>
                <DropdownMenuItem onClick={() => { onSelectItem("target") }} className={"cursor-pointer"}>Make target</DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    </div>
}





export function CustomHandle({ style,...props }) {
    style = style ?? {}
    return <Handle style={{ width: 10, height: 10, ...style }}  {...props} />
}
