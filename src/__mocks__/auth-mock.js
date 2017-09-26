const status = {
  status: 'success',
  message: 'user logged in successfully',
  auth: 'eyJhbGciOiJIUzI1NiIsImlhdCI6MTUwMzY2NDc4NywiZXhwIjoxNTA0MDI0Nzg3fQ.eyJpZCI6MX0.XzZvG5vRMXFfO9PmY_qTUoC_gU_Lgo_HAl00s0luSo',
};

export default function loginUser() {
  return new Promise((resolve) => {
    process.nextTick(() => resolve(status));
  });
}
