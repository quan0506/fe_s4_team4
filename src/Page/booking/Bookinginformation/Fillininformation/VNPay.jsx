import {Button} from "antd";

const VNPay = ({setCurrentStep}) => {
  return (
    <>
      <iframe
        src="https://sandbox.vnpayment.vn/apis/"
        width="100%"
        height="600px"
        style={{border: 'none', borderRadius: '8px'}}
        title="Payment Gateway"
      />
        {/*<Button*/}
        {/*  size='large'*/}
        {/*  className='w-full'*/}
        {/*  onClick={() => setCurrentStep(2)}>*/}
        {/*  Thanh toán*/}
        {/*</Button>*/}
    </>
  )
}
export default VNPay
