
export default function Toast({type, content}: {type: string, content: string}) {

    const backgroundColor = type === "error" ? "bg-red-500" : "bg-neutral-900";

    return <>
        <div className={"px-36 py-1 rounded-sm my-1 text-center text-white font-inter font-medium " + backgroundColor}>
            {content}
        </div>
    </>
}