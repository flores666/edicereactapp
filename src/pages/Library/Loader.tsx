export function Loader() {
    return (
        <>
            {
                Array.from({length: 1}).map((_, i) => (
                    <div key={i} className="card-filler">
                        <div className="card"/>
                    </div>
                ))
            }
        </>
    );
}
