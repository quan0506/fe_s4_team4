// import{ useState } from 'react';
// import { Card, Row, Col, Button, Modal, Rate, Typography, Space, Divider } from 'antd';
// import { EnvironmentOutlined, PhoneOutlined, GlobalOutlined } from '@ant-design/icons';
//
// const { Title, Text } = Typography;
//
// const branches = [
//   {
//     id: 1,
//     name: "Sài Gòn Luxury",
//     address: "123 Nguyễn Huệ, Quận 1, TP.HCM",
//     image: "/placeholder.svg?height=400&width=600",
//     rating: 4.8,
//     phone: "+84 28 1234 5678",
//     mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.4241674197276!2d106.70232081533417!3d10.777638792321254!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752f4b3330bcc7%3A0x4db964d76bf6e18e!2zMTIzIE5ndXnhu4VuIEh14buHLCBC4bq_biBOZ2jDqSwgUXXhuq1uIDEsIFRow6BuaCBwaOG7kSBI4buTIENow60gTWluaCwgVmnhu4d0IE5hbQ!5e0!3m2!1svi!2s!4v1637135781059!5m2!1svi!2s"
//   },
//   {
//     id: 2,
//     name: "Hà Nội Elegance",
//     address: "45 Tràng Tiền, Hoàn Kiếm, Hà Nội",
//     image: "/placeholder.svg?height=400&width=600",
//     rating: 4.7,
//     phone: "+84 24 9876 5432",
//     mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3724.0969612947894!2d105.85247731533206!3d21.025426993151136!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135ab953357c995%3A0x1babf6bb4f9a20e!2zNDUgVHLDoG5nIFRp4buBbiwgSMOgbmcgVHLhu5FuZywgSG_DoG4gS2nhur9tLCBIw6AgTuG7mWksIFZp4buHdCBOYW0!5e0!3m2!1svi!2s!4v1637135853612!5m2!1svi!2s"
//   },
//   {
//     id: 3,
//     name: "Đà Nẵng Beachfront",
//     address: "78 Võ Nguyên Giáp, Sơn Trà, Đà Nẵng",
//     image: "/placeholder.svg?height=400&width=600",
//     rating: 4.9,
//     phone: "+84 236 7890 1234",
//     mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3833.8382874753155!2d108.24438841532355!3d16.0600809888857!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3142177f2ced6d8b%3A0xeac35f2960ca74a4!2zNzggVsO1IE5ndXnDqm4gR2nDoXAsIFBoxrDhu5tjIE3hu7ksIFPGoW4gVHLDoCwgxJDDoCBO4bq1bmcgNTUwMDAwLCBWaeG7h3QgTmFt!5e0!3m2!1svi!2s!4v1637135901460!5m2!1svi!2s"
//   },
//   {
//     id: 4,
//     name: "Phú Quốc Paradise",
//     address: "56 Trần Hưng Đạo, Dương Đông, Phú Quốc",
//     image: "/placeholder.svg?height=400&width=600",
//     rating: 4.6,
//     phone: "+84 297 2345 6789",
//     website: "www.phuquocparadise.com",
//     mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3926.9548103720444!2d103.95912831532825!3d10.211398892708853!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31a78c62963cff31%3A0x2672ce1a371a0d3b!2zNTYgVHLhuqduIEjGsG5nIMSQ4bqhbywgVFQuIETGsMahbmcgxJDDtG5nLCBQaMO6IFF14buRYywgS2nDqm4gR2lhbmcsIFZp4buHdCBOYW0!5e0!3m2!1svi!2s!4v1637135939913!5m2!1svi!2s"
//   }
// ];
//
// const BranchCard = ({ branch, onClick }) => (
//   <Card
//     hoverable
//     cover={<img alt={branch.name} src={branch.image} style={{ height: 200, objectFit: 'cover' }} />}
//     style={{ height: '100%' }}
//   >
//     <Card.Meta
//       title={<Title level={4}>{branch.name}</Title>}
//       description={
//         <>
//           <Space direction="vertical">
//             <Text><EnvironmentOutlined /> {branch.address}</Text>
//             <Rate disabled defaultValue={branch.rating} />
//           </Space>
//           <Button type="primary" onClick={() => onClick(branch)} style={{ marginTop: 16 }}>
//             Xem Chi Tiết
//           </Button>
//         </>
//       }
//     />
//   </Card>
// );
//
// export default function Indexbarnch() {
//   const [selectedBranch, setSelectedBranch] = useState(null);
//   const [modalVisible, setModalVisible] = useState(false);
//
//   const showModal = (branch) => {
//     setSelectedBranch(branch);
//     setModalVisible(true);
//   };
//
//   const handleCancel = () => {
//     setModalVisible(false);
//   };
//
//   return (
//     <div style={{ background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)', padding: '40px 0' }}>
//       <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 20px' }}>
//         <Title style={{ textAlign: 'center', marginBottom: 40, color: '#1890ff' }}>
//           Chi Nhánh Khách Sạn Sang Trọng
//         </Title>
//         <Row gutter={[24, 24]}>
//           {branches.map((branch) => (
//             <Col xs={24} sm={12} md={8} lg={6} key={branch.id}>
//               <BranchCard branch={branch} onClick={showModal} />
//             </Col>
//           ))}
//         </Row>
//         <Modal
//           title={selectedBranch?.name}
//           visible={modalVisible}
//           onCancel={handleCancel}
//           footer={null}
//           width={800}
//         >
//           {selectedBranch && (
//             <Row gutter={[24, 24]}>
//               <Col xs={24} md={12}>
//                 <img
//                   src={selectedBranch.image}
//                   alt={selectedBranch.name}
//                   style={{ width: '100%', borderRadius: 8 }}
//                 />
//                 <Divider />
//                 <Space direction="vertical" size="middle">
//                   <Text><EnvironmentOutlined /> {selectedBranch.address}</Text>
//                   <Text><PhoneOutlined /> {selectedBranch.phone}</Text>
//                   <Rate disabled defaultValue={selectedBranch.rating} />
//                 </Space>
//               </Col>
//               <Col xs={24} md={12}>
//                 <iframe
//                   src={selectedBranch.mapUrl}
//                   width="100%"
//                   height="300"
//                   style={{ border: 0, borderRadius: 8 }}
//                   allowFullScreen=""
//                   loading="lazy"
//                   title={`Map of ${selectedBranch.name}`}
//                 ></iframe>
//               </Col>
//             </Row>
//           )}
//         </Modal>
//       </div>
//     </div>
//   );
// }
import React, { useState } from 'react';
import { Card, Row, Col, Button, Modal, Rate, Typography, Space, Divider } from 'antd';
import { EnvironmentOutlined, PhoneOutlined, GlobalOutlined } from '@ant-design/icons';

