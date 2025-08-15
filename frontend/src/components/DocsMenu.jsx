import { Dialog, DialogContent, DialogFooter, DialogTrigger } from '@/components/ui/dialog';
import { DialogClose, DialogTitle, DialogDescription, DialogHeader } from '@/components/ui/dialog';
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from '@/components/ui/separator';
import { Label } from './ui/label';
import { useState } from 'react';


function Shortcuts() {
    return <div className="flex flex-col gap-2">
        <Label className="text-lg">Shortcuts</Label>
        <div className="flex flex-col gap-2">
            <div className="flex flex-row gap-2">
                <Badge variant="default">Ctrl + S</Badge>
                <Label className="text-base">Save state</Label>
            </div>

            <div className="flex flex-row gap-2">
                <Badge variant="default">Ctrl + D</Badge>
                <Label className="text-base">Run flow</Label>
            </div>
        </div>
    </div>
}


function HowToRun() {
    return   <div className="flex flex-col gap-2">
            <Label className="text-lg mt-4">How to Run</Label>
        <div className="flex flex-col gap-2 text-sm">
            <p>You're already halfway there! The site is running — just start the backend:</p>
            <ol className="list-decimal pl-6 flex gap-4 flex-col">
                <li>Open a terminal</li>
                <li>Clone the repo:
                    <pre className="bg-neutral-200 p-1 rounded">git clone https://github.com/Al-Wasmo/FellowScraper.git</pre>
                </li>
                <li>Go to the backend folder:
                    <pre className="bg-neutral-200 p-1 rounded">cd FellowScraper/backend</pre>
                </li>
                <li>Install Python deps:
                    <pre className="bg-neutral-200 p-1 rounded">pip install -r requirements.txt</pre>
                </li>
                <li>Run the server:
                    <pre className="bg-neutral-200 p-1 rounded">python main.py</pre>
                </li>
            </ol>
            <p>Now you can run flows directly from the frontend.</p>
        </div>
    </div>
}

function Handles() {
    return <div className="flex flex-col gap-2">
        <Label className="text-lg">Handles</Label>
        <p>
            Nodes currently have a linear structure. This means there are two types of handles:
            a receiving one called a <strong>target</strong> and a sending one called a <strong>source</strong>.
        </p>
        <p>
            You can control the direction of the handle for certain nodes by hovering over the node in the
            direction you want. A hidden handle UI will appear — right-click it to create the handle.
        </p>
    </div>
}

function Nodes() {
    return <div className="flex flex-col gap-2">
        <Label className="text-lg">Nodes</Label>

        <div>
            <strong>Start</strong>
            <ul className="list-disc pl-6">
                <li>The entry point for a flow.</li>
                <li>Has a single source handle on the right.</li>
                <li>Connects to the next node to begin execution.</li>
                <li>No configurable properties — it simply triggers the flow.</li>
            </ul>
        </div>

        <Separator className={"my-4"} />


        <div>
            <strong>End</strong>
            <ul className="list-disc pl-6">
                <li>The termination point for a flow.</li>
                <li>Has a single target handle on the left.</li>
                <li>Used to mark the conclusion of data processing or actions.</li>
                <li>No configuration — it just receives data from the previous node.</li>
            </ul>
        </div>

        <Separator className={"my-4"} />

        <div>
            <strong>Request</strong>
            <ul className="list-disc pl-6">
                <li>Sends an HTTP request to a specified URL.</li>
                <li>
                    <span className="font-semibold">Inputs:</span>
                    <ul className="list-disc pl-6">
                        <li>URL field to specify the target endpoint.</li>
                        <li>Cache Response toggle (stores previous responses for faster testing).</li>
                    </ul>
                </li>
                <li>
                    <span className="font-semibold">Output:</span>
                    <ul className="list-disc pl-6">
                        <li>Response data and headers.</li>
                    </ul>
                </li>
                <li>
                    <span className="font-semibold">Features:</span>
                    <ul className="list-disc pl-6">
                        <li>Detects content type and prettifies JSON or HTML responses.</li>
                        <li>Allows viewing full response in a separate window.</li>
                    </ul>
                </li>
            </ul>
        </div>

        <Separator className={"my-4"} />

        <div>
            <strong>Find Elem</strong>
            <ul className="list-disc pl-6">
                <li>Searches the HTML from a previous node for elements matching certain criteria.</li>
                <li>
                    <span className="font-semibold">Filter options:</span>
                    <ul className="list-disc pl-6">
                        <li>Id</li>
                        <li>Class</li>
                        <li>Attr</li>
                        <li>Name</li>
                    </ul>
                </li>
                <li>
                    When type is <strong>Attr</strong>, you can specify both:
                    <ul className="list-disc pl-6">
                        <li>Attribute name.</li>
                        <li>Attribute value.</li>
                    </ul>
                </li>
                <li>
                    <span className="font-semibold">Outputs:</span>
                    <ul className="list-disc pl-6">
                        <li>Matching HTML elements.</li>
                        <li>Can preview matched elements in a dedicated UI, with the option to select which indexes to output.</li>
                    </ul>
                </li>
            </ul>
        </div>

        <Separator className={"my-4"} />

        <div>
            <strong>Extract Attr</strong>
            <ul className="list-disc pl-6">
                <li>Retrieves a specific attribute or text content from elements found by Find Elem.</li>
                <li>
                    <span className="font-semibold">Options:</span>
                    <ul className="list-disc pl-6">
                        <li><strong>Text</strong> – gets the inner text of the element.</li>
                    </ul>
                </li>
                <li>If data exists, you can preview it in a separate window.</li>
                <li>Used to transform HTML element objects into clean values for further processing.</li>
            </ul>
        </div>
    </div>

}


export function DocsMenuButton() {

    function onSelectTab(idx) {
        setCurrTab(idx);
    }


    const [currTab, setCurrTab] = useState(0);


    const docs = [
        { name: "Shortcuts", component: <Shortcuts /> },
        { name: "Handles", component: <Handles /> },
        { name: "Nodes", component: <Nodes /> },
        { name: "How To Run", component: <HowToRun /> },
    ];


    return (
        <Dialog>
            <form>
                <DialogTrigger asChild>
                    <Button variant={"secondary"} className={"w-full bg-transparent  border-1 border-white h-8 text-white  cursor-pointer hover:bg-[#202020]"} >
                        Docs
                    </Button>
                </DialogTrigger>

                <DialogContent className="sm:max-w-[825px]">
                    <DialogHeader>
                        <DialogTitle>Docs</DialogTitle>
                    </DialogHeader>

                    <div className='flex gap-2'>
                        {
                            docs.map((doc, idx) => {
                                return <Button key={doc.name} onClick={() => onSelectTab(idx)} variant={idx == currTab ? "default" : "outline"} className={"cursor-pointer"} >{doc.name}</Button>
                            })
                        }

                    </div>
                    <div className='overflow-y-auto sm:max-h-[425px] light'>
                        {docs[currTab].component}
                    </div>


                    <DialogFooter>
                        <DialogClose asChild>
                            <Button className={"cursor-pointer"}>Close</Button>
                        </DialogClose>
                    </DialogFooter>
                </DialogContent>
            </form>
        </Dialog>
    )
}
