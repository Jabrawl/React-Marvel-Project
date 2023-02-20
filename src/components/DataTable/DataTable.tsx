import React, { useState } from 'react'
import Box from '@mui/material/Box';
import { DataGrid, GridColDef, GridSelectionModel} from '@mui/x-data-grid';
import { serverCalls } from '../../api';
import { useGetData } from '../../custom-hooks';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle
} from '@mui/material'
import { CharForm } from '../CharForm';

interface GridData{
  data:{
    id?:string
  }
}

const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 90 },
  {
      field: 'name',
      headerName: 'Name',
      width: 150,
      editable: true,
  },
  {
      field: 'description',
      headerName: 'Description',
      width: 150,
      editable: true,
      
  },
  {
      field: 'power',
      headerName: 'Power',
      width: 150
  },

  {
      field: 'role',
      headerName: 'Role',
      width: 150,
      editable: true
  },

  {
      field: 'identity',
      headerName: 'Secret Identity',
      width: 150,
      editable: true,
  },

  {
      field: 'sidekick',
      headerName: 'Sidekick',
      width: 150,
      editable: true,
  },

  {
      field: 'comic',
      headerName: 'Comics Appeared In',
      width: 110,
      editable: true,
      type: 'number'
  },
];

export const DataTable = () => {
  let { charData, getData } = useGetData();
  let [open, setOpen] = useState(false);
  let [gridData, setData] = useState<GridSelectionModel>([])

  let handleOpen = () => {
    setOpen(true)
  }

  let handleClose = () => {
    setOpen(false)
  }

  let deleteData = () => {
    serverCalls.delete(`${gridData[0]}`)
    getData()
  }

  console.log(gridData)
  // Conditional to render DataTable only for authenticated users
  if (localStorage.getItem('myAuth') == 'true'){
    return (
      <Box sx={{ height: 400, width: '100%' }}>
        <h2>Characters In Inventory</h2>
        <DataGrid
          rows={charData}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          checkboxSelection
          onSelectionModelChange={(newSelectionModel) => {setData(newSelectionModel)}}
          {...charData}
        />
        <Button onClick={handleOpen}>Update</Button>
        <Button variant="contained" color="secondary" onClick={deleteData}>Delete</Button>
        {/* Dialog popup for update */}
        <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
          <DialogTitle id="form-dialog-title">Update a Character</DialogTitle>
          <DialogContent>
            <DialogContentText>Character Id: {gridData[0]}
            <CharForm id={`${gridData[0]}`}/>
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="secondary">Cancel</Button>
          </DialogActions>

        </Dialog>

      </Box>
    );
  } else {
    return ( // does not ender data table if user is not authenticated
    <div>
      <h3>Please Sign In to View Your Marvel Characters</h3>
    </div>
    )
  }
}