const { Title, Text } = Typography;

const branches = [
  {
    id: 1,
    name: "Sài Gòn Luxury",
    address: "123 Nguyễn Huệ, Quận 1, TP.HCM",
    image: "/placeholder.svg?height=400&width=600",
    rating: 4.8,
    phone: "+84 28 1234 5678",
    website: "www.saigonluxury.com",
    mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.4241674197276!2d106.70232081533417!3d10.777638792321254!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752f4b3330bcc7%3A0x4db964d76bf6e18e!2zMTIzIE5ndXnhu4VuIEh14buHLCBC4bq_biBOZ2jDqSwgUXXhuq1uIDEsIFRow6BuaCBwaOG7kSBI4buTIENow60gTWluaCwgVmnhu4d0IE5hbQ!5e0!3m2!1svi!2s!4v1637135781059!5m2!1svi!2s"
  },
  {
    id: 2,
    name: "Hà Nội Elegance",
    address: "45 Tràng Tiền, Hoàn Kiếm, Hà Nội",
    image: "/placeholder.svg?height=400&width=600",
    rating: 4.7,
    phone: "+84 24 9876 5432",
    website: "www.hanoielegance.com",
    mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3724.0969612947894!2d105.85247731533206!3d21.025426993151136!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135ab953357c995%3A0x1babf6bb4f9a20e!2zNDUgVHLDoG5nIFRp4buBbiwgSMOgbmcgVHLhu5FuZywgSG_DoG4gS2nhur9tLCBIw6AgTuG7mWksIFZp4buHdCBOYW0!5e0!3m2!1svi!2s!4v1637135853612!5m2!1svi!2s"
  },
  {
    id: 3,
    name: "Đà Nẵng Beachfront",
    address: "78 Võ Nguyên Giáp, Sơn Trà, Đà Nẵng",
    image: "/placeholder.svg?height=400&width=600",
    rating: 4.9,
    phone: "+84 236 7890 1234",
    website: "www.danangbeachfront.com",
    mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3833.8382874753155!2d108.24438841532355!3d16.0600809888857!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3142177f2ced6d8b%3A0xeac35f2960ca74a4!2zNzggVsO1IE5ndXnDqm4gR2nDoXAsIFBoxrDhu5tjIE3hu7ksIFPGoW4gVHLDoCwgxJDDoCBO4bq1bmcgNTUwMDAwLCBWaeG7h3QgTmFt!5e0!3m2!1svi!2s!4v1637135901460!5m2!1svi!2s"
  },
  {
    id: 4,
    name: "Phú Quốc Paradise",
    address: "56 Trần Hưng Đạo, Dương Đông, Phú Quốc",
    image: "/placeholder.svg?height=400&width=600",
    rating: 4.6,
    phone: "+84 297 2345 6789",
    website: "www.phuquocparadise.com",
    mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3926.9548103720444!2d103.95912831532825!3d10.211398892708853!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31a78c62963cff31%3A0x2672ce1a371a0d3b!2zNTYgVHLhuqduIEjGsG5nIMSQ4bqhbywgVFQuIETGsMahbmcgxJDDtG5nLCBQaMO6IFF14buRYywgS2nDqm4gR2lhbmcsIFZp4buHdCBOYW0!5e0!3m2!1svi!2s!4v1637135939913!5m2!1svi!2s"
  }
];

