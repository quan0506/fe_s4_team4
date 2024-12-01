import {TableCell } from '@mui/material';
import GenericTable from "../../../component/GenericTable.jsx";
import {useModalHandlers} from "../../../constants/ModalHandlers.jsx";
import ModalHotel from "./ModalHotel.jsx";
import {Button} from "antd";

export default function IndexHotel() {
  const { isModalVisible, selectedNotification, handleRowClick, handleModalClose } = useModalHandlers(null);

  const headers = ['Project Name', 'Status', 'Created At'];
  const listProject = {
    contents: [
      { projectName: 'Project A', status: 'Active', createdAt: '2024-11-25T12:00:00Z' },
      { projectName: 'Project B', status: 'Inactive', createdAt: '2024-10-15T09:30:00Z' },
      { projectName: 'Project C', status: 'Active', createdAt: '2024-12-01T14:45:00Z' },
    ],
  };
  const renderRow = (row) => (
    <>
      <TableCell>{row.projectName}</TableCell>
      <TableCell>{row.status}</TableCell>
      <TableCell>{new Date(row.createdAt).toLocaleDateString()}</TableCell>
    </>
  );
  return (
    <div>
      <div className='flex justify-end'>
        <Button
          onClick={() => {
            handleRowClick(null);
          }}
        >Add</Button>
      </div>
      <GenericTable
        headers={headers}
        renderRow={renderRow}
        data={listProject?.contents || []}
        onRowClick={handleRowClick}
      />
      <ModalHotel
        data={selectedNotification}
        onClose={handleModalClose}
        isModalVisible={isModalVisible}
      />
    </div>
  );
}
