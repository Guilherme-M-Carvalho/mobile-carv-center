import { useState } from "react";

export default function usePage(){
    const [searchQuery, setSearchQuery] = useState('');


    return {
        searchQuery,
        setSearchQuery
    }
}