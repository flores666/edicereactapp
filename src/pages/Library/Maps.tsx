import type {TTokenType} from "@/models/AssetCrafter";

interface IMapsLibraryPageProps {
    type: TTokenType
}

export function Maps(props: IMapsLibraryPageProps) {
    return (
        <>
            <div>{props.type.caption}</div>
        </>
    );
}