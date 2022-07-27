
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import data from "./ColumnsDG.js";

const columns = data

function CatalogFlights({rows}) {
    
    return (
        <Box sx={{ height: 400, width: '100%' }}>
            <DataGrid
                rows={rows}
                columns={columns}
                pageSize={5}
                rowsPerPageOptions={[5]}
                checkboxSelection
                disableSelectionOnClick
            />
        </Box>
    )
};


export default CatalogFlights