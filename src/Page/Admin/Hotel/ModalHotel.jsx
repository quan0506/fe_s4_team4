import {Modal} from "antd";

const ModalHotel = ({ data, onClose,
                      isModalVisible}) => {
  return (
    <>
      <Modal
        title={data ? "Edit Project" : "Add Project"}
        open={isModalVisible}
        onCancel={() => {
          onClose();
        }}
        width={800}
        className='description'

      ></Modal>
    </>
  )
}
export default ModalHotel
