import { useSetWindowMode } from '@/lib/state';
import { CircleX } from 'lucide-react';



function NopComp() {
    return <></>;
}


export default function InfoWindow() {
    function onCloseInfoMenu() {
        setWindowMode(0);
    }

    const setWindowMode = useSetWindowMode(state => state.setMode);
    const Comp = useSetWindowMode(state => state.Comp) ?? NopComp;

    return <div className='h-full flex flex-col gap-4'>
        <div className='flex justify-end'>
            <CircleX onClick={onCloseInfoMenu} size={24} className='cursor-pointer hover:stroke-[#c0c0c0]' />
        </div>
        <Comp />
    </div>

}