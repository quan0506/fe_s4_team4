import Restaurant from "../../../component/Services/Restaurant.jsx";
import {useParams} from "react-router-dom";
import {useQuery} from "react-query";
import upstashService from "../../../services/upstashService.js";
import {useModalHandlers} from "../../../constants/ModalHandlers.jsx";
import {Modal} from "antd";

const Shuttles = () => {
  const { id } = useParams();
  const { data: listShuttlesid } = useQuery(
    'av.listShuttlesid',
    () => upstashService.getShuttlesid(id)
  );
  const { isModalVisible  , handleRowClick, handleModalClose } = useModalHandlers(null);

  return (
    <>
      <Restaurant
        handleRowClick={handleRowClick}
        id={id}
        api={listShuttlesid}
      />
      <Modal
        title="Add Project"
        open={isModalVisible}
        onCancel={() => {
          handleModalClose();
        }}
        width={800}
      >

      </Modal>
    </>
  )
}
export default Shuttles
