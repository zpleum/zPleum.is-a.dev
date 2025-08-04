// pages/index.tsx หรือ index.js
export async function getServerSideProps() {
  return {
    redirect: {
      destination: 'https://www.zpleum.site', // เปลี่ยนลิงก์ที่ต้องการ
      permanent: false, // true ถ้าอยากให้ browser จดจำ (301), false คือชั่วคราว (302)
    },
  };
}

export default function Home() {
  return null; // หน้าไม่แสดงอะไร เพราะ redirect ไปแล้ว
}
