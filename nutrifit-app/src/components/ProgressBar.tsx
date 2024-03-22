import { FunctionComponent } from "react";

type Props = {
    progress: number //progress between 0 and 1
    height?: string
}

export const ProgressBar: FunctionComponent<Props> = ({ progress, height }) => {

    const progresspercent = progress<=1 ? progress*100 : 100;

    return (
        <div className={"w-full bg-neutral-900 rounded-xl overflow-hidden " + height??"h-1.5"}>
            <div
                className={"bg-blue-400 rounded-xl transition-width " + height??"h-1.5"}
                style={{ width: (progresspercent)+"%" }}
            ></div>
        </div>
    );
}