import  { useState } from "react";
import { useTodoContext } from "../context/TodoContext";
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";

const FilterTodos = () => {
    const { setFilter } = useTodoContext();
    const [filterValue, setFilterValue] = useState("");

    const handleFilterChange = (event) => {
        const value = event.target.value;
        setFilterValue(value);

        // Update filter based on selected value
        if (value === "") {
            setFilter(null); // Show all todos
        } else if (value === "true") {
            setFilter(true); // Show only completed todos
        } else if (value === "false") {
            setFilter(false); // Show only incomplete todos
        }
    };

    return (
        
        <FormControl fullWidth variant="outlined" style={{ marginTop: "16px" }}>
            <InputLabel>Filter</InputLabel>
            <Select
                value={filterValue}
                onChange={handleFilterChange}
                label="Filter"
            >
                <MenuItem value="">All</MenuItem>
                <MenuItem value="true">Completed</MenuItem>
                <MenuItem value="false">Incomplete</MenuItem>
            </Select>
        </FormControl>
    );
};

export default FilterTodos;