const BranchCard = ({ branch, onClick }) => (
  <Card
    hoverable
    className="overflow-hidden transition-all duration-300 hover:shadow-2xl transform hover:-translate-y-2"
    cover={
      <div className="relative overflow-hidden">
        <img
          alt={branch.name}
          src={branch.image}
          className="h-48 w-full object-cover transition-transform duration-300 transform hover:scale-110"
        />
        <div className="absolute top-0 right-0 bg-primary text-primary-foreground m-2 px-2 py-1 rounded-full">
          <Rate disabled defaultValue={branch.rating} className="text-xs" />
        </div>
      </div>
    }
  >
    <Card.Meta
      title={<Title level={4} className="text-primary">{branch.name}</Title>}
      description={
        <div className="space-y-2">
          <Text className="flex items-center text-muted-foreground">
            <EnvironmentOutlined className="mr-1" /> {branch.address}
          </Text>
          <Button
            type="primary"
            onClick={() => onClick(branch)}
            className="w-full mt-4 bg-primary hover:bg-primary-dark transition-colors duration-300"
          >
            Xem Chi Tiết
          </Button>
        </div>
      }
    />
  </Card>
);

export default function Indexbarnch() {
  const [selectedBranch, setSelectedBranch] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  const showModal = (branch) => {
    setSelectedBranch(branch);
    setModalVisible(true);
  };

  const handleCancel = () => {
    setModalVisible(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 to-secondary/5 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Title className="text-center mb-12 text-4xl font-bold text-primary">
          Chi Nhánh Khách Sạn Sang Trọng
        </Title>
        <Row gutter={[24, 24]}>
          {branches.map((branch) => (
            <Col xs={24} sm={12} md={8} lg={6} key={branch.id}>
              <BranchCard branch={branch} onClick={showModal} />
            </Col>
          ))}
        </Row>
        <Modal
          visible={modalVisible}
          onCancel={handleCancel}
          footer={null}
          width={800}
          className="rounded-lg overflow-hidden"
        >
          {selectedBranch && (
            <div className="p-6">
              <Title level={2} className="text-primary mb-6">{selectedBranch.name}</Title>
              <Row gutter={[24, 24]}>
                <Col xs={24} md={12}>
                  <img
                    src={selectedBranch.image}
                    alt={selectedBranch.name}
                    className="w-full h-64 object-cover rounded-lg shadow-md transition-transform duration-300 transform hover:scale-105"
                  />
                  <Divider className="my-6" />
                  <Space direction="vertical" size="middle" className="w-full">
                    <Text className="flex items-center text-muted-foreground">
                      <EnvironmentOutlined className="mr-2" /> {selectedBranch.address}
                    </Text>
                    <Text className="flex items-center text-muted-foreground">
                      <PhoneOutlined className="mr-2" /> {selectedBranch.phone}
                    </Text>
                    <Text className="flex items-center text-muted-foreground">
                      <GlobalOutlined className="mr-2" /> {selectedBranch.website}
                    </Text>
                    <div className="flex items-center">
                      <span className="mr-2 text-muted-foreground">Đánh giá:</span>
                      <Rate disabled defaultValue={selectedBranch.rating} />
                    </div>
                  </Space>
                </Col>
                <Col xs={24} md={12}>
                  <div className="h-full rounded-lg overflow-hidden shadow-md transition-transform duration-300 transform hover:scale-105">
                    <iframe
                      src={selectedBranch.mapUrl}
                      width="100%"
                      height="100%"
                      className="border-0 min-h-[300px]"
                      allowFullScreen=""
                      loading="lazy"
                      title={`Bản đồ của ${selectedBranch.name}`}
                    ></iframe>
                  </div>
                </Col>
              </Row>
            </div>
          )}
        </Modal>
      </div>
    </div>
  );
}
