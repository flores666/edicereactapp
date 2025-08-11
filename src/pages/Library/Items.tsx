import {Filter} from "@/components/Filter/Filter.tsx";
import {TokensCardsList} from "@/components/TokensCardsList/TokensCardsList.tsx";
import {filterDefaultItems} from "@/pages/Library/index.tsx";

export function Items() {
    async function fetchData() {

    }

    return (
        <div className='with-filter-columns'>
            <Filter
                fetchFn={fetchData}
                fields={filterDefaultItems}/>
            <TokensCardsList></TokensCardsList>
        </div>
    );
}