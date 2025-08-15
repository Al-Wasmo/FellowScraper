
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from "./ui/tooltip"

export function ToolTipWrapper({ children, delayDuration,info, ...props }) {
    return (
        <Tooltip delayDuration={delayDuration}>
            <TooltipTrigger  asChild>
                {children}
            </TooltipTrigger>
            <TooltipContent {...props}>
                <p>{info}</p>
            </TooltipContent>
        </Tooltip>
    )
}